import {initiateDeveloperControlledWalletsClient} from '@circle-fin/developer-controlled-wallets';
import {createClient} from '@supabase/supabase-js';
import {v4 as uuidv4} from 'uuid';

const supabase=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

function getCircle(){
  return initiateDeveloperControlledWalletsClient({
    apiKey:process.env.CIRCLE_API_KEY,
    entitySecret:process.env.CIRCLE_ENTITY_SECRET,
  });
}

const ORCHESTRATOR_ADDRESS='0x72478d18b613f5240ee0454af1ac8ae3c94ad7a6';
const ARC_USDC='0x3600000000000000000000000000000000000000';

export async function POST(req){
  const {task_id,agent_id}=await req.json();
  if(!task_id||!agent_id)return Response.json({error:'Missing task_id or agent_id'},{status:400});

  // Get task
  const {data:task,error:te}=await supabase.from('tasks').select('*').eq('id',task_id).single();
  if(te||!task)return Response.json({error:'Task not found'},{status:404});
  if(task.status==='completed')return Response.json({error:'Task already completed'},{status:400});

  // Get agent
  const {data:agent,error:ae}=await supabase.from('agents').select('*').eq('id',agent_id).single();
  if(ae||!agent)return Response.json({error:'Agent not found'},{status:404});
  if(!agent.address)return Response.json({error:'Agent has no wallet'},{status:400});

  try{
    // Send USDC from Orchestrator to agent
    const client=getCircle();
    const tx=await client.createTransaction({
      idempotencyKey:uuidv4(),
      walletAddress:ORCHESTRATOR_ADDRESS,
      blockchain:'ARC-TESTNET',
      destinationAddress:agent.address,
      tokenAddress:ARC_USDC,
      amounts:[task.reward],
      fee:{type:'level',config:{feeLevel:'MEDIUM'}},
    });

    const txId=tx.data?.id;
    const txState=tx.data?.state;

    // Update task to completed
    await supabase.from('tasks').update({
      status:'completed',
      agent_id:agent_id,
    }).eq('id',task_id);

    // Update agent stats
    const newEarned=(parseFloat(agent.earned||0)+parseFloat(task.reward)).toFixed(2);
    await supabase.from('agents').update({
      tasks_done:(agent.tasks_done||0)+1,
      earned:newEarned,
    }).eq('id',agent_id);

    // Save payment record
    await supabase.from('payments').insert({
      from_agent:'Orchestrator',
      to_agent:agent.name,
      to_address:agent.address,
      amount:task.reward,
      tx_id:txId,
      status:txState==='INITIATED'?'CONFIRMED':'PENDING',
      task_id:task_id,
    });

    return Response.json({
      success:true,
      txId,
      txState,
      amount:task.reward,
      to:agent.address,
      message:'Task completed. USDC sent to agent wallet.',
    });

  }catch(e){
    const msg=e?.response?.data?.message||e.message;
    return Response.json({error:msg},{status:500});
  }
}

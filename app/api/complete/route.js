import {initiateDeveloperControlledWalletsClient} from '@circle-fin/developer-controlled-wallets';
import {createClient} from '@supabase/supabase-js';
import {v4 as uuidv4} from 'uuid';

function getDB(){
  return createClient(
    process.env.SUPABASE_URL||process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY||process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
function getCircle(){
  return initiateDeveloperControlledWalletsClient({
    apiKey:process.env.CIRCLE_API_KEY,
    entitySecret:process.env.CIRCLE_ENTITY_SECRET,
  });
}

const ORCH='0x72478d18b613f5240ee0454af1ac8ae3c94ad7a6';
const USDC='0x3600000000000000000000000000000000000000';

export async function POST(req){
  const {task_id,agent_id}=await req.json();
  const x402Payment=req.headers.get('X-Payment');

  const db=getDB();
  const {data:task}=await db.from('tasks').select('*').eq('id',task_id).single();
  if(!task)return Response.json({error:'Task not found'},{status:404});
  if(task.status==='completed')return Response.json({error:'Already completed'},{status:400});

  const {data:agent}=await db.from('agents').select('*').eq('id',agent_id).single();
  if(!agent||!agent.address)return Response.json({error:'Agent not found'},{status:404});

  try{
    const client=getCircle();
    const tx=await client.createTransaction({
      idempotencyKey:uuidv4(),
      walletAddress:ORCH,
      blockchain:'ARC-TESTNET',
      destinationAddress:agent.address,
      tokenAddress:USDC,
      amounts:[task.reward],
      fee:{type:'level',config:{feeLevel:'MEDIUM'}},
    });
    const txId=tx.data?.id;

    await db.from('tasks').update({status:'completed',agent_id}).eq('id',task_id);
    const earned=(parseFloat(agent.earned||0)+parseFloat(task.reward)).toFixed(2);
    await db.from('agents').update({tasks_done:(agent.tasks_done||0)+1,earned}).eq('id',agent_id);
    await db.from('payments').insert({
      from_agent:'Orchestrator',
      to_agent:agent.name,
      to_address:agent.address,
      amount:task.reward,
      tx_id:txId,
      status:'CONFIRMED',
      task_id,
    });

    return Response.json({
      success:true,
      txId,
      amount:task.reward,
      to:agent.address,
      protocol: x402Payment ? 'x402-nanopayment' : 'circle-direct',
      x402: !!x402Payment,
    });
  }catch(e){
    return Response.json({error:e?.response?.data?.message||e.message},{status:500});
  }
}

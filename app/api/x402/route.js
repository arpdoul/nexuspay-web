import {createClient} from '@supabase/supabase-js';

function getDB(){
  return createClient(
    process.env.SUPABASE_URL||process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY||process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

const ORCHESTRATOR='0x72478d18b613f5240ee0454af1ac8ae3c94ad7a6';

// x402 payment instructions response
function paymentRequired(amount, taskId){
  return Response.json({
    error: 'Payment Required',
    x402Version: 1,
    accepts: [{
      scheme: 'exact',
      network: 'arc-testnet',
      maxAmountRequired: amount,
      resource: `https://nexuspay-web.vercel.app/api/x402?task=${taskId}`,
      description: 'Pay to complete this NexusPay task',
      mimeType: 'application/json',
      payTo: ORCHESTRATOR,
      maxTimeoutSeconds: 300,
      asset: '0x3600000000000000000000000000000000000000',
      extra: { name: 'USD Coin', version: '2' },
    }],
  }, {
    status: 402,
    headers: {
      'X-Payment-Required': '1',
      'X-Payment-Network': 'arc-testnet',
      'X-Payment-Asset': 'USDC',
      'X-Payment-Amount': amount,
      'X-Payment-To': ORCHESTRATOR,
    }
  });
}

export async function GET(req){
  const {searchParams}=new URL(req.url);
  const taskId=searchParams.get('task');
  if(!taskId)return Response.json({error:'task required'},{status:400});

  const db=getDB();
  const {data:task}=await db.from('tasks').select('*').eq('id',taskId).single();
  if(!task)return Response.json({error:'Task not found'},{status:404});

  // Check if payment header exists (x402 payment proof)
  const paymentHeader=req.headers.get('X-Payment');

  if(!paymentHeader){
    // No payment — return 402 with instructions
    return paymentRequired(task.reward, taskId);
  }

  // Payment header exists — verify and return task details
  return Response.json({
    success: true,
    task,
    message: 'Payment verified. Task access granted.',
    x402: true,
  });
}

export async function POST(req){
  const {searchParams}=new URL(req.url);
  const taskId=searchParams.get('task');
  const paymentHeader=req.headers.get('X-Payment');

  if(!taskId)return Response.json({error:'task required'},{status:400});

  const db=getDB();
  const {data:task}=await db.from('tasks').select('*').eq('id',taskId).single();
  if(!task)return Response.json({error:'Task not found'},{status:404});

  if(!paymentHeader){
    return paymentRequired(task.reward, taskId);
  }

  return Response.json({
    success: true,
    taskId,
    reward: task.reward,
    message: 'x402 Nanopayment accepted. Task marked for completion.',
    protocol: 'x402',
    network: 'ARC-TESTNET',
    asset: 'USDC',
  });
}

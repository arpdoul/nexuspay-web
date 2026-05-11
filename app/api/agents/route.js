import {initiateDeveloperControlledWalletsClient} from '@circle-fin/developer-controlled-wallets';
import {createClient} from '@supabase/supabase-js';

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
export async function GET(){
  const db=getDB();
  const {data,error}=await db.from('agents').select('*').order('created_at',{ascending:false});
  if(error)return Response.json({error:error.message},{status:500});
  return Response.json({agents:data});
}
export async function POST(req){
  const {name,specialty}=await req.json();
  if(!name)return Response.json({error:'Name required'},{status:400});
  try{
    const client=getCircle();
    const ws=await client.createWalletSet({name:'NexusPay-'+name+'-'+Date.now()});
    const w=await client.createWallets({walletSetId:ws.data?.walletSet?.id,blockchains:['ARC-TESTNET'],count:1,accountType:'EOA'});
    const wallet=w.data?.wallets?.[0];
    const db=getDB();
    const {data,error}=await db.from('agents').insert({name,specialty,wallet_id:wallet.id,address:wallet.address}).select().single();
    if(error)return Response.json({error:error.message},{status:500});
    return Response.json({agent:data,wallet:wallet.address});
  }catch(e){
    return Response.json({error:e?.response?.data?.message||e.message},{status:500});
  }
}

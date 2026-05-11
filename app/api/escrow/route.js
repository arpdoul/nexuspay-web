import {createClient} from '@supabase/supabase-js';
function getDB(){
  return createClient(
    process.env.SUPABASE_URL||process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY||process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
export async function POST(req){
  const {task_id,poster_address,tx_hash}=await req.json();
  if(!task_id||!poster_address)return Response.json({error:'Missing fields'},{status:400});
  const db=getDB();
  const {data,error}=await db.from('tasks').update({poster_address,escrow_tx:tx_hash,status:'funded'}).eq('id',task_id).select().single();
  if(error)return Response.json({error:error.message},{status:500});
  return Response.json({success:true,task:data});
}

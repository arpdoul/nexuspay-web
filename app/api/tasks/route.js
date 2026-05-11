import {createClient} from '@supabase/supabase-js';

function getDB(){
  return createClient(
    process.env.SUPABASE_URL||process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY||process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
export async function GET(){
  const db=getDB();
  const {data,error}=await db.from('tasks').select('*').order('created_at',{ascending:false});
  if(error)return Response.json({error:error.message},{status:500});
  return Response.json({tasks:data});
}
export async function POST(req){
  const {title,reward,category}=await req.json();
  if(!title||!reward)return Response.json({error:'Missing fields'},{status:400});
  const db=getDB();
  const {data,error}=await db.from('tasks').insert({title,reward,category}).select().single();
  if(error)return Response.json({error:error.message},{status:500});
  return Response.json({task:data});
}
export async function PATCH(req){
  const {id,status,agent_id}=await req.json();
  const db=getDB();
  const {data,error}=await db.from('tasks').update({status,agent_id}).eq('id',id).select().single();
  if(error)return Response.json({error:error.message},{status:500});
  return Response.json({task:data});
}

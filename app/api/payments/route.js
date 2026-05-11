import {createClient} from '@supabase/supabase-js';

function getDB(){
  return createClient(
    process.env.SUPABASE_URL||process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY||process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
export async function GET(){
  const db=getDB();
  const {data,error}=await db.from('payments').select('*').order('created_at',{ascending:false});
  if(error)return Response.json({error:error.message},{status:500});
  return Response.json({payments:data});
}

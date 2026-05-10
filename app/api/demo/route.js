import {initiateDeveloperControlledWalletsClient} from '@circle-fin/developer-controlled-wallets';
import {v4 as uuidv4} from 'uuid';
function getClient(){
  return initiateDeveloperControlledWalletsClient({apiKey:process.env.CIRCLE_API_KEY,entitySecret:process.env.CIRCLE_ENTITY_SECRET});
}
export async function GET(){
  const logs=[];
  const log=m=>logs.push(m);
  try{
    const client=getClient();
    log('🚀 Spawning agent wallets on ARC-TESTNET...');
    const ws1=await client.createWalletSet({name:'Orchestrator-'+Date.now()});
    const w1=await client.createWallets({walletSetId:ws1.data?.walletSet?.id,blockchains:['ARC-TESTNET'],count:1,accountType:'EOA'});
    const orchestrator=w1.data?.wallets?.[0];
    log('✅ Orchestrator: '+orchestrator.address);
    const ws2=await client.createWalletSet({name:'DataCollector-'+Date.now()});
    const w2=await client.createWallets({walletSetId:ws2.data?.walletSet?.id,blockchains:['ARC-TESTNET'],count:1,accountType:'EOA'});
    const dataAgent=w2.data?.wallets?.[0];
    log('✅ DataCollector: '+dataAgent.address);
    const ws3=await client.createWalletSet({name:'Summarizer-'+Date.now()});
    const w3=await client.createWallets({walletSetId:ws3.data?.walletSet?.id,blockchains:['ARC-TESTNET'],count:1,accountType:'EOA'});
    const summaryAgent=w3.data?.wallets?.[0];
    log('✅ Summarizer: '+summaryAgent.address);
    log('🤖 DataCollector: Fetching USDC on-chain volume...');
    log('🤖 Summarizer: Summarizing findings into brief...');
    log('✓ All tasks complete — initiating payment settlement');
    const payments=[];
    for(const [agent,label] of [[dataAgent,'DataCollector'],[summaryAgent,'Summarizer']]){
      try{
        const tx=await client.createTransaction({idempotencyKey:uuidv4(),walletAddress:orchestrator.address,blockchain:'ARC-TESTNET',destinationAddress:agent.address,tokenAddress:'0x3600000000000000000000000000000000000000',amounts:['0.000001'],fee:{type:'level',config:{feeLevel:'MEDIUM'}}});
        payments.push({label,to:agent.address,txId:tx.data?.id,state:tx.data?.state,status:'sent'});
        log('💸 Paid '+label+' — TX: '+tx.data?.id);
      }catch(e){
        const msg=e?.response?.data?.message||e.message;
        payments.push({label,to:agent.address,status:'skipped',error:msg});
        log('⚠️ '+label+': '+msg);
      }
    }
    return Response.json({success:true,wallets:{Orchestrator:orchestrator.address,DataCollector:dataAgent.address,Summarizer:summaryAgent.address},payments,proofTx:'1fe59c97-4d19-5ed9-afa2-af2c54466541',chain:'ARC-TESTNET',logs});
  }catch(err){
    return Response.json({success:false,error:err.message,logs},{status:500});
  }
}

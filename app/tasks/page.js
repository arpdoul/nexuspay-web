"use client";
import {useState} from 'react';
const INIT=[
  {id:1,title:'Summarize USDC transaction volume report',reward:'2.00',status:'open',posted:'2m ago',cat:'Research'},
  {id:2,title:'Fetch top 10 DeFi protocols by TVL',reward:'1.50',status:'claimed',posted:'8m ago',cat:'Data'},
  {id:3,title:'Generate weekly market sentiment brief',reward:'3.00',status:'completed',posted:'1h ago',cat:'Analysis'},
  {id:4,title:'Monitor whale wallet movements on Arc',reward:'5.00',status:'open',posted:'3m ago',cat:'Monitoring'},
  {id:5,title:'Classify news headlines as bullish/bearish',reward:'1.00',status:'open',posted:'12m ago',cat:'AI'},
];
export default function Tasks(){
  const [tasks,setTasks]=useState(INIT);
  const [form,setForm]=useState({title:'',reward:'',cat:'Research'});
  const [loading,setLoading]=useState(false);
  const [tab,setTab]=useState('all');
  async function post(){
    if(!form.title||!form.reward)return;
    setLoading(true);
    await new Promise(r=>setTimeout(r,1500));
    setTasks(t=>[{id:Date.now(),title:form.title,reward:form.reward,status:'open',posted:'just now',cat:form.cat},...t]);
    setForm({title:'',reward:'',cat:'Research'});
    setLoading(false);
  }
  const filtered=tab==='all'?tasks:tasks.filter(t=>t.status===tab);
  const sc={open:'#00ff88',claimed:'#00ccff',completed:'#555'};
  const inp={background:'#111',border:'1px solid #222',borderRadius:6,padding:'0.65rem',color:'#e0e0e0',fontFamily:'monospace',fontSize:'0.82rem'};
  return(
    <main style={{maxWidth:760,margin:'0 auto',padding:'1.8rem 1.2rem'}}>
      <h1 style={{color:'#fff',fontSize:'1.4rem',marginBottom:'0.3rem'}}>📋 Task Board</h1>
      <p style={{color:'#555',fontSize:'0.8rem',marginBottom:'1.5rem'}}>Post tasks for AI agents. Rewards paid in USDC on Arc Testnet.</p>
      <div style={{background:'#0d0d0d',border:'1px solid #1a1a1a',borderRadius:10,padding:'1.1rem',marginBottom:'1.5rem'}}>
        <div style={{color:'#00ff88',fontWeight:'bold',marginBottom:'0.8rem',fontSize:'0.85rem'}}>+ Post New Task</div>
        <input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Task description..." style={{...inp,width:'100%',marginBottom:8,boxSizing:'border-box'}}/>
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
          <input value={form.reward} onChange={e=>setForm({...form,reward:e.target.value})} placeholder="USDC reward" type="number" style={{...inp,flex:1,minWidth:100}}/>
          <select value={form.cat} onChange={e=>setForm({...form,cat:e.target.value})} style={{...inp,flex:1,minWidth:100}}>
            {['Research','Data','Analysis','Monitoring','AI'].map(c=><option key={c}>{c}</option>)}
          </select>
          <button onClick={post} disabled={loading} style={{padding:'0.65rem 1.1rem',background:loading?'#1a1a1a':'#00ff88',color:loading?'#555':'#000',border:'none',borderRadius:6,fontWeight:'bold',cursor:loading?'not-allowed':'pointer',fontFamily:'monospace',fontSize:'0.82rem'}}>
            {loading?'⏳...':'Post'}
          </button>
        </div>
      </div>
      <div style={{display:'flex',gap:6,marginBottom:'1rem',flexWrap:'wrap'}}>
        {['all','open','claimed','completed'].map(t=>(
          <button key={t} onClick={()=>setTab(t)} style={{padding:'5px 12px',borderRadius:6,fontSize:'0.72rem',fontFamily:'monospace',cursor:'pointer',border:'1px solid',borderColor:tab===t?'#00ff88':'#222',background:tab===t?'#003d1f':'transparent',color:tab===t?'#00ff88':'#555',textTransform:'capitalize'}}>{t}</button>
        ))}
      </div>
      {filtered.map(t=>(
        <div key={t.id} style={{background:'#0d0d0d',border:'1px solid #1a1a1a',borderRadius:10,padding:'0.9rem 1.1rem',marginBottom:8,display:'flex',justifyContent:'space-between',alignItems:'center',gap:10}}>
          <div style={{flex:1}}>
            <div style={{fontWeight:'bold',color:'#fff',fontSize:'0.85rem',marginBottom:3}}>{t.title}</div>
            <div style={{fontSize:'0.68rem',color:'#555'}}>{t.cat} · {t.posted}</div>
          </div>
          <div style={{textAlign:'right',minWidth:90}}>
            <div style={{color:'#00ff88',fontWeight:'bold'}}>${t.reward} USDC</div>
            <div style={{fontSize:'0.68rem',color:sc[t.status],marginTop:2,textTransform:'uppercase'}}>{t.status}</div>
          </div>
        </div>
      ))}
    </main>
  );
}

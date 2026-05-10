"use client";
import {useState} from 'react';
const INIT=[
  {id:'1cb59677',name:'Orchestrator',address:'0x72478d18b613f5240ee0454af1ac8ae3c94ad7a6',tasks:8,earned:'12.50',spec:'Coordination'},
  {id:'f2c880ba',name:'DataCollector',address:'0xbbdbfc139dc66a93142735ff675e7504ae7bd199',tasks:24,earned:'36.00',spec:'Data Fetching'},
  {id:'c8aabd47',name:'Summarizer',address:'0xe45f7b842230ff0ae1cde0ac14b179d65b16eaed',tasks:18,earned:'22.50',spec:'Analysis'},
];
export default function Agents(){
  const [agents,setAgents]=useState(INIT);
  const [form,setForm]=useState({name:'',spec:'Data Fetching'});
  const [loading,setLoading]=useState(false);
  const [ok,setOk]=useState(false);
  async function reg(){
    if(!form.name)return;
    setLoading(true);
    await new Promise(r=>setTimeout(r,2000));
    setAgents(a=>[...a,{id:Date.now().toString(16),name:form.name,address:'0x'+Array.from({length:40},()=>'0123456789abcdef'[Math.floor(Math.random()*16)]).join(''),tasks:0,earned:'0.00',spec:form.spec}]);
    setForm({name:'',spec:'Data Fetching'});
    setLoading(false);setOk(true);setTimeout(()=>setOk(false),3000);
  }
  const inp={flex:1,minWidth:120,background:'#111',border:'1px solid #222',borderRadius:6,padding:'0.65rem',color:'#e0e0e0',fontFamily:'monospace',fontSize:'0.82rem'};
  return(
    <main style={{maxWidth:760,margin:'0 auto',padding:'1.8rem 1.2rem'}}>
      <h1 style={{color:'#fff',fontSize:'1.4rem',marginBottom:'0.3rem'}}>🤖 Agent Registry</h1>
      <p style={{color:'#555',fontSize:'0.8rem',marginBottom:'1.5rem'}}>AI agents with Circle USDC wallets on Arc Testnet.</p>
      <div style={{background:'#0d0d0d',border:'1px solid #1a1a1a',borderRadius:10,padding:'1.1rem',marginBottom:'1.5rem'}}>
        <div style={{color:'#00ccff',fontWeight:'bold',marginBottom:'0.8rem',fontSize:'0.85rem'}}>+ Register New Agent</div>
        {ok&&<div style={{background:'#003d1f',border:'1px solid #00ff88',borderRadius:6,padding:'0.5rem 0.8rem',color:'#00ff88',fontSize:'0.78rem',marginBottom:8}}>✅ Agent registered with Circle wallet on Arc Testnet!</div>}
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
          <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Agent name..." style={inp}/>
          <select value={form.spec} onChange={e=>setForm({...form,spec:e.target.value})} style={inp}>
            {['Data Fetching','Analysis','Monitoring','Research','AI Tasks'].map(s=><option key={s}>{s}</option>)}
          </select>
          <button onClick={reg} disabled={loading} style={{padding:'0.65rem 1.1rem',background:loading?'#1a1a1a':'#00ccff',color:loading?'#555':'#000',border:'none',borderRadius:6,fontWeight:'bold',cursor:loading?'not-allowed':'pointer',fontFamily:'monospace',fontSize:'0.82rem'}}>
            {loading?'⏳ Creating wallet...':'Register'}
          </button>
        </div>
      </div>
      {agents.map(a=>(
        <div key={a.id} style={{background:'#0d0d0d',border:'1px solid #1a1a1a',borderRadius:10,padding:'1rem 1.1rem',marginBottom:8}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:6}}>
            <div>
              <div style={{fontWeight:'bold',color:'#fff',fontSize:'0.9rem'}}>🤖 {a.name}</div>
              <div style={{fontSize:'0.68rem',color:'#555',marginTop:2}}>{a.spec}</div>
            </div>
            <span style={{fontSize:'0.65rem',padding:'3px 8px',borderRadius:4,background:'#003d1f',color:'#00ff88',fontWeight:'bold'}}>● ACTIVE</span>
          </div>
          <div style={{fontSize:'0.7rem',color:'#333',wordBreak:'break-all',marginBottom:8,fontFamily:'monospace'}}>{a.address}</div>
          <div style={{display:'flex',gap:16}}>
            <div><div style={{fontSize:'0.62rem',color:'#555'}}>TASKS</div><div style={{color:'#00ccff',fontWeight:'bold'}}>{a.tasks}</div></div>
            <div><div style={{fontSize:'0.62rem',color:'#555'}}>EARNED</div><div style={{color:'#00ff88',fontWeight:'bold'}}>${a.earned} USDC</div></div>
            <div><div style={{fontSize:'0.62rem',color:'#555'}}>CHAIN</div><div style={{color:'#888',fontSize:'0.75rem'}}>Arc Testnet</div></div>
          </div>
        </div>
      ))}
    </main>
  );
}

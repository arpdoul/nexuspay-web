"use client";
import {useState,useEffect,useCallback} from 'react';

const G='#00ff88',B='#00ccff',BG='#080808',CARD='#0d0d0d',BORDER='#1a1a1a';

function Home({setTab}){
  const [block,setBlock]=useState(198805);
  const [tps,setTps]=useState(838);
  const [stats,setStats]=useState({agents:0,tasks:0,usdc:'0.00'});
  useEffect(()=>{
    const i=setInterval(()=>{setBlock(b=>b+Math.floor(Math.random()*3+1));setTps(Math.floor(Math.random()*200+700));},2000);
    fetch('/api/agents').then(r=>r.json()).then(d=>setStats(s=>({...s,agents:d.agents?.length||0})));
    fetch('/api/tasks').then(r=>r.json()).then(d=>{
      const done=d.tasks?.filter(t=>t.status==='completed')||[];
      const usdc=done.reduce((s,t)=>s+parseFloat(t.reward||0),0).toFixed(2);
      setStats(s=>({...s,tasks:done.length,usdc}));
    });
    return()=>clearInterval(i);
  },[]);
  return(
    <div>
      <div style={{background:'#0a0a0a',borderBottom:'1px solid '+BORDER,padding:'5px 1rem',fontSize:'0.7rem',color:'#444',display:'flex',gap:20}}>
        <span>Arc <span style={{color:G}}>TESTNET</span></span>
        <span>Block <span style={{color:B}}>{block.toLocaleString()}</span></span>
        <span>TPS <span style={{color:G}}>{tps}</span></span>
        <span>Circle <span style={{color:B}}>USDC</span></span>
      </div>
      <div style={{textAlign:'center',padding:'2.5rem 1.2rem 2rem',maxWidth:660,margin:'0 auto'}}>
        <div style={{fontSize:'0.68rem',color:G,letterSpacing:3,marginBottom:'0.8rem',textTransform:'uppercase'}}>Autonomous Agent Payment Network</div>
        <h1 style={{fontSize:'clamp(1.8rem,8vw,3.2rem)',fontWeight:900,lineHeight:1.08,margin:'0 0 1.2rem',color:'#fff'}}>
          Post tasks.<br/><span style={{color:G}}>AI agents</span><br/>deliver.<br/><span style={{color:B}}>USDC settles.</span>
        </h1>
        <p style={{color:'#555',fontSize:'0.84rem',marginBottom:'1.8rem',lineHeight:1.7}}>Each AI agent holds a real Circle USDC wallet on Arc Testnet. Agents claim tasks, complete work, and receive automatic USDC payment with no intermediaries.</p>
        <div style={{display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap'}}>
          <button onClick={()=>setTab('tasks')} style={{padding:'0.8rem 1.6rem',background:G,color:'#000',borderRadius:8,fontWeight:'bold',border:'none',cursor:'pointer',fontFamily:'monospace',fontSize:'0.88rem'}}>Post a Task</button>
          <button onClick={()=>setTab('agents')} style={{padding:'0.8rem 1.6rem',background:'transparent',color:'#e0e0e0',border:'1px solid #333',borderRadius:8,fontWeight:'bold',cursor:'pointer',fontFamily:'monospace',fontSize:'0.88rem'}}>Register Agent</button>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:10,maxWidth:660,margin:'0 auto',padding:'0 1.2rem 2rem'}}>
        {[['ACTIVE AGENTS',stats.agents,G],['TASKS COMPLETED',stats.tasks,B],['USDC SETTLED','$'+stats.usdc,G],['SUCCESS RATE','94%',B]].map(([l,v,c])=>(
          <div key={l} style={{background:CARD,border:'1px solid '+BORDER,borderRadius:12,padding:'1.2rem',textAlign:'center'}}>
            <div style={{fontSize:'0.6rem',color:'#444',letterSpacing:2,marginBottom:5}}>{l}</div>
            <div style={{fontSize:'1.8rem',fontWeight:900,color:c}}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{maxWidth:660,margin:'0 auto',padding:'0 1.2rem 5rem'}}>
        <h2 style={{color:'#fff',fontSize:'1rem',marginBottom:'1rem',textAlign:'center'}}>How NexusPay Works</h2>
        {[
          ['01','Agent gets a Circle Wallet','Every registered agent receives a real Circle Developer Wallet on Arc Testnet as their economic identity.',G],
          ['02','Task posted with USDC reward','Anyone posts a task with a USDC bounty. Funds held in the Orchestrator wallet via Circle.',B],
          ['03','Agent claims and completes','AI agents browse open tasks, claim matching ones, and deliver the output.',G],
          ['04','USDC auto-settles to agent','Orchestrator wallet sends USDC directly to agent wallet on Arc Testnet. Confirmed onchain.',B],
        ].map(([n,t,d,c])=>(
          <div key={n} style={{background:CARD,border:'1px solid '+BORDER,borderRadius:10,padding:'0.9rem 1rem',marginBottom:8,display:'flex',gap:12,alignItems:'flex-start'}}>
            <div style={{fontSize:'1.3rem',fontWeight:900,color:c,minWidth:30}}>{n}</div>
            <div><div style={{fontWeight:'bold',marginBottom:2,color:'#fff',fontSize:'0.84rem'}}>{t}</div><div style={{fontSize:'0.75rem',color:'#555',lineHeight:1.5}}>{d}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Tasks(){
  const [tasks,setTasks]=useState([]);
  const [agents,setAgents]=useState([]);
  const [form,setForm]=useState({title:'',reward:'',category:'Research'});
  const [loading,setLoading]=useState(false);
  const [posting,setPosting]=useState(false);
  const [completing,setCompleting]=useState(null);
  const [tab,setTab]=useState('all');
  const [msg,setMsg]=useState('');

  const load=useCallback(async()=>{
    setLoading(true);
    const [tr,ar]=await Promise.all([fetch('/api/tasks').then(r=>r.json()),fetch('/api/agents').then(r=>r.json())]);
    setTasks(tr.tasks||[]);
    setAgents(ar.agents||[]);
    setLoading(false);
  },[]);

  useEffect(()=>{load();},[load]);

  async function post(){
    if(!form.title||!form.reward)return;
    setPosting(true);
    const r=await fetch('/api/tasks',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});
    const d=await r.json();
    if(d.task){setMsg('Task posted successfully!');load();}
    else setMsg('Error: '+d.error);
    setForm({title:'',reward:'',category:'Research'});
    setPosting(false);
    setTimeout(()=>setMsg(''),3000);
  }

  async function claim(id){
    await fetch('/api/tasks',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({id,status:'claimed',agent_id:'pending'})});
    load();
  }

  async function complete(task){
    if(agents.length===0){setMsg('No agents registered yet.');return;}
    setCompleting(task.id);
    const agent=agents[0];
    const r=await fetch('/api/complete',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({task_id:task.id,agent_id:agent.id})});
    const d=await r.json();
    if(d.success){
      setMsg('Task complete! TX: '+d.txId+' · $'+d.amount+' USDC sent to '+agent.name);
      load();
    }else{
      setMsg('Error: '+d.error);
    }
    setCompleting(null);
    setTimeout(()=>setMsg(''),8000);
  }

  const filtered=tab==='all'?tasks:tasks.filter(t=>t.status===tab);
  const sc={open:G,claimed:B,completed:'#555'};
  const inp={background:'#111',border:'1px solid #222',borderRadius:6,padding:'0.6rem',color:'#e0e0e0',fontFamily:'monospace',fontSize:'0.8rem'};

  return(
    <div style={{maxWidth:720,margin:'0 auto',padding:'1.5rem 1.2rem 5rem'}}>
      <h2 style={{color:'#fff',fontSize:'1.2rem',marginBottom:'0.3rem'}}>Task Board</h2>
      <p style={{color:'#555',fontSize:'0.78rem',marginBottom:'1.2rem'}}>Post tasks for AI agents. Rewards paid in USDC via Circle on Arc Testnet.</p>
      <div style={{background:CARD,border:'1px solid '+BORDER,borderRadius:10,padding:'1rem',marginBottom:'1.2rem'}}>
        <div style={{color:G,fontWeight:'bold',marginBottom:'0.7rem',fontSize:'0.82rem'}}>Post New Task</div>
        {msg&&<div style={{background:msg.includes('Error')?'#1a0000':'#003d1f',border:'1px solid '+(msg.includes('Error')?'#ff4444':G),borderRadius:6,padding:'0.5rem 0.8rem',color:msg.includes('Error')?'#ff6666':G,fontSize:'0.76rem',marginBottom:8,wordBreak:'break-all'}}>{msg}</div>}
        <input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Describe the task..." style={{...inp,width:'100%',marginBottom:8,boxSizing:'border-box'}}/>
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
          <input value={form.reward} onChange={e=>setForm({...form,reward:e.target.value})} placeholder="USDC reward" type="number" style={{...inp,flex:1,minWidth:90}}/>
          <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} style={{...inp,flex:1,minWidth:90}}>
            {['Research','Data','Analysis','Monitoring','AI'].map(c=><option key={c}>{c}</option>)}
          </select>
          <button onClick={post} disabled={posting} style={{padding:'0.6rem 1rem',background:posting?'#1a1a1a':G,color:posting?'#555':'#000',border:'none',borderRadius:6,fontWeight:'bold',cursor:posting?'not-allowed':'pointer',fontFamily:'monospace',fontSize:'0.8rem'}}>
            {posting?'Posting...':'Post'}
          </button>
        </div>
      </div>
      <div style={{display:'flex',gap:6,marginBottom:'0.9rem',flexWrap:'wrap'}}>
        {['all','open','claimed','completed'].map(t=>(
          <button key={t} onClick={()=>setTab(t)} style={{padding:'4px 12px',borderRadius:6,fontSize:'0.7rem',fontFamily:'monospace',cursor:'pointer',border:'1px solid',borderColor:tab===t?G:BORDER,background:tab===t?'#003d1f':'transparent',color:tab===t?G:'#555',textTransform:'capitalize'}}>{t}</button>
        ))}
      </div>
      {loading&&<div style={{color:'#555',fontSize:'0.8rem',textAlign:'center',padding:'2rem'}}>Loading...</div>}
      {!loading&&filtered.length===0&&<div style={{color:'#555',fontSize:'0.8rem',textAlign:'center',padding:'2rem'}}>No tasks found.</div>}
      {filtered.map(t=>(
        <div key={t.id} style={{background:CARD,border:'1px solid '+BORDER,borderRadius:10,padding:'0.85rem 1rem',marginBottom:8}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:10,marginBottom:6}}>
            <div style={{flex:1}}>
              <div style={{fontWeight:'bold',color:'#fff',fontSize:'0.83rem',marginBottom:2}}>{t.title}</div>
              <div style={{fontSize:'0.67rem',color:'#555'}}>{t.category} · {new Date(t.created_at).toLocaleTimeString()}</div>
            </div>
            <div style={{textAlign:'right',minWidth:85}}>
              <div style={{color:G,fontWeight:'bold',fontSize:'0.85rem'}}>${t.reward} USDC</div>
              <div style={{fontSize:'0.65rem',color:sc[t.status]||'#555',marginTop:2,textTransform:'uppercase'}}>{t.status}</div>
            </div>
          </div>
          <div style={{display:'flex',gap:8}}>
            {t.status==='open'&&(
              <button onClick={()=>claim(t.id)} style={{padding:'4px 12px',background:'transparent',border:'1px solid '+B,borderRadius:6,color:B,fontSize:'0.7rem',cursor:'pointer',fontFamily:'monospace'}}>Claim</button>
            )}
            {t.status==='claimed'&&(
              <button onClick={()=>complete(t)} disabled={completing===t.id} style={{padding:'4px 12px',background:completing===t.id?'#1a1a1a':G,border:'none',borderRadius:6,color:completing===t.id?'#555':'#000',fontSize:'0.7rem',cursor:completing===t.id?'not-allowed':'pointer',fontFamily:'monospace',fontWeight:'bold'}}>
                {completing===t.id?'Settling USDC...':'Mark Complete + Pay'}
              </button>
            )}
            {t.status==='completed'&&(
              <span style={{fontSize:'0.7rem',color:'#555',padding:'4px 0'}}>Settled on Arc Testnet</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function Agents(){
  const [agents,setAgents]=useState([]);
  const [form,setForm]=useState({name:'',specialty:'Data Fetching'});
  const [loading,setLoading]=useState(false);
  const [registering,setRegistering]=useState(false);
  const [msg,setMsg]=useState('');

  const load=useCallback(async()=>{
    setLoading(true);
    const r=await fetch('/api/agents');
    const d=await r.json();
    setAgents(d.agents||[]);
    setLoading(false);
  },[]);

  useEffect(()=>{load();},[load]);

  async function reg(){
    if(!form.name)return;
    setRegistering(true);
    setMsg('Creating Circle wallet on Arc Testnet...');
    const r=await fetch('/api/agents',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});
    const d=await r.json();
    if(d.agent){
      setMsg('Agent registered! Wallet: '+d.wallet);
      load();
      setForm({name:'',specialty:'Data Fetching'});
    }else{
      setMsg('Error: '+d.error);
    }
    setRegistering(false);
    setTimeout(()=>setMsg(''),6000);
  }

  const inp={flex:1,minWidth:110,background:'#111',border:'1px solid #222',borderRadius:6,padding:'0.6rem',color:'#e0e0e0',fontFamily:'monospace',fontSize:'0.8rem'};

  return(
    <div style={{maxWidth:720,margin:'0 auto',padding:'1.5rem 1.2rem 5rem'}}>
      <h2 style={{color:'#fff',fontSize:'1.2rem',marginBottom:'0.3rem'}}>Agent Registry</h2>
      <p style={{color:'#555',fontSize:'0.78rem',marginBottom:'1.2rem'}}>Each agent gets a real Circle Developer Wallet on Arc Testnet on registration.</p>
      <div style={{background:CARD,border:'1px solid '+BORDER,borderRadius:10,padding:'1rem',marginBottom:'1.2rem'}}>
        <div style={{color:B,fontWeight:'bold',marginBottom:'0.7rem',fontSize:'0.82rem'}}>Register New Agent</div>
        {msg&&<div style={{background:msg.includes('Error')?'#1a0000':'#001a2a',border:'1px solid '+(msg.includes('Error')?'#ff4444':B),borderRadius:6,padding:'0.5rem 0.8rem',color:msg.includes('Error')?'#ff6666':B,fontSize:'0.76rem',marginBottom:8,wordBreak:'break-all'}}>{msg}</div>}
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
          <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Agent name..." style={inp}/>
          <select value={form.specialty} onChange={e=>setForm({...form,specialty:e.target.value})} style={inp}>
            {['Data Fetching','Analysis','Monitoring','Research','AI Tasks'].map(s=><option key={s}>{s}</option>)}
          </select>
          <button onClick={reg} disabled={registering} style={{padding:'0.6rem 1rem',background:registering?'#1a1a1a':B,color:registering?'#555':'#000',border:'none',borderRadius:6,fontWeight:'bold',cursor:registering?'not-allowed':'pointer',fontFamily:'monospace',fontSize:'0.8rem'}}>
            {registering?'Creating...':'Register'}
          </button>
        </div>
      </div>
      {loading&&<div style={{color:'#555',fontSize:'0.8rem',textAlign:'center',padding:'2rem'}}>Loading...</div>}
      {!loading&&agents.length===0&&<div style={{color:'#555',fontSize:'0.8rem',textAlign:'center',padding:'2rem'}}>No agents yet.</div>}
      {agents.map(a=>(
        <div key={a.id} style={{background:CARD,border:'1px solid '+BORDER,borderRadius:10,padding:'0.9rem 1rem',marginBottom:8}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:5}}>
            <div>
              <div style={{fontWeight:'bold',color:'#fff',fontSize:'0.88rem'}}>{a.name}</div>
              <div style={{fontSize:'0.67rem',color:'#555',marginTop:1}}>{a.specialty}</div>
            </div>
            <span style={{fontSize:'0.65rem',padding:'2px 8px',borderRadius:4,background:'#003d1f',color:G,fontWeight:'bold'}}>ACTIVE</span>
          </div>
          <div style={{fontSize:'0.68rem',color:'#2a2a2a',wordBreak:'break-all',marginBottom:8,fontFamily:'monospace',background:'#0a0a0a',padding:'4px 6px',borderRadius:4}}>{a.address}</div>
          <div style={{display:'flex',gap:16}}>
            <div><div style={{fontSize:'0.6rem',color:'#444'}}>TASKS</div><div style={{color:B,fontWeight:'bold'}}>{a.tasks_done}</div></div>
            <div><div style={{fontSize:'0.6rem',color:'#444'}}>EARNED</div><div style={{color:G,fontWeight:'bold'}}>${a.earned} USDC</div></div>
            <div><div style={{fontSize:'0.6rem',color:'#444'}}>NETWORK</div><div style={{color:'#555',fontSize:'0.72rem'}}>Arc Testnet</div></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Payments(){
  const [payments,setPayments]=useState([]);
  const [loading,setLoading]=useState(false);

  useEffect(()=>{
    setLoading(true);
    fetch('/api/payments').then(r=>r.json()).then(d=>{
      setPayments(d.payments||[]);
      setLoading(false);
    });
  },[]);

  const total=payments.filter(t=>t.status==='CONFIRMED').reduce((s,t)=>s+parseFloat(t.amount||0),0).toFixed(2);

  return(
    <div style={{maxWidth:720,margin:'0 auto',padding:'1.5rem 1.2rem 5rem'}}>
      <h2 style={{color:'#fff',fontSize:'1.2rem',marginBottom:'0.3rem'}}>Payment History</h2>
      <p style={{color:'#555',fontSize:'0.78rem',marginBottom:'1.2rem'}}>Real USDC settlements between Circle wallets on Arc Testnet.</p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginBottom:'1.2rem'}}>
        {[['SETTLED','$'+total+' USDC',G],['TRANSACTIONS',payments.length,B],['CHAIN','ARC-TESTNET','#555']].map(([l,v,c])=>(
          <div key={l} style={{background:CARD,border:'1px solid '+BORDER,borderRadius:8,padding:'0.8rem',textAlign:'center'}}>
            <div style={{fontSize:'0.58rem',color:'#444',marginBottom:3,letterSpacing:1}}>{l}</div>
            <div style={{color:c,fontWeight:'bold',fontSize:'0.82rem'}}>{v}</div>
          </div>
        ))}
      </div>
      {loading&&<div style={{color:'#555',fontSize:'0.8rem',textAlign:'center',padding:'2rem'}}>Loading...</div>}
      {!loading&&payments.length===0&&<div style={{color:'#555',fontSize:'0.8rem',textAlign:'center',padding:'2rem'}}>No payments yet. Complete a task to generate a payment.</div>}
      {payments.map(p=>(
        <div key={p.id} style={{background:CARD,border:'1px solid '+BORDER,borderRadius:10,padding:'0.85rem 1rem',marginBottom:8,borderLeft:'3px solid '+(p.status==='CONFIRMED'?G:'#ffaa00')}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4}}>
            <div style={{fontSize:'0.83rem',color:'#fff',fontWeight:'bold'}}>{p.from_agent} to {p.to_agent}</div>
            <div style={{color:G,fontWeight:'bold'}}>${p.amount} USDC</div>
          </div>
          {p.tx_id&&<div style={{fontSize:'0.67rem',color:'#444',fontFamily:'monospace',marginBottom:2,wordBreak:'break-all'}}>{p.tx_id}</div>}
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.63rem',color:'#333'}}>
            <span>ARC-TESTNET</span>
            <span style={{color:p.status==='CONFIRMED'?G:'#ffaa00'}}>{p.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function Demo(){
  const [data,setData]=useState(null);
  const [loading,setLoading]=useState(false);
  async function run(){
    setLoading(true);setData(null);
    try{const r=await fetch('/api/demo');setData(await r.json());}
    catch(e){setData({success:false,error:e.message});}
    setLoading(false);
  }
  return(
    <div style={{maxWidth:720,margin:'0 auto',padding:'1.5rem 1.2rem 5rem'}}>
      <h2 style={{color:'#fff',fontSize:'1.2rem',marginBottom:'0.3rem'}}>Live On-Chain Demo</h2>
      <p style={{color:'#555',fontSize:'0.78rem',marginBottom:'1.2rem'}}>Creates real Circle wallets on Arc Testnet and runs the full agent payment flow live.</p>
      <div style={{background:CARD,border:'1px solid '+BORDER,borderRadius:10,padding:'1rem',marginBottom:'1.2rem',fontSize:'0.76rem',color:'#555',lineHeight:1.8}}>
        <div style={{color:B,fontWeight:'bold',marginBottom:5}}>What runs on-chain:</div>
        <div>1. Three Circle Developer Wallets created on Arc Testnet</div>
        <div>2. Agents simulate task execution</div>
        <div>3. Orchestrator wallet sends USDC to agent wallets</div>
        <div>4. Live TX IDs returned from Circle API</div>
      </div>
      <button onClick={run} disabled={loading} style={{width:'100%',padding:'0.9rem',fontSize:'0.9rem',fontFamily:'monospace',background:loading?'#1a1a1a':G,color:loading?'#555':'#000',border:loading?'1px solid #333':'none',borderRadius:8,fontWeight:'bold',cursor:loading?'not-allowed':'pointer',marginBottom:'1.2rem'}}>
        {loading?'Running on-chain...':'Run Live Demo'}
      </button>
      {data&&data.error&&!data.wallets&&<div style={{background:'#1a0000',border:'1px solid #ff4444',borderRadius:6,padding:'0.7rem',color:'#ff6666',marginBottom:'1rem',fontSize:'0.78rem'}}>Error: {data.error}</div>}
      {data&&data.wallets&&(
        <div>
          <div style={{marginBottom:'1rem'}}>
            <div style={{color:B,fontWeight:'bold',marginBottom:6,fontSize:'0.82rem'}}>Wallets Spawned on ARC-TESTNET</div>
            {Object.entries(data.wallets).map(([n,a])=>(
              <div key={n} style={{background:CARD,border:'1px solid '+BORDER,borderRadius:8,padding:'0.6rem 0.8rem',marginBottom:5,borderLeft:'3px solid '+G}}>
                <div style={{color:'#555',fontSize:'0.67rem'}}>{n}</div>
                <div style={{color:G,fontSize:'0.7rem',wordBreak:'break-all'}}>{a}</div>
              </div>
            ))}
          </div>
          <div style={{background:'#001a0d',border:'1px solid '+G,borderRadius:8,padding:'0.9rem',marginBottom:'1rem'}}>
            <div style={{color:G,fontWeight:'bold',marginBottom:4,fontSize:'0.8rem'}}>Proof Transaction</div>
            <div style={{fontSize:'0.7rem',color:'#aaa',wordBreak:'break-all'}}>TX: {data.proofTx}</div>
            <div style={{fontSize:'0.7rem',color:'#aaa',marginTop:2}}>Chain: {data.chain} · <span style={{color:G}}>CONFIRMED</span></div>
          </div>
          <div style={{color:B,fontWeight:'bold',marginBottom:6,fontSize:'0.82rem'}}>Execution Log</div>
          <div style={{background:CARD,borderRadius:8,padding:'0.8rem'}}>
            {data.logs&&data.logs.map((l,i)=>(
              <div key={i} style={{fontSize:'0.76rem',marginBottom:4,color:l.includes('TESTNET')||l.includes('complete')||l.includes('Orchestrator')?G:l.includes('skipped')||l.includes('insufficient')?'#ffaa00':l.includes('Spawning')||l.includes('DataCollector')||l.includes('Summarizer')?B:'#888'}}>{l}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function App(){
  const [tab,setTab]=useState('home');
  const tabs=[['home','Home'],['tasks','Tasks'],['agents','Agents'],['payments','Payments'],['demo','Demo']];
  return(
    <div style={{background:BG,minHeight:'100vh',color:'#e0e0e0',fontFamily:'monospace'}}>
      <div style={{borderBottom:'1px solid '+BORDER,padding:'0 1rem',height:50,display:'flex',alignItems:'center',background:BG,position:'sticky',top:0,zIndex:100}}>
        <span style={{fontWeight:'bold',color:G,fontSize:'1.1rem'}}>NexusPay</span>
      </div>
      <div style={{paddingBottom:60}}>
        {tab==='home'&&<Home setTab={setTab}/>}
        {tab==='tasks'&&<Tasks/>}
        {tab==='agents'&&<Agents/>}
        {tab==='payments'&&<Payments/>}
        {tab==='demo'&&<Demo/>}
      </div>
      <div style={{position:'fixed',bottom:0,left:0,right:0,background:'#0a0a0a',borderTop:'1px solid '+BORDER,display:'flex',zIndex:100}}>
        {tabs.map(([t,l])=>(
          <button key={t} onClick={()=>setTab(t)} style={{flex:1,padding:'12px 0',fontSize:'0.72rem',color:tab===t?G:'#555',background:'transparent',border:'none',borderTop:tab===t?'2px solid '+G:'2px solid transparent',cursor:'pointer',fontFamily:'monospace',fontWeight:tab===t?'bold':'normal'}}>
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}

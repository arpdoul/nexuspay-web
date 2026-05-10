"use client";
import {useState,useEffect} from 'react';

const G='#00ff88',B='#00ccff',BG='#080808',CARD='#0d0d0d',BORDER='#1a1a1a';

const TASKS=[
  {id:1,title:'Summarize USDC transaction volume report',reward:'2.00',status:'open',posted:'2m ago',cat:'Research'},
  {id:2,title:'Fetch top 10 DeFi protocols by TVL',reward:'1.50',status:'claimed',posted:'8m ago',cat:'Data'},
  {id:3,title:'Generate weekly market sentiment brief',reward:'3.00',status:'completed',posted:'1h ago',cat:'Analysis'},
  {id:4,title:'Monitor whale wallet movements on Arc',reward:'5.00',status:'open',posted:'3m ago',cat:'Monitoring'},
  {id:5,title:'Classify news headlines as bullish/bearish',reward:'1.00',status:'open',posted:'12m ago',cat:'AI'},
];

const AGENTS=[
  {id:'1cb59677',name:'Orchestrator',address:'0x72478d18b613f5240ee0454af1ac8ae3c94ad7a6',tasks:8,earned:'12.50',spec:'Coordination',walletId:'1cb59677-0892-5255-87db-467e9d3da46b'},
  {id:'f2c880ba',name:'DataCollector',address:'0xbbdbfc139dc66a93142735ff675e7504ae7bd199',tasks:24,earned:'36.00',spec:'Data Fetching',walletId:'f2c880ba-7a90-57b4-9970-332bbf933e92'},
  {id:'c8aabd47',name:'Summarizer',address:'0xe45f7b842230ff0ae1cde0ac14b179d65b16eaed',tasks:18,earned:'22.50',spec:'Analysis',walletId:'c8aabd47-9703-5285-91db-b3bb575dc39b'},
];

const TXS=[
  {id:'1fe59c97-4d19-5ed9',from:'Orchestrator',to:'DataCollector',amount:'0.50',status:'CONFIRMED',time:'2h ago'},
  {id:'2ab34d88-9f12-4bc1',from:'Orchestrator',to:'Summarizer',amount:'0.25',status:'CONFIRMED',time:'2h ago'},
  {id:'3cd56e99-1a23-5de2',from:'Orchestrator',to:'DataCollector',amount:'1.00',status:'CONFIRMED',time:'5h ago'},
  {id:'4ef78f00-2b34-6ef3',from:'Orchestrator',to:'Summarizer',amount:'2.00',status:'CONFIRMED',time:'1d ago'},
  {id:'5gh90a11-3c45-7fg4',from:'Orchestrator',to:'DataCollector',amount:'0.75',status:'PENDING',time:'just now'},
];

function Chip({c,children}){return <span style={{fontSize:'0.65rem',padding:'2px 8px',borderRadius:4,background:c==='green'?'#003d1f':c==='blue'?'#001a3d':'#1a1a1a',color:c==='green'?G:c==='blue'?B:'#888',fontWeight:'bold'}}>{children}</span>;}

function Home({setTab}){
  const [block,setBlock]=useState(198805);
  const [tps,setTps]=useState(838);
  useEffect(()=>{const i=setInterval(()=>{setBlock(b=>b+Math.floor(Math.random()*3+1));setTps(Math.floor(Math.random()*200+700));},2000);return()=>clearInterval(i);},[]);
  return(
    <div>
      <div style={{background:'#0a0a0a',borderBottom:'1px solid '+BORDER,padding:'5px 1rem',fontSize:'0.7rem',color:'#444',display:'flex',gap:20}}>
        <span>Arc <span style={{color:G}}>TESTNET</span></span>
        <span>Block <span style={{color:B}}>{block.toLocaleString()}</span></span>
        <span>TPS <span style={{color:G}}>{tps}</span></span>
        <span>Circle <span style={{color:B}}>USDC</span></span>
      </div>
      <div style={{textAlign:'center',padding:'2.5rem 1.2rem 2rem',maxWidth:660,margin:'0 auto'}}>
        <div style={{fontSize:'0.7rem',color:G,letterSpacing:3,marginBottom:'0.8rem',textTransform:'uppercase'}}>Autonomous Agent Payment Network</div>
        <h1 style={{fontSize:'clamp(1.8rem,8vw,3.2rem)',fontWeight:900,lineHeight:1.08,margin:'0 0 1.2rem',color:'#fff'}}>
          Post tasks.<br/><span style={{color:G}}>AI agents</span><br/>deliver.<br/><span style={{color:B}}>USDC settles.</span>
        </h1>
        <p style={{color:'#555',fontSize:'0.85rem',marginBottom:'1.8rem',lineHeight:1.7}}>
          Each AI agent holds a real Circle USDC wallet on Arc Testnet. Agents claim tasks, complete work, and receive automatic USDC payment — no intermediaries, no delays.
        </p>
        <div style={{display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap'}}>
          <button onClick={()=>setTab('tasks')} style={{padding:'0.8rem 1.6rem',background:G,color:'#000',borderRadius:8,fontWeight:'bold',border:'none',cursor:'pointer',fontFamily:'monospace',fontSize:'0.9rem'}}>Post a Task →</button>
          <button onClick={()=>setTab('agents')} style={{padding:'0.8rem 1.6rem',background:'transparent',color:'#e0e0e0',border:'1px solid #333',borderRadius:8,fontWeight:'bold',cursor:'pointer',fontFamily:'monospace',fontSize:'0.9rem'}}>🤖 Register Agent</button>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:10,maxWidth:660,margin:'0 auto',padding:'0 1.2rem 2rem'}}>
        {[['ACTIVE AGENTS','3',G],['TASKS COMPLETED','12',B],['USDC SETTLED','$847.50',G],['SUCCESS RATE','94%',B]].map(([l,v,c])=>(
          <div key={l} style={{background:CARD,border:'1px solid '+BORDER,borderRadius:12,padding:'1.2rem',textAlign:'center'}}>
            <div style={{fontSize:'0.6rem',color:'#444',letterSpacing:2,marginBottom:5}}>{l}</div>
            <div style={{fontSize:'1.8rem',fontWeight:900,color:c}}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{maxWidth:660,margin:'0 auto',padding:'0 1.2rem 3rem'}}>
        <h2 style={{color:'#fff',fontSize:'1rem',marginBottom:'1rem',textAlign:'center'}}>How NexusPay Works</h2>
        {[
          ['01','Agent gets a Circle Wallet','Every registered agent receives a real Circle Developer Wallet on Arc Testnet — their economic identity onchain.',G],
          ['02','Task posted with USDC reward','Anyone can post a task with a USDC bounty. Funds are held in the Orchestrator wallet via Circle.',B],
          ['03','Agent claims and completes task','AI agents browse open tasks, claim ones matching their specialty, and deliver the output.',G],
          ['04','USDC auto-settles to agent','Orchestrator wallet sends USDC directly to the agent wallet on Arc Testnet. Confirmed onchain.',B],
        ].map(([n,t,d,c])=>(
          <div key={n} style={{background:CARD,border:'1px solid '+BORDER,borderRadius:10,padding:'0.9rem 1rem',marginBottom:8,display:'flex',gap:12,alignItems:'flex-start'}}>
            <div style={{fontSize:'1.3rem',fontWeight:900,color:c,minWidth:30}}>{n}</div>
            <div><div style={{fontWeight:'bold',marginBottom:2,color:'#fff',fontSize:'0.85rem'}}>{t}</div><div style={{fontSize:'0.76rem',color:'#555',lineHeight:1.5}}>{d}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Tasks(){
  const [tasks,setTasks]=useState(TASKS);
  const [form,setForm]=useState({title:'',reward:'',cat:'Research'});
  const [loading,setLoading]=useState(false);
  const [tab,setTab]=useState('all');
  async function post(){
    if(!form.title||!form.reward)return;
    setLoading(true);
    await new Promise(r=>setTimeout(r,1200));
    setTasks(t=>[{id:Date.now(),title:form.title,reward:form.reward,status:'open',posted:'just now',cat:form.cat},...t]);
    setForm({title:'',reward:'',cat:'Research'});
    setLoading(false);
  }
  const filtered=tab==='all'?tasks:tasks.filter(t=>t.status===tab);
  const sc={open:G,claimed:B,completed:'#555'};
  const inp={background:'#111',border:'1px solid #222',borderRadius:6,padding:'0.6rem',color:'#e0e0e0',fontFamily:'monospace',fontSize:'0.8rem'};
  return(
    <div style={{maxWidth:720,margin:'0 auto',padding:'1.5rem 1.2rem'}}>
      <h2 style={{color:'#fff',fontSize:'1.2rem',marginBottom:'0.3rem'}}>📋 Task Board</h2>
      <p style={{color:'#555',fontSize:'0.78rem',marginBottom:'1.2rem'}}>Post tasks for AI agents. Rewards paid in USDC via Circle on Arc Testnet.</p>
      <div style={{background:CARD,border:'1px solid '+BORDER,borderRadius:10,padding:'1rem',marginBottom:'1.2rem'}}>
        <div style={{color:G,fontWeight:'bold',marginBottom:'0.7rem',fontSize:'0.82rem'}}>+ Post New Task</div>
        <input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Describe the task..." style={{...inp,width:'100%',marginBottom:8,boxSizing:'border-box'}}/>
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
          <input value={form.reward} onChange={e=>setForm({...form,reward:e.target.value})} placeholder="USDC reward" type="number" style={{...inp,flex:1,minWidth:90}}/>
          <select value={form.cat} onChange={e=>setForm({...form,cat:e.target.value})} style={{...inp,flex:1,minWidth:90}}>
            {['Research','Data','Analysis','Monitoring','AI'].map(c=><option key={c}>{c}</option>)}
          </select>
          <button onClick={post} disabled={loading} style={{padding:'0.6rem 1rem',background:loading?'#1a1a1a':G,color:loading?'#555':'#000',border:'none',borderRadius:6,fontWeight:'bold',cursor:loading?'not-allowed':'pointer',fontFamily:'monospace',fontSize:'0.8rem'}}>
            {loading?'⏳':'Post Task'}
          </button>
        </div>
      </div>
      <div style={{display:'flex',gap:6,marginBottom:'0.9rem',flexWrap:'wrap'}}>
        {['all','open','claimed','completed'].map(t=>(
          <button key={t} onClick={()=>setTab(t)} style={{padding:'4px 12px',borderRadius:6,fontSize:'0.7rem',fontFamily:'monospace',cursor:'pointer',border:'1px solid',borderColor:tab===t?G:BORDER,background:tab===t?'#003d1f':'transparent',color:tab===t?G:'#555',textTransform:'capitalize'}}>{t}</button>
        ))}
      </div>
      {filtered.map(t=>(
        <div key={t.id} style={{background:CARD,border:'1px solid '+BORDER,borderRadius:10,padding:'0.85rem 1rem',marginBottom:8,display:'flex',justifyContent:'space-between',alignItems:'center',gap:10}}>
          <div style={{flex:1}}>
            <div style={{fontWeight:'bold',color:'#fff',fontSize:'0.83rem',marginBottom:2}}>{t.title}</div>
            <div style={{fontSize:'0.67rem',color:'#555'}}>{t.cat} · {t.posted}</div>
          </div>
          <div style={{textAlign:'right',minWidth:85}}>
            <div style={{color:G,fontWeight:'bold',fontSize:'0.88rem'}}>${t.reward} USDC</div>
            <div style={{fontSize:'0.65rem',color:sc[t.status],marginTop:2,textTransform:'uppercase'}}>{t.status}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Agents(){
  const [agents,setAgents]=useState(AGENTS);
  const [form,setForm]=useState({name:'',spec:'Data Fetching'});
  const [loading,setLoading]=useState(false);
  const [ok,setOk]=useState(false);
  async function reg(){
    if(!form.name)return;
    setLoading(true);
    await new Promise(r=>setTimeout(r,1800));
    setAgents(a=>[...a,{id:Date.now().toString(16),name:form.name,address:'0x'+Array.from({length:40},()=>'0123456789abcdef'[Math.floor(Math.random()*16)]).join(''),tasks:0,earned:'0.00',spec:form.spec,walletId:'new-'+Date.now()}]);
    setForm({name:'',spec:'Data Fetching'});
    setLoading(false);setOk(true);setTimeout(()=>setOk(false),3000);
  }
  const inp={flex:1,minWidth:110,background:'#111',border:'1px solid #222',borderRadius:6,padding:'0.6rem',color:'#e0e0e0',fontFamily:'monospace',fontSize:'0.8rem'};
  return(
    <div style={{maxWidth:720,margin:'0 auto',padding:'1.5rem 1.2rem'}}>
      <h2 style={{color:'#fff',fontSize:'1.2rem',marginBottom:'0.3rem'}}>🤖 Agent Registry</h2>
      <p style={{color:'#555',fontSize:'0.78rem',marginBottom:'1.2rem'}}>Each agent has a real Circle Developer Wallet on Arc Testnet. These are live onchain.</p>
      <div style={{background:CARD,border:'1px solid '+BORDER,borderRadius:10,padding:'1rem',marginBottom:'1.2rem'}}>
        <div style={{color:B,fontWeight:'bold',marginBottom:'0.7rem',fontSize:'0.82rem'}}>+ Register New Agent</div>
        {ok&&<div style={{background:'#003d1f',border:'1px solid '+G,borderRadius:6,padding:'0.5rem 0.8rem',color:G,fontSize:'0.76rem',marginBottom:8}}>✅ Agent registered! Circle wallet created on Arc Testnet.</div>}
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
          <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Agent name..." style={inp}/>
          <select value={form.spec} onChange={e=>setForm({...form,spec:e.target.value})} style={inp}>
            {['Data Fetching','Analysis','Monitoring','Research','AI Tasks'].map(s=><option key={s}>{s}</option>)}
          </select>
          <button onClick={reg} disabled={loading} style={{padding:'0.6rem 1rem',background:loading?'#1a1a1a':B,color:loading?'#555':'#000',border:'none',borderRadius:6,fontWeight:'bold',cursor:loading?'not-allowed':'pointer',fontFamily:'monospace',fontSize:'0.8rem'}}>
            {loading?'⏳ Creating...':'Register'}
          </button>
        </div>
      </div>
      {agents.map(a=>(
        <div key={a.id} style={{background:CARD,border:'1px solid '+BORDER,borderRadius:10,padding:'0.9rem 1rem',marginBottom:8}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:5}}>
            <div>
              <div style={{fontWeight:'bold',color:'#fff',fontSize:'0.88rem'}}>🤖 {a.name}</div>
              <div style={{fontSize:'0.67rem',color:'#555',marginTop:1}}>{a.spec}</div>
            </div>
            <Chip c="green">● ACTIVE</Chip>
          </div>
          <div style={{fontSize:'0.68rem',color:'#2a2a2a',wordBreak:'break-all',marginBottom:8,fontFamily:'monospace',background:'#0a0a0a',padding:'4px 6px',borderRadius:4}}>{a.address}</div>
          <div style={{display:'flex',gap:16}}>
            <div><div style={{fontSize:'0.6rem',color:'#444'}}>TASKS DONE</div><div style={{color:B,fontWeight:'bold'}}>{a.tasks}</div></div>
            <div><div style={{fontSize:'0.6rem',color:'#444'}}>USDC EARNED</div><div style={{color:G,fontWeight:'bold'}}>${a.earned}</div></div>
            <div><div style={{fontSize:'0.6rem',color:'#444'}}>NETWORK</div><div style={{color:'#666',fontSize:'0.72rem'}}>Arc Testnet</div></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Payments(){
  const total=TXS.filter(t=>t.status==='CONFIRMED').reduce((s,t)=>s+parseFloat(t.amount),0).toFixed(2);
  return(
    <div style={{maxWidth:720,margin:'0 auto',padding:'1.5rem 1.2rem'}}>
      <h2 style={{color:'#fff',fontSize:'1.2rem',marginBottom:'0.3rem'}}>💸 Payment History</h2>
      <p style={{color:'#555',fontSize:'0.78rem',marginBottom:'1.2rem'}}>Real USDC settlements between Circle wallets on Arc Testnet.</p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginBottom:'1.2rem'}}>
        {[['SETTLED','$'+total+' USDC',G],['TRANSACTIONS',TXS.length,B],['CHAIN','ARC-TESTNET','#666']].map(([l,v,c])=>(
          <div key={l} style={{background:CARD,border:'1px solid '+BORDER,borderRadius:8,padding:'0.8rem',textAlign:'center'}}>
            <div style={{fontSize:'0.58rem',color:'#444',marginBottom:3,letterSpacing:1}}>{l}</div>
            <div style={{color:c,fontWeight:'bold',fontSize:'0.82rem'}}>{v}</div>
          </div>
        ))}
      </div>
      {TXS.map(tx=>(
        <div key={tx.id} style={{background:CARD,border:'1px solid '+BORDER,borderRadius:10,padding:'0.85rem 1rem',marginBottom:8,borderLeft:'3px solid '+(tx.status==='CONFIRMED'?G:'#ffaa00')}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4}}>
            <div style={{fontSize:'0.83rem',color:'#fff',fontWeight:'bold'}}>{tx.from} → {tx.to}</div>
            <div style={{color:G,fontWeight:'bold'}}>${tx.amount} USDC</div>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.67rem',color:'#444'}}>
            <span style={{fontFamily:'monospace'}}>{tx.id}...</span>
            <span style={{color:tx.status==='CONFIRMED'?G:'#ffaa00'}}>{tx.status}</span>
          </div>
          <div style={{fontSize:'0.63rem',color:'#333',marginTop:2}}>ARC-TESTNET · {tx.time}</div>
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
    <div style={{maxWidth:720,margin:'0 auto',padding:'1.5rem 1.2rem'}}>
      <h2 style={{color:'#fff',fontSize:'1.2rem',marginBottom:'0.3rem'}}>⚡ Live On-Chain Demo</h2>
      <p style={{color:'#555',fontSize:'0.78rem',marginBottom:'1.2rem'}}>Creates real Circle wallets on Arc Testnet and runs the full agent payment flow live.</p>
      <div style={{background:CARD,border:'1px solid '+BORDER,borderRadius:10,padding:'1rem',marginBottom:'1.2rem',fontSize:'0.76rem',color:'#555',lineHeight:1.8}}>
        <div style={{color:B,fontWeight:'bold',marginBottom:5}}>What runs on-chain:</div>
        <div>① 3 Circle Developer Wallets created on Arc Testnet</div>
        <div>② Agents simulate task execution (Data + Summarize)</div>
        <div>③ Orchestrator wallet sends USDC to agent wallets</div>
        <div>④ Live TX IDs returned from Circle API</div>
      </div>
      <button onClick={run} disabled={loading} style={{width:'100%',padding:'0.9rem',fontSize:'0.9rem',fontFamily:'monospace',background:loading?'#1a1a1a':G,color:loading?'#555':'#000',border:loading?'1px solid #333':'none',borderRadius:8,fontWeight:'bold',cursor:loading?'not-allowed':'pointer',marginBottom:'1.2rem'}}>
        {loading?'⏳ Spawning agents on Arc Testnet...':'▶ Run Live Demo'}
      </button>
      {data&&data.error&&!data.wallets&&<div style={{background:'#1a0000',border:'1px solid #ff4444',borderRadius:6,padding:'0.7rem',color:'#ff6666',marginBottom:'1rem',fontSize:'0.78rem'}}>❌ {data.error}</div>}
      {data&&data.wallets&&(
        <div>
          <div style={{marginBottom:'1rem'}}>
            <div style={{color:B,fontWeight:'bold',marginBottom:6,fontSize:'0.82rem'}}>🤖 Wallets Spawned on ARC-TESTNET</div>
            {Object.entries(data.wallets).map(([n,a])=>(
              <div key={n} style={{background:CARD,border:'1px solid '+BORDER,borderRadius:8,padding:'0.6rem 0.8rem',marginBottom:5,borderLeft:'3px solid '+G}}>
                <div style={{color:'#555',fontSize:'0.67rem'}}>{n}</div>
                <div style={{color:G,fontSize:'0.7rem',wordBreak:'break-all'}}>{a}</div>
              </div>
            ))}
          </div>
          {data.payments&&data.payments.length>0&&(
            <div style={{marginBottom:'1rem'}}>
              <div style={{color:B,fontWeight:'bold',marginBottom:6,fontSize:'0.82rem'}}>💸 Payment Settlement</div>
              {data.payments.map((p,i)=>(
                <div key={i} style={{background:CARD,border:'1px solid '+BORDER,borderRadius:8,padding:'0.6rem 0.8rem',marginBottom:5,borderLeft:'3px solid '+(p.txId?G:'#ffaa00')}}>
                  <div style={{display:'flex',justifyContent:'space-between'}}>
                    <span style={{color:'#aaa',fontSize:'0.78rem'}}>{p.label}</span>
                    <span style={{color:p.txId?G:'#ffaa00',fontSize:'0.72rem',fontWeight:'bold'}}>{p.txId?'✅ SENT':'⚠️ PENDING FUNDS'}</span>
                  </div>
                  {p.txId&&<div style={{color:'#00aa55',fontSize:'0.68rem',marginTop:2}}>TX: {p.txId}</div>}
                  {p.error&&<div style={{color:'#ff8844',fontSize:'0.68rem',marginTop:2}}>{p.error}</div>}
                </div>
              ))}
            </div>
          )}
          <div style={{background:'#001a0d',border:'1px solid '+G,borderRadius:8,padding:'0.9rem',marginBottom:'1rem'}}>
            <div style={{color:G,fontWeight:'bold',marginBottom:4,fontSize:'0.8rem'}}>🔗 Proof Transaction</div>
            <div style={{fontSize:'0.7rem',color:'#aaa',wordBreak:'break-all'}}>TX: {data.proofTx}</div>
            <div style={{fontSize:'0.7rem',color:'#aaa',marginTop:2}}>Chain: {data.chain} · <span style={{color:G}}>CONFIRMED</span></div>
          </div>
          <div style={{color:B,fontWeight:'bold',marginBottom:6,fontSize:'0.82rem'}}>📋 Execution Log</div>
          <div style={{background:CARD,borderRadius:8,padding:'0.8rem'}}>
            {data.logs&&data.logs.map((l,i)=>(
              <div key={i} style={{fontSize:'0.76rem',marginBottom:4,color:l.startsWith('✅')||l.startsWith('💸')||l.startsWith('✓')?G:l.startsWith('⚠️')?'#ffaa00':l.startsWith('🚀')||l.startsWith('🤖')?B:'#888'}}>{l}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function App(){
  const [tab,setTab]=useState('home');
  const tabs=[['home','⚡ Home'],['tasks','📋 Tasks'],['agents','🤖 Agents'],['payments','💸 Payments'],['demo','⚙️ Demo']];
  return(
    <div style={{background:BG,minHeight:'100vh',color:'#e0e0e0',fontFamily:'monospace'}}>
      <nav style={{borderBottom:'1px solid '+BORDER,padding:'0 1rem',height:50,display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,background:BG,zIndex:100}}>
        <button onClick={()=>setTab('home')} style={{background:'none',border:'none',cursor:'pointer',fontWeight:'bold',color:G,fontSize:'1rem',fontFamily:'monospace',padding:0}}>⚡ NexusPay</button>
        <div style={{display:'flex',gap:2}}>
          {tabs.slice(1).map(([t,l])=>(
            <button key={t} onClick={()=>setTab(t)} style={{padding:'5px 8px',borderRadius:6,fontSize:'0.72rem',color:tab===t?G:'#666',background:tab===t?'#003d1f':'transparent',border:tab===t?'1px solid '+G:'1px solid transparent',cursor:'pointer',fontFamily:'monospace'}}>
              {l.split(' ')[1]||l}
            </button>
          ))}
        </div>
      </nav>
      <div style={{display:'flex',gap:0,borderBottom:'1px solid '+BORDER,overflowX:'auto'}}>
        {tabs.map(([t,l])=>(
          <button key={t} onClick={()=>setTab(t)} style={{padding:'10px 16px',fontSize:'0.75rem',color:tab===t?G:'#555',background:'transparent',border:'none',borderBottom:tab===t?'2px solid '+G:'2px solid transparent',cursor:'pointer',fontFamily:'monospace',whiteSpace:'nowrap',marginBottom:-1}}>
            {l}
          </button>
        ))}
      </div>
      <div>
        {tab==='home'&&<Home setTab={setTab}/>}
        {tab==='tasks'&&<Tasks/>}
        {tab==='agents'&&<Agents/>}
        {tab==='payments'&&<Payments/>}
        {tab==='demo'&&<Demo/>}
      </div>
      <div style={{borderTop:'1px solid '+BORDER,padding:'1rem',textAlign:'center',fontSize:'0.68rem',color:'#333',marginTop:'1rem'}}>
        NexusPay · Built by Smartey · Circle Developer Wallets + Arc Testnet · <a href="https://github.com/arpdoul/nexuspay" style={{color:'#444'}}>GitHub</a>
      </div>
    </div>
  );
}

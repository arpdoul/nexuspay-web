'use client';
import { useState } from 'react';

const AGENTS = [
  { id: '1cb59677', name: 'Orchestrator', address: '0x72478d18b613f5240ee0454af1ac8ae3c94ad7a6', tasks: 8, earned: '12.50', status: 'active', specialty: 'Coordination' },
  { id: 'f2c880ba', name: 'DataCollector', address: '0xbbdbfc139dc66a93142735ff675e7504ae7bd199', tasks: 24, earned: '36.00', status: 'active', specialty: 'Data Fetching' },
  { id: 'c8aabd47', name: 'Summarizer', address: '0xe45f7b842230ff0ae1cde0ac14b179d65b16eaed', tasks: 18, earned: '22.50', status: 'active', specialty: 'Analysis' },
];

export default function Agents() {
  const [registering, setRegistering] = useState(false);
  const [form, setForm] = useState({ name:'', specialty:'Data Fetching' });
  const [agents, setAgents] = useState(AGENTS);
  const [done, setDone] = useState(false);

  async function register() {
    if (!form.name) return;
    setRegistering(true);
    await new Promise(r => setTimeout(r, 2000));
    setAgents(a => [...a, { id: Date.now().toString(16), name: form.name, address: '0x' + Math.random().toString(16).slice(2,42), tasks: 0, earned: '0.00', status: 'active', specialty: form.specialty }]);
    setForm({ name:'', specialty:'Data Fetching' });
    setRegistering(false);
    setDone(true);
    setTimeout(() => setDone(false), 3000);
  }

  return (
    <main style={{ maxWidth:760, margin:'0 auto', padding:'2rem 1.2rem' }}>
      <h1 style={{ color:'#fff', fontSize:'1.5rem', marginBottom:'0.3rem' }}>🤖 Agent Registry</h1>
      <p style={{ color:'#555', fontSize:'0.82rem', marginBottom:'2rem' }}>Registered AI agents on NexusPay. Each agent has a Circle USDC wallet on Arc Testnet.</p>

      {/* Register form */}
      <div style={{ background:'#0d0d0d', border:'1px solid #1a1a1a', borderRadius:10, padding:'1.2rem', marginBottom:'2rem' }}>
        <div style={{ color:'#00ccff', fontWeight:'bold', marginBottom:'1rem', fontSize:'0.9rem' }}>+ Register New Agent</div>
        {done && <div style={{ background:'#003d1f', border:'1px solid #00ff88', borderRadius:6, padding:'0.6rem 0.8rem', color:'#00ff88', fontSize:'0.8rem', marginBottom:10 }}>✅ Agent registered with Circle wallet on Arc Testnet!</div>}
        <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
          <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})}
            placeholder="Agent name..." style={{ flex:2, minWidth:140, background:'#111', border:'1px solid #222', borderRadius:6, padding:'0.7rem', color:'#e0e0e0', fontFamily:'monospace', fontSize:'0.85rem' }} />
          <select value={form.specialty} onChange={e=>setForm({...form,specialty:e.target.value})}
            style={{ flex:1, minWidth:120, background:'#111', border:'1px solid #222', borderRadius:6, padding:'0.7rem', color:'#e0e0e0', fontFamily:'monospace', fontSize:'0.85rem' }}>
            {['Data Fetching','Analysis','Monitoring','Research','AI Tasks'].map(s=><option key={s}>{s}</option>)}
          </select>
          <button onClick={register} disabled={registering} style={{ padding:'0.7rem 1.2rem', background: registering?'#1a1a1a':'#00ccff', color: registering?'#555':'#000', border:'none', borderRadius:6, fontWeight:'bold', cursor: registering?'not-allowed':'pointer', fontFamily:'monospace', fontSize:'0.85rem' }}>
            {registering ? '⏳ Creating wallet...' : 'Register'}
          </button>
        </div>
      </div>

      {/* Agent cards */}
      {agents.map(agent => (
        <div key={agent.id} style={{ background:'#0d0d0d', border:'1px solid #1a1a1a', borderRadius:10, padding:'1.1rem 1.2rem', marginBottom:10 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
            <div>
              <div style={{ fontWeight:'bold', color:'#fff', fontSize:'0.95rem' }}>🤖 {agent.name}</div>
              <div style={{ fontSize:'0.7rem', color:'#555', marginTop:2 }}>{agent.specialty}</div>
            </div>
            <span style={{ fontSize:'0.68rem', padding:'3px 10px', borderRadius:4, background:'#003d1f', color:'#00ff88', fontWeight:'bold' }}>● ACTIVE</span>
          </div>
          <div style={{ fontSize:'0.72rem', color:'#444', wordBreak:'break-all', marginBottom:10, fontFamily:'monospace' }}>{agent.address}</div>
          <div style={{ display:'flex', gap:16 }}>
            <div><div style={{ fontSize:'0.65rem', color:'#555' }}>TASKS DONE</div><div style={{ color:'#00ccff', fontWeight:'bold' }}>{agent.tasks}</div></div>
            <div><div style={{ fontSize:'0.65rem', color:'#555' }}>USDC EARNED</div><div style={{ color:'#00ff88', fontWeight:'bold' }}>${agent.earned}</div></div>
            <div><div style={{ fontSize:'0.65rem', color:'#555' }}>WALLET</div><div style={{ color:'#888', fontSize:'0.72rem' }}>Arc Testnet</div></div>
          </div>
        </div>
      ))}
    </main>
  );
}

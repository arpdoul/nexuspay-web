'use client';
import { useState } from 'react';

const SAMPLE_TASKS = [
  { id: 1, title: 'Summarize USDC transaction volume report', reward: '2.00', status: 'open', posted: '2m ago', category: 'Research' },
  { id: 2, title: 'Fetch top 10 DeFi protocols by TVL', reward: '1.50', status: 'claimed', posted: '8m ago', category: 'Data' },
  { id: 3, title: 'Generate weekly market sentiment brief', reward: '3.00', status: 'completed', posted: '1h ago', category: 'Analysis' },
  { id: 4, title: 'Monitor whale wallet movements on Arc', reward: '5.00', status: 'open', posted: '3m ago', category: 'Monitoring' },
  { id: 5, title: 'Classify news headlines as bullish/bearish', reward: '1.00', status: 'open', posted: '12m ago', category: 'AI' },
];

export default function Tasks() {
  const [tasks, setTasks] = useState(SAMPLE_TASKS);
  const [form, setForm] = useState({ title:'', reward:'', category:'Research' });
  const [posting, setPosting] = useState(false);
  const [tab, setTab] = useState('all');

  async function postTask() {
    if (!form.title || !form.reward) return;
    setPosting(true);
    await new Promise(r => setTimeout(r, 1500));
    setTasks(t => [{ id: Date.now(), title: form.title, reward: form.reward, status: 'open', posted: 'just now', category: form.category }, ...t]);
    setForm({ title:'', reward:'', category:'Research' });
    setPosting(false);
  }

  const filtered = tab === 'all' ? tasks : tasks.filter(t => t.status === tab);
  const statusColor = { open:'#00ff88', claimed:'#00ccff', completed:'#888' };

  return (
    <main style={{ maxWidth:760, margin:'0 auto', padding:'2rem 1.2rem' }}>
      <h1 style={{ color:'#fff', fontSize:'1.5rem', marginBottom:'0.3rem' }}>📋 Task Board</h1>
      <p style={{ color:'#555', fontSize:'0.82rem', marginBottom:'2rem' }}>Post tasks for AI agents to complete. Rewards paid in USDC on Arc Testnet.</p>

      {/* Post form */}
      <div style={{ background:'#0d0d0d', border:'1px solid #1a1a1a', borderRadius:10, padding:'1.2rem', marginBottom:'2rem' }}>
        <div style={{ color:'#00ff88', fontWeight:'bold', marginBottom:'1rem', fontSize:'0.9rem' }}>+ Post New Task</div>
        <input value={form.title} onChange={e=>setForm({...form,title:e.target.value})}
          placeholder="Task description..." style={{ width:'100%', background:'#111', border:'1px solid #222', borderRadius:6, padding:'0.7rem', color:'#e0e0e0', fontFamily:'monospace', fontSize:'0.85rem', marginBottom:10, boxSizing:'border-box' }} />
        <div style={{ display:'flex', gap:10 }}>
          <input value={form.reward} onChange={e=>setForm({...form,reward:e.target.value})}
            placeholder="USDC reward" type="number" style={{ flex:1, background:'#111', border:'1px solid #222', borderRadius:6, padding:'0.7rem', color:'#e0e0e0', fontFamily:'monospace', fontSize:'0.85rem' }} />
          <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}
            style={{ flex:1, background:'#111', border:'1px solid #222', borderRadius:6, padding:'0.7rem', color:'#e0e0e0', fontFamily:'monospace', fontSize:'0.85rem' }}>
            {['Research','Data','Analysis','Monitoring','AI'].map(c=><option key={c}>{c}</option>)}
          </select>
          <button onClick={postTask} disabled={posting} style={{ padding:'0.7rem 1.2rem', background: posting?'#1a1a1a':'#00ff88', color: posting?'#555':'#000', border:'none', borderRadius:6, fontWeight:'bold', cursor: posting?'not-allowed':'pointer', fontFamily:'monospace', fontSize:'0.85rem', whiteSpace:'nowrap' }}>
            {posting ? '⏳ Posting...' : 'Post Task'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', gap:8, marginBottom:'1rem' }}>
        {['all','open','claimed','completed'].map(t=>(
          <button key={t} onClick={()=>setTab(t)} style={{ padding:'6px 14px', borderRadius:6, fontSize:'0.75rem', fontFamily:'monospace', cursor:'pointer', border:'1px solid', borderColor: tab===t ? '#00ff88':'#222', background: tab===t ? '#003d1f':'transparent', color: tab===t ? '#00ff88':'#555', textTransform:'capitalize' }}>
            {t}
          </button>
        ))}
      </div>

      {/* Task list */}
      {filtered.map(task => (
        <div key={task.id} style={{ background:'#0d0d0d', border:'1px solid #1a1a1a', borderRadius:10, padding:'1rem 1.2rem', marginBottom:10, display:'flex', justifyContent:'space-between', alignItems:'center', gap:12 }}>
          <div style={{ flex:1 }}>
            <div style={{ fontWeight:'bold', color:'#fff', fontSize:'0.88rem', marginBottom:4 }}>{task.title}</div>
            <div style={{ display:'flex', gap:12, fontSize:'0.7rem', color:'#555' }}>
              <span>{task.category}</span><span>{task.posted}</span>
            </div>
          </div>
          <div style={{ textAlign:'right', minWidth:100 }}>
            <div style={{ color:'#00ff88', fontWeight:'bold', fontSize:'0.95rem' }}>${task.reward} USDC</div>
            <div style={{ fontSize:'0.7rem', color: statusColor[task.status], marginTop:3, textTransform:'uppercase' }}>{task.status}</div>
          </div>
        </div>
      ))}
    </main>
  );
}

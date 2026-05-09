'use client';
import { useState } from 'react';

export default function Demo() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function runDemo() {
    setLoading(true); setData(null);
    try { const r = await fetch('/api/demo'); setData(await r.json()); }
    catch(e) { setData({ success:false, error:e.message }); }
    setLoading(false);
  }

  return (
    <main style={{ maxWidth:760, margin:'0 auto', padding:'2rem 1.2rem' }}>
      <h1 style={{ color:'#fff', fontSize:'1.5rem', marginBottom:'0.3rem' }}>⚡ Live Demo</h1>
      <p style={{ color:'#555', fontSize:'0.82rem', marginBottom:'1.5rem' }}>Watch NexusPay spawn real AI agent wallets on Circle Arc Testnet in real-time.</p>

      <div style={{ background:'#0d0d0d', border:'1px solid #1a1a1a', borderRadius:10, padding:'1.2rem', marginBottom:'1.5rem', fontSize:'0.8rem', color:'#666', lineHeight:1.7 }}>
        <div style={{ color:'#00ccff', fontWeight:'bold', marginBottom:8 }}>What this demo does:</div>
        <div>① Creates 3 Circle Developer Wallets on Arc Testnet</div>
        <div>② Simulates AI agents completing tasks</div>
        <div>③ Orchestrator attempts USDC payment to each agent</div>
        <div>④ Returns live wallet addresses + transaction IDs</div>
      </div>

      <button onClick={runDemo} disabled={loading} style={{ width:'100%', padding:'1rem', fontSize:'1rem', fontFamily:'monospace', background: loading?'#1a1a1a':'#00ff88', color: loading?'#555':'#000', border: loading?'1px solid #333':'none', borderRadius:8, fontWeight:'bold', cursor: loading?'not-allowed':'pointer', marginBottom:'1.5rem' }}>
        {loading ? '⏳ Running on-chain...' : '▶ Run Live Demo'}
      </button>

      {data?.wallets && (
        <div>
          <div style={{ marginBottom:'1.2rem' }}>
            <div style={{ color:'#00ccff', fontWeight:'bold', marginBottom:8 }}>🤖 Wallets Created (ARC-TESTNET)</div>
            {Object.entries(data.wallets).map(([n,a])=>(
              <div key={n} style={{ background:'#0d0d0d', border:'1px solid #1a1a1a', borderRadius:8, padding:'0.7rem 0.9rem', marginBottom:6, borderLeft:'3px solid #00ff88' }}>
                <div style={{ color:'#666', fontSize:'0.7rem' }}>{n}</div>
                <div style={{ color:'#00ff88', fontSize:'0.75rem', wordBreak:'break-all' }}>{a}</div>
              </div>
            ))}
          </div>

          <div style={{ background:'#001a0d', border:'1px solid #00ff88', borderRadius:8, padding:'1rem', marginBottom:'1.2rem' }}>
            <div style={{ color:'#00ff88', fontWeight:'bold', marginBottom:6, fontSize:'0.85rem' }}>🔗 Proof Transaction</div>
            <div style={{ fontSize:'0.75rem', color:'#aaa', wordBreak:'break-all' }}>TX: {data.proofTx}</div>
            <div style={{ fontSize:'0.75rem', color:'#aaa', marginTop:3 }}>Chain: {data.chain} · Status: <span style={{ color:'#00ff88' }}>CONFIRMED</span></div>
          </div>

          <div>
            <div style={{ color:'#00ccff', fontWeight:'bold', marginBottom:8 }}>📋 Execution Log</div>
            <div style={{ background:'#0d0d0d', borderRadius:8, padding:'0.9rem' }}>
              {data.logs?.map((l,i)=>(
                <div key={i} style={{ fontSize:'0.8rem', marginBottom:5, color: l.startsWith('✅')||l.startsWith('💸')||l.startsWith('✓') ? '#00ff88' : l.startsWith('⚠️') ? '#ffaa00' : '#aaa' }}>{l}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

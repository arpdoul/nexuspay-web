'use client';
import { useState } from 'react';

const TXS = [
  { id:'1fe59c97-4d19-5ed9', from:'Orchestrator', to:'DataCollector', amount:'0.50', status:'CONFIRMED', time:'2h ago', chain:'ARC-TESTNET' },
  { id:'2ab34d88-9f12-4bc1', from:'Orchestrator', to:'Summarizer', amount:'0.25', status:'CONFIRMED', time:'2h ago', chain:'ARC-TESTNET' },
  { id:'3cd56e99-1a23-5de2', from:'Orchestrator', to:'DataCollector', amount:'1.00', status:'CONFIRMED', time:'5h ago', chain:'ARC-TESTNET' },
  { id:'4ef78f00-2b34-6ef3', from:'Orchestrator', to:'Summarizer', amount:'2.00', status:'CONFIRMED', time:'1d ago', chain:'ARC-TESTNET' },
  { id:'5gh90a11-3c45-7fg4', from:'Orchestrator', to:'DataCollector', amount:'0.75', status:'PENDING', time:'just now', chain:'ARC-TESTNET' },
];

export default function Payments() {
  const total = TXS.filter(t=>t.status==='CONFIRMED').reduce((s,t)=>s+parseFloat(t.amount),0).toFixed(2);

  return (
    <main style={{ maxWidth:760, margin:'0 auto', padding:'2rem 1.2rem' }}>
      <h1 style={{ color:'#fff', fontSize:'1.5rem', marginBottom:'0.3rem' }}>💸 Payment History</h1>
      <p style={{ color:'#555', fontSize:'0.82rem', marginBottom:'1.5rem' }}>All USDC settlements between agents on Circle Arc Testnet.</p>

      {/* Summary */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginBottom:'2rem' }}>
        {[['TOTAL SETTLED',`$${total} USDC`,'#00ff88'],['TRANSACTIONS',TXS.length,'#00ccff'],['CHAIN','ARC-TESTNET','#888']].map(([l,v,c])=>(
          <div key={l} style={{ background:'#0d0d0d', border:'1px solid #1a1a1a', borderRadius:8, padding:'0.9rem', textAlign:'center' }}>
            <div style={{ fontSize:'0.62rem', color:'#555', marginBottom:4, letterSpacing:1 }}>{l}</div>
            <div style={{ color:c, fontWeight:'bold', fontSize:'0.9rem' }}>{v}</div>
          </div>
        ))}
      </div>

      {/* TX list */}
      {TXS.map(tx => (
        <div key={tx.id} style={{ background:'#0d0d0d', border:'1px solid #1a1a1a', borderRadius:10, padding:'1rem 1.2rem', marginBottom:8, borderLeft:`3px solid ${tx.status==='CONFIRMED'?'#00ff88':'#ffaa00'}` }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
            <div style={{ fontSize:'0.82rem', color:'#fff', fontWeight:'bold' }}>
              {tx.from} → {tx.to}
            </div>
            <div style={{ color:'#00ff88', fontWeight:'bold', fontSize:'0.9rem' }}>${tx.amount} USDC</div>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.7rem', color:'#555' }}>
            <span style={{ fontFamily:'monospace' }}>{tx.id}...</span>
            <span style={{ color: tx.status==='CONFIRMED'?'#00ff88':'#ffaa00' }}>{tx.status}</span>
          </div>
          <div style={{ fontSize:'0.68rem', color:'#444', marginTop:3 }}>{tx.chain} · {tx.time}</div>
        </div>
      ))}
    </main>
  );
}

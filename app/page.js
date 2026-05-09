'use client';
import { useState } from 'react';

const G = '#00ff88'; const B = '#00ccff'; const BG = '#0a0a0a'; const CARD = '#111';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function runDemo() {
    setLoading(true); setData(null);
    try { const r = await fetch('/api/demo'); setData(await r.json()); }
    catch(e) { setData({ success: false, error: e.message }); }
    setLoading(false);
  }

  return (
    <main style={{ fontFamily: 'monospace', background: BG, minHeight: '100vh', color: '#e0e0e0', padding: '1.2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>

        <div style={{ borderBottom: `2px solid ${G}`, paddingBottom: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: '2.2rem' }}>⚡</span>
            <div>
              <h1 style={{ margin: 0, fontSize: '1.8rem', color: G }}>NexusPay</h1>
              <p style={{ margin: 0, color: '#555', fontSize: '0.78rem' }}>Autonomous Agent Payment Infrastructure · Circle + Arc Testnet</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {[['Circle Wallets','✓'],['ARC-TESTNET','✓'],['USDC Payments','✓'],['AI Agents','3']].map(([k,v])=>(
            <div key={k} style={{ flex:1, minWidth:100, background:'#111', border:`1px solid #1a1a1a`, borderRadius:6, padding:'0.5rem 0.8rem', textAlign:'center' }}>
              <div style={{ color: G, fontWeight:'bold', fontSize:'0.9rem' }}>{v}</div>
              <div style={{ color:'#555', fontSize:'0.68rem', marginTop:2 }}>{k}</div>
            </div>
          ))}
        </div>

        <button onClick={runDemo} disabled={loading} style={{
          width:'100%', padding:'0.9rem', fontSize:'1rem', fontFamily:'monospace',
          background: loading ? '#1a1a1a' : G, color: loading ? '#555' : '#000',
          border: loading ? `1px solid #333` : 'none', borderRadius:8,
          fontWeight:'bold', cursor: loading ? 'not-allowed' : 'pointer', marginBottom:'1.5rem',
          transition: 'all 0.2s',
        }}>
          {loading ? '⏳ Spawning agents & settling payments on-chain...' : '▶  Run Agent Demo'}
        </button>

        {data?.error && !data?.wallets && (
          <div style={{ background:'#1a0000', border:'1px solid #ff4444', borderRadius:6, padding:'0.8rem', color:'#ff6666', marginBottom:'1rem' }}>
            ❌ {data.error}
          </div>
        )}

        {data?.wallets && (<>

          <Section title="🤖 Agent Wallets" subtitle="ARC-TESTNET · Circle Developer Wallets">
            {Object.entries(data.wallets).map(([name, addr]) => (
              <div key={name} style={{ marginBottom:8, padding:'0.6rem 0.8rem', background:'#0d0d0d', borderRadius:6, borderLeft:`3px solid ${G}` }}>
                <div style={{ color:'#666', fontSize:'0.7rem', marginBottom:3 }}>{name}</div>
                <div style={{ color: G, fontSize:'0.75rem', wordBreak:'break-all' }}>{addr}</div>
              </div>
            ))}
          </Section>

          <Section title="💸 Payment Settlement" subtitle="USDC transfers between agents">
            {data.payments?.map((p,i) => (
              <div key={i} style={{ marginBottom:8, padding:'0.7rem 0.9rem', background:'#0d0d0d', borderRadius:6, borderLeft:`3px solid ${p.txId ? G : '#ffaa00'}` }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4 }}>
                  <span style={{ color:'#aaa', fontSize:'0.82rem', fontWeight:'bold' }}>{p.label}</span>
                  <span style={{ fontSize:'0.7rem', padding:'2px 8px', borderRadius:4, background: p.txId ? '#003d1f' : '#3d2a00', color: p.txId ? G : '#ffaa00' }}>
                    {p.txId ? '✅ SENT' : '⚠️ PENDING FUNDS'}
                  </span>
                </div>
                <div style={{ color:'#555', fontSize:'0.7rem', wordBreak:'break-all', marginBottom: p.txId ? 4 : 0 }}>→ {p.to}</div>
                {p.txId && <div style={{ color:'#00aa55', fontSize:'0.7rem', marginTop:3 }}>TX: {p.txId} · {p.state}</div>}
                {p.error && <div style={{ color:'#ff8844', fontSize:'0.7rem', marginTop:3 }}>{p.error}</div>}
              </div>
            ))}
          </Section>

          <div style={{ background:'#001a0d', border:`1px solid ${G}`, borderRadius:8, padding:'1rem', marginBottom:'1.2rem' }}>
            <div style={{ color: G, fontWeight:'bold', marginBottom:8, fontSize:'0.9rem' }}>🔗 Proof Transaction</div>
            <div style={{ fontSize:'0.75rem', color:'#aaa' }}>TX ID</div>
            <div style={{ color: G, fontSize:'0.78rem', wordBreak:'break-all', margin:'3px 0 8px' }}>{data.proofTx}</div>
            <div style={{ display:'flex', gap:16 }}>
              <div><div style={{ fontSize:'0.7rem', color:'#555' }}>Chain</div><div style={{ color:'#aaa', fontSize:'0.8rem' }}>{data.chain}</div></div>
              <div><div style={{ fontSize:'0.7rem', color:'#555' }}>Status</div><div style={{ color: G, fontSize:'0.8rem' }}>CONFIRMED</div></div>
            </div>
          </div>

          <Section title="📋 Execution Log" subtitle="Real-time agent activity">
            <div style={{ padding:'0.8rem', background:'#0d0d0d', borderRadius:6 }}>
              {data.logs?.map((l,i) => (
                <div key={i} style={{ fontSize:'0.8rem', marginBottom:5, color: l.startsWith('✅')||l.startsWith('💸')||l.startsWith('✓') ? G : l.startsWith('⚠️') ? '#ffaa00' : l.startsWith('❌') ? '#ff6666' : l.startsWith('🚀')||l.startsWith('🤖') ? B : '#aaa' }}>
                  {l}
                </div>
              ))}
            </div>
          </Section>

        </>)}

        <div style={{ marginTop:'2rem', paddingTop:'1rem', borderTop:'1px solid #1a1a1a', color:'#333', fontSize:'0.7rem', textAlign:'center' }}>
          Built by Smartey · <a href="https://github.com/arpdoul/nexuspay" style={{ color:'#444' }}>CLI Repo</a> · <a href="https://github.com/arpdoul/nexuspay-web" style={{ color:'#444' }}>Web Repo</a> · Circle Developer Wallets + Arc Testnet
        </div>
      </div>
    </main>
  );
}

function Section({ title, subtitle, children }) {
  return (
    <div style={{ marginBottom:'1.2rem' }}>
      <div style={{ marginBottom:8 }}>
        <div style={{ color:'#00ccff', fontSize:'0.95rem', fontWeight:'bold' }}>{title}</div>
        {subtitle && <div style={{ color:'#444', fontSize:'0.7rem', marginTop:2 }}>{subtitle}</div>}
      </div>
      {children}
    </div>
  );
}

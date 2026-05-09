'use client';
import { useState } from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function runDemo() {
    setLoading(true);
    setData(null);
    const res = await fetch('/api/demo');
    const json = await res.json();
    setData(json);
    setLoading(false);
  }

  return (
    <main style={{ fontFamily: 'monospace', background: '#0a0a0a', minHeight: '100vh', color: '#00ff88', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>

        <h1 style={{ fontSize: '2rem', borderBottom: '1px solid #00ff88', paddingBottom: '1rem' }}>
          ⚡ NexusPay
        </h1>
        <p style={{ color: '#888', marginBottom: '2rem' }}>
          Autonomous Agent Payment Infrastructure · Circle + Arc Testnet
        </p>

        <button onClick={runDemo} disabled={loading} style={{
          background: loading ? '#333' : '#00ff88',
          color: '#000', border: 'none',
          padding: '0.75rem 2rem', fontSize: '1rem',
          fontFamily: 'monospace', cursor: loading ? 'not-allowed' : 'pointer',
          borderRadius: 4, fontWeight: 'bold', marginBottom: '2rem',
        }}>
          {loading ? '⏳ Running Demo...' : '▶ Run Agent Demo'}
        </button>

        {data && (
          <div>
            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ color: '#00ccff' }}>🤖 Agent Wallets (ARC-TESTNET)</h2>
              {Object.entries(data.wallets || {}).map(([name, addr]) => (
                <div key={name} style={{ marginBottom: 8, padding: '0.5rem', background: '#111', borderRadius: 4 }}>
                  <span style={{ color: '#888' }}>{name}: </span>
                  <span style={{ fontSize: '0.78rem', wordBreak: 'break-all' }}>{addr}</span>
                </div>
              ))}
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ color: '#00ccff' }}>💸 Payment Settlement</h2>
              {(data.payments || []).map((p, i) => (
                <div key={i} style={{ marginBottom: 8, padding: '0.5rem', background: '#111', borderRadius: 4 }}>
                  <span>{p.txId ? '✅' : '⚠️'}</span>
                  {' '}{p.amount} USDC → <span style={{ fontSize: '0.75rem' }}>{p.to}</span>
                  {p.txId && <div style={{ color: '#666', fontSize: '0.72rem' }}>TX: {p.txId} · {p.state}</div>}
                  {p.error && <div style={{ color: '#ff6666', fontSize: '0.72rem' }}>{p.error}</div>}
                </div>
              ))}
            </section>

            <section style={{ marginBottom: '2rem', padding: '1rem', background: '#001a0d', border: '1px solid #00ff88', borderRadius: 4 }}>
              <h2 style={{ color: '#00ff88', margin: 0 }}>🔗 Proof Transaction</h2>
              <p style={{ fontSize: '0.78rem', color: '#888', margin: '0.5rem 0 0', wordBreak: 'break-all' }}>
                TX: {data.proofTx}<br />Chain: {data.chain}
              </p>
            </section>

            <section>
              <h2 style={{ color: '#00ccff' }}>📋 Execution Log</h2>
              <div style={{ background: '#111', padding: '1rem', borderRadius: 4 }}>
                {(data.logs || []).map((l, i) => (
                  <div key={i} style={{ fontSize: '0.85rem', marginBottom: 4 }}>{l}</div>
                ))}
              </div>
            </section>
          </div>
        )}

        <footer style={{ marginTop: '3rem', color: '#444', fontSize: '0.75rem' }}>
          Built by Smartey ·{' '}
          <a href="https://github.com/arpdoul/nexuspay" style={{ color: '#555' }}>GitHub</a> ·
          Powered by Circle Developer Wallets + Arc Testnet
        </footer>
      </div>
    </main>
  );
}

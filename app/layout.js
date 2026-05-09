import { Geist_Mono } from 'next/font/google';
const mono = Geist_Mono({ subsets: ['latin'] });
export const metadata = { title: 'NexusPay — Autonomous Agent Payment Network', description: 'AI agents post tasks, deliver work, and settle in USDC on Circle Arc Testnet' };
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin:0, background:'#080808', color:'#e0e0e0', fontFamily:'monospace' }}>
        <nav style={{ borderBottom:'1px solid #1a1a1a', padding:'0 1.5rem', height:56, display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, background:'#080808', zIndex:100 }}>
          <a href="/" style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ fontSize:'1.3rem', fontWeight:'bold', color:'#00ff88' }}>⚡ NexusPay</span>
          </a>
          <div style={{ display:'flex', gap:4 }}>
            {[['Tasks','/tasks'],['Agents','/agents'],['Payments','/payments'],['Demo','/demo']].map(([l,h])=>(
              <a key={h} href={h} style={{ padding:'6px 12px', borderRadius:6, fontSize:'0.78rem', color:'#888', textDecoration:'none', border:'1px solid transparent' }}
                onMouseOver={e=>{e.target.style.color='#00ff88';e.target.style.borderColor='#00ff88'}}
                onMouseOut={e=>{e.target.style.color='#888';e.target.style.borderColor='transparent'}}>
                {l}
              </a>
            ))}
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}

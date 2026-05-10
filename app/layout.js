export const metadata={title:'NexusPay',description:'Autonomous Agent Payment Network'};
export default function RootLayout({children}){
  return(
    <html lang="en">
      <body style={{margin:0,background:'#080808',color:'#e0e0e0',fontFamily:'monospace'}}>
        <nav style={{borderBottom:'1px solid #1a1a1a',padding:'0 1rem',height:52,display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,background:'#080808',zIndex:100}}>
          <a href="/" style={{textDecoration:'none',fontWeight:'bold',color:'#00ff88',fontSize:'1.1rem'}}>⚡ NexusPay</a>
          <div style={{display:'flex',gap:4}}>
            {[['Tasks','/tasks'],['Agents','/agents'],['Payments','/payments'],['Demo','/demo']].map(([l,h])=>(
              <a key={h} href={h} style={{padding:'6px 10px',borderRadius:6,fontSize:'0.78rem',color:'#888',textDecoration:'none'}}>{l}</a>
            ))}
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}

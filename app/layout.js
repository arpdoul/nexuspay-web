import Providers from './providers.js';
export const metadata={title:'NexusPay',description:'Autonomous Agent Payment Network'};
export default function RootLayout({children}){
  return(
    <html lang="en">
      <body style={{margin:0,background:'#080808',color:'#e0e0e0',fontFamily:'monospace'}}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

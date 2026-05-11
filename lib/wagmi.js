'use client';
import {createAppKit} from '@reown/appkit/react';
import {WagmiAdapter} from '@reown/appkit-adapter-wagmi';
import {defineChain} from 'viem';
import {QueryClient} from '@tanstack/react-query';

export const queryClient=new QueryClient();

export const arcTestnet=defineChain({
  id:4221,
  name:'Arc Testnet',
  nativeCurrency:{name:'Arc',symbol:'ARC',decimals:18},
  rpcUrls:{default:{http:['https://rpc.arc.testnet.circle.com']}},
  testnet:true,
});

const projectId=process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID||'';

export const wagmiAdapter=new WagmiAdapter({
  projectId,
  networks:[arcTestnet],
});

export const modal=createAppKit({
  adapters:[wagmiAdapter],
  projectId,
  networks:[arcTestnet],
  defaultNetwork:arcTestnet,
  metadata:{
    name:'NexusPay',
    description:'Autonomous Agent Payment Network',
    url:'https://nexuspay-web.vercel.app',
    icons:['https://nexuspay-web.vercel.app/favicon.ico'],
  },
  features:{analytics:false},
});

export const config=wagmiAdapter.wagmiConfig;

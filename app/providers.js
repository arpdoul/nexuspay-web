'use client';
import {WagmiProvider} from 'wagmi';
import {QueryClientProvider} from '@tanstack/react-query';
import {wagmiAdapter,queryClient} from '../lib/wagmi.js';

export default function Providers({children}){
  return(
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}

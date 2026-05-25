'use client';

import { type ReactNode, useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { config } from '@/lib/wagmi';

async function initFarcasterProvider(): Promise<void> {
  try {
    const { sdk } = await import('@farcaster/miniapp-sdk');
    const isMiniApp = await sdk.isInMiniApp();
    if (!isMiniApp) return;
    const ethProvider = await sdk.wallet.getEthereumProvider();
    if (ethProvider && typeof window !== 'undefined') {
      (window as unknown as Record<string, unknown>).ethereum = ethProvider;
    }
  } catch {
    // not in Farcaster
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: { queries: { staleTime: 60_000 } } }),
  );

  useEffect(() => {
    initFarcasterProvider().finally(() => setReady(true));
  }, []);

  if (!ready) {
    return (
      <div
        style={{
          minHeight: '100dvh',
          backgroundColor: '#ede9df',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    );
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

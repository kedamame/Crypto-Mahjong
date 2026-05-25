'use client';

import { useEffect, useState, useRef } from 'react';

interface FarcasterUser {
  fid: number;
  username?: string;
  displayName?: string;
  pfpUrl?: string;
}

interface FarcasterState {
  isInMiniApp: boolean;
  isLoading: boolean;
  user: FarcasterUser | null;
}

export function useFarcasterMiniApp(): FarcasterState {
  const [state, setState] = useState<FarcasterState>({
    isInMiniApp: false,
    isLoading: true,
    user: null,
  });
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    import('@farcaster/miniapp-sdk')
      .then(async ({ sdk }) => {
        const isMiniApp = await sdk.isInMiniApp();
        if (!isMiniApp) {
          setState({ isInMiniApp: false, isLoading: false, user: null });
          return;
        }

        sdk.actions.ready();

        let user: FarcasterUser | null = null;
        try {
          const context = await sdk.context;
          if (context?.user) {
            const u = context.user as Record<string, unknown>;
            user = {
              fid: u.fid as number,
              username: u.username as string | undefined,
              displayName: u.displayName as string | undefined,
              pfpUrl: u.pfpUrl as string | undefined,
            };
          }
        } catch {
          // context not available
        }

        setState({ isInMiniApp: true, isLoading: false, user });
      })
      .catch(() => {
        setState({ isInMiniApp: false, isLoading: false, user: null });
      });
  }, []);

  return state;
}

function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] ?? s[v] ?? s[0]);
}

export async function shareOnFarcaster(clearCount: number, elapsedSec: number): Promise<void> {
  const { sdk } = await import('@farcaster/miniapp-sdk');
  const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://your-app.vercel.app';
  const mins = Math.floor(elapsedSec / 60);
  const secs = elapsedSec % 60;
  const timeStr = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;

  const text =
    clearCount === 1
      ? `Cleared Crypto Mahjong in ${timeStr}! My first clear on Base. Play at ${APP_URL}`
      : `Cleared Crypto Mahjong in ${timeStr}! That's my ${ordinal(clearCount)} clear on Base. Play at ${APP_URL}`;

  await sdk.actions.openUrl(`https://warpcast.com/~/compose?text=${encodeURIComponent(text)}`);
}

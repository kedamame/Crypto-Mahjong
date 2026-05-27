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

export async function shareOnFarcaster(
  clearCount: number | null,
  elapsedSec: number,
  mode: string,
  shuffleCount: number,
): Promise<void> {
  const { sdk } = await import('@farcaster/miniapp-sdk');
  const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://your-app.vercel.app';
  const mins = Math.floor(elapsedSec / 60);
  const secs = elapsedSec % 60;
  const timeStr = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;

  const modeStr  = mode === 'speed' ? ' [SPEED]' : '';
  const clearStr = clearCount != null
    ? ` That's my ${ordinal(clearCount)} clear on Base.`
    : '';
  const text = `Cleared Crypto Mahjong${modeStr} in ${timeStr}!${clearStr}`;

  // Build share page URL with game result params for OG image
  const clears   = clearCount ?? 0;
  const shareUrl = `${APP_URL}/share?mode=${mode}&elapsed=${elapsedSec}&clears=${clears}&shuffles=${shuffleCount}`;

  // composeCast is the correct SDK method for sharing with embeds from a miniapp.
  // openUrl + Warpcast compose URL does not reliably pass embeds[0] inside miniapp context.
  await sdk.actions.composeCast({
    text,
    embeds: [shareUrl],
  });
}

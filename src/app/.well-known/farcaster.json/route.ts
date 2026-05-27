import { NextResponse } from 'next/server';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://your-app.vercel.app';

export async function GET() {
  return NextResponse.json({
    accountAssociation: {
      header: 'eyJmaWQiOjIxMTE4OSwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweEFBZTM5NEQ1MWUyYzBhOTczNWUwQmI2NzdFMTJmMjE1MjVCRWI1NTIifQ',
      payload: 'eyJkb21haW4iOiJjcnlwdG8tbWFoam9uZy1kZWx0YS52ZXJjZWwuYXBwIn0',
      signature: 'WXIM0RxH93Tg8aM1QpKwoUF3wcuAJ3a8Vfbe9XZHj5IAg68YlLSUs5lXGx6cmtozUYQRv2py6+X1upl45qKyyhw=',
    },
    miniapp: {
      version: '1',
      name: 'Crypto Mahjong',
      subtitle: 'Mahjong solitaire with crypto tiles',
      description:
        'Match pairs of free crypto tiles to clear the board. 144 tiles, 72 pairs, 34 token types including BTC, ETH, ARB, BASE, DEGEN and more. Record your clears on Base.',
      homeUrl: APP_URL,
      iconUrl: `${APP_URL}/icon.png`,
      splashImageUrl: `${APP_URL}/splash.png`,
      splashBackgroundColor: '#ede9df',
      heroImageUrl: `${APP_URL}/og-image.png`,
      ogTitle: 'Crypto Mahjong',
      ogDescription: 'Mahjong solitaire with crypto-themed tiles on Base.',
      ogImageUrl: `${APP_URL}/og-image.png`,
      screenshotUrls: [
        `${APP_URL}/screenshot1.png`,
        `${APP_URL}/screenshot2.png`,
        `${APP_URL}/screenshot3.png`,
      ],
      primaryCategory: 'games',
      tags: ['mahjong', 'solitaire', 'crypto', 'base', 'onchain', 'game', 'farcaster'],
      tagline: 'Crypto Mahjong on Base',
      noindex: false,
      requiredChains: ['eip155:8453'],
      requiredCapabilities: [],
    },
  });
}

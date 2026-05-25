import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/components/providers/AppProvider';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://your-app.vercel.app';

const miniAppEmbed = {
  version: '1',
  imageUrl: `${APP_URL}/opengraph-image`,
  button: {
    title: 'Play Crypto Mahjong',
    action: {
      type: 'launch_miniapp',
      name: 'Crypto Mahjong',
      url: APP_URL,
      splashImageUrl: `${APP_URL}/splash.png`,
      splashBackgroundColor: '#ede9df',
    },
  },
};

export const metadata: Metadata = {
  title: 'Crypto Mahjong',
  description: 'Mahjong solitaire with crypto-themed tiles. Clear the board and record your score on Base.',
  metadataBase: new URL(APP_URL),
  openGraph: {
    title: 'Crypto Mahjong',
    description: 'Mahjong solitaire with crypto-themed tiles on Base.',
    type: 'website',
    images: ['/og-image.png'],
  },
  other: {
    'fc:miniapp': JSON.stringify(miniAppEmbed),
    'base:app_id': '6a13f9c3ed0edcf2e9a876bf',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}

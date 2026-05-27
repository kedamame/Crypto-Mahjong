import { Metadata } from 'next';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://your-app.vercel.app';

function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] ?? s[v] ?? s[0]);
}

interface Props {
  searchParams: { mode?: string; elapsed?: string; clears?: string; shuffles?: string };
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const mode     = searchParams.mode     ?? 'normal';
  const elapsed  = parseInt(searchParams.elapsed  ?? '0', 10);
  const clears   = parseInt(searchParams.clears   ?? '0', 10);
  const shuffles = parseInt(searchParams.shuffles ?? '0', 10);

  const mins    = Math.floor(elapsed / 60);
  const secs    = elapsed % 60;
  const timeStr = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  const modeStr = mode === 'speed' ? ' (Speed)' : '';
  const clearStr = clears > 0 ? ` ${ordinal(clears)} clear on Base.` : '';

  const title       = `Cleared Crypto Mahjong${modeStr} in ${timeStr}!`;
  const description = `${title}${clearStr} Play and record your clears on Base.`;

  const ogImageUrl = `${APP_URL}/og-share.png?mode=${mode}&elapsed=${elapsed}&clears=${clears}&shuffles=${shuffles}`;

  const miniAppEmbed = {
    version: '1',
    imageUrl: ogImageUrl,
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

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: ogImageUrl, width: 900, height: 600 }],
      url: APP_URL,
    },
    other: {
      // fc:miniapp — used by Farcaster to render the rich miniapp embed card
      'fc:miniapp': JSON.stringify(miniAppEmbed),
    },
  };
}

export default function SharePage({ searchParams }: Props) {
  const mode     = searchParams.mode ?? 'normal';
  const elapsed  = parseInt(searchParams.elapsed  ?? '0', 10);
  const clears   = parseInt(searchParams.clears   ?? '0', 10);
  const shuffles = parseInt(searchParams.shuffles ?? '0', 10);

  const mins    = Math.floor(elapsed / 60);
  const secs    = elapsed % 60;
  const timeStr = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;

  return (
    <div
      style={{
        minHeight: '100dvh',
        backgroundColor: '#ede9df',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        fontFamily: 'Courier New, monospace',
      }}
    >
      <div style={{ fontSize: 10, letterSpacing: 4, color: '#888880', marginBottom: 8 }}>CLEARED</div>
      <div style={{ fontSize: 40, fontWeight: 900, lineHeight: 1, color: '#141410', marginBottom: 20 }}>
        WELL<br />PLAYED
      </div>
      <div style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
        <div>
          <div style={{ fontSize: 9, letterSpacing: 2, color: '#888880' }}>TIME</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: '#3558c8' }}>{timeStr}</div>
        </div>
        {clears > 0 && (
          <div>
            <div style={{ fontSize: 9, letterSpacing: 2, color: '#888880' }}>CLEARS</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#1a7a4a' }}>{clears}</div>
          </div>
        )}
        <div>
          <div style={{ fontSize: 9, letterSpacing: 2, color: '#888880' }}>SHUFFLES</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: '#888880' }}>{shuffles}</div>
        </div>
        <div>
          <div style={{ fontSize: 9, letterSpacing: 2, color: '#888880' }}>MODE</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: mode === 'speed' ? '#3558c8' : '#141410' }}>
            {mode === 'speed' ? 'SPEED' : 'NORMAL'}
          </div>
        </div>
      </div>
      <a
        href={process.env.NEXT_PUBLIC_APP_URL || '/'}
        style={{
          backgroundColor: '#141410',
          color: '#ede9df',
          padding: '14px 28px',
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: 2,
          textDecoration: 'none',
          fontFamily: 'Courier New, monospace',
        }}
      >
        PLAY NOW
      </a>
    </div>
  );
}

import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Tile showcase / app intro screenshot
export async function GET() {
  const tiles = [
    { l: 'BTC',    s: 'B', c: '#3558c8', suit: 'L1' },
    { l: 'ETH',    s: 'E', c: '#3558c8', suit: 'L1' },
    { l: 'ARB',    s: 'A', c: '#7c3aed', suit: 'L2' },
    { l: 'OP',     s: 'O', c: '#7c3aed', suit: 'L2' },
    { l: 'UNI',    s: 'U', c: '#1a7a4a', suit: 'DeFi' },
    { l: 'AAVE',   s: 'A', c: '#1a7a4a', suit: 'DeFi' },
    { l: 'DEGEN',  s: 'D', c: '#141410', suit: 'FC' },
    { l: 'HIGHER', s: 'H', c: '#141410', suit: 'FC' },
    { l: 'USDC',   s: '$', c: '#1a7a4a', suit: 'SB' },
    { l: 'BULL',   s: 'B', c: '#c44a1a', suit: 'SN' },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#ede9df',
          padding: '80px 60px',
        }}
      >
        {/* Top label */}
        <div style={{ display: 'flex', fontSize: 14, letterSpacing: 5, color: '#888880', marginBottom: 16, fontFamily: 'monospace' }}>
          BASE / FARCASTER
        </div>

        {/* Big title */}
        <div style={{ display: 'flex', fontSize: 128, fontWeight: 900, color: '#141410', lineHeight: 0.86, fontFamily: 'monospace', letterSpacing: -4 }}>
          CRYPTO
        </div>
        <div style={{ display: 'flex', fontSize: 128, fontWeight: 900, color: '#3558c8', lineHeight: 0.86, fontFamily: 'monospace', letterSpacing: -4, marginBottom: 64 }}>
          MAHJONG
        </div>

        {/* Tile showcase */}
        <div style={{ display: 'flex', flexWrap: 'nowrap', gap: 16, marginBottom: 48 }}>
          {tiles.slice(0, 5).map((t, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: 148,
                height: 204,
                backgroundColor: '#f5f0e8',
                border: '4px solid #141410',
                overflow: 'hidden',
                boxShadow: '4px 4px 0 #141410',
              }}
            >
              <div style={{ display: 'flex', height: 14, backgroundColor: t.c }} />
              <div style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ display: 'flex', fontSize: 56, fontWeight: 900, color: '#141410', fontFamily: 'monospace', lineHeight: 1 }}>{t.s}</div>
                <div style={{ display: 'flex', fontSize: t.l.length > 4 ? 14 : 18, fontWeight: 700, color: '#444440', fontFamily: 'monospace', marginTop: 6 }}>{t.l}</div>
              </div>
              <div style={{ display: 'flex', fontSize: 11, color: t.c, fontFamily: 'monospace', justifyContent: 'center', paddingBottom: 6 }}>{t.suit}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'nowrap', gap: 16, marginBottom: 80 }}>
          {tiles.slice(5, 10).map((t, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: 148,
                height: 204,
                backgroundColor: '#f5f0e8',
                border: '4px solid #141410',
                overflow: 'hidden',
                boxShadow: '4px 4px 0 #141410',
              }}
            >
              <div style={{ display: 'flex', height: 14, backgroundColor: t.c }} />
              <div style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ display: 'flex', fontSize: 56, fontWeight: 900, color: '#141410', fontFamily: 'monospace', lineHeight: 1 }}>{t.s}</div>
                <div style={{ display: 'flex', fontSize: t.l.length > 4 ? 14 : 18, fontWeight: 700, color: '#444440', fontFamily: 'monospace', marginTop: 6 }}>{t.l}</div>
              </div>
              <div style={{ display: 'flex', fontSize: 11, color: t.c, fontFamily: 'monospace', justifyContent: 'center', paddingBottom: 6 }}>{t.suit}</div>
            </div>
          ))}
        </div>

        {/* Tagline */}
        <div style={{ display: 'flex', fontSize: 22, color: '#888880', fontFamily: 'monospace', letterSpacing: 1 }}>
          34 crypto token types - 72 pairs - 144 tiles
        </div>
        <div style={{ display: 'flex', fontSize: 18, color: '#888880', fontFamily: 'monospace', marginTop: 8 }}>
          Match free tiles, clear the board, record on Base.
        </div>
      </div>
    ),
    { width: 1284, height: 2778 },
  );
}

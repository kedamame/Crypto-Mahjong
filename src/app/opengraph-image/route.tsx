import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundColor: '#ede9df',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Scattered tiles */}
        {[
          { l: 'BTC', s: 'B', c: '#3558c8', x: 20, y: 30, r: -7 },
          { l: 'ETH', s: 'E', c: '#3558c8', x: 110, y: 170, r: 5 },
          { l: 'ARB', s: 'A', c: '#7c3aed', x: 680, y: 50, r: 9 },
          { l: 'DEGEN', s: 'D', c: '#141410', x: 760, y: 220, r: -5 },
          { l: 'BASE', s: 'B', c: '#7c3aed', x: 700, y: 390, r: 12 },
          { l: 'SOL', s: 'S', c: '#3558c8', x: 30, y: 350, r: -11 },
        ].map((t, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: t.x,
              top: t.y,
              display: 'flex',
              flexDirection: 'column',
              width: 64,
              height: 88,
              backgroundColor: '#f5f0e8',
              border: '3px solid #141410',
              overflow: 'hidden',
              transform: `rotate(${t.r}deg)`,
              boxShadow: '3px 3px 0 #141410',
            }}
          >
            <div style={{ display: 'flex', height: 7, backgroundColor: t.c }} />
            <div style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ display: 'flex', fontSize: 24, fontWeight: 900, color: '#141410', fontFamily: 'monospace' }}>{t.s}</div>
              <div style={{ display: 'flex', fontSize: t.l.length > 4 ? 7 : 10, fontWeight: 700, color: '#444440', fontFamily: 'monospace', marginTop: 2 }}>{t.l}</div>
            </div>
          </div>
        ))}

        {/* Main text */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ display: 'flex', fontSize: 96, fontWeight: 900, color: '#141410', lineHeight: 0.9, fontFamily: 'monospace', letterSpacing: -3 }}>
            CRYPTO
          </div>
          <div style={{ display: 'flex', fontSize: 96, fontWeight: 900, color: '#3558c8', lineHeight: 0.9, fontFamily: 'monospace', letterSpacing: -3, marginBottom: 16 }}>
            MAHJONG
          </div>
          <div style={{ display: 'flex', fontSize: 14, color: '#888880', fontFamily: 'monospace', letterSpacing: 2 }}>
            MATCH PAIRS - CLEAR THE BOARD - RECORD ON BASE
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 8, backgroundColor: '#141410' }} />
      </div>
    ),
    { width: 900, height: 600 },
  );
}

import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] ?? s[v] ?? s[0]);
}

// 900x600 = 3:2 — matches fc:miniapp imageUrl display ratio in Farcaster clients
const W = 900;
const H = 600;

function OgTile({
  label,
  color,
  x,
  y,
  rotate,
}: {
  label: string;
  color: string;
  x: number;
  y: number;
  rotate: number;
}) {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        display: 'flex',
        flexDirection: 'column',
        width: 68,
        height: 94,
        backgroundColor: '#f5f0e8',
        border: '3px solid #141410',
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <div style={{ display: 'flex', height: 7, backgroundColor: color }} />
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: 38,
            height: 38,
            borderRadius: 19,
            backgroundColor: color,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              color: '#fff',
              fontSize: 16,
              fontWeight: 900,
              fontFamily: 'monospace',
            }}
          >
            {label[0]}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: label.length > 4 ? 7 : 9,
            fontWeight: 700,
            color: '#444440',
            fontFamily: 'monospace',
            marginTop: 4,
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode     = searchParams.get('mode') ?? 'normal';
  const elapsed  = parseInt(searchParams.get('elapsed') ?? '0', 10);
  const clears   = parseInt(searchParams.get('clears')  ?? '0', 10);
  const shuffles = parseInt(searchParams.get('shuffles') ?? '0', 10);

  const mins    = Math.floor(elapsed / 60);
  const secs    = elapsed % 60;
  const timeStr = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;

  const isSpeed = mode === 'speed';
  const modeBg  = isSpeed ? '#3558c8' : '#141410';

  const tiles = [
    { label: 'BTC',   color: '#f7931a', x: 556, y: 18,  rotate: -10 },
    { label: 'ETH',   color: '#627eea', x: 726, y: 10,  rotate: 6   },
    { label: 'BASE',  color: '#3558c8', x: 820, y: 88,  rotate: 12  },
    { label: 'SOL',   color: '#9945ff', x: 568, y: 210, rotate: -7  },
    { label: 'DEGEN', color: '#141410', x: 758, y: 188, rotate: -4  },
    { label: 'UNI',   color: '#ff007a', x: 590, y: 388, rotate: 8   },
    { label: 'ARB',   color: '#28a0f0', x: 800, y: 350, rotate: -12 },
  ];

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
        {/* Decorative tiles — right side */}
        {tiles.map((t) => (
          <OgTile key={t.label} {...t} />
        ))}

        {/* Divider */}
        <div
          style={{
            position: 'absolute',
            left: 530,
            top: 36,
            bottom: 36,
            width: 1,
            backgroundColor: '#d0ccc0',
            display: 'flex',
          }}
        />

        {/* Left content */}
        <div
          style={{
            position: 'absolute',
            left: 48,
            top: 0,
            bottom: 0,
            width: 464,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* CLEARED + mode badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: 11,
                letterSpacing: 4,
                color: '#888880',
                fontFamily: 'monospace',
                marginRight: 12,
                whiteSpace: 'nowrap',
              }}
            >
              CLEARED
            </div>
            <div
              style={{
                display: 'flex',
                backgroundColor: modeBg,
                color: '#ede9df',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 3,
                fontFamily: 'monospace',
                paddingTop: 3,
                paddingBottom: 3,
                paddingLeft: 8,
                paddingRight: 8,
                whiteSpace: 'nowrap',
              }}
            >
              {isSpeed ? 'SPEED' : 'NORMAL'}
            </div>
          </div>

          {/* WELL PLAYED */}
          <div
            style={{
              display: 'flex',
              fontSize: 88,
              fontWeight: 900,
              color: '#141410',
              lineHeight: 0.88,
              fontFamily: 'monospace',
              letterSpacing: -2,
              whiteSpace: 'nowrap',
            }}
          >
            WELL
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 88,
              fontWeight: 900,
              color: '#141410',
              lineHeight: 0.88,
              fontFamily: 'monospace',
              letterSpacing: -2,
              marginBottom: 36,
              whiteSpace: 'nowrap',
            }}
          >
            PLAYED
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 36 }}>
            {/* TIME */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  display: 'flex',
                  fontSize: 9,
                  letterSpacing: 3,
                  color: '#888880',
                  fontFamily: 'monospace',
                  whiteSpace: 'nowrap',
                }}
              >
                TIME
              </div>
              <div
                style={{
                  display: 'flex',
                  fontSize: 32,
                  fontWeight: 900,
                  color: '#3558c8',
                  fontFamily: 'monospace',
                  whiteSpace: 'nowrap',
                }}
              >
                {timeStr}
              </div>
            </div>

            {/* CLEARS — only if recorded */}
            {clears > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div
                  style={{
                    display: 'flex',
                    fontSize: 9,
                    letterSpacing: 3,
                    color: '#888880',
                    fontFamily: 'monospace',
                    whiteSpace: 'nowrap',
                  }}
                >
                  CLEARS
                </div>
                <div
                  style={{
                    display: 'flex',
                    fontSize: 32,
                    fontWeight: 900,
                    color: '#1a7a4a',
                    fontFamily: 'monospace',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {ordinal(clears)}
                </div>
              </div>
            )}

            {/* SHUFFLES */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  display: 'flex',
                  fontSize: 9,
                  letterSpacing: 3,
                  color: '#888880',
                  fontFamily: 'monospace',
                  whiteSpace: 'nowrap',
                }}
              >
                SHUFFLES
              </div>
              <div
                style={{
                  display: 'flex',
                  fontSize: 32,
                  fontWeight: 900,
                  color: '#888880',
                  fontFamily: 'monospace',
                }}
              >
                {shuffles}
              </div>
            </div>
          </div>
        </div>

        {/* App credit */}
        <div
          style={{
            position: 'absolute',
            right: 32,
            bottom: 18,
            display: 'flex',
            fontSize: 9,
            letterSpacing: 3,
            color: '#888880',
            fontFamily: 'monospace',
            whiteSpace: 'nowrap',
          }}
        >
          CRYPTO MAHJONG
        </div>

        {/* Bottom stripe */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 8,
            backgroundColor: '#141410',
            display: 'flex',
          }}
        />
      </div>
    ),
    { width: W, height: H },
  );
}

import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Small tile component for OG image
function OgTile({
  label,
  symbol,
  color,
  x,
  y,
  rotate,
}: {
  label: string;
  symbol: string;
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
        width: 72,
        height: 100,
        backgroundColor: '#f5f0e8',
        border: '3px solid #141410',
        overflow: 'hidden',
        transform: `rotate(${rotate}deg)`,
        boxShadow: '3px 3px 0 #141410',
      }}
    >
      <div style={{ display: 'flex', height: 8, backgroundColor: color }} />
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ display: 'flex', fontSize: 28, fontWeight: 900, color: '#141410', fontFamily: 'monospace', lineHeight: 1 }}>
          {symbol}
        </div>
        <div style={{ display: 'flex', fontSize: label.length > 4 ? 8 : 11, fontWeight: 700, color: '#444440', fontFamily: 'monospace', marginTop: 4 }}>
          {label}
        </div>
      </div>
    </div>
  );
}

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
        {/* Scattered tile decorations */}
        <OgTile label="BTC" symbol="B" color="#3558c8" x={32} y={40} rotate={-8} />
        <OgTile label="ETH" symbol="E" color="#3558c8" x={120} y={180} rotate={5} />
        <OgTile label="ARB" symbol="A" color="#7c3aed" x={48} y={340} rotate={-12} />
        <OgTile label="DEGEN" symbol="D" color="#141410" x={760} y={60} rotate={10} />
        <OgTile label="USDC" symbol="$" color="#1a7a4a" x={820} y={240} rotate={-6} />
        <OgTile label="BASE" symbol="B" color="#7c3aed" x={740} y={390} rotate={8} />
        <OgTile label="SOL" symbol="S" color="#3558c8" x={580} y={28} rotate={-4} />
        <OgTile label="UNI" symbol="U" color="#1a7a4a" x={640} y={440} rotate={14} />

        {/* Main title area */}
        <div
          style={{
            position: 'absolute',
            left: 70,
            top: 0,
            bottom: 0,
            right: 70,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 11,
              letterSpacing: 4,
              color: '#888880',
              fontFamily: 'monospace',
              marginBottom: 12,
            }}
          >
            BASE MAINNET / FARCASTER MINIAPP
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 116,
              fontWeight: 900,
              color: '#141410',
              lineHeight: 0.88,
              fontFamily: 'monospace',
              letterSpacing: -3,
            }}
          >
            CRYPTO
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 116,
              fontWeight: 900,
              color: '#3558c8',
              lineHeight: 0.88,
              fontFamily: 'monospace',
              letterSpacing: -3,
              marginBottom: 24,
            }}
          >
            MAHJONG
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 16,
              color: '#444440',
              fontFamily: 'monospace',
              lineHeight: 1.5,
            }}
          >
            Match pairs of free crypto tiles to clear the board.
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 14,
              color: '#888880',
              fontFamily: 'monospace',
              marginTop: 6,
            }}
          >
            Record your clears on Base.
          </div>
        </div>

        {/* Bottom border */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 8,
            backgroundColor: '#141410',
          }}
        />
      </div>
    ),
    { width: 1200, height: 630 },
  );
}

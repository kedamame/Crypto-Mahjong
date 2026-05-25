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
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Main tile */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: 560,
            height: 760,
            backgroundColor: '#f5f0e8',
            border: '28px solid #141410',
            boxShadow: '28px 28px 0 #141410',
            overflow: 'hidden',
          }}
        >
          {/* Color stripe */}
          <div style={{ display: 'flex', height: 48, backgroundColor: '#3558c8' }} />
          {/* Content */}
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
                fontSize: 320,
                fontWeight: 900,
                color: '#141410',
                lineHeight: 1,
                fontFamily: 'monospace',
              }}
            >
              M
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: 56,
                fontWeight: 700,
                color: '#3558c8',
                letterSpacing: 12,
                fontFamily: 'monospace',
                marginTop: 8,
              }}
            >
              CRYPTO
            </div>
          </div>
          {/* Bottom stripe */}
          <div style={{ display: 'flex', height: 24, backgroundColor: '#141410' }} />
        </div>
      </div>
    ),
    { width: 1024, height: 1024 },
  );
}

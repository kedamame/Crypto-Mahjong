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
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: 112,
            height: 148,
            backgroundColor: '#f5f0e8',
            border: '5px solid #141410',
            boxShadow: '5px 5px 0 #141410',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', height: 9, backgroundColor: '#3558c8' }} />
          <div
            style={{
              display: 'flex',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ display: 'flex', fontSize: 64, fontWeight: 900, color: '#141410', fontFamily: 'monospace' }}>
              M
            </div>
          </div>
          <div style={{ display: 'flex', height: 5, backgroundColor: '#141410' }} />
        </div>
      </div>
    ),
    { width: 200, height: 200 },
  );
}

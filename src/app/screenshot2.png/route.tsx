import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Win modal screenshot
export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundColor: 'rgba(20,20,16,0.85)',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Background hint */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#ede9df',
            opacity: 0.15,
          }}
        />

        {/* Modal card */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#ede9df',
            border: '6px solid #141410',
            padding: '60px',
            width: 820,
            boxShadow: '12px 12px 0 #141410',
          }}
        >
          <div style={{ display: 'flex', fontSize: 18, letterSpacing: 6, color: '#888880', marginBottom: 16, fontFamily: 'monospace' }}>
            CLEARED
          </div>

          <div style={{ display: 'flex', fontSize: 110, fontWeight: 900, lineHeight: 0.88, color: '#141410', fontFamily: 'monospace', marginBottom: 48 }}>
            WELL
          </div>
          <div style={{ display: 'flex', fontSize: 110, fontWeight: 900, lineHeight: 0.88, color: '#141410', fontFamily: 'monospace', marginBottom: 60 }}>
            PLAYED
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 60, marginBottom: 60 }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', fontSize: 14, letterSpacing: 4, color: '#888880', fontFamily: 'monospace' }}>TIME</div>
              <div style={{ display: 'flex', fontSize: 72, fontWeight: 900, color: '#3558c8', fontFamily: 'monospace' }}>7m 23s</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', fontSize: 14, letterSpacing: 4, color: '#888880', fontFamily: 'monospace' }}>PAIRS</div>
              <div style={{ display: 'flex', fontSize: 72, fontWeight: 900, color: '#141410', fontFamily: 'monospace' }}>72</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', fontSize: 14, letterSpacing: 4, color: '#888880', fontFamily: 'monospace' }}>CLEARS</div>
              <div style={{ display: 'flex', fontSize: 72, fontWeight: 900, color: '#1a7a4a', fontFamily: 'monospace' }}>3</div>
            </div>
          </div>

          {/* Button */}
          <div style={{ display: 'flex', backgroundColor: '#3558c8', padding: '28px 0', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', fontSize: 22, fontWeight: 700, letterSpacing: 4, color: '#fff', fontFamily: 'monospace' }}>
              RECORD ON BASE
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1284, height: 2778 },
  );
}

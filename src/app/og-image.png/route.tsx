import { ImageResponse } from 'next/og';

export const runtime = 'edge';

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const chunks: string[] = [];
  const CHUNK = 0x8000;
  for (let i = 0; i < bytes.length; i += CHUNK) {
    chunks.push(String.fromCharCode(...(bytes.subarray(i, i + CHUNK) as unknown as number[])));
  }
  return btoa(chunks.join(''));
}

async function fetchImg(url: string): Promise<string> {
  try {
    const res = await fetch(url);
    if (!res.ok) return '';
    const ct = res.headers.get('content-type') || 'image/png';
    const buf = await res.arrayBuffer();
    return `data:${ct};base64,${arrayBufferToBase64(buf)}`;
  } catch {
    return '';
  }
}

const TW = 'https://cdn.jsdelivr.net/gh/trustwallet/assets@master/blockchains';

function OgTile({
  label,
  imgSrc,
  fallbackColor,
  x,
  y,
  rotate,
}: {
  label: string;
  imgSrc: string;
  fallbackColor: string;
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
        width: 84,
        height: 114,
        backgroundColor: '#f5f0e8',
        border: '3px solid #141410',
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <div style={{ display: 'flex', height: 9, backgroundColor: fallbackColor }} />
      <div style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {imgSrc ? (
          <img src={imgSrc} width={52} height={52} style={{ borderRadius: 26 }} />
        ) : (
          <div style={{ display: 'flex', width: 52, height: 52, borderRadius: 26, backgroundColor: fallbackColor, alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', color: '#fff', fontSize: 22, fontWeight: 900, fontFamily: 'monospace' }}>{label[0]}</div>
          </div>
        )}
        <div style={{ display: 'flex', fontSize: label.length > 4 ? 9 : 12, fontWeight: 700, color: '#444440', fontFamily: 'monospace', marginTop: 5 }}>
          {label}
        </div>
      </div>
    </div>
  );
}

export async function GET() {
  const [btc, sol, degen, eth, usdc, arb, uni, base] = await Promise.all([
    fetchImg(`${TW}/bitcoin/info/logo.png`),
    fetchImg(`${TW}/solana/info/logo.png`),
    fetchImg(`${TW}/base/assets/0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed/logo.png`),
    fetchImg(`${TW}/ethereum/info/logo.png`),
    fetchImg(`${TW}/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png`),
    fetchImg(`${TW}/arbitrum/info/logo.png`),
    fetchImg(`${TW}/ethereum/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png`),
    fetchImg(`${TW}/base/info/logo.png`),
  ]);

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
        {/* Tiles — right half only (x >= 640) */}
        <OgTile label="BTC"   imgSrc={btc}   fallbackColor="#f7931a" x={648}  y={28}  rotate={-10} />
        <OgTile label="SOL"   imgSrc={sol}   fallbackColor="#9945ff" x={848}  y={18}  rotate={-4}  />
        <OgTile label="DEGEN" imgSrc={degen} fallbackColor="#141410" x={1048} y={58}  rotate={12}  />
        <OgTile label="ETH"   imgSrc={eth}   fallbackColor="#627eea" x={700}  y={260} rotate={6}   />
        <OgTile label="USDC"  imgSrc={usdc}  fallbackColor="#2775ca" x={988}  y={230} rotate={-7}  />
        <OgTile label="ARB"   imgSrc={arb}   fallbackColor="#7c3aed" x={660}  y={440} rotate={-13} />
        <OgTile label="UNI"   imgSrc={uni}   fallbackColor="#ff007a" x={878}  y={458} rotate={11}  />
        <OgTile label="BASE"  imgSrc={base}  fallbackColor="#3558c8" x={1068} y={378} rotate={8}   />

        {/* Divider line */}
        <div style={{ position: 'absolute', left: 600, top: 40, bottom: 40, width: 1, backgroundColor: '#d0ccc0', display: 'flex' }} />

        {/* Text — left half */}
        <div
          style={{
            position: 'absolute',
            left: 60,
            top: 0,
            bottom: 0,
            width: 500,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div style={{ display: 'flex', fontSize: 11, letterSpacing: 4, color: '#888880', fontFamily: 'monospace', marginBottom: 16 }}>
            BASE MAINNET / FARCASTER MINIAPP
          </div>
          <div style={{ display: 'flex', fontSize: 112, fontWeight: 900, color: '#141410', lineHeight: 0.88, fontFamily: 'monospace', letterSpacing: -2 }}>
            CRYPTO
          </div>
          <div style={{ display: 'flex', fontSize: 112, fontWeight: 900, color: '#3558c8', lineHeight: 0.88, fontFamily: 'monospace', letterSpacing: -2, marginBottom: 28 }}>
            MAHJONG
          </div>
          <div style={{ display: 'flex', fontSize: 17, color: '#444440', fontFamily: 'monospace', lineHeight: 1.5 }}>
            Match pairs of free crypto tiles to clear the board.
          </div>
          <div style={{ display: 'flex', fontSize: 14, color: '#888880', fontFamily: 'monospace', marginTop: 8 }}>
            Record your clears on Base.
          </div>
        </div>

        {/* Bottom border */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 8, backgroundColor: '#141410', display: 'flex' }} />
      </div>
    ),
    { width: 1200, height: 630 },
  );
}

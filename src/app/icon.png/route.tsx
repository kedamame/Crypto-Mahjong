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

export async function GET() {
  const [btc, eth, uni, arb, sol, usdc, bnb, op] = await Promise.all([
    fetchImg(`${TW}/bitcoin/info/logo.png`),
    fetchImg(`${TW}/ethereum/info/logo.png`),
    fetchImg(`${TW}/ethereum/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png`),
    fetchImg(`${TW}/arbitrum/info/logo.png`),
    fetchImg(`${TW}/solana/info/logo.png`),
    fetchImg(`${TW}/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png`),
    fetchImg(`${TW}/smartchain/info/logo.png`),
    fetchImg(`${TW}/optimism/info/logo.png`),
  ]);

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', backgroundColor: '#ede9df', position: 'relative' }}>

        {/* BTC - top left */}
        {btc ? (
          <img src={btc} width={240} height={240} style={{ position: 'absolute', left: 0, top: 26, borderRadius: 120 }} />
        ) : (
          <div style={{ position: 'absolute', left: 0, top: 26, width: 240, height: 240, borderRadius: 120, backgroundColor: '#f7931a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', color: '#fff', fontSize: 40, fontWeight: 900, fontFamily: 'monospace' }}>BTC</div>
          </div>
        )}

        {/* ETH - top right */}
        {eth ? (
          <img src={eth} width={240} height={240} style={{ position: 'absolute', left: 784, top: 0, borderRadius: 120 }} />
        ) : (
          <div style={{ position: 'absolute', left: 784, top: 0, width: 240, height: 240, borderRadius: 120, backgroundColor: '#627eea', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', color: '#fff', fontSize: 40, fontWeight: 900, fontFamily: 'monospace' }}>ETH</div>
          </div>
        )}

        {/* UNI - left middle */}
        {uni ? (
          <img src={uni} width={224} height={224} style={{ position: 'absolute', left: 0, top: 350, borderRadius: 112 }} />
        ) : (
          <div style={{ position: 'absolute', left: 0, top: 350, width: 224, height: 224, borderRadius: 112, backgroundColor: '#ff007a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', color: '#fff', fontSize: 40, fontWeight: 900, fontFamily: 'monospace' }}>UNI</div>
          </div>
        )}

        {/* ARB - right middle */}
        {arb ? (
          <img src={arb} width={224} height={224} style={{ position: 'absolute', left: 800, top: 360, borderRadius: 112 }} />
        ) : (
          <div style={{ position: 'absolute', left: 800, top: 360, width: 224, height: 224, borderRadius: 112, backgroundColor: '#2d374b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', color: '#fff', fontSize: 40, fontWeight: 900, fontFamily: 'monospace' }}>ARB</div>
          </div>
        )}

        {/* SOL - bottom left */}
        {sol ? (
          <img src={sol} width={234} height={234} style={{ position: 'absolute', left: 0, top: 676, borderRadius: 117 }} />
        ) : (
          <div style={{ position: 'absolute', left: 0, top: 676, width: 234, height: 234, borderRadius: 117, backgroundColor: '#9945ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', color: '#fff', fontSize: 40, fontWeight: 900, fontFamily: 'monospace' }}>SOL</div>
          </div>
        )}

        {/* USDC - bottom right */}
        {usdc ? (
          <img src={usdc} width={234} height={234} style={{ position: 'absolute', left: 790, top: 686, borderRadius: 117 }} />
        ) : (
          <div style={{ position: 'absolute', left: 790, top: 686, width: 234, height: 234, borderRadius: 117, backgroundColor: '#2775ca', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', color: '#fff', fontSize: 30, fontWeight: 900, fontFamily: 'monospace' }}>USDC</div>
          </div>
        )}

        {/* BNB - top center-left */}
        {bnb ? (
          <img src={bnb} width={210} height={210} style={{ position: 'absolute', left: 80, top: 0, borderRadius: 105 }} />
        ) : (
          <div style={{ position: 'absolute', left: 80, top: 0, width: 210, height: 210, borderRadius: 105, backgroundColor: '#f3ba2f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', color: '#fff', fontSize: 38, fontWeight: 900, fontFamily: 'monospace' }}>BNB</div>
          </div>
        )}

        {/* OP - bottom center-right */}
        {op ? (
          <img src={op} width={210} height={210} style={{ position: 'absolute', left: 736, top: 810, borderRadius: 105 }} />
        ) : (
          <div style={{ position: 'absolute', left: 736, top: 810, width: 210, height: 210, borderRadius: 105, backgroundColor: '#ff0420', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', color: '#fff', fontSize: 40, fontWeight: 900, fontFamily: 'monospace' }}>OP</div>
          </div>
        )}

        {/* Tile drop-shadow */}
        <div style={{ position: 'absolute', left: 320, top: 240, width: 416, height: 576, backgroundColor: '#3a2e1a', display: 'flex' }} />

        {/* Mahjong tile */}
        <div style={{
          position: 'absolute', left: 304, top: 224, width: 416, height: 576,
          backgroundColor: '#f8f2e0', border: '18px solid #8a6e30',
          display: 'flex', paddingTop: 20, paddingBottom: 20, paddingLeft: 20, paddingRight: 20,
        }}>
          <div style={{ flex: 1, border: '6px solid #8a6e30', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', fontSize: 13, letterSpacing: 7, color: '#8a6e30', fontFamily: 'monospace', fontWeight: 700 }}>CRYPTO</div>
            <div style={{ display: 'flex', fontSize: 256, fontWeight: 900, color: '#cc1a1a', lineHeight: 1, fontFamily: 'monospace', marginTop: 6, marginBottom: 10 }}>M</div>
            <div style={{ display: 'flex', fontSize: 20, letterSpacing: 9, color: '#3558c8', fontFamily: 'monospace', fontWeight: 700 }}>MAHJONG</div>
          </div>
        </div>

      </div>
    ),
    { width: 1024, height: 1024 },
  );
}

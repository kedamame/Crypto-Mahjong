import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Simulated board screenshot showing the mahjong grid
export async function GET() {
  const TILE_W = 50;
  const TILE_H = 68;
  const cols = 10;
  const rows = 6;

  const tokens = [
    'BTC','ETH','SOL','BNB','AVAX','DOT','ATOM','NEAR','FTM','UNI',
    'AAVE','MKR','CRV','COMP','ARB','OP','BASE','ZK','DEGEN','HIGHER',
    'MATIC','LINK','USDC','USDT','WBTC','IMX','SCROLL','STRK','BLAST','MANTA',
    'YFI','SUSHI','BAL','LDO','BTC','ETH','SOL','BNB','AVAX','DOT',
    'ATOM','NEAR','FTM','UNI','AAVE','MKR','CRV','COMP','ARB','OP',
    'BASE','ZK','DEGEN','HIGHER','MATIC','LINK','USDC','USDT','WBTC','IMX',
  ];

  const suitColors: Record<string, string> = {
    BTC:'#3558c8',ETH:'#3558c8',SOL:'#3558c8',BNB:'#3558c8',AVAX:'#3558c8',DOT:'#3558c8',ATOM:'#3558c8',NEAR:'#3558c8',FTM:'#3558c8',
    UNI:'#1a7a4a',AAVE:'#1a7a4a',MKR:'#1a7a4a',CRV:'#1a7a4a',COMP:'#1a7a4a',YFI:'#1a7a4a',SUSHI:'#1a7a4a',BAL:'#1a7a4a',LDO:'#1a7a4a',
    ARB:'#7c3aed',OP:'#7c3aed',BASE:'#7c3aed',ZK:'#7c3aed',IMX:'#7c3aed',SCROLL:'#7c3aed',STRK:'#7c3aed',BLAST:'#7c3aed',MANTA:'#7c3aed',
    DEGEN:'#141410',HIGHER:'#141410',MATIC:'#141410',LINK:'#141410',
    USDC:'#1a7a4a',USDT:'#888880',WBTC:'#c47a20',
  };

  const tileEls = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const idx = row * cols + col;
      const tk = tokens[idx % tokens.length];
      const color = suitColors[tk] ?? '#3558c8';
      tileEls.push(
        <div
          key={idx}
          style={{
            position: 'absolute',
            left: col * (TILE_W + 2) + 60,
            top: row * (TILE_H + 2) + 220,
            display: 'flex',
            flexDirection: 'column',
            width: TILE_W,
            height: TILE_H,
            backgroundColor: '#f5f0e8',
            border: '2px solid #141410',
            overflow: 'hidden',
            boxShadow: '2px 2px 0 #141410',
          }}
        >
          <div style={{ display: 'flex', height: 6, backgroundColor: color }} />
          <div style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', fontSize: 20, fontWeight: 900, color: '#141410', fontFamily: 'monospace', lineHeight: 1 }}>
              {tk[0]}
            </div>
            <div style={{ display: 'flex', fontSize: tk.length > 4 ? 7 : 9, fontWeight: 700, color: '#444440', fontFamily: 'monospace', marginTop: 2 }}>
              {tk}
            </div>
          </div>
        </div>
      );
    }
  }

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
        {/* Header */}
        <div
          style={{
            position: 'absolute',
            top: 60,
            left: 60,
            right: 60,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontSize: 12, letterSpacing: 4, color: '#888880', fontFamily: 'monospace' }}>CRYPTO</div>
            <div style={{ display: 'flex', fontSize: 52, fontWeight: 900, color: '#141410', lineHeight: 1, fontFamily: 'monospace' }}>MAHJONG</div>
          </div>
          <div style={{ display: 'flex', gap: 32 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <div style={{ display: 'flex', fontSize: 11, letterSpacing: 2, color: '#888880', fontFamily: 'monospace' }}>PAIRS</div>
              <div style={{ display: 'flex', fontSize: 40, fontWeight: 900, color: '#3558c8', fontFamily: 'monospace' }}>24/72</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <div style={{ display: 'flex', fontSize: 11, letterSpacing: 2, color: '#888880', fontFamily: 'monospace' }}>TIME</div>
              <div style={{ display: 'flex', fontSize: 40, fontWeight: 900, color: '#141410', fontFamily: 'monospace' }}>03:42</div>
            </div>
          </div>
        </div>

        {/* Tiles */}
        {tileEls}

        {/* Bottom bar */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 10, backgroundColor: '#141410' }} />
      </div>
    ),
    { width: 1284, height: 2778 },
  );
}

// Crypto Mahjong Solitaire - Game Logic
// 144 tiles = 34 regular types x4 + 4 flowers + 4 seasons

export type TileSuit = 'l1' | 'defi' | 'l2' | 'wind' | 'dragon' | 'flower' | 'season';

export interface TileInfo {
  id: string;
  label: string;
  symbol: string;
  suit: TileSuit;
  matchGroup: string;
  suitColor: string;
}

const REGULAR_TILES: TileInfo[] = [
  // L1 Major Chains (blue)
  { id: 'BTC',  label: 'BTC',  symbol: 'B', suit: 'l1',     matchGroup: 'BTC',  suitColor: '#3558c8' },
  { id: 'ETH',  label: 'ETH',  symbol: 'E', suit: 'l1',     matchGroup: 'ETH',  suitColor: '#3558c8' },
  { id: 'SOL',  label: 'SOL',  symbol: 'S', suit: 'l1',     matchGroup: 'SOL',  suitColor: '#3558c8' },
  { id: 'BNB',  label: 'BNB',  symbol: 'B', suit: 'l1',     matchGroup: 'BNB',  suitColor: '#3558c8' },
  { id: 'XRP',  label: 'XRP',  symbol: 'X', suit: 'l1',     matchGroup: 'XRP',  suitColor: '#3558c8' },
  { id: 'ADA',  label: 'ADA',  symbol: 'A', suit: 'l1',     matchGroup: 'ADA',  suitColor: '#3558c8' },
  { id: 'AVAX', label: 'AVAX', symbol: 'A', suit: 'l1',     matchGroup: 'AVAX', suitColor: '#3558c8' },
  { id: 'DOT',  label: 'DOT',  symbol: 'D', suit: 'l1',     matchGroup: 'DOT',  suitColor: '#3558c8' },
  { id: 'LTC',  label: 'LTC',  symbol: 'L', suit: 'l1',     matchGroup: 'LTC',  suitColor: '#3558c8' },
  // DeFi (green)
  { id: 'UNI',   label: 'UNI',   symbol: 'U', suit: 'defi', matchGroup: 'UNI',   suitColor: '#1a7a4a' },
  { id: 'AAVE',  label: 'AAVE',  symbol: 'A', suit: 'defi', matchGroup: 'AAVE',  suitColor: '#1a7a4a' },
  { id: 'MKR',   label: 'MKR',   symbol: 'M', suit: 'defi', matchGroup: 'MKR',   suitColor: '#1a7a4a' },
  { id: 'CRV',   label: 'CRV',   symbol: 'C', suit: 'defi', matchGroup: 'CRV',   suitColor: '#1a7a4a' },
  { id: 'COMP',  label: 'COMP',  symbol: 'C', suit: 'defi', matchGroup: 'COMP',  suitColor: '#1a7a4a' },
  { id: 'YFI',   label: 'YFI',   symbol: 'Y', suit: 'defi', matchGroup: 'YFI',   suitColor: '#1a7a4a' },
  { id: 'SUSHI', label: 'SUSHI', symbol: 'S', suit: 'defi', matchGroup: 'SUSHI', suitColor: '#1a7a4a' },
  { id: 'BAL',   label: 'BAL',   symbol: 'B', suit: 'defi', matchGroup: 'BAL',   suitColor: '#1a7a4a' },
  { id: 'LDO',   label: 'LDO',   symbol: 'L', suit: 'defi', matchGroup: 'LDO',   suitColor: '#1a7a4a' },
  // Alt Chains / L2 (purple)
  { id: 'ARB',  label: 'ARB',  symbol: 'A', suit: 'l2',     matchGroup: 'ARB',  suitColor: '#7c3aed' },
  { id: 'OP',   label: 'OP',   symbol: 'O', suit: 'l2',     matchGroup: 'OP',   suitColor: '#7c3aed' },
  { id: 'IMX',  label: 'IMX',  symbol: 'I', suit: 'l2',     matchGroup: 'IMX',  suitColor: '#7c3aed' },
  { id: 'MATIC',label: 'MATIC',symbol: 'M', suit: 'l2',     matchGroup: 'MATIC',suitColor: '#7c3aed' },
  { id: 'APT',  label: 'APT',  symbol: 'A', suit: 'l2',     matchGroup: 'APT',  suitColor: '#7c3aed' },
  { id: 'SUI',  label: 'SUI',  symbol: 'S', suit: 'l2',     matchGroup: 'SUI',  suitColor: '#7c3aed' },
  { id: 'NEAR', label: 'NEAR', symbol: 'N', suit: 'l2',     matchGroup: 'NEAR', suitColor: '#7c3aed' },
  { id: 'ATOM', label: 'ATOM', symbol: 'A', suit: 'l2',     matchGroup: 'ATOM', suitColor: '#7c3aed' },
  { id: 'FTM',  label: 'FTM',  symbol: 'F', suit: 'l2',     matchGroup: 'FTM',  suitColor: '#7c3aed' },
  // Infra / Protocol (black)
  { id: 'LINK', label: 'LINK', symbol: 'L', suit: 'wind',   matchGroup: 'LINK', suitColor: '#141410' },
  { id: 'GRT',  label: 'GRT',  symbol: 'G', suit: 'wind',   matchGroup: 'GRT',  suitColor: '#141410' },
  { id: 'SNX',  label: 'SNX',  symbol: 'S', suit: 'wind',   matchGroup: 'SNX',  suitColor: '#141410' },
  { id: 'XLM',  label: 'XLM',  symbol: 'X', suit: 'wind',   matchGroup: 'XLM',  suitColor: '#141410' },
  // Stablecoins / Wrapped (gray/green/gold)
  { id: 'USDC', label: 'USDC', symbol: '$', suit: 'dragon', matchGroup: 'USDC', suitColor: '#1a7a4a' },
  { id: 'USDT', label: 'USDT', symbol: '$', suit: 'dragon', matchGroup: 'USDT', suitColor: '#888880' },
  { id: 'WBTC', label: 'WBTC', symbol: 'W', suit: 'dragon', matchGroup: 'WBTC', suitColor: '#c47a20' },
];

const FLOWER_TILES: TileInfo[] = [
  { id: 'FLOWER_DEX',   label: 'DEX',   symbol: 'D', suit: 'flower', matchGroup: 'flower', suitColor: '#c47a20' },
  { id: 'FLOWER_DAO',   label: 'DAO',   symbol: 'D', suit: 'flower', matchGroup: 'flower', suitColor: '#c47a20' },
  { id: 'FLOWER_NFT',   label: 'NFT',   symbol: 'N', suit: 'flower', matchGroup: 'flower', suitColor: '#c47a20' },
  { id: 'FLOWER_BUILD', label: 'BUILD', symbol: 'B', suit: 'flower', matchGroup: 'flower', suitColor: '#c47a20' },
];

const SEASON_TILES: TileInfo[] = [
  { id: 'SEASON_BULL', label: 'BULL', symbol: 'B', suit: 'season', matchGroup: 'season', suitColor: '#c44a1a' },
  { id: 'SEASON_BEAR', label: 'BEAR', symbol: 'B', suit: 'season', matchGroup: 'season', suitColor: '#c44a1a' },
  { id: 'SEASON_CRAB', label: 'CRAB', symbol: 'C', suit: 'season', matchGroup: 'season', suitColor: '#c44a1a' },
  { id: 'SEASON_ALT',  label: 'ALT',  symbol: 'A', suit: 'season', matchGroup: 'season', suitColor: '#c44a1a' },
];

export const ALL_TILE_INFO: Map<string, TileInfo> = new Map(
  [...REGULAR_TILES, ...FLOWER_TILES, ...SEASON_TILES].map((t) => [t.id, t])
);

export interface GameTile {
  uid: number;
  col: number;
  row: number;
  layer: number;
  typeId: string;
  removed: boolean;
  matchAnimating: boolean;
}

// ---- Layout system ----

type Pos = { col: number; row: number; layer: number };

export interface Layout {
  name: string;
  build: () => Pos[];
}

// Fill a rectangle at a given layer
function R(c0: number, c1: number, r0: number, r1: number, l: number): Pos[] {
  const out: Pos[] = [];
  for (let r = r0; r <= r1; r++)
    for (let c = c0; c <= c1; c++)
      out.push({ col: c, row: r, layer: l });
  return out;
}

type Spec = { c0: number; c1: number; r0: number; r1: number; l: number };

function build(specs: Spec[]): Pos[] {
  const out: Pos[] = [];
  for (const s of specs) out.push(...R(s.c0, s.c1, s.r0, s.r1, s.l));
  return out;
}

// ---- 13 layouts (each exactly 144 tiles) ----
// Tile count per spec = (c1-c0+1) * (r1-r0+1)
// Duplicate col/row/layer across layers is intentional (stacked tiles).
// Within a single layer, specs must not overlap.

const LAYOUT_SPECS: Array<{ name: string; specs: Spec[] }> = [
  {
    // 10×8=80 + 9×4=36 + 8×2=16 + 4×2=8 + 4×1=4
    name: 'CLASSIC',
    specs: [
      { c0:0, c1:9,  r0:0, r1:7, l:0 },
      { c0:1, c1:9,  r0:2, r1:5, l:1 },
      { c0:1, c1:8,  r0:3, r1:4, l:2 },
      { c0:3, c1:6,  r0:3, r1:4, l:3 },
      { c0:3, c1:6,  r0:3, r1:3, l:4 },
    ],
  },
  {
    // 10×8=80 + 6×4=24 + 4×4=16 + 4×2=8 + 4×2=8 + 2×2=4 + 2×2=4
    name: 'TOWER',
    specs: [
      { c0:1, c1:10, r0:0, r1:7, l:0 },
      { c0:3, c1:8,  r0:2, r1:5, l:1 },
      { c0:3, c1:6,  r0:2, r1:5, l:2 },
      { c0:4, c1:7,  r0:3, r1:4, l:3 },
      { c0:4, c1:7,  r0:3, r1:4, l:4 },
      { c0:5, c1:6,  r0:3, r1:4, l:5 },
      { c0:5, c1:6,  r0:3, r1:4, l:6 },
    ],
  },
  {
    // 10×8=80 + 8×4=32 + 4×4=16 + 4×2=8 + 2×2=4 + 2×2=4
    name: 'PYRAMID',
    specs: [
      { c0:1, c1:10, r0:0, r1:7, l:0 },
      { c0:2, c1:9,  r0:2, r1:5, l:1 },
      { c0:4, c1:7,  r0:2, r1:5, l:2 },
      { c0:4, c1:7,  r0:3, r1:4, l:3 },
      { c0:5, c1:6,  r0:3, r1:4, l:4 },
      { c0:5, c1:6,  r0:3, r1:4, l:5 },
    ],
  },
  {
    // L0: left tower 4×8=32 + right tower 4×8=32 + bridge base 4×4=16 = 80
    // L1: left inner 2×4=8 + right inner 2×4=8 + arch 4×2=8 = 24
    // L2: 8×2=16 + L3: 6×2=12 + L4: 4×2=8 + L5: 2×2=4
    name: 'BRIDGE',
    specs: [
      { c0:0, c1:3,  r0:0, r1:7, l:0 },
      { c0:8, c1:11, r0:0, r1:7, l:0 },
      { c0:4, c1:7,  r0:4, r1:7, l:0 },
      { c0:1, c1:2,  r0:2, r1:5, l:1 },
      { c0:9, c1:10, r0:2, r1:5, l:1 },
      { c0:4, c1:7,  r0:3, r1:4, l:1 },
      { c0:2, c1:9,  r0:3, r1:4, l:2 },
      { c0:3, c1:8,  r0:3, r1:4, l:3 },
      { c0:4, c1:7,  r0:3, r1:4, l:4 },
      { c0:5, c1:6,  r0:3, r1:4, l:5 },
    ],
  },
  {
    // 10×7=70 + 8×4=32 + 6×3=18 + 4×2=8 + 4×2=8 + 2×2=4 + 2×2=4
    name: 'DIAMOND',
    specs: [
      { c0:1, c1:10, r0:0, r1:6, l:0 },
      { c0:2, c1:9,  r0:2, r1:5, l:1 },
      { c0:3, c1:8,  r0:2, r1:4, l:2 },
      { c0:4, c1:7,  r0:3, r1:4, l:3 },
      { c0:4, c1:7,  r0:3, r1:4, l:4 },
      { c0:5, c1:6,  r0:3, r1:4, l:5 },
      { c0:5, c1:6,  r0:3, r1:4, l:6 },
    ],
  },
  {
    // L0: H-bar 12×4=48 + V-bar top 4×2=8 + V-bar bottom 4×2=8 = 64
    // L1: H 10×2=20 + V top 2×2=4 + V bottom 2×2=4 = 28
    // L2: H 8×2=16 + V top 2×1=2 + V bottom 2×1=2 = 20
    // L3: 6×2=12 + L4: 4×2=8 + L5: 2×2=4 + L6: 2×2=4 + L7: 2×2=4
    name: 'CROSS',
    specs: [
      { c0:0, c1:11, r0:2, r1:5, l:0 },
      { c0:4, c1:7,  r0:0, r1:1, l:0 },
      { c0:4, c1:7,  r0:6, r1:7, l:0 },
      { c0:1, c1:10, r0:3, r1:4, l:1 },
      { c0:5, c1:6,  r0:1, r1:2, l:1 },
      { c0:5, c1:6,  r0:5, r1:6, l:1 },
      { c0:2, c1:9,  r0:3, r1:4, l:2 },
      { c0:5, c1:6,  r0:2, r1:2, l:2 },
      { c0:5, c1:6,  r0:5, r1:5, l:2 },
      { c0:3, c1:8,  r0:3, r1:4, l:3 },
      { c0:4, c1:7,  r0:3, r1:4, l:4 },
      { c0:5, c1:6,  r0:3, r1:4, l:5 },
      { c0:5, c1:6,  r0:3, r1:4, l:6 },
      { c0:5, c1:6,  r0:3, r1:4, l:7 },
    ],
  },
  {
    // 12×8=96 + 8×4=32 + 4×2=8 + 2×2=4 + 2×2=4
    name: 'WIDE',
    specs: [
      { c0:0, c1:11, r0:0, r1:7, l:0 },
      { c0:2, c1:9,  r0:2, r1:5, l:1 },
      { c0:4, c1:7,  r0:3, r1:4, l:2 },
      { c0:5, c1:6,  r0:3, r1:4, l:3 },
      { c0:5, c1:6,  r0:3, r1:4, l:4 },
    ],
  },
  {
    // Outer wall ring + inner courtyard + stacked center
    // L0: border top(12)+bottom(12)+left(6)+right(6) + inner 10×6=60 = 96
    // L1: 8×4=32 + L2: 4×2=8 + L3: 2×2=4 + L4: 2×2=4
    name: 'FORTRESS',
    specs: [
      { c0:0,  c1:11, r0:0, r1:0, l:0 },
      { c0:0,  c1:11, r0:7, r1:7, l:0 },
      { c0:0,  c1:0,  r0:1, r1:6, l:0 },
      { c0:11, c1:11, r0:1, r1:6, l:0 },
      { c0:1,  c1:10, r0:1, r1:6, l:0 },
      { c0:2,  c1:9,  r0:2, r1:5, l:1 },
      { c0:4,  c1:7,  r0:3, r1:4, l:2 },
      { c0:5,  c1:6,  r0:3, r1:4, l:3 },
      { c0:5,  c1:6,  r0:3, r1:4, l:4 },
    ],
  },
  {
    // Two side towers + center body + stacked peak
    // L0: left wing 2×8=16 + right wing 2×8=16 + center 8×6=48 = 80
    // L1: 8×4=32 + L2: 6×2=12 + L3: 4×2=8 + L4: 2×2=4 + L5: 2×2=4 + L6: 2×2=4
    name: 'CASTLE',
    specs: [
      { c0:0,  c1:1,  r0:0, r1:7, l:0 },
      { c0:10, c1:11, r0:0, r1:7, l:0 },
      { c0:2,  c1:9,  r0:1, r1:6, l:0 },
      { c0:2,  c1:9,  r0:2, r1:5, l:1 },
      { c0:3,  c1:8,  r0:3, r1:4, l:2 },
      { c0:4,  c1:7,  r0:3, r1:4, l:3 },
      { c0:5,  c1:6,  r0:3, r1:4, l:4 },
      { c0:5,  c1:6,  r0:3, r1:4, l:5 },
      { c0:5,  c1:6,  r0:3, r1:4, l:6 },
    ],
  },
  {
    // Three horizontal offset bands (no row overlaps) + center stack
    // L0: top-left 12×4=48 + bottom-right 12×2=24 + mid-left 4×2=8 = 80
    // L1: mid-right 8×2=16 + upper-center 8×2=16 = 32
    // L2: 6×2=12 + L3: 4×2=8 + L4: 2×2=4 + L5: 2×2=4 + L6: 2×2=4
    name: 'ZIGZAG',
    specs: [
      { c0:0, c1:11, r0:0, r1:3, l:0 },
      { c0:0, c1:11, r0:6, r1:7, l:0 },
      { c0:0, c1:3,  r0:4, r1:5, l:0 },
      { c0:4, c1:11, r0:4, r1:5, l:1 },
      { c0:2, c1:9,  r0:2, r1:3, l:1 },
      { c0:3, c1:8,  r0:3, r1:4, l:2 },
      { c0:4, c1:7,  r0:3, r1:4, l:3 },
      { c0:5, c1:6,  r0:3, r1:4, l:4 },
      { c0:5, c1:6,  r0:3, r1:4, l:5 },
      { c0:5, c1:6,  r0:3, r1:4, l:6 },
    ],
  },
  {
    // Full-width horizontal body + tapering spine
    // L0: 12×7=84 + L1: 8×4=32 + L2: 6×2=12 + L3: 4×2=8 + L4: 2×2=4 + L5: 2×2=4
    name: 'DRAGON',
    specs: [
      { c0:0, c1:11, r0:1, r1:7, l:0 },
      { c0:2, c1:9,  r0:2, r1:5, l:1 },
      { c0:3, c1:8,  r0:3, r1:4, l:2 },
      { c0:4, c1:7,  r0:3, r1:4, l:3 },
      { c0:5, c1:6,  r0:3, r1:4, l:4 },
      { c0:5, c1:6,  r0:3, r1:4, l:5 },
    ],
  },
  {
    // Wide top + narrow waist + wide bottom
    // L0: top strip 12×3=36 + waist 6×2=12 + bottom strip 12×3=36 = 84
    // L1: 8×4=32 + L2: 6×2=12 + L3: 4×2=8 + L4: 2×2=4 + L5: 2×2=4
    name: 'HOURGLASS',
    specs: [
      { c0:0, c1:11, r0:0, r1:2, l:0 },
      { c0:3, c1:8,  r0:3, r1:4, l:0 },
      { c0:0, c1:11, r0:5, r1:7, l:0 },
      { c0:2, c1:9,  r0:2, r1:5, l:1 },
      { c0:3, c1:8,  r0:3, r1:4, l:2 },
      { c0:4, c1:7,  r0:3, r1:4, l:3 },
      { c0:5, c1:6,  r0:3, r1:4, l:4 },
      { c0:5, c1:6,  r0:3, r1:4, l:5 },
    ],
  },
  {
    // Offset staircase: base + offset layers
    // L0: 10×8=80 + L1: 8×4=32 + L2: 4×4=16 + L3: 2×4=8 + L4: 2×2=4 + L5: 2×2=4
    name: 'STAIRS',
    specs: [
      { c0:1, c1:10, r0:0, r1:7, l:0 },
      { c0:2, c1:9,  r0:2, r1:5, l:1 },
      { c0:4, c1:7,  r0:2, r1:5, l:2 },
      { c0:5, c1:6,  r0:2, r1:5, l:3 },
      { c0:5, c1:6,  r0:3, r1:4, l:4 },
      { c0:5, c1:6,  r0:3, r1:4, l:5 },
    ],
  },
];

export const LAYOUTS: Layout[] = LAYOUT_SPECS.map((spec) => ({
  name: spec.name,
  build: () => build(spec.specs),
}));

// ---- Speed Mode layouts (72 tiles = 36 pairs) ----
// Shallower, fewer layers → more free tiles visible at once

const SPEED_LAYOUT_SPECS: Array<{ name: string; specs: Spec[] }> = [
  {
    // 9×6=54 + 7×2=14 + 2×2=4 = 72
    name: 'FLAT',
    specs: [
      { c0:0, c1:8, r0:0, r1:5, l:0 },
      { c0:1, c1:7, r0:2, r1:3, l:1 },
      { c0:3, c1:4, r0:2, r1:3, l:2 },
    ],
  },
  {
    // 12×4=48 + 8×2=16 + 4×2=8 = 72
    name: 'WIDE',
    specs: [
      { c0:0, c1:11, r0:0, r1:3, l:0 },
      { c0:2, c1:9,  r0:1, r1:2, l:1 },
      { c0:4, c1:7,  r0:1, r1:2, l:2 },
    ],
  },
  {
    // 8×8=64 + 4×2=8 = 72
    name: 'SQUARE',
    specs: [
      { c0:2, c1:9, r0:0, r1:7, l:0 },
      { c0:4, c1:7, r0:3, r1:4, l:1 },
    ],
  },
  {
    // 8×6=48 + 6×4=24 = 72
    name: 'STEPS',
    specs: [
      { c0:2, c1:9, r0:1, r1:6, l:0 },
      { c0:3, c1:8, r0:2, r1:5, l:1 },
    ],
  },
  {
    // Cross: L0:36 + L1:28 + L2:4 + L3:4 = 72
    name: 'CROSS',
    specs: [
      { c0:0, c1:11, r0:3, r1:4, l:0 },
      { c0:5, c1:6,  r0:0, r1:2, l:0 },
      { c0:5, c1:6,  r0:5, r1:7, l:0 },
      { c0:1, c1:10, r0:3, r1:4, l:1 },
      { c0:5, c1:6,  r0:1, r1:2, l:1 },
      { c0:5, c1:6,  r0:5, r1:6, l:1 },
      { c0:5, c1:6,  r0:3, r1:4, l:2 },
      { c0:5, c1:6,  r0:3, r1:4, l:3 },
    ],
  },
];

export const SPEED_LAYOUTS: Layout[] = SPEED_LAYOUT_SPECS.map((spec) => ({
  name: spec.name,
  build: () => build(spec.specs),
}));

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export type GameMode = 'normal' | 'speed';

export function dealNewGame(options?: { mode?: GameMode; layoutIndex?: number }): {
  tiles: GameTile[];
  layoutName: string;
  totalPairs: number;
} {
  const mode = options?.mode ?? 'normal';
  const allLayouts = mode === 'speed' ? SPEED_LAYOUTS : LAYOUTS;
  const idx =
    options?.layoutIndex !== undefined
      ? options.layoutIndex % allLayouts.length
      : Math.floor(Math.random() * allLayouts.length);

  const layout = allLayouts[idx];
  const positions = layout.build();

  // Normal: 34×4 + 4 flowers + 4 seasons = 144
  // Speed:  34×2 + 2 flowers + 2 seasons = 72
  const copies = mode === 'speed' ? 2 : 4;
  const bonusCount = mode === 'speed' ? 2 : 4;

  const typeIds: string[] = [];
  for (const t of REGULAR_TILES) for (let k = 0; k < copies; k++) typeIds.push(t.id);
  for (let i = 0; i < bonusCount; i++) typeIds.push(FLOWER_TILES[i].id);
  for (let i = 0; i < bonusCount; i++) typeIds.push(SEASON_TILES[i].id);

  const shuffledTypes = shuffle(typeIds);

  return {
    tiles: positions.map((pos, i) => ({
      uid: i,
      ...pos,
      typeId: shuffledTypes[i],
      removed: false,
      matchAnimating: false,
    })),
    layoutName: layout.name,
    totalPairs: positions.length / 2,
  };
}

// ---- Free tile check ----
// A tile is free if: (1) not covered from above, (2) has at least one open horizontal side
export function isFreeTile(tile: GameTile, tiles: GameTile[]): boolean {
  if (tile.removed) return false;

  const active = tiles.filter((t) => !t.removed && t.uid !== tile.uid);

  const covered = active.some(
    (t) => t.layer === tile.layer + 1 && t.col === tile.col && t.row === tile.row
  );
  if (covered) return false;

  const hasLeft = active.some(
    (t) => t.layer === tile.layer && t.col === tile.col - 1 && t.row === tile.row
  );
  const hasRight = active.some(
    (t) => t.layer === tile.layer && t.col === tile.col + 1 && t.row === tile.row
  );

  return !hasLeft || !hasRight;
}

export function isTileCovered(tile: GameTile, tiles: GameTile[]): boolean {
  return tiles.some(
    (t) => !t.removed && t.uid !== tile.uid &&
      t.layer === tile.layer + 1 && t.col === tile.col && t.row === tile.row
  );
}

export function getBlockingTileUids(tile: GameTile, tiles: GameTile[]): number[] {
  const active = tiles.filter((t) => !t.removed && t.uid !== tile.uid);
  const cover = active.find(
    (t) => t.layer === tile.layer + 1 && t.col === tile.col && t.row === tile.row
  );
  if (cover) return [cover.uid];
  const left  = active.find((t) => t.layer === tile.layer && t.col === tile.col - 1 && t.row === tile.row);
  const right = active.find((t) => t.layer === tile.layer && t.col === tile.col + 1 && t.row === tile.row);
  return [left?.uid, right?.uid].filter((u): u is number => u !== undefined);
}

export function canMatch(a: GameTile, b: GameTile): boolean {
  if (a.uid === b.uid) return false;
  const infoA = ALL_TILE_INFO.get(a.typeId);
  const infoB = ALL_TILE_INFO.get(b.typeId);
  if (!infoA || !infoB) return false;
  return infoA.matchGroup === infoB.matchGroup;
}

export function findHint(tiles: GameTile[]): [GameTile, GameTile] | null {
  const free = tiles.filter((t) => !t.removed && isFreeTile(t, tiles));
  for (let i = 0; i < free.length; i++)
    for (let j = i + 1; j < free.length; j++)
      if (canMatch(free[i], free[j])) return [free[i], free[j]];
  return null;
}

export function isWon(tiles: GameTile[]): boolean {
  return tiles.every((t) => t.removed);
}

export function isDeadlocked(tiles: GameTile[]): boolean {
  return findHint(tiles) === null && !isWon(tiles);
}

export function reshuffleTiles(tiles: GameTile[]): GameTile[] {
  const remaining = tiles.filter((t) => !t.removed);
  const typeIds = shuffle(remaining.map((t) => t.typeId));
  let idx = 0;
  return tiles.map((t) => {
    if (t.removed) return t;
    return { ...t, typeId: typeIds[idx++] };
  });
}

// ---- Rendering constants ----
export const TILE_W = 38;
export const TILE_H = 52;
export const LAYER_DX = 6;   // rightward shift per layer (diagonal 3D effect)
export const LAYER_DY = 12;  // upward shift per layer
const LAYER_TOP = 7;

export function tilePixelPos(tile: GameTile): { x: number; y: number; z: number } {
  return {
    x: tile.col * TILE_W + tile.layer * LAYER_DX,
    y: tile.row * TILE_H - tile.layer * LAYER_DY + LAYER_TOP * LAYER_DY,
    z: tile.layer * 10 + (tile.col + tile.row * 0.1),
  };
}

// Accommodate widest layout (cols 0-11) + layer diagonal offset + tile width
export const BOARD_W = 12 * TILE_W + LAYER_TOP * LAYER_DX + TILE_W;
export const BOARD_H = 8 * TILE_H + LAYER_TOP * LAYER_DY + TILE_H;

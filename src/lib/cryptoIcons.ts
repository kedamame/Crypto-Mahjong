// CoinGecko small image URLs for each token tile type.
// Tile.tsx uses these with an onError fallback to the letter symbol.
export const CRYPTO_ICON_URLS: Record<string, string> = {
  // L1 Chains
  BTC:    'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
  ETH:    'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
  SOL:    'https://assets.coingecko.com/coins/images/4128/small/solana.png',
  BNB:    'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png',
  AVAX:   'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png',
  DOT:    'https://assets.coingecko.com/coins/images/12171/small/polkadot.png',
  ATOM:   'https://assets.coingecko.com/coins/images/1481/small/cosmos_hub.png',
  NEAR:   'https://assets.coingecko.com/coins/images/10365/small/near.jpg',
  FTM:    'https://assets.coingecko.com/coins/images/4001/small/Fantom_round.png',
  // DeFi
  UNI:    'https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png',
  AAVE:   'https://assets.coingecko.com/coins/images/12645/small/AAVE.png',
  MKR:    'https://assets.coingecko.com/coins/images/1364/small/Mark_Maker.png',
  CRV:    'https://assets.coingecko.com/coins/images/12124/small/Curve.png',
  COMP:   'https://assets.coingecko.com/coins/images/10775/small/COMP.png',
  YFI:    'https://assets.coingecko.com/coins/images/11849/small/yearn.jpg',
  SUSHI:  'https://assets.coingecko.com/coins/images/12271/small/512x512_Logo_no_chop.png',
  BAL:    'https://assets.coingecko.com/coins/images/11683/small/Balancer.png',
  LDO:    'https://assets.coingecko.com/coins/images/13573/small/Lido_DAO.png',
  // L2 / Base ecosystem
  ARB:    'https://assets.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg',
  OP:     'https://assets.coingecko.com/coins/images/25244/small/Optimism.png',
  BASE:   'https://assets.coingecko.com/coins/images/31158/small/base-symbol-blue.png',
  ZK:     'https://assets.coingecko.com/coins/images/32659/small/zksync.jpg',
  IMX:    'https://assets.coingecko.com/coins/images/17233/small/imx.png',
  SCROLL: 'https://assets.coingecko.com/coins/images/33386/small/scrollfavicon.png',
  STRK:   'https://assets.coingecko.com/coins/images/26433/small/starknet.png',
  BLAST:  'https://assets.coingecko.com/coins/images/35494/small/blast.png',
  MANTA:  'https://assets.coingecko.com/coins/images/34289/small/manta.jpg',
  // Farcaster / Base ecosystem
  DEGEN:  'https://assets.coingecko.com/coins/images/36814/small/DEGEN.png',
  HIGHER: 'https://assets.coingecko.com/coins/images/36936/small/2048.jpg',
  MATIC:  'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png',
  LINK:   'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png',
  // Stablecoins / Wrapped
  USDC:   'https://assets.coingecko.com/coins/images/6319/small/usdc.png',
  USDT:   'https://assets.coingecko.com/coins/images/325/small/Tether.png',
  WBTC:   'https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png',
};

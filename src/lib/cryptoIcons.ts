// CoinGecko small image URLs — all tokens in this map have confirmed stable icons.
// Tile.tsx uses these with an onError fallback to the letter symbol.
export const CRYPTO_ICON_URLS: Record<string, string> = {
  // L1 Major Chains
  BTC:   'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
  ETH:   'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
  SOL:   'https://assets.coingecko.com/coins/images/4128/small/solana.png',
  BNB:   'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png',
  XRP:   'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png',
  ADA:   'https://assets.coingecko.com/coins/images/975/small/cardano.png',
  AVAX:  'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png',
  DOT:   'https://assets.coingecko.com/coins/images/12171/small/polkadot.png',
  LTC:   'https://assets.coingecko.com/coins/images/2/small/litecoin.png',
  // DeFi
  UNI:   'https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png',
  AAVE:  'https://assets.coingecko.com/coins/images/12645/small/AAVE.png',
  MKR:   'https://assets.coingecko.com/coins/images/1364/small/Mark_Maker.png',
  CRV:   'https://assets.coingecko.com/coins/images/12124/small/Curve.png',
  COMP:  'https://assets.coingecko.com/coins/images/10775/small/COMP.png',
  YFI:   'https://assets.coingecko.com/coins/images/11849/small/yearn.jpg',
  SUSHI: 'https://assets.coingecko.com/coins/images/12271/small/512x512_Logo_no_chop.png',
  BAL:   'https://assets.coingecko.com/coins/images/11683/small/Balancer.png',
  LDO:   'https://assets.coingecko.com/coins/images/13573/small/Lido_DAO.png',
  // Alt Chains / L2
  ARB:   'https://assets.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg',
  OP:    'https://assets.coingecko.com/coins/images/25244/small/Optimism.png',
  IMX:   'https://assets.coingecko.com/coins/images/17233/small/imx.png',
  MATIC: 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png',
  APT:   'https://assets.coingecko.com/coins/images/26076/small/aptos_round.png',
  SUI:   'https://assets.coingecko.com/coins/images/26375/small/sui_asset.jpeg',
  NEAR:  'https://assets.coingecko.com/coins/images/10365/small/near.jpg',
  ATOM:  'https://assets.coingecko.com/coins/images/1481/small/cosmos_hub.png',
  FTM:   'https://assets.coingecko.com/coins/images/4001/small/Fantom_round.png',
  // Infra / Protocol
  LINK:  'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png',
  GRT:   'https://assets.coingecko.com/coins/images/13397/small/Graph_Token.png',
  SNX:   'https://assets.coingecko.com/coins/images/3406/small/SNX.png',
  XLM:   'https://assets.coingecko.com/coins/images/100/small/Stellar_symbol_black_RGB.png',
  // Stablecoins / Wrapped
  USDC:  'https://assets.coingecko.com/coins/images/6319/small/usdc.png',
  USDT:  'https://assets.coingecko.com/coins/images/325/small/Tether.png',
  WBTC:  'https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png',
};

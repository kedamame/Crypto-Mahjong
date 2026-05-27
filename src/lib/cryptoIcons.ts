// Trust Wallet Assets via jsDelivr CDN — reliable, no rate limits
// Pattern: chain/info/logo.png  or  ethereum/assets/{address}/logo.png
const TW = 'https://cdn.jsdelivr.net/gh/trustwallet/assets@master/blockchains';
const ETH = `${TW}/ethereum/assets`;

export const CRYPTO_ICON_URLS: Record<string, string> = {
  // L1 Major Chains
  BTC:   `${TW}/bitcoin/info/logo.png`,
  ETH:   `${TW}/ethereum/info/logo.png`,
  SOL:   `${TW}/solana/info/logo.png`,
  BNB:   `${TW}/smartchain/info/logo.png`,
  XRP:   `${TW}/ripple/info/logo.png`,
  ADA:   `${TW}/cardano/info/logo.png`,
  AVAX:  `${TW}/avalanchec/info/logo.png`,
  DOT:   `${TW}/polkadot/info/logo.png`,
  LTC:   `${TW}/litecoin/info/logo.png`,
  // DeFi (ERC-20 on Ethereum)
  UNI:   `${ETH}/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png`,
  AAVE:  `${ETH}/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9/logo.png`,
  MKR:   `${ETH}/0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2/logo.png`,
  CRV:   `${ETH}/0xD533a949740bb3306d119CC777fa900bA034cd52/logo.png`,
  COMP:  `${ETH}/0xc00e94Cb662C3520282E6f5717214004A7f26888/logo.png`,
  YFI:   `${ETH}/0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e/logo.png`,
  SUSHI: `${ETH}/0x6B3595068778DD592e39A122f4f5a5cF09C90fE2/logo.png`,
  BAL:   `${ETH}/0xba100000625a3754423978a60c9317c58a424e3D/logo.png`,
  LDO:   `${ETH}/0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32/logo.png`,
  // Alt Chains / L2
  ARB:   `${TW}/arbitrum/info/logo.png`,
  OP:    `${TW}/optimism/info/logo.png`,
  IMX:   `${ETH}/0xF57e7e7C23978C3cAEC3C3548E3D615c346e79fF/logo.png`,
  MATIC: `${TW}/polygon/info/logo.png`,
  APT:   `${TW}/aptos/info/logo.png`,
  SUI:   `${TW}/sui/info/logo.png`,
  NEAR:  `${TW}/near/info/logo.png`,
  ATOM:  `${TW}/cosmos/info/logo.png`,
  FTM:   `${TW}/fantom/info/logo.png`,
  // Infra / Protocol
  LINK:  `${ETH}/0x514910771AF9Ca656af840dff83E8264EcF986CA/logo.png`,
  GRT:   `${ETH}/0xc944E90C64B2c07662A292be6244BDf05Cda44a7/logo.png`,
  SNX:   `${ETH}/0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F/logo.png`,
  XLM:   `${TW}/stellar/info/logo.png`,
  // Stablecoins / Wrapped
  USDC:  `${ETH}/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png`,
  USDT:  `${ETH}/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png`,
  WBTC:  `${ETH}/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png`,
};

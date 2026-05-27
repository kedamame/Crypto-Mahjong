import type { Hex } from 'viem';

export const MAHJONG_CONTRACT_ADDRESS = (
  process.env.NEXT_PUBLIC_MAHJONG_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000'
) as Hex;

export const isContractConfigured =
  !!process.env.NEXT_PUBLIC_MAHJONG_CONTRACT_ADDRESS &&
  process.env.NEXT_PUBLIC_MAHJONG_CONTRACT_ADDRESS !== '0x0000000000000000000000000000000000000000';

export const MAHJONG_ABI = [
  {
    name: 'recordClear',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'shuffleCount', type: 'uint256' }],
    outputs: [],
  },
  {
    name: 'clearCount',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'player', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'totalShuffles',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'player', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'ClearRecorded',
    type: 'event',
    inputs: [
      { name: 'player',           type: 'address', indexed: true  },
      { name: 'totalClears',      type: 'uint256', indexed: false },
      { name: 'shufflesThisGame', type: 'uint256', indexed: false },
    ],
  },
] as const;

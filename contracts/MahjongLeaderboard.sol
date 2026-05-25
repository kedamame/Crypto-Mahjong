// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * MahjongLeaderboard — deployed on Base Mainnet
 *
 * Deploy via Remix (remix.ethereum.org):
 *   1. Paste this file, compile with Solidity 0.8.19
 *   2. Deploy with Injected Provider (MetaMask on Base Mainnet)
 *   3. Copy deployed address to NEXT_PUBLIC_MAHJONG_CONTRACT_ADDRESS in .env.local
 *
 * Each player calls recordClear() after clearing the board.
 * The contract increments their personal clear count.
 * Scores are self-reported; no on-chain game verification.
 */
contract MahjongLeaderboard {
    mapping(address => uint256) public clearCount;
    address[] private _players;

    event ClearRecorded(address indexed player, uint256 totalClears);

    function recordClear() external {
        if (clearCount[msg.sender] == 0) {
            _players.push(msg.sender);
        }
        clearCount[msg.sender]++;
        emit ClearRecorded(msg.sender, clearCount[msg.sender]);
    }

    function getPlayerCount() external view returns (uint256) {
        return _players.length;
    }

    function getPlayers() external view returns (address[] memory) {
        return _players;
    }
}

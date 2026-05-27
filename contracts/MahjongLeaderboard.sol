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
 * Each player calls recordClear(shuffleCount) after clearing the board.
 * The contract increments their personal clear count and cumulative shuffle count.
 * Scores are self-reported; no on-chain game verification.
 */
contract MahjongLeaderboard {
    mapping(address => uint256) public clearCount;
    mapping(address => uint256) public totalShuffles;
    address[] private _players;

    event ClearRecorded(
        address indexed player,
        uint256 totalClears,
        uint256 shufflesThisGame
    );

    function recordClear(uint256 shuffleCount) external {
        if (clearCount[msg.sender] == 0) {
            _players.push(msg.sender);
        }
        clearCount[msg.sender]++;
        totalShuffles[msg.sender] += shuffleCount;
        emit ClearRecorded(msg.sender, clearCount[msg.sender], shuffleCount);
    }

    function getPlayerCount() external view returns (uint256) {
        return _players.length;
    }

    function getPlayers() external view returns (address[] memory) {
        return _players;
    }
}

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import {
  dealNewGame,
  isFreeTile,
  canMatch,
  findHint,
  isWon,
  isDeadlocked,
  reshuffleTiles,
  GameTile,
  BOARD_W,
  BOARD_H,
} from '@/lib/mahjong';
import { Board } from './Board';
import { WinModal } from './WinModal';
import { useFarcasterMiniApp } from '@/lib/farcaster';
import { MAHJONG_CONTRACT_ADDRESS, MAHJONG_ABI, isContractConfigured } from '@/lib/contract';

export function MahjongGame() {
  const [tiles, setTiles] = useState<GameTile[]>([]);
  const [layoutName, setLayoutName] = useState('');
  const [selectedUid, setSelectedUid] = useState<number | null>(null);
  const [hintedUids, setHintedUids] = useState<Set<number>>(new Set());
  const [pairsMatched, setPairsMatched] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [won, setWon] = useState(false);
  const [deadlocked, setDeadlocked] = useState(false);
  const [finalElapsed, setFinalElapsed] = useState(0);
  const [clearRecorded, setClearRecorded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { address } = useAccount();
  useFarcasterMiniApp();

  const { data: clearCountData, refetch: refetchClearCount } = useReadContract({
    address: MAHJONG_CONTRACT_ADDRESS,
    abi: MAHJONG_ABI,
    functionName: 'clearCount',
    args: address ? [address] : undefined,
    query: { enabled: isContractConfigured && !!address },
  });
  const clearCount = clearCountData !== undefined ? Number(clearCountData) : null;

  // --- Timer ---
  useEffect(() => {
    if (won || tiles.length === 0) return;
    timerRef.current = setInterval(() => {
      setElapsedSec(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [won, tiles.length, startTime]);

  // --- New game ---
  const startNewGame = useCallback(() => {
    const { tiles: newTiles, layoutName: newLayout } = dealNewGame();
    setTiles(newTiles);
    setLayoutName(newLayout);
    setSelectedUid(null);
    setHintedUids(new Set());
    setPairsMatched(0);
    setElapsedSec(0);
    setStartTime(Date.now());
    setWon(false);
    setDeadlocked(false);
    setFinalElapsed(0);
    setClearRecorded(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  // --- Tile click handler ---
  function handleTileClick(tile: GameTile) {
    if (won || tile.removed) return;
    if (!isFreeTile(tile, tiles)) return;

    setHintedUids(new Set());

    if (selectedUid === null) {
      setSelectedUid(tile.uid);
      return;
    }

    if (selectedUid === tile.uid) {
      setSelectedUid(null);
      return;
    }

    const selected = tiles.find((t) => t.uid === selectedUid);
    if (!selected) {
      setSelectedUid(tile.uid);
      return;
    }

    if (canMatch(selected, tile)) {
      const newTiles = tiles.map((t) =>
        t.uid === selected.uid || t.uid === tile.uid ? { ...t, removed: true } : t
      );
      const newPairs = pairsMatched + 1;
      setTiles(newTiles);
      setSelectedUid(null);
      setPairsMatched(newPairs);

      if (isWon(newTiles)) {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        setFinalElapsed(elapsed);
        setWon(true);
        if (timerRef.current) clearInterval(timerRef.current);
      } else if (isDeadlocked(newTiles)) {
        setDeadlocked(true);
      }
    } else {
      setSelectedUid(tile.uid);
    }
  }

  // --- Hint ---
  const hintTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  function handleHint() {
    const pair = findHint(tiles);
    if (pair) {
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
      setHintedUids(new Set([pair[0].uid, pair[1].uid]));
      hintTimerRef.current = setTimeout(() => setHintedUids(new Set()), 2000);
    }
  }

  // --- Reshuffle ---
  function handleReshuffle() {
    const newTiles = reshuffleTiles(tiles);
    setTiles(newTiles);
    setSelectedUid(null);
    setHintedUids(new Set());
    setDeadlocked(false);
  }

  // --- Scale to fit viewport ---
  const [scale, setScale] = useState(1);
  useEffect(() => {
    function updateScale() {
      setScale(Math.min(1, (window.innerWidth - 16) / BOARD_W, (window.innerHeight - 160) / BOARD_H));
    }
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const remaining = tiles.filter((t) => !t.removed).length;
  const totalPairs = 72;

  return (
    <div
      style={{
        minHeight: '100dvh',
        backgroundColor: '#ede9df',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '12px 8px',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: 10,
        }}
      >
        <div>
          <div style={{ fontSize: 8, letterSpacing: 3, color: '#888880', fontFamily: 'Courier New, monospace' }}>
            CRYPTO
          </div>
          <div style={{ fontSize: 24, fontWeight: 900, lineHeight: 1, color: '#141410', fontFamily: 'Courier New, monospace' }}>
            MAHJONG
          </div>
          {layoutName && (
            <div style={{ fontSize: 7, letterSpacing: 2, color: '#3558c8', fontFamily: 'Courier New, monospace', marginTop: 2 }}>
              {layoutName}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 8, letterSpacing: 2, color: '#888880', fontFamily: 'Courier New, monospace' }}>PAIRS</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#3558c8', fontFamily: 'Courier New, monospace' }}>
              {pairsMatched}
              <span style={{ fontSize: 9, color: '#888880', fontWeight: 400 }}>/{totalPairs}</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 8, letterSpacing: 2, color: '#888880', fontFamily: 'Courier New, monospace' }}>TIME</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#141410', fontFamily: 'Courier New, monospace' }}>
              {Math.floor(elapsedSec / 60).toString().padStart(2, '0')}:{(elapsedSec % 60).toString().padStart(2, '0')}
            </div>
          </div>
          {clearCount !== null && (
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 8, letterSpacing: 2, color: '#888880', fontFamily: 'Courier New, monospace' }}>CLEARS</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: '#1a7a4a', fontFamily: 'Courier New, monospace' }}>{clearCount}</div>
            </div>
          )}
        </div>
      </div>

      {/* Deadlock banner */}
      {deadlocked && !won && (
        <div
          style={{
            width: '100%',
            maxWidth: 420,
            backgroundColor: '#c44a1a',
            color: '#ede9df',
            padding: '8px 12px',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 2,
            fontFamily: 'Courier New, monospace',
            marginBottom: 8,
            textAlign: 'center',
          }}
        >
          NO MORE MOVES - RESHUFFLE?
        </div>
      )}

      {/* Board */}
      <div
        style={{
          position: 'relative',
          transformOrigin: 'top center',
          transform: `scale(${scale})`,
          marginBottom: scale < 1 ? `${BOARD_H * (scale - 1)}px` : 0,
        }}
      >
        <Board
          tiles={tiles}
          selectedUid={selectedUid}
          hintedUids={hintedUids}
          onTileClick={handleTileClick}
        />
      </div>

      {/* Controls */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          marginTop: 12,
          width: '100%',
          maxWidth: 420,
        }}
      >
        {[
          { label: 'HINT',    action: handleHint,      color: '#1a7a4a' },
          { label: 'SHUFFLE', action: handleReshuffle,  color: '#888880' },
          { label: 'NEW',     action: startNewGame,     color: '#141410' },
        ].map((btn) => (
          <button
            key={btn.label}
            onClick={btn.action}
            style={{
              flex: 1,
              padding: '10px 0',
              backgroundColor: 'transparent',
              border: `2px solid ${btn.color}`,
              color: btn.color,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 2,
              fontFamily: 'Courier New, monospace',
              cursor: 'pointer',
            }}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Remaining count */}
      <div
        style={{
          marginTop: 8,
          fontSize: 9,
          color: '#888880',
          fontFamily: 'Courier New, monospace',
          letterSpacing: 1,
        }}
      >
        {remaining} tiles remaining
      </div>

      {won && (
        <WinModal
          elapsedSec={finalElapsed}
          pairsMatched={pairsMatched}
          clearCount={clearCount}
          onNewGame={startNewGame}
          onClearRecorded={() => {
            setClearRecorded(true);
            refetchClearCount();
          }}
        />
      )}
    </div>
  );
}

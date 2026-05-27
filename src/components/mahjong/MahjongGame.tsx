'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import {
  dealNewGame,
  isFreeTile,
  getBlockingTileUids,
  canMatch,
  findHint,
  isWon,
  isDeadlocked,
  reshuffleTiles,
  GameTile,
  GameMode,
  BOARD_W,
  BOARD_H,
} from '@/lib/mahjong';
import { Board } from './Board';
import { WinModal } from './WinModal';
import { useFarcasterMiniApp } from '@/lib/farcaster';
import { MAHJONG_CONTRACT_ADDRESS, MAHJONG_ABI, isContractConfigured } from '@/lib/contract';


export function MahjongGame() {
  const [mode, setMode] = useState<GameMode | null>(null);
  const [tiles, setTiles] = useState<GameTile[]>([]);
  const [layoutName, setLayoutName] = useState('');
  const [totalPairs, setTotalPairs] = useState(72);
  const [selectedUid, setSelectedUid] = useState<number | null>(null);
  const [hintedUids, setHintedUids] = useState<Set<number>>(new Set());
  const [pairsMatched, setPairsMatched] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [won, setWon] = useState(false);
  const [deadlocked, setDeadlocked] = useState(false);
  const [finalElapsed, setFinalElapsed] = useState(0);
  const [shuffleCount, setShuffleCount] = useState(0);
  const [flashingUids, setFlashingUids] = useState<Set<number>>(new Set());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const flashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
  const startNewGame = useCallback((m?: GameMode) => {
    const activeMode = m ?? mode ?? 'normal';
    const result = dealNewGame({ mode: activeMode });
    setTiles(result.tiles);
    setLayoutName(result.layoutName);
    setTotalPairs(result.totalPairs);
    setSelectedUid(null);
    setHintedUids(new Set());
    setPairsMatched(0);
    setElapsedSec(0);
    setStartTime(Date.now());
    setWon(false);
    setDeadlocked(false);
    setFinalElapsed(0);
    setShuffleCount(0);
    if (timerRef.current) clearInterval(timerRef.current);
  }, [mode]);

  function selectMode(m: GameMode) {
    setMode(m);
    startNewGame(m);
  }

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

  // --- Blocked tile feedback ---
  function handleBlockedTileClick(tile: GameTile) {
    const uids = getBlockingTileUids(tile, tiles);
    if (!uids.length) return;
    if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
    setFlashingUids(new Set(uids));
    flashTimerRef.current = setTimeout(() => setFlashingUids(new Set()), 700);
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
    setShuffleCount((c) => c + 1);
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
  }, [mode]);

  const remaining = tiles.filter((t) => !t.removed).length;
  const isSpeed = mode === 'speed';
  const boardW = BOARD_W;
  const boardH = BOARD_H;

  // ---- Mode selection screen ----
  if (mode === null) {
    return (
      <div
        style={{
          minHeight: '100dvh',
          backgroundColor: '#ede9df',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px 20px',
        }}
      >
        <div style={{ fontSize: 9, letterSpacing: 4, color: '#888880', fontFamily: 'Courier New, monospace', marginBottom: 4 }}>
          CRYPTO
        </div>
        <div style={{ fontSize: 36, fontWeight: 900, lineHeight: 1, color: '#141410', fontFamily: 'Courier New, monospace', marginBottom: 4 }}>
          MAHJONG
        </div>
        <div style={{ fontSize: 9, letterSpacing: 3, color: '#3558c8', fontFamily: 'Courier New, monospace', marginBottom: 40 }}>
          SELECT MODE
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%', maxWidth: 300 }}>
          {/* Normal */}
          <button
            onClick={() => selectMode('normal')}
            style={{
              backgroundColor: '#141410',
              border: 'none',
              color: '#ede9df',
              padding: '20px 16px',
              cursor: 'pointer',
              textAlign: 'left',
              boxShadow: '4px 4px 0 #888880',
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 900, fontFamily: 'Courier New, monospace', letterSpacing: 2 }}>
              NORMAL
            </div>
            <div style={{ fontSize: 9, color: '#888880', fontFamily: 'Courier New, monospace', marginTop: 6, letterSpacing: 1 }}>
              144 tiles / 13 layouts / deep stacks
            </div>
          </button>

          {/* Speed */}
          <button
            onClick={() => selectMode('speed')}
            style={{
              backgroundColor: '#3558c8',
              border: 'none',
              color: '#ede9df',
              padding: '20px 16px',
              cursor: 'pointer',
              textAlign: 'left',
              boxShadow: '4px 4px 0 #1a3490',
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 900, fontFamily: 'Courier New, monospace', letterSpacing: 2 }}>
              SPEED
            </div>
            <div style={{ fontSize: 9, color: '#b0c4ff', fontFamily: 'Courier New, monospace', marginTop: 6, letterSpacing: 1 }}>
              72 tiles / 5 layouts / shallow / easy clear
            </div>
          </button>
        </div>
      </div>
    );
  }

  // ---- Game screen ----
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
          maxWidth: boardW,
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
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 2 }}>
            {isSpeed && (
              <div style={{ fontSize: 7, letterSpacing: 2, color: '#ede9df', backgroundColor: '#3558c8', padding: '1px 4px', fontFamily: 'Courier New, monospace', fontWeight: 700 }}>
                SPEED
              </div>
            )}
            {layoutName && (
              <div style={{ fontSize: 7, letterSpacing: 2, color: '#3558c8', fontFamily: 'Courier New, monospace' }}>
                {layoutName}
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
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
            maxWidth: boardW,
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
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
        <div
          style={{
            transformOrigin: 'top center',
            transform: `scale(${scale})`,
            marginBottom: scale < 1 ? `${boardH * (scale - 1)}px` : 0,
          }}
        >
          <Board
            tiles={tiles}
            selectedUid={selectedUid}
            hintedUids={hintedUids}
            flashingUids={flashingUids}
            onTileClick={handleTileClick}
            onBlockedTileClick={handleBlockedTileClick}
          />
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, marginTop: 12, width: '100%', maxWidth: boardW }}>
        {[
          { label: 'HINT',    action: handleHint,               color: '#1a7a4a' },
          { label: 'SHUFFLE', action: handleReshuffle,           color: '#888880' },
          { label: 'NEW',     action: () => startNewGame(),      color: '#141410' },
          { label: 'MODE',    action: () => setMode(null),       color: '#3558c8' },
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
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: 1,
              fontFamily: 'Courier New, monospace',
              cursor: 'pointer',
            }}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Remaining count */}
      <div style={{ marginTop: 8, fontSize: 9, color: '#888880', fontFamily: 'Courier New, monospace', letterSpacing: 1 }}>
        {remaining} tiles remaining
      </div>

      {won && (
        <WinModal
          elapsedSec={finalElapsed}
          pairsMatched={pairsMatched}
          shuffleCount={shuffleCount}
          clearCount={clearCount}
          onNewGame={() => startNewGame()}
          onClearRecorded={() => {
            refetchClearCount();
          }}
        />
      )}
    </div>
  );
}

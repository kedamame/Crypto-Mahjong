'use client';

import { useState, useEffect, useRef } from 'react';
import {
  useAccount, useConnect, useWriteContract,
  useWaitForTransactionReceipt, useChainId, useSwitchChain,
} from 'wagmi';
import { base } from 'wagmi/chains';
import { MAHJONG_CONTRACT_ADDRESS, MAHJONG_ABI, isContractConfigured } from '@/lib/contract';
import { shareOnFarcaster } from '@/lib/farcaster';

interface WinModalProps {
  elapsedSec: number;
  pairsMatched: number;
  shuffleCount: number;
  clearCount: number | null;
  onNewGame: () => void;
  onClearRecorded: () => void;
}

export function WinModal({ elapsedSec, pairsMatched, shuffleCount, clearCount, onNewGame, onClearRecorded }: WinModalProps) {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const chainId = useChainId();
  const { switchChainAsync } = useSwitchChain();
  const { writeContract, data: txHash, isPending: isTxPending, error: txError } = useWriteContract();
  const { isLoading: isTxConfirming, isSuccess: isTxSuccess } =
    useWaitForTransactionReceipt({ hash: txHash });

  const [shared, setShared] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  const notifiedRef = useRef(false);

  const mins = Math.floor(elapsedSec / 60);
  const secs = elapsedSec % 60;
  const timeStr = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;

  // Notify parent exactly once when tx succeeds
  useEffect(() => {
    if (isTxSuccess && !notifiedRef.current) {
      notifiedRef.current = true;
      onClearRecorded();
    }
  }, [isTxSuccess, onClearRecorded]);

  async function handleRecord() {
    // Switch to Base if needed
    if (chainId !== base.id) {
      setIsSwitching(true);
      try {
        await switchChainAsync({ chainId: base.id });
      } catch {
        setIsSwitching(false);
        return; // user rejected the chain switch
      }
      setIsSwitching(false);
    }
    writeContract({
      address: MAHJONG_CONTRACT_ADDRESS,
      abi: MAHJONG_ABI,
      functionName: 'recordClear',
      args: [BigInt(shuffleCount)],
    });
  }

  async function handleShare() {
    const count = clearCount ?? 1;
    await shareOnFarcaster(count, elapsedSec);
    setShared(true);
  }

  const isBusy = isSwitching || isTxPending || isTxConfirming;
  const recordLabel = isSwitching
    ? 'SWITCHING TO BASE...'
    : isTxPending || isTxConfirming
      ? 'RECORDING...'
      : 'RECORD ON BASE';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(20,20,16,0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: 16,
      }}
    >
      <div
        className="fade-in"
        style={{
          backgroundColor: '#ede9df',
          border: '3px solid #141410',
          padding: 28,
          width: '100%',
          maxWidth: 360,
          boxShadow: '6px 6px 0px #141410',
        }}
      >
        {/* Header */}
        <div style={{ fontSize: 11, letterSpacing: 3, color: '#888880', marginBottom: 8, fontFamily: 'Courier New, monospace' }}>
          CLEARED
        </div>

        <div style={{ fontSize: 42, fontWeight: 900, lineHeight: 1, color: '#141410', marginBottom: 4, fontFamily: 'Courier New, monospace' }}>
          WELL<br />PLAYED
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 20, marginTop: 20, marginBottom: 24, flexWrap: 'nowrap' }}>
          <div>
            <div style={{ fontSize: 9, letterSpacing: 2, color: '#888880', fontFamily: 'Courier New, monospace' }}>TIME</div>
            <div style={{ fontSize: 26, fontWeight: 900, color: '#3558c8', fontFamily: 'Courier New, monospace' }}>{timeStr}</div>
          </div>
          <div>
            <div style={{ fontSize: 9, letterSpacing: 2, color: '#888880', fontFamily: 'Courier New, monospace' }}>PAIRS</div>
            <div style={{ fontSize: 26, fontWeight: 900, color: '#141410', fontFamily: 'Courier New, monospace' }}>{pairsMatched}</div>
          </div>
          <div>
            <div style={{ fontSize: 9, letterSpacing: 2, color: '#888880', fontFamily: 'Courier New, monospace' }}>SHUFFLE</div>
            <div style={{ fontSize: 26, fontWeight: 900, color: '#888880', fontFamily: 'Courier New, monospace' }}>{shuffleCount}</div>
          </div>
          {clearCount !== null && (
            <div>
              <div style={{ fontSize: 9, letterSpacing: 2, color: '#888880', fontFamily: 'Courier New, monospace' }}>CLEARS</div>
              <div style={{ fontSize: 26, fontWeight: 900, color: '#1a7a4a', fontFamily: 'Courier New, monospace' }}>{clearCount}</div>
            </div>
          )}
        </div>

        {/* Record on-chain */}
        {isContractConfigured && (
          <div style={{ marginBottom: 12 }}>
            {!isConnected ? (
              <button
                onClick={() => connect({ connector: connectors[0] })}
                style={btnStyle('#141410', '#ede9df')}
              >
                CONNECT WALLET
              </button>
            ) : isTxSuccess ? (
              <div style={{ fontSize: 12, color: '#1a7a4a', fontFamily: 'Courier New, monospace', padding: '8px 0' }}>
                Clear recorded on Base!
              </div>
            ) : (
              <button
                onClick={handleRecord}
                disabled={isBusy}
                style={btnStyle('#3558c8', '#fff')}
              >
                {recordLabel}
              </button>
            )}
            {txError && (
              <div style={{ fontSize: 10, color: '#c44a1a', marginTop: 4, fontFamily: 'Courier New, monospace' }}>
                {txError.message.slice(0, 60)}
              </div>
            )}
          </div>
        )}

        {/* Share */}
        <button
          onClick={handleShare}
          disabled={shared}
          style={btnStyle(shared ? '#888880' : '#141410', '#ede9df')}
        >
          {shared ? 'SHARED!' : 'SHARE ON FARCASTER'}
        </button>

        {/* New game */}
        <button
          onClick={onNewGame}
          style={{ ...btnStyle('transparent', '#141410'), marginTop: 8, border: '2px solid #141410' }}
        >
          NEW GAME
        </button>
      </div>
    </div>
  );
}

function btnStyle(bg: string, color: string): React.CSSProperties {
  return {
    width: '100%',
    padding: '12px 0',
    backgroundColor: bg,
    color,
    border: 'none',
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 2,
    fontFamily: 'Courier New, monospace',
    cursor: 'pointer',
    marginBottom: 8,
    boxShadow: bg !== 'transparent' ? '2px 2px 0 rgba(0,0,0,0.2)' : 'none',
  };
}

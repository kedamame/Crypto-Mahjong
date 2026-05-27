'use client';

import { useState, useCallback } from 'react';
import { GameTile, ALL_TILE_INFO, isFreeTile, BOARD_W, BOARD_H } from '@/lib/mahjong';
import { Tile } from './Tile';

interface BoardProps {
  tiles: GameTile[];
  selectedUid: number | null;
  hintedUids: Set<number>;
  flashingUids: Set<number>;
  onTileClick: (tile: GameTile) => void;
  onBlockedTileClick: (tile: GameTile) => void;
}

export function Board({ tiles, selectedUid, hintedUids, flashingUids, onTileClick, onBlockedTileClick }: BoardProps) {
  // Shared icon-failure state: when ANY tile with typeId X fails, ALL tiles with X show fallback
  const [failedTypeIds, setFailedTypeIds] = useState<Set<string>>(new Set());
  const handleIconFailed = useCallback((typeId: string) => {
    setFailedTypeIds((prev) => {
      if (prev.has(typeId)) return prev;
      const next = new Set(prev);
      next.add(typeId);
      return next;
    });
  }, []);

  const renderOrder = [...tiles].sort((a, b) => {
    if (a.layer !== b.layer) return a.layer - b.layer;
    if (a.row !== b.row) return a.row - b.row;
    return a.col - b.col;
  });

  return (
    <div
      style={{
        position: 'relative',
        width: BOARD_W,
        height: BOARD_H,
        flexShrink: 0,
      }}
    >
      {renderOrder.map((tile) => {
        if (tile.removed) return null;
        const info = ALL_TILE_INFO.get(tile.typeId);
        if (!info) return null;
        const free = isFreeTile(tile, tiles);
        return (
          <Tile
            key={tile.uid}
            tile={tile}
            info={info}
            isFree={free}
            iconFailed={failedTypeIds.has(tile.typeId)}
            onIconFailed={() => handleIconFailed(tile.typeId)}
            isSelected={tile.uid === selectedUid}
            isHinted={hintedUids.has(tile.uid)}
            isFlashing={flashingUids.has(tile.uid)}
            onClick={() => onTileClick(tile)}
            onBlockedClick={() => onBlockedTileClick(tile)}
          />
        );
      })}
    </div>
  );
}

'use client';

import { GameTile, ALL_TILE_INFO, isFreeTile, BOARD_W, BOARD_H } from '@/lib/mahjong';
import { Tile } from './Tile';

interface BoardProps {
  tiles: GameTile[];
  selectedUid: number | null;
  hintedUids: Set<number>;
  onTileClick: (tile: GameTile) => void;
}

export function Board({ tiles, selectedUid, hintedUids, onTileClick }: BoardProps) {
  // Sort tiles for rendering: lower layers first, then by row, then col
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
            isSelected={tile.uid === selectedUid}
            isHinted={hintedUids.has(tile.uid)}
            onClick={() => onTileClick(tile)}
          />
        );
      })}
    </div>
  );
}

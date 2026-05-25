'use client';

import { useState } from 'react';
import { GameTile, TileInfo, TILE_W, TILE_H, tilePixelPos } from '@/lib/mahjong';
import { CRYPTO_ICON_URLS } from '@/lib/cryptoIcons';

interface TileProps {
  tile: GameTile;
  info: TileInfo;
  isFree: boolean;
  isSelected: boolean;
  isHinted: boolean;
  onClick: () => void;
}

const SUIT_ABBR: Record<string, string> = {
  l1:     'L1',
  defi:   'DeFi',
  l2:     'ALT',
  wind:   'INFRA',
  dragon: 'STABLE',
  flower: 'FL',
  season: 'SN',
};

export function Tile({ tile, info, isFree, isSelected, isHinted, onClick }: TileProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const { x, y, z } = tilePixelPos(tile);

  if (tile.removed) return null;

  const suitColor = info.suitColor;
  const shadowColor = isSelected ? '#3558c8' : isHinted ? '#1a7a4a' : '#9a9690';
  const borderColor = isSelected ? '#3558c8' : isHinted ? '#1a7a4a' : '#141410';
  const opacity = isFree ? 1 : 0.3;
  const filter = isFree ? 'none' : 'grayscale(0.7) brightness(0.6)';

  const iconUrl = CRYPTO_ICON_URLS[tile.typeId];
  const showIcon = !!iconUrl && !imgFailed;

  return (
    <div
      onClick={isFree ? onClick : undefined}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: TILE_W - 2,
        height: TILE_H - 2,
        zIndex: Math.round(z * 10),
        cursor: isFree ? 'pointer' : 'default',
        opacity,
        filter,
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {/* 3D shadow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          border: `2px solid ${shadowColor}`,
          transform: 'translate(0px, 4px)',
          backgroundColor: shadowColor,
          opacity: 0.35,
        }}
      />
      {/* Tile body */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: isSelected ? '#dde6ff' : isHinted ? '#d4edd4' : '#f5f0e8',
          border: `2px solid ${borderColor}`,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          transition: 'background-color 0.1s, border-color 0.1s',
        }}
      >
        {/* Suit color stripe */}
        <div style={{ height: 4, backgroundColor: suitColor, flexShrink: 0 }} />

        {/* Main content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 1,
            paddingBottom: 1,
          }}
        >
          {showIcon ? (
            <img
              src={iconUrl}
              width={22}
              height={22}
              onError={() => setImgFailed(true)}
              style={{
                objectFit: 'contain',
                borderRadius: 3,
                display: 'block',
              }}
              alt={info.label}
            />
          ) : (
            <div
              style={{
                fontSize: 15,
                fontWeight: 900,
                color: borderColor,
                lineHeight: 1,
                fontFamily: 'Courier New, monospace',
                letterSpacing: -0.5,
              }}
            >
              {info.symbol}
            </div>
          )}

          {/* Token name */}
          <div
            style={{
              fontSize: info.label.length > 4 ? 6 : 7,
              fontWeight: 700,
              color: '#444440',
              lineHeight: 1.1,
              marginTop: 2,
              fontFamily: 'Courier New, monospace',
              letterSpacing: -0.3,
              textAlign: 'center',
            }}
          >
            {info.label}
          </div>
        </div>

        {/* Bottom suit abbr */}
        <div
          style={{
            fontSize: 5,
            fontWeight: 700,
            color: suitColor,
            textAlign: 'center',
            paddingBottom: 2,
            fontFamily: 'Courier New, monospace',
            letterSpacing: 0.5,
          }}
        >
          {SUIT_ABBR[info.suit] ?? ''}
        </div>
      </div>
    </div>
  );
}

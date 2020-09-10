import Tile from './Tile.js';

const getNumberOfTilesToRemember = (m, n) => {
  const numberOfTiles = m * n;

  return Math.round(numberOfTiles * 0.1973 + 1.7595);
};

export default class Board {
  constructor(m, n) {
    this.x = m;
    this.y = n;
    this.tiles = this.generateBoard(m, n);
    this.flaggedTiles = this.generateFlaggedTiles(m, n);
  }
}

Board.prototype.getX = function getX() {
  return this.x;
};

Board.prototype.getY = function getY() {
  return this.y;
};

Board.prototype.getTiles = function getTiles() {
  return this.tiles;
};

Board.prototype.generateBoard = function generateBoard(m, n) {
  const tiles = [];

  for (let i = 0; i < m; i += 1) {
    const row = [];
    for (let j = 0; j < n; j += 1) {
      const tile = new Tile();
      row.push(tile);
    }
    tiles.push(row);
  }
  return tiles;
};

Board.prototype.generateFlaggedTiles = function generateFlaggedTiles(m, n) {
  const numberOfTilesToRemember = getNumberOfTilesToRemember(m, n);

  const flaggedTiles = [];

  for (let i = 1; i < numberOfTilesToRemember + 1; i += 1) {
    let unflaggedTileFound = false;
    while (!unflaggedTileFound) {
      const xPos = Math.floor(Math.random() * (m));
      const yPos = Math.floor(Math.random() * (n));
      const tile = this.tiles[xPos][yPos];

      if (!tile.getFlag()) {
        tile.setFlag(i);
        unflaggedTileFound = true;
        flaggedTiles.push(tile);
      }
    }
  }

  return flaggedTiles;
};

Board.prototype.resetBoard = function resetBoard(m, n) {
  this.tiles = this.generateBoard(m, n);
  this.flaggedTiles = this.generateFlaggedTiles(m, n);
};

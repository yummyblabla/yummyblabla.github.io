/* eslint-disable max-len */
import { TILE_SIZE, OUTER_PADDING, INNER_PADDING } from '../constants/constants.js';

const gameStartPageEventParser = (game, canvas, event) => {
  const x = event.clientX;
  const y = event.clientY;

  const board = game.getBoard();
  const allTiles = board.getTiles();
  const xTiles = board.getX();
  const yTiles = board.getY();

  const widthOfBox = xTiles * TILE_SIZE + OUTER_PADDING * 2 + (xTiles - 1) * INNER_PADDING;
  const heightOfBox = yTiles * TILE_SIZE + OUTER_PADDING * 2 + (yTiles - 1) * INNER_PADDING;

  const startingX = (canvas.width - widthOfBox) / 2 + OUTER_PADDING;
  const startingY = (canvas.height - heightOfBox) / 2 + OUTER_PADDING;

  const relativeX = x - startingX;
  const relativeY = y - startingY;

  if (relativeX < 0 || relativeY < 0) {
    return;
  }

  const chunk = TILE_SIZE + INNER_PADDING;

  const sectionX = Math.floor(relativeX / chunk);
  const sectionY = Math.floor(relativeY / chunk);

  if (sectionX >= xTiles || sectionY >= yTiles) {
    return;
  }

  const leftOverX = relativeX - (chunk * sectionX);
  const leftOverY = relativeY - (chunk * sectionY);
  if (leftOverX > TILE_SIZE || leftOverY > TILE_SIZE) {
    return;
  }
  console.log(sectionX, sectionY);

  allTiles[sectionX][sectionY].checkTile();
  // console.log(relativeX % TILE_SIZE);
  // console.log(sectionX);
  // console.log(startingX, startingY);
};

export default gameStartPageEventParser;

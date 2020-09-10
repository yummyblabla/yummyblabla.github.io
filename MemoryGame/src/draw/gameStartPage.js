/* eslint-disable max-len */
import { TILE_SIZE, OUTER_PADDING, INNER_PADDING } from '../constants/constants.js';

const drawGameStartPage = (game, canvas, ctx) => {
  ctx.fillStyle = 'brown';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const board = game.getBoard();
  const allTiles = board.getTiles();

  const widthOfBox = board.getX() * TILE_SIZE + OUTER_PADDING * 2 + (board.getX() - 1) * INNER_PADDING;
  const heightOfBox = board.getY() * TILE_SIZE + OUTER_PADDING * 2 + (board.getY() - 1) * INNER_PADDING;
  const startingX = (canvas.width - widthOfBox) / 2;
  const startingY = (canvas.height - heightOfBox) / 2;
  ctx.fillStyle = 'black';
  ctx.fillRect(
    startingX,
    startingY,
    widthOfBox,
    heightOfBox,
  );

  allTiles.forEach((row, rowIndex) => {
    row.forEach((tile, tileIndex) => {
      if (tile.getChecked() && tile.getFlag()) {
        ctx.fillStyle = 'green';
      } else if (tile.getChecked() && !tile.getFlag()) {
        ctx.fillStyle = 'red';
      } else {
        ctx.fillStyle = 'grey';
      }

      ctx.fillRect(
        startingX + OUTER_PADDING + rowIndex * (TILE_SIZE + INNER_PADDING),
        startingY + OUTER_PADDING + tileIndex * (TILE_SIZE + INNER_PADDING),
        TILE_SIZE,
        TILE_SIZE,
      );
    });
  });
};

export default drawGameStartPage;

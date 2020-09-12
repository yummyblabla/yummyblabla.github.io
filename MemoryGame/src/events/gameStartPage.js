/* eslint-disable max-len */
import { TILE_SIZE, OUTER_PADDING, INNER_PADDING } from '../constants/constants.js';
import { TERMINATE_GAME_BUTTON } from '../constants/graphics.js';
import ROUND_STATES from '../modules/RoundStates.js';

const gameStartPageEventParser = (game, canvas, event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  if (x < TERMINATE_GAME_BUTTON.width && y < TERMINATE_GAME_BUTTON.height) {
    game.terminateGame();
  }

  if (game.getRoundState() === ROUND_STATES.USER_INPUT) {
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

    const checked = allTiles[sectionX][sectionY].checkTile();
    if (checked) {
      game.incrementCounter();
    }
  }
};

export default gameStartPageEventParser;

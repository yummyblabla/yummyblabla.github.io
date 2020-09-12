/* eslint-disable max-len */
import {
  TILE_SIZE, OUTER_PADDING, INNER_PADDING, UNREVEALED_COLOUR,
  REVEALED_CORRECT_COLOUR, TIME_FOR_ROTATE, BOARD_COLOUR, PADDING_COLOUR,
  REVEALED_WRONG_COLOUR, INFO_BACKGROUND_COLOUR, SAME_LEVEL_MESSAGE,
  NEXT_LEVEL_MESSAGE, PREVIOUS_LEVEL_MESSAGE, GAME_OVER_MESSAGE,
  TEXT_BASELINE_MIDDLE, TEXT_ALIGN_CENTER, TEXT_BASELINE_TOP, WHITE_COLOR,
  REVEALED_OUTOFORDER_COLOUR,
} from '../constants/constants.js';
import {
  SCORE_INFO, TILES_INFO, BUTTON_FONT, TERMINATE_GAME_BUTTON,
} from '../constants/graphics.js';
import BOARD_STATE_CHANGE from '../constants/BoardStateChange.js';
import ROUND_STATES from '../constants/RoundStates.js';

/**
 * Draw Score Info on top right side of screen
 * @param {*} game Game instance
 * @param {*} canvas canvas
 * @param {*} ctx canvas context
 */
const drawScore = (game, canvas, ctx) => {
  const {
    width, height, text, marginRight, paddingLeft,
  } = SCORE_INFO;
  ctx.fillStyle = INFO_BACKGROUND_COLOUR;
  ctx.fillRect(canvas.width - width - marginRight, 0, width, height);

  ctx.fillStyle = BUTTON_FONT.colour;
  ctx.font = `${BUTTON_FONT.fontSize}px ${BUTTON_FONT.fontStyle}`;
  ctx.textBaseline = TEXT_BASELINE_MIDDLE;
  ctx.fillText(
    `${text}   ${game.score}`,
    canvas.width - width + paddingLeft - marginRight,
    height / 2,
  );
};

/**
 * Draw Tile Information next to score
 * @param {*} game Game Instance
 * @param {*} canvas canvas
 * @param {*} ctx canvascontext
 */
const drawTileInfo = (game, canvas, ctx) => {
  const {
    width, height, marginRight, text, paddingLeft,
  } = TILES_INFO;
  ctx.fillStyle = INFO_BACKGROUND_COLOUR;
  ctx.fillRect(canvas.width - width - SCORE_INFO.width - marginRight - SCORE_INFO.marginRight, 0, width, height);

  ctx.fillStyle = BUTTON_FONT.colour;
  ctx.font = `${BUTTON_FONT.fontSize}px ${BUTTON_FONT.fontStyle}`;
  ctx.textBaseline = TEXT_BASELINE_MIDDLE;
  ctx.fillText(
    `${text}   ${game.getBoard().getFlaggedTiles().length}`,
    canvas.width - width - SCORE_INFO.width - marginRight - SCORE_INFO.marginRight + paddingLeft,
    height / 2,
  );
};

/**
 * Draw game background
 * @param {*} canvas canvas
 * @param {*} ctx canvas context
 */
const drawBackground = (canvas, ctx) => {
  ctx.fillStyle = BOARD_COLOUR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

/**
 * Draw score gained from round.
 * @param {*} game Game instance
 * @param {*} canvas canvas
 * @param {*} ctx canvas context
 */
const drawGainedScore = (game, canvas, ctx) => {
  const {
    width, height, gainedScorePadding,
  } = SCORE_INFO;
  ctx.fillStyle = BUTTON_FONT.colour;
  ctx.font = `${BUTTON_FONT.fontSize}px ${BUTTON_FONT.fontStyle}`;
  ctx.textBaseline = TEXT_BASELINE_TOP;
  ctx.textAlign = TEXT_ALIGN_CENTER;
  ctx.fillText(
    `${game.gainedScore >= 0 ? '+' : ''} ${game.gainedScore}`,
    canvas.width - width + gainedScorePadding,
    height + 5,
  );
};

/**
 * Draw round ending message below the grid.
 * @param {*} game Game instance
 * @param {*} canvas canvas
 * @param {*} ctx canvas context
 * @param {*} width width of grid
 * @param {*} x x position of grid
 * @param {*} height height of grid
 * @param {*} y y position of grid
 */
const drawRoundAdvanceMessage = (game, canvas, ctx, width, x, height, y) => {
  const boardState = game.getBoardStateChange();
  let text;
  if (boardState === BOARD_STATE_CHANGE.SAME) {
    text = SAME_LEVEL_MESSAGE;
  } else if (boardState === BOARD_STATE_CHANGE.INCREASE) {
    text = NEXT_LEVEL_MESSAGE;
  } else if (boardState === BOARD_STATE_CHANGE.DECREASE) {
    text = PREVIOUS_LEVEL_MESSAGE;
  } else if (boardState === BOARD_STATE_CHANGE.END_GAME) {
    text = GAME_OVER_MESSAGE;
  }
  ctx.fillStyle = BUTTON_FONT.colour;
  ctx.font = `${BUTTON_FONT.fontSize}px ${BUTTON_FONT.fontStyle}`;
  ctx.textBaseline = TEXT_BASELINE_TOP;

  ctx.fillText(
    text,
    x + (width / 4),
    y + height + 20,
  );
};

/**
 * Draw the Terminate Button
 * @param {*} canvas canvas
 * @param {*} ctx canvas context
 */
const drawTerminateButton = (canvas, ctx) => {
  const {
    colour, width, height, text, paddingLeft, fontSize,
  } = TERMINATE_GAME_BUTTON;
  ctx.fillStyle = colour;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = BUTTON_FONT.colour;
  ctx.font = `${fontSize}px ${BUTTON_FONT.fontStyle}`;
  ctx.textBaseline = TEXT_BASELINE_MIDDLE;
  ctx.textAlign = 'left';
  ctx.fillText(
    text,
    paddingLeft,
    height / 2,
  );
};

/**
 * Draw first phase (Pause)
 * @param {*} game Game instance
 * @param {*} canvas canvas
 * @param {*} ctx canvas context
 */
const drawPausePhase = (game, canvas, ctx) => {
  drawBackground(canvas, ctx);
  drawScore(game, canvas, ctx);
  drawTileInfo(game, canvas, ctx);
  drawTerminateButton(canvas, ctx);

  const board = game.getBoard();
  const allTiles = board.getTiles();

  const widthOfBox = board.getX() * TILE_SIZE + OUTER_PADDING * 2 + (board.getX() - 1) * INNER_PADDING;
  const heightOfBox = board.getY() * TILE_SIZE + OUTER_PADDING * 2 + (board.getY() - 1) * INNER_PADDING;
  const startingX = (canvas.width - widthOfBox) / 2;
  const startingY = (canvas.height - heightOfBox) / 2;
  ctx.fillStyle = PADDING_COLOUR;
  ctx.fillRect(
    startingX,
    startingY,
    widthOfBox,
    heightOfBox,
  );

  allTiles.forEach((row, rowIndex) => {
    row.forEach((tile, tileIndex) => {
      ctx.fillStyle = UNREVEALED_COLOUR;

      ctx.fillRect(
        startingX + OUTER_PADDING + rowIndex * (TILE_SIZE + INNER_PADDING),
        startingY + OUTER_PADDING + tileIndex * (TILE_SIZE + INNER_PADDING),
        TILE_SIZE,
        TILE_SIZE,
      );
    });
  });
};

/**
 * Draw reveal tile phase
 * @param {*} game Game instance
 * @param {*} canvas canvas
 * @param {*} ctx canvas context
 */
const drawTileReveal = (game, canvas, ctx) => {
  drawBackground(canvas, ctx);
  drawScore(game, canvas, ctx);
  drawTileInfo(game, canvas, ctx);
  drawTerminateButton(canvas, ctx);

  const board = game.getBoard();
  const allTiles = board.getTiles();

  const widthOfBox = board.getX() * TILE_SIZE + OUTER_PADDING * 2 + (board.getX() - 1) * INNER_PADDING;
  const heightOfBox = board.getY() * TILE_SIZE + OUTER_PADDING * 2 + (board.getY() - 1) * INNER_PADDING;
  const startingX = (canvas.width - widthOfBox) / 2;
  const startingY = (canvas.height - heightOfBox) / 2;
  ctx.fillStyle = PADDING_COLOUR;
  ctx.fillRect(
    startingX,
    startingY,
    widthOfBox,
    heightOfBox,
  );

  allTiles.forEach((row, rowIndex) => {
    row.forEach((tile, tileIndex) => {
      if (tile.getFlag()) {
        ctx.fillStyle = REVEALED_CORRECT_COLOUR;
      } else {
        ctx.fillStyle = UNREVEALED_COLOUR;
      }

      ctx.fillRect(
        startingX + OUTER_PADDING + rowIndex * (TILE_SIZE + INNER_PADDING),
        startingY + OUTER_PADDING + tileIndex * (TILE_SIZE + INNER_PADDING),
        TILE_SIZE,
        TILE_SIZE,
      );

      if (tile.getFlag()) {
        ctx.fillStyle = WHITE_COLOR;
        const value = tile.getValue();
        ctx.font = `${TILE_SIZE - 5}px ${BUTTON_FONT.fontStyle}`;
        ctx.textBaseline = TEXT_BASELINE_MIDDLE;
        ctx.textAlign = TEXT_ALIGN_CENTER;
        ctx.fillText(
          value,
          startingX + OUTER_PADDING + rowIndex * (TILE_SIZE + INNER_PADDING) + (TILE_SIZE / 2),
          startingY + OUTER_PADDING + tileIndex * (TILE_SIZE + INNER_PADDING) + (TILE_SIZE / 2) + 5,
        );
      }
    });
  });
};

/**
 * Draw rotation phase
 * @param {*} game game
 * @param {*} canvas canvas
 * @param {*} ctx context
 */
const drawRotation = (game, canvas, ctx) => {
  drawBackground(canvas, ctx);
  drawScore(game, canvas, ctx);
  drawTileInfo(game, canvas, ctx);
  drawTerminateButton(canvas, ctx);

  const board = game.getBoard();
  const allTiles = board.getTiles();

  const widthOfBox = board.getX() * TILE_SIZE + OUTER_PADDING * 2 + (board.getX() - 1) * INNER_PADDING;
  const heightOfBox = board.getY() * TILE_SIZE + OUTER_PADDING * 2 + (board.getY() - 1) * INNER_PADDING;
  const startingX = (canvas.width - widthOfBox) / 2;
  const startingY = (canvas.height - heightOfBox) / 2;

  const currentTime = Date.now();
  ctx.fillStyle = PADDING_COLOUR;
  ctx.translate(canvas.width / 2, canvas.height / 2);
  if (game.paused) {
    ctx.rotate((game.passedTime / TIME_FOR_ROTATE) * 90 * (Math.PI / 180));
  } else {
    ctx.rotate(((currentTime - game.timer) / TIME_FOR_ROTATE) * 90 * (Math.PI / 180)); // maximum rotate 90 degrees
  }
  ctx.translate(canvas.width / -2, canvas.height / -2);
  ctx.fillRect(
    startingX,
    startingY,
    widthOfBox,
    heightOfBox,
  );

  allTiles.forEach((row, rowIndex) => {
    row.forEach((tile, tileIndex) => {
      ctx.fillStyle = UNREVEALED_COLOUR;

      ctx.fillRect(
        startingX + OUTER_PADDING + rowIndex * (TILE_SIZE + INNER_PADDING),
        startingY + OUTER_PADDING + tileIndex * (TILE_SIZE + INNER_PADDING),
        TILE_SIZE,
        TILE_SIZE,
      );
    });
  });
};

/**
 * Draw User input phase
 * @param {*} game game instance
 * @param {*} canvas canvas
 * @param {*} ctx canvas context
 */
const drawUserInput = (game, canvas, ctx) => {
  drawBackground(canvas, ctx);
  drawScore(game, canvas, ctx);
  drawTileInfo(game, canvas, ctx);
  drawTerminateButton(canvas, ctx);

  const board = game.getBoard();
  const allTiles = board.getTiles();

  const widthOfBox = board.getX() * TILE_SIZE + OUTER_PADDING * 2 + (board.getX() - 1) * INNER_PADDING;
  const heightOfBox = board.getY() * TILE_SIZE + OUTER_PADDING * 2 + (board.getY() - 1) * INNER_PADDING;
  const startingX = (canvas.width - widthOfBox) / 2;
  const startingY = (canvas.height - heightOfBox) / 2;
  ctx.fillStyle = PADDING_COLOUR;
  ctx.fillRect(
    startingX,
    startingY,
    widthOfBox,
    heightOfBox,
  );

  allTiles.forEach((row, rowIndex) => {
    row.forEach((tile, tileIndex) => {
      if (tile.getOutOfOrderFlag()) {
        ctx.fillStyle = REVEALED_OUTOFORDER_COLOUR;
      } else if (tile.getChecked() && tile.getFlag()) {
        ctx.fillStyle = REVEALED_CORRECT_COLOUR;
      } else if (tile.getChecked() && !tile.getFlag()) {
        ctx.fillStyle = REVEALED_WRONG_COLOUR;
      } else {
        ctx.fillStyle = UNREVEALED_COLOUR;
      }
      ctx.fillRect(
        startingX + OUTER_PADDING + rowIndex * (TILE_SIZE + INNER_PADDING),
        startingY + OUTER_PADDING + tileIndex * (TILE_SIZE + INNER_PADDING),
        TILE_SIZE,
        TILE_SIZE,
      );

      if (tile.getChecked() && tile.getFlag()) {
        ctx.fillStyle = WHITE_COLOR;
        const value = tile.getValue();
        ctx.font = `${TILE_SIZE - 5}px ${BUTTON_FONT.fontStyle}`;
        ctx.textBaseline = TEXT_BASELINE_MIDDLE;
        ctx.textAlign = TEXT_ALIGN_CENTER;
        ctx.fillText(
          value,
          startingX + OUTER_PADDING + rowIndex * (TILE_SIZE + INNER_PADDING) + (TILE_SIZE / 2),
          startingY + OUTER_PADDING + tileIndex * (TILE_SIZE + INNER_PADDING) + (TILE_SIZE / 2) + 5,
        );
      }
    });
  });
};

/**
 * Draw End Round phase
 * @param {*} game Game instance
 * @param {*} canvas canvas
 * @param {*} ctx canvas context
 */
const drawEndRound = (game, canvas, ctx) => {
  drawBackground(canvas, ctx);
  drawScore(game, canvas, ctx);
  drawTileInfo(game, canvas, ctx);
  drawGainedScore(game, canvas, ctx);
  drawTerminateButton(canvas, ctx);

  const board = game.getBoard();
  const allTiles = board.getTiles();

  const widthOfBox = board.getX() * TILE_SIZE + OUTER_PADDING * 2 + (board.getX() - 1) * INNER_PADDING;
  const heightOfBox = board.getY() * TILE_SIZE + OUTER_PADDING * 2 + (board.getY() - 1) * INNER_PADDING;
  const startingX = (canvas.width - widthOfBox) / 2;
  const startingY = (canvas.height - heightOfBox) / 2;

  drawRoundAdvanceMessage(game, canvas, ctx, widthOfBox, startingX, heightOfBox, startingY);

  ctx.fillStyle = PADDING_COLOUR;
  ctx.fillRect(
    startingX,
    startingY,
    widthOfBox,
    heightOfBox,
  );

  allTiles.forEach((row, rowIndex) => {
    row.forEach((tile, tileIndex) => {
      if (tile.getOutOfOrderFlag()) {
        ctx.fillStyle = REVEALED_OUTOFORDER_COLOUR;
      } else if (tile.getChecked() && tile.getFlag()) {
        ctx.fillStyle = REVEALED_CORRECT_COLOUR;
      } else if (tile.getChecked() && !tile.getFlag()) {
        ctx.fillStyle = REVEALED_WRONG_COLOUR;
      } else {
        ctx.fillStyle = UNREVEALED_COLOUR;
      }

      ctx.fillRect(
        startingX + OUTER_PADDING + rowIndex * (TILE_SIZE + INNER_PADDING),
        startingY + OUTER_PADDING + tileIndex * (TILE_SIZE + INNER_PADDING),
        TILE_SIZE,
        TILE_SIZE,
      );

      if (tile.getChecked() && tile.getFlag()) {
        ctx.fillStyle = WHITE_COLOR;
        const value = tile.getValue();
        ctx.font = `${TILE_SIZE - 5}px ${BUTTON_FONT.fontStyle}`;
        ctx.textBaseline = TEXT_BASELINE_MIDDLE;
        ctx.textAlign = TEXT_ALIGN_CENTER;
        ctx.fillText(
          value,
          startingX + OUTER_PADDING + rowIndex * (TILE_SIZE + INNER_PADDING) + (TILE_SIZE / 2),
          startingY + OUTER_PADDING + tileIndex * (TILE_SIZE + INNER_PADDING) + (TILE_SIZE / 2) + 5,
        );
      }
    });
  });
};

/**
 * Parse which round to draw
 * @param {*} game game
 * @param {*} canvas canvas
 * @param {*} ctx canvas context
 */
const GameStartDrawParser = (game, canvas, ctx) => {
  const drawStateMapper = {
    [ROUND_STATES.PAUSE]: drawPausePhase,
    [ROUND_STATES.REVEAL]: drawTileReveal,
    [ROUND_STATES.ROTATE]: drawRotation,
    [ROUND_STATES.USER_INPUT]: drawUserInput,
    [ROUND_STATES.END_ROUND]: drawEndRound,
  };

  drawStateMapper[game.getRoundState()](game, canvas, ctx);
};

export default GameStartDrawParser;

import SUMMARY_PAGE_STATE from '../modules/SummaryPageState.js';
import { BOARD_COLOUR } from '../constants/constants.js';
import {
  BUTTON_FONT, RESTART_GAME_BUTTON,
} from '../constants/graphics.js';

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
 * Draw Score obtained
 * @param {*} game Game instance
 * @param {*} canvas canvas
 * @param {*} ctx canvas context
 */
const drawScore = (game, canvas, ctx) => {
  ctx.fillStyle = BUTTON_FONT.colour;
  ctx.font = `${BUTTON_FONT.fontSize}px ${BUTTON_FONT.fontStyle}`;
  // ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillText(
    `Score: ${game.score}`,
    (canvas.width / 2),
    canvas.height / 3,
  );
};

const drawRestartButton = (canvas, ctx) => {
  const {
    width, height, text, colour,
  } = RESTART_GAME_BUTTON;
  ctx.fillStyle = colour;
  ctx.fillRect((canvas.width - width) / 2, (canvas.height - height) / 2, width, height);

  ctx.fillStyle = BUTTON_FONT.colour;
  ctx.font = `${BUTTON_FONT.fontSize}px ${BUTTON_FONT.fontStyle}`;
  ctx.textBaseline = 'middle';
  ctx.fillText(
    text,
    (canvas.width) / 2,
    (canvas.height) / 2,
  );
};

/**
 * Draw User Input state.
 * @param {*} game Game isntance
 * @param {*} canvas canvas
 * @param {*} ctx canvas context
 */
const drawUserInput = (game, canvas, ctx) => {
  drawBackground(canvas, ctx);
  drawScore(game, canvas, ctx);
  drawRestartButton(canvas, ctx);
};

const SummaryPageDrawParser = (game, canvas, ctx) => {
  const drawStateMapper = {
    [SUMMARY_PAGE_STATE.USER_INPUT]: drawUserInput,
  };
  drawStateMapper[game.getSummaryPageState()](game, canvas, ctx);
};

export default SummaryPageDrawParser;

import SUMMARY_PAGE_STATE from '../constants/SummaryPageState.js';
import { BOARD_COLOUR, TEXT_ALIGN_CENTER, TEXT_BASELINE_MIDDLE } from '../constants/constants.js';
import {
  BUTTON_FONT, RESTART_GAME_BUTTON, VIEW_HIGH_SCORES_BUTTON,
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
  ctx.textAlign = TEXT_ALIGN_CENTER;
  ctx.fillText(
    `Score: ${game.score}`,
    (canvas.width / 2),
    canvas.height / 3,
  );
};

/**
 * Draw Restart button
 * @param {*} canvas canvas
 * @param {*} ctx canvas context
 */
const drawRestartButton = (canvas, ctx) => {
  const {
    width, height, text, colour,
  } = RESTART_GAME_BUTTON;
  ctx.fillStyle = colour;
  ctx.fillRect((canvas.width - width) / 2, (canvas.height - height) / 2, width, height);

  ctx.fillStyle = BUTTON_FONT.colour;
  ctx.font = `${BUTTON_FONT.fontSize}px ${BUTTON_FONT.fontStyle}`;
  ctx.textBaseline = TEXT_BASELINE_MIDDLE;
  ctx.textAlign = TEXT_ALIGN_CENTER;
  ctx.fillText(
    text,
    (canvas.width) / 2,
    (canvas.height) / 2,
  );
};

const drawHighScoresButton = (canvas, ctx) => {
  const {
    width, height, text, colour,
  } = VIEW_HIGH_SCORES_BUTTON;

  ctx.fillStyle = colour;
  ctx.fillRect((canvas.width - width) / 2, canvas.height - height, width, height);

  ctx.fillStyle = BUTTON_FONT.colour;
  ctx.font = `${BUTTON_FONT.fontSize}px ${BUTTON_FONT.fontStyle}`;
  ctx.textBaseline = TEXT_BASELINE_MIDDLE;
  ctx.fillText(
    text,
    (canvas.width) / 2,
    (canvas.height - (height / 2)),
  );
};

/**
 * Draw User Input state.
 * @param {*} game Game instance
 * @param {*} canvas canvas
 * @param {*} ctx canvas context
 */
const drawUserInput = (game, canvas, ctx) => {
  drawBackground(canvas, ctx);
  drawScore(game, canvas, ctx);
  drawRestartButton(canvas, ctx);
  drawHighScoresButton(canvas, ctx);
};

/**
 * Draw High Scores page.
 * @param {*} game Game instance
 * @param {*} canvas canvas
 * @param {*} ctx canvas context
 */
const drawHighScores = (game, canvas, ctx) => {
  drawBackground(canvas, ctx);
  drawRestartButton(canvas, ctx);

  // const scores = [
  //   { username: 'Place', score: 100 },
  //   { username: 'Holder', score: 80 },
  //   { username: 'For', score: 70 },
  //   { username: 'Now', score: 50 },
  //   { username: ':(', score: 30 },
  // ];
  const scores = game.highScores;
  const startingX = (canvas.width) / 2;
  const startingY = (canvas.height / 4);
  const margin = 30;

  ctx.fillStyle = BUTTON_FONT.colour;
  ctx.font = `${BUTTON_FONT.fontSize}px ${BUTTON_FONT.fontStyle}`;
  ctx.textBaseline = TEXT_BASELINE_MIDDLE;
  ctx.textAlign = TEXT_ALIGN_CENTER;

  ctx.fillText('High Scores', startingX, startingY - margin * 2);

  scores.forEach(({ username, score }, index) => {
    ctx.fillText(
      `${username} - ${score}`,
      startingX,
      startingY + margin * index,
    );
  });
};

const SummaryPageDrawParser = (game, canvas, ctx) => {
  const drawStateMapper = {
    [SUMMARY_PAGE_STATE.USER_INPUT]: drawUserInput,
    [SUMMARY_PAGE_STATE.HIGH_SCORE]: drawHighScores,
  };
  drawStateMapper[game.getSummaryPageState()](game, canvas, ctx);
};

export default SummaryPageDrawParser;

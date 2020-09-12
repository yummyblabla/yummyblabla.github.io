import { START_GAME_BUTTON, BUTTON_FONT } from '../constants/graphics.js';
import {
  BOARD_COLOUR, TEXT_ALIGN_CENTER, TITLE_DESCRIPTION, TITLE_NAME, WHITE_COLOR,
} from '../constants/constants.js';

const drawLandingPage = (game, canvas, ctx) => {
  ctx.fillStyle = BOARD_COLOUR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = WHITE_COLOR;
  ctx.font = `40px ${BUTTON_FONT.fontStyle}`;
  ctx.textAlign = TEXT_ALIGN_CENTER;
  ctx.fillText(TITLE_NAME, canvas.width / 2, canvas.height / 4);

  ctx.font = `20px ${BUTTON_FONT.fontStyle}`;
  ctx.textAlign = TEXT_ALIGN_CENTER;
  const description = TITLE_DESCRIPTION;
  const lines = description.split('\n');
  const lineHeight = 30;
  for (let i = 0; i < lines.length; i += 1) {
    ctx.fillText(lines[i], canvas.width / 2, canvas.height / 3 + lineHeight * i);
  }

  // Render Button
  ctx.fillStyle = START_GAME_BUTTON.colour;
  ctx.fillRect(
    (canvas.width - START_GAME_BUTTON.width) / 2,
    (canvas.height - START_GAME_BUTTON.height) / 2,
    START_GAME_BUTTON.width,
    START_GAME_BUTTON.height,
  );

  ctx.fillStyle = BUTTON_FONT.colour;
  ctx.font = `${BUTTON_FONT.fontSize}px ${BUTTON_FONT.fontStyle}`;
  ctx.textAlign = TEXT_ALIGN_CENTER;

  const { text } = START_GAME_BUTTON;
  ctx.fillText(
    text,
    (canvas.width) / 2,
    (canvas.height) / 2,
  );
};

export default drawLandingPage;

import { START_GAME_BUTTON, BUTTON_FONT } from '../constants/buttons.js';

const drawLandingPage = (game, canvas, ctx) => {
  ctx.fillStyle = 'brown';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Render Button
  ctx.fillStyle = START_GAME_BUTTON.colour;
  ctx.fillRect(
    (canvas.width - START_GAME_BUTTON.width) / 2,
    (canvas.height - START_GAME_BUTTON.height) / 2,
    START_GAME_BUTTON.width,
    START_GAME_BUTTON.height,
  );

  ctx.fillStyle = 'white';
  ctx.font = `${BUTTON_FONT.fontSize}px ${BUTTON_FONT.fontStyle}`;
  ctx.textAlign = 'center';

  const { text } = START_GAME_BUTTON;
  ctx.fillText(
    text,
    (canvas.width) / 2,
    (canvas.height) / 2,
  );
};

export default drawLandingPage;

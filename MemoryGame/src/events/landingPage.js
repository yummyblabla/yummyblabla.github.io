import {
  START_GAME_BUTTON,
} from '../constants/graphics.js';

const landingPageEventParser = (game, canvas, event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  // Check for click on Start Game Button
  const leftX = (canvas.width - START_GAME_BUTTON.width) / 2;
  const rightX = leftX + START_GAME_BUTTON.width;
  const topY = (canvas.height - START_GAME_BUTTON.height) / 2;
  const bottomY = topY + START_GAME_BUTTON.height;

  if (x > leftX && x < rightX && y > topY && y < bottomY) {
    game.startGame();
  }
};

export default landingPageEventParser;

import { RESTART_GAME_BUTTON } from '../constants/graphics.js';
import SUMMARY_PAGE_STATE from '../modules/SummaryPageState.js';

const summaryPageEventParser = (game, canvas, event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  if (game.getSummaryPageState() === SUMMARY_PAGE_STATE.USER_INPUT) {
    // Check for click on Start Game Button
    const leftX = (canvas.width - RESTART_GAME_BUTTON.width) / 2;
    const rightX = leftX + RESTART_GAME_BUTTON.width;
    const topY = (canvas.height - RESTART_GAME_BUTTON.height) / 2;
    const bottomY = topY + RESTART_GAME_BUTTON.height;

    if (x > leftX && x < rightX && y > topY && y < bottomY) {
      game.restartGame();
      document.getElementById('username').style.display = 'none';
    }
  }
};

export default summaryPageEventParser;

import { RESTART_GAME_BUTTON, VIEW_HIGH_SCORES_BUTTON } from '../constants/graphics.js';
import SUMMARY_PAGE_STATE from '../constants/SummaryPageState.js';

const summaryPageEventParser = (game, canvas, event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  if (game.getSummaryPageState() === SUMMARY_PAGE_STATE.USER_INPUT) {
    // Check for click on View High Score button
    const highScoreLeftX = (canvas.width - VIEW_HIGH_SCORES_BUTTON.width) / 2;
    const highScoreRightX = highScoreLeftX + VIEW_HIGH_SCORES_BUTTON.width;
    const highScoreTopY = canvas.height - VIEW_HIGH_SCORES_BUTTON.height;
    const highScoreBottomY = highScoreTopY + VIEW_HIGH_SCORES_BUTTON.height;

    if (x > highScoreLeftX && x < highScoreRightX && y > highScoreTopY && y < highScoreBottomY) {
      game.goToViewHighScore();
    }
  }

  // Check for click on Start Game Button
  const restartLeftX = (canvas.width - RESTART_GAME_BUTTON.width) / 2;
  const restartRightX = restartLeftX + RESTART_GAME_BUTTON.width;
  const restartTopY = (canvas.height - RESTART_GAME_BUTTON.height) / 2;
  const restartBottomY = restartTopY + RESTART_GAME_BUTTON.height;

  if (x > restartLeftX && x < restartRightX && y > restartTopY && y < restartBottomY) {
    game.restartGame();
    document.getElementById('submitHighScore').style.display = 'none';
  }
};

export default summaryPageEventParser;

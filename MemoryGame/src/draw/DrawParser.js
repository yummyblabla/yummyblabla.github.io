import drawLandingPage from './LandingPageDraw.js';

import GAME_STATES from '../modules/GameStates.js';
import drawGameStartPage from './GameStartPageDraw.js';
import drawSummaryPage from './SummaryPageDraw.js';

const DrawParser = (game, canvas, ctx) => {
  const mapper = {
    [GAME_STATES.LANDING_PAGE]: drawLandingPage,
    [GAME_STATES.GAME_START]: drawGameStartPage,
    [GAME_STATES.SUMMARY]: drawSummaryPage,
  };
  try {
    mapper[game.getGameState()](game, canvas, ctx);
  } catch (err) {
    console.error(err);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
};

export default DrawParser;

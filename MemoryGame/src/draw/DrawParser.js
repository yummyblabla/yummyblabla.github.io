import drawLandingPage from './landingPage.js';

import GAME_STATES from '../modules/GameStates.js';
import drawGameStartPage from './gameStartPage.js';

const DrawParser = (game, canvas, ctx) => {
  const mapper = {
    [GAME_STATES.LANDING_PAGE]: drawLandingPage,
    [GAME_STATES.GAME_START]: drawGameStartPage,
  };
  try {
    mapper[game.getGameState()](game, canvas, ctx);
  } catch (err) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
};

export default DrawParser;

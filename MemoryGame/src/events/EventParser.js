import landingPageEventParser from './landingPage.js';

import GAME_STATES from '../modules/GameStates.js';
import gameStartPageEventParser from './gameStartPage.js';
import summaryPageEventParser from './SummaryPageEvents.js';

const EventParser = (game, canvas, event) => {
  const mapper = {
    [GAME_STATES.LANDING_PAGE]: landingPageEventParser,
    [GAME_STATES.GAME_START]: gameStartPageEventParser,
    [GAME_STATES.SUMMARY]: summaryPageEventParser,
  };
  try {
    mapper[game.getGameState()](game, canvas, event);
  } catch (err) {
    console.error(err);
  }
};

export default EventParser;

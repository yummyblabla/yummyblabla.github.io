import Board from './Board.js';
import GAME_STATES from './GameStates.js';

export default class Game {
  constructor() {
    this.board = new Board(3, 3);
    this.gameState = GAME_STATES.LANDING_PAGE;
    this.gameStarted = false;
  }
}

Game.prototype.getBoard = function getBoard() {
  return this.board;
};

Game.prototype.getGameState = function getGameState() {
  return this.gameState;
};

Game.prototype.startGame = function startGame() {
  if (this.gameState === GAME_STATES.LANDING_PAGE) {
    this.gameState = GAME_STATES.GAME_START;
    return true;
  }
  return false;
};

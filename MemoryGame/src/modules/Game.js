import Board from './Board.js';
import GAME_STATES from './GameStates.js';
import ROUND_STATES from './RoundStates.js';
import {
  MAXIMUM_ERRORS, TIME_FOR_END_ROUND, TIME_FOR_PAUSE, TIME_FOR_REVEAL, TIME_FOR_ROTATE,
} from '../constants/constants.js';
import BOARD_STATE_CHANGE from './BoardStateChange.js';
import SUMMARY_PAGE_STATE from './SummaryPageState.js';

export default class Game {
  constructor() {
    this.board = new Board(3, 4);
    this.gameState = GAME_STATES.LANDING_PAGE;
    this.roundState = ROUND_STATES.PAUSE;
    this.boardStateChange = BOARD_STATE_CHANGE.SAME;
    this.summaryPageState = SUMMARY_PAGE_STATE.USER_INPUT;
    this.timer = Date.now(); // timer for state changes
    this.previousTime = Date.now();
    this.clickCounter = 0;
    this.score = 0;
    this.gainedScore = 0;
  }
}

Game.prototype.getBoard = function getBoard() {
  return this.board;
};

Game.prototype.getScore = function getScore() {
  return this.score;
};

Game.prototype.updateScore = function updateScore(newScore) {
  this.score = newScore;
};

Game.prototype.setGainedScore = function setGainedScore(score) {
  this.gainedScore = score;
};

Game.prototype.resetClickCounter = function resetClickCounter() {
  this.clickCounter = 0;
};

Game.prototype.setTimer = function setTimer(newTime) {
  this.timer = newTime;
};

Game.prototype.getTimer = function getTimer() {
  return this.timer;
};

Game.prototype.getSummaryPageState = function getSummaryPageState() {
  return this.summaryPageState;
};

Game.prototype.getBoardStateChange = function getBoardStateChange() {
  return this.boardStateChange;
};

Game.prototype.setBoardStateChange = function setBoardStateChange(state) {
  this.boardStateChange = state;
};

Game.prototype.setPreviousTime = function setPreviousTime(newTime) {
  this.previousTime = newTime;
};

Game.prototype.getRoundState = function getRoundState() {
  return this.roundState;
};

Game.prototype.setRoundState = function setRoundState(state) {
  this.roundState = state;
};

Game.prototype.getGameState = function getGameState() {
  return this.gameState;
};

Game.prototype.startGame = function startGame() {
  if (this.gameState === GAME_STATES.LANDING_PAGE) {
    this.gameState = GAME_STATES.GAME_START;
    this.timer = Date.now();
    return true;
  }
  return false;
};

Game.prototype.updateState = function updateState() {
  const mapper = {
    [ROUND_STATES.PAUSE]: this.transitionFromPause,
    [ROUND_STATES.REVEAL]: this.transitionFromReveal,
    [ROUND_STATES.ROTATE]: this.transitionFromRotate,
    [ROUND_STATES.USER_INPUT]: this.checkInGameState,
    [ROUND_STATES.END_ROUND]: this.transitionFromEndRound,
  };
  if (this.getGameState() === GAME_STATES.GAME_START) {
    try {
      mapper[this.roundState](this);
    } catch (err) {
      console.error(err);
    }
  }
};

Game.prototype.transitionFromPause = function transitionFromPause(game) {
  const currentTime = Date.now();
  if (currentTime - game.timer >= TIME_FOR_PAUSE) {
    game.setRoundState(ROUND_STATES.REVEAL);
    game.setTimer(currentTime);
  }
};

Game.prototype.transitionFromReveal = function transitionFromReveal(game) {
  const currentTime = Date.now();
  if (currentTime - game.timer >= TIME_FOR_REVEAL) {
    game.setRoundState(ROUND_STATES.ROTATE);
    game.setPreviousTime(currentTime);
    game.setTimer(currentTime);
  }
};

Game.prototype.transitionFromRotate = function transitionFromRotate(game) {
  const currentTime = Date.now();
  if (currentTime - game.timer >= TIME_FOR_ROTATE) {
    game.setRoundState(ROUND_STATES.USER_INPUT);
    game.setTimer(currentTime);
    game.getBoard().rotateTilesBy90Deg();
  }
};

Game.prototype.transitionFromEndRound = function transitionFromEndRound(game) {
  const currentTime = Date.now();

  if (currentTime - game.timer >= TIME_FOR_END_ROUND) {
    const board = game.getBoard();
    if (game.boardStateChange === BOARD_STATE_CHANGE.DECREASE) {
      board.decreaseDifficulty();
    } else if (game.boardStateChange === BOARD_STATE_CHANGE.INCREASE) {
      board.increaseDifficulty();
    }
    board.generateNewBoard();

    game.setRoundState(ROUND_STATES.PAUSE);
  }
};

Game.prototype.transitionToEndRound = function transitionToEndRound(game) {
  game.resetClickCounter();
  const currentTime = Date.now();
  game.setTimer(currentTime);
  game.setRoundState(ROUND_STATES.END_ROUND);
};

Game.prototype.incrementCounter = function incrementCounter() {
  this.clickCounter += 1;
};

Game.prototype.checkInGameState = function checkInGameState(game) {
  const flaggedTiles = game.getBoard().getFlaggedTiles();
  const numOfFlaggedTiles = flaggedTiles.length;
  const flaggedChecked = flaggedTiles.filter((tile) => tile.getChecked());
  const numOfErrors = game.clickCounter - flaggedChecked.length;

  if (numOfErrors >= MAXIMUM_ERRORS) {
    game.transitionToEndRound(game);
    game.setBoardStateChange(BOARD_STATE_CHANGE.DECREASE);

    const roundScore = flaggedChecked.length - numOfErrors;
    game.setGainedScore(roundScore);
    game.updateScore(game.score + roundScore);
  }

  if (flaggedChecked.length === numOfFlaggedTiles) {
    if (game.clickCounter > numOfFlaggedTiles) {
      game.transitionToEndRound(game);
      game.setBoardStateChange(BOARD_STATE_CHANGE.SAME);
    } else {
      game.transitionToEndRound(game);
      game.setBoardStateChange(BOARD_STATE_CHANGE.INCREASE);
    }

    const roundScore = flaggedChecked.length - numOfErrors;
    game.setGainedScore(roundScore);
    game.updateScore(game.score + roundScore);
  }
};

Game.prototype.terminateGame = function terminateGame() {
  if (this.gameState === GAME_STATES.GAME_START) {
    this.gameState = GAME_STATES.SUMMARY;
    this.roundState = ROUND_STATES.PAUSE;
    this.summaryPageState = SUMMARY_PAGE_STATE.USER_INPUT;

    // Update score based on current state.
    const flaggedTiles = this.getBoard().getFlaggedTiles();
    const flaggedChecked = flaggedTiles.filter((tile) => tile.getChecked());
    const numOfErrors = this.clickCounter - flaggedChecked.length;
    const roundScore = flaggedChecked.length - numOfErrors;
    this.setGainedScore(roundScore);
    this.updateScore(this.score + roundScore);
  }
};

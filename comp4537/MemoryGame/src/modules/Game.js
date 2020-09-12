import Board from './Board.js';
import GAME_STATES from '../constants/GameStates.js';
import ROUND_STATES from '../constants/RoundStates.js';
import {
  MAXIMUM_ERRORS,
  MINIMUM_LEVEL, TIME_FOR_END_ROUND, TIME_FOR_PAUSE, TIME_FOR_REVEAL, TIME_FOR_ROTATE,
} from '../constants/constants.js';
import BOARD_STATE_CHANGE from '../constants/BoardStateChange.js';
import SUMMARY_PAGE_STATE from '../constants/SummaryPageState.js';
import { audio } from '../index.js';

export default class Game {
  constructor() {
    this.board = new Board(MINIMUM_LEVEL, MINIMUM_LEVEL);
    this.gameState = GAME_STATES.LANDING_PAGE;
    this.roundState = ROUND_STATES.PAUSE;
    this.boardStateChange = BOARD_STATE_CHANGE.SAME;
    this.summaryPageState = SUMMARY_PAGE_STATE.USER_INPUT;
    this.timer = Date.now(); // timer for state changes
    this.clickCounter = 0;
    this.score = 0;
    this.gainedScore = 0;
    this.passedTime = 0;
    this.timeOfPause = 0;
    this.paused = false;
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
    } else if (game.boardStateChange === BOARD_STATE_CHANGE.END_GAME) {
      game.terminateGame(false);
      return;
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
  audio[0].play();
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
    game.setBoardStateChange(BOARD_STATE_CHANGE.DECREASE);

    const roundScore = flaggedChecked.length - numOfErrors;
    game.setGainedScore(roundScore);
    game.updateScore(game.score + roundScore);

    if (game.score < 0) {
      game.setBoardStateChange(BOARD_STATE_CHANGE.END_GAME);
    }

    game.transitionToEndRound(game);
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

Game.prototype.terminateGame = function terminateGame(manualTermination) {
  if (this.gameState === GAME_STATES.GAME_START) {
    // Update score based on current state.
    if (manualTermination) {
      const flaggedTiles = this.getBoard().getFlaggedTiles();
      const flaggedChecked = flaggedTiles.filter((tile) => tile.getChecked());
      const numOfErrors = this.clickCounter - flaggedChecked.length;
      const roundScore = flaggedChecked.length - numOfErrors;
      this.setGainedScore(roundScore);
      this.updateScore(this.score + roundScore);
    }

    this.gameState = GAME_STATES.SUMMARY;
    this.roundState = ROUND_STATES.PAUSE;
    this.summaryPageState = SUMMARY_PAGE_STATE.USER_INPUT;

    document.getElementById('submitHighScore').style.display = 'block';
  }
};

Game.prototype.goToViewHighScore = function goToViewHighScore() {
  this.summaryPageState = SUMMARY_PAGE_STATE.HIGH_SCORE;
  document.getElementById('submitHighScore').style.display = 'none';
};

Game.prototype.restartGame = function restartGame() {
  if (this.gameState === GAME_STATES.SUMMARY) {
    this.gameState = GAME_STATES.GAME_START;
    this.timer = Date.now();

    const board = this.getBoard();
    board.setXY(3, 3);
    board.generateNewBoard(3, 3);
    this.score = 0;
    this.gainedScore = 0;
    this.clickCounter = 0;
    this.timer = Date.now();
    this.paused = false;
  }
};

Game.prototype.pauseGame = function pauseGame() {
  const currentTime = Date.now();
  this.timeOfPause = currentTime;
  this.passedTime = currentTime - this.timer;
  this.timer += 1000 * 60 * 60;
  this.paused = true;
};

Game.prototype.resumeGame = function resumeGame() {
  this.timer = this.timeOfPause;
  this.paused = false;
};

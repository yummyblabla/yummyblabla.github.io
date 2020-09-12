/* eslint-disable max-len */
import Game from './modules/Game.js';
import {
  MIN_HEIGHT_CANVAS, MIN_WIDTH_CANVAS, DEFAULT_TILE_SIZE, OUTER_PADDING, INNER_PADDING, MAXIMUM_LEVEL, resizeTileSize,
} from './constants/constants.js';
import DrawParser from './draw/DrawParser.js';
import EventParser from './events/EventParser.js';
import { SCORE_INFO, TERMINATE_GAME_BUTTON, TILES_INFO } from './constants/graphics.js';

let canvas;
let ctx;
let game;
const audio = [];

/**
 * Main game loop
 */
const main = () => {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.width, canvas.height);

  // Save canvas state
  ctx.save();

  // Update game state
  game.updateState();

  // Draw on canvas
  DrawParser(game, canvas, ctx);

  // Restore state
  ctx.restore();

  requestAnimationFrame(main);
};

/**
 * Resize canvas and TILE_SIZE according to window size
 */
const resizeCanvas = () => {
  const maxWidth = Math.max(window.innerWidth, MIN_WIDTH_CANVAS);
  const maxHeight = Math.max(window.innerHeight, MIN_HEIGHT_CANVAS);
  canvas.setAttribute('width', maxWidth);
  canvas.setAttribute('height', maxHeight);

  // Resize tiles
  const sizeOfBox = OUTER_PADDING * 2 + MAXIMUM_LEVEL * DEFAULT_TILE_SIZE + (MAXIMUM_LEVEL - 1) * INNER_PADDING;
  if (sizeOfBox > maxWidth || sizeOfBox > maxHeight) {
    const outerMargin = 10;
    const newTileSize = (maxWidth - 2 * OUTER_PADDING - (MAXIMUM_LEVEL - 1) * INNER_PADDING - outerMargin * 2) / MAXIMUM_LEVEL;
    resizeTileSize(newTileSize);
  } else {
    resizeTileSize(50);
  }

  // Resize information panels
  if (TERMINATE_GAME_BUTTON.width + TILES_INFO.width + SCORE_INFO.width + SCORE_INFO.marginRight + TILES_INFO.marginRight > maxWidth) {
    SCORE_INFO.marginRight = 0;
    TILES_INFO.marginRight = 10;
    SCORE_INFO.width = 120;
    TILES_INFO.width = 120;
  }
};

/**
 * Add event listeners to canvas and window.
 * @param {*} canvasObject HTMLCanvasReference
 */
const addEventListeners = (canvasObject) => {
  canvasObject.addEventListener('click', (event) => {
    EventParser(game, canvas, event);
  });

  window.addEventListener('resize', resizeCanvas);
};

/**
 * Initialize javascript for the page.
 */
const pageInit = () => {
  canvas = document.getElementById('canvas');
  addEventListeners(canvas);
  ctx = canvas.getContext('2d');
  game = new Game();

  resizeCanvas(game);

  // Add Form Submit handler.
  const form = document.getElementById('submitForm');
  function handleForm(e) {
    e.preventDefault();
    const usernameInput = document.getElementById('username');
    console.log(usernameInput.value);
    console.log(game.score);
    game.goToViewHighScore();
    usernameInput.value = '';
  }
  form.addEventListener('submit', handleForm);

  // Add button onclick handlers.
  const terminateYes = document.getElementById('terminateGameYes');
  terminateYes.onclick = () => {
    game.terminateGame(true);
    const terminateModal = document.getElementById('terminateModal');
    terminateModal.style.display = 'none';
  };

  const terminateNo = document.getElementById('terminateGameNo');
  terminateNo.onclick = () => {
    const terminateModal = document.getElementById('terminateModal');
    terminateModal.style.display = 'none';
    game.resumeGame();
  };

  // Initialize Audio for Game
  const sound = new Audio();
  sound.src = './audio/bikehorn.mp3';
  audio.push(sound);
};

pageInit();
main();

export {
  game,
  canvas,
  ctx,
  audio,
};

/* eslint-disable import/no-mutable-exports */

import Game from './modules/Game.js';
import {
  MAX_HEIGHT_CANVAS, MAX_WIDTH_CANVAS,
} from './constants/constants.js';
import DrawParser from './draw/DrawParser.js';
import EventParser from './events/EventParser.js';

let canvas;
let ctx;
let game;

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

const addEventListeners = (canvasObject) => {
  canvasObject.addEventListener('click', (event) => {
    EventParser(game, canvas, event);
  });
};

const pageInit = () => {
  canvas = document.getElementById('canvas');
  addEventListeners(canvas);
  ctx = canvas.getContext('2d');
  game = new Game();

  canvas.setAttribute('width', MAX_WIDTH_CANVAS);
  canvas.setAttribute('height', MAX_HEIGHT_CANVAS);
};

pageInit();
main();

export {
  game,
  canvas,
  ctx,
};

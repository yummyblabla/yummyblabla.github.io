/* eslint-disable import/no-mutable-exports */

export const TITLE_NAME = 'Rotation Matrix';
export const TITLE_DESCRIPTION = 'Train your working memory by\n remembering the pattern of tiles';

export const MIN_WIDTH_CANVAS = 300;
export const MIN_HEIGHT_CANVAS = 300;

export const DEFAULT_TILE_SIZE = 50;
export let TILE_SIZE = 50;
export const OUTER_PADDING = 20;
export const INNER_PADDING = 10;

export const TIME_FOR_PAUSE = 250;
export const TIME_FOR_REVEAL = 1000;
export const TIME_FOR_ROTATE = 1000;
export const TIME_FOR_END_ROUND = 1000;

export const INFO_BACKGROUND_COLOUR = '#CDCDCD';
export const BOARD_COLOUR = 'brown';
export const PADDING_COLOUR = 'black';
export const REVEALED_OUTOFORDER_COLOUR = '#ffffba';
export const UNREVEALED_COLOUR = 'grey';
export const REVEALED_CORRECT_COLOUR = '#000080';
export const REVEALED_WRONG_COLOUR = 'red';
export const WHITE_COLOR = '#ffffff';
export const BLACK_COLOR = '#000000';

export const MAXIMUM_ERRORS = 3;
export const MAXIMUM_LEVEL = 7;
export const MINIMUM_LEVEL = 3;

export const SAME_LEVEL_MESSAGE = 'Try Again!';
export const NEXT_LEVEL_MESSAGE = 'Next Level!';
export const PREVIOUS_LEVEL_MESSAGE = 'Try again :(';
export const GAME_OVER_MESSAGE = 'Game over...';

export const TEXT_ALIGN_CENTER = 'center';
export const TEXT_BASELINE_TOP = 'top';
export const TEXT_BASELINE_MIDDLE = 'middle';

export const resizeTileSize = (newSize) => {
  TILE_SIZE = newSize;
};

export default class Tile {
  constructor(flagged = false, value = 0) {
    this.flagged = flagged;
    this.value = value;
    this.checked = false;
  }
}

Tile.prototype.getValue = function getValue() {
  return this.value;
};

Tile.prototype.getChecked = function getChecked() {
  return this.checked;
};

Tile.prototype.getFlag = function getFlag() {
  return this.flagged;
};

Tile.prototype.setFlag = function setFlag(value) {
  this.flagged = true;
  this.value = value;
};

Tile.prototype.checkTile = function checkTile() {
  if (!this.checked) {
    this.checked = true;
    return true;
  }
  return false;
};

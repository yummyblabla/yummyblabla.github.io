export default class Tile {
  constructor(flagged = false, value = 0) {
    this.flagged = flagged;
    this.value = value;
    this.checked = false;
    this.outOfOrderFlag = false;
  }
}

Tile.prototype.getValue = function getValue() {
  return this.value;
};

Tile.prototype.getChecked = function getChecked() {
  return this.checked;
};

Tile.prototype.getOutOfOrderFlag = function getOutOfOrderFlag() {
  return this.outOfOrderFlag;
};

Tile.prototype.getFlag = function getFlag() {
  return this.flagged;
};

Tile.prototype.setFlag = function setFlag(value) {
  this.flagged = true;
  this.value = value;
};

Tile.prototype.checkTile = function checkTile(value) {
  if (!this.checked && this.value > 0 && value !== this.value) {
    this.outOfOrderFlag = true;
    return true;
  }
  if (this.outOfOrderFlag && this.value > 0 && value === this.value) {
    this.outOfOrderFlag = false;
    this.checked = true;
    return true;
  }
  if (!this.checked) {
    this.checked = true;
    return true;
  }
  return false;
};

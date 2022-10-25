const squareState = {
  Flag: -2,
  Invisible: -1,
  Bomb: 9,
}


class Square {
  constructor() {
    this.hasBomb = false;
    this.visible = false;
    this.flag = false;
    this.neighborhood = [];
  }

  getContent() {
    if (!this.visible) {
      return this.flag ? squareState.Flag : squareState.Invisible;
    }
    if (this.hasBomb) {
      return 9;
    }
      let bombsDetected = 0;
      for (let i in this.neighborhood) {
        if (this.neighborhood[i].hasBomb) {
          bombsDetected++;
        }
      }
      return bombsDetected;
    
  }

  toggleFlag() {
    this.flag = !this.flag;
  }

  select() {
    if (this.visible || this.flag) {
      return;
    }
    this.visible = true;
    if (this.getContent() === 0) {
      for (let i in this.neighborhood) {
        const neighbor = this.neighborhood[i];
        if (!neighbor.visible) {
          neighbor.select();
        }
      }
    }
  }

  addBomb() {
    this.hasBomb = true;
  }

  addNeighbor(square) {
    this.neighborhood.push(square);
  }
}

export { Square, squareState };
const State = {
  Revealed: 0,
  Unmarked: 1,
  Flagged: 2,
  Doubt: 3,
};

class Square {
  constructor(x, y) {
    this.hasBomb = false;
    this.state = State.Unmarked;
    this.neighborhood = [];
    this.x = x;
    this.y = y;
  }

  reveal() {
    if (this.state !== State.Unmarked) {
      return;
    }
    this.state = State.Revealed;
    this.revealNeighborhood()
  }

  revealNeighborhood() {
    for (let i in this.neighborhood) {
      this.neighborhood[i].reveal();
    }
  }

  addNeighbor(square) {
    if (square instanceof Square) {
      this.neighborhood.push(square);
    }
  }

  addBomb() {
    this.hasBomb = true;
  }
}

export { Square, State }
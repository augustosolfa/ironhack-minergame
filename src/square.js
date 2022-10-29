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
    this.observers = [];
  }

  getSensorLecture() {
    if (this.hasBomb) {
      return 9;
    }
    return this.neighborhood.reduce(
      (bombs, square) => square.hasBomb ? bombs++ : false,
      0);
  }

  reveal() {
    if (this.state !== State.Unmarked) {
      return;
    }
    this.state = State.Revealed;
    this.updateObservers();
    this.revealNeighborhood();
  }

  revealNeighborhood() {
    this.neighborhood.forEach(square => square.reveal());
  }

  addNeighbor(square) {
    if (square instanceof Square) {
      this.neighborhood.push(square);
    }
  }

  addBomb() {
    this.hasBomb = true;
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  updateObservers() {
    this.observers.forEach(observer => observer.update(this));
  }
}

export { Square, State }
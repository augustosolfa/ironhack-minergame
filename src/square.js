const State = {
  Revealed: 0,
  Unmarked: 1,
  Flagged: 2,
  Doubt: 3,
};

class Square {
  constructor() {
    this.hasBomb = false;
    this.state = State.Unmarked;
    this.neighborhood = [];
    this.observers = [];
  }

  getSensorLecture() {
    return this.neighborhood.reduce(
      (bombs, square) => (square.hasBomb ? bombs + 1 : bombs),
      0
    );
  }

  reveal() {
    if (this.state !== State.Unmarked) {
      return;
    }
    this.state = State.Revealed;
    this.updateObservers();
    if (this.getSensorLecture() === 0) {
      this.revealNeighborhood();
    }
  }

  revealNeighborhood() {
    this.neighborhood.forEach((square) => square.reveal());
  }

  mark() {
    if (this.state == State.Revealed) {
      return;
    }
    switch (this.state) {
      case State.Unmarked:
        this.state = State.Flagged;
        break;
      case State.Flagged:
        this.state = State.Doubt;
        break;
      case State.Doubt:
        this.state = State.Unmarked;
        break;
    }
    this.updateObservers();
  }

  revealIfObvious() {
    if (this.state !== State.Revealed) {
      return;
    }

    const neighborStatistics = [];
    neighborStatistics[State.Revealed] = 0;
    neighborStatistics[State.Unmarked] = 0;
    neighborStatistics[State.Flagged] = 0;
    neighborStatistics[State.Doubt] = 0;

    this.neighborhood.forEach(
      (neighbor) => neighborStatistics[neighbor.state]++
    );
    if (
      !neighborStatistics[State.Doubt] &&
      neighborStatistics[State.Flagged] === this.getSensorLecture()
    ) {
      this.revealNeighborhood();
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

  addObserver(observer) {
    this.observers.push(observer);
  }

  updateObservers() {
    this.observers.forEach((observer) => observer.update(this));
  }
}

export { Square, State };

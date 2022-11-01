import { Score } from './score.js';

class Board {
  constructor(squares, width, height) {
    this.squares = squares;
    this.width = width;
    this.height = height;
    this.observers = [];
    this.score = new Score(this);
    this.subscribeSquares();
    this.notifyObservers();
  }

  update(subject) {
    this.notifyObservers();
  }

  notifyObservers() {
    this.observers.forEach((observer) => observer.update(this));
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  subscribeSquares() {
    this.squares.forEach((column) =>
      column.forEach((square) => square.subscribe(this))
    );
  }


}

export { Board };

import { Square, State } from "./square.js";

class Board {
  constructor(squares, width, height) {
    this.squares = squares;
    this.width = width;
    this.height = height;
    this.subscribeSquares();
    this.observers = [];
    this.timerInSeconds = -2;
    this.timerId = null;

    this.updateObservers();
  }

  getGameState() {
    let flaggeds = 0;
    let bombs = 0;
    let revealeds = 0;
    let bombExploded = false;
    for (let i in this.squares) {
      for (let j in this.squares[i]) {
        const square = this.squares[i][j];
        square.state === State.Flagged ? flaggeds++ : false;
        square.hasBomb ? bombs++ : false;
        square.state === State.Revealed ? revealeds++ : false;
        square.state === State.Revealed && square.hasBomb
          ? (bombExploded = true)
          : false;
      }
    }

    const playerWon =
      !bombExploded && this.width * this.height - (revealeds + bombs) === 0;
    const playerLose = bombExploded;

    if (playerWon || playerLose) {
      clearInterval(this.timerId);
    }

    return {
      unmarkedBombs: bombs - flaggeds,
      playerWon: playerWon,
      playerLose: playerLose,
      timer: this.timerInSeconds,
    };
  }

  updateObservers() {
    this.observers.forEach((observer) => observer.update(this));
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  subscribeSquares() {
    this.squares.forEach((column) =>
      column.forEach((square) => square.subscribe(this))
    );
  }

  update(subject) {
    this.updateObservers();
    if (this.timerInSeconds < -1) {
      this.timerInSeconds++;
      this.timerId = setInterval(() => {
        this.timerInSeconds++;
        this.updateObservers();
      }, 1000);
    }
  }
}

export { Board };

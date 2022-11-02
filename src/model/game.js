import { Board } from "./board.js";
import { GameState } from "./gamestate.js";

class Game {
  constructor() {
    this.board = null;
    this.timerId = null;
    this.timerSeconds = 0;
    this.observers = [];
  }

  notifyObservers(gameState) {
    this.observers.forEach((observer) => observer.update(gameState ?? new GameState(this)));
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  update() {
    if (this.timerId === null) {
      this.timerId = setInterval(() => {
        this.timerSeconds++;
        this.notifyObservers(new GameState(this));
      },
      1000);
    }
    const gameState = new GameState(this);
    if (gameState.finished) {
      this.resetTimer();
    }
    this.notifyObservers(gameState);
  }

  new(width, height, numberOfBombs) {
    this.resetTimer();
    this.board = new Board(this, width, height, numberOfBombs);
  }

  resetTimer() {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
      this.timerSeconds = 0;
    }
  }
}

export { Game };

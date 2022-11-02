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

  removeObserver(observer) {
    if (this.observers.includes(observer)) {
      this.observers.splice(this.observers.indexOf(observer), 1);
    }
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

  new(level) {
    this.resetTimer();
    this.board = new Board(this, level);
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

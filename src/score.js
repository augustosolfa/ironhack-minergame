import { Board } from "./board.js";
import { ScoreRender } from "./scorerender.js";
import { State } from "./square.js";

class Score {
  constructor(board) {
    this.observers = [];
    this.timerId = null;
    this.timerInSeconds = 0;
    this.playerWon = false;
    this.playerLose = false;
    this.unmarkedBombs = null;

    new ScoreRender(this);
    board.addObserver(this);
  }

  update(subject) {
    if(subject instanceof Board) {
      this.checkBoardState(subject);
    }
    this.notifyObservers();
  }
  
  initTimer() {
    if (this.timerId === null) {
      this.timerInSeconds = 0;
      this.timerId = setInterval(() => {
        this.timerInSeconds++;
        this.notifyObservers();
      }, 1000);
    }
  }

  stopTimer() {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  checkBoardState(board) {
    let flaggeds = 0;
    let bombs = 0;
    let revealeds = 0;
    let bombExploded = false;
    for (let i in board.squares) {
      for (let j in board.squares[i]) {
        const square = board.squares[i][j];
        square.state === State.Flagged ? flaggeds++ : false;
        square.hasBomb ? bombs++ : false;
        square.state === State.Revealed ? revealeds++ : false;
        square.state === State.Revealed && square.hasBomb
          ? (bombExploded = true)
          : false;
      }
    }

    if (revealeds === 1) {
      this.initTimer();
    }

    this.playerLose = bombExploded;
    this.playerWon =
      !bombExploded && board.width * board.height - (revealeds + bombs) === 0;

    if (this.playerWon || this.playerLose) {
      this.stopTimer();
    }

    this.unmarkedBombs = bombs - flaggeds;
  }

  notifyObservers(){
    this.observers.forEach((observer) => observer.update(this));
  }

  addObserver(observer) {
    this.observers.push(observer);
  }
}

export { Score };
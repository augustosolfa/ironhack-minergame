import { Square, State } from "./square.js";

class Board {
  constructor(squares) {
    this.squares = squares;
  }

  getGameState() {
    let flaggeds = 0;
    let bombs = 0;
    let revealeds = 0;
    let bombExploded = false;
    for (let i in this.squares) {
      this.squares[i].state === State.Flagged ? flaggeds++ : false;
      this.squares[i].hasBomb ? bombs++ : false;
      this.squares[i].state === State.Revealed ? revealeds++ : false;
      this.squares[i].state === State.Revealed && this.squares[i].hasBomb
        ? (bombExploded = true)
        : false;
    }

    return {
      unmarkedBombs: bombs - flaggeds,
      playerWon:
        !bombExploded && this.squares.length - (revealeds + bombs) === 0,
      playerLost: bombExploded,
    };
  }
}

export { Board };
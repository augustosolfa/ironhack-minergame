import { State } from './square.js';

class GameState {
  constructor(game) {
    const matrix = game.board.matrix;
    let flaggeds = 0;
    let bombs = 0;
    let revealeds = 0;
    let bombExploded = false;
    for (let i in matrix) {
      for (let j in matrix[i]) {
        const square = matrix[i][j];
        square.state === State.Flagged ? flaggeds++ : false;
        square.hasBomb ? bombs++ : false;
        square.state === State.Revealed ? revealeds++ : false;
        square.state === State.Revealed && square.hasBomb
          ? (bombExploded = true)
          : false;
      }
    }

    this.numberOfUnmarkedBombs = bombs - flaggeds;
    // this.timerSeconds = game.timerSeconds >= 0 ? game.timerSeconds : 0;
    this.timerSeconds = game.timerSeconds;
    this.playerLose = bombExploded;
    this.playerWon = !this.playerLose && revealeds + bombs === game.board.size;
    this.finished = this.playerLose || this.playerWon;
  }
}

export { GameState };

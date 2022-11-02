import { Game } from './game.js';
import { BoardRender } from './boardrender.js';
import { ScoreRender } from './scorerender.js';

class GameRender {
  constructor() {
    this.game = new Game();
    this.boardRender = null;
    this.scoreRender = new ScoreRender(this.game);
    this.addLevelEventListners();
  }

  addLevelEventListners() {
    const btnNovice = document.querySelector("#level .novice");
    btnNovice.addEventListener("click", () => this.newGame(9, 9, 10));
    const btnNormal = document.querySelector("#level .normal");
    btnNormal.addEventListener("click", () => this.newGame(16, 16, 40));
    const btnHard = document.querySelector("#level .hard");
    btnHard.addEventListener("click", () => this.newGame(16, 30, 99));

    const btnRestart = document.querySelector("#score .state");
    btnRestart.addEventListener("click", () => {
      this.restart();
    });
  }

  newGame(width, height, numberOfBombs) {
    this.game.new(width, height, numberOfBombs);
    this.boardRender = new BoardRender(this.game);
    this.game.notifyObservers();
    const levelSection = document.getElementById("level");
    const gameSection = document.getElementById("game");
    levelSection.classList.add("hide");
    gameSection.classList.remove("hide");
  }

  restart() {
    const game = document.getElementById("game");
    const level = document.getElementById("level");
    game.classList.add("hide");
    level.classList.remove("hide");
  }
}

export { GameRender };
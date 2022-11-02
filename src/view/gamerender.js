import { Game } from '../model/game.js';
import { BoardRender } from './boardrender.js';
import { ScoreRender } from './scorerender.js';
import { screenAdapt } from './style.js';

class GameRender {
  constructor() {
    this.game = new Game();
    this.boardRender = null;
    this.scoreRender = new ScoreRender(this.game);
    this.addLevelEventListners();
  }

  addLevelEventListners() {
    const btnNovice = document.querySelector("#level .novice");
    // btnNovice.addEventListener("click", () => this.newGame(9, 9, 10));
    btnNovice.addEventListener("click", () => this.newGame("novice"));
    const btnNormal = document.querySelector("#level .normal");
    // btnNormal.addEventListener("click", () => this.newGame(16, 16, 40));
    btnNormal.addEventListener("click", () => this.newGame("normal"));
    const btnHard = document.querySelector("#level .hard");
    // btnHard.addEventListener("click", () => this.newGame(16, 30, 99));
    btnHard.addEventListener("click", () => this.newGame("hard"));

    const btnRestart = document.querySelector("#score .state");
    btnRestart.addEventListener("click", () => {
      this.restart();
    });
  }

  newGame(level) {
    this.game.new(level);
    this.game.removeObserver(this.boardRender);
    this.boardRender = new BoardRender(this.game);
    this.game.notifyObservers();
    const levelSection = document.getElementById("level");
    const gameSection = document.getElementById("game");
    levelSection.classList.add("hide");
    screenAdapt(this.game.board.width, this.game.board.height);
    gameSection.classList.remove("hide");
  }

  restart() {
    const game = document.getElementById("game");
    const level = document.getElementById("level");
    game.classList.add("hide");
    screenAdapt();
    level.classList.remove("hide");
  }
}

export { GameRender };
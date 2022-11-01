import { boardGenerator } from "./boardgenerator.js";
import { BoardRender } from "./boardrender.js";

class Game {
  constructor() {
    this.board = null;
    this.addLevelEventListners();
  }

  addLevelEventListners() {
    const btnNovice = document.querySelector("#level .novice");
    btnNovice.addEventListener("click", () => this.newBoard(9, 9, 10));
    const btnNormal = document.querySelector("#level .normal");
    btnNormal.addEventListener("click", () => this.newBoard(16, 16, 40));
    const btnHard = document.querySelector("#level .hard");
    btnHard.addEventListener("click", () => this.newBoard(16, 30, 99));

    const btnRestart = document.getElementById("restart");
    btnRestart.addEventListener("click", () => {
      this.restart();
    });
  }

  newBoard(width, height, numberOfBombs) {
    this.board = new boardGenerator(width, height, numberOfBombs);
    const levelSection = document.getElementById("level");
    levelSection.classList.add("hide");
    const gameSection = document.getElementById("game");
    gameSection.classList.remove("hide");
  }

  restart() {
    const game = document.getElementById("game");
    const level = document.getElementById("level");
    game.classList.add("hide");
    level.classList.remove("hide");
  }
}

export { Game };

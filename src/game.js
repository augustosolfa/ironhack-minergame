import { boardGenerator } from "./boardgenerator.js";
import { BoardRender } from "./boardrender.js";

class Game {
  constructor() {
    this.addLevelEventListners();
  }

  addLevelEventListners() {
    const btnNovice = document.querySelector("#level .novice");
    btnNovice.addEventListener("click", () => this.newBoard(5, 5, 3));
    const btnNormal = document.querySelector("#level .normal");
    btnNormal.addEventListener("click", () => this.newBoard(15, 15, 30));
    const btnHard = document.querySelector("#level .hard");
    btnHard.addEventListener("click", () => this.newBoard(30, 30, 99));

    const btnRestart = document.getElementById("restart");
    btnRestart.addEventListener("click", () => {
      this.restart();
    });
  }

  newBoard(width, height, numberOfBombs) {
    const board = new boardGenerator(width, height, numberOfBombs);
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

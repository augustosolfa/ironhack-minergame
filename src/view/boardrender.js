import { SquareRender } from './squarerender.js';
import { endRender } from './endrender.js';
import { Ranking } from '../model/ranking.js';

class BoardRender {
  constructor(game) {
    this.game = game;
    this.node = document.createElement('div');
    this.createNode();
    game.addObserver(this);
  }

  createNode() {
    const matrix = this.game.board.matrix
    for (let i in matrix) {
      const column = document.createElement('div');
      this.node.appendChild(column);
      for (let j in matrix[i]) {
        const squareRender = new SquareRender(matrix[i][j]);
        column.append(squareRender.root);
      }
    }
    
    this.node.id = "board";
    const gameNode = document.getElementById("game");
    const oldBoardNode = gameNode.querySelector("#board");
    if (oldBoardNode) {
      gameNode.removeChild(oldBoardNode);
    }
    gameNode.appendChild(this.node);
  }

  update(gameState) {
    if (gameState.finished) {
      this.node.classList.add("ended");
      if (gameState.playerLose) {
        playSound("./sound/egg-crack.mp3");
      }
      if (gameState.playerWon) {
        playSound("./sound/rooster.mp3");
      }
      endRender(this);
      new Ranking().add(gameState);
    }
  }
}

function playSound(file) {
  const eggCrack = new Audio(file);
  eggCrack.loop = false;
  eggCrack.play();
}

export { BoardRender };
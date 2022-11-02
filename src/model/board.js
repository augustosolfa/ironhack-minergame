import { Square } from "./square.js";

class Board {
  constructor(game, level) {
    this.level = level;
    this.width = null;
    this.height = null;
    this.matrix = this.createGameMatrix(game, level);
    this.size = this.width * this.height;
    this.game = game;
  }

  update() {
    this.game.update();
  }

  createGameMatrix(game, level) {
    let numberOfBombs;
    switch(level){
      case "novice":
        this.width = 9;
        this.height = 9;
        numberOfBombs = 10;
        break;
      case "normal":
        this.width = 16;
        this.height = 16;
        numberOfBombs = 40;
        break;
      case "hard":
        this.width = 20;
        this.height = 24;
        numberOfBombs = 99;
        break;
    }
    const matrix = createEmptyMatrix(game, this.width, this.height);
    addBombsToMatrix(matrix, numberOfBombs);
    addNeighborhood(matrix, this.width, this.height);
    return matrix;

    function createEmptyMatrix(game, width, height) {
      const matrix = [];
      for (let i = 0; i < width; i++) {
        const column = [];
        matrix.push(column);
        for (let j = 0; j < height; j++) {
          const square = new Square();
          square.addObserver(game);
          column.push(square);
        }
      }
      return matrix;
    }

    function addBombsToMatrix(matrix, numberOfBombs) {
      const positions = getRandomPositions(matrix, numberOfBombs);
      positions.forEach((position) => {
        matrix[position.x][position.y].addBomb();
      });
    }

    function getRandomPositions(matrix, numberOfPositionsToReturn) {
      // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
      const positions = matrix
        .map((v, i) =>
          v.map((_, j) => {
            return { x: i, y: j };
          })
        )
        .flat();
      for (let i = positions.length; i > 0; i--) {
        const randomPosition = Math.floor(Math.random() * i);
        const tmp = positions[i - 1];
        positions[i - 1] = positions[randomPosition];
        positions[randomPosition] = tmp;
      }
      return positions.slice(0, numberOfPositionsToReturn);
    }

    function addNeighborhood(matrix, width, height) {
      for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
          const currentSquare = matrix[i][j];
          for (
            let x = Math.max(i - 1, 0);
            x <= Math.min(i + 1, width - 1);
            x++
          ) {
            for (
              let y = Math.max(j - 1, 0);
              y <= Math.min(j + 1, height - 1);
              y++
            )
              if (x !== i || y !== j) {
                matrix[x][y].addNeighbor(currentSquare);
              }
          }
        }
      }
    }
  }
}

export { Board };

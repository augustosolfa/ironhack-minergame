import { Square } from "./square.js";

class Board {
  constructor(game, width, height, numberOfBombs) {
    this.matrix = this.createGameMatrix(game, width, height, numberOfBombs);
    this.size = width * height;
    this.game = game;
  }

  update() {
    this.game.update();
  }

  createGameMatrix(game, width, height, numberOfBombs) {
    const matrix = createEmptyMatrix(game, width, height);
    addBombsToMatrix(matrix, numberOfBombs);
    addNeighborhood(matrix, width, height);
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

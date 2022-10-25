import { Board } from "./board.js";
import { Square } from "./square.js";

function boardCreator(placeholderId, width, height, bombs) {
  const placeholder = document.getElementById(placeholderId);
  switch (arguments.length) {
    case 0:
      throw new Error("É necessário fornecer o Id do elemento root.");
    case 1:
      width = 5;
    case 2:
      height = width;
    case 3:
      bombs = Math.floor(Math.random() * (width * height));
  }

  const board = new Board(placeholder, matrixCreator(width, height));
  addBombs(board, bombs);
  addNeighbors(board);
}

function matrixCreator(width, height) {
  const matrix = [];
  for (let i = 0; i < width; i++) {
    matrix[i] = [];
    for (let j = 0; j < height; j++) {
      matrix[i][j] = new Square();
    }
  }
  return matrix;
}

function addBombs(board, bombs) {
  const coordinates = [];
  for (let i in board.matrix) {
    for (let j in board.matrix[i]) {
      coordinates.push([i, j]);
    }
  }
  bombs = bombs <= coordinates.length ? bombs : coordinates.length;
  for (let h = 0; h < bombs; h++) {
    const i = coordinates[h][0];
    const j = coordinates[h][1];
    board.matrix[i][j].addBomb();
  }
}

function addNeighbors(board) {
  for (let i = 0; i < board.matrix.length; i++) {
    for (let j = 0;  j < board.matrix[i].length; j++) {
      const square = board.matrix[i][j];
      for (let x = i - 1; x <= i + 1; x++) {
        for (let y = j - 1; y <= j + 1; y++) {
          if (
            (x === i && y === j) ||
            x < 0 ||
            y < 0 ||
            x >= board.matrix.length ||
            y >= board.matrix[i].length
          ) {
            continue;
          } else {
          square.addNeighbor(board.matrix[x][y]);
          }
        }
      }
    }
  }
}

export { boardCreator };

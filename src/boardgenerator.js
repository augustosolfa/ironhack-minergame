import { Board } from "./board.js";
import { Square } from "./square.js";
import { ScoreRender } from "./scorerender.js";
import { BoardRender } from "./boardrender.js";

function boardGenerator(width, height, numberOfBombs) {
  const squares = createSquares(width, height);
  addBombs(squares, numberOfBombs);
  addNeighborhood(squares, width, height);

  const board = new Board(squares, width, height);
  const gameNode = document.getElementById('game');
  const boardNodeOld = document.getElementById("board");
  if (boardNodeOld) {
    gameNode.removeChild(boardNodeOld);
  }
  const scoreRender = new ScoreRender(board);
  const boardRender = new BoardRender(board);
  
  gameNode.appendChild(boardRender.root);

}

function createSquares(width, height) {
  const squares = [];
  for (let i = 0; i < width; i++) {
    const column = [];
    squares.push(column);
    for (let j = 0; j < height; j++) {
      column.push(new Square(i, j));
    }
  }

  return squares;
}

function addBombs(squares, numberOfBombs) {
  const positions = getRandomPositions(squares, numberOfBombs);
  positions.forEach((position) => {
    squares[position.x][position.y].addBomb();
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

function addNeighborhood(squares, width, height) {
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const currentSquare = squares[i][j];
      for (let x = Math.max(i - 1, 0); x <= Math.min(i + 1, width - 1); x++) {
        for (let y = Math.max(j - 1, 0); y <= Math.min(j + 1, height - 1); y++)
          if (x !== i || y !== j) {
            squares[x][y].addNeighbor(currentSquare);
          }
      }
    }
  }
}

export { boardGenerator };
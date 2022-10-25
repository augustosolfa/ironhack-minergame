import { Square } from './square.js';

class Board {
  constructor(width, height, bombs) {
    this.width = width;
    this.height = height;
    this.squares = this.createSquares();
    this.addBombs(bombs);
  }

  getContent(x, y) {
    try {
      if (this.squares[x][y].isVisible) {
        return this.squares[x][y].getContent();
      }
    }
    catch (e) {
      return null;
    }
  }

  isVisible(x, y) {
    try {
      return this.squares[x][y].isVisible();
    }
    catch (e) {
      return null;
    }
  }

  select(x, y) {
    this.squares[x][y].select();
  }

  createSquares() {
    const squares = [];
    for (let i = 0; i < this.width; i++) {
      squares.push([]);
      for (let j = 0; j < this.height; j++) {
        squares[i].push(new Square(i, j));
      }
    }

    return squares;
  }

  addBombs(bombs) {
    const coordinates = [];
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        coordinates.push([i, j]);
      }
    }
    coordinates.sort(() => 0.5 - Math.random());

    bombs = bombs <= coordinates.length ? bombs : coordinates.length;
    for (let i = 0; i < bombs; i++) {
      console.log(coordinates[i][0], coordinates[i][1]);
      const square = this.squares[coordinates[i][0]][coordinates[i][1]];
      square.addBomb();
    }
  }
}

export { Board };
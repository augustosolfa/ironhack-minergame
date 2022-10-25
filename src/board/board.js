import { Square } from './square.js';
import { Render } from './render.js';

class Board {
  constructor(placeholder, matrix) {
    this.matrix = matrix;
    this.render = new Render(this, placeholder);
    this.renderize();
  }

  getContent(x, y) {
    return this.matrix[x][y].getContent();
  }

  click(e, x, y) {
    const target = this.matrix[x][y];
    if (e.button === 2) {
      target.toggleFlag();
    } else {
      target.select();
    }
    this.renderize();
    console.log(target.getContent());
  }

  // select(x, y) {
  //   this.matrix[x][y].select();
  //   this.renderize();
  // }

  // toggleFlag(x, y) {
  //   this.matrix[x][y].toggleFlag();
  //   this.renderize();
  // }

  renderize() {
    this.render.renderize();
  }
}

export { Board };

// constructor(width, height, bombs) {
//   this.width = width;
//   this.height = height;
//   this.squares = this.createSquares();
//   this.addBombs(bombs);
// }

// getContent(x, y) {
//   try {
//     if (this.squares[x][y].isVisible) {
//       return this.squares[x][y].getContent();
//     }
//   }
//   catch (e) {
//     return null;
//   }
// }

// isVisible(x, y) {
//   try {
//     return this.squares[x][y].isVisible();
//   }
//   catch (e) {
//     return null;
//   }
// }

// select(x, y) {
//   this.squares[x][y].select();
// }

// createSquares() {
//   const squares = [];
//   for (let i = 0; i < this.width; i++) {
//     squares.push([]);
//     for (let j = 0; j < this.height; j++) {
//       squares[i].push(new Square(i, j));
//     }
//   }

//   return squares;
// }

// addBombs(bombs) {
//   const coordinates = [];
//   for (let i = 0; i < this.width; i++) {
//     for (let j = 0; j < this.height; j++) {
//       coordinates.push([i, j]);
//     }
//   }
//   coordinates.sort(() => 0.5 - Math.random());

//   bombs = bombs <= coordinates.length ? bombs : coordinates.length;
//   for (let i = 0; i < bombs; i++) {
//     console.log(coordinates[i][0], coordinates[i][1]);
//     const square = this.squares[coordinates[i][0]][coordinates[i][1]];
//     square.addBomb();
//   }
// }
import { Board } from './board.js';

class Input {
  constructor(board) {
    this.board = board;
    this.render = null;
  }
  squareClick(x, y) {
    this.board.select(x, y);
    this.render.renderize();
  }
}

export { Input };
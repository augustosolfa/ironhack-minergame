import { boardGenerator } from './boardgenerator.js';
import { BoardRender } from './boardrender.js';

class Game {
  constructor(root) {
    this.root = root;
    const board = new boardGenerator(3, 3, 2);
    const boardRender = new BoardRender(board);
    this.root.appendChild(boardRender.root);
  }
}

export { Game };
import { SquareRender } from './squarerender.js';

class BoardRender {
  constructor(board) {
    this.root = this.createRoot(board);
    board.subscribe(this);
  }

  createRoot(board) {
    const root = document.createElement('div');
    root.id = "board";
    for (let i in board.squares) {
      const column = document.createElement('div');
      root.appendChild(column);
      for (let j in board.squares[i]) {
        const squareRender = new SquareRender(board.squares[i][j]);
        column.append(squareRender.root);
      }
    }

    return root;
  }

  update(board) {
    const gameState = board.getGameState();
    if (gameState.playerWon || gameState.playerLose) {
      this.root.classList.add("ended");
    }
  }
}

export { BoardRender };
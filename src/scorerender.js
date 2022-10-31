class ScoreRender {
  constructor(board) {
    board.subscribe(this);
    this.update(board);
  }

  update(board) {
    const gameState = board.getGameState();
    
    const unmarkedBombs = document.getElementById("unmarked-bombs");
    unmarkedBombs.innerText = gameState.unmarkedBombs;

    const timer = document.getElementById("timer");
    timer.innerText = gameState.timer >= 0 ? gameState.timer : 0;

    const gameStateDom = document.getElementById("state");
    if(gameState.playerWon) {
      gameStateDom.innerText = "You won!";
    }
    if(gameState.playerLose) {
      gameStateDom.innerText = "You lose!";
    }
  }
}

export { ScoreRender };
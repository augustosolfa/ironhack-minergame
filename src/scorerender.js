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
    timer.innerText = this.formatTimer(gameState.timer);

    const gameStateDom = document.getElementById("state");
    if(!(gameState.playerWon||gameState.playerLose)){
      gameStateDom.innerText="";
    }
    if(gameState.playerWon) {
      gameStateDom.innerText = "You won!";
    }
    if(gameState.playerLose) {
      gameStateDom.innerText = "You lose!";
    }
  }

  formatTimer(numberOfSeconds) {
    numberOfSeconds = numberOfSeconds >= 0 ? numberOfSeconds : 0;
    return `${ Math.floor(numberOfSeconds / 60) }:${ ("0" + (numberOfSeconds % 60)).slice(-2, 3) }`
  }
}

export { ScoreRender };
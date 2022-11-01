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
      gameStateDom.innerHTML="";
    }
    if(gameState.playerWon) {
      gameStateDom.innerHTML = '<img src="./img/emoji-sunglasses.svg">';
    }
    if(gameState.playerLose) {
      gameStateDom.innerHTML = '<img src="./img/emoji-dizzy.svg">';
    }
  }

  formatTimer(numberOfSeconds) {
    numberOfSeconds = numberOfSeconds >= 0 ? numberOfSeconds : 0;
    return `${ Math.floor(numberOfSeconds / 60) }:${ ("0" + (numberOfSeconds % 60)).slice(-2, 3) }`
  }
}

export { ScoreRender };
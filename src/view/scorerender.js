class ScoreRender {
  constructor(game) {
    this.unmarkedBombsNode = document.querySelector("#score .unmarked-bombs");
    this.stateNode = document.querySelector("#score .state");
    this.timerNode = document.querySelector("#score .timer");
    game.addObserver(this);
  }

  update(gameState) {
    this.unmarkedBombsNode.innerText = gameState.numberOfUnmarkedBombs;
    this.timerNode.innerText = formatTimer(gameState.timerSeconds);

    let stateImgSrc = "./img/emoji-smile.svg";
    if (gameState.playerWon) {
      stateImgSrc = "./img/emoji-sunglasses.svg";
    }
    if (gameState.playerLose) {
      stateImgSrc = "./img/emoji-dizzy.svg";
    }
    this.stateNode.innerHTML = `<img src="${stateImgSrc}">`
  }

}

function formatTimer(timer) {
  const minutes = Math.floor(timer / 60);
  const seconds = ("0" + (timer % 60)).slice(-2,3);
  return `${minutes}:${seconds}`;
}

export { ScoreRender };
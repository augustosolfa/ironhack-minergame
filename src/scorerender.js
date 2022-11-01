class ScoreRender {
  constructor(score) {
    this.node = document.getElementById("score");
    this.populateNode();
    this.unmarkedBombs = this.node.querySelector(".unmarked-bombs");
    this.timer = this.node.querySelector(".timer");
    this.state = this.node.querySelector(".state");
    score.addObserver(this);
    this.update(score);
  }

  update(score) {
    this.unmarkedBombs.innerText = score.unmarkedBombs;

    this.timer.innerText = this.formatTimer(score.timerInSeconds);

    if (!(score.playerWon || score.playerLose)) {
      this.state.innerHTML = "";
    }
    if (score.playerWon) {
      this.state.innerHTML = '<img src="./img/emoji-sunglasses.svg">';
    }
    if (score.playerLose) {
      this.state.innerHTML = '<img src="./img/emoji-dizzy.svg">';
    }
  }

  populateNode() {
    while (this.node.hasChildNodes()) {
      this.node.removeChild(this.node.lastChild);
    }
    const unmarkedBombs = document.createElement('p');
    unmarkedBombs.classList.add("unmarked-bombs");
    this.node.appendChild(unmarkedBombs);
    const state = document.createElement('div');
    state.classList.add("state");
    this.node.appendChild(state);
    const timer = document.createElement('p');
    timer.classList.add("timer");
    this.node.appendChild(timer);
  }

  formatTimer(numberOfSeconds) {
    numberOfSeconds = numberOfSeconds >= 0 ? numberOfSeconds : 0;
    return `${Math.floor(numberOfSeconds / 60)}:${(
      "0" +
      (numberOfSeconds % 60)
    ).slice(-2, 3)}`;
  }
}

export { ScoreRender };

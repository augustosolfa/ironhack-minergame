class Ranking {
  constructor() {
    if (!localStorage.getItem("ranking")) {
      const emptyRanking = JSON.stringify({
        novice: [],
        normal: [],
        hard: [],
      });
      localStorage.setItem("ranking", emptyRanking);
    }
    this.bestTimes = JSON.parse(localStorage.getItem("ranking"));
  }

  add(gameState) {
    if (!gameState.playerWon) {
      return;
    }
    this.bestTimes[gameState.level].push({
      date: Date.now(),
      seconds: gameState.timerSeconds,
    });
    this.bestTimes[gameState.level].sort((a, b) => a.seconds - b.seconds);
    this.bestTimes[gameState.level] = this.bestTimes[gameState.level].slice(0, 5);
    this.save();
  }

  save() {
    localStorage.setItem("ranking", JSON.stringify(this.bestTimes));
  }
}

export { Ranking };

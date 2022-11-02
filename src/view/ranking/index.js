import { Ranking } from "../../model/ranking.js";

window.addEventListener("load", () => {
  showRanking();
});

function showRanking() {
  const root = document.querySelector("main");
  const ranking = new Ranking().bestTimes;

  for (let level in ranking) {
    const levelDiv = document.createElement("div");
    levelDiv.classList.add("level");
    root.appendChild(levelDiv);
    const header = document.createElement("h2");
    header.innerText = level;
    levelDiv.appendChild(header);
    for (let row in ranking[level]) {
      const rowData = ranking[level][row];
      const date = new Date(parseInt(rowData.date)).toDateString();
      const rowNode = document.createElement("p");
      rowNode.innerHTML = `<span>${date}</span><span>${formatTime(
        rowData.seconds
      )}</span>`;
      levelDiv.appendChild(rowNode);
    }
  }
}

function formatTime(seconds) {
  const minutes = ("0" + Math.floor(seconds / 60)).slice(-2, 6);
  const secondsRemain = ("0" + (seconds % 60)).slice(-2, 6);
  return `${minutes}:${secondsRemain}`;
}

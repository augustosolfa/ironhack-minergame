import { State } from "../model/square.js";

function endRender(boardRender) {
  const logicalMatrix = boardRender.game.board.matrix;
  const boardNode = boardRender.node;

  for (let i in logicalMatrix) {
    for (let j in logicalMatrix[i]) {
      const logicalSquare = logicalMatrix[i][j];
      const nodeSquare = boardNode.childNodes[i].childNodes[j];
      if (logicalSquare.state === State.Revealed) {
        continue;
      }
      if (logicalSquare.state !== State.Flagged && logicalSquare.hasBomb) {
        nodeSquare.innerHTML = '<img src="./img/egg-fill.svg">';
        continue;
      }
      if (logicalSquare.state === State.Flagged && !logicalSquare.hasBomb) {
        nodeSquare.innerText = "X";
      }
    }
  }
}

export { endRender };
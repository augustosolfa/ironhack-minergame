import { State } from "../model/square.js";

function endRender(boardRender) {
  const logicalMatrix = boardRender.game.board.matrix;
  const boardNode = boardRender.node;

  for (let i in logicalMatrix) {
    const nodeRow = boardNode.childNodes[i];
    for (let j in logicalMatrix[i]) {
      const logicalSquare = logicalMatrix[i][j];
      const nodeSquare = nodeRow.childNodes[j];
      if (!nodeSquare) {
        console.log(nodeSquare, i, j);
      }
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
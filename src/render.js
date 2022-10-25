import { Board } from "./board.js";

class Render {
  constructor(board, input) {
    this.logicalBoard = board;
    this.input = input;
    input.render = this;
  }

  renderize() {
    const root = document.createElement("div");
    root.classList = "board";
    for (let i in this.logicalBoard.squares) {
      const row = document.createElement("div");
      row.classList = "row";
      for (let j in this.logicalBoard.squares[i]) {
        const square = document.createElement("button");
        square.classList = "square";
        if (this.logicalBoard.isVisible(i, j)) {
          square.classList += " visible";
        } else {
          square.classList += " invisible";
          square.addEventListener("click", ()=>this.input.squareClick(i, j));
        }
        if (square.hasFlag) {
          square.innerHTML = "<img src='./img/flag.png'>";
        }
        row.appendChild(square);
      }
      root.appendChild(row);
    }

    const placeholder = document.getElementById("placeholder");
    placeholder.removeChild(placeholder.lastChild);
    placeholder.appendChild(root);
    return root;
  }
}

export { Render };

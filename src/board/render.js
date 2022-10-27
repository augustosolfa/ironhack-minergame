import { squareState } from './square.js';

class Render {
  constructor(board, placeholder) {
    this.logicalBoard = board;
    this.placeholder = placeholder;
  }

  renderize() {
    const root = document.createElement("div");
    root.classList = "board";
    for (let i in this.logicalBoard.matrix) {
      const row = document.createElement("div");
      row.classList = "row";
      for (let j in this.logicalBoard.matrix[i]) {
        const square = document.createElement("button");
        square.classList = "square";

        const squareContent = this.logicalBoard.getContent(i, j);
        if (squareContent > squareState.Invisible) {
          square.classList += " visible";
          switch(squareContent) {
            case squareState.Bomb:
              square.innerHTML = '<img src="./img/bomb.svg">';
              break;
            case squareState.Empty:
              break;
            default:
              square.innerText = squareContent;
          }
        } else {
          square.classList += " invisible";
          square.oncontextmenu = ()=> false;
          square.addEventListener("mousedown", (e)=>this.logicalBoard.click(e, i, j));
          if (squareContent === squareState.Flag) {
            square.innerHTML = '<img src="./img/flag.svg">';
          }
        }
        row.appendChild(square);
      }
      root.appendChild(row);
    }
    
    this.placeholder.removeChild(this.placeholder.lastChild);
    this.placeholder.appendChild(root);

    if (this.logicalBoard.bombExploded) {
      this.message("You lose, loser!");
    }
    if (this.logicalBoard.playerWon) {
      this.message("You won, this time...");
    }
  }
  
  message(text) {
    const paragraph = document.createElement("p");
    paragraph.innerText = text;
    this.placeholder.appendChild(paragraph);
  }
}

export { Render };

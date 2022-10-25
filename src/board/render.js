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
        if (this.logicalBoard.getContent(i, j) >=0) {
          square.classList += " visible";
          square.innerText = this.logicalBoard.getContent(i, j);
        } else {
          square.classList += " invisible";
          square.addEventListener("click", ()=>this.logicalBoard.select(i, j));
        }
        row.appendChild(square);
      }
      root.appendChild(row);
    }

    this.placeholder.removeChild(this.placeholder.lastChild);
    this.placeholder.appendChild(root);
  }
}

export { Render };

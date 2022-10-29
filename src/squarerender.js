import { Square, State } from "./square.js";

class SquareRender {
  constructor(square) {
    this.square = square;
    this.root = document.createElement('div');
    square.subscribe(this);
    this.update(square);
  }

  update(square) {
    this.clear();
    if (square.state === State.Revealed && !square.hasBomb) {
      this.root.innerText = square.getSensorLecture();
    }
  }

  clear() {
    while(this.root.firstChild) {
      this.root.firstChild.remove();
    }
  }
}
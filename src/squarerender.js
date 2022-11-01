import { Square, State } from "./square.js";

class SquareRender {
  constructor(square) {
    this.square = square;
    this.root = document.createElement("div");
    this.addEventListeners();
    square.subscribe(this);
    this.update(square);
  }

  update(square) {
    this.clear();
    
    let classes = "square ";
    square.state === State.Revealed ? classes += "revealed" : classes += "unrevealed";
    this.root.classList = classes;


    let innerHTML = "";

    if (square.state === State.Revealed && !square.hasBomb) {
      const lecture = square.getSensorLecture();
      innerHTML = `<span>${lecture > 0 ? lecture : ""}</span>`;
    }
    if (square.state === State.Revealed && square.hasBomb) {
      innerHTML = `<img src="./img/egg-fried.svg" alt="explosion">`;
    }
    if (square.state === State.Flagged) {
      innerHTML = `<img src="./img/flag-fill.svg" alt="flagged">`;
    }
    if (square.state === State.Doubt) {
      innerHTML = `<img src="./img/question-lg.svg" alt="doubt">`;
    }

    this.root.innerHTML = innerHTML;
  }

  clear() {
    while (this.root.firstChild) {
      this.root.firstChild.remove();
    }
  }

  addEventListeners() {
    this.root.addEventListener("click", () => this.square.reveal());
    this.root.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      this.square.mark();
    });
    this.root.addEventListener("dblclick", () => this.square.revealIfObvious());
  }
}

export { SquareRender };
import { Square, squareState } from './square.js';
import { Render } from './render.js';

class Board {
  constructor(placeholder, matrix) {
    this.matrix = matrix;
    this.bombExploded = false;
    this.playerWon = false;
    this.render = new Render(this, placeholder);
    this.renderize();
  }

  getContent(x, y) {
    return this.matrix[x][y].getContent();
  }

  click(e, x, y) {
    if (this.bombExploded || this.playerWon) {
      return;
    }
    const target = this.matrix[x][y];
    if (e.button === 2) {
      target.toggleFlag();
    } else {
      target.select();
      this.bombExploded = target.getContent() === squareState.Bomb;
    }
    this.playerWon = this.checkPlayerWin();
    console.log(this);
    this.renderize();
  }

  renderize() {
    this.render.renderize();
  }

  checkPlayerWin() {
    return !this.matrix.reduce((remainSquare, row)=>{
      return remainSquare || row.reduce((remainSquare, square)=>{
        return remainSquare || !(square.visible || square.hasBomb)
      },
      false
      )
    }, false
    );
  }
}

export { Board };

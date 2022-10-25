class Square {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.content = 0;
    this.visible = false;
    this.flag = false;
  }

  getContent() {
    return this.content;
  }

  isVisible() {
    return this.visible;
  }

  toggleFlag() {
    this.flag ? false : true;
  }

  hasFlag() {
    return !this.visible && this.flag; 
  }

  select() {
    this.visible = true;
    console.log(this);
  }

  addBomb() {
    this.content = 9;
  }
}

export { Square };
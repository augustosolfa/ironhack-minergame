function screenAdapt(columns, rows) {
  const bodyNode = document.querySelector('body');
  const width = window.innerWidth;
  const height = window.innerHeight;
  // bodyNode.style.fontSize = Math.floor(width/columns/1.7) + "px";
  // console.log(width, height);
  let fontSize = Math.floor(20 + 0.005 * width);
  if (columns && width <= 600) {
    const squareSide = 1.7;
    fontSize = Math.floor(width/columns/squareSide);
  }
  console.log(fontSize);
  bodyNode.style.fontSize = fontSize + "px";
}

export { screenAdapt };
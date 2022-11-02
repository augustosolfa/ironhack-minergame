import { GameRender } from './view/gamerender.js';
import { screenAdapt } from './view/style.js';

window.addEventListener(
  'load',
  () => {
    const gameRender = new GameRender();
    screenAdapt();
  }
)

// window.addEventListener(
//   'resize',
//   () => {
//     screenAdapt();
//   }
// )
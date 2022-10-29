import { Game } from './game.js';

window.addEventListener(
  'load',
  () => {
    const gameRoot = document.getElementById('game');
    const game = new Game(gameRoot);
  }
)
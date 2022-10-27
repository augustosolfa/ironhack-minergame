import { boardCreator } from './board/boardcreator.js';

window.addEventListener(
  'load',
  () => {
    const placeholder = document.getElementById('placeholder');
    const leveDiv = document.getElementById('level-selection');

    const btnsLevel = document.querySelectorAll('button.level');
    for (let i in btnsLevel) {
      btnsLevel[i].addEventListener(
        'click',
        (e) => {
          console.log(e);
          switch (e.target.id) {
            case 'levelNovice':
              boardCreator(placeholder, 5, 5, 3);
              break;
            case 'levelNormal':
              boardCreator(placeholder, 10, 10, 20);
              break;
            case 'levelHard':
              boardCreator(placeholder, 15, 15, 60);
              break;
          }
          placeholder.removeChild(leveDiv);
        }
        )
    }
  }
)
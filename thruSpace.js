import { getDiceSet } from './index.js';
import { create, bindReference } from './render.js';

const refs = {};

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const xRange = getDiceSet(`5d${Math.round(screenWidth/5)}`);
const yRange = getDiceSet(`2d${Math.round(screenHeight/2)}`);

const body = document.body;

const starLife = 1000

function drawStar(id) {
  body.appendChild(create('div', {
    style: {
      left: `${xRange.roll()}px`,
      top: `${yRange.roll()}px`,
      width: '2px',
      height: '2px',
      position: 'absolute',
      borderRadius: '2px',
      backgroundColor: 'white'
    },
    ref: bindReference(refs, `star-${id}`),
  }));
  let starLifeTimerId = setTimeout(() => {
    refs[`star-${id}`].remove();
    clearTimeout(starLifeTimerId);
  }, starLife);
}

const delay = 16;
let starCount = 0;

let drawStartTimerId = setTimeout(function tick() {
  drawStar(starCount++);

  if (starCount < 1000) drawStartTimerId = setTimeout(tick, delay); // (*)
}, delay);

import { getDiceSet } from './index.js';
import { create, bindReference } from './render.js';

const refs = {};

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const xRange = getDiceSet(`5d${Math.round(screenWidth/5)}`);
const yRange = getDiceSet(`2d${Math.round(screenHeight/2)}`);

const body = document.body;

function drawStar() {
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
  }));
}

const delay = 16;

let drawStartTimerId = setTimeout(function tick() {
  // drawStar();
  drawStartTimerId = setTimeout(tick, delay); // (*)
}, delay);

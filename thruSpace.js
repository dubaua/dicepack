import { getDiceSet } from './index.js';
import { create } from './render.js';

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const screenCenterX = Math.floor(screenWidth / 2);
const screenCenterY = Math.floor(screenHeight / 2);

// const xRange = getDiceSet(`d${Math.round(screenWidth)}`);
// const yRange = getDiceSet(`d${Math.round(screenHeight)}`);
const xRange = getDiceSet(`4d${Math.round(screenWidth / 4)}`);
const yRange = getDiceSet(`2d${Math.round(screenHeight / 2)}`);
// const xRange = getDiceSet(`8d${Math.round(screenWidth / 8)}`);
// const yRange = getDiceSet(`4d${Math.round(screenHeight / 4)}`);

const body = document.body;

const SPEED = 3000;
const EASEING = 'cubic-bezier(0.55, 0.06, 0.68, 0.19)';
const STAR_SIZE = 1;
const STAR_SCALE = 6;
const STARS_PER_FRAME = 3;

const style = document.createElement('style');
style.appendChild(
  document.createTextNode(`
.star {
  width: ${STAR_SIZE}px;
  height: ${STAR_SIZE}px;
  transition: transform ${SPEED}ms ${EASEING};
}
`)
);
document.head.appendChild(style);

function createStar() {
  const x = xRange.roll();
  const y = yRange.roll();
  const element = create('div.star', {
    style: {
      left: `${x}px`,
      top: `${y}px`,
    },
  });
  return { element, x, y };
}

function getNext({ x, y }) {
  const posX = x - screenCenterX;
  const posY = y - screenCenterY;
  const rad = Math.atan2(posY, posX);
  const nextX = screenCenterX * Math.cos(rad) * 1.1;
  const nextY = screenCenterY * Math.sin(rad) * 1.1;
  return { x: nextX, y: nextY };
}

window.t = setInterval(function tick() {
  const constellation = [];

  for (let i = 0; i < STARS_PER_FRAME; i++) {
    const star = createStar();
    constellation.push(star);
    body.appendChild(star.element);
  }

  setTimeout(() => {
    constellation.forEach(star => {
      const { x, y } = getNext(star);
      star.element.style.transform = `translate(${x}px, ${y}px) scale(${STAR_SCALE})`;
    })
  }, 16);

  setTimeout(() => {
    constellation.forEach(star => {
      star.element.remove();
    })
  }, SPEED);
}, 16);

window.stop = function() {
  clearInterval(window.t);
};

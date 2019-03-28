import { getDiceSet } from './index.js';
import { create, bindReference } from './render.js';

const refs = {};
const fpsDelay = fpsDelay;

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const screenCenterX = Math.floor(screenWidth / 2);
const screenCenterY = Math.floor(screenHeight / 2);

const xRange = getDiceSet(`4d${Math.round(screenWidth / 4) }`);
const yRange = getDiceSet(`2d${Math.round(screenHeight / 2) }`);

const body = document.body;

const STAR_LIFE = 2000;
const EASEING = 'cubic-bezier(0.55, 0.06, 0.68, 0.19)';
const STAR_SIZE = 2;
const STAR_SCALE = 5;
const starsAtMoment = 600;

function drawStar(id) {
  const x = xRange.roll();
  const y = yRange.roll();
  body.appendChild(
    create('div.star', {
      style: {
        width: `${STAR_SIZE}px`,
        height: `${STAR_SIZE}px`,
        left: `${x}px`,
        top: `${y}px`,
        transition: `transform ${STAR_LIFE}ms ${EASEING}`,
      },
      ref: bindReference(refs, `star-${id}`),
    })
  );
  const posX = x - screenCenterX;
  const posY = y - screenCenterY;
  const hypot = Math.sqrt(Math.pow(posX, 2) + Math.pow(posY, 2));
  const sin = posX / hypot;
  const cos = posY / hypot;
  const nextX = posX + screenCenterX * sin * 1.1;
  const nextY = posY + screenCenterX * cos * 1.1;

  let starShootTimerId = setTimeout(() => {
    refs[`star-${id}`].style.transform = `translate(${nextX}px, ${nextY}px) scale(${STAR_SCALE})`;
    clearTimeout(starShootTimerId);
  }, fpsDelay);

  let starDeathTimerId = setTimeout(() => {
    refs[`star-${id}`].remove();
    clearTimeout(starDeathTimerId);
  }, STAR_LIFE);
}

let starCount = 0;


const delay = STAR_LIFE / starsAtMoment;

let drawStartTimerId = setTimeout(function tick() {
  drawStar(starCount++);

  drawStartTimerId = setTimeout(tick, 16);
}, 16);

import { getDiceSet } from './index.js';
import { create } from './render.js';

const field = document.getElementById('space');
const ctx = field.getContext('2d');
const stars = {};

const settings = {
  speed: {
    min: 1,
    max: 5,
    value: 3,
    step: 0.5,
  },
  starSize: {
    min: 1,
    max: 5,
    value: 1,
    step: 1,
  },
  depth: {
    min: 1,
    max: 5,
    value: 1,
    step: 0.5,
  },
  entropy: {
    min: 0,
    max: 1,
    value: 0.2,
    step: 0.1,
  },
  starsDensity: {
    min: 1e-3,
    max: 1e-4,
    value: 1e-3,
    step: 1e-4,
  },
  gravity: {
    min: 1,
    max: 5,
    value: 2,
    step: 0.5,
  },
};

let starIndex = 0;
let numStars = 0;
let starsToDraw;
let screenWidth;
let screenHeight;
let screenCenterY;
let xRange;
let yRange;

class Star {
  constructor() {
    this.x = xRange.roll();
    this.y = yRange.roll();

    this.distance = Math.abs(this.y - screenCenterY) / screenCenterY;
    this.acceleration = settings.speed.value;
    this.acceleration += settings.depth.value * easingSinusoidalIn(this.distance);
    this.acceleration += settings.entropy.value - Math.random() * settings.entropy.value;

    starIndex++;
    stars[starIndex] = this;

    this.color = 'white';
    this.id = starIndex;
  }

  draw() {
    this.x = this.x - this.acceleration;

    if (this.x < 0) {
      if (numStars <= starsToDraw) {
        this.x = screenWidth;
        this.y = yRange.roll();
      } else {
        delete stars[this.id];
        numStars--;
      }
    }

    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, settings.starSize.value, settings.starSize.value);
  }
}

function draw() {
  // resize canvas on window resize
  if (screenWidth != window.innerWidth) {
    screenWidth = window.innerWidth;
    xRange = getDiceSet(`d${Math.round(screenWidth)}`);
    field.width = screenWidth;
  }

  if (screenHeight != window.innerHeight) {
    screenHeight = window.innerHeight;
    screenCenterY = Math.round(screenHeight / 2);
    yRange = getDiceSet(`${settings.gravity.value}d${Math.round((screenHeight / settings.gravity.value) + 1)}-${settings.gravity.value}`);
    field.height = screenHeight;
  }
  
  starsToDraw = Math.ceil(screenWidth * screenHeight * settings.starsDensity.value);

  ctx.fillStyle = `rgba(0, 0, 0, 1)`;
  ctx.fillRect(0, 0, field.width, field.height);

  for (var i = numStars; i < starsToDraw; i++) {
    new Star();
    numStars++;
  }

  for (var star in stars) {
    stars[star].draw();
  }

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

var settingsElement = create('div.settings', {}, Object.keys(settings).map(key => create('div.settings__slider', {}, [
  [
    'label.settings__label',
    { 
      attributes: { for: key },
      domProps: { innerHTML: key }
    }
  ],
  [
    'input.settings__input',
    { 
      attributes: {
        id: key,
        type: 'range',
        min: settings[key].min,
        max: settings[key].max,
        value: settings[key].value,
        step: settings[key].step,
      },
      listeners: {
        input(e) {
          settings[key].value = Number(e.target.value);
        }
      }
    }
  ],
])));

document.body.appendChild(settingsElement);

function easingSinusoidalIn(t) {
  return -Math.cos((t * Math.PI) / 2) + 1;
}

import { getDiceSet } from './index.js';
import { create } from './render.js';

const field = document.getElementById('space');
const ctx = field.getContext('2d');
const gravity = 3;
const stars = {};

const settings = {
  speed: {
    min: 0.3,
    max: 4.5,
    value: 1.5,
    step: 0.3,
  },
  depth: {
    min: 1,
    max: 5,
    value: 2.5,
    step: 0.5,
  },
  entropy: {
    min: 0,
    max: 3,
    value: 0.5,
    step: 0.1,
  },
  density: {
    min: 1,
    max: 15,
    value: 8,
    step: 1,
  },
  gravity: {
    min: 1,
    max: 1000,
    value: 500,
    step: 1,
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
    this.entropy = settings.entropy.value - Math.random() * settings.entropy.value;
    starIndex++;
    stars[starIndex] = this;

    this.color = 'white';
    this.id = starIndex;
  }

  draw() {
    if (this.x < 0) {
      if (numStars <= starsToDraw) {
        this.x = screenWidth;
        this.y = yRange.roll();
      } else {
        delete stars[this.id];
        numStars--;
      }
    }

    this.speed = settings.speed.value;
    this.distance = Math.abs((this.y - screenCenterY) / screenCenterY);
    
    this._y = this.y - (this.y - screenCenterY) * easingSinusoidalIn(1 - this.distance) * (settings.gravity.value / settings.gravity.max);
    this._distance = Math.abs((this._y - screenCenterY) / screenCenterY);

    this.acceleration = settings.depth.value * easingSinusoidalIn(this.distance) + this.entropy;
    this.x = this.x - this.speed - this.acceleration;

    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this._y, 1, 1);
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
    yRange = getDiceSet(`d${Math.round(screenHeight)}`);
    yRange = getDiceSet(`${gravity}d${Math.round((screenHeight / gravity) + 1)}-${gravity}`);
    field.height = screenHeight;
  }

  // rework couning
  starsToDraw = Math.ceil(Math.sqrt(screenWidth * screenHeight)) * settings.density.value / 2;

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

var settingsElement = create(
  'div.settings',
  {},
  Object.keys(settings).map(key =>
    create('div.settings__slider', {}, [
      [
        'label.settings__label',
        {
          attributes: { for: key },
          domProps: { innerHTML: key },
        },
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
            },
          },
        },
      ],
    ])
  )
);

document.body.appendChild(settingsElement);

function easingSinusoidalIn(t) {
  return -Math.cos((t * Math.PI) / 2) + 1;
}

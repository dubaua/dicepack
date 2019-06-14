import { getDiceSet } from './index.js';
import { create } from './render.js';

const field = document.getElementById('space');
const ctx = field.getContext('2d');
window.stars = {};

const settings = {
  speed: {
    min: 1,
    max: 10,
    value: 3,
    step: 0.5,
  },
  size: {
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
  density: {
    min: 1,
    max: 20,
    value: 1,
    step: 1,
  },
  gravity: {
    min: 1,
    max: 5,
    value: 1,
    step: 0.1,
  },
};

const gravityRange = getDiceSet(`d${Math.round(settings.gravity.max)}`);

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
    this.gravityFactor = gravityRange.roll();
    this.force = this.y === screenCenterY ? screenCenterY : this.gravityFactor / (this.y - screenCenterY) * screenCenterY;
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
        this.force = this.y === screenCenterY ? screenCenterY : this.gravityFactor / (this.y - screenCenterY) * screenCenterY;
      } else {
        delete stars[this.id];
        numStars--;
      }
    }

    this._y = this.y - Math.abs(this.y - screenCenterY) / this.force / settings.gravity.max * settings.gravity.value;

    this.distance = Math.abs((this._y - screenCenterY) / screenCenterY);

    this.speed = settings.speed.value;
    this.acceleration =
      settings.depth.value * easingSinusoidalIn(this.distance) +
      settings.entropy.value -
      Math.random() * settings.entropy.value;

    this.x = this.x - this.speed - this.acceleration;

    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this._y, settings.size.value, settings.size.value);
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

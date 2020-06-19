import { DicePack } from '@/main.js';
import { bindReference, create } from './render.js';

const field = document.getElementById('space');
const ctx = field.getContext('2d');
const gravity = 3;

const settings = {
  speed: {
    min: 0.3,
    max: 4.5,
    value: 1.5,
    step: 0.3,
    element: null,
    precision: 1,
  },
  depth: {
    min: 1,
    max: 5,
    value: 2.5,
    step: 0.5,
    element: null,
    precision: 1,
  },
  entropy: {
    min: 0,
    max: 1,
    value: 0.5,
    step: 0.1,
    element: null,
    precision: 1,
  },
  density: {
    min: 1,
    max: 15,
    value: 8,
    step: 1,
    element: null,
    precision: 0,
  },
  gravity: {
    min: 1,
    max: 1000,
    value: 500,
    step: 1,
    element: null,
    precision: 0,
  },
};

let starsArray = [];
let starCount;
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
    starsArray.push(this);
    this.color = 'white';
  }

  draw() {
    if (this.x < 0) {
      this.x = screenWidth;
      this.y = yRange.roll();
      this.entropy = settings.entropy.value - Math.random() * settings.entropy.value;
    }

    this.speed = settings.speed.value;
    this.distance = Math.abs((this.y - screenCenterY) / screenCenterY);

    this._y =
      this.y -
      (this.y - screenCenterY) *
        easingSinusoidalIn(1 - this.distance) *
        (settings.gravity.value / settings.gravity.max);
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
    xRange = new DicePack(`d${Math.round(screenWidth)}`);
    field.width = screenWidth;
  }

  if (screenHeight != window.innerHeight) {
    screenHeight = window.innerHeight;
    screenCenterY = Math.round(screenHeight / 2);
    yRange = new DicePack(`${gravity}d${Math.round(screenHeight / gravity + 1)}-${gravity}`);
    field.height = screenHeight;
  }

  ctx.clearRect(0, 0, field.width, field.height);

  starCount = Math.ceil((Math.sqrt(screenWidth * screenHeight) * settings.density.value) / 2);

  if (starsArray.length > starCount) {
    starsArray = starsArray.splice(0, starCount);
  }

  for (let i = starsArray.length; i < starCount; i++) {
    new Star();
  }

  for (let i = 0; i < starsArray.length; i++) {
    starsArray[i].draw();
  }

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

const settingsElement = create(
  'div.settings',
  {},
  Object.keys(settings).map(key =>
    create('div.settings__param', {}, [
      [
        'label.settings__label',
        {
          attributes: { for: key },
        },
        [
          ['span.settings__property', { domProps: { innerHTML: key } }],
          [
            'span.settings__value',
            {
              domProps: { innerHTML: settings[key].value },
              ref: bindReference(settings[key], 'element'),
            },
          ],
        ],
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
              const value = Number(e.target.value);
              settings[key].value = value;
              settings[key].element.innerHTML = value.toFixed(settings[key].precision);
            },
          },
        },
      ],
    ]),
  ),
);

document.body.appendChild(settingsElement);

function easingSinusoidalIn(t) {
  return -Math.cos((t * Math.PI) / 2) + 1;
}

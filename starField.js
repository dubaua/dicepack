import { getDiceSet } from './index.js';

const field = document.getElementById('space');
const ctx = field.getContext('2d');
const stars = {};

// settings
const speed = 1;
const starSize = 1;
const depth = 1;
const entropy = 0.2;
const starsDensity = 1e-3;

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
    this.acceleration = speed;
    this.acceleration += depth * easingSinusoidalIn(this.distance);
    this.acceleration += entropy - Math.random() * entropy;

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
    ctx.fillRect(this.x, this.y, starSize, starSize);
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
    yRange = getDiceSet(`2d${Math.round(screenHeight / 2)}`);
    field.height = screenHeight;
  }
  
  starsToDraw = Math.ceil(screenWidth * screenHeight * starsDensity);

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

function easingSinusoidalIn(t) {
  return -Math.cos((t * Math.PI) / 2) + 1;
}
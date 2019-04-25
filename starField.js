import { getDiceSet } from './index.js';

const field = document.getElementById('space');
const ctx = field.getContext('2d');
const stars = {};

// settings
const speed = 1;
const colorRange = getDiceSet(`d64+191`);
const starSize = 1;
const depth = 1;
const entropy = 0.2;

let starIndex = 0;
let numStars = 0;
let starsToDraw;
let screenWidth;
let screenHeight;
let screenCenterY;
let xRange;
let yRange;

class Star {
  constructor(initial) {
    this.x = initial ? xRange.roll() : screenWidth;
    this.y = yRange.roll();

    this.distance = Math.abs(this.y - screenCenterY) / screenCenterY;
    this.acceleration = speed;
    this.acceleration += depth * easingSinusoidalIn(this.distance);
    this.acceleration += entropy - Math.random() * entropy;

    starIndex++;
    stars[starIndex] = this;

    this.color = `rgba(${colorRange.roll()}, ${colorRange.roll()}, ${colorRange.roll()}, 1)`;
    this.id = starIndex;
  }

  draw() {
    this.x = this.x - this.acceleration;

    if (this.x < 0) {
      delete stars[this.id];
      numStars--;
    }

    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, starSize, starSize);
  }
}

function draw(initial) {
  return function() {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    screenCenterY = Math.round(screenHeight / 2);
    xRange = getDiceSet(`d${Math.round(screenWidth)}`);
    yRange = getDiceSet(`2d${Math.round(screenHeight / 2)}`);
    field.width = screenWidth;
    field.height = screenHeight;
    starsToDraw = (screenWidth * screenHeight) / 1e3;

    ctx.fillStyle = `rgba(0, 0, 0, 1)`;
    ctx.fillRect(0, 0, field.width, field.height);
  
    for (var i = numStars; i < starsToDraw; i++) {
      new Star(initial);
      numStars++;
    }
  
    for (var star in stars) {
      stars[star].draw();
    }
    requestAnimationFrame(draw());
  }
}

requestAnimationFrame(draw(true));

function easingSinusoidalIn(t) {
  return -Math.cos((t * Math.PI) / 2) + 1;
}
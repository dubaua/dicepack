// https://codepen.io/bts/pen/BygMzB

var field = document.getElementById("space");
var ctx = field.getContext("2d");

var stars = {};
var starIndex = 0;
var numStars = 0;
var acceleration = 0.5;
var starsToDraw = (field.width * field.height) / 200;

function Star() {
  this.X = field.width / 2;
  this.Y = field.height / 2;

  this.SX = Math.random() * 10 - 5;
  this.SY = Math.random() * 10 - 5;

  var start = 0;

  if (field.width > field.height)
      start = field.width;
  else
      start = field.height;

  this.X += this.SX * start / 10;
  this.Y += this.SY * start / 10;

  this.width = 1;
  this.height = 1;

  this.age = 0;
  this.dies = 500;

  starIndex++;
  stars[starIndex] = this;

  this.ID = starIndex;
  this.C = "#ffffff";
}

Star.prototype.Draw = function () {
  this.X += this.SX;
  this.Y += this.SY
  
  this.SX += this.SX / (50 / acceleration);
  this.SY += this.SY / (50 / acceleration);

  this.age++;

  // zooming by age
  if (this.age == Math.floor(50 / acceleration) | this.age == Math.floor(150 / acceleration) | this.age == Math.floor(300 / acceleration)) {
      this.width++;
      this.height++;
  }

  // remove star if it reach field edge
  if (this.X + this.width < 0 | this.X > field.width |
      this.Y + this.height < 0 | this.Y > field.height)
    {
      delete stars[this.ID];
      numStars--;
    }

  ctx.fillStyle = this.C;
  ctx.fillRect(this.X, this.Y, this.width, this.height);
}

field.width = window.innerWidth;
field.height = window.innerHeight;

function draw() {
  // resize canvas on window resize
  if (field.width != window.innerWidth)
      field.width = window.innerWidth;
  if (field.height != window.innerHeight)
      field.height = window.innerHeight;

  // Play with the "a" value to create streams...it's fun!
  ctx.fillStyle = "rgba(0, 0, 0, 1)";
  ctx.fillRect(0, 0, field.width, field.height);

  for (var i = numStars; i < starsToDraw; i++) {
      new Star();
      numStars++;
  }

  for (var star in stars) {
      stars[star].Draw();
  }
}

// Original timing of the screensaver
setInterval(draw, 16);

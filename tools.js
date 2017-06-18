﻿var next = [];

Number.prototype.between = function(a, b) {
  var min = Math.min.apply(Math, [a, b]),
    max = Math.max.apply(Math, [a, b]);
  return this > min && this < max;
}

function get360(input){
if (input < 0) input += 360;
if (input > 359) input -= 360;
return input;
}

function button(posx, posy, width, height, tag, colour, action){
	var textY = parseInt(Game.ctx.font.split('p')[0]) + posy + 0.4*((height - 2*Game.ctx.lineWidth) - parseInt(Game.ctx.font.split('p')[0]));
	Game.ctx.fillStyle = colour;
	Game.ctx.fillRect(posx + Game.ctx.lineWidth, posy + Game.ctx.lineWidth, width - Game.ctx.lineWidth*2, height - Game.ctx.lineWidth*2);
	Game.ctx.fillStyle = "black";
	Game.ctx.strokeRect(posx , posy, width, height);
	if (cursor.x.between(posx, posx + width) && cursor.y.between(posy, posy + height)){
		if (click) action();
		Game.ctx.strokeRect(posx + Game.ctx.lineWidth, posy + Game.ctx.lineWidth, width - Game.ctx.lineWidth*2, height - Game.ctx.lineWidth*2);
	}
	Game.ctx.fillStyle = "black";
	Game.ctx.fillText(tag, posx + ((width - Game.ctx.measureText(tag).width)*0.5), textY);
	Game.ctx.fillStyle = "yellow";
}

function intervalReact(trigger, delay, ID){
	if (delay === undefined) delay = 500;
	if (ID === undefined) ID = "react";
	function react(){
	next[ID] = false;
	}
	if (trigger){
		if (next[ID] === false || next[ID] === undefined){
		next[ID] = true;
		setTimeout(react,delay);
		return true;
		}
	}
	return false;
}
	

var Animation = function(){
  this.isRunning = false;
  this.frames = [];
  this.speedMs = 30; //speed of the animation in milliseconds
  this.step = -1; //current displayed frame
  this.addFrame = (function(picture) { //adds a frame
    this.frames.push(picture);
  }).bind(this);

  this.updateLoop = (function() {
    if (this.isRunning === false) return; //if not running, then stop loop
    this.step++;
    if (this.step > this.frames.length-1) this.step = 0;
    setTimeout(this.updateLoop, this.speedMs);
  }).bind(this);

  this.getCurrentFrame = (function() {
    return this.frames[this.step];
  }).bind(this);

  this.stop = (function() {
    this.isRunning = false;
  }).bind(this);

  this.start = (function() {
    this.isRunning = true;
    this.updateLoop();
  }).bind(this);

  this.reset = (function() { //does not stop the animation
    this.step = 0;
  }).bind(this);
  
}

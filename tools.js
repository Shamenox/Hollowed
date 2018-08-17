﻿//Methoden:

Number.prototype.between = function(a, b) {
  var min = Math.min.apply(Math, [a, b]),
    max = Math.max.apply(Math, [a, b]);
  return this > min && this < max;
}



function chance(per){
	if (Math.floor(Math.random() * 100) <= per) return true;
	return false;
}



function exists(obj){
	if (obj !== undefined) return true;
	return false;
}



function get360(input){
	if (input === 0 || input === 360) return input;
	while (!input.between(0, 360)){
		if (input < 0) input += 360;
		if (input > 360) input -= 360;
	}
	return input;
}



function button(posx, posy, width, height, tag, colour, action){
	Helon.ctx.lineWidth = 4;
	var textY = parseInt(Helon.ctx.font.split('p')[0]) + posy + 0.4*((height - 2*Helon.ctx.lineWidth) - parseInt(Helon.ctx.font.split('p')[0]));
	
	Helon.ctx.fillStyle = "black";
	Helon.ctx.fillRect(posx , posy, width, height);
	
	Helon.ctx.fillStyle = "white";
	Helon.ctx.fillRect(posx + 2, posy + 2, width - 4, height - 4);
	
	Helon.ctx.fillStyle = "black";
	Helon.ctx.fillRect(posx + 4, posy + 4, width - 8, height - 8);
	
	Helon.ctx.fillStyle = colour;
	Helon.ctx.fillRect(posx + 2 * Helon.ctx.lineWidth, posy + 2 * Helon.ctx.lineWidth, width - Helon.ctx.lineWidth * 4, height - Helon.ctx.lineWidth * 4);
	Helon.ctx.strokeStyle = "black";
	
	if (cursor.x.between(posx, posx + width) && cursor.y.between(posy, posy + height)){
		if (click) action();
		Helon.ctx.strokeRect(posx + Helon.ctx.lineWidth * 3, posy + Helon.ctx.lineWidth * 3, width - Helon.ctx.lineWidth * 6, height - Helon.ctx.lineWidth * 6);
	}
	Helon.ctx.fillStyle = "black";
	Helon.ctx.fillText(tag, posx + ((width - Helon.ctx.measureText(tag).width)*0.5), textY);
	Helon.ctx.fillStyle = "yellow";
}



function bar(from){
	Helon.ctx.fillStyle = "yellow";
	Helon.ctx.strokeStyle = "yellow";
	Helon.ctx.fillText("Loading... please wait", 400, 300);
	Helon.ctx.strokeRect(80,400,1760,120);
	Helon.ctx.fillRect(90,410,1750*(from.loaded/from.quantity),100);
	Helon.ctx.strokeRect(90,410,1750*(from.loaded/from.quantity),100);
}



function play(sound){
	if (Helon.muted || sound === undefined || sound === "none") return;
	if (typeof sound !== "object") sound = Helon.ress.audio[sound];
	if (sound.currentTime === 0 || sound.ended){
		sound.play();
	} else {
		if (sound.currentTime > 0.2) sound.currentTime = 0;
	}
}



function loop(track){
	if (Helon.muted || track === undefined || track === "none") return;
	if (typeof track !== "object") track = Helon.ress.audio[track];
	if (track.currentTime === 0 || track.ended){
		track.play();
	}
}



function resetAudio(){
	for (var audio in Helon.ress.audio){
		Helon.ress.audio[audio].pause();
		Helon.ress.audio[audio].currentTime = 0;
	}
}



function muteButton(){
	button(1840, 0, 80, 80, " ", "yellow", function(){if (intervalReact(true)){
		if (Helon.muted){
			Helon.muted = false;
		} else{
			Helon.muted = true;
			resetAudio();
		}
	}})
	Helon.ctx.drawImage(Helon.ress.images.speaker, 1846, 6, 68, 68);
	if (Helon.muted) Helon.ctx.drawImage(Helon.ress.images.cross, 1846, 6, 68, 68);
}



var queue = {};
function intervalReact(trigger, delay, ID){
	if (delay === undefined) delay = 500;
	if (ID === undefined) ID = "react";
	function react(){
	queue[ID] = false;
	}
	if (trigger){
		if (queue[ID] === false || queue[ID] === undefined){
		queue[ID] = true;
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
  

  /*

  Beispiel

  var geileAnimation = new Animation();

  geileAnimation.addFrame(pic1);
  geileAnimation.addFrame(pic2);
  geileAnimation.addFrame(pic3);

  geileAnimation.start();

  das Aktikuelle frame bekommst du mit
  geileAnimation.getCurrentFrame();

  //das kannst du dann bei drawImage benutzen

  ctx.drawImage(geileAnimation.getCurrentFrame(), 250, 130);

  */
}
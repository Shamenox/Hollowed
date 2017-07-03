var Game = {};
var map = new Map(32, 32);
var random = 0;
var danger = false;
var startRoom = {
	x : 16,
	y : 16
}

player = {
	x : 0,
	y : 0,
	dir : "North",
	room : null,
};

function place(who, on){
	who.x = on.x;
	who.y = on.y;
	reportPosition(who);
}

function adjustDir(from, to){
	if (to === undefined) return from;
	if ((from === "North" && to === "left") || (from === "South" && to === "right") || (from === "East" && to === "back")) return "West";
	if ((from === "North" && to === "right") || (from === "South" && to === "left") || (from === "West" && to === "back")) return "East";
	if ((from === "West" && to === "left") || (from === "East" && to === "right") || (from === "North" && to === "back")) return "South";
	if ((from === "East" && to === "left") || (from === "West" && to === "right") || (from === "South" && to === "back")) return "North";
}

function reportPosition(of){
	console.log(of.x, of.y, of.dir);
}



function displayRoom(){
	Game.ctx.drawImage(image.plain, 0, 0);
	if (player.room["door" + player.dir] !== null){
		if (player.room["door" + player.dir].type === "pass") Game.ctx.drawImage(image.pass_center,0,0);
		if (player.room["door" + player.dir].type === "door" || player.room["door" + player.dir].type === "locked") Game.ctx.drawImage(image.door_center,0,0);
	}
	if (player.room["door" + adjustDir(player.dir, "left")] !== null){
		if (player.room["door" + adjustDir(player.dir, "left")].type === "pass") Game.ctx.drawImage(image.pass_left,0,0);
		if (player.room["door" + adjustDir(player.dir, "left")].type === "door" || player.room["door" + adjustDir(player.dir, "left")].type === "locked") Game.ctx.drawImage(image.door_left,0,0);
	}
	if (player.room["door" + adjustDir(player.dir, "right")] !== null){
		if (player.room["door" + adjustDir(player.dir, "right")].type === "pass") Game.ctx.drawImage(image.pass_right,0,0);
		if (player.room["door" + adjustDir(player.dir, "right")].type === "door" || player.room["door" + adjustDir(player.dir, "right")].type === "locked") Game.ctx.drawImage(image.door_right,0,0);
	}
}


function move(){
	
	if (intervalReact(key.w, 500, "walk")){
		if (player.room["door" + player.dir] !== null) player.room["door" + player.dir].walkThrough(player);
	}
	
	if (intervalReact(key.s, 500, "walk")){
		if (player.room["door" + adjustDir(player.dir, "back")] !== null) player.room["door" + adjustDir(player.dir, "back")].walkThrough(player);
	}
	
	if (intervalReact(key.a, 200, "turn")){
		player.dir = adjustDir(player.dir, "left");
		reportPosition(player);
	}
	
	if (intervalReact(key.d, 200, "turn")){
		player.dir = adjustDir(player.dir, "right");
		reportPosition(player);
	}
}





// Canvas-Initialisierung
window.onload = function() {
	var canvas = document.getElementById("Canvas");
	Game.ctx = canvas.getContext("2d");
	Game.ctx.font = "24px Consolas";

	setupInput();
	loadImages();
	loadAudio();

	map._random();
	map.randomizeDoors();
	console.log(map);
	place(player, startRoom);
	startMonsters();
	setInterval (function(){danger = false;}, 30000);
	draw(); //start drawloop
};

function draw(){
	player.room = map.getRoom(player.x, player.y);
	displayRoom();
	Game.ctx.drawImage(image.cursor, cursor.x, cursor.y);
	move();
	sounds();
	requestAnimationFrame(draw);
}

function sounds(){
	if (!danger && player.room.light){
		audio.ambience1.play();
		audio.breathing1.pause();
		audio.breathing2.pause();
	}
	if (danger) {
		audio.ambience1.pause();
	}
}
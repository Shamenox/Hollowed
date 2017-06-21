var Game = {};
var map = new Map(14, 15);
var random = 0;
var danger = false;
var startRoom = {
	x : 7,
	y : 0
}

player = {
	x : 0,
	y : 0,
	dir : "North",
	room : null,
	place : function(on){
		this.x = on.x;
		this.y = on.x;
	}
};

function adjustDir(from, to){
	if (to === undefined) return from;
	if ((from === "North" && to === "left") || (from === "South" && to === "right") || (from === "West" && to === "back")) return "East";
	if ((from === "North" && to === "right") || (from === "South" && to === "left") || (from === "East" && to === "back")) return "West";
	if ((from === "West" && to === "left") || (from === "East" && to === "right") || (from === "South" && to === "back")) return "North";
	if ((from === "East" && to === "left") || (from === "West" && to === "right") || (from === "North" && to === "back")) return "South";
}

function displayRoom(){
	player.room = map.getRoom(player.x, player.y);
	Game.ctx.drawImage(image.plain, 0, 0);
	if (player.room["door" + player.dir] !== null){
		if (player.room["door" + player.dir].type === "pass") Game.ctx.drawImage(image.pass_center,0,0);
		if (player.room["door" + player.dir].type === "open" || player.room["door" + player.dir].type === "locked") Game.ctx.drawImage(image.door_center,0,0);
	}
	if (player.room["door" + adjustDir(player.dir, "left")] !== null){
		if (player.room["door" + adjustDir(player.dir, "left")].type === "pass") Game.ctx.drawImage(image.pass_left,0,0);
		if (player.room["door" + adjustDir(player.dir, "left")].type === "open" || player.room["door" + adjustDir(player.dir, "right")].type === "locked") Game.ctx.drawImage(image.door_left,0,0);
	}
	if (player.room["door" + adjustDir(player.dir, "right")] !== null){
		if (player.room["door" + adjustDir(player.dir, "right")].type === "pass") Game.ctx.drawImage(image.pass_left,0,0);
		if (player.room["door" + adjustDir(player.dir, "right")].type === "open" || player.room["door" + adjustDir(player.dir, "right")].type === "locked") Game.ctx.drawImage(image.door_right,0,0);
	}
}

function move(){
	
	if (intervalReact(key.w, 500, "walk")){
		if (player.dir === "North" && player.room.doorNorth !== null && player.room.doorNorth.type !== "locked"){
			player.y += 1;
		}
		else {
			if (player.dir === "West" && player.room.doorWest !== null && player.room.doorWest.type !== "locked"){
				player.x -= 1;
			}
			else {
				if (player.dir === "South" && player.room.doorSouth !== null && player.room.doorSouth.type !== "locked"){
					player.y -= 1;
				}
				else {
					if (player.dir === "East" && player.room.doorEast !== null && player.room.doorEast.type !== "locked"){
					player.x += 1;
					}
				}
			}
		}
		reportPosition(player);
	}
	
	
	if (intervalReact(key.s, 500, "walk")){
		if (player.dir === "North" && player.room.doorSouth !== null && player.room.doorSouth.type !== "locked"){
			player.y -= 1;
		}
		else {
			if (player.dir === "West" && player.room.doorEast !== null && player.room.doorEast.type !== "locked"){
				player.x += 1;
			}
			else {
				if (player.dir === "South" && player.room.doorNorth !== null && player.room.doorNorth.type !== "locked"){
						player.y += 1;
				}
				else {
					if (player.dir === "East"  && player.room.doorEast !== null && player.room.doorEast.type !== "locked"){
						player.x -= 1;
					}
				}
			}
		}
		reportPosition(player);
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

function reportPosition(of){
	console.log(of.x, of.y, of.dir);
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
	player.place(startRoom);
	startMonsters();
	setInterval (function(){danger = false;}, 30000);
	draw(); //start drawloop
};

function draw(){
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
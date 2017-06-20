var Game = {};
var map = new Map(14, 15);
var random = 0;
var danger = false;

player = {
	x : 0,
	y : 0,
	dir : "north",
	room : null,
	place : function(on){
		this.x = on.startRoomX;
		this.y = on.startRoomY;
	}
};

function displayRoom(){
	player.room = map.getRoom(player.x, player.y);
	console.log(player.room);
	Game.ctx.drawImage(image.plain, 0, 0);
	if (player.dir === "north"){
		if (player.room.north === "pass") {
			Game.ctx.drawImage(image.pass_center,0,0);
		}
		if (map[player.x][player.y].west === "pass") {
			Game.ctx.drawImage(image.pass_left,0,0);
		}
		if (map[player.x][player.y].east === "pass") {
			Game.ctx.drawImage(image.pass_right,0,0);
		}
		if (map[player.x][player.y].north === "locked" || map[player.x][player.y].north == "door") {
			Game.ctx.drawImage(image.door_center,0,0);
		}
		if (map[player.x][player.y].west === "locked" || map[player.x][player.y].west == "door") {
			Game.ctx.drawImage(image.door_left,0,0);
		}
		if (map[player.x][player.y].east === "locked" || map[player.x][player.y].east == "door") {
			Game.ctx.drawImage(image.door_right,0,0);
		}
	}
	if (player.dir === "west"){
		if (map[player.x][player.y].west === "pass") {
			Game.ctx.drawImage(image.pass_center,0,0);
		}
		if (map[player.x][player.y].south === "pass") {
			Game.ctx.drawImage(image.pass_left,0,0);
		}
		if (map[player.x][player.y].north === "pass") {
			Game.ctx.drawImage(image.pass_right,0,0);
		}
		if (map[player.x][player.y].west === "locked" || map[player.x][player.y].west === "door") {
			Game.ctx.drawImage(image.door_center,0,0);
		}
		if (map[player.x][player.y].south === "locked" || map[player.x][player.y].south === "door") {
			Game.ctx.drawImage(image.door_left,0,0);
		}
		if (map[player.x][player.y].north === "locked" || map[player.x][player.y].north === "door") {
			Game.ctx.drawImage(image.door_right,0,0);
		}
	}
	if (player.dir === "east"){
		if (map[player.x][player.y].east === "pass") {
			Game.ctx.drawImage(image.pass_center,0,0);
		}
		if (map[player.x][player.y].north === "pass") {
			Game.ctx.drawImage(image.pass_left,0,0);
		}
		if (map[player.x][player.y].south === "pass") {
			Game.ctx.drawImage(image.pass_right,0,0);
		}
		if (map[player.x][player.y].east === "locked" || map[player.x][player.y].east === "door") {
			Game.ctx.drawImage(image.door_center,0,0);
		}
		if (map[player.x][player.y].north === "locked" || map[player.x][player.y].north === "door") {
			Game.ctx.drawImage(image.door_left,0,0);
		}
		if (map[player.x][player.y].south === "locked" || map[player.x][player.y].south === "door") {
			Game.ctx.drawImage(image.door_right,0,0);
		}
	}
	if (player.dir === "south"){
		if (map[player.x][player.y].south === "pass") {
			Game.ctx.drawImage(image.pass_center,0,0);
		}
		if (map[player.x][player.y].east === "pass") {
			Game.ctx.drawImage(image.pass_left,0,0);
		}
		if (map[player.x][player.y].west === "pass") {
			Game.ctx.drawImage(image.pass_right,0,0);
		}
		if (map[player.x][player.y].south === "locked" || map[player.x][player.y].south === "door") {
			Game.ctx.drawImage(image.door_center,0,0);
		}
		if (map[player.x][player.y].east === "locked" || map[player.x][player.y].east === "door") {
			Game.ctx.drawImage(image.door_left,0,0);
		}
		if (map[player.x][player.y].west === "locked" || map[player.x][player.y].west === "door") {
			Game.ctx.drawImage(image.door_right,0,0);
		}
	}
}
function move(){
	if (intervalReact(key.w, 500, "walk")){
		if (player.dir === "north" && player.y < rooms.depth){
			player.y += 1;
		} else {
			if (player.dir === "west" && player.x > 0){
				player.x -= 1;
			} else {
				if (player.dir === "south" && player.y > 0){
					player.y -= 1;
				} else {
					if (player.dir === "east" && player.x < rooms.width){
						player.x += 1;
					}
				}
			}
		}
		reportPosition(player);
	}
	if (intervalReact(key.s, 500, "walk")){
		if (player.dir === "north" && player.y > 0){
			player.y -= 1;
		} else {
			if (player.dir === "west" && player.x < rooms.width){
				player.x += 1;
			} else {
				if (player.dir === "south" && player.y < rooms.depth){
					player.y += 1;
				} else {
					if (player.dir === "east"  && player.x > 0){
						player.x -= 1;
					}
				}
			}
		}
		reportPosition(player);
	}
	if (intervalReact(key.a, 500, "walk")){
		if (player.dir === "north"){
			player.dir = "west";
		} else {
			if (player.dir === "west"){
				player.dir = "south";
			} else {
				if (player.dir === "south"){
					player.dir = "east";
				} else {
					if (player.dir === "east"){
						player.dir = "north";
					}
				}
			}
		}
		reportPosition(player);
	}
	if (intervalReact(key.d, 500, "walk")){
		if (player.dir === "north"){
			player.dir = "east";
		} else {
			if (player.dir === "west"){
				player.dir = "north";
			} else {
				if (player.dir === "south"){
					player.dir = "west";
				} else {
					if (player.dir === "east"){
						player.dir = "south";
					}
				}
			}
		}
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
	player.place(map);
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
	if (!danger && map[player.x][player.y].light){
		audio.ambience1.play();
		audio.breathing1.pause();
		audio.breathing2.pause();
	}
	if (danger) {
		audio.ambience1.pause();
	}
}
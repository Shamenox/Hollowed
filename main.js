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

	loadImages();
	loadAudio();

	map._random();
	map.randomizeDoors();
	console.log(map);
	place(player, startRoom);
	startMonsters();
	setInterval (function(){danger = false;}, 30000);

	player.room = map.getRoom(player.x, player.y);

	draw(); //start drawloop
};



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
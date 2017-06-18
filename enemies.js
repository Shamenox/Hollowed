var enemy = {};

function startMonsters(){
	setTimeout(enemy.kralko.act, 3000);
}

enemy.kralko = {
	x : Math.floor((Math.random() * rooms.width) + 1),
	y : Math.floor((Math.random() * rooms.depth) + 1),
	dir : "north",
	triggered : false
}
enemy.kralko.act = function(){
	random = Math.random();
	if (enemy.kralko.x.between(player.x -1 , player.x+1) && enemy.kralko.y.between(player.y -1 , player.y+1)){
		if (!enemy.kralko.triggered){
			if (random < 0.5) audio.breathing1.play();
			if (random > 0.5) audio.breathing2.play();
		}
		danger = true;
	}
	if (enemy.kralko.x === player.x && enemy.kralko.y === player.y){
		if (random < 0.25) audio.scream1.play();
		if (random > 0.25 && random < 0.5) audio.scream2.play();
		if (random > 0.5 && random < 0.75) audio.scream3.play();
		if (random > 0.75) audio.scream4.play();
	}
	console.log(enemy.kralko.x, enemy.kralko.y);
	console.log(danger);
	setTimeout(enemy.kralko.act,5000);
}

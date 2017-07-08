var enemy = {};

class Enemy{
	constructor(on){
		if (on.bounds !== {width, height}){
			throw new Error("Could not set Enemy within mapboundries");
		} 
		this.x = Math.floor((Math.random() * on.bounds.width) + 1);
		this.y = Math.floor((Math.random() * on.bounds.height) + 1);
		this.dir = "North";
		this.triggered = false;
		this.act = function(){};
	}
	
	
	setAct(action){
		this.act = action;
	}
}

function startMonsters(){
	for (var monster in enemy){
		setTimeout(enemy[monster].act(), 3000);
	}
}

juggernaut = new Enemy(map);
juggernout.setAct(function (){
	random = Math.random();
	if (this.x.between(player.x -1 , player.x+1) && this.y.between(player.y -1 , player.y+1)){
		if (!this.triggered){
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
	console.log(this.x, this.y);
	console.log(this.triggered);
	setTimeout(this.act,5000);
});


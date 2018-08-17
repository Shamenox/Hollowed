var Hollowed : {
	map : [],
	chars : {},
};

Hollowed.loop = function(){
	
}

function Appstart(){
	
	Helon.app = Hollowed.loop;
}


class Char{
	constructor(name){
		this.name = name;
		this.pos = {x : -1, y : -1}
		this.dir = 1; //1=north 2=east
	}
}
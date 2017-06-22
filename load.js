var image = {
	quantity : 0,
	loaded : 0
};
function createImage(ID) {
	image.quantity += 1;
    var img = new Image();
    img.src = "ress/images/"+ID+".png";
	img.addEventListener("load",function(e){
	    image.loaded +=1;
	    if (image.loaded === image.quantity) {
			console.log(image.quantity,image.loaded);
		}
	})
    image[ID] = img;
}
function loadImages() {
	createImage("cursor");
	createImage("blackscreen");
	createImage("plain");
	createImage("pass_center");
	createImage("pass_left");
	createImage("pass_right");
	createImage("door_center");
	createImage("door_left");
	createImage("door_right");

    console.log(image);
}

var audio = {};
function loadAudio(){
	audio.ambience1 = new Audio("ress/audio/ambience1.mp3");
	audio.breathing1 = new Audio("ress/audio/breathing1.mp3");
	audio.breathing2 = new Audio("ress/audio/breathing2.mp3");
	audio.chase1 = new Audio("ress/audio/chase1.mp3");
	audio.close1 = new Audio("ress/audio/close1.mp3");
	audio.scream1 = new Audio("ress/audio/scream1.mp3");
	audio.scream2 = new Audio("ress/audio/scream2.mp3");
	audio.scream3 = new Audio("ress/audio/scream3.mp3");
	audio.scream4 = new Audio("ress/audio/scream4.mp3");
	audio.shout1 = new Audio("ress/audio/shout1.mp3");
	audio.shout2 = new Audio("ress/audio/shout2.mp3");
	audio.door = new Audio("ress/audio/door.mp3");
}


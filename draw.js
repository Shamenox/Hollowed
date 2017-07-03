function draw(){
	//player.room = map.getRoom(player.x, player.y);
	displayRooms();
	Game.ctx.drawImage(image.cursor, cursor.x, cursor.y);
	move(); //todo put that somewhere else
	sounds(); //todo put that somewhere else
	requestAnimationFrame(draw);
}

function displayRooms(){
	Game.ctx.drawImage(image.blackscreen, 0, 0);
	 Game.ctx.lineWidth = 5;
    map._rooms.forEach(function(element) {
        drawRoom(element, (element.x+1)* roomSize, (element.y+1) * roomSize)
    }, this);

}

function drawRoom(room, screenX, screenY) {   

    function drawLine(from, to, color) {
        Game.ctx.beginPath()
        Game.ctx.moveTo(from.x, from.y)
        Game.ctx.lineTo(to.x, to.y)
        Game.ctx.strokeStyle = color
        Game.ctx.stroke()
    }

    Game.ctx.beginPath()
    Game.ctx.moveTo(screenX, screenY) //start left top

    drawLine({
        x: screenX,
        y: screenY,
    },
    {
        x: screenX + roomSize,
        y: screenY,
    },
    room.doorNorth ? "red" : "green"
    )

    drawLine({
        x: screenX +roomSize,
        y: screenY,
    },
    {
        x: screenX + roomSize,
        y: screenY + roomSize,
    },
    room.doorEast ? "red" : "green"
    )

    drawLine({
        x: screenX + roomSize,
        y: screenY + roomSize,
    },
    {
        x: screenX,
        y: screenY + roomSize,
    },
    room.doorSouth ? "red" : "green"
    )

    drawLine({
        x: screenX,
        y: screenY + roomSize,
    },
    {
        x: screenX,
        y: screenY,
    },
    room.doorWest ? "red" : "green"
    )


}

const roomSize = 100
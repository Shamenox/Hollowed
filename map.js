class Room {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.light = true
        this.doorNorth = null
        this.doorSouth = null
        this.doorWest = null
        this.doorEast = null
    }

    GetNorthRoom() {
        return this.doorNorth ? this.doorNorth.getOppositeRoom(this) : null
    }

    GetSouthRoom() {
        return this.doorSouth ? this.doorSouth.getOppositeRoom(this) : null
    }

    GetWestRoom() {
        return this.doorWest ? this.doorWest.getOppositeRoom(this) : null
    }

    GetEastRoom() {
        return this.doorEast ? this.doorEast.getOppositeRoom(this) : null
    }

    GetDoorCount() {
        let count = 0

        if (this.doorNorth) count++
        if (this.doorSouth) count++
        if (this.doorWest) count++
        if (this.doorEast) count++

        return count
    }

    DoorsAsArray() {
        let result = []
        if (this.doorNorth) result.push(this.doorNorth)
        if (this.doorSouth) result.push(this.doorSouth)
        if (this.doorWest) result.push(this.doorWest)
        if (this.doorEast) result.push(this.doorEast)
        return result
    }
}

class Door {
    constructor(roomA, roomB) {
        this.roomA = roomA
        this.roomB = roomB
        this.type = "pass"
        this.trasition = null
		this.type = "pass"
    }

    getOppositeRoom(room) {
        if (room === this.roomA) return this.roomB
        if (room === this.roomB) return this.roomA

        throw new Error('This door does not know the room at x:' + room.x + " y:" + room.y)
    }
	
	walkThrough(who){
		if (this.type === "locked") {
			
		}
		else {
			reportPosition(who);
			if (who.room === this.roomA){
				place(who, this.roomB);
			}
			else place(who, this.roomA);
			if (this.type === "door") audio.door.play();
		}
	}
}

class Map {
    constructor(width, height, seed) {
        this.bounds = {width, height}

        this._seedArgs = seed ? seed : Math.floor(Math.random() * 10000) + 535232;

        this._rooms = []

        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                this._rooms.push(new Room(x, y))
            }
        }
        
    }

    _random() {
        let x = Math.sin(this._seedArgs++) * 1000000
        return x - Math.floor(x)
    }

    _randomRange(min, max) {
       return Math.floor((this._random() * (max + 1)) + min)
    }

    getRoom(x, y) {
        for (var i = 0; i < this._rooms.length; i++) {
            var element = this._rooms[i]
            
            if (element.x === x && element.y === y) return element
        }

        throw new Error('Element not found at x: ' + x + ', y: ' + y)
    }



    randomizeDoors() {
		let startRoom = this.getRoom(
			Math.floor(this.bounds.width / 2),
			Math.floor(this.bounds.height / 2)
		)

        this.CreateDoorNorth(startRoom)
        this.CreateDoorWest(startRoom)
        this.CreateDoorSouth(startRoom)
        this.CreateDoorEast(startRoom)
             

        while(this.AddDoorWherePossible()) {
            console.log("oki")
        }
    }

    AddDoorWherePossible() {
        var doorsChanged = 0

        for (var x = 1; x < this.bounds.width-1; x++) {
            for (var y = 1; y < this.bounds.height-1; y++) {
                var room = this.getRoom(x, y)
                
                if ((room.GetDoorCount() === 0) || (room.GetDoorCount() === 4)) continue;
          
                const probability = 1

                if (this.CanPutDoorNorthAt(room.x, room.y)) {
                    doorsChanged++
                    if (this._randomRange(0, probability) == 1) this.CreateDoorNorth(room)
                }
                if (this.CanPutDoorWestAt(room.x, room.y)) {
                    if (this._randomRange(0, probability) == 1) this.CreateDoorWest(room)
                    doorsChanged++
                }
                if (this.CanPutDoorSouthAt(room.x, room.y)) { 
                    if (this._randomRange(0, probability) == 1) this.CreateDoorSouth(room)
                    doorsChanged++
                }
                if (this.CanPutDoorEastAt(room.x, room.y)){
                    if (this._randomRange(0, probability) == 1) this.CreateDoorEast(room)
                    doorsChanged++
                }

               
            }
        }

        console.log(doorsChanged)

        return doorsChanged
    }

    CreateDoorNorth(roomSource) {
        const roomDest = this.getRoom(roomSource.x, roomSource.y - 1)
        const door = new Door(roomSource, roomDest)

        roomSource.doorNorth = door
        roomDest.doorSouth = door
    }
    CreateDoorSouth(roomSource) {
        const roomDest = this.getRoom(roomSource.x, roomSource.y + 1)
        const door = new Door(roomSource, roomDest)

        roomSource.doorSouth = door
        roomDest.doorNorth = door
    }
    CreateDoorEast(roomSource) {
        const roomDest = this.getRoom(roomSource.x + 1, roomSource.y)
        const door = new Door(roomSource, roomDest)

        roomSource.doorEast = door
        roomDest.doorWest = door
    }
    CreateDoorWest(roomSource) {
        const roomDest = this.getRoom(roomSource.x - 1, roomSource.y)
        const door = new Door(roomSource, roomDest)

        roomSource.doorWest = door
        roomDest.doorEast = door
    }

    CanPutDoorNorthAt(x, y) {        
        return this.getRoom(x, y - 1).GetDoorCount() === 0
    }
    CanPutDoorSouthAt(x, y) {       
        return this.getRoom(x, y + 1).GetDoorCount() === 0
    }
    CanPutDoorWestAt(x, y) {     
        return this.getRoom(x - 1, y).GetDoorCount() === 0
    }
    CanPutDoorEastAt(x, y) {
       
        return this.getRoom(x + 1, y).GetDoorCount() === 0
    }

    JoinCorridoors() {
        for (let index = 0; index < this._rooms.length; index++) {
            let element = this._rooms[index]

            if (element.GetDoorCount() === 1) continue;

            element.DoorsAsArray()[0].type = (
                (this._randomRange(0, 10) === 5) ? "door" : "locked"
            )      
            
        }
    }

    debugPrint() {
        let printArr = []

        for (var x = -1; x < this.bounds.width * 3 + 1; x++) {
            printArr.push([])
        }

        for (var y = 0; y < printArr.length; y++) {
           for (var x = -1; x < this.bounds.height * 3 + 1; x++) {
                printArr[y].push(0)            
            }   
        }

        for (var i = 0; i < this._rooms.length; i++) {
            var element = this._rooms[i]
            
            let x = element.x * 3 + 1
            let y = element.y * 3 + 1

            printArr[y][x] = 2

            if (element.GetNorthRoom()) printArr[y - 1][x] = 1
            if (element.GetSouthRoom()) printArr[y + 1][x] = 1
            if (element.GetWestRoom()) printArr[y][x - 1] = 1
            if (element.GetEastRoom()) printArr[y][x + 1] = 1
        }

        for (var y = 0; y < printArr.length; y++) {
            var element = printArr[y]
            var str = ""
            for (var x = 0; x < element.length; x++) {
                str += element[x]              
            }

            console.log(str)
        }
      

    }
}


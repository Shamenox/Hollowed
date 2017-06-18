var rooms = {};
	rooms.width = 23;
	rooms.depth = 22;
var map = {};
for (var i = 0; i < 32; i++){
	map[i] = {};
	for (var h = 0; h < 32; h++){
		map[i][h] = {
			north : "pass",
			south : "pass",
			east : "pass",
			west : "pass",
			light : true,
		}
	}
}
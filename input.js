var key = {
	w : false,
	a : false,
	s : false,
	d : false,
	e : false,
	q : false,
	i : false,
	space : false,
	esc : false,
	enter : false,
}
var cursor = { x : 0, y : 0, angle : 0}
var click = false

addEventListener("keydown", function(w) {
    var keyWasPressed = null;
    switch (w.keyCode) {
        case 87: key.w = true; break
        case 83: key.s = true; break
        case 65: key.a = true; break
        case 68: key.d = true; break
        case 69: key.e = true; break
        case 81: key.q = true; break
        case 73: key.i = true; break
        case 32: key.space = true; break
        case 27: key.esc = true; break
        case 13: key.enter = true; break
            
       
    
        default:
            keyWasPressed = false
    }

    if (keyWasPressed) {
        w.preventDefault()
        w.stopPropagation()
    }

}, false)
addEventListener("keyup", function(w) {
    switch (w.keyCode) {
        case 87: key.w = false; break
        case 83: key.s = false; break
        case 65: key.a = false; break
        case 68: key.d = false; break
        case 69: key.e = false; break
        case 81: key.q = false; break
        case 73: key.i = false; break
        case 32: key.space = false; break
        case 27: key.esc = false; break
        case 13: key.enter = false; break
    }

}, false);

document.onmousedown = function(trigger) {
    click = true;
}
document.onmouseup = function(trigger) {
    click = false;
}
document.onmousemove = function(m) {
    cursor.x = m.pageX - document.getElementById("Canvas").offsetLeft;
    cursor.y = m.pageY - document.getElementById("Canvas").offsetTop;
}



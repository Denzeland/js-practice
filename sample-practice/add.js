function moveElement(elemId, final_x, final_y, interval) {
	if (!document.getElementById || !document.getElementById(elemId)) return false;
	var elem = document.getElementById(elemId);
	if (elem.movement) {
		clearTimeout(elem.movement);
	}
	if (!elem.style.left) {
		elem.style.left = "0px";
	}
	if (!elem.style.top) {
		elem.style.top = "0px";
	}

	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	var dist = 0;

	if (xpos == final_x && ypos == final_y) {
		return ture;
	}
	if (xpos < final_x) {
		dist = Math.ceil((final_x-xpos)/10);
		xpos += dist;
	}
	if (xpos > final_x) {
		dist = Math.ceil((xpos-final_x)/10);
		xpos -= dist;
	}
	if (ypos < final_y) {
		dist = Math.ceil((final_x-ypos)/10);
		ypos += dist;
	}
	if (ypos > final_x) {
		dist = Math.ceil((ypos-final_y)/10);
		ypos -= dist;
	}

	elem.style.left = xpos + "px";
	elem.style.top = ypos + "px";

	repeat = "moveElement('"+elemId+"',"+final_x+","+final_y+","+interval+")";
	elem.movement = setTimeout(repeat, interval);
}
// 定义调用函数
function posElement() {
	if (!document.getElementById || !document.getElementById("preview")) return false;
	var picShow = document.getElementById("preview");
	picShow.style.display = "block";
	picShow.style.position = "absolute";
	picShow.style.left = "200px";
	picShow.style.top = "100px";
		moveElement("preview",800,500,500);
}
// 加载调用
function addLoadEvent(fuc) {
	var oldOnLoad = window.onload;
	if (typeof window.onload != "function") {
		window.onload = fuc();
	} else {
		window.onload = function() {
		oldOnLoad();
		fuc();
		}
	}
}
addLoadEvent(posElement);
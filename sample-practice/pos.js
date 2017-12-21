// 定义调用函数
function posElement() {
	if (!document.getElementById || !document.getElementById("preview")) return false;
	var picShow = document.getElementById("preview");
	picShow.style.display = "block";
	picShow.style.position = "absolute";
	picShow.style.left = "200px";
	picShow.style.top = "100px";
	moveElement("preview",400,200,10);
}
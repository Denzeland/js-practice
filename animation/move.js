

function getStyle(obj, attr) {				// 封装获取当前样式方法
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
}

function animate(obj, josn, fn) {				// 封装动画框架							//假设所有属性值都到达终点
	clearInterval(obj.timer);					//每次事件响应要首先关闭定时器
	obj.timer = setInterval(function() {
		var flag = true;
		for(var attr in josn) {
			   									// 获取当前属性值
			var iCur = 0;
			if(attr == "opacity") {
				iCur = Math.round(parseFloat(getStyle(obj, attr))*100);
			} else {
				iCur = parseInt(getStyle(obj, attr));
			}

												
			var iSpeed = (josn[attr] - iCur)/20;   //设置变化的速度
			iSpeed = iSpeed > 0?Math.ceil(iSpeed):Math.floor(iSpeed);

												
			if(iCur != josn[attr]) { 			//检测停止
				flag = false;
			if(attr == "opacity") {
				obj.style.filter = "alpha('opacity:'+(iCur + iSpeed)+')";
				obj.style[attr] = (iCur + iSpeed)/100;
			} else {
				obj.style[attr] = iCur + iSpeed + "px";
			  }
			}
		}
		if(flag) {						//当所有属性值都到达设置终点，则清除定时器
			clearInterval(obj.timer);
		    if(fn) {
			fn();
			}
		}
				
	}, 30)
}
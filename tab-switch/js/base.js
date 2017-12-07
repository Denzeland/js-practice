;(function () {
	delay();
	autoSwitch();
	//定义延迟切换模块
	function delay() {
		//选择标签父容器
		var title = document.querySelector(".title");
		//选择所有标签li元素
		var lis = title.querySelectorAll("li");
		//选择内容显示容器
		var contents = document.querySelectorAll(".content");
		for (var i = 0; i <lis.length; i++) {
			lis[i].id = i;
			var timer = null;
			//给标签注册鼠标移入事件
			lis[i].addEventListener("mouseover", function() {
				var that = this;
				//让页面延迟显示
				timer = setTimeout(function() {
					//显示选择的标签页之前，首先让所有标签不被选中，内容不显示
					for (var j =0; j < lis.length; j++) {
					lis[j].className = "";
					contents[j].style.display = "none";
				}
				// 让鼠标移入的标签及对应的内容呈被选中状态
				that.className = "select";
				contents[that.id].style.display = "block";
				}, 300)
			})
		}
	}
	//定义自动切换模块
	function autoSwitch() {
		var title_auto = document.querySelector(".title.auto");
		if(!title_auto) return;
		var lis_auto = title_auto.getElementsByTagName("li");
		var contents_auto = document.querySelectorAll(".content.auto");
		var timer = null,
			index = 0;
		for (var i = 0; i < lis_auto.length; i++) {
			lis_auto[i].id = i;
			// 给每一个标签注册鼠标移入事件
			lis_auto[i].addEventListener("mouseover", function() {
				if(timer) {
					clearInterval(timer);
				}
			 	tabSwitch(this.id);
			});
			//给每一个标签注册鼠标移出事件
			lis_auto[i].addEventListener("mouseout", function() {
				//鼠标移出时先让要做切换的标签及内容盒子索引为当前标签索引
				index = this.id;
				//再开启定时器时，就从当前鼠标移出的下一个元素开始切换
				change();
			})
		//将选中标签并显示对应的内容封装成函数
		function tabSwitch(curIndex) {
			for (var j = 0; j < lis_auto.length; j++) {
	 		lis_auto[j].className = "";
	 		contents_auto[j].style.display = "none";
 			}
	 		lis_auto[curIndex].className = "select";
	 		contents_auto[curIndex].style.display = "block";
	 	}
	 	//设置定时器
	 	function change() {
	 	timer = setInterval(function() {
			 	index++;	
			 	if (index >= 5) {
			 		index = 0;
			 		tabSwitch(index);
			 	} else {
			 		tabSwitch(index);
			 	}
			 	 	
			}, 1000)
		}
	}
	change();
	}

})();
;(function() {
		// 引用接口datepicker
		var datepicker = window.datepicker;
		// 在外部定义全部月份数据和存储模板的变量，方便后面的函数复用
		var monthData, wrapper;
		// 在接口上定义根据传入的年份和月份获得渲染模板的方法
		datepicker.getRenderCalendar = function(year, month) {
			monthData = datepicker.getFullMonthData(year, month);
			var tmpl = '<div class="datePicker-header">'+
		'<a href="#" class="datePicker-btn datePicker-prev-btn">&lt;</a>'+
		'<a href="#" class="datePicker-btn datePicker-next-btn">&gt;</a>'+
		'<span datePicker-curr-month>'+ monthData.year + '年' + monthData.month + '月' + '</span>'+
		'</div>'+
		'<div class="datePicker-body">'+
		'<table>'+
		'<thead>'+
		'<tr>'+
			'<th>一</th>'+
			'<th>二</th>'+
			'<th>三</th>'+
			'<th>四</th>'+
			'<th>五</th>'+
			'<th>六</th>'+
			'<th>日</th>'+
		'</tr>'+
		'</thead>'+
		'<tbody>';
		// 将获得的全部数据对应的填入模板中，最后返回模板
		for (var i = 0; i < monthData.dates.length; i++) {
			var date = monthData.dates[i];
			if (i%7 === 0) {
				tmpl += '<tr>';
			}
			tmpl += '<td data-date="'+ date.date +'">' + date.showDate + '</td>';
			if (i%7 === 6) {
				tmpl += '</tr>';
			}
		}
		tmpl += '</tbody>'+
		'</table>'+
		'</div>';
		return tmpl;
	};
	// 这个方法是要根据点击的上一页/下一页来渲染日历
	datepicker.render = function(direc) {
		var month, year;
		if (monthData) {
			year = monthData.year;
			month = monthData.month;
		}
		if (direc === 'prev') month--;
		if (direc === 'next') month++;

		// 获得渲染的日历模板
		var html = datepicker.getRenderCalendar(year, month);
		wrapper = document.querySelector(".datePicker-warp");
		// 创建包裹元素，先添加进body元素中，再添加模板进包裹元素
		if (!wrapper) {
			wrapper = document.createElement("div");
			document.body.appendChild(wrapper);
			wrapper.className = 'datePicker-warp';
		} 
		wrapper.innerHTML = html;				
	};
	//定义插件的入口方法，点击输入框显示/隐藏日历，点击日期选择日期并填入输入框
	datepicker.getCalendar = function(input) {
		datepicker.render();
		var $input = document.querySelector(input),
			isShow = false;
		$input.addEventListener("click", function(){
			console.log(1);
			if (isShow) {
				wrapper.classList.remove('datePicker-warp-show');
				isShow = false;
			} else {
				wrapper.classList.add('datePicker-warp-show');
				isShow = true;
				var top = $input.offsetTop,
					height = $input.offsetHeight;
				wrapper.style.left = 0 + 'px';
				wrapper.style.top = top + height + 'px';
			}
		}, false);

		wrapper.addEventListener("click", function(e){
			var $target = e.target;
			if (!$target.classList.contains("datePicker-btn")) {
				return;
			}
			if ($target.classList.contains("datePicker-prev-btn")) {
				datepicker.render('prev');
			} else if ($target.classList.contains("datePicker-next-btn")) {
				datepicker.render('next');
			}
		}, false);

		wrapper.addEventListener("click", function(e){
			var $target = e.target;
			if ($target.tagName.toLowerCase() !== "td") {
				return;
			}
			var date = new Date(monthData.year, monthData.month - 1, $target.dataset.date);
			console.log($target.dataset.date);
			$input.value = format(date);
			wrapper.classList.remove('datePicker-warp-show');
				isShow = false;
		}, false);
	};
	// 定义格式化日期的函数
	function format(date) {
		var finish = "";
		function adjust(num) {
			if (num <= 9) {
				return "0" + num;
			}
			return num;
		}
		finish += date.getFullYear() + "年";
		finish += adjust(date.getMonth() + 1) + "月";
		finish += adjust(date.getDate()) + "日";
		return finish;
	} 
})();
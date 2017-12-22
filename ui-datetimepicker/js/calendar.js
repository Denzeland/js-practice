;(function() {
	// 定义一个公共的接口
	var datepicker = {};
	// 定义获取整个月份数据的方法
	datepicker.getFullMonthData = function(year, month) {
		var monthData = [];
		// 如果方法不传参数，就用当前系统时间
		if (!year || !month) {
			var now = new Date(),
				year = now.getFullYear(),
				month = now.getMonth() + 1;
		}
		// 获取当月的第一天及对应的星期
		var firstDay = new Date(year, month - 1, 1),
			firstWeekDay = firstDay.getDay();
		if (firstWeekDay === 0) {
			firstWeekDay = 7;
		}
		//获取上月的最后一天日期数，当月最后一天日期数和日历要显示的上月的天数
		var year = firstDay.getFullYear(),
			month = firstDay.getMonth() + 1,
			lastDayOfPreMonth = new Date(year, month - 1, 0),
			lastDateOfPreMonth = lastDayOfPreMonth.getDate(),
			showPreMonthCount = firstWeekDay - 1,
			lastDay = new Date(year, month, 0),
			lastDate = lastDay.getDate();
		// 循环得到日历要显示的42个数据
		for (var i = 0; i < 7*6; i++) {
			// date是当月显示的日期，showDate是实际要显示的日期
			var date = i + 1 - showPreMonthCount,
				showDate = date;
				// thisMonth = month;
			if (date <= 0) {
				// 要显示的日期是上一个月
				// thisMonth = month - 1;
				showDate = lastDateOfPreMonth + date;
			} else if (date > lastDate) {
				//要显示的日期是下一个月
				// thisMonth = month + 1;
				showDate -= lastDate;
			}
			// if (thisMonth === 0) thisMonth = 12;
			// if (thisMonth === 13) thisMonth = 1;
			// thisMonth是为了方便思路整理，实际要的数据就是showDate和date
			monthData.push({
				// month: thisMonth,
				// showDate即是模板里要填入的数据
				showDate: showDate,
				// date也是点击获取日期要用到的数据
				date: date
			})
		}
		return {
			year: year,
			month: month,
			dates: monthData
		};
	};
	// 让接口成为window对象的属性
	window.datepicker = datepicker;
	// console.log(datepicker.getFullMonthData(2017, 12));
})();
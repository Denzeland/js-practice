### 日期选择插件

用原生javascript写的一款漂亮的日期选择插件，可以点击输入框弹出日历，再点击输入框日历消失。点击左右的分页按钮可以切换显示不同的月份，点击日历上的日期可以在输入框填入相应的日期，并且日历消失。日历插件采用绝对定位，不影响文档流，方便复用。
![jJCMq.gif](https://s1.ax1x.com/2017/12/22/jJCMq.gif)

**javascript部分的一些总结**

* 总体思路是定义一个datepicker对象，并挂载到window对象上，后面定义的一些插件的方法都是datepicker对象的属性，方便调用。
* 整个日历插件的重点部分是获取整个月份的数据，并把数据填入模板，最后渲染模板。

	* 获取整个月份数据的方法是datepicker.getFullMonthData(year, month)，*难点的算法在于如何确定要在日历上显示的42个日期数*，这个方法返回包含年份，月份和要填入模板的日期数据的对象。
	* 生成日历模板的方法是datepicker.getRenderCalendar(direc), 这个方法主要是将获得的整个月份的数据用一个for循环填入表格的单元格中，最后返回模板
	* 渲染日历模板的方法是datepicker.render(),这个方法是要根据点击的上一页/下一页来调整月份，并调用datepicker.getRenderCalendar()方法，动态创建包裹元素来添加模板并追加到页面中。

* 插件可以通过调用datepicker.getCalendar()方法来使用，这也是总的入口函数，只需要传入要使用插件的input元素的css选择器就可使用插件，如：datepicker.getCalendar("input");一条代码就可以使用插件，可以很方便的复用。
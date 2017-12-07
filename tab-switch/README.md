### Tab栏延迟切换和自动切换

**主要完成的效果**

* 鼠标移入每个标签上，显示对应标签的内容
* 显示的时候有延时效果
* 实现自动切换，自动切换的同时也可以鼠标移入切换
* 鼠标移出时自动从当前标签的下一个标签开始接着切换
![ThJlF.gif](https://s1.ax1x.com/2017/12/07/ThJlF.gif)
**下面记录下自动切换模块js代码**
```
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
```

window.onload = function() {
	// 获取页面所有的输入框，消息提示，字符计数和密码强度提示的元素
	var allInputs = document.getElementsByTagName("input"),
	    nameInput = allInputs[0],
	    pwd = allInputs[1],
	    pwd2 = allInputs[2],
	    allP = document.getElementsByTagName("p"),
	    nameMsg = allP[0],
	    pwdMsg = allP[1],
	    pwd2Msg = allP[2],
	    count = document.getElementById("count"),
	    allEm = document.getElementsByTagName("em");
	    nameLength = 0;
	    console.log(pwd2Msg);
	// 返回用户名输入框的字符串长度
	function getNameLen(str) {
		return str.replace(/[^\x00-xff]/g, "xx").length;
	}
	//查找字符串中的每一个字符是不是与给定的字符相同
	function findStr(str, s) {
		var num = 0;
		for (var i = 0; i < str.length; i++) {
			if (str.charAt(i) === s) {
				num++;
			}
		}
		return num;
	}
	// 用户名输入框获得焦点事件
	nameInput.onfocus = function() {
		nameMsg.style.display = "block";
		nameMsg.innerHTML = '<i class="icon-notification"></i>5-25个字符，一个汉字为两个字符，推荐使用中文会员名';
		count.style.visibility = "visible";
	}
	// 用户名输入框键盘抬起事件
	nameInput.onkeyup = function() {
		nameLength = getNameLen(this.value);
		count.innerHTML = nameLength + "个字符";
	}
	// 用户名输入框失去焦点事件
	nameInput.onblur = function() {
		//匹配字母、数字、中文以外的正则表达式
		var reg = /[^\w\u4e00-\u9fa5]/g;
		if (reg.test(this.value)) {
			nameMsg.innerHTML = '<i class="icon-cancel-circle"></i>含有非法字符！';
		}
		else if (this.value === ""){
			nameMsg.innerHTML = '<i class="icon-cancel-circle"></i>会员名不能为空！';
		}
		else if (nameLength < 5) {
			nameMsg.innerHTML = '<i class="icon-cancel-circle"></i>字符少于5个！';
		}
		else if (nameLength > 25) {
			nameMsg.innerHTML = '<i class="icon-cancel-circle"></i>字符超过25个！';
		}
		else {
			nameMsg.innerHTML = '<i class="icon-checkmark2"></i>OK！';
		}
	}
	pwd.onfocus = function() {
		pwdMsg.style.display = "block";
		pwdMsg.innerHTML = '<i class="icon-notification"></i>6-16个数字、字母组合的字符';
	}
	pwd.onkeyup = function() {
		//密码长度超过5个字符小于10个字符时强度为中
		if (this.value.length > 5 && this.value.length <= 10) {
			allEm[1].className = "active";
			pwd2.removeAttribute("disabled");
		}
		//密码长度小于5个时强度为弱
		else {
			allEm[1].className = "";
			pwd2.setAttribute("disabled", "true");
		}
		//密码长度超过10个字符为强
		if (this.value.length > 10) {
			allEm[1].className = "active";
			allEm[2].className = "active";
			pwd2.removeAttribute("disabled");
		} else {
			allEm[2].className = "";
		}
	}
	pwd.onblur = function() {
		//密码不能为空
		var sameNum = findStr(pwd.value, pwd.value[0]),
			numReg = /[^\d]/g,
			wordReg = /[^a-zA-Z]/g;
		if (this.value === "") {
			pwdMsg.innerHTML = '<i class="icon-cancel-circle"></i>密码不能为空！';
		}
		//密码不能相同
		else if (sameNum === pwd.value.length) {
			pwdMsg.innerHTML = '<i class="icon-cancel-circle"></i>密码不能相同！';
		}
		//不能全为数字
		else if (!numReg.test(this.value)) {
			pwdMsg.innerHTML = '<i class="icon-cancel-circle"></i>不能全为数字！';
		}
		//不能全为字母
		else if (!wordReg.test(this.value)) {
			pwdMsg.innerHTML = '<i class="icon-cancel-circle"></i>不能全为字母！';
		} else {
			pwdMsg.innerHTML = '<i class="icon-checkmark2"></i>OK！';
		} 
	}
	pwd2.onblur = function() {
		if (this.value !== pwd.value) {
			pwd2Msg.style.display = "block";
			pwd2Msg.innerHTML = '<i class="icon-notification"></i>两次输入不一致！';
		} else {
			pwd2Msg.style.display = "block";
			pwd2Msg.innerHTML = '<i class="icon-checkmark2"></i>OK！';
		}
	}
}

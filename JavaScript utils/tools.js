// type封装方法

function type(target) {
	var ret = typeof (target);
	var template = {
		"[object Array]": "array",
		"[object Object]": "object",
		"[object Number]": "number - object",
		"[object Boolean]": "boolean - object",
		"[object String]": "string - object"
	}
	if (target === null) {
		return "null";
	} else if (ret == "object") {
		var str = Object.prototype.toString.call(target);
		return template[str];
	} else {
		return ret;
	}
}


// 数组去重

Array.prototype.unique = function () {
	var temp = {},
		arr = [],
		len = this.length;
	for (var i = 0; i < len; i++) {
		if (!temp[this[i]]) {
			temp[this[i]] = 'abc';
			arr.push(this[i]);
		}
	}
	return arr;
}

// 字符串去重

function unique(str) {
	var temp = {},
		newStr = '',
		len = str.length;
	for (var i = 0; i < len; i++) {
		if (!temp[str[i]]) {
			temp[str[i]] = "zbq";
			newStr += str[i];
		}
	}
	return newStr;
}


// 找子元素节点

// var div = document.getElementsByTagName('div')[0];

// function retElementChild(node) {
//     var temp = {
//         length: 0,
//         push: Array.prototype.push,
//         splice: Array.prototype.splice
//     },
//         child = node.childNodes,
//         len = child.length;
//     for (var i = 0; i < len; i++) {
//         if (child[i].nodeType === 1) {
//             temp.push(child[i]);
//         }
//     }
//     return temp;
// }

// console.log(retElementChild(div));

// 返回元素e的第n层祖先元素

function retParent(elem, n) {
	while (elem && n) {
		elem = elem.parentElement;
		n--;
	}
	return elem;
}

var i = document.getElementsByTagName('i')[0];

// 封装children功能，解决以前部分浏览器的兼容问题

Element.prototype.myChildren = function () {
	var child = this.childNodes;
	var len = child.length;
	var arr = [];
	for (var i = 0; i < len; i++) {
		if (child[i].nodeType == 1) {
			arr.push(child[i]);
		}
	}
	return arr;
}

// 封装hasChildren方法，不可用children属性

Element.prototype.myChildren = function () {
	var child = this.childNodes;
	var len = child.length;
	for (var i = 0; i < len; i++) {
		if (child[i].nodeType == 1) {
			return true;
		}
	}
	return false;
}

// 封装函数，返回元素e的第n个兄弟元素节点，n为正，返回后面的兄弟元素节点，n为负，返回前面的兄弟元素节点，n为0，返回自己；
// 不兼容ie9以下版本浏览器的写法
function retSibling(e, n) {
	while (e && n) {
		if (n > 0) {
			e = e.nextElementSibling;
			n--;
		}
		if (n < 0) {
			e = e.previousElementSibling;
			n++;
		}
	}
	return e;
}
// 兼容ie9以下版本的浏览器写法

function retSibling(e, n) {
	while (e && n) {
		if (n > 0) {
			if (e.nextElementSibling) {
				e = e.nextElementSibling;
			} else {
				for (e = e.nextSibling; e && e.nodeType != 1; e = e.nextSibling);
			}
			n--;
		}
		if (n < 0) {

			if (e.previousElementSibling) {
				e = e.previousElementSibling;
			} else {
				for (e = e.previousSibling; e && e.nodeType != 1; e = e.previousSibling);
			}
			n++;
		}
	}
	return e;
}

// 封装insertAfter方法

Element.prototype.insertAfter = function (targetNode, afterNode) {
	var beforeNode = afterNode.nextElementSibling;
	if (beforeNode == null) {
		this.appendChild(targetNode);
	} else {
		this.insertBefore(targetNode, beforeNode);
	}
}

// 元素逆序

Element.prototype.reverseOrder = function () {
	var child = this.childNodes; // 先把节点全部选出来
	var len = child.length;
	for (var i = len - 2; i >= 0; i--) {
		this.appendChild(child[i]);
	}
}

// 打印今天是什么时间

var date = new Date();

function printTime() {
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hour = date.getHours();
	var min = date.getMinutes();
	var sec = date.getSeconds();

	console.log("今天是" + year + "年" + month + "月" + day + "日" + hour + "时" + min + "分" + sec + "秒");
}

// 求滚动条的滚动距离

function getScrollOffset() {

	if (window.pageXOffset) {
		return {
			x: window.pageXOffset,
			y: window.pageYOffset
		}
	} else {
		return {
			x: document.body.scrollLeft + document.documentElement.scrollLeft,
			y: document.body.scrollTop + document.documentElement.scrollTop
		}
	}
}

// 求可视区窗口的尺寸

function getViewportOffset() {
	if (window.innerWidth) {
		return {
			w: window.innerWidth,
			h: window.innerHeight
		}
	} else {
		if (document.compatMode === "BackCompat") {
			return {
				w: document.body.clientWidth,
				h: document.body.clientHeight
			}
		} else {
			return {
				w: document.documentElement.clientWidth,
				h: document.documentElement.clientHeight
			}
		}
	}
}

// 获取元素属性的兼容性方法(很常用)

function getStyle(elem, prop) {
	if (window.getComputedStyle) {
		return window.getComputedStyle(elem, null)[prop];
	} else {
		return ele.currentStyle[prop];
	}
}

// 兼容性的addEvent(elem,type,handle)方法；

function addEvent(elem, type, handle) {
	if (elem.addEventListener) {
		elem.addEventListener(type, handle, false)
	} else if (elem.attachEvent) {
		elem.attachEvent('on' + type, function () {
			handle.call(this);
		})
	} else {
		elem['on' + type] = handle;
	}
}

//兼容性removeEvent(elem,type,handle)方法；

function removeEvent(elem, type, handle) {
	if (elem.removeEventListener) {
		elem.removeEventListener(type, handle, false);
	} else if (elem.detachEvent) {
		elem.detachEvent("on" + type, function () {
			handle.call(elem);
		})
	} else {
		elem["on" + type] = null;
	}
}

//  取消冒泡的函数

function stopBubble(event) {
	if (event.stopPropagation) {
		event.stopPropagation;
	} else {
		event.cancelBubble = true;
	}
}

// 阻止默认事件的函数

function cancelHandle(event) {
	if (event.preventDefault) {
		event.preventDefault();
	} else {
		event.returnValue = false;
	}
}

// 浅层克隆
function clone(origin, target) {
	var target = target || {};
	for (var prop in origin) {
		target[porp] = origin[prop];
	}
	return target;
}

// 深度克隆
function deepClone(origin, target) {
	var target = target || {};
	var toStr = Object.prototype.toString,
		arrStr = "[object Array]";
	for (var prop in origin) {
		if (origin.hasOwnProperty(prop)) {
			if (origin[prop] !== "null" && typeof (origin[prop]) == "object") {
				// if (toStr.call(origin[prop]) == arrStr) {
				//     target[prop] = [];
				// } else {
				//     target[prop] = {};
				// } 
				target[prop] = toStr.call(origin[prop]) == arrStr ? [] : {};
				deepClone(origin[prop], target[prop]);
			} else {
				target[prop] = origin[prop];
			}
		}
	}
	return target;
}

// 拖拽

// function drag(elem) {
//     var disX,
//         disY;
//     addEvent(elem, "mousedown", function (e) {
//         var event = e || window.event;
//         disX = event.clientX - parseInt(getStyle(elem, 'left')) + "px";
//         disY = event.clientY - parseInt(getStyle(elem, 'top')) + "px";
//         addEvent(document, 'mousemove', mouseMove);
//         addEvent(document, 'mouseup', mouseUp);
//         stopBubble(event);
//         cancelHandle(event);
//     })
//     function mouseMove(e) {
//         var event = e || window.event;
//         elem.style.left = event.clientX - disX + "px";
//         elem.style.top = event.clientY - disY + "px";
//     }
//     function mouseUp(e) {
//         var event = e || window.event;
//         removeEvent(document, 'mousemove', mouseMove);
//         removeEvent(document, 'mouseup', mouseUp);
//     }
// }

// class操作工具类
function addClass(node, className) {
	var reg = new RegExp("\\b" + className + "\\b");
	if (!reg.test(node.className)) {
		node.className += (" " + className);
	}
}
function removeClass(node, className) {
	if (node.className) {
		var reg = new RegExp("\\b" + className + "\\b");
		var classes = node.className;
		node.className = classes.replace(reg, "");
		if (/^\s*$/g.test(node.className)) {
			node.removeAttribute("class");
		}
	} else {
		node.removeAttribute("class");
	}
}

// 时间格式化
function dateFormat(timestamp, format) {
	if (!format) {
		format = "yyyy-MM-dd hh:mm:ss";
	}
	timestamp = parseInt(timestamp * 1000);
	var realDate = getDate(timestamp);
	function timeFormat(num) {
		return num < 10 ? '0' + num : num;
	}
	var date = [
		["M+", timeFormat(realDate.getMonth() + 1)],
		["d+", timeFormat(realDate.getDate())],
		["h+", timeFormat(realDate.getHours())],
		["m+", timeFormat(realDate.getMinutes())],
		["s+", timeFormat(realDate.getSeconds())],
		["q+", Math.floor((realDate.getMonth() + 3) / 3)],
		["S+", realDate.getMilliseconds()],
	];

	var regYear = getRegExp("(y+)", "i");
	var reg1 = regYear.exec(format);
	if (reg1) {
		format = format.replace(reg1[1], (realDate.getFullYear() + '').substring(4 - reg1[1].length));
	}
	for (var i = 0; i < date.length; i++) {
		var k = date[i][0];
		var v = date[i][1];

		var reg2 = getRegExp("(" + k + ")").exec(format);
		if (reg2) {
			format = format.replace(reg2[1], reg2[1].length == 1
				? v : ("00" + v).substring(("" + v).length));
		}
	}
	return format;
}

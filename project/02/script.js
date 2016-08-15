function css(ele, attr, value) {
	switch (arguments.length) {
		case 2:
			if (typeof attr == 'object') {
				for (var i in attr)
					ele.style[i] = attr[i];
			} else {
				return ele.currentStyle ? ele.currentStyle[attr] : getComputedStyle(ele, null)[attr];
			}
			break;
		case 3:
			ele.style[attr] = value;
			break;
		default:
			alert('error');
	}
}

(function() {
	var msgBox = document.getElementById('msgBox'); //box
	var userName = document.getElementById('userName');  //name input
	var conBox = document.getElementById('conBox');  //msg input
	var sendBtn = document.getElementById('sendBtn');  //send button
	var ul = msgBox.querySelector('ul');  //msg list
	var lis = ul.querySelectorAll('li');  //list item
	var imgs = msgBox.querySelectorAll('#msgBox #face img');

	//submit
	msgBox.querySelector('form').addEventListener('submit', function(event) {
		if (nameCheck(userName) && conCheck(conBox)) {
			send();
			//reset
			this.reset();
			confine(conBox);
			for (var i = 0; i < imgs.length; i++) {
				imgs[i].className = '';
			}
			imgs[0].className = 'current';	
		}
		event.preventDefault();
	});



	//change style
	sendBtn.addEventListener('mouseover', function() {
		this.className = 'hover';
	});
	sendBtn.addEventListener('mouseout', function() {
		this.className = '';
	});

	userName.addEventListener('focus', function() {
		this.className = 'active';
	});
	userName.addEventListener('blur', function() {
		this.className = '';
	});

	conBox.addEventListener('focus', function() {
		this.className = 'active';
	});
	conBox.addEventListener('blur', function() {
		this.className = '';
	});

	for (var i = 0; i < lis.length; i++) {
		liHover(lis[i]);
		delLi(lis[i]);
	}

	//ctrl+enter send
	document.addEventListener('keypress', function(event) {
		var event = event ? event : window.event;
		event.ctrlKey && event.keyCode == 13 && sendBtn.click();
	});

	//confine words
	var state = confine(conBox); //num of words flag
	conBox.addEventListener('keyup', function() {
		state = confine(this);
	});
	conBox.addEventListener('change', function() {
		state = confine(this);
	});

	//picture
	for (var i = 0; i < imgs.length; i++) {
		imgs[i].onmouseover = function() {
			this.className += ' hover';
		};

		imgs[i].onmouseout = function() {
			this.className = this.className.replace(/\s?hover/, '');
		};

		imgs[i].onclick = function() {
			for (var i = 0; i < imgs.length; i++) {
				imgs[i].className = '';
			}
			this.className = 'current';
		};
	}

	//

	function nameCheck(ele) {
		if (/^\s*$/g.test(ele.value)) {
			alert("\u8bf7\u586b\u5199\u60a8\u7684\u59d3\u540d");
			ele.focus();
			return false;
		}
		if (! /^[u4e00-\u9fa5\w]{2,8}$/g.test(ele.value)) {
			alert("\u59d3\u540d\u75312-8\u4f4d\u5b57\u6bcd\u3001\u6570\u5b57\u3001\u4e0b\u5212\u7ebf\u3001\u6c49\u5b57\u7ec4\u6210\uff01");
			ele.focus();
			return false;
		}
		return true;
	}

	function conCheck(ele) {
		if (/^\s*$/g.test(ele.value)) {
			alert("\u968f\u4fbf\u8bf4\u70b9\u4ec0\u4e48\u5427\uff01");
			ele.focus();
			return false;
		}
		if (! state) {
			alert("\u4f60\u8f93\u5165\u7684\u5185\u5bb9\u5df2\u8d85\u51fa\u9650\u5236\uff0c\u8bf7\u68c0\u67e5\uff01");
			ele.focus();
			return false;
		}
		return true;
	}

	
	function send() {
		var msg = createMsg();
		liHover(msg);
		delLi(msg);
		ul.insertBefore(msg, ul.firstChild);
	}

	function createMsg() {
		var li = document.createElement('li');

		var img = document.createElement('img');
		img.src = imgs[0].parentNode.querySelector('.current').src;
		var div1 = createDiv('userPic', img);
		
		var a0 = document.createElement('a');
		a0.href = 'javascript:;';
		a0.innerHTML = userName.value;

		var span = document.createElement('span');
		var date = new Date();
		span.innerHTML = format(date.getMonth() + 1) + '月'  + format(date.getDate()) + '日 ' + format(date.getHours()) + ':' + format(date.getMinutes());
		
		var a = document.createElement('a');
		a.className = 'del';
		a.href = 'javascript:;';
		a.style.display = 'none';
		a.textContent = '删除';

		var div2 = createDiv('content', createDiv('userName', a0, ':'), createDiv('msgInfo', conBox.value), createDiv('times', span, a));

		li.appendChild(div1);
		li.appendChild(div2);
		return li;
	}

	function createDiv(clsName) {
		var div = document.createElement('div');
		div.className = clsName;

		for (var i = 1; i < arguments.length; i++) {
				if (typeof arguments[i] == 'object')
					div.appendChild(arguments[i]);
				else {
					var node = document.createTextNode(arguments[i]);
					div.appendChild(node);
				}
		}
		return div;
	}

	function format(num) {
		return num.toString().replace(/^(\d)$/, "0$1");
	}

	function confine(ele) {
		var maxNum = 140;
		var value = ele.value;
		var countTxt = msgBox.querySelector('.countTxt');
		var num = msgBox.querySelector('.num');
		var len = 0;
		for (var i = 0; i < value.length; i++) {
			len += /[^\x00-\xff]/g.test(value.charAt(i)) ? 1 : 0.5;
		}
		num.innerHTML = Math.abs(Math.ceil(len - maxNum));
		if (len > maxNum) {
			countTxt.innerHTML = '\u5df2\u8d85\u51fa';
			css(num, 'color', '#f60');
			return false;
		} else {
			countTxt.innerHTML = '\u8fd8\u80fd\u8f93\u5165';
			css(num, 'color', '');
			return true;
		}
	}

	function liHover(li) {
		li.addEventListener('mouseover', function() {
			this.className = 'hover';
			li.querySelector('.del').style.display = 'block';
		});

		li.addEventListener('mouseout', function() {
			this.className = '';
			li.querySelector('.del').style.display = 'none';
		});
	}

	function delLi(li) {
		li.querySelector('.del').onclick = function() {
			ul.removeChild(li);
		};
	}
})();
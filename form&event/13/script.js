(function() {
	var btns = document.querySelectorAll('input');
	var p = document.querySelector('p');
	var div = document.querySelector('div');

	for (var i = 0; i < btns.length; i++) {		
		btns[i].addEventListener('click', function(event) {
			var event = event ? event : window.event;
			event.stopPropagation();
		});
		btns[i].addEventListener('mousedown', function(event) {
			var event = event ? event : window.event;
			event.stopPropagation();
		});
		btns[i].addEventListener('mouseup', function(event) {
			var event = event ? event : window.event;
			event.stopPropagation();
		});		
	}

	btns[0].onclick = function() {
		reset(this);

		document.onclick = function(event) {
			var event = event ? event : window.event;
			div.style.background = 'url(img/2.gif) no-repeat';
			slide(div, {x: event.clientX, y: event.clientY}, function() {
				div.style.background = 'url(img/1.gif) no-repeat';
			});
		}
	};

	btns[1].onclick = function() {
		reset(this);
		var pos = new Array;
		document.onmousedown = function(event) {
			var event = event ? event : window.event;

			pos.push({x: event.clientX, y: event.clientY});

			document.onmousemove = function(event) {
				var event = event ? event : window.event;
				pos.push({x: event.clientX, y: event.clientY});
				return false;
			};
			return false;
		};

		document.onmouseup = function() {
			document.onmousemove = null;
			div.style.background = 'url(img/2.gif) no-repeat';
			var timer = setInterval(function() {
				if (pos.length == 0) {
					clearInterval(timer);
					div.style.background = 'url(img/1.gif) no-repeat';
					return;
				}
				var t = pos.shift();
				div.style.left = t.x + 'px';
				div.style.top = t.y + 'px';
			}, 30);
		};
	};

	function reset(ele) {
		for (var i = 0; i < btns.length; i++) {
			btns[i].value = btns[i].value.replace('(已激活)', '');
		}
		ele.value += '(已激活)';

		if (ele == btns[0]) {
			p.textContent = '鼠标点击页面， 人物将移动至鼠标位置！';	
			document.onmousedown = null;
			document.onmouseup = null;		
		} else {
			p.textContent = '按住鼠标左键在页面划动，人物将按照鼠标轨迹移动！';
			document.onclick = null;
		}	
	}

  function slide(ele, to, fn) {
		clearInterval(ele.timer);
		var cur = {x: ele.offsetLeft, y: ele.offsetTop};
    ele.timer = setInterval(function() {  
      var step = {x: (to.x - cur.x) / 8, y: (to.y - cur.y) / 8};
      step.x = step.x > 0 ? Math.ceil(step.x) : Math.floor(step.x);
      step.y = step.y > 0 ? Math.ceil(step.y) : Math.floor(step.y);
      if (cur.x == to.x && cur.y == to.y) {
        clearInterval(ele.timer);
        fn && fn();
      }
      else {
      	cur.x += step.x;
      	cur.y += step.y;
        ele.style.left = cur.x + 'px';
        ele.style.top = cur.y + 'px';
      }
    }, 30);
  }
})();
(function() {
	var box = document.querySelector('#box');
	var h2 = document.querySelector('#box h2');
	var a = h2.querySelector('a');
	var span = document.querySelectorAll('#box span');
	var mPos = [0, 0]; //mouse position
	var pos = new Array;  //trend
	var drag = false;

	status();

	h2.onmousedown = function(event) {
		var event = event ? event : window.event;
		pos.push({x: box.offsetLeft, y: box.offsetTop});
		drag = true;
		mPos[0] = event.clientX - box.offsetLeft;
		mPos[1] = event.clientY - box.offsetTop;
		this.setCapture && this.setCapture();
		return false;
	};

	document.onmousemove = function(event) {
		if (!drag)
			return;
		var event = event ? event : window.event;

		var left = event.clientX - mPos[0];
		var top = event.clientY - mPos[1];

		left = left > 0 ? Math.min(left, document.documentElement.clientWidth - box.offsetWidth) : 0;
		top = top > 0 ? Math.min(top, document.documentElement.clientHeight - box.offsetHeight) : 0;

		box.style.marginTop = box.style.marginLeft = 0 + 'px';
		box.style.left = left + 'px';
		box.style.top = top + 'px';
		pos.push({x: left, y: top});

		status();
	};

	document.onmouseup = function() {
		drag = false;
		h2.releaseCapture && h2.releaseCapture();
		status();
	};

	a.onclick = function(event) {
		if (pos.length == 0)
			return;

		var timer = setInterval(function() {
			var p = pos.pop();
			if (p) {
				box.style.left = p.x + 'px';
				box.style.top = p.y + 'px';	
				status();	
			} else
				clearInterval(timer);
		}, 30);
	};

	a.onmousedown = function(event) {
		var event = event || window.event;
		event.stopPropagation();
	};

	function status() {
		span[0].innerHTML = drag;
		span[1].innerHTML = box.offsetTop;
		span[2].innerHTML = box.offsetLeft;
	}
})();
function Drag(elt, handler, container, options) {
	this.elt = elt;
	this.handler = handler;
	this.container = container;
	this.limit = true; 		//限制范围
	this.lockX = false;  	//水平锁定
	this.lockY = false;	  //垂直锁定
	this.lock = false;    //位置锁定
	this.onStart = function() {};
	this.onMove = function() {};
	this.onStop = function() {};
	for (var p in options) this[p] = options[p];
	this.init();
	this._move = this.move.bind(this);
	this._stop = this.stop.bind(this);
	handler.addEventListener('mousedown', this.start.bind(this));
}

Drag.prototype.init = function() {
	this.handler.style.cursor = 'move';

	var style = this.elt.style;
	this.left = this.elt.offsetLeft;
	this.top = this.elt.offsetTop;
	style.left = this.left + 'px';
	style.top = this.top + 'px';
	style.position = 'absolute';
	style.margin = 0;
}

Drag.prototype.start = function(event) {
  var event = event ? event : window.event;
  this.mPos = new Array(2);

  this.mPos[0] = event.clientX - this.left;
  this.mPos[1] = event.clientY - this.top;
  this.handler.setCapture && this.handler.setCapture();
  addEventListener('mousemove', this._move);
  addEventListener('mouseup', this._stop);
  this.onStart();
  event.preventDefault && event.preventDefault();
};

Drag.prototype.move = function(event) {
	if (this.lock) return;

  var event = event ? event : window.event;
  var left = event.clientX - this.mPos[0];
  var top = event.clientY - this.mPos[1];

  if (this.limit) {
  	if (!this.lockX) {
  		var maxWidth = Math.max(this.container.clientWidth, this.container.scrollWidth);
			this.left = left > 0 ? Math.min(left, maxWidth - this.elt.offsetWidth) : 0;
  	}
  	if (!this.lockY) {
  		var maxHeight = Math.max(this.container.clientHeight, this.container.scrollHeight);
			this.top = top > 0 ? Math.min(top, maxHeight - this.elt.offsetHeight) : 0;
  	}
  } else {
  	this.lockX || (this.left = left);
  	this.lockY || (this.top = top); 	
  }
  this.elt.style.left = this.left + 'px';
  this.elt.style.top = this.top + 'px';
	this.onMove();
	event.preventDefault && event.preventDefault();
};

Drag.prototype.stop = function(event) {
	this.onStop();
	this.handler.releaseCapture && this.handler.releaseCapture();
	removeEventListener('mousemove', this._move);
	removeEventListener('mouseup', this._stop);
};

window.onload = function() {
	var box = document.querySelector('#box');
	var h2 = document.querySelector('#box h2');
	var btns = document.querySelectorAll('#tool input');
	var drag = new Drag(box, h2, document.documentElement, {limit: false});

	btns[0].onclick = function() {
		drag.limit = !drag.limit;
		this.value = drag.limit ?  '取消锁定范围' : '锁定范围';
	};
	btns[1].onclick = function() {
		drag.lockX = !drag.lockX;
		this.value = drag.lockX ?  '取消水平锁定' : '水平锁定';
	};
	btns[2].onclick = function() {
		drag.lockY = !drag.lockY;
		this.value = drag.lockY ?  '取消垂直范围' : '垂直锁定';
	};
	btns[3].onclick = function() {
		drag.lock = !drag.lock;
		this.value = drag.lock ?  '取消锁定位置' : '锁定位置';
	};

	var span = document.querySelector('span');
	drag.onStart = function() {
		span.innerHTML = "开始拖拽";
	};
	
	drag.onMove = function() {
		span.innerHTML = "left:" + this.elt.offsetLeft + ", top:" + this.elt.offsetTop;	
	};
	
	drag.onStop = function() {
		span.innerHTML = "结束拖拽";
	};

};

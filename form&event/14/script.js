(function() {
	var iphone = document.querySelector('#iphone');
	var lock = document.querySelector('span');

  lock.onmousedown = function(event) {
    var event = event ? event : window.event;
    var mPos = event.clientX;
    var left;
    this.setCapture && this.setCapture();
    document.onmousemove = function(event) {
      var event = event ? event : window.event;
      left = event.clientX - mPos;
      left = left < 0 ? 0 : left;
      lock.style.left = left + 'px';
      if (left > 265) 
      	unlock();
      return false;
    };

    document.onmouseup = function(event) {
    	lock.releaseCapture && lock.releaseCapture();
    	document.onmousemove = null;
  		if (left > 132) {
  			slide(lock, 'left', 265, unlock);
  		} else {
  			slide(lock, 'left', 0);
  			document.onmouseup = null;
  		}
  		return false;
  	} 
  	return false;
  };

  function unlock() {
  	lock.style.display = 'none';
    iphone.style.background = "url(http://fgm.cc/iphone/2.jpg)"; //firefox bug
  	document.onmousemove = null;
  	document.onmouseup = null;
  	lock.onmousedown = null;
  }

  function slide(ele, attr, to, fn) {
    ele.timer && clearInterval(ele.timer);
    var cur = parseInt(getStyle());
    ele.timer = setInterval(function() {
      var step = (to - cur) / 8;
      step = step > 0 ? Math.ceil(step) : Math.floor(step);
      if (cur != to) {
        cur += step;
        ele.style[attr] = cur + 'px';
      }
      else {
        clearInterval(ele.timer);
        ele.timer = null;
        fn && fn();
      }
    }, 30);
    function getStyle() {
      return ele.currentStyle ? ele.currentStyle[attr] : getComputedStyle(ele, null)[attr];
    }
  }
})();
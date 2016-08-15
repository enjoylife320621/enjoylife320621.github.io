window.onload = function() {
  var wrap = document.querySelector('#imgwrap');
  var imgs = wrap.querySelectorAll('img');
  //init
  var showWidth = 160;
  var width = imgs[0].offsetWidth;
  wrap.style.width = showWidth * (imgs.length - 1) + width + 'px';
  for (var i = 1; i < imgs.length; i++) {
    var style = imgs[i].style;
    style.left = (i - 1) * showWidth + width + 'px';
  }

  for (i = 0; i < imgs.length; i++) {
    imgs[i].index = i;
    imgs[i].onmouseover = function() {
      for (var i = 0; i < this.index; i++)
        slide(imgs[i], 'left', i * showWidth);
      slide(this, 'left', this.index * showWidth);
      for (i = this.index + 1; i < imgs.length; i++)
        slide(imgs[i], 'left', (i - 1) * showWidth + width);
    };
  }


  function slide(ele, attr, to, fn) {
    clearInterval(ele.timer);
    var cur = parseFloat(getStyle(ele, attr));
    ele.timer = setInterval(function() {
      var step = (to - cur) / 8;
      step = step > 0 ? Math.ceil(step) : Math.floor(step);
      if (cur != to) {
        cur += step;
        ele.style[attr] = cur + 'px';  
      }
      else {
        clearInterval(ele.timer);
        fn && fn();
      }
    }, 30);
  }

  function getStyle(ele, attr) {
    return ele.currentStyle ? ele.currentStyle[attr] : getComputedStyle(ele, null)[attr];
  }  
}

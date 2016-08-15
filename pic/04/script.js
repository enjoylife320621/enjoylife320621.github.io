window.onload = function() {
  var left = document.querySelector('.ad.left');
  var right = document.querySelector('.ad.right');
  var top = left.offsetTop;

  addEventListener('scroll', function() {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    slide(left, 'top', top + scrollTop);
    slide(right, 'top', top + scrollTop);
  });

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
(function() {
  var box = document.getElementById('box');
  var dot = document.getElementById('bar').getElementsByTagName('a');
  var prev = document.getElementById('prev');
  var next = document.getElementById('next');
  var container = document.getElementById('container');
  container.innerHTML += container.innerHTML;
  var index = 0;
  var ul = container.getElementsByTagName('ul');
  var pages = 2;
  var pageWidth = ul[0].offsetWidth;
  var showTime = 3500;
  
  var timer = setInterval(auto, showTime);


  prev.onclick = function() {
    if (index == 0) {
      container.style.left = -1 * pages * pageWidth + 'px';
      index = pages - 1;
    } else {
      index--;
    }
    slide(container, 'left', -1 * index * pageWidth);
    tab();
  };

  next.onclick = function() {
    if (index == pages * 2 - 1) {
      index = pages;
      container.style.left = -1 * (pages - 1) * pageWidth + 'px'
    } else {
      index++;
    }
    slide(container, 'left', -1 * index * pageWidth);
    tab();
  }

  box.onmouseover = function() {
    clearInterval(timer);
  }

  box.onmouseout = function() {
    timer = setInterval(auto, showTime);
  }

  function auto() {
    next.onclick();
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
  function tab() {
    for (var i = 0; i < dot.length; i++) {
      dot[i].className = 'page';
    }
    dot[index % pages].className = 'page on';
  }
})();

//version2
(function() {
  var box = document.getElementById('box');
  var ul = document.getElementsByTagName('ul')[0];
  var prev = document.getElementById('prev');
  var next = document.getElementById('next');
  var ico = document.getElementById('ico').getElementsByTagName('a');
  var index = 0;
  var picNum = 5;
  var picWidth = 980;
  var showTime = 3500;
  ul.innerHTML += ul.innerHTML;
  var timer = setInterval(auto, showTime);


  prev.onclick = function() {
    if (index == 0) {
      ul.style.left = -1 * picNum * picWidth + 'px';
      index = picNum - 1;
    } else {
      index--;
    }
    slide(ul, 'left', -1 * index * picWidth);
    tab();
  };

  next.onclick = function() {
    if (index == picNum * 2 - 1) {
      index = picNum;
      ul.style.left = -1 * (picNum - 1) * picWidth + 'px'
    } else {
      index++;
    }
    slide(ul, 'left', -1 * index * picWidth);
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

  function slide(ele, attr, to) {
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
      }
    }, 30);
    function getStyle() {
      return ele.currentStyle ? ele.currentStyle[attr] : getComputedStyle(ele, null)[attr];
    }
  }

  function tab() {
    for (var i = 0; i < ico.length; i++) {
      ico[i].className = '';
    }
    ico[index % picNum].className = 'active';
  }
})();
//version1
/*(function() {
  var box = document.getElementById('box');
  var ul = document.getElementsByTagName('ul')[0];
  var prev = document.getElementById('prev');
  var next = document.getElementById('next');
  var ico = document.getElementById('ico').getElementsByTagName('a');
  var index = 0;
  var picNum = 5;
  var picWidth = 980;
  var picInterval = 50;
  var picDuration = 500;
  var showTime = picDuration + 3500;
  ul.innerHTML += ul.innerHTML;
  var timer = setInterval(move, showTime);
  var timer0 = null;

  prev.onclick = function() {
      move('left');
  };

  next.onclick = function() {
      move('right');
  }

  box.onmouseover = function() {
    clearInterval(timer);
  }

  box.onmouseout = function() {
    timer = setInterval(move, showTime);
  }



  function move(dir) {
    if (timer0) {
      return;
    }
    if (dir == null)
      dir = 'right';
    var curPos, fromPos, toPos;
    curPos = fromPos = parseInt(getStyle(ul, 'left'));
    if (dir == 'right') {
      if (index == picNum - 1) {
        index = 0;
        toPos = curPos - picWidth;
      } else {
        index++;
        toPos = curPos - picWidth;
      }
    }
    if (dir == 'left') {
      if (index == 0) {
        //让图片保持连续
        fromPos = curPos  = -1 * picNum * picWidth;
        ul.style.left = curPos + 'px';
        index = picNum - 1;
        toPos = -1 * (picNum - 1) * picWidth;
      } else {
        index--;
        toPos = curPos + picWidth;
      }
    }
    var stepLength = (toPos - curPos) / (picDuration / picInterval);
    function step() {
      if (Math.abs(curPos - fromPos) < Math.abs(toPos - fromPos)) {
        curPos += stepLength;
        ul.style.left = curPos + 'px';
      } else {
        if (toPos == -1 * picNum * picWidth) {
          ul.style.left = 0 + 'px';
        }
        else {
          ul.style.left = toPos + 'px';
        }
        clearInterval(timer0);
        timer0 = null;
        tab();
      }
    }
    timer0 = setInterval(step, picInterval);
  }

  function tab() {
    for (var i = 0; i < ico.length; i++) {
      ico[i].className = '';
    }
    ico[index].className = 'active';
  }
  function getStyle(ele, attr) {
    return ele.currentStyle ? ele.currentStyle[attr] : getComputedStyle(ele, null)[attr];
  }
})();
*/



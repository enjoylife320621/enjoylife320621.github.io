(function() {
  var li = document.getElementsByClassName('mp-banner-list')[0].getElementsByTagName('li');
  var dot = document.getElementById('dots').getElementsByTagName('a');
  var picNum = 5;
  var showTime = 3500;
  var index = 0;
  var arr = [];
  for (var i = 0; i < picNum; i++) {
    arr.push({
      top : parseInt(getStyle(li[i], 'top')),
      left : parseInt(getStyle(li[i], 'left')),
      width : parseInt(getStyle(li[i], 'width')),    
      height : parseInt(getStyle(li[i], 'height')),    
      zIndex : parseInt(getStyle(li[i], 'zIndex'))     
    });
    dot[i].index = i;
    dot[i].onclick = function() {
      clearInterval(timer);
      play(this.index);
      timer = setInterval(play, showTime);
    };
  }

  var timer = setInterval(play, showTime);

  function play(n) {
    if (n == null) {
      n = index;
      n++;
      n %= picNum;
    }
    var newArr = changeArr(n, arr.slice(0));
    index = n;
    tab();
    for (var i = 0; i < picNum; i++) {
      clearInterval(li[i].timer);
      li[i].style.zIndex = newArr[i].zIndex;
      slide(li[i], newArr[i]);
    }
  }

  function changeArr(now, arr) {
    var max = Math.floor(picNum / 2);
    if (now > max) {
      now -= picNum;
    }
    for (var i = 0; i < Math.abs(now); i++) {
      if (now > 0) 
        arr.push(arr.shift());
      else
        arr.unshift(arr.pop());
    }
    return arr;
  }


  function slide(ele, json, fn) {
    ele.timer && clearInterval(ele.timer);
    ele.timer = setInterval(function() {
      var complete = true;
      for (var attr in json) {
        var cur = parseInt(getStyle(ele, attr));
        var to = json[attr];
        var step = (to - cur) / 8;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (cur != to) {
          ele.style[attr] = cur + step + 'px';
          complete = false;
        }
      }
      if (complete) {
        clearInterval(ele.timer);
        ele.timer = null;
        fn && fn();
      }
    }, 30);
  }

  function getStyle(ele, attr) {
    return ele.currentStyle ? ele.currentStyle[attr] : getComputedStyle(ele, null)[attr];
  }

  function tab() {
    for (var i = 0; i < dot.length; i++) {
      dot[i].className = 'dot';
    }
    dot[index].className += ' dot-active';
  }
})();
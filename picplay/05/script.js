(function() {
  var box = document.getElementById('box');
  var bar = document.getElementById('bar');
  var link = box.getElementsByTagName('a');
  var div = bar.getElementsByTagName('div');
  var showTime = 4000;
  var index = 0;
  var picNum = 4;
  var timer = setInterval(play, showTime);
  for (var i = 1; i < picNum; i++) {
    link[i].style.opacity = 0;
    link[i].style.filter = "alpha(opacity=0)";
  }

  for (i = 0; i < div.length; i++) {
    div[i].index = i;
    div[i].onmouseover = function() {
      play(this.index);
    };
  }

  box.onmouseover = function() {
    clearInterval(timer);
  }

  box.onmouseout = function() {
    timer = setInterval(play, showTime);
  }

  function play(n) {
    clearInterval(link[index].timer);
    link[index].style.opacity = 0;
    link[index].style.filter = "alpha(opacity=0)";  
    div[index].className = 'switch-item';
    if (n != null) {
      index = n;
    } else {
      index++;
      index %= picNum;
    }
    fade(link[index], 'opacity', 100);
    div[index].className += ' active-switch-item';
  }

  function fade(ele, attr, to, fn) {
    ele.timer && clearInterval(ele.timer);
    var cur = 0;
    var step = 4;
    ele.timer = setInterval(function() {
      if (cur != to) {
        cur += step;
        ele.style.filter = 'alpha(opacity=' + cur + ')';
        ele.style[attr] = cur / 100;
      }
      else {
        clearInterval(ele.timer);
        ele.timer = null;
        fn && fn();
      }
    }, 30);
  }

})();

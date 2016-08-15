(function() {
  var sub = document.getElementById('sub');
  var div = document.getElementById('box').getElementsByTagName('div');
  var img = sub.getElementsByTagName('div');
  var w_width = win_width();
  sub.style.width = w_width - 80 + 'px';
  img[0].style.right = 914 + w_width / 2 - 1102 + 'px';
  img[1].style.right = 184 + w_width / 2 - 1096 + 'px';

  slide(sub, 'width', 0, function() {
    slide(sub, 'width', w_width - 80, function() {
      bar.style.display = 'block';
      bar.style.right = w_width - 105 + 'px';
    })
  });

  drag(bar, sub);

  function drag(ele, sub) {
    ele.onmousedown = function(event) {
      this.setCapture && this.setCapture();
      document.onmousemove = function(event) {
        var x = event.clientX - 25;
        var n_width = w_width - x;
        sub.style.width = n_width + 'px';
        ele.style.right = n_width - 25 + 'px';
      };
      document.onmouseup = function() {
        document.onmousemove = null;
        ele.releaseCapture && ele.releaseCapture();
      };
    };
  }

  function win_width() {
    return document.documentElement.clientWidth || document.body.clientWidth;
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
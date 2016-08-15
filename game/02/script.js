(function() {
  var thumbs = document.querySelectorAll('#photo img');
  var btn = document.querySelector('center input');
  var ul = document.querySelector('#box');
  var lis;
  var grid = {x: 5, y: 3};
  var size = {x: 82, y: 190};
  var arr = [];

  for (var i = 0; i < thumbs.length; i++) {
    thumbs[i].index = i;

    thumbs[i].onmouseover = function() {
      this.className += ' hover';
    };

    thumbs[i].onmouseout = function() {
      this.className = this.className.replace(/\shover/, "");
    };

    thumbs[i].onclick = function() {
      for (var i = 0; i < thumbs.length; i++) {
        thumbs[i].className = '';
      }
      this.className = 'selected';
      btn.value = '开始游戏';
      init(this.index);
    };
  }
  init(0);
  function init(index) {
    arr = [];
    ul.innerHTML = '';
    ul.style.background = 'url(img/girl' + index + '/bg.png) no-repeat';
    for (var i = 0; i < grid.x * grid.y; i++) {
      arr.push(i);
      var li = document.createElement('li');
      li.index = i;
      var img = document.createElement('img');
      img.src = 'img/girl' + index + '/' + (i + 1) + '.png';
      li.appendChild(img);
      ul.appendChild(li);
    }
    lis = ul.querySelectorAll('li');
  } 

  btn.onclick = function() {
    btn.value = btn.value == '开始游戏' ? '重新开始' : '重新开始';
    run();
  };

  function run() {
    for (var k = 0; k < 20; k++) {
      arr.sort(function(a, b) {return Math.random() > 0.5 ? -1 : 1});
    }
    var i = 0;
    for (var y = 0; y < grid.y; y++)
      for (var x = 0; x < grid.x; x++) {
        var li = lis[arr[i++]];
        li.x = x;
        li.y = y;
        li.pos = y * grid.x + x;
        li.style.top = size.y * y + 'px';
        li.style.left = size.x * x + 'px';
        li.margin = 0;
        li.style.position = 'absolute';
        drag(li);
      }
  }

  function drag(elt) {
    var node;  //covered node
    elt.style.cursor = 'move';
    elt.onmousedown = function(event) {
      var event = event ? event : window.event;
      var mPos = new Array(2);
      mPos[0] = event.clientX - this.offsetLeft;
      mPos[1] = event.clientY - this.offsetTop;
      this.setCapture && this.setCapture();
      this.style.zIndex = 9999;
      document.onmousemove = function(event) {
        var event = event ? event : window.event;

        var left = event.clientX - mPos[0];
        var top = event.clientY - mPos[1];

        left = left > 0 ? Math.min(left, ul.offsetWidth - elt.offsetWidth) : 0;
        top = top > 0 ? Math.min(top, ul.offsetHeight - elt.offsetHeight) : 0;

        elt.style.left = left + 'px';
        elt.style.top = top + 'px';
        node = covered(left, top);
        for (var i = 0; i < lis.length; i++) { 
          lis[i].className = '';
        }
        if (node != elt) node.className = 'hig';
        return false;
      };


      //li draged cover which
      function covered(left, top) {
        for (var i = 0; i < lis.length; i++) {
          var li = lis[i];
          //area
          var l1 = li.x * size.x - 0.5 * size.x, l2 = l1 + size.x;
          var t1 = li.y * size.y - 0.5 * size.y, t2 = t1 + size.y;

          if (left >= l1 && left <= l2 && top >= t1 && top <= t2)
            return li;
        }
      }

      document.onmouseup = function() {
        if (elt == node) {
          slide(elt, {x: elt.x * size.x, y: elt.y * size.y});
        } else {
          var temp = elt.x; elt.x = node.x; node.x = temp;        
          temp = elt.y; elt.y = node.y; node.y = temp;
          elt.pos = elt.y * grid.x + elt.x;
          node.pos = node.y * grid.x + node.x;
          slide(elt, {x: elt.x * size.x, y: elt.y * size.y});
          slide(node, {x: node.x * size.x, y: node.y * size.y}, finished);
        }
        node.className = '';
        elt.releaseCapture && elt.releaseCapture();
        elt.style.zIndex = '';
        document.onmousemove = null;
        document.onmouseup = null;
        return false;
      };
    };
    return false;
  }

  function isFinished() {
    for (var i = 0; i < grid.x * grid.y; i++) { 
      if (lis[i].index != lis[i].pos)
        return false;
    }
    return true;
  }

  function finished() {
    if(isFinished()) {
      alert('win!');
      btn.value = '开始游戏';
      init(document.querySelector('.selected').index);
    }
  }

  function slide(elt, to, fn) {
    clearInterval(elt.timer);
    var cur = {x: elt.offsetLeft, y: elt.offsetTop};
    elt.timer = setInterval(function() {  
      var step = {x: (to.x - cur.x) / 8, y: (to.y - cur.y) / 8};
      step.x = step.x > 0 ? Math.ceil(step.x) : Math.floor(step.x);
      step.y = step.y > 0 ? Math.ceil(step.y) : Math.floor(step.y);
      if (cur.x == to.x && cur.y == to.y) {
        clearInterval(elt.timer);
        fn && fn();
      }
      else {
        cur.x += step.x;
        cur.y += step.y;
        elt.style.left = cur.x + 'px';
        elt.style.top = cur.y + 'px';
      }
    }, 30);
  }
})();
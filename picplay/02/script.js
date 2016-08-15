//version 2
(function() {
  var index = 0;
  var picNum = 6;
  var picWidth = 1224;
  var proSpeed = 200;
  var picSpeed = 8;
  var imgWrap = document.getElementById('imgwrap');
  var pros = document.getElementsByClassName('pro'); 

  var navs = document.getElementsByClassName('nav');
  for (var i = 0; i < navs.length; i++) {
      navs[i].onclick = function() {        
        play(this.dataset.index);
    }
  } 

  progress();

  function play(i) {
    clearInterval(pros[index].timer);
    pros[index].style.width = 0 + 'px';
    if (i) {
      index = i;
    } else {
      index++;
      index %= picNum;
    }
    slide(imgWrap, 'left', -1 * index * picWidth, picSpeed, progress);
  }

  function progress() {
    slide(pros[index], 'width', picWidth / picNum, proSpeed, play);
  }

  function slide(ele, attr, to, speed, fn) {
    ele.timer && clearInterval(ele.timer);
    var cur = parseInt(getStyle());
    ele.timer = setInterval(function() {
      var step = (to - cur) / speed;
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
//version 1
/*var PICDISPLAY = {
  index: 0,
  picNum: 6,
  picWidth: 1224,
  picInterval: 20,
  picDuration: 500,
  proInterval: 20,
  proDuration: 5000,
  play: function() {
    var picDisplay = this;
    this.imgWrap = document.getElementById('imgwrap');
    this.pros = document.getElementsByClassName('pro');
    this.progress(this.pros[this.index]);
    var navs = document.getElementsByClassName('nav');    
    for (var i = 0; i < navs.length; i++) {
      navs[i].onclick = function() {
        _picDisplay.index = this.dataset.index;
        _picDisplay.move();
      };
    }
  },
  move: function() {
    var _picDisplay = this;
    var curpos, fromPos;
    curPos = fromPos = parseInt(this.getStyle(this.imgWrap, 'left'));
    var toPos = -1 * this.index * this.picWidth;
    var stepLength = (toPos - curPos) / (this.picDuration / this.picInterval);
    function step() {
      if (Math.abs(curPos - fromPos) < Math.abs(toPos - fromPos)) {
        curPos += stepLength;
        _picDisplay.imgWrap.style.left = curPos + 'px';
      } else {
        _picDisplay.imgWrap.style.left = toPos + 'px';
        clearInterval(timer);
        _picDisplay.progress(_picDisplay.pros[_picDisplay.index]);
      }
    }
    var timer = setInterval(step, this.picInterval);
  },
  progress: function(ele) {
    var _picDisplay = this;
    var width = this.picWidth / this.picNum;
    var stepLength = width / (this.proDuration / this.proInterval);
    var curIndex = this.index;
    var curWidth = parseFloat(this.getStyle(ele, 'width'));
    function step() {
      //if clicked
      if (_picDisplay.index != curIndex) {
        clearInterval(timer);
        ele.style.width = 0 + 'px';
        return;
      }
      if (curWidth + stepLength < width) {
        curWidth = curWidth + stepLength;
        ele.style.width = curWidth + 'px';
      } else {
        ele.style.width = 0 + 'px';
        clearInterval(timer);
        _picDisplay.index++;
        _picDisplay.index = _picDisplay.index % _picDisplay.picNum;
        _picDisplay.move();
      }
    }
    var timer = setInterval(step, this.proInterval);
  },
  getStyle: function(ele, attr) {
    return ele.currentStyle ? ele.currentStyle[attr] : getComputedStyle(ele, null)[attr];
  }
}
window.onload = PICDISPLAY.play();*/
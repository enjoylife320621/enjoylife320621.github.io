function Animation(elt, to, callback) {
  this.elt = elt;
  this.cur = {};
  //this.cur current position
  for (var p in to) {
    if (p == 'zIndex') {
      this.elt.style.zIndex = to[p];
      continue;
    }
    this.cur[p] = this.css(p);
  }
  //target position
  this.to = to;  
  this.callback = callback;
  this.complete = false;
  clearInterval(this.elt.timer);
  var that = this;
  this.elt.timer = setInterval(function() {
    if(that.complete) {
      clearInterval(that.timer);
      that.callback && that.callback();
    }
    else
      that.slide();
  }, 30);
}

Animation.prototype.css = function(attr, value) {
  if (value) {
    attr == 'opacity' ? (this.elt.style.filter = "alpha(opacity=" + value + ")", this.elt.style.opacity = value / 100) : 
                       (this.elt.style[attr] = value + "px");
  } else {
    var style = this.elt.currentStyle ? this.elt.currentStyle[attr] : getComputedStyle(this.elt, null)[attr];
    if (attr == 'opacity')
      return parseFloat(style) * 100;
    else
      return parseInt(style);
  }
};

Animation.prototype.slide = function() {
  this.complete = true;
  for (var p in this.to) {
    var step = (this.to[p] - this.cur[p]) / 8;
    step = step > 0 ? Math.ceil(step) : Math.floor(step);
    if (this.cur[p] != this.to[p]) {
      this.cur[p] += step;
      this.css(p, this.cur[p]);
      this.complete = false;
    }
  }
};

function Play(box) {
  this.box = box;
  this.container = box.querySelector('#container');
  this.items = box.querySelectorAll('#container .item');
  this.control = box.querySelector('#control');
  this.num = this.items.length;
  this.showNum = 5;
  this.data = [
    {left:0, zIndex:2, opacity:30},
    {left:40, zIndex:3, opacity:60},
    {left:124, zIndex:4, opacity:100},
    {left:208, zIndex:3, opacity:60},
    {left:246, zIndex:2, opacity:30},
    {left:40, zIndex:0, opacity:0}
  ];
  this.index = 0;
  this.btns = new Array(this.num);
  this.init();
  this.auto();
  
  var that = this;
  this.box.onmouseover = function() {
    clearInterval(that.timer);
  };
  this.box.onmouseout = function() {
    that.auto();
  };
  for (var i = 0; i < this.num; i++) {
    this.items[i].index = i;
    this.btns[i].index = i;
    this.btns[i].onmouseover = function() {
      that.index = this.index;
      that.play();
    };
    this.items[i].onclick = function() {
      that.index = this.index;
      that.play();
    }
  }

}
//if index == 0 then indexes = 6, 7, 0, 1, 2, 3, 4, 5
Play.prototype.location = function() {
  var num = this.num;
  var index = this.index;
  this.indexes = new Array(this.num);
  this.indexes[1] = prev(index);
  this.indexes[0] = prev(this.indexes[1]);
  for (var i = 2; i < this.num; i++) {
    this.indexes[i] = index;
    index = next(index);
  }

  function next(i) {
    i++;
    return i % num;
  }
  function prev(i) {
    i = i ? i : num;
    i--;
    return i;
  }
}

Play.prototype.auto = function() {
  var that = this;
  this.timer = setInterval(function() {
    that.next();
    that.play();
  }, 3000);
}

Play.prototype.next = function() {
  this.index++;
  this.index %= this.num;
};

Play.prototype.play = function() {
  this.location();
  var j;
  for (var i = 0; i < this.num; i++) {
    j = i;
    if (j > this.showNum) j = this.showNum;
    new Animation(this.items[this.indexes[i]], this.data[j]);
  }
  this.toggle();
};

Play.prototype.toggle = function() {
  this.btns.forEach(function(btn) {
    btn.className = '';
  });
  this.btns[this.index].className = 'active';  
}

Play.prototype.init = function() {
  for (var i = 0; i < this.num; i++) {
    var span = document.createElement('span');
    this.btns[i] = this.control.appendChild(span);
  }
  this.play();
};



window.onload = function() {
  var box = document.querySelector('#box');
  new Play(box);
};
function Animation(elt, to, callback) {
  this.elt = elt;
  this.cur = {};
  //this.cur current position
  for (var p in to) 
    this.cur[p] = this.css(p);
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
  this.ul = box.querySelector('.list ul');
  this.num = this.ul.querySelectorAll('li').length;
  this.height = this.ul.querySelector('li').offsetHeight;
  this.index = 0;
  this.btns = new Array(this.num);
  this.createBtn();
  this.toggle();
  this.auto();

  var that = this;
  this.box.onmouseover = function() {
    clearInterval(that.timer);
  };
  this.box.onmouseout = function() {
    that.auto();
  };
  for (var i = 0; i < this.num; i++) {
    this.btns[i].index = i;
    this.btns[i].onmouseover = function() {
      that.play(this.index);
      that.index = this.index;
      that.toggle();
    };
  }
}

Play.prototype.auto = function() {
  var that = this;
  this.timer = setInterval(function() {
    that.next();
    that.play(that.index);
    that.toggle();
  }, 3000);
}

Play.prototype.next = function() {
  this.index++;
  this.index %= this.num;
};

Play.prototype.play = function(index) {
  new Animation(this.ul, {top: -index * this.height});
};

Play.prototype.toggle = function() {
  this.btns.forEach(function(btn) {
    btn.className = '';
  });
  this.btns[this.index].className = 'current';  
}

Play.prototype.createBtn = function() {
  var ul = document.createElement('ul');
  ul.className = 'count';
  for (var i = 0; i < this.num; i++) {
    var li = document.createElement('li');
    li.innerHTML = i + 1;
    this.btns[i] = li;
    ul.appendChild(li);
  }
  this.box.appendChild(ul);
};

window.onload = function() {
  var box = document.querySelector('#box');
  new Play(box);
};
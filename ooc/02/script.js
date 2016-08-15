function Photo(src) {
  this.dom = document.createElement('li');
  var img = document.createElement('img');
  img.src = src;
  this.dom.appendChild(img);
}

Photo.prototype.getPos = function() {
  this.left = this.dom.offsetLeft;
  this.width = this.dom.offsetWidth;
  this.height = this.dom.offsetHeight;

  var top = this.dom.offsetTop;
  var current = this.dom.offsetParent;
  while(current) {
    top += current.offsetTop;
    current = current.offsetParent;
  }
  this.top = top;
};

Photo.prototype.setPos = function() {
  var style = this.dom.style;
  style.position = 'absolute';
  style.left = this.left + 'px';
  style.top = this.top + 'px';
  style.margin = 0;
};

Photo.prototype.slide = function(to, fn) {
  var elt = this.dom;
  clearInterval(elt.timer);
  var cur = {x: elt.offsetLeft, y: elt.offsetTop};
  elt.timer = setInterval(function() {
    var step = {x: (to.x - cur.x) / 5, y: (to.y - cur.y) / 5};
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
};

function Photowall(wrap, num) {
  this.num = num;
  this.wrap = wrap;
  var ul = wrap.querySelector('ul');

  //create photos
  this.photos = new Array(num);
  for (var i = 0; i < num; i++) {
    this.photos[i] = new Photo('img/' + i + '.jpg');
    ul.appendChild(this.photos[i].dom);
  }
  this.init();
  this.drag();
  //random
  var btn = wrap.querySelector('a');
  var that = this;
  btn.onclick = function() { that.random(); };
}

Photowall.prototype.init = function() {
  this.photos.forEach(function(photo) {
    photo.dom.style.cssText = '';
    photo.getPos();
  });
  this.wrap.style.height = this.wrap.offsetHeight - 2 + 'px';
  this.photos.forEach(function(photo) {
    photo.setPos();
  });
};

Photowall.prototype.drag = function() {
  var zIndex = 1;
  this.photos.forEach(function(photo) {
    var that = this;
    var elt = photo.dom;
    elt.onmousedown = function(event) {
      var event = event ? event : window.event;
      var mPos = new Array(2);
      var coveredPhoto;
      mPos[0] = event.clientX - elt.offsetLeft;
      mPos[1] = event.clientY - elt.offsetTop;
      elt.setCapture && elt.setCapture();
      elt.style.zIndex = zIndex++;

      document.onmousemove = function(event) {
        var event = event ? event : window.event;
        var left = event.clientX - mPos[0];
        var top = event.clientY - mPos[1];
        left = left > 0 ? Math.min(left, document.documentElement.offsetWidth - elt.offsetWidth) : 0;
        top = top > 0 ? Math.min(top, document.documentElement.offsetHeight - elt.offsetHeight) : 0;
        elt.style.left = left + 'px';
        elt.style.top = top + 'px';
        coveredPhoto = that.covered(photo, left, top);
        that.photos.forEach(function(photo) { photo.dom.className = ''; });
        coveredPhoto && (coveredPhoto.dom.className = 'hig');
        return false;
      };

      document.onmouseup = function() {
        elt.releaseCapture && elt.releaseCapture();
        if (coveredPhoto) {
          that.exchangePos(photo, coveredPhoto);
          coveredPhoto.dom.className = '';
        } else {
          photo.slide({x: photo.left, y: photo.top});
        }
        document.onmousemove = null;
        document.onmouseup = null;
        return false;
      };

      return false;
    };
  }, this);
};

Photowall.prototype.exchangePos = function(photo1, photo2) {
  photo1.slide({x: photo2.left, y: photo2.top});
  photo2.slide({x: photo1.left, y: photo1.top});
  var t = photo1.left; photo1.left = photo2.left; photo2.left = t;
  t = photo1.top; photo1.top = photo2.top; photo2.top = t;
};

Photowall.prototype.covered = function(iPhoto, left, top) {
  var max = 0;
  var selected = null;
  this.photos.forEach(function(photo) {
    if (iPhoto == photo) return;
    var coveredX = left < photo.left ? left + iPhoto.width - photo.left : photo.left + photo.width - left;
    var coveredY = top < photo.top ? top + iPhoto.height - photo.top : photo.top + photo.height - top;
    
    coveredX = coveredX > 0 ? coveredX : 0;
    coveredY = coveredY > 0 ? coveredY : 0;
    var area = coveredX * coveredY;
    if (area > max) {
      max = area;
      selected = photo;
    }
  });
  return selected;
};

Photowall.prototype.random = function() {
  var arr = new Array(this.num);
  for (var i = 0; i < this.num; i++) {
    arr.push(i);
  }
  arr.sort(function(a, b) {return Math.random() > 0.5 ? -1 : 1});
  for (i = 0; i < this.num; i++) {
    var photo = this.photos[i];
    var target = this.photos[arr[i]];
    this.exchangePos(photo, target);
  }
};

window.onload = function() {
  var boxes = document.querySelectorAll('.box');
  var num = 20;
  var photowalls = new Array();
  for (var i = 0; i < boxes.length; i++) {
    photowalls.push(new Photowall(boxes[i], num));
  }
  window.onresize = function() {
   photowalls.forEach(function(photowall) { photowall.init() });
 };
};
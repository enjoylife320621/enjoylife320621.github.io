function Lazyload(box) {
  this.box = box;
  this.imgs = box.querySelectorAll('img');
  this.loaded = new Array();
  this.load();
  this._load = this.load.bind(this);
  addEventListener('scroll', this._load);
  addEventListener('resize', this._load);
}

Lazyload.prototype.load = function() {
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  var height = scrollTop + document.documentElement.clientHeight;
  if (this.loaded.length < this.imgs.length) {
    for (var i = this.loaded.length; i < this.imgs.length; i++) {
      if (this.imgs[i].offsetTop < height) {
        this.imgs[i].src = this.imgs[i].dataset.img;
        this.imgs[i].className = 'loaded';
        this.loaded.push(this.imgs[i]);
      }
    }
  }
};

window.onload = function() {
  var box = document.querySelector('#box');
  new Lazyload(box);
};
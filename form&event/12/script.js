(function() {
  var menu = document.querySelector('#menu');
  var imgs = menu.querySelectorAll('img');
  var widths = [];
  for (var i = 0; i < imgs.length; i++) {  
    imgs[i].width = imgs[i].offsetWidth / 2;  //dont add px
    widths.push(imgs[i].offsetWidth);
  }

  document.onmousemove = function(event) {
    var event = event ? event : window.event;
    for (var i = 0; i < imgs.length; i++) {
      //center of picture (0, 0) edge (1, 1)
      var x = (event.clientX - imgs[i].offsetLeft - imgs[i].offsetWidth / 2) / (imgs[i].offsetWidth / 2);
      var y = (event.clientY - menu.offsetTop - imgs[i].offsetTop - imgs[i].offsetHeight / 2) / ( imgs[i].offsetHeight / 2);
      var scale = Math.max(2 - (x * x + y * y) / 8, 1);
      imgs[i].width = widths[i] * scale;
    }
  }
})();
window.onload = function() {
  var smallWrap = document.querySelector('#smallWrap');
  var bigWrap = document.querySelector('#bigWrap');
  var magnifier = smallWrap.querySelector('#magnifier'); //float layer

  smallWrap.onmouseover = function(event) {
    var event = event || window.event;
    magnifier.style.display = bigWrap.style.display = 'block';
    location(event.clientX, event.clientY);
  };

  smallWrap.onmousemove = function(event) {
    var event = event || window.event;
    location(event.clientX, event.clientY);
  };

  smallWrap.onmouseout = function() {
    magnifier.style.display = bigWrap.style.display = 'none';
  }

  function location(x, y) {
    var style = magnifier.style;
    var l0 = x - smallWrap.offsetLeft - magnifier.offsetWidth / 2;
    var t0 = y - smallWrap.offsetTop - magnifier.offsetTop / 2;
    var l = l0 > 0 ? Math.min(l0, smallWrap.offsetWidth - magnifier.offsetWidth) : 0;
    var t = t0 > 0 ? Math.min(t0, smallWrap.offsetHeight - magnifier.offsetHeight) : 0;
    style.left = l + 'px';
    style.top = t + 'px';

    var scale = bigWrap.offsetWidth / magnifier.offsetWidth;
    bigWrap.style.backgroundPosition = -l * scale + 'px ' + -t * scale + 'px';
  }
}

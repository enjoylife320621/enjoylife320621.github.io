var main = document.querySelector('#main');
var boxes = document.querySelectorAll('.box');
var width = boxes[0].offsetWidth;

function flow() {
  var col = Math.floor(document.documentElement.clientWidth / width);
  main.style.width = col * width + 'px';
  var height = new Array(col);
  for (var i = 0; i < col; i++) {
    height[i] = boxes[i].offsetHeight;
    var style = boxes[i].style;
    style.position = 'absolute';
    style.left = i * width + 'px';
    style.top = 0;
  }

  for (i = col; i < boxes.length; i++) {
    var index = height.indexOf(Math.min.apply(null, height));
    var style = boxes[i].style;
    style.position = 'absolute';
    style.left = index * width + 'px';
    style.top = height[index] + 'px';
    height[index] += boxes[i].offsetHeight;
  }
}

window.onload = flow;
window.onresize = flow;


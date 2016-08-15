(function() {
  var box1 = document.querySelector('#box1');
  var box2 = document.querySelector('#box2');
  var zIndex = 1;
  drag(box1);
  drag(box2);
  function drag(elt) {
    elt.onmousedown = function(event) {
      var event = event ? event : window.event;
      
      var temp = document.createElement('div');
      temp.id = 'temp';
      temp.style.left = elt.offsetLeft + 'px';
      temp.style.top = elt.offsetTop + 'px';
      temp.style.zIndex = zIndex++;
      document.body.appendChild(temp);

      var mPos = new Array(2); //mouse position
      mPos[0] = event.clientX - elt.offsetLeft;
      mPos[1] = event.clientY - elt.offsetTop;
      this.setCapture && this.setCapture();
      document.onmousemove = function(event) {
        var event = event ? event : window.event;

        var left = event.clientX - mPos[0];
        var top = event.clientY - mPos[1];

        left = left > 0 ? Math.min(left, document.documentElement.clientWidth - temp.offsetWidth) : 0;
        top = top > 0 ? Math.min(top, document.documentElement.clientHeight - temp.offsetHeight) : 0;

        temp.style.left = left + 'px';
        temp.style.top = top + 'px';
        return false;
      };

      document.onmouseup = function() {
        elt.style.left = temp.offsetLeft + 'px';
        elt.style.top = temp.offsetTop + 'px';
        elt.style.zIndex = temp.style.zIndex;
        document.body.removeChild(temp);  
        elt.releaseCapture && elt.releaseCapture();
        document.onmousemove = null;
        document.onmouseup = null;
      };  
      return false;
    };
  }
})();
(function() {
  var box = document.getElementById('container');
  var h3 = box.getElementsByTagName('h3');
  var ul = box.getElementsByTagName('ul');

  for (var i = 0; i < h3.length; i++) {
    hover(ul[i]);
    h3[i].index = i;
    h3[i].onmouseover = function() {
      for (i = 0; i < h3.length; i++) {
        ul[i].style.display = 'none';
        removeClass(h3[i], 'active');
      }
      ul[this.index].style.display = 'block';
      addClass(this, 'active');
    };
  }

  function hover(ul) {
    var li = ul.getElementsByTagName('li');
    for (var j = 0; j < li.length; j++) {
      li[j].onmouseover = function () {
        for (j = 0; j < li.length; j++) {
          removeClass(li[j], 'item-hover');
        }
        addClass(this, 'item-hover');
      }
    }
  }

  function hasClass(obj, cls) {
    return obj.className.match(new RegExp('(\\s+|^)' + cls + '(\\s+|$)')); 
  }

  function removeClass(obj, cls) {   
    if (hasClass(obj, cls)) {
      reg = new RegExp('(\\s+|^)' + cls + '(\\s+|$)')
      obj.className = obj.className.replace(reg, '');    
    }
  }

  function addClass(obj, cls) {
    if (!hasClass(obj, cls)) 
      obj.className += ' ' + cls;
  }
})();


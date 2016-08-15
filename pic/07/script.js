(function() {
  var ul = document.getElementById('j-mod-yeyou').getElementsByTagName('ul')[0];
  var link = ul.getElementsByTagName('a');

  for (var i = 0; i < link.length; i++) {
    link[i].onmouseover = function() {
      var div = this.getElementsByTagName('div');
      for (i = 0; i < div.length; i++) {
        if (div[i].className == 'mp-game-cover-platform') 
          div[i].className += ' show';
      }
    };
    link[i].onmouseout = function(event) {
      var div = this.getElementsByTagName('div');
      for (i = 0; i < div.length; i++) {
        if (div[i].className == 'mp-game-cover-platform show') 
          div[i].className = 'mp-game-cover-platform';
      }
    };
  }
})();


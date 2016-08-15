(function() {
	var div = document.querySelector('ul div');
	var img = document.querySelectorAll('img');
	for (var i = 1; i < img.length; i++) {
		img[i].onmouseover = function() {
			img[0].src = this.src.replace(/small/, 'big');
			div.style.display = 'block';
			img[0].complete ? div.style.display = 'none' :
				img[0].onload = function() {div.style.display = 'none';};
		};
	}
})();
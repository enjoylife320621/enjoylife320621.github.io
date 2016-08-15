window.onload = function() {
	var lis = document.querySelectorAll('#skin li');
	var link = document.querySelector('link');
	for (var i = 0; i < lis.length; i++) {
		lis[i].onclick = function() {
			for (var t in lis) lis[t].className = '';
			this.className = 'current';
			link.href = this.id + '.css';
		};
	}
};
(function() {
	var lis = document.querySelectorAll('#box ul li');
	var big = document.getElementById('big');
	var loading = big.querySelector('div');

	for (var i = 0; i < lis.length; i++) {
		lis[i].onmouseover = function() {
			this.className = 'active';

			var img = document.createElement('img');
			img.src = this.querySelector('img').src.replace('.jpg', '_big.jpg');
			big.appendChild(img);
			big.style.display = 'block';

			img.complete ? loading.style.display = 'none' : 
				img.onload = function() {loading.style.display = 'none';};
		};

		lis[i].onmousemove = function(event) {
			var event = event ? event : window.event;
			big.style.left = event.clientX + big.offsetWidth + 10 >  document.documentElement.offsetWidth ?
											 event.clientX - big.offsetWidth + 'px' : event.clientX + 10 + 'px';
			big.style.top = event.clientY + 20 + 'px';
		};

		lis[i].onmouseout = function() {
			this.className = '';
			big.style.display = 'none';
			big.removeChild(big.lastChild);
		};
	}
})();
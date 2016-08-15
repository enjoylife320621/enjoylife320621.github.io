(function() {
	var box = document.getElementById('box');

	document.onkeydown = function(event) {
		var event = event ? event : window.event;

		if (event.ctrlKey) {
			switch (event.keyCode) {
				case 49:
					box.style.background = 'green';
					break;
				case 50:
					box.style.background = 'yellow';
					break;
				case 51:
					box.style.background = 'blue';
					break;
				case 38:
					var width = box.offsetWidth;
					var height = box.offsetHeight;
					box.style.width = 1.5 * width + 'px';
					box.style.height = 1.5 * height + 'px';
					box.style.left = box.offsetLeft - 0.25 * width + 'px';
					box.style.top = box.offsetTop - 0.25 * height + 'px';
					break;
				case 40:
					var width = box.offsetWidth;
					var height = box.offsetHeight;
					box.style.width = 0.75 * width + 'px';
					box.style.height = 0.75 * height + 'px';
					box.style.left = box.offsetLeft + 0.125 * width + 'px';
					box.style.top = box.offsetTop + 0.125 * height + 'px';
					break;
			}			
		} else {
			switch (event.keyCode) {
				case 37:
					box.style.left = box.offsetLeft > 10 ? box.offsetLeft - 10 + 'px' : 0 + 'px';
					break;
				case 38:
					box.style.top = box.offsetTop > 10 ? box.offsetTop - 10 + 'px' : 0 + 'px';
					break;
				case 39:
					box.style.left = box.offsetLeft + box.offsetWidth + 10 > document.documentElement.clientWidth ? 
													 document.documentElement.clientWidth - box.offsetWidth + 'px' : box.offsetLeft + 10 + 'px';
					break;				
				case 40:
					box.style.top = box.offsetTop + box.offsetHeight + 10 > document.documentElement.clientHeight ? 
													document.documentElement.clientHeight - box.offsetHeight + 'px' : box.offsetTop + 10 + 'px';
					break;
			}							
		}
		return false;
	};
	

})();
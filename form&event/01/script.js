(function() {
	var a = document.querySelector('a');
	var all = document.querySelector('dt input');
	var input = document.querySelectorAll('dd input');
	all.onclick = function() {
			for (var i = 0; i < input.length; i++)
				input[i].checked = this.checked;
	};

	for (var i = 0; i < input.length; i++) {
		input[i].onclick = function() {
			isAll();
		}	
	}

	a.onclick = function() {
		for (var i = 0; i < input.length; i++) {
			input[i].checked = !input[i].checked;
		}
		isAll();
	};

	function isAll() {
		for (var i = 0; i < input.length; i++) {
			if (input[i].checked == false) {
				all.checked = false;
				return;
			}
		}
		all.checked = true;		
	}
})();
(function() {
	var li = document.querySelectorAll('.transform');
	var bg = document.getElementById('bg');
	var dialog = document.getElementById('dialog');
	var close = document.getElementById('close');

	for (var i = 0; i < li.length; i++) {
		li[i].onclick = function() {
			bg.className += ' current';
			dialog.className += ' current';	
		};
	}

	close.onclick = function() {
		bg.className = 'box_bg1';
		dialog.className = 'box_ovo';
	};
})();
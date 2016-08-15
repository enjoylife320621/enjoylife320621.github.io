(function() {
	var nav = document.querySelector('#nav');
	var subnav = document.querySelectorAll('#nav .subnav');
	var li = document.querySelectorAll('#nav li');
	var em = document.querySelectorAll('#nav em');
	var timer;
	for (var i = 1; i < li.length; i++) {
		li[i].index = i - 1;
		li[i].onmouseover = function(event) {
			var event = event ? event : window.event;
			if(!this.contains(event.relatedTarget || event.fromElement)) {
				var item = subnav[this.index];
				item.style.display = 'block';
				if (nav.offsetWidth - this.offsetLeft < item.offsetWidth)
					item.style.right = 0 + 'px';
				em[this.index].style.left = this.offsetLeft - item.offsetLeft + 50 + 'px';
				item.onmouseover = function() {
					clearTimeout(timer);
				};
			}
		};

		li[i].onmouseout = function(event) {
			var event = event ? event : window.event;
			if(!this.contains(event.relatedTarget || event.toElement)) {
				var that = this;
				timer = setTimeout(function() {
					subnav[that.index].style.display = 'none';
				}, 50);				
			}			
		};
	}
})();
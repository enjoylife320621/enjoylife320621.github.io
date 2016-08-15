(function() {
	var menu = document.querySelectorAll('.ui-menu-item');
	var sub_wrap = document.querySelector('.ui-menu-sub');
	var sub = document.querySelectorAll('.ui-sub-item');

	for (var i = 0; i < menu.length; i++) {
		menu[i].index = i;
		sub[i].index = i;

		menu[i].onmouseover = function() {
			this.className = 'ui-menu-item ui-item-hover ui-menu-item-expand';
			sub[this.index].className = 'ui-sub-item sub-item-show';
			sub_wrap.style.width = 'auto';
		};

		menu[i].onmouseout = function() {
				this.className = 'ui-menu-item';
				sub[this.index].className = 'ui-sub-item';
				sub_wrap.style.width = 0 + 'px';			
		};

		sub[i].onmouseover = function() {
			this.className = 'ui-sub-item sub-item-show';
			menu[this.index].className = 'ui-menu-item ui-item-hover ui-menu-item-expand';
			sub_wrap.style.width = 'auto';	
		};

		sub[i].onmouseout = function() {
				this.className = 'ui-sub-item';
				menu[this.index].className = 'ui-menu-item';
				sub_wrap.style.width = 0 + 'px';						
		};
	}
})();
function Animation(elt, to, callback) {
	this.elt = elt;
	this.cur = {};
	//this.cur current position
	for (var p in to) 
		this.cur[p] = this.css(p);
	//target position
	this.to = to;  
	this.callback = callback;
	this.complete = false;
	clearInterval(this.timer);
	var that = this;
	this.timer = setInterval(function() {
		if(that.complete) {
			clearInterval(that.timer);
			that.callback && that.callback();
		}
		else
			that.slide();
	}, 30);
}

Animation.prototype.css = function(attr, value) {
	if (value) {
		attr == 'opacity' ? (this.elt.style.filter = "alpha(opacity=" + value + ")", this.elt.style.opacity = value / 100) : 
											 (this.elt.style[attr] = value + "px");
	} else {
		var style = this.elt.currentStyle ? this.elt.currentStyle[attr] : getComputedStyle(this.elt, null)[attr];
		if (attr == 'opacity')
			return parseFloat(style) * 100;
		else
			return parseInt(style);
	}
};

Animation.prototype.slide = function() {
	this.complete = true;
	for (var p in this.to) {
	  var step = (this.to[p] - this.cur[p]) / 8;
	  step = step > 0 ? Math.ceil(step) : Math.floor(step);
	  if (this.cur[p] != this.to[p]) {
	    this.cur[p] += step;
	    this.css(p, this.cur[p]);
	    this.complete = false;
	  }
	}
};


window.onload = function() {
	var btn = document.querySelector('#wrap input');
	var span = document.querySelector('#wrap span');
	var data = [
		{width:20, height:20},
		{width:80, height:80},
		{left:10}, {left:408},
		{opacity:100},
		{opacity:0},
		{opacity:100},
		{width:80, height:80, left:408},
		{top:10},
		{width:20, height:20, left:468},
		{top:70},
		{left:10},
		{top:10},
		{left:468},
		{width:20, height:20, left:468},
		{width:80, height:80, left:408}
	]
	var order = true;
	var i = 0;
	btn.onclick = function() {
		this.disabled = true;
		var that = this;
		function act() {
			order ? i++ : i--;
			if (i == data.length || i < 0) {
				btn.value = order ? '原路返回' : '开始';
				order = order ? false : true;
				that.disabled = false;
				return;
			}
			new Animation(span, data[i], act);
		}
		act();
	};
};

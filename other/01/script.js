function css(ele, attr, value) {
	switch (arguments.length) {
		case 2:
			if (typeof attr == 'object') {
				for (var i in attr)
					ele.style[i] = attr[i];
			} else {
				return ele.currentStyle ? ele.currentStyle[attr] : getComputedStyle(ele, null)[attr];
			}
			break;
		case 3:
			ele.style[attr] = value;
			break;
		default:
			alert('error');
	}
}
(function() {
	var box = document.getElementById('box');
	var input = document.querySelectorAll('#box input');
	input[0].onclick = function() {
		alert("width: " + css(box, "width") + "\nheight: " + css(box, "height") + "\nbackground-color: " + css(box, "backgroundColor"));
	};

	input[1].onclick = function() {
		css(box, {width: "330px", height: "100px", borderColor: "#0084ff", backgroundColor: "#eff8ff"});
		css(this, "backgroundColor", "#0084ff");
	};	

	input[2].onclick = function() {
		css(box, {width: "400px", height: "200px", borderColor: "#f60", backgroundColor: "#fef4eb"});
		css(input[1], "backgroundColor", "#f60");
	};	
})();
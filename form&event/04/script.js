(function() {
	var ul = document.querySelector('#star ul');
	var lis = document.querySelectorAll('#star li');
	var span = document.querySelectorAll('#star span')[1];
	var p = document.querySelector('#star p');
	var msg = [
		"很不满意|差得太离谱，与卖家描述的严重不符，非常不满",
		"不满意|部分有破损，与卖家描述的不符，不满意",
		"一般|质量一般，没有卖家描述的那么好",
		"满意|质量不错，与卖家描述的基本一致，还是挺满意的",
		"非常满意|质量非常好，与卖家描述的完全一致，非常满意"
	];
	var index;  //mouse position
	var stars = null; //num of stars


	for (var i = 0; i < lis.length; i++) {
		lis[i].index = i;
		lis[i].onmouseover = function() {
			index = this.index;
			point(index + 1);
			p.style.display = 'block';
			p.style.left = index * this.offsetWidth + 25 + 'px';
			p.innerHTML = '<em><b>' + (index + 1) +'</b>分 ' + msg[index].match(/(.+)\|/)[1] + '</em>' + msg[index].match(/\|(.+)/)[1];
		};

		lis[i].onclick = function() {
			span.style.display = 'block';
			span.innerHTML = "<strong>" + (index + 1) + " 分</strong> (" + msg[index].match(/\|(.+)/)[1] + ")";
			stars = index + 1;
		};

		lis[i].onmouseout = function() {
			point();
			p.style.display = 'none';
		}
	}

	//make point
	function point(_index) {
		var t = _index || stars;
		for (var i = 0; i < lis.length; i++) {
			lis[i].className = i < t ? 'on' : '';
		}
	}
})();
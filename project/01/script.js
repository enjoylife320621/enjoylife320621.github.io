(function() {
	var calc = document.getElementById('calc');
	var a = calc.querySelectorAll('a');
	var input = calc.querySelector('input');
	var formula = document.getElementById('formula');
	var done = false;

	for (var i = 0; i < a.length; i++) {
		a[i].onclick = function() {
			switch (this.innerHTML) {
				case 'c':
					input.value = 0;
					formula.value = '';
					break;
				case '%':
					display('%');
					break;
				case '÷':
					display('/');
					break;
				case '×':
					display('*');
					break;
				case '+':
					display('+');
					break;
				case '-':
					display('-');
					break;
				case '=':
					if (/[\%\/\*\-\+]$/.test(input.value))
						break;
					formula.value += input.value;
					input.value = eval(formula.value.replace(/\%\/\*\-\+/, '')); //?
					input.value = input.value.substr(0, 10).replace('NaN', 0);
					done = true;
					break;
				case '.':
					if(input.value.search(/[\.\%\/\*\-\+]/) != -1)
						break;
				default:
					done && (input.value = 0, formula.value = '', done = false);
					input.value.length < 10 && (input.value = (input.value + this.innerHTML).replace(/^[0\%\/\*\-\+](\d)/, "$1")); //?
			}
		};
	}

	function display(a) {
		if (done) {
			formula.value = input.value + a;
			input.value = a;
			done = false;
		} else {
			/[\%\/\*\-\+]$/.test(input.value) || (formula.value += input.value);
			input.value = a;
			/[\%\/\*\-\+]$/.test(formula.value) || (formula.value += input.value);
			formula.value = formula.value.slice(-1) != a ? formula.value.replace(/.$/, a) : formula.value;
		}
	}

})();
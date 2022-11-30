var body = document.body;

function addClass(element, nameOfClass) {
	if (element.classList) {
 		element.classList.add(nameOfClass);
	}
	else {
		var regExp = new RegExp('(\\s|^)' + nameOfClass + '(\\s|$)');
		if (!element.className.match(regExp)) {
			element.className += " " + nameOfClass;
		}
	}
}

function removeClass(element, nameOfClass) {
	if (element.classList) {
		element.classList.remove(nameOfClass);
	}
	else {
		var regExp = new RegExp('(\\s|^)' + nameOfClass + '(\\s|$)');
		if (element.className.match(regExp)) {
			element.className.replace(regExp, ' ');
		}
	}
}

//Change M Logo on page refresh
document.addEventListener("DOMContentLoaded", () => {
  const log = console.log,
		fonts = ["./images/M-v1-01.svg"//"./images/M-v1-01.svg", "./images/M-v1-02.svg", "./images/M-v1-03.svg", "./images/M-v1-04.svg", "./images/M-v1-05.svg"
	],
		index = Math.floor(Math.random() * fonts.length),
		M_replace = document.getElementById("M_replace");
	M_replace.data = fonts[index];
	log(M_replace);
	log(fonts[index]);
});
	//fonts[2] = "./images/M-v1-02.svg";
	//fonts[3] = "./images/M-v1-03.svg";
	//fonts[4] = "./images/M-v1-04.svg";
	//fonts[5] = "./images/M-v1-05.svg";
	
(function (doc, win) {
	var docEl = doc.documentElement,
	resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
			recalc = function () {
		var clientWidth = docEl.clientWidth;
		if (!clientWidth) return;
		if(clientWidth > 800) clientWidth=800;
		docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
	};
	
	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	recalc();
})(document, window);

// function addZero(count,length){               
//     return new Array(length - count.toString().length + 1).join("0") + count.toString();              
// }
// console.log(addZero(888,5));
// var count = 10;
// var a = new Array(5-count.toString().length);
// var b = a.join("0");
// var c = b+count.toString();
// console.log(c);

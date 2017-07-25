/*
 * 全局配置参数
 */
var config = {
    bgUrl: resDomain + '/bg.jpg',
    plateUrl: resDomain + '/sprite_turntable.png',
    islandUrl: resDomain + '/sprite_island.png',
	smallHmUrl: resDomain + '/smallhm.png',
	warJsonUrl: resDomain + '/war.json',
    posInfos: {
        bg: { startX: 61, startY: 258, width: 518, height: 518, spriteX: 502, spriteY: 290 },
        plate: { startX: 87, startY: 285, width: 464, height: 464, spriteX: 18, spriteY: 316 },
        castle: { startX: 100, startY: 65, width: 440, height: 251, spriteX: 26, spriteY: 6 },
        pointer: { startX: 248, startY: 410, width: 140, height: 180, spriteX: 1419, spriteY: 79 },
        symbol: { startX: 299, startY: 498, width: 40, height: 40, spriteX: 1613, spriteY: 173 },
        turnOpenBtn: { startX: 181, startY: 804, width: 278, height: 198, spriteX: 1044, spriteY: 487 },
        turnCloseBtn: { startX: 181, startY: 804, width: 278, height: 198, spriteX: 1367, spriteY: 487 }
    },
    isSwitch: false,//画面是否在切换
    isTurn: false,//转盘是否在转
	isModalShow: false,//模态框是否显示
    islandInfos: {
		"tower":{
			"1":{"x":5,"y":1042,"w":198,"h":196,"c1":15,"c2":10},
			"2":{"x":216,"y":980,"w":222,"h":258,"c1":15,"c2":10},
			"3":{"x":452,"y":946,"w":222,"h":292,"c1":15,"c2":10},
			"4":{"x":688,"y":925,"w":241,"h":313,"c1":0,"c2":32},
			"5":{"x":943,"y":925,"w":267,"h":313,"c1":0,"c2":32}
		},
		"aeroboat":{
			"1":{"x":3,"y":758,"w":128,"h":142,"c1":-100,"c2":-12},
			"2":{"x":141,"y":733,"w":151,"h":167,"c1":-120,"c2":-15},
			"3":{"x":312,"y":714,"w":175,"h":184,"c1":0,"c2":-15},
			"4":{"x":515,"y":716,"w":195,"h":184,"c1":0,"c2":-15},
			"5":{"x":736,"y":696,"w":205,"h":204,"c1":0,"c2":-15}
		},
		"mountain":{
			"1":{"x":10,"y":64,"w":114,"h":120,"c1":0,"c2":40},
			"2":{"x":137,"y":61,"w":250,"h":123,"c1":0,"c2":45},
			"3":{"x":398,"y":45,"w":264,"h":139,"c1":0,"c2":68},
			"4":{"x":681,"y":15,"w":262,"h":169,"c1":0,"c2":70},
			"5":{"x":962,"y":12,"w":310,"h":172,"c1":0,"c2":78}
		},
		"statue":{
			"1":{"x":5,"y":257,"w":62,"h":159,"c1":20,"c2":62},
			"2":{"x":91,"y":257,"w":61,"h":159,"c1":20,"c2":62},
			"3":{"x":177,"y":241,"w":67,"h":175,"c1":16,"c2":45},
			"4":{"x":262,"y":241,"w":65,"h":175,"c1":16,"c2":45},
			"5":{"x":347,"y":242,"w":95,"h":174,"c1":-6,"c2":45}
		},
		"angel":{
			"1":{"x":15,"y":538,"w":165,"h":135,"c1":445.5,"c2":155.5},
			"2":{"x":189,"y":529,"w":160,"h":144,"c1":450,"c2":155.5},
			"3":{"x":356,"y":519,"w":151,"h":154,"c1":450,"c2":155.5},
			"4":{"x":515,"y":519,"w":150,"h":154,"c1":450,"c2":155.5},
			"5":{"x":674,"y":502,"w":180,"h":171,"c1":450,"c2":155.5}
		},
		"hammer":{
			"1":{"x":1036,"y":714,"w":149,"h":168}
		},
		"base":{
			"1":{"x":1240,"y":724,"w":148,"h":148}
		},
		"ball":{
			"1":{"x":866,"y":190,"w":548,"y":305}
		},
		"smoke":{
			"1":{"x":0,"y":0,"w":184,"h":168}
		}
    }
};

/*
 * LayaBox相关全局变量
 */
var Sprite = Laya.Sprite;
var Handler = Laya.Handler;
var Event = Laya.Event;
var Tween = Laya.Tween;
var Texture = Laya.Texture;
var Browser = Laya.Browser;
var TimeLine = Laya.TimeLine;

/*
 * 通用方法
 */
var commonMethods = {
	/**
	 * 绘制纹理对象
	 */
	drawContent: function(caller, sprite, url, posInfo) {
	    var texture = Laya.Texture.create(url, posInfo.spriteX, posInfo.spriteY, posInfo.width, posInfo.height);
	    sprite.autoSize = true;
	    sprite.graphics.drawTexture(texture, 0, 0, posInfo.width, posInfo.height);//画背景
	    sprite.pos(posInfo.startX + posInfo.width / 2, posInfo.startY + posInfo.height / 2);
	    sprite.pivot(posInfo.width / 2, posInfo.height / 2);
	    caller.addChild(sprite);
	}
};

(function(doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function() {
			var clientWidth = docEl.clientWidth;
			if (!clientWidth) return;
			if (clientWidth > 800) clientWidth = 800;
			docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
		};

	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	recalc();
})(document, window);
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

;(function(){
	//全局参数
	var AGlobal = {
		// 游戏状态
		"globalState": 1,
		// canvas ID
		"canvasId":"angryBirds_game",
		// 画布宽
		"GAME_WIDTH": 640,
		// 画布高
		"GAME_HEIGHT": 700,
		// 背景层
		"backLayer": null,
		// loading层
		"loadingLayer": null,
		// 舞台层
		"stageLayer": null,
		// 图片缓存
		"imglist": {}
	}
	var imgData = new Array({});
	init(10, AGlobal.canvasId , AGlobal.GAME_WIDTH, AGlobal.GAME_HEIGHT, main);

	function main() {
		AGlobal.backLayer = new LSprite();
		AGlobal.backLayer.graphics.drawRect(1,"#000",[0,0,AGlobal.GAME_WIDTH,AGlobal.GAME_HEIGHT],true,"#000");
		addChild(AGlobal.backLayer);

		AGlobal.loadingLayer = new LoadingSample3(12,"yellow","skyblue");
		AGlobal.backLayer.addChild(AGlobal.loadingLayer);
		LLoadManage.load(
            imgData,
            function(progress) {
                AGlobal.loadingLayer.setProgress(progress);
            },
            gameInit
        );  
	}

	function gameInit(result) {
		AGlobal.imglist = result;
		AGlobal.backLayer.removeAllChild(AGlobal.loadingLayer);
		AGlobal.loadingLayer = null;
		// 游戏逻辑开始
		startGame();
	}

	function startGame() {
		
	}
})();
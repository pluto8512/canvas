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
	var Global = {
		// 游戏状态
		"globalState": 1,
		// canvas ID
		"canvasId":"Box2d_game",
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
	// var imgData = new Array({
    //     name: "ball",
    //     path: "./images/ball.png"
    // });
	init(10, Global.canvasId , Global.GAME_WIDTH, Global.GAME_HEIGHT, main);

	function main() {
		Global.backLayer = new LSprite();
		Global.backLayer.graphics.drawRect(1,"#000",[0,0,Global.GAME_WIDTH,Global.GAME_HEIGHT],true,"#000");
		addChild(Global.backLayer);

		Global.loadingLayer = new LoadingSample3(900,"yellow","skyblue");
		Global.backLayer.addChild(Global.loadingLayer);
		LLoadManage.load(
            imgData,
            function(progress) {
                Global.loadingLayer.setProgress(progress);
            },
            gameInit    
        );  
	}

	function gameInit(result) {
		Global.imglist = result;
		Global.backLayer.removeAllChild(Global.loadingLayer);
		Global.loadingLayer = null;
		// 游戏逻辑开始
		startGame();
	}

	function startGame() {
		// 初始化Box2d
        LGlobal.box2d = new LBox2d();
        // 加入一个矩形刚体
        cLayer = new LSprite();
        cLayer.x = 300;
        cLayer.y = 390;
        Global.backLayer.addChild(cLayer);
        cLayer.addBodyPolygon();
	}
})();
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
	var imgData = new Array({
        name: "ball",
        path: "./images/ball.png"
    },{
		name: "wall",
		path:"./images/wall.jpg"
	});
	init(10, Global.canvasId , Global.GAME_WIDTH, Global.GAME_HEIGHT, main);

	function main() {
		Global.backLayer = new LSprite();
		Global.backLayer.graphics.drawRect(1,"#000",[0,0,Global.GAME_WIDTH,Global.GAME_HEIGHT],true,"pink");
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
		// LGlobal.setDebug(true);
		// 初始化Box2d
        LGlobal.box2d = new LBox2d();
        // 加入一个静态的矩形刚体
        cLayer = new LSprite();
        cLayer.x = 300;// ?为什么要写300
        cLayer.y = 600;
		
		var bitmap = new LBitmap(new LBitmapData(Global.imglist["wall"],0,0,225,100));
		bitmap.scaleX = 3;
		cLayer.addChild(bitmap);
        Global.backLayer.addChild(cLayer);
		// @params 刚体的宽，高，状态，密度，摩擦，弹力
        cLayer.addBodyPolygon(Global.GAME_WIDTH,100,0,5,0.4,0.2);// 刚体的宽高要和图片的宽高一样，这样才会刚体的碰撞才会精准 
		// 加入一个动态的矩形刚体
		// 动态刚体的碰撞完全遵循牛顿定律，只要给合适的参数，其他的交给“牛顿”
		cLayer = new LSprite();
		cLayer.x = 300;
		cLayer.y = 100;
		var bitmadata = new LBitmapData(Global.imglist["ball"]);
		cLayer.graphics.beginBitmapFill(bitmadata);
		// @params 线宽，线的颜色，[圆心x(相对图片),圆心y,半径，初始弧度，跑的弧度]
		cLayer.graphics.drawArc(1,"red",[63/2,63/2,63/2,0,2*Math.PI],true,"red");
		// cLayer.addChild(bitmap);
		Global.backLayer.addChild(cLayer);
		// @params 半径, 圆心x, 圆心y, 状态，密度，摩擦力，弹力 
		cLayer.addBodyCircle(63/2,63/2,63/2,1,5,0.4,0.2);// 这个圆心坐标该怎么计算？
		

	}
})();
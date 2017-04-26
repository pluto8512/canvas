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

;$(function(){
	var GAME_WIDTH = 640;
	var GAME_HEIGHT = 780;
	// 图片加载完成后为true
	var isGamePrepare = false;
	// 已经加载图片数
	var hasLoadImgCount = 0;
	var imgData = new Array(
		{name:"game_road",path:"./images/road.png"},
		{name:"game_head_border",path:"./images/game_head_border.png"},
		{name:"game_sprite",path:"./images/game_sprite.png"},
		{name:"me",path:"./images/me.jpg"}
	);
	// 存储加载后的图片
	var imglist = {};
	// 人物在每个位置上的信息，用于定位和移动等
	// moveType(1~4):移动类型 1:向右  2:向下(左) 3:向左(上) 4:向上(右)
	var position = [
		{x:45,y:40 , moveType:1 , differ:20},
		{x:130,y:40, moveType:1 , differ:20},
		{x:210,y:40, moveType:1 , differ:20},
		{x:295,y:50, moveType:1 , differ:20},
		{x:380,y:40, moveType:1 , differ:20},
		{x:450,y:40, moveType:1 , differ:20},
		{x:540,y:60, moveType:2 , differ:10},
		{x:540,y:150, moveType:2, differ:10},
		{x:540,y:220, moveType:2 , differ:10},
		{x:520,y:320, moveType:2 , differ:10},
		{x:540,y:400, moveType:2 , differ:10},
		{x:545,y:480, moveType:2 , differ:10},
		{x:515,y:580, moveType:3 , differ:20},
		{x:405,y:610, moveType:3 , differ:20},
		{x:335,y:610, moveType:3 , differ:20},
		{x:245,y:610, moveType:3 , differ:30},
		{x:140,y:610, moveType:3, differ:30},
		{x:50,y:610, moveType:4 , differ:5},
		{x:45,y:540, moveType:4 , differ:5},
		{x:50,y:460, moveType:1 , differ:10},
		{x:140,y:450, moveType:1 , differ:10},
		{x:220,y:450, moveType:1, differ:10},
		{x:300,y:450, moveType:1, differ:10},
		{x:400,y:460, moveType:4 , differ:10},
		{x:380,y:380, moveType:4 , differ:10},
		{x:380,y:300, moveType:4, differ:10},
		{x:355,y:210, moveType:3, differ:20},
		{x:250,y:190, moveType:3, differ:10},
		{x:170,y:190, moveType:3, differ:10},  //28
		{x:80,y:200, moveType:4, differ:0},  //29
		{x:60,y:130, moveType:4, differ:0}   //30
	];
	var movingStep = 4;
	var differMovingStep = 1;
	// 全局状态对象
	var globalState;
	// 调用 gameInit传递过来的参数
	var startConfig;
	// 全局的游戏实例
	var gameInstance;

	for(var i=0; i<imgData.length; i++){
		var img = new Image();
		img.onload = (function(name , self){
			if(++hasLoadImgCount){
				isGamePrepare = true;
			}
			imglist[name] = self;
		})(imgData[i].name , img);
		img.src = imgData[i].path;
	}

	var DafuwengGame = function(config){
		var self = this;

		self.config = $.extend({

		} , config);
		// 全局背景层
		self.backLayer = new LSprite();
		addChild(self.backLayer);

		// 路径层
		self.gameRoadSprite = new LSprite();
		self.backLayer.addChild(self.gameRoadSprite);
		var roadBitmapData = new LBitmapData(imglist["game_road"]);
		self.gameRoadSprite.addChild(new LBitmap(roadBitmapData));
		self.gameRoadSprite.y = 60;

		// 人物层(包括我的头像和头像框)
		self.meSprite = new LSprite();
		var meBitmap = new LBitmap(new LBitmapData(imglist["me"]));
		meBitmap.scaleX = 0.8;
		meBitmap.scaleY = 0.8;
		meBitmap.y = 4;
		self.meSprite.addChild(meBitmap);
		self.meSprite.addChild(new LBitmap(new LBitmapData(imglist["game_sprite"], 34,40,80,105)));
		self.meSprite.visible = false;
		self.backLayer.addChild(self.meSprite);

		self.backLayer.addEventListener(LEvent.ENTER_FRAME,self.onframe);
	};
	DafuwengGame.prototype.onframe = function(){
		var self = gameInstance;
		// 人物缩放
		scaleMe(gameInstance);

		if(globalState.state == GlobalState.MOVING){
			// 继续下个格子移动
			if(!globalState.curAction && globalState.actionQueue.length>0){
				globalState.curAction = {
					target : globalState.actionQueue.shift(),
					moveType : position[globalState.index].moveType,
					targetDiffer : 0,
					stepDiffer : 0,
					init : false,  // 可初始化计算一些信息
					state : 0  // 各种移动自己定义
				};
			}else if(!globalState.curAction){ // 结束人物移动
				globalState.updateState(GlobalState.INIT);

				startScaleMe(self , true);
			}else{ // 移动
				// 向右移动
				var curAction = globalState.curAction;
				var sourceX = position[globalState.index].x;
				var sourceY = position[globalState.index].y;
				var targetX = position[curAction.target].x;
				var targetY = position[curAction.target].y;
				var differ = position[globalState.index].differ;
				if(curAction.moveType == 1){
					self.meSprite.x = Math.min(self.meSprite.x+movingStep , targetX);

					if(!curAction.init){
						curAction.stepDiffer = (Math.abs(targetY - sourceY) + 2*differ)/((targetX - sourceX)/movingStep);
						curAction.targetDiffer = Math.min(sourceY , targetY) - differ;
						curAction.init = true;
					}

					if(curAction.state == 0){ // y轴往上
						self.meSprite.y = Math.max( self.meSprite.y - curAction.stepDiffer , curAction.targetDiffer );
						if(self.meSprite.y == curAction.targetDiffer){// 到达顶端
							curAction.state = 1;
						}
					}else if(curAction.state == 1){
						self.meSprite.y = Math.min( self.meSprite.y + curAction.stepDiffer , targetY);
						if(self.meSprite.y == targetY){
							curAction.state = 2;  //y轴结束运动
						}
					}

					if(self.meSprite.x >= targetX){
						self.meSprite.y = targetY;
						globalState.index = globalState.curAction.target;
						globalState.curAction = null;
					}
				}else if(curAction.moveType == 2){ // 向下偏左
					self.meSprite.y = Math.min(self.meSprite.y+movingStep , targetY);

					if(!curAction.init){
						curAction.stepDiffer = (Math.abs(targetX - sourceX) + 2*differ)/((targetY - sourceY)/movingStep);
						curAction.targetDiffer = Math.min(sourceX , targetX) - differ;
						curAction.init = true;
					}

					if(curAction.state == 0){ // x轴往左
						self.meSprite.x = Math.max( self.meSprite.x - curAction.stepDiffer , curAction.targetDiffer );
						if(self.meSprite.x == curAction.targetDiffer){// 到达最左顶端
							curAction.state = 1;
						}
					}else if(curAction.state == 1){
						self.meSprite.x = Math.min( self.meSprite.x + curAction.stepDiffer , targetX );
						if(self.meSprite.x == targetX){
							curAction.state = 2;  //x轴结束运动
						}
					}

					if(self.meSprite.y >= targetY){
						self.meSprite.x = targetX;
						globalState.index = globalState.curAction.target;
						globalState.curAction = null;
					}
				}else if(curAction.moveType == 3){ //向左
					self.meSprite.x = Math.max(self.meSprite.x-movingStep , targetX);

					if(!curAction.init){
						curAction.stepDiffer = (Math.abs(targetY - sourceY) + 2*differ)/((sourceX-targetX)/movingStep);
						curAction.targetDiffer = Math.min(sourceY , targetY) - differ;
						curAction.init = true;
					}

					if(curAction.state == 0){ // y轴往上
						self.meSprite.y = Math.max( self.meSprite.y - curAction.stepDiffer , curAction.targetDiffer );
						if(self.meSprite.y == curAction.targetDiffer){// 到达顶端
							curAction.state = 1;
						}
					}else if(curAction.state == 1){
						self.meSprite.y = Math.min( self.meSprite.y + curAction.stepDiffer , targetY);
						if(self.meSprite.y == targetY){
							curAction.state = 2;  //y轴结束运动
						}
					}

					if(self.meSprite.x <= targetX){
						self.meSprite.y = targetY;
						globalState.index = globalState.curAction.target;
						globalState.curAction = null;
					}
				}else if(curAction.moveType == 4){ // 向上偏右
					self.meSprite.y = Math.max(self.meSprite.y-movingStep , targetY);

					if(!curAction.init){
						curAction.stepDiffer = (Math.abs(targetX - sourceX) + 2*differ)/((sourceY - targetY)/movingStep);
						curAction.targetDiffer = Math.max(sourceX , targetX) + differ;
						curAction.init = true;
					}

					if(curAction.state == 0){ // x轴往右
						self.meSprite.x = Math.min( self.meSprite.x + curAction.stepDiffer , curAction.targetDiffer );
						if(self.meSprite.x == curAction.targetDiffer){// 到达最右顶端
							curAction.state = 1;
						}
					}else if(curAction.state == 1){
						self.meSprite.x = Math.max( self.meSprite.x - curAction.stepDiffer , targetX );
						if(self.meSprite.x == targetX){
							curAction.state = 2;  //x轴结束运动
						}
					}

					if(self.meSprite.y <= targetY){
						self.meSprite.x = targetX;
						globalState.index = globalState.curAction.target;
						globalState.curAction = null;
					}
				}
			}
		}
	};
	// 设置人物出现在哪个格子上
	DafuwengGame.prototype.setPosition = function(index){
		var self = this;
		self.meSprite.x = position[index].x;
		self.meSprite.y = position[index].y;
		self.meSprite.visible = true;

		startScaleMe(self , true);
	};
	// 移动   step可以为正数，也可以为负数
	DafuwengGame.prototype.forward = function(step){
		var self = this;
		stopScaleMe(self , function(){
			globalState.updateState(GlobalState.MOVING);
			if(step > 0){
				for(var i=1; i<=step; i++){
					globalState.actionQueue.push( (globalState.index+i)%position.length );
				}
			}else if(step < 0){
				for(var i=1; i<=Math.abs(step); i++){
					globalState.actionQueue.push( globalState.index-i>0 ? globalState.index-i : position.length-1);
				}
			}
		});
	};

	DafuwengGame.gameInit = function(config){
		startConfig = config;
		if(isGamePrepare){
			init(20, startConfig.canvasId , GAME_WIDTH, GAME_HEIGHT, startGame);
		}else{ // 图片没有加载完，继续等待
			var timer = setInterval(function(){
				if(isGamePrepare){
					clearInterval(timer);
					init(20, startConfig.canvasId , GAME_WIDTH, GAME_HEIGHT , startGame);
				}
			} , 100);
		}
	};

	function startGame(){
		globalState =  new GlobalState(startConfig);

		LGlobal.setDebug(true);
		window.gameInstance = gameInstance = new DafuwengGame();
		window.gameInstance.setPosition(globalState.index);
	}
	// 缩放人物
	function scaleMe(gameInstance , forceStart){
		var self = gameInstance;

		if(self.scaleMe.stop && self.scaleMe.scale >=1 && !self.scaleMe.mark){
			self.scaleMe.callback && self.scaleMe.callback.call(gameInstance);
			self.scaleMe.mark = true;
			return ;
		}else if(self.scaleMe.mark){  // mark=true 表示人物静止
			return ;
		}

		if(self.scaleMe.big){
			self.scaleMe.scale = Math.min(self.scaleMe.scale+self.scaleMe.step , 1);
			self.meSprite.scaleX = self.meSprite.scaleY = self.scaleMe.scale;
			if(self.scaleMe.scale >= 1){
				self.scaleMe.big= false;
			}
		}else{ // 缩小
			self.scaleMe.scale = Math.max(self.scaleMe.scale - self.scaleMe.step , 0.9);
			self.meSprite.scaleX = self.meSprite.scaleY = self.scaleMe.scale;
			if(self.scaleMe.scale <= 0.9){
				self.scaleMe.big = true;
			}
		}
	}
	function startScaleMe(gameInstance , forceStart){
		var self = gameInstance;
		self.scaleMe = self.scaleMe || {big:false, scale:1, step:0.01 , stop: true , callback:null , mark:false};

		self.scaleMe.stop  = !forceStart;

		self.scaleMe.mark = false;
	}
	function stopScaleMe(gameInstance , callback){
		var self = gameInstance;
		self.scaleMe.stop = true;
		self.scaleMe.callback = callback;
	}
	// 全局状态实体
	function GlobalState(config){
		var self = this;
		self.state = config.state || 1;  // 状态： 1(正常)  2(移动人物中)
		self.index = config.index || 0; // 当前位于哪个格子 0~30
		self.isForward = true;  // 向前移动,false为倒退
		self.actionQueue = [];   // 待执行动画的目标格子索引 
		self.curAction = null;
	}
	GlobalState.INIT = 1;
	GlobalState.MOVING = 2; // 人物移动中
	GlobalState.prototype.updateState = function(state){
		var self = this;
		self.state = state;
		self.curAction = null;
	}

	DafuwengGame.gameInit({canvasId:"dafuweng_game" , index: 0});
	window.DafuwengGame = DafuwengGame;
	setTimeout(function(){
		window.gameInstance.forward(40);
	} , 1000);
});
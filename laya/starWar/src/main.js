(function() {
	/**
	 * 背景类
	 */
	(function() {
	    function Background() {
	    	this.bg = null;
	        Background.__super.call(this);
	        this.init();
	    }
	    Laya.class(Background, 'Background', Sprite);
	    var _proto = Background.prototype;
	    _proto.init = function () {
	        this.bg = new Sprite();
	        this.addChild(this.bg);
	        this.bg.loadImage(config.bgUrl);
	    }
	})();

	/**
	 * 能量类
	 */
	(function () {
	    function Energy() {
	        this.energy = 0;
	        this.energySp = null;
	        Energy.__super.call(this);
	        this.init();
	    }
	    Laya.class(Energy, 'Energy', Sprite);
	    var _proto = Energy.prototype;
	    _proto.init = function () {
	        Laya.loader.load(config.plateUrl, Handler.create(this, this.createEnergy));
	    };
	    _proto.createEnergy = function () {
	        var url = Laya.loader.getRes(config.plateUrl);
	        var posInfo = {
	            startX: 32,
	            startY: 10,
	            width: 150,
	            height: 70,
	            spriteX: 1358,
	            spriteY: 350
	        };
	        this.energySp = new Sprite();
	        commonMethods.drawContent(this, this.energySp, url, posInfo);
	    };
	    _proto.setEnergy = function (value) {
	        this.energy = value;
	    };
	})();

	/**
	 * 金币类
	 */
	(function () {
	    function Gold() {
	        this.gold = 0;
	        this.goldSp = null;
	        Gold.__super.call(this);
	        this.init();
	    }
	    Laya.class(Gold, 'Gold', Sprite);
	    var _proto = Gold.prototype;
	    _proto.init = function () {
	        Laya.loader.load(config.plateUrl, Handler.create(this, this.createGold));
	    };
	    _proto.createGold = function () {
	        var url = Laya.loader.getRes(config.plateUrl);
	        var posInfo = {
	            startX: 338,
	            startY: 10,
	            width: 261,
	            height: 65,
	            spriteX: 1537,
	            spriteY: 350
	        };
	        this.goldSp = new Sprite();
	        commonMethods.drawContent(this, this.goldSp, url, posInfo);
	    };
	})();

	/**
	 * 游戏入口
	 */
	(function() {
		Laya.init(640, 1010, Laya.WebGL);
		Laya.stage.scaleMode = 'fixedwidth';
		Laya.loader.load([config.bgUrl, config.plateUrl]);
	    //控制相关变量
	    var mouseStartX;
	    var mouseEndX;
	    //加载背景
	    var background = new Background();
	    Laya.stage.addChild(background);
	    //加载能量条
	    var energy = new Energy();
	    Laya.stage.addChild(energy);
	    //加载金币条
	    var gold = new Gold();
	    Laya.stage.addChild(gold);
	    //加载转盘
	    var turntable = new Turntable();
	    Laya.stage.addChild(turntable);
	    //监听鼠标事件
	    Laya.stage.on(Event.MOUSE_DOWN, this, function () {
	        mouseStartX = Laya.stage.mouseX;
	    });
	    Laya.stage.on(Event.MOUSE_UP, this, function () {
	        mouseEndX = Laya.stage.mouseX;
	        if(mouseEndX - mouseStartX < 0) {
	            switchPlate(1);
	        }else if(mouseEndX - mouseStartX > 0) {
				switchPlate(2);
			}
	    });

	    //加载岛
	    var island = new IsLand();
	    Laya.stage.addChild(island);
		island.autoSize = true;
		island.pos(461, 780);
	    island.scaleX = 0.3;
	    island.scaleY = 0.3;
	    island.on(Event.CLICK, island, function() {
			switchPlate(1);
		});

        // 创建锤子
        var hammer = new Hammer();
        var hammerPosInfo = config.islandInfos.hammer;
        // 锤子添加到舞台
        Laya.stage.addChild(hammer);
        hammer.autoSize = true;
        hammer.pos(245, Laya.stage.height + hammerPosInfo['1'].h);
        // 弹窗实例,将岛屿实例传到控制面板类里面
        var pop = new UpgradePop();
        pop.init(island, hammer);
        // 锤子绑定点击事件
        hammer.on(Laya.Event.CLICK,hammer,hammer.openPop,[pop]);
	    //转盘岛屿切换事件
	    function switchPlate(type) {
	        if (config.isTurn || config.isSwitch) return;
			if (config.isModalShow) {
				config.isModalShow = false;
				return;
			}
			var turnBtnPosInfo = config.posInfos.turnOpenBtn,
				hammerPosInfo = config.islandInfos.hammer;
	        config.isSwitch = true;
	        if (type === 1) {//左滑
				Tween.to(turntable.plateContainer, { x: -800, y: -1300, skewY: 30, alpha: 0.4 }, 1000, null, Handler.create(this, function() {
					config.isSwitch = false;
				}), 0, false, true);
				Tween.to(turntable.turnBtn, { y: Laya.stage.height + turnBtnPosInfo.height }, 500, null, Handler.create(this, function() {
					Tween.to(hammer, {y: 804}, 500, null);
        		}));
	            Tween.to(island, { scaleX: 1, scaleY: 1, x: 50, y: 400 }, 1000, null);
	        } else if (type === 2) {
				Tween.to(turntable.plateContainer, { x: 0, y: 0, skewY: 0, alpha: 1}, 1000, null, Handler.create(this, function() {
					config.isSwitch = false;
				}), 0, false, true);
        		Tween.to(hammer, {y: Laya.stage.height + hammerPosInfo['1'].h}, 500, null, Handler.create(this, function() {
					Tween.to(turntable.turnBtn, { y: turnBtnPosInfo.startY + turnBtnPosInfo.height/2 }, 500, null);
				}));
	            Tween.to(island, { scaleX: 0.3, scaleY: 0.3, x: 461, y: 780 }, 1000, null);
	        }
	    };
	})();
})();
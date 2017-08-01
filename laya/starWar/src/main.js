(function () {
	/**
	 * 背景类
	 */
	(function () {
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
			this.value = 0;
			this.energyTxt = null;
			this.energySp = null;
			Energy.__super.call(this);
			this.init();
		}
		Laya.class(Energy, 'Energy', Sprite);
		var _proto = Energy.prototype;
		_proto.init = function () {
			this.energySp = new Sprite();
			this.energyTxt = new Text();
			this.energyTxt.color = '#fff';
			this.energyTxt.fontSize = 30;
			this.energyTxt.text = 0;
			this.energyTxt.width = 60;
			this.energyTxt.height = 37;
			this.energyTxt.align = 'center';
			this.energyTxt.valign = 'middle';
			this.energyTxt.stroke = 3;
			this.energyTxt.strokeColor = '#126EAD';
			this.energyTxt.zOrder = 1;
			this.energyTxt.pos(87, 20);
			this.addChild(this.energyTxt);
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
			commonMethods.drawContent(this, this.energySp, url, posInfo);
		};
		_proto.getEnergy = function () {
			return this.value;
		}
		_proto.setEnergy = function (value) {
			this.value = value;
			this.energyTxt.text = value;
		};
	})();

	/**
	 * 金币类
	 */
	(function () {
		function Gold() {
			this.value = 0;
			this.goldTxt = null;
			this.goldSp = null;
			Gold.__super.call(this);
			this.init();
		}
		Laya.class(Gold, 'Gold', Sprite);
		var _proto = Gold.prototype;
		_proto.init = function () {
			this.goldSp = new Sprite();
			this.goldTxt = new Text();
			this.goldTxt.color = '#fff';
			this.goldTxt.fontSize = 30;
			this.goldTxt.text = 0;
			this.goldTxt.width = 157;
			this.goldTxt.height = 33;
			this.goldTxt.align = 'center';
			this.goldTxt.valign = 'middle';
			this.goldTxt.stroke = 3;
			this.goldTxt.strokeColor = '#126EAD';
			this.goldTxt.zOrder = 1;
			this.goldTxt.pos(416, 25);
			this.addChild(this.goldTxt);
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
			commonMethods.drawContent(this, this.goldSp, url, posInfo);
		};
		_proto.getGold = function () {
			return this.gold;
		}
		_proto.setGold = function (value) {
			this.value = value;
			this.goldTxt.text = commonMethods.numberFormatWith(value);
		}
	})();

	/**
	 * 游戏入口
	 */
	(function () {
		Laya.init(640, 1010, Laya.WebGL);
		Laya.stage.scaleMode = 'fixedwidth';
		Laya.loader.load([config.bgUrl, config.plateUrl]);
		//初始变量
		var mouseStartX,
			mouseEndX,
			posInfo,
			background,
			energy,
			gold,
			turntable,
			island,
			hammer,
			pop,
			energyBtn,
			awardBtn,
			cheatsBtn,
			enterMapBtn,
			backBtn,
			map,
			rightContainer = new Sprite;
		//加载背景
		background = new Background();
		Laya.stage.addChild(background);
		Laya.stage.addChild(rightContainer);
		//加载能量条
		energy = new Energy();
		Laya.stage.addChild(energy);
		rightContainer.addChild(energy);
		//加载金币条
		gold = new Gold();
		Laya.stage.addChild(gold);
		rightContainer.addChild(gold);
		//加载转盘
		turntable = new Turntable();
		Laya.stage.addChild(turntable);
		turntable.setQuote(energy, gold);
		rightContainer.addChild(turntable);
		//加载岛
		island = new IsLand();
		Laya.stage.addChild(island);
		rightContainer.addChild(island);
		island.autoSize = true;
		island.pos(461, 780);
		island.scaleX = 0.3;
		island.scaleY = 0.3;
		island.on(Event.CLICK, island, function () {
			switchPlate(1);
		});
		// 创建锤子
		hammer = new Hammer();
		posInfo = config.islandInfos.hammer;
		// 锤子添加到舞台
		rightContainer.addChild(hammer);
		hammer.autoSize = true;
		hammer.pos(245, Laya.stage.height + posInfo['1'].h);
		// 弹窗实例,将岛屿实例传到控制面板类里面
		pop = new UpgradePop();
		pop.init(island, hammer);
		// 锤子绑定点击事件
		hammer.on(Laya.Event.CLICK, hammer, hammer.openPop, [pop]);
		//领能量按钮
		posInfo = config.posInfos.energyBtn;
		energyBtn = createBtn(config.energyBtnUrl, posInfo);
		Laya.stage.addChild(energyBtn);
		rightContainer.addChild(energyBtn);
		energyBtn.on(Event.CLICK, energy, function () {
			console.log('领能量！');
			let type = "SMB_002";
			commonMethods.addPop(type);
			commonMethods.closeEvent();
		});
		//领奖励按钮
		posInfo = config.posInfos.awardBtn;
		awardBtn = createBtn(config.awardBtnUrl, posInfo);
		Laya.stage.addChild(awardBtn);
		rightContainer.addChild(awardBtn);
		awardBtn.on(Event.CLICK, awardBtn, function () {
			console.log('领奖励！');
		});
		//秘籍按钮
		posInfo = config.posInfos.cheatsBtn;
		cheatsBtn = createBtn(config.cheatsBtnUrl, posInfo);
		Laya.stage.addChild(cheatsBtn);
		rightContainer.addChild(cheatsBtn);
		cheatsBtn.on(Event.CLICK, cheatsBtn, function () {
			console.log('秘籍！');
		});
		//进入地图按钮
		posInfo = config.posInfos.enterMapBtn;
		enterMapBtn = createBtn(config.enterMapUrl, posInfo);
		Laya.stage.addChild(enterMapBtn);
		rightContainer.addChild(enterMapBtn);
		enterMapBtn.on(Event.CLICK, enterMapBtn, function () {
			if (config.isTurn || config.isSwitch) return;
			config.isMapShow = true;
			enterMapBtn.visible = false;
			Tween.to(rightContainer, { x: Laya.stage.width }, 1000);
			Tween.to(map, { x: 0 }, 1000, null, Handler.create(map, function () {
				map.backBtn.visible = true;
			}));
		});
		//地图
		map = createMap();
		Laya.stage.addChild(map);
		//地图返回按钮
		map.backBtn.on(Event.CLICK, map.backBtn, function () {
			map.backBtn.visible = false;
			Tween.to(rightContainer, { x: 0 }, 1000, null, Handler.create(rightContainer, function () {
				enterMapBtn.visible = true;
				config.isMapShow = false;
			}));
			Tween.to(map, { x: -Laya.stage.width }, 1000);
		});
		//监听鼠标事件
		Laya.stage.on(Event.MOUSE_DOWN, this, function () {
			mouseStartX = Laya.stage.mouseX;
		});
		Laya.stage.on(Event.MOUSE_UP, this, function () {
			mouseEndX = Laya.stage.mouseX;
			if (mouseEndX - mouseStartX < 0) {
				switchPlate(1);
			} else if (mouseEndX - mouseStartX > 0) {
				switchPlate(2);
			}
		});

		init();

		//页面初始化方法
		function init() {
			$.ajax({
				//url: '/mobile/participation/starwar/init',
				url: 'res/json/init.json',
				type: 'get',
				success: function (res) {
					if (res.retCode === 0) {
						//获取返回的活动、玩家和富人数据
						var activity = res.model.data.activity,
							player = res.model.data.player,
							richman = res.model.data.richman;
						//设置能量、金币、富豪
						energy.setEnergy(player.energy);
						gold.setGold(player.coin);
						turntable.setRichman(richman);
						//如果有赠送金币，弹窗提示
						if (player.loginGiftEnergy != 0) {
							//弹窗提示
						}
						//如果建完岛却没有领取奖励
						if (player.islandsBuild.finished && !player.islandsBuild.hasGetPrize) {
							//弹窗提示
						}
					} else {
						//alert('获取页面初始化数据失败！');
					}
				},
				error: function () {
					alert('请求页面初始化失败！');
				}
			});
		}
		//转盘岛屿切换事件
		function switchPlate(type) {
			if (config.isTurn || config.isSwitch || config.isMapShow) return;
			if (config.isModalShow) {
				config.isModalShow = false;
				return;
			}
			var turnBtnPosInfo = config.posInfos.turnOpenBtn,
				hammerPosInfo = config.islandInfos.hammer;
			config.isSwitch = true;
			if (type === 1) {//左滑
				Tween.to(turntable.plateContainer, { x: -800, y: -1300, skewY: 30, alpha: 0.4 }, 1000, null, Handler.create(this, function () {
					config.isSwitch = false;
				}), 0, false, true);
				Tween.to(turntable.turnBtn, { y: Laya.stage.height + turnBtnPosInfo.height }, 500, null, Handler.create(this, function () {
					Tween.to(hammer, { y: 804 }, 500, null);
				}));
				Tween.to(island, { scaleX: 1, scaleY: 1, x: 50, y: 400 }, 1000, null);
			} else if (type === 2) {
				Tween.to(turntable.plateContainer, { x: 0, y: 0, skewY: 0, alpha: 1 }, 1000, null, Handler.create(this, function () {
					config.isSwitch = false;
				}), 0, false, true);
				Tween.to(hammer, { y: Laya.stage.height + hammerPosInfo['1'].h }, 500, null, Handler.create(this, function () {
					Tween.to(turntable.turnBtn, { y: turnBtnPosInfo.startY + turnBtnPosInfo.height / 2 }, 500, null);
				}));
				Tween.to(island, { scaleX: 0.3, scaleY: 0.3, x: 461, y: 780 }, 1000, null);
			}
		};
		//创建按钮
		function createBtn(url, posInfo) {
			var sp = new Sprite();
			sp.loadImage(url, 0, 0, posInfo.width, posInfo.height);
			sp.pos(posInfo.startX, posInfo.startY);
			return sp;
		}
		//创建地图
		function createMap() {
			var container = new Sprite(),
				map = new Sprite(),
				backBtn = new Sprite(),
				posInfo;
			container.backBtn = backBtn;
			container.map = map;
			//岛屿
			map.loadImage(config.islandMapUrl, 39, 0);
			container.addChild(map);
			//返回按钮
			posInfo = config.posInfos.backMapBtn;
			backBtn.loadImage(config.backMapUrl, 0, 0, posInfo.width, posInfo.height);
			backBtn.pos(posInfo.startX, posInfo.startY);
			backBtn.visible = false;
			container.addChild(backBtn);
			container.pos(-Laya.stage.width, 0);
			return container;
		}
	})();
})();
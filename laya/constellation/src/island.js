/**
 * 精灵涂
 * tumi330@163.com
 * 2017/7/19
 */
// 控制面板类
(function(){
    // 构造
    function UpgradePop(island) {
        // 弹窗
        this.pop = null;
        // 初始化  
        UpgradePop.__super.call(this);
        // this.init();
    }
    // 注册类
    Laya.class(UpgradePop,"UpgradePop",laya.display.Sprite);
    // 原型
    var _proto = UpgradePop.prototype;
    /**
     * 初始化
     * @param {island} 岛对象
     * @param {hammer} 锤子对象
     */
    _proto.init = function (island,hammer) {
        var that = this;
        $("#xzct_close").off("touchend").on("touchend",function(){
            that.hide();
        });
        // 点击升级 5X5
        for(var i=1; i<=5; i++){
            for(var j=2; j<=5; j++){
                (function(i,j){
                    $(".xzctpop ul:nth-child("+i+") li:nth-child("+j+")").on("touchend",function(){
                        if($(".xzctpop ul:nth-child("+i+") li:nth-child("+(j-1)+")").find("span").hasClass("geted")){
                            $(this).find("span").text("").addClass("geted");
                            if(j<5){
                                $(this).next().addClass("_"+i+(j+1));
                            }
                            $(this).off("touchend");
                            var target = {
                                "type":i,
                                "lel":j
                            }
                            // 岛屿换装
                            that.up(island,target,hammer);
                        }else {
                            alert("只能按顺序升级哦~");
                        }
                    });
                })(i,j);
            }
        }
    }
    // 弹窗展示
    _proto.show = function () {
        $("#pop").show();
    }
    // 弹窗隐藏
    _proto.hide = function () {
        $("#pop").hide();
    }
    /**
     * 点击升级
     * @param {island} 岛对象
     * @param {target} 配置参数
     * @param {hammer} 锤子对象
     */
    _proto.up = function (island,target,hammer) {
        island.update(target,hammer);
    }
})();

// 岛屿类
(function(){
    // 配置数据
    var data = configJSON;
    // 目标等级
    var target = {
        "tower":{"level":1},
        "aeroboat":{"level":1},
        "mountain":{"level":1},
        "statue":{"level":1},
        "angel":{"level":1}
    };
    // 构造
    function IsLand() {
        // 初始化
        IsLand.__super.call(this);
        // 名字
        this.name = "gemini";
        // 等级控制
        this.towerLel = target.tower.level;
        this.aeroboatLel = target.aeroboat.level;
        this.mountainLel = target.mountain.level;
        this.statueLel = target.statue.level;
        this.angelLel = target.angel.level;
        // 加载图集资源
        Laya.loader.load("res/atlas/war.json",Laya.Handler.create(this,this.init),null,Laya.Loader.ATLAS);
        // this.init();
    }
    // 注册类 IsLand
    Laya.class(IsLand,"IsLand",laya.display.Sprite);
    // 原型
    var _proto = IsLand.prototype;
    // 初始化
    _proto.init = function(){
        // 球体
        this.ball = new Sprite();
        // 城堡
        this.tower = new Sprite();
        this.tower.lel = 1;
        // 飞艇
        this.aeroboat = new Sprite();
        this.aeroboat.lel = 1;
        // 山
        this.mountain = new Sprite();
        this.mountain.lel = 1;
        // 雕像
        this.statue = new Sprite();
        this.statue.lel = 1;
        // 守护神
        this.angel = new Sprite();
        this.angel.lel = 1;
        // 建造烟雾
        this.smoke = new Sprite();
        // 建造小锤子
        this.smallHammer = new Sprite();

        // 缓存烟的动作
        Laya.Animation.createFrames(["war/yan_1.png","war/yan_2.png","war/yan_3.png","war/yan_4.png","war/yan_5.png","war/yan_6.png","war/yan_7.png","war/yan_8.png","war/yan_9.png",
        "war/yan_10.png","war/yan_11.png","war/yan_12.png","war/yan_13.png","war/yan_14.png","war/yan_15.png","war/yan_16.png","war/yan_17.png"],"smoke");
        // 创建烟的身体
        this.body = new Laya.Animation();
        // 添加身体
        this.smoke.addChild(this.body);

        // 加载小锤子的图片
        this.smallHammer.loadImage("res/smallhm.png",0,0,88,49,null);
        this.smallHammer.alpha = 0;

        // 加载主体的背景
        Laya.loader.load("res/island.png", Handler.create(this, function()
		{
            // 图片加载
			var t = Laya.loader.getRes("res/island.png");

            var tBall = Texture.create(t,866,190,548,305);
            var tTower = Texture.create(t,data.tower[this.towerLel].x,data.tower[this.towerLel].y,data.tower[this.towerLel].w,data.tower[this.towerLel].h);
            var tAeroboat = Texture.create(t,data.aeroboat[this.aeroboatLel].x , data.aeroboat[this.aeroboatLel].y, data.aeroboat[this.aeroboatLel].w , data.aeroboat[this.aeroboatLel].h);
            var tMountain = Texture.create(t,data.mountain[this.mountainLel].x , data.mountain[this.mountainLel].y, data.mountain[this.mountainLel].w , data.mountain[this.mountainLel].h);
            var tStatue = Texture.create(t,data.statue[this.statueLel].x , data.statue[this.statueLel].y, data.statue[this.statueLel].w , data.statue[this.statueLel].h);
            var tAngel = Texture.create(t,data.angel[this.angelLel].x , data.angel[this.angelLel].y, data.angel[this.angelLel].w , data.angel[this.angelLel].h);

			this.ball.graphics.drawTexture(tBall, 0,0,548,305);
            this.tower.graphics.drawTexture(tTower, 0, 0, data.tower[this.towerLel].w , data.tower[this.towerLel].h);
            this.aeroboat.graphics.drawTexture(tAeroboat,0,0, data.aeroboat.w, data.aeroboat.h);
            this.mountain.graphics.drawTexture(tMountain,0,0, data.mountain.w, data.mountain.h);
            this.statue.graphics.drawTexture(tStatue,0,0, data.statue[this.statueLel].w, data.statue[this.statueLel].h);
            this.angel.graphics.drawTexture(tAngel,0,0, data.angel[this.angelLel].w, data.angel[this.angelLel].h);

            /* 雕塑加一个发光滤镜(webgl不支持),设置滤镜集合
               var glowFilter = new GlowFilter("#ffff00", 5, 0, 0);
               this.statue.filters = [glowFilter];*/

            // 守护神设置旋转
            this.angel.pivot(data.angel[this.angelLel].w/2,data.angel[this.angelLel].h);
            this.angel.rotation = -15;

            // 守护神设置呼吸
            Laya.Tween.to(this.angel,{scaleY:0.99},900,Laya.Ease.linearInOut,Handler.create(this,this.angelTween1));

            // 飞艇设置浮动
            Laya.Tween.to(this.aeroboat,{y:-data.aeroboat[this.aeroboatLel].h-8},800,Laya.Ease.linearInOut,Handler.create(this,this.aeroboatTween1));

		})); 

        // 设置位置
        this.pos(42,399);
        this.tower.pos((data.ball[1].w - data.tower[this.towerLel].w)/2+data.tower[this.towerLel].c1, -data.tower[this.towerLel].h+data.tower[this.towerLel].c2);
        this.aeroboat.pos((data.ball[1].w - data.aeroboat[this.aeroboatLel].w)/2+data.tower[this.towerLel].c1 - 2*data.aeroboat[this.aeroboatLel].w/3 ,-data.tower[this.towerLel].h+data.tower[this.towerLel].c2);
        this.mountain.pos((data.ball[1].w - data.mountain[this.mountainLel].w)/2+data.mountain[this.mountainLel].c1,-data.mountain[this.mountainLel].h+data.mountain[this.mountainLel].c2);
        this.statue.pos(data.statue[this.statueLel].c1 ,data.statue[this.statueLel].c2);
        this.angel.pos(data.angel[this.angelLel].c1 ,data.angel[this.angelLel].c2);
        
        // 添加子sprite
        this.addChild(this.mountain);
        this.addChild(this.aeroboat);
        this.addChild(this.tower);
        this.addChild(this.ball);
        this.addChild(this.statue);
        this.addChild(this.angel);
        this.addChild(this.smoke);
        this.addChild(this.smallHammer);

    }
    // 更新岛
    _proto.update = function(target,hammer){
        var obj = {};
        // 解析target 
        switch (target.type) {
            case 1:
                obj.type = "mountain";
                this.smoke.pivot(0,0);
                this.smallHammer.pos( this[obj.type].x, this[obj.type].y);
                break;
            case 2:
                obj.type = "statue";
                this.smoke.pivot(0,0);
                this.smallHammer.pos( this[obj.type].x, this[obj.type].y);
                break;
            case 3:
                obj.type = "tower";
                this.smoke.pivot(0,0);
                this.smallHammer.pos( this[obj.type].x, this[obj.type].y);
                break;
            case 4:
                obj.type = "angel";
                this.smoke.pivot(this[obj.type].getBounds().width/2,this[obj.type].getBounds().height);
                this.smallHammer.pos( this[obj.type].x-this[obj.type].getBounds().width/2, this[obj.type].y-this[obj.type].getBounds().height);
                break;
            case 5:
                obj.type = "aeroboat";
                this.smoke.pivot(0,0);
                this.smallHammer.pos( this[obj.type].x, this[obj.type].y);
                break;
            default:
                alert("网络连接错误，请重新进入游戏~");
                break;
        }
        obj.lel = target.lel;

        // 配置
        var point = this.localToGlobal(new Laya.Point(this[obj.type].x, this[obj.type].y));

        // 播放换装动画
        this.smoke.pos( this[obj.type].x, this[obj.type].y);
        this.playAction("smoke");
        this.playAction("smallhm");

        // 加载主体的背景
        Laya.loader.load("res/island.png", Handler.create(this, function()
		{
            // 图片加载
			var t = Laya.loader.getRes("res/island.png");

            this[obj.type].graphics.clear();

            var tObj = Texture.create(t,data[obj.type][obj.lel].x, data[obj.type][obj.lel].y, data[obj.type][obj.lel].w, data[obj.type][obj.lel].h);

            this[obj.type].graphics.drawTexture(tObj, 0, 0, data[obj.type][obj.lel].w , data[obj.type][obj.lel].h);

            this[obj.type+"Lel"] = obj.lel;

        })); 
        // 球体和目标精灵的矩形显示区域
        var boundBall = this.ball.getBounds();
        var boundTower = this.tower.getBounds();
        var boundObj = this[obj.type].getBounds();
        var boundAeroboat = this.aeroboat.getBounds();

        // 设置位置
        switch (obj.type) {
            case "tower":
                this[obj.type].pos((boundBall.width - boundObj.width)/2+data.tower[obj.lel].c1, -data.tower[obj.lel].h+data.tower[obj.lel].c2);
                // 刷新飞艇的位置和缓动
                this.aeroboat.pos((boundBall.width - boundTower.width)/2+data.tower[this.tower.lel].c1 - 2*boundAeroboat.width/3 ,-data.tower[this.tower.lel].h+data.tower[this.tower.lel].c2);
                Laya.Tween.to(this.aeroboat,{y:-data.aeroboat[this.aeroboatLel].h-8},800,Laya.Ease.linearInOut,Handler.create(this,this.aeroboatTween1),0,true);
                break;
            case "aeroboat":
                this[obj.type].pos((boundBall.width - boundTower.width)/2+data.tower[this.tower.lel].c1 - 2*boundAeroboat.width/3 ,-data.tower[this.tower.lel].h+data.tower[this.tower.lel].c2);
                // 刷新飞艇缓动的位置
                Laya.Tween.to(this.aeroboat,{y:-data.aeroboat[this.aeroboatLel].h-8},800,Laya.Ease.linearInOut,Handler.create(this,this.aeroboatTween1),0,true);
                break;
            case "mountain":
                this[obj.type].pos((boundBall.width - boundObj.width)/2+data.mountain[obj.lel].c1,-data.mountain[obj.lel].h+data.mountain[obj.lel].c2);
                break;
            case "statue":
                this[obj.type].pos(data.statue[obj.lel].c1 ,data.statue[obj.lel].c2);
                break;
            case "angel":
                this[obj.type].pivot(data.angel[obj.lel].w/2,data.angel[obj.lel].h);
                this[obj.type].rotation = -15;
                this[obj.type].pos(data.angel[obj.lel].c1 ,data.angel[obj.lel].c2);
                break;
            default:
                break;
        }
        // 透明度的设置要在画完以后才起效
        this[obj.type].alpha = 0;
        this.startAlpha(this[obj.type]);

    }

    /**
     * 换装动画
     * @param {升级对象} obj
     */
    _proto.changeAnim = function(obj) {
        $("#pop").hide();    

         Laya.loader.load("res/yan.png", Handler.create(this, function()
		{
            // 图片加载
			var t = Laya.loader.getRes("res/yan.png");

            this.smoke.graphics.clear();

            var tSmoke = Texture.create(t,data.smoke[1].x,data.smoke[1].y,data.smoke[1].w,data.smoke[1].h);

            this.smoke.graphics.drawTexture(tSmoke, 0, 0, data.smoke[1].w , data.smoke[1].h);

        }));
        this.addChild(this.smoke);
        this.smoke.pivot(data.smoke[1].w/2,data.smoke[1].h/2);
        this.smoke.pos(this[obj.type].x,this[obj.type].y);
         //烟团乎明乎暗乎大乎小的缓动组
        // this.startSmoke();
    }

    // 飞艇缓动(浮动)
    _proto.aeroboatTween1 = function(){
        Laya.Tween.clearTween(this.aeroboatTween1);
        Laya.Tween.to(this.aeroboat,{y:-data.aeroboat[this.aeroboatLel].h-12},800,Laya.Ease.linearInOut,Handler.create(this,this.aeroboatTween2));
    }
    _proto.aeroboatTween2 = function(){
        Laya.Tween.clearTween(this.aeroboatTween2);
        Laya.Tween.to(this.aeroboat,{y:-data.aeroboat[this.aeroboatLel].h-8},800,Laya.Ease.linearInOut,Handler.create(this,this.aeroboatTween1));
    }

    // 缓慢出现的动画 
    _proto.startAlpha =  function(sprite) {
        Laya.Tween.to(sprite,{alpha:1},1000,Laya.Ease.linearInOut,Handler.create(this,this.clearAction),true);

    }

    // 小锤子挥舞的动画
    _proto.startSmallHm = function(){
        Laya.Tween.to(this.smallHammer,{rotation:-40},100,Laya.Ease.linearInOut,Handler.create(this,this.hmTween1),true,true);
    }
      _proto.hmTween1 = function(){
        Laya.Tween.clearTween(this.hmTween1);
        Laya.Tween.to(this.smallHammer,{rotation:0},100,Laya.Ease.linearInOut,Handler.create(this,this.hmTween2));
    }
    _proto.hmTween2 = function(){
        Laya.Tween.clearTween(this.hmTween2);
        Laya.Tween.to(this.smallHammer,{rotation:-40},100,Laya.Ease.linearInOut,Handler.create(this,this.hmTween1));
    }
    // 守护神缓动(呼吸)
    _proto.angelTween1 = function(){
        Laya.Tween.clearTween(this.angelTween1);
        Laya.Tween.to(this.angel,{scaleY:1},900,Laya.Ease.linearInOut,Handler.create(this,this.angelTween2));
    }
    _proto.angelTween2 = function(){
        Laya.Tween.clearTween(this.angelTween2);
        Laya.Tween.to(this.angel,{scaleY:0.99},900,Laya.Ease.linearInOut,Handler.create(this,this.angelTween1));
    }

    // 烟团乎明乎暗乎大乎小的缓动组
    _proto.startSmoke = function() {
        Laya.Tween.to(this.smoke,{scaleY:0.2,scaleX:0.2},100,Laya.Ease.linearInOut,Handler.create(this,this.smokeTw1),true);
    }
    _proto.smokeTw1 = function() {
        Laya.Tween.clearTween(this.smokeTw1);
        Laya.Tween.to(this.smoke,{scaleY:0.3,scaleX:0.3},100,Laya.Ease.linearInOut,Handler.create(this,this.smokeTw2));
    }
    _proto.smokeTw2 = function() {
        Laya.Tween.clearTween(this.smokeTw1);
        Laya.Tween.to(this.smoke,{scaleY:0.2,scaleX:0.2},100,Laya.Ease.linearInOut,Handler.create(this,this.smokeTw1));
    }

    // 播放烟雾
    _proto.playAction = function(action) {
        // 关闭弹窗
        $("#pop").hide();
        switch (action) {
            case "smoke":
                // 播放动画
                this.body.play(0,true,action);
                this.body.pos(0,0);
                break;
            case "smallhm":
                // 播放锤子的缓动
                this.startSmallHm();
                this.smallHammer.alpha = 1;
            default:
                break;
        }
        
        
    }
    _proto.clearAction = function() {
        this.body.clear("smoke");

        this.smallHammer.alpha = 0;
    }
})();

// 锤子类
(function() {
    // 构造
    function Hammer() {
        // 锤子
        var hm = null;
        // 底座
        var base = null;
        // 初始化  
        BackGround.__super.call(this);
        this.init();
    }
    // 注册类
    Laya.class(Hammer,"Hammer",laya.display.Sprite);
    // 原型
    var _proto = Hammer.prototype;
    // 初始化
    _proto.init = function () {
        // 锤子实例
        this.hm = new Sprite();
        // 底座实例
        this.base = new Sprite();
        // 配置数据
        var data = configJSON;
         // 加载主体的背景
        Laya.loader.load("res/island.png", Handler.create(this, function()
		{
            // 图片加载
            var t = Laya.loader.getRes("res/island.png");

            var tHammer = Texture.create(t,data.hammer["1"].x, data.hammer["1"].y, data.hammer["1"].w, data.hammer["1"].h);
            var tBase = Texture.create(t,data.base["1"].x, data.base["1"].y, data.base["1"].w, data.base["1"].h);

            this.hm.graphics.drawTexture(tHammer, 0,0,data.hammer["1"].w,data.hammer["1"].h);
            this.base.graphics.drawTexture(tBase, 0,0,data.base["1"].w,data.base["1"].h);

            // 放进容器
            this.addChild(this.base);
            this.addChild(this.hm);

            // 锤子设置缓动
            this.hm.pivot(this.hm.getBounds().width/2, 2*this.hm.getBounds().height/3);
            this.hm.pos(this.hm.getBounds().width/2,  2*this.hm.getBounds().height/3);

            this.startAnim1();

        })); 
    }
    // 锤子缓动组1触发
    _proto.startAnim1 = function(){
        Laya.Tween.to(this.hm,{rotation:-40},150,Laya.Ease.linearInOut,Handler.create(this,this.hammerTween1));
    }
    // 锤子缓动组1
    _proto.hammerTween1 = function(){
        Laya.Tween.clearTween(this.hammerTween1);
        Laya.Tween.to(this.hm,{rotation:0},250,Laya.Ease.linearInOut,Handler.create(this,this.hammerTween2));
    }
    _proto.hammerTween2 = function(){
        Laya.Tween.clearTween(this.hammerTween2);
        Laya.Tween.to(this.hm,{rotation:-33},150,Laya.Ease.linearInOut,Handler.create(this,this.hammerTween3));
    }
    _proto.hammerTween3 = function(){
        Laya.Tween.clearTween(this.hammerTween2);
        Laya.Tween.to(this.hm,{rotation:0},250,Laya.Ease.linearInOut,Handler.create(this,this.hammerTween4));
    }
    _proto.hammerTween4 = function(){
        Laya.Tween.clearTween(this.hammerTween2);
        Laya.Tween.to(this.hm,{rotation:-40},150,Laya.Ease.linearInOut,Handler.create(this,this.hammerTween1),800);
    }
    // 打开弹窗
    _proto.openPop = function(pop){
        pop.show();
    } 
})();


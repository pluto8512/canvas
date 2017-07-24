var Sprite = laya.display.Sprite;
var Texture = laya.resource.Texture;
var WebGL = Laya.WebGL;
var GlowFilter = Laya.GlowFilter;
var Handler = Laya.Handler;
var Graphics = laya.display.Graphics;
var Matrix = laya.maths;
// 背景类
(function() {    
    // 构造
    function BackGround() {
        // 背景
        var bg = null;
        // 初始化
        BackGround.__super.call(this);
        this.init();
    }
    // 注册类 BackGround
    Laya.class(BackGround,"BackGround",laya.display.Sprite);
    // 原型
    var _proto = BackGround.prototype;
    _proto.init = function () {
        // 背景实例
        this.bg = new Sprite();
        // 加载图片
        this.bg.loadImage("res/bj.jpg");
        // 放进容器
        this.addChild(this.bg);
    }
})();

// 游戏类
(function() {
    // 构造
    function Game() {
        // 初始化引擎
        Laya.init(640,1010,WebGL);
        //设置适配模式 (备用fixedauto/full)
        Laya.stage.scaleMode = "fixedwidth";
        //设置居中对齐			
        Laya.stage.alignH = "center";
        //设置横竖屏			
        Laya.stage.screenMode = "vertical";

        // 创建背景
        this.bg = new BackGround();
        // 背景添加到舞台
        Laya.stage.addChild(this.bg);

        // 创建岛屿
        this.island = new IsLand();
        // 岛屿添加到舞台
        Laya.stage.addChild(this.island);
        this.island.autoSize = true;

        // 创建锤子
        this.hammer = new Hammer();
        // 锤子添加到舞台
        Laya.stage.addChild(this.hammer);
        this.hammer.autoSize = true;
        this.hammer.pos(245,792);
        // 弹窗实例,将岛屿实例传到控制面板类里面
        this.pop = new UpgradePop();
        this.pop.init(this.island,this.hammer);

        // 锤子绑定点击事件
        this.hammer.on(Laya.Event.CLICK,this,this.hammer.openPop,[this.pop]);

    }
    // 注册类 Game
    Laya.class(Game,"Game");
    // Game原型
    var _proto = Game.prototype;
    /**
     * 
     */
    _proto.onLoaded = function (){

    }

})();

var gameInstance = new Game();




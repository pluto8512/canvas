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
        this.bg.loadImage("./images/bj.jpg");
        // 放进容器
        this.addChild(this.bg);
    }
})();

// 角色类
var Role = (function(){
    function Role() {
        Role.super(this);
        // 初始化
        this.init();
    }
    Laya.class(Role,"Role",laya.display.Sprite);
    var _proto = Role.prototype;
    _proto.init = function(){
        // 缓存飞机的动作
        Laya.Animation.createFrames(["war/hero_fly1.png","war/hero_fly2.png"],"hero_fly");
        // 创建一个动画作为飞机的圣体
        this.body = new Laya.Animation();
        // 
        this.addChild(this.body);
        //
        this.playAction("hero_fly"); 
    }
    _proto.playAction = function(action){
        // 播放动画
        this.body.play(0,true,action);
        // 机身居中
        this.bound = this.body.getBounds();
        this.body.pos(-this.bound.width/2,-this.bound.height/2);
    }
    return Role;
})();

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
        
        // 加载图集资源
        Laya.loader.load("./images/war.json",Laya.Handler.create(this,onLOaded),null,Laya.Loader.ATLAS);
        function onLOaded() {
            this.hero = new Role();
            // 设置主角位置
            this.hero.pos(240,500);
            // 添加到舞台上
            Laya.stage.addChild(this.hero);
        }

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
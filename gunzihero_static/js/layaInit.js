var GAME = {
    stickLength: 0, //棍子伸长计数
    stickWidth: 0, //棍子倒下宽度
    stickStart: false, //伸长开始
    stickEnd: false, //伸长结束
    stickX: 0, //起始位置
    stickXs: 0, //第二次起始位置
    floorWidth: 0, //地板宽度
    stickTransverse: false, // 棍子倒下
    playerMoveKey: false, //人物开始移动
    isOk: false, //是否成功
    isMoveAll: false, //是否移动屏幕
    LayaBgs: null, //action
    Floors: null, //地板
    Players: null, //人物
    touchstartKey: true,
    wholeScore: 0, //分数
    longSum: 0,
    keyAgain: true,
    init: function() {
        window.Tween = Laya.Tween;
        window.SoundManager = Laya.SoundManager;
        Laya.init(640, 1200, Laya.WebGL);
        Laya.stage.scaleMode = "exactfit";
        Laya.stage.alignH = "center";
        Laya.stage.bgColor = "#fff";
        Laya.loader.load(["./image/zhan.png", "./image/jiafen.png"]);
    },
    playStrat: function() { //开始游戏
        if (!this.keyAgain) {
            return;
        }
        this.keyAgain = false;
        setTimeout(function() {
            GAME.keyAgain = true;
        }, 1500);
        this.longSum = 0;
        this.stickLength = 0;
        this.touchstartKey = true;
        this.stickWidth = 0;
        this.stickStart = false;
        this.stickEnd = false;
        this.stickX = 0;
        this.stickXs = 150;
        this.floorWidth = 0;
        this.stickTransverse = false;
        this.playerMoveKey = false;
        this.isOk = false;
        this.isMoveAll = false;
        this.Floors = null;
        this.Players = null;
        this.wholeScore = 0;
        if (Laya.stage._childs[0] != undefined) {
            Laya.stage._childs[0].destroy();
        }
        this.Players = new RedMan();
        this.Players.x = 150 - 40; //初始地板宽度 - 人物宽度
        this.stickX = 150;
        this.Players.y = Laya.stage.height - 500 - 64;
        Laya.stage.addChild(this.Players);
        //地板控制
        this.Floors = new Floor();
        this.Floors.add(0, 150);
        this.Floors.add();
        Laya.stage.addChild(this.Floors);
        //棍子
        this.Sticks = new Stick();
        Laya.stage.addChild(this.Sticks);
        Laya.timer.frameLoop(1, Laya.stage, this.onLoop);
        document.getElementById('layaContainer').addEventListener("touchstart", function() {
            event.preventDefault();
            if (GAME.touchstartKey) {
                GAME.stickStart = true;
                GAME.stickLength = 0;
            }
        });
        document.getElementById('layaContainer').addEventListener("touchend", function() {
            event.preventDefault();
            if (GAME.touchstartKey) {
                GAME.stickStart = false;
                GAME.touchstartKey = false;
                GAME.longSum++;
                GAME.stickTransverse = true;
                if (GAME.isOk) {
                    Tween.to(GAME.Players, {
                        x: (GAME.stickXs - 20)
                    }, 1000);
                    if (this.x >= (GAME.stickXs - 20)) {
                        this.x = GAME.stickXs - 20;
                        GAME.playerMoveKey = false;
                        GAME.isOk = false;
                        GAME.stickX = stickXs;
                        GAME.isMoveAll = true;
                    }
                } else {
                    GAME.playerMoveKey = false;
                }
            }
        });
    },
    onLoop: function() {
        if (GAME.stickStart) {
            GAME.stickLength += 4;
            if (GAME.stickLength >= 640) {
                GAME.stickLength = 640;
            }
        }
        if (GAME.isMoveAll) {
            Laya.stage.x -= 8;
            if (Math.abs(Laya.stage.x) >= (GAME.stickXs - GAME.floorWidth)) {
                GAME.touchstartKey = true;
                Laya.stage.x = -(GAME.stickXs - GAME.floorWidth);
                GAME.isMoveAll = false;
                GAME.Floors.add();
            }
        }
    }
}
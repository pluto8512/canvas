(function() {
    var AniConfPath = "./image/image.json";
    RedMan.ani = null;
    RedMan.playMan = null;

    function RedMan() {
        RedMan.__super.call(this);
        this.init();
    }
    Laya.class(RedMan, "RedMan", laya.display.Sprite);
    var _proto = RedMan.prototype;
    _proto.init = function() {
        this.playMan = new laya.display.Sprite;
        this.playMan.loadImage("./image/zhan.png");
        this.addChild(this.playMan);
        Laya.loader.load(AniConfPath, laya.utils.Handler.create(this, this.createAnimation), null, Laya.Loader.ATLAS);
        Laya.timer.frameLoop(1, this, this.onLoop);
    }
    _proto.createAnimation = function() {
        this.ani = new Laya.Animation();
        this.ani.loadAtlas(AniConfPath);
        this.ani.interval = 30;
        this.ani.index = 0;
        this.ani.alpha = 0;
        this.addChild(this.ani);
    }
    _proto.onLoop = function() {
        if (GAME.playerMoveKey) {
            this.x += 6;
            if (this.x >= (GAME.stickXs - GAME.floorWidth - 10)) {
                if (GAME.Floors._childs[GAME.Floors._childs.length - 1]._childs[0] != undefined) {
                    if (GAME.Floors._childs[GAME.Floors._childs.length - 1]._childs[0].alpha == 1) {
                        GAME.wholeScore++;
                        GAME.Floors._childs[GAME.Floors._childs.length - 1]._childs[0].alpha = 0;
                    }
                }
            }
            if (this.x >= (GAME.stickLength + GAME.stickX - 40)) {
                if (GAME.isOk) { //游戏成功
                    if (this.x >= (GAME.stickXs - 40)) {
                        this.x = GAME.stickXs - 40;
                        GAME.touchstartKey = true;
                        GAME.playerMoveKey = false;
                        GAME.isOk = false;
                        GAME.stickX = GAME.stickXs;
                        GAME.isMoveAll = true;
                        GAME.Players.ani.stop();
                        GAME.Players.ani.alpha = 0;
                        GAME.Players.playMan.alpha = 1;
                        GAME.wholeScore++;
                    }
                } else { //游戏失败
                    this.x = GAME.stickLength + GAME.stickX - 40;
                    SoundManager.playSound("./media/tip.mp3", 1);
                    Tween.to(GAME.Sticks.thisStick, {
                        rotation: 180
                    }, 1000, null, laya.utils.Handler.create(this, function() {
                        //window.GameOver();
                        console.log("得分:" + GAME.wholeScore);
                    }));
                    Tween.to(GAME.Players, {
                        y: 1800
                    }, 1500);
                    GAME.playerMoveKey = false;
                }
            }
        }
    }
})(window)
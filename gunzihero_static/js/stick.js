(function() {
    function Stick() {
        Stick.__super.call(this);
        this.thisStick = null;
        this.stickY = Laya.stage.height - 500;
        this.init();
    }
    Laya.class(Stick, "Stick", laya.display.Sprite);
    var _proto = Stick.prototype;
    _proto.init = function() {
        this.add();
        Laya.timer.frameLoop(1, this, this.onLoop);
    }
    _proto.add = function() {
        this.thisStick = new laya.display.Sprite();
        this.thisStick.graphics.clear();
        this.thisStick.x = 0;
        this.thisStick.y = 0;
        this.addChild(this.thisStick);
    }
    _proto.onLoop = function() {
        if (GAME.stickStart) { //伸长
            this.thisStick.graphics.clear();
            this.thisStick.pos(GAME.stickX, this.stickY);
            this.thisStick.rotation = 0;
            this.thisStick.graphics.drawLine(0, 0, 0, -GAME.stickLength, "block", 5);
        }
        if (GAME.stickTransverse) { //倒下
            Tween.to(this.thisStick, {
                rotation: 90
            }, 600, null, laya.utils.Handler.create(this, function() {
                GAME.Players.playMan.alpha = 0;
                GAME.Players.ani.alpha = 1;
                GAME.Players.ani.play();
                if ((GAME.stickX + GAME.stickLength) > (GAME.stickXs + 5) || (GAME.stickX + GAME.stickLength - 5) < (GAME.stickXs - GAME.floorWidth)) {
                    GAME.isOk = false;
                } else {
                    GAME.isOk = true;
                }
                GAME.playerMoveKey = true;
            }));
            GAME.stickTransverse = false;
        }
    }
})(window)
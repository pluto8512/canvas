(function() {
    function LayaBg() {
        LayaBg.__super.call(this);
        this.init();
    }
    Laya.class(LayaBg, "LayaBg", laya.display.Sprite);
    var _proto = LayaBg.prototype;
    _proto.init = function() {
        Players = new window.RedMan();
        Players.x = 150 - 40; //初始地板宽度 - 人物宽度
        stickX = 150;
        Players.y = Laya.stage.height - 500 - 64;
        this.addChild(Players);
        //地板控制
        Floors = new window.Floor();
        Floors.add(0, 150);
        Floors.add();
        this.addChild(Floors);
        //棍子
        Sticks = new window.Stick();
        this.addChild(Sticks);
        Laya.timer.frameLoop(1, this, this.onLoop);
        document.getElementById('layaContainer').addEventListener("touchstart", function() {
            event.preventDefault();
            if (touchstartKey) {
                stickStart = true;
                stickLength = 0;
            }
        });
        document.getElementById('layaContainer').addEventListener("touchend", function() {
            event.preventDefault();
            if (touchstartKey) {
                stickStart = false;
                touchstartKey = false;
                longSum++;
                stickTransverse = true;
                if (isOk) {
                    Tween.to(Players, {
                        x: (stickXs - 20)
                    }, 1000);
                    if (this.x >= (stickXs - 20)) {
                        this.x = stickXs - 20;
                        playerMoveKey = false;
                        isOk = false;
                        stickX = stickXs;
                        isMoveAll = true;
                    }
                } else {
                    playerMoveKey = false;
                }
            }
        });
    }
    _proto.onLoop = function() {
        if (stickStart) {
            stickLength += 4;
            if (stickLength >= 640) {
                stickLength = 640;
            }
        }
        if (isMoveAll) {
            this.x -= 8;
            if (Math.abs(this.x) >= (stickXs - floorWidth)) {
                touchstartKey = true;
                this.x = -(stickXs - floorWidth);
                isMoveAll = false;
                Floors.add();
            }
        }
    }
})(window)
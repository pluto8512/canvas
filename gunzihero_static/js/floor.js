(function() {
    function Floor() {
        Floor.__super.call(this);
    }
    Laya.class(Floor, "Floor", laya.display.Sprite);
    var _proto = Floor.prototype;
    _proto.init = function(initX, floorWidth, itemKey) {
        var thisFloor = new laya.display.Sprite();
        this.autoSize = true;
        this.x = 0;
        this.y = Laya.stage.height - 500;
        this.addChild(thisFloor);
        thisFloor.graphics.drawRect(0, 0, floorWidth, 600, "black");
        thisFloor.x = initX;
        if (Math.floor(Math.random() * 3) == 2 && floorWidth > 30 && itemKey) {
            this.addItem(thisFloor, floorWidth / 2 - 20);
        }
    }
    _proto.add = function(a, b) {
        if (a === undefined || b === undefined) {
            var floorWidth02 = GAME.floorWidth;
            if (floorWidth02 == 0) floorWidth02 = 150;
            GAME.floorWidth = Math.floor(Math.random() * 130 + 20); //地板的最大宽度为150
            var FloorX = Math.floor(Math.random() * (640 - GAME.floorWidth - floorWidth02 - 40)) + GAME.stickXs;
            if (FloorX - GAME.stickXs < 20) {
                FloorX = GAME.stickXs + 20;
            }
            GAME.stickXs = FloorX + GAME.floorWidth; //第二次起始位置
            this.init(FloorX, GAME.floorWidth, true);
        } else {
            this.init(0, 150, false);
        }
    }
    _proto.addItem = function(self, x) {
        var item = new laya.display.Sprite;
        item.x = x;
        item.y = -50;
        item.loadImage("./image/jiafen.png");
        self.addChild(item);
    }
})(window)
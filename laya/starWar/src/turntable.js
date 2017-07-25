(function(){
    function Turntable() {
        this.bg = null;//转盘背景
        this.plateContainer = null;//转盘容器
        this.plate = null;//转盘
        this.castle = null;//城堡
        this.pointer = null;//指针
        this.symbol = null;//星座符号
        this.turnBtn = null;//转盘按钮
        Turntable.__super.call(this);
        this.init();
    }
    Laya.class(Turntable, 'Turntable', Sprite);

    var posInfos;
    var _proto = Turntable.prototype;

    _proto.init = function() {
        posInfos = config.posInfos;
        Laya.loader.load(config.plateUrl, Handler.create(this, this.createPlate));
    };
    //生成转盘相关元素
    _proto.createPlate = function() {
        var plateUrl = Laya.loader.getRes(config.plateUrl);
        this.plateContainer = new Sprite();
        this.castle = new Sprite();
        this.plate = new Sprite();//转盘
        this.bg = new Sprite();//转盘背景
        this.pointer = new Sprite();//指针
        this.symbol = new Sprite();//星座符号
        this.turnBtn = new Sprite();//转盘按钮
        //容器
        this.addChild(this.plateContainer);
        //城堡
        posInfo = posInfos.castle;
        commonMethods.drawContent(this.plateContainer, this.castle, plateUrl, posInfo);
        //转盘背景
        posInfo = posInfos.bg;
        commonMethods.drawContent(this.plateContainer, this.bg, plateUrl, posInfo);
        //转盘
        posInfo = posInfos.plate;
        commonMethods.drawContent(this.plateContainer, this.plate, plateUrl, posInfo);
        //指针
        posInfo = posInfos.pointer;
        commonMethods.drawContent(this.plateContainer, this.pointer, plateUrl, posInfo);
        //星座符号
        posInfo = posInfos.symbol;
        commonMethods.drawContent(this.plateContainer, this.symbol, plateUrl, posInfo);
        //中间按钮
        this.restoreBtn();
    };
    //重置按钮
    _proto.restoreBtn = function() {
        var posInfo = posInfos.turnOpenBtn;
        var url = Laya.loader.getRes(config.plateUrl);
        commonMethods.drawContent(this, this.turnBtn, url, posInfo);
        this.turnBtn.on(Event.CLICK, this, function(){
            if(config.isSwitch || config.isTurn) return;
            config.isTurn = true;
            this.turnBtn.graphics.clear();
            posInfo = posInfos.turnCloseBtn;
            commonMethods.drawContent(this, this.turnBtn, url, posInfo);
            this.rotateBefore();
        });
    }
    //真正旋转之前
    _proto.rotateBefore = function() {
        var def = $.Deferred();
        this.rotateKeepOn(def.promise());
        setTimeout(function(){
            console.log('Ajax回调完成');
            def.resolve(6);
        },3000);
        //下面等接口写真正的AJAX回调
        /*
            $.ajax({
            });
        */
    };
    //等待
    _proto.rotateKeepOn = function(def) {
        this.plate.rotation = 0;
        Tween.to(this.plate, {rotation: 720}, 500, null, Handler.create(this, function(){
            var state = def.state();
            var that = this;
            if(state === 'pending') {
                console.log('还没有数据哦！');
                this.rotateKeepOn(def);
            }else if(state === 'resolved') {
                def.done(function(data){
                    console.log('请求得到数据了，开始真正的旋转！');
                    that.rotate(data);
                });
            }else if(state === 'rejected') {//错误的情况，有两种，超时和服务端错误，前端补能量
                def.fail(function(){
                    console.log('请求失败了！');
                    that.rotate(1);//1是金币加1
                });
            }
        }), 0, false, true);
    };
    //转盘转，n是第几个，1~9
    _proto.rotate = function(n) {
        var curAngle = 40*n - 20;//20是居中
        this.plate.rotation = 0;
        Tween.to(this.plate, {rotation: -curAngle + 360*5}, 5000, Laya.Ease.circOut, Handler.create(this, function(){
            config.isTurn = false;
            console.log('我跑完了！');
            this.restoreBtn();
        }), 0, false, true);
    };
})();
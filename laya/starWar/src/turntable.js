(function () {
    function Turntable() {
        this.bg = null;//转盘背景
        this.plateContainer = null;//转盘容器
        this.plate = null;//转盘
        this.castle = null;//城堡
        this.pointer = null;//指针
        this.symbol = null;//星座符号
        this.turnBtn = null;//转盘按钮
        this.richMan = null;//富豪
        this.energy = null;//引用外部能量
        this.gold = null;//引用外部金币
        Turntable.__super.call(this);
        this.init();
    }
    Laya.class(Turntable, 'Turntable', Sprite);

    var posInfos;
    var _proto = Turntable.prototype;

    _proto.init = function () {
        this.plateContainer = new Sprite();
        this.castle = new Sprite();//城堡
        this.plate = new Sprite();//转盘
        this.bg = new Sprite();//转盘背景
        this.pointer = new Sprite();//指针
        this.symbol = new Sprite();//星座符号
        this.turnBtn = new Sprite();//转盘按钮
        this.richman = new Sprite();//富豪        
        posInfos = config.posInfos;
        Laya.loader.load(config.plateUrl, Handler.create(this, this.createPlate));
    };
    //引用能量和金币
    _proto.setQuote = function (energy, gold) {
        this.energy = energy;
        this.gold = gold;
    }
    //生成转盘相关元素
    _proto.createPlate = function () {
        var plateUrl = Laya.loader.getRes(config.plateUrl);
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
        this.turnBtn.on(Event.CLICK, this, function () {
            var that = this,
                leftEg = this.energy.value,//剩余能量
                posInfo,
                url;
            if (config.isSwitch || config.isTurn) return;
            if(leftEg === 0) {//能量不够啦
                alert('能量不够啦~');
                return;
            }
            config.isTurn = true;
            this.turnBtn.graphics.clear();
            this.energy.setEnergy(this.energy.value - 1);
            posInfo = posInfos.turnCloseBtn;
            url = Laya.loader.getRes(config.plateUrl);
            commonMethods.drawContent(this, this.turnBtn, url, posInfo);
            setTimeout(function() {
                that.restoreBtn();
            }, 100);
            this.rotateBefore();
        });
        //富豪
        this.plateContainer.addChild(this.richman);
    };
    //重置按钮
    _proto.restoreBtn = function () {
        var posInfo = posInfos.turnOpenBtn;
        var url = Laya.loader.getRes(config.plateUrl);
        commonMethods.drawContent(this, this.turnBtn, url, posInfo);
    }
    //真正旋转之前
    _proto.rotateBefore = function () {
        var def = $.Deferred();
        this.rotateKeepOn(def.promise());
        //下面等接口写真正的AJAX回调
        $.ajax({
            //url: '/mobile/participation/starwar/playpan',
            url: 'res/json/playpan.json',
            timeout: 3000,
            type: 'get',
            success: function (res) {
                if (res.retCode === 0) {//成功
                    //加金币
                    def.resolve(res.model);
                }else {
                    def.reject();
                    alert(res.message);
                }
            },
            complete: function(XMLHttpRequest, status) {
                //服务端错误或超时
                if(status === 'error' || status === 'timeout') {
                    def.reject();
                }
            }
        });
    };
    //等待
    _proto.rotateKeepOn = function (def) {
        this.plate.rotation = 0;
        Tween.to(this.plate, { rotation: 720 }, 500, null, Handler.create(this, function () {
            var state = def.state();
            var that = this;
            if (state === 'pending') {
                this.rotateKeepOn(def);
            } else if (state === 'resolved') {
                def.done(function (data) {
                    that.rotate(data);
                });
            } else if (state === 'rejected') {//错误的情况，有两种，超时和服务端错误，前端补能量
                def.fail(function () {
                    var data = {
                        slot: 6,
                        coin: 1,
                        energy: 1
                    }
                    that.rotate(data);//1是金币加1
                });
            }
        }), 0, false, true);
    };
    //转盘转，n是第几个，1~9
    _proto.rotate = function (data) {
        var curAngle = 40 * data.slot - 20;//20是居中
        this.plate.rotation = 0;
        Tween.to(this.plate, { rotation: -curAngle + 360 * 10 }, 3000, Laya.Ease.circOut, Handler.create(this, function () {
            config.isTurn = false;
            //加金币
            this.gold.setGold(this.gold.value + data.coin);
            if(data.energy) {
                this.energy.setEnergy(this.energy.value + 1);//能量补一
            }
            this.restoreBtn();
        }), 0, false, true);
    };
    //设置富豪信息
    _proto.setRichman = function (richman) {
        if (!richman) return;
        var headImg = new Sprite(),
            mask = new Sprite(),
            name = new Text(),
            gold = new Text();
        mask.graphics.drawCircle(50, 50, 25, '#fff');
        mask.pivot(25, 25);
        headImg.loadImage(richman.headimg, 0, 0, 50, 50);
        headImg.mask = mask;
        name.text = richman.nickName;
        name.color = '#274138';
        name.fontSize = 22;
        name.width = 70;
        name.height = 25;
        name.align = 'center';
        name.valign = 'middle';
        name.pos(60, -5);
        gold.text = commonMethods.numberFormatWith(richman.coin);
        gold.color = '#E86340';
        gold.fontSize = 20;
        gold.width = 76;
        gold.height = 22;
        gold.align = 'center';
        gold.valign = 'middle';
        gold.pos(58, 20);
        this.richman.addChild(headImg);
        this.richman.addChild(name);
        this.richman.addChild(gold);
        this.richman.pos(226, 216);
    }
})();
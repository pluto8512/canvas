(function (doc, win) {
	var docEl = doc.documentElement,
	resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
			recalc = function () {
		var clientWidth = docEl.clientWidth;
		if (!clientWidth) return;
		if(clientWidth > 800) clientWidth=800;
		docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
	};
	
	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	recalc();
})(document, window);

;(function(){
    var globalState;//1=>横向滑动,2=>暂停横向滑动，手臂下放
    var GAME_WIDTH = 550;
	var GAME_HEIGHT = 670;
    var backLayer,loadingLayer,stageLayer;
    var imglist = {};   //为读取图片做准备
    var armO,
    wawaPosiCache,
    wawaObjCache = [],
    STAGE_STEP = 1,
    flag = true,    //true为向右滑动
    disabled = false;    //禁止按钮点击
    var startConfig ={ 
        canvasId : "jiawawa_game" 
    };
    var imgData = new Array({
        name: "bg2",
        path: "./images/bg2.png"
    }, {
        name: "jiazi",
        path: "./images/jiazi.png"
    }, {
        name: "wa1",
        path: "./images/wa1.png"
    }, {
        name: "wa2",
        path: "./images/wa2.png"
    }, {
        name: "wa3",
        path: "./images/wa3.png"
    }, {
        name: "wa4",
        path: "./images/wa4.png"
    }, {
        name: "scale",
        path: "./images/scale.png"
    });

    init(10, startConfig.canvasId , GAME_WIDTH, GAME_HEIGHT, startGame);

    function startGame(){
		backLayer = new LSprite();
        //在背景精灵上绘制黑色背景
        backLayer.graphics.drawRect(1, "#000000", [0, 0, GAME_WIDTH, GAME_HEIGHT], true, "#000000");
        addChild(backLayer);

        //利用LLoadManage读取图片，并显示进度条,执行gameInit
        loadingLayer = new LoadingSample5(12);
        backLayer.addChild(loadingLayer);
        LLoadManage.load(
            imgData,
            function(progress) {
                loadingLayer.setProgress(progress);
            },
            gameInit
        );  
	}

    function gameInit(result) {
        //取得图片读取结果
        imglist = result;
        //移除进度条
        backLayer.removeAllChild(loadingLayer);
        loadingLayer = null;
        //游戏主进程开始
        main();
    }

    function main() {
        //格式化背景层
        backLayer.die();
        backLayer.removeAllChild();
        //加载游戏背景实例
        bgo = new Background(); 
        backLayer.addChild(bgo);
        //舞台初始化
        stageInit();   
        // 添加娃娃实例
        addWawa();
        armO = new Arm(); //手臂
        // armO.graphics.drawRect(2, "#ff0000", [armO.x-14, armO.y, armO.getWidth(), armO.getHeight()], true, "#880088");
        stageLayer.addChild(armO);
        globalState = 1;
        //动画
        backLayer.addEventListener(LEvent.ENTER_FRAME, onframe);
    }

    function stageInit() {
        stageLayer = new LSprite();
        backLayer.addChild(stageLayer);
    }

    function onframe() {
        if(globalState===1){
            //手臂摆动
            armO.run();
        } else if(globalState===2){
            //手臂下放
            var result = armO.check();
            armO.change(result);
        } else if (globalState===3){
            //夹子收拢
            armO.furl();
        } else if(globalState===4){
            //手臂收起
            armO.recover();
        } else if (globalState===5){
            //夹子松开
            armO.loosen();
        }
        
        

    }

    function Background() {
        base(this, LSprite, []);
        var self = this;
        self.bitmapData = new LBitmapData(imglist["bg2"],0,0,GAME_WIDTH,GAME_HEIGHT);
        self.bitmap = new LBitmap(self.bitmapData);
        self.addChild(self.bitmap);
    }
    function Arm() {
        base(this, LSprite, []);
        var self = this;
        self.swipOff = false;
        self.bitmap_top = new LBitmapData(imglist["jiazi"],13,35,94,21);
        self.repeate = new LBitmapData(imglist["scale"],0,0,34,10);
        self.bitmap_middle_bottom = new LBitmapData(imglist["scale"],48,0,47,30);
        self.bitmap_jiaziL = new LBitmapData(imglist["jiazi"],124,4,40,66);
        self.bitmap_jiaziR = new LBitmapData(imglist["jiazi"],201,4,41,66);

        self.bitmap_top = new LBitmap(self.bitmap_top);
        self.bitmap_top.x=-4.8;
        self.bitmap_top.y=48;

        self.repeate = new LBitmap( self.repeate);
        self.repeate.x=  self.bitmap_top.width/2- self.repeate.width/2;
        self.repeate.y= 68;
        self.repeate.scaleY =10;

        self.bitmap_middle_bottom = new LBitmap( self.bitmap_middle_bottom);
        self.bitmap_middle_bottom.x=  self.bitmap_top.width/2- self.bitmap_middle_bottom.width/2-6.5;
        self.bitmap_middle_bottom.y=  self.repeate.y+ self.repeate.getHeight()-10;

        self.bitmap_jiaziL = new LBitmap(self.bitmap_jiaziL);
        self.sprite = new LSprite();
        self.sprite.addChild(self.bitmap_jiaziL);
        self.sprite.rotatex = 40;
        self.sprite.rotatey = 0;
        self.sprite.graphics.drawArc(1,"#880088",[self.sprite.rotatex,self.sprite.rotatey,4,0,Math.PI*2],true); 
        self.sprite.graphics.drawArc(1,"#880088",[32,66,4,0,Math.PI*2],true);   
        self.sprite.x = self.bitmap_top.width/2- self.repeate.width/2- self.bitmap_jiaziL.width-6;
        self.sprite.y =  self.repeate.y+ self.repeate.getHeight()+self.bitmap_middle_bottom.getHeight()-16;
        self.sprite.rotate = 38;

        self.bitmap_jiaziR = new LBitmap(self.bitmap_jiaziR);
        self.sprite2 = new LSprite();
        self.sprite2.addChild(self.bitmap_jiaziR);
        self.sprite2.rotatex = 0;
        self.sprite2.rotatey = 0;
        self.sprite2.graphics.drawArc(1,"#880088",[self.sprite2.rotatex,self.sprite2.rotatey,4,0,Math.PI*2],true);   
        self.sprite2.graphics.drawArc(1,"#880088",[8,66,4,0,Math.PI*2],true); 
        self.sprite2.x =  self.repeate.width+ self.repeate.x-14;
        self.sprite2.y =  self.repeate.y+ self.repeate.getHeight()+self.bitmap_middle_bottom.getHeight()-16;
        self.sprite2.rotate = -38;

        self.addChild(self.bitmap_top);
        self.addChild(self.repeate);
        self.addChild(self.bitmap_middle_bottom);
        self.addChild(self.sprite);
        self.addChild(self.sprite2);
    }
    // STAGE_STEP步距
    Arm.prototype.run = function() {
        disabled = false;
        var self = this;
        if(self.swipOff){
            return false;
        }
        if(self.x==550-94-10){
            flag = false;
        }
        if(self.x==0+30){
            flag = true;
        }
        if(flag){
            self.x += STAGE_STEP;           
        }else{
            self.x -= STAGE_STEP;
        }
    }
    Arm.prototype.stop = function() {
        var self = this
        // self.swipOff = !self.swipOff;
    }
    Arm.prototype.check = function() {
        var self = this;
        disabled = true;
        for(var i=0;i<wawaPosiCache.length;i++){
            var wawaPosi = wawaPosiCache[i];
            if((self.x-16)<=wawaPosi.x && ((self.x-10)+self.getWidth())>=wawaPosi.x+98){
                return i+1;//0~6=>1~7
            }
        }
        return false;
    }
    var currWawaObj;
    Arm.prototype.change = function(result) {
        var self = this;
        var status;
        if(!!result){
            currWawaObj = wawaObjCache[result-1];
            currWawaObj.index = result-1;
        }
        if(result&&1<=result&&result<=3){
			self.repeate.scaleY = self.repeate.scaleY+0.5;
            self.bitmap_middle_bottom.y=  self.repeate.y+ self.repeate.getHeight()-10;
            self.sprite.y =  self.repeate.y+ self.repeate.getHeight()+self.bitmap_middle_bottom.getHeight()-16;
            self.sprite2.y = self.repeate.y+ self.repeate.getHeight()+self.bitmap_middle_bottom.getHeight()-16;
            status = 1;
        }else if(result&&4<=result&&result<=7){
            self.repeate.scaleY =  self.repeate.scaleY+0.5;
            self.bitmap_middle_bottom.y=  self.repeate.y+ self.repeate.getHeight()-10;
            self.sprite.y =  self.repeate.y+ self.repeate.getHeight()+self.bitmap_middle_bottom.getHeight()-16;
            self.sprite2.y = self.repeate.y+ self.repeate.getHeight()+self.bitmap_middle_bottom.getHeight()-16;
            status = 2;
        }else {
            self.repeate.scaleY =  self.repeate.scaleY+0.5;
            self.bitmap_middle_bottom.y=  self.repeate.y+ self.repeate.getHeight()-10;
            self.sprite.y =  self.repeate.y+ self.repeate.getHeight()+self.bitmap_middle_bottom.getHeight()-16;
            self.sprite2.y = self.repeate.y+ self.repeate.getHeight()+self.bitmap_middle_bottom.getHeight()-16;
            status = 3;
        }
        if(status===1&&parseInt(self.repeate.scaleY)==25){
            globalState=3;
        }else if(status===2&&parseInt(self.repeate.scaleY)==40){
            globalState=3;
        }else if (status===3&&parseInt(self.repeate.scaleY)==40) {
            globalState=3;
        }
    }
    Arm.prototype.recover = function() {
        var self = this;
        self.repeate.scaleY =  self.repeate.scaleY-0.3;
        self.bitmap_middle_bottom.y=  self.repeate.y+ self.repeate.getHeight()-10;
        self.sprite.y =  self.repeate.y+ self.repeate.getHeight()+self.bitmap_middle_bottom.getHeight()-16;
        self.sprite2.y = self.repeate.y+ self.repeate.getHeight()+self.bitmap_middle_bottom.getHeight()-16;
        if(!!currWawaObj){
             currWawaObj.y = self.repeate.y+ self.repeate.getHeight()+self.bitmap_middle_bottom.getHeight()-16;
        }
        if(parseInt(self.repeate.scaleY) == 10){
            globalState=5;
        }
    }
    Arm.prototype.furl = function() {
        var self = this;
        self.sprite.rotate = 30;
        self.sprite2.rotate = -30;
        globalState=4;
    }
    Arm.prototype.loosen = function() {
        var self = this;
        self.sprite.rotate = 38;
        self.sprite2.rotate = -38;
        if(!!currWawaObj){
            currWawaObj.die();
            currWawaObj.removeAllChild();
            //娃娃的重生
            var x = wawaPosiCache[currWawaObj.index].x;
            var y = wawaPosiCache[currWawaObj.index].y;
            var defaultArr = [{x,y}];
            addWawa(true,defaultArr,currWawaObj.index,currWawaObj.name);
            currWawaObj.remove();
            currWawaObj=null;
        }
        globalState=1;
    }
    $(".button").on("touchend",function(){
        if(disabled) {
            return false;
        }
        armO.stop();
        // var result = armO.check();
        // armO.change(result);
        globalState=2;
    });
    // wawa父类
    function Wawa() {
        base(this, LSprite, []);//继承LSprite
        var self = this;
        self.setView();//子类都会调用
    }
    //self.feature的1为笑娃娃，2为哭娃娃
    function Wawa01() {
        base(this, Wawa, []);
        var self = this;
        self.feature=1;
        self.name = 1;
    }
    function Wawa02() {
        base(this, Wawa, []);
        var self = this;
        self.feature=1;
        self.name = 2;
    }
    function Wawa03() {
        base(this, Wawa, []);
        var self = this;
        self.feature=2;
        self.name = 3;
    }
    function Wawa04() {
        base(this, Wawa, []);
        var self = this;
        self.feature=1;
        self.name = 4;
    }
    Wawa01.prototype.setView = function() {
        var self = this;
        self.bitmap = new LBitmap(new LBitmapData(imglist["wa1"]),0,0,98,107);
        self.addChild(self.bitmap);
    }
    Wawa02.prototype.setView = function() {
        var self = this;
        self.bitmap = new LBitmap(new LBitmapData(imglist["wa2"]),0,0,98,107);
        self.addChild(self.bitmap);
    }
    Wawa03.prototype.setView = function() {
        var self = this;
        self.bitmap = new LBitmap(new LBitmapData(imglist["wa3"]),0,0,98,107);
        self.addChild(self.bitmap);
    }
    Wawa04.prototype.setView = function() {
        var self = this;
        self.bitmap = new LBitmap(new LBitmapData(imglist["wa4"]),0,0,98,107);
        self.addChild(self.bitmap);
    }
    //初始化娃娃,
    function addWawa(flag,defaultArr,index,name) {
        var mstage;
        wawaPosiCache = [{y:348,x:100},{y:348,x:250},{y:348,x:400},{y:490,x:40},{y:490,x:170},{y:490,x:300},{y:490,x:430}];// 默认位置
        if(!!flag){
            var random =  Math.floor(Math.random()*4+1);
            if((random)===name && random<4){
                random = random+1;
            }else if((random)===name && random===4){
                random = Math.floor(Math.random()*3+1);
            }
            
            switch(random) {
                case 1:
                    mstage = new Wawa01();
                break;
                case 2:
                    mstage = new Wawa02();
                break;
                case 3:
                    mstage = new Wawa03();
                break;
                case 4:
                    mstage = new Wawa04();
                break;
                default:
                
            }
            mstage.x = defaultArr[0].x;
            mstage.y = defaultArr[0].y;
            wawaObjCache[index]=mstage;
            stageLayer.addChild(mstage);

            var topPosition = stageLayer.numChildren-1;
            stageLayer.setChildIndex(stageLayer.getChildAt(stageLayer.numChildren-1), index);
        }else{
            var arr = [1,2,3,4,1,2,3,4]; //重拍
            var random = arr.sort(function(){   
                return Math.random() > 0.5;
            });
            for(var i=0;i<7;i++){
                
                switch(random[i]) {
                case 1:
                    mstage = new Wawa01();
                break;
                case 2:
                    mstage = new Wawa02();
                break;
                case 3:
                    mstage = new Wawa03();
                break;
                case 4:
                    mstage = new Wawa04();
                break;
                default:
                
                }
                mstage.x = wawaPosiCache[i].x;
                mstage.y = wawaPosiCache[i].y;
                console.log(mstage.feature);
                wawaObjCache.push(mstage);
                stageLayer.addChild(mstage);
            }
        }
        
    }
})();
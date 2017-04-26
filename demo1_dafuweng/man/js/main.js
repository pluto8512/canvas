//声明变量
//游戏精灵，进度条精灵，背景精灵，障碍精灵，步距，舞台速度
var backLayer, loadingLayer, background, stageLayer;
var STAGE_STEP = 1;
var stageSpeed = 0;
//为读取图片做准备
var imglist = {};
var imgData = new Array({
    name: "back",
    path: "../images/back.png"
}, {
    name: "floor0",
    path: "../images/floor0.png"
}, {
    name: "hero",
    path: "../images/hero.png"
});

function main() {
    //  设置全屏,适配手机端
    LGlobal.align = LStageAlign.TOP_MIDDLE;
    LGlobal.stageScale = LStageScaleMode.NO_BORDER;
    LSystem.screen(LStage.FULL_SCREEN);
    //游戏主层初始化
    backLayer = new LSprite();
    //在背景精灵上绘制黑色背景
    backLayer.graphics.drawRect(1, "#000000", [0, 0, 320, 1200], true, "#000000");
    addChild(backLayer);

    //召唤进度精灵,50是显示文字的大小
    loadingLayer = new LoadingSample2(50);
    backLayer.addChild(loadingLayer);
    //利用LLoadManage读取图片，并显示进度条,执行gameInit
    LLoadManage.load(
        imgData,
        function(progress) {
            loadingLayer.setProgress(progress);
        },
        gameInit
    );
}
//读取完所有图片，进行游戏标题画面的初始化工作
function gameInit(result) {
    // 取得图片读取结果
    imglist = result;
    // 移除进度条jl
    backLayer.removeAllChild(loadingLayer);
    loadingLayer = null;
    //显示游戏标题
    var title = new LTextField();
    title.y = 100;
    title.size = 30;
    title.color = "#ffffff";
    title.text = "是男人就下100层";
    title.x = (LGlobal.width - title.getWidth()) / 2; //屏幕宽度减去文本宽度除以2就是让文本居中的位置
    backLayer.addChild(title);
    //显示说明文
    backLayer.graphics.drawRect(1, "#ffffff", [50, 240, 220, 40]);
    var txtClick = new LTextField();
    txtClick.size = 18;
    txtClick.color = "#ffffff";
    txtClick.text = "点击页面开始游戏";
    txtClick.x = (LGlobal.width - txtClick.getWidth()) / 2;
    txtClick.y = 245;
    backLayer.addChild(txtClick);
    //游戏开始
    backLayer.addEventListener(LMouseEvent.MOUSE_UP, function() {
        gameStart(false);
    });
}
//游戏界面初始化
function gameStart(restart) {
    // 背景层清空
    backLayer.die(); //移除所有的监听
    backLayer.removeAllChild(); //移除上面所有的子精灵

    // 加载游戏背景实例
    background = new Background();
    backLayer.addChild(background);

    // 舞台精灵的初始化
    stageInit();

    backLayer.addEventListener(LEvent.ENTER_FRAME, onframe); //添加动画
}

// 动画函数
// 循环了所有的地板，并进行判断处理
function onframe() {
    background.run();
    if (stageSpeed-- < 0) {
        stageSpeed = 100;
        // 每相隔100就添加一个地板实例
        addStage();
    }
    var key = null,found = false;//found看主角是否已经落到了地板上
    hero.isJump = true;//设置主角为跳跃状态
    for (key in stageLayer.childList) {//childList里面存的是地板
        var _child = stageLayer.childList[key];//取出所有的地板实例
        // 如果地板实例在屏幕外就移除
        if(_child.y < -_child.getHeight()){
            stageLayer.removeChild(_child);
        }
        // 如果游戏主角没有落地
        if(!found && hero.x + 30 >= _child.x && hero.x <= _child.x + 90 && 
		   hero.y + 50 >= _child.y+_child.hy && hero._charaOld + 50 <= _child.y+_child.hy+1){

        }
        _child.onframe();//地板实例调用动画
    }
}

// 台阶的初始化
function stageInit() {
    stageLayer = new LSprite();
    backLayer.addChild(stageLayer);
}
// 添加台阶
function addStage() {
    var mstage;
    mstage = new Floor01();
    mstage.y = 480;
    mstage.x = Math.random() * 280;
    stageLayer.addChild(mstage);
}
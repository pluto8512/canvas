/*
 * 全局配置参数
 */
var config = {
	bgUrl: resDomain + '/bg.jpg',
	plateUrl: resDomain + '/sprite_turntable.png',
	islandUrl: resDomain + '/sprite_island.png',
	smallHmUrl: resDomain + '/smallhm.png',
	warJsonUrl: resDomain + '/war.json',
	energyBtnUrl: resDomain + '/btn_energy.png',
	awardBtnUrl: resDomain + '/btn_award.png',
	cheatsBtnUrl: resDomain + '/btn_cheats.png',
	enterMapUrl: resDomain + '/btn_enterMap.png',
	backMapUrl: resDomain + '/btn_backMap.png',
	islandMapUrl: resDomain + '/islandMap.png',
	posInfos: {
		bg: { startX: 61, startY: 258, width: 518, height: 518, spriteX: 502, spriteY: 290 },
		plate: { startX: 87, startY: 285, width: 464, height: 464, spriteX: 18, spriteY: 316 },
		castle: { startX: 100, startY: 65, width: 440, height: 251, spriteX: 26, spriteY: 6 },
		pointer: { startX: 248, startY: 410, width: 140, height: 180, spriteX: 1419, spriteY: 79 },
		symbol: { startX: 299, startY: 498, width: 40, height: 40, spriteX: 1613, spriteY: 173 },
		turnOpenBtn: { startX: 181, startY: 804, width: 278, height: 198, spriteX: 1044, spriteY: 487 },
		turnCloseBtn: { startX: 181, startY: 804, width: 278, height: 198, spriteX: 1367, spriteY: 487 },
		energyBtn: {startX: 542, startY: 100, width: 91, height: 91},
		awardBtn: {startX: 542, startY: 197, width: 91, height: 91},
		cheatsBtn: {startX: 542, startY: 293, width: 91, height: 91},
		enterMapBtn: {startX: 0, startY: 822, width: 122, height: 127},
		backMapBtn: {startX: 515, startY: 822, width: 126, height: 126},
	},
	isSwitch: false,//画面是否在切换
	isTurn: false,//转盘是否在转
	isModalShow: false,//模态框是否显示
	isMapShow: false,//地图是否显示
	islandInfos: {
		"tower": {
			"1": { "x": 5, "y": 1042, "w": 198, "h": 196, "c1": 15, "c2": 10, "money":500 },
			"2": { "x": 216, "y": 980, "w": 222, "h": 258, "c1": 15, "c2": 10, "money":1000 },
			"3": { "x": 452, "y": 946, "w": 222, "h": 292, "c1": 15, "c2": 10, "money":1250 },
			"4": { "x": 688, "y": 925, "w": 241, "h": 313, "c1": 0, "c2": 32, "money":1550 },
			"5": { "x": 943, "y": 925, "w": 267, "h": 313, "c1": 0, "c2": 32, "money":1990 }
		},
		"aeroboat": {
			"1": { "x": 3, "y": 758, "w": 128, "h": 142, "c1": -100, "c2": -12, "money":900 },
			"2": { "x": 141, "y": 733, "w": 151, "h": 167, "c1": -120, "c2": -15, "money":1350 },
			"3": { "x": 312, "y": 714, "w": 175, "h": 184, "c1": 0, "c2": -15, "money":1750 },
			"4": { "x": 515, "y": 716, "w": 195, "h": 184, "c1": 0, "c2": -15, "money":1900 },
			"5": { "x": 736, "y": 696, "w": 205, "h": 204, "c1": 0, "c2": -15, "money":2800 }
		},
		"mountain": {
			"1": { "x": 10, "y": 64, "w": 114, "h": 120, "c1": 0, "c2": 40, "money":1400 },
			"2": { "x": 137, "y": 61, "w": 250, "h": 123, "c1": 0, "c2": 45, "money":1700 },
			"3": { "x": 398, "y": 45, "w": 264, "h": 139, "c1": 0, "c2": 68, "money":2050 },
			"4": { "x": 681, "y": 15, "w": 262, "h": 169, "c1": 0, "c2": 70, "money":3150 },
			"5": { "x": 962, "y": 12, "w": 310, "h": 172, "c1": 0, "c2": 78, "money":3900 }
		},
		"statue": {
			"1": { "x": 5, "y": 257, "w": 62, "h": 159, "c1": 20, "c2": 62, "money":2900 },
			"2": { "x": 91, "y": 257, "w": 61, "h": 159, "c1": 20, "c2": 62, "money":3100 },
			"3": { "x": 177, "y": 241, "w": 67, "h": 175, "c1": 16, "c2": 45, "money":3750 },
			"4": { "x": 262, "y": 241, "w": 65, "h": 175, "c1": 16, "c2": 45, "money":4950 },
			"5": { "x": 347, "y": 242, "w": 95, "h": 174, "c1": -6, "c2": 45, "money":5510 }
		},
		"angel": {
			"1": { "x": 15, "y": 538, "w": 165, "h": 135, "c1": 445.5, "c2": 155.5, "money":4900 },
			"2": { "x": 189, "y": 529, "w": 160, "h": 144, "c1": 450, "c2": 155.5, "money":5500 },
			"3": { "x": 356, "y": 519, "w": 151, "h": 154, "c1": 450, "c2": 155.5, "money":6550 },
			"4": { "x": 515, "y": 519, "w": 150, "h": 154, "c1": 450, "c2": 155.5, "money":7900 },
			"5": { "x": 674, "y": 502, "w": 180, "h": 171, "c1": 450, "c2": 155.5, "money":8100 }
		},
		"hammer": {
			"1": { "x": 1036, "y": 714, "w": 149, "h": 168 }
		},
		"base": {
			"1": { "x": 1240, "y": 724, "w": 148, "h": 148 }
		},
		"ball": {
			"1": { "x": 866, "y": 190, "w": 548, "y": 305 }
		},
		"smoke": {
			"1": { "x": 0, "y": 0, "w": 184, "h": 168 }
		}
	}
};

/*
 * LayaBox相关
 */
var Sprite = Laya.Sprite;
var Handler = Laya.Handler;
var Event = Laya.Event;
var Tween = Laya.Tween;
var Texture = Laya.Texture;
var Browser = Laya.Browser;
var TimeLine = Laya.TimeLine;
var Text = Laya.Text;

/*
 * 通用方法
 */
var commonMethods = {
	/**
	 * 绘制纹理对象
	 */
	drawContent: function (caller, sprite, url, posInfo) {
		var texture = Laya.Texture.create(url, posInfo.spriteX, posInfo.spriteY, posInfo.width, posInfo.height);
		sprite.autoSize = true;
		sprite.graphics.drawTexture(texture, 0, 0, posInfo.width, posInfo.height);//画背景
		sprite.pos(posInfo.startX + posInfo.width / 2, posInfo.startY + posInfo.height / 2);
		sprite.pivot(posInfo.width / 2, posInfo.height / 2);
		caller.addChild(sprite);
	},
	//数字表示格式转化，如50000->50,000
	numberFormatWith: function (num) {
		var remainer,//余数
			newNum = "",
			length;
		num = typeof num === 'string' ? num : num.toString();
		length = num.length;
		remainer = length % 3;
		for (var i = 0; i < length; i++) {
			newNum += num[i];
			if (i === length - 1) {
				break;
			} else if (i + 1 === remainer || (i + 1 - remainer) % 3 === 0) {
				newNum += ',';
			}
		}
		return newNum;
	},
    addMask:function(type){
        switch (type) {
            case 1:
                var html =
                '<div class="modalBox_mask"></div>'
                $("body").append(html);
                break;
            case 2:
                var html =
                '<div class="modalBox_mask">\
                    <span class="head">\
                        <p class="p_center p_title">能量不足</p>\
                    </span>\
                </div>';
                $("body").append(html);
                break;
            default:
                break;
        }
    },
    addPop:function(type,able){
        switch (type) {
            case "SMB_001":
                commonMethods.addMask(1);
                var html =
                '<div class="SMB" id="SMB_001">\
                    <div class="SMB_content1">\
                        <div class="box_text">\
                            <p class="p_center">阿欧~金币不足</p>\
                            <p class="p_center">转动转盘可获得大量金币</p>\
                            <p class="p_center">是时候去赚点钱啦!</p>\
                        </div>\
                    </div>\
                    <div class="SMB_btn SMB_btn1"></div>\
                </div>';
                $(".modalBox_mask").append(html);
                break;
            case "SMB_002":
                commonMethods.addMask(1);
                var html =
                '<div class="SMB" id="SMB_002">\
		            <div class="SMB_title SMB_title1 "></div>\
		            <div class="SMB_content2"></div>\
		            <div class="SMB_btn SMB_btn2"></div>\
                </div>';
                $(".modalBox_mask").append(html);
                break;
            case "SMB_003":
                commonMethods.addMask(1);
                var html =
                '<div class="SMB" id="SMB_003">\
                    <div class="SMB_title SMB_title2 "></div>\
                    <div class="SMB_content3">\
                        <div class="redBag"></div>\
                        <div class="box_text">\
                            <p class="p_center">红包已经发放成功,记得查看微信哦</p>\
                        </div>\
                    </div>\
                    <div class="SMB_btn SMB_btn3"></div>\
                </div>';
                $(".modalBox_mask").append(html);
                break;

            case "BMB_001":
                commonMethods.addMask(1);
                var html =
                '<div class="BMB" id="BMB_001">\
                    <span class="BMB_icon BMB_icon1"></span>\
                    <span class="BMB_title BMB_title1"></span>\
                    <span class="close"></span>\
                    <span class="BMB_content1"></span>\
                    <div class="box_text">\
                        <p class="p_center">欢迎回家，主人又是元气满满的一天哦~</p>\
                        <p class="p_center">为了早日建完岛屿，领取大奖</p>\
                        <p class="p_center">特地为你准备了<span class="mark">30点能量</span></p>\
                    </div>\
                    <span class="BMB_subhead BMB_subhead1"></span>\
                    <div class="BMB_btn BMB_btn1"></div>\
                </div>';
                $(".modalBox_mask").append(html);
                break;
            case "BMB_002":
                if(able){
                    var btnType = "BMB_btn2";
                    commonMethods.addMask(2);
                }else {
                    var btnType = "BMB_btn2_disable";
                    commonMethods.addMask(1);
                }
                var html =
                '<div class="BMB" id="BMB_002">\
                    <span class="BMB_icon BMB_icon2"></span>\
                    <span class="BMB_title BMB_title3"></span>\
                    <span class="close"></span>\
                    <div class="BMB_content2_1">\
                        <ul>\
                            <li class="li_text">早上08:00-10:00&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="icon"></span><i>X3</i><span class="btn fr"></span></li>\
                            <li class="li_text">中午12:00-14:00&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="icon"></span><i>X3</i><span class="btn fr"></span></li>\
                            <li class="li_text">晚上17:00-19:00&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="icon"></span><i>X3</i><span class="btn fr"></span></li>\
                        </ul>\
                    </div>\
                    <div class="wrap_gameRule">\
                        <p class="small_text">【游戏规则】每人可领取3次免费能量，错过领取时间能量作废。</p>\
                    </div>\
                    <span class="BMB_subhead BMB_subhead2" style="top:2.76rem"></span>\
                    <div class="BMB_btn '+btnType+'">\
                        <span class="BMB_content2_5"></span>\
                    </div>\
                    <div class="wrap_shareRule">\
                        <p class="small_text">【分享规则】分享成功即刻领取能量每人限领取一次。</p>\
                    </div>\
                </div>';
                $(".modalBox_mask").append(html);
                break;
            case "BMB_0030":
                commonMethods.addMask(1);
                var html =
                '<div class="BMB" id="BMB_0030">\
                    <span class="BMB_icon BMB_icon1"></span>\
                    <span class="BMB_title BMB_title3"></span>\
                    <span class="close"></span>\
                    <div class="BMB_subhead BMB_subhead4"></div>\
                    <div class="BMB_content3_1">\
                        <div class="box_text">\
                            <p class="p_center">【领奖规则】<span class="mark">在2017年7月1日~9月1日</span></p>\
                            <p class="p_center">完成岛屿建设即可领奖，数量有限，先到先得</p>\
                        </div>\
                    </div>\
                    <div class="BMB_content3_2">\
                        <span class="img"></span>\
                        <div class="wrap_text fr">\
                            <p class="p_center">现金红包￥100元</p>\
                            <p class="p_center">奖品剩余: <span class="mark">68份</span></p>\
                            <p class="p_center">已有2718人领取</p>\
                        </div>\
                    </div>\
                    <div class="BMB_content3_3">\
                        <div class="progress"></div>\
                        <p class="p_center">建岛进度:4/25</p>\
                    </div>\
                    <div class="BMB_btn BMB_btn3"></div>\
                </div>';
                $(".modalBox_mask").append(html);
                break;
            case "BMB_0031":
                commonMethods.addMask(1);
                var html =
                '<div class="BMB " id="BMB_0031">\
                    <span class="BMB_icon BMB_icon1"></span>\
                    <span class="BMB_title BMB_title3"></span>\
                    <span class="close"></span>\
                    <div class="BMB_subhead BMB_subhead3"></div>\
                    <div class="BMB_content3_2">\
                        <span class="img"></span>\
                        <div class="wrap_text fr">\
                            <p class="p_center">现金红包￥100元</p>\
                            <p class="p_center">奖品剩余: <span class="mark">68份</span></p>\
                            <p class="p_center">已有2718人领取</p>\
                        </div>\
                    </div>\
                    <div class="BMB_content3_3">\
                        <div class="progress"></div>\
                        <p class="p_center">建岛进度:4/25</p>\
                    </div>\
                    <div class="BMB_btn BMB_btn1"></div>\
                </div>';
                $(".modalBox_mask").append(html);
                break;
            case "BMB_004":
                commonMethods.addMask(1);
                var html =
                '<div class="BMB" id="BMB_004">\
                    <span class="BMB_icon BMB_icon3"></span>\
                    <span class="BMB_title BMB_title2"></span>\
                    <span class="close"></span>\
                    <div class="wrap_text">\
                        <p class="p_center align_l">【游戏玩法】</p>\
                        <p class="p_center align_l">转动转盘获得金币，金币购买建岛建筑<br>升级岛屿。岛屿建设完后可获得奖励。</p>\
                    </div>\
                    <div class="wrap_text2">\
                        <p class="p_center align_l">【领奖规则】</p>\
                        <p class="p_center align_l">转动转盘获得金币，金币购买建岛建筑<br>升级岛屿。岛屿建设完后可获得奖励。</p>\
                    </div>\
                </div>';
                $(".modalBox_mask").append(html);
                break;
            case "BMB_005":
                commonMethods.addMask(1);
                var html =
                '<div class="BMB" id="BMB_005">\
                    <span class="BMB_icon BMB_icon1"></span>\
                    <span class="BMB_title BMB_title3"></span>\
                    <span class="close"></span>\
                    <div class="BMB_subhead BMB_subhead5"></div>\
                    <div class="BMB_content3_2">\
                        <span class="img"></span>\
                        <div class="wrap_text fr">\
                            <p class="p_center">现金红包￥100元</p>\
                            <p class="p_center">【奖品详情】</span></p>\
                            <p class="p_center">建设完岛屿即可领取100元,<br>奖品已经放在你的微信钱包<br>中。</p>\
                        </div>\
                    </div>\
                    <div class="BMB_content3_3">\
                        <div class="progress"></div>\
                        <p class="p_center">建岛进度:25/25</p>\
                    </div>\
                    <div class="BMB_btn BMB_btn4"></div>\
                </div>';
                $(".modalBox_mask").append(html);
                break;
            case "BMB_006":
                commonMethods.addMask(1);
                var html =
                '<div class="BMB" id="BMB_006">\
                    <span class="BMB_icon BMB_icon1"></span>\
                    <span class="BMB_title BMB_title3"></span>\
                    <span class="close"></span>\
                    <div class="wrap_text2 fr">\
                        <p class="p_center">双子岛奖品已领完，每建完一座岛</p>\
                        <p class="p_center">即可前往下一座岛，同时领取相应的奖励</p>\
                        <p class="p_center mark">白羊岛即将开放,敬请期待</p>\
                    </div>\
                    <div class="BMB_content3_2">\
                        <span class="img"></span>\
                        <div class="wrap_text fr">\
                            <p class="p_center">现金红包￥100元</p>\
                            <p class="p_center">奖品剩余: <span class="mark">68份</span></p>\
                            <p class="p_center">已有2718人领取</p>\
                        </div>\
                    </div>\
                    <div class="BMB_content3_3">\
                        <div class="progress"></div>\
                        <p class="p_center">建岛进度:4/25</p>\
                    </div>\
                    <div class="BMB_btn BMB_btn4"></div>\
                </div>';
                $(".modalBox_mask").append(html);
                break;
            default:
                break;
        }
    },
    toShare:function(){
        commonMethods.addMask(1);
        var html = 
        '<div class="toShare"></div>';
        $(".modalBox_mask").append(html);
    },
    closeEvent:function(){
        $(document).on("touchend",".modalBox_mask .close",function(){
            $(".modalBox_mask").remove();
        });
    }
};

/**
 * 模态框关闭事件
 */
commonMethods.closeEvent();

(function (doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function () {
			var clientWidth = docEl.clientWidth;
			if (!clientWidth) return;
			if (clientWidth > 800) clientWidth = 800;
			docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
		};

	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	recalc();
})(document, window);
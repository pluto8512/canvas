/*********************图片加载******************************/
FastClick.attach(document.body);
imgLoader(createImageArr(), function(percentage) {
    var percentT = percentage * 100;
    $('#loading p').html((parseInt(percentT)) + '%');
    if (percentage == 1) {
        $('#loading').hide();
        $(".page01").fadeIn(400);
    }
});
var $page01 = $(".page01");
var $popUp = $(".pop-up"), //弹窗页面
    $popUp02 = $popUp.find('.pop02'),
    $popUp03 = $popUp.find('.pop03'),
    $bestScore = $popUp.find('.pop04 .bestScore');
var $listPage = $(".listPage"); //排行榜页面
var $passPage = $(".passPage"), //往期查看页面
    $passPageUl = $passPage.find('.passList');
var $passLisePage = $(".passLisePage"), //往期好汉榜
    $passListGet = $passLisePage.find(".listView ul");
var $coverPage = $(".coverPage"); // 分享页面
var $layaContainer = $("#layaContainer"); //游戏页面
var $gamePage = $(".gamePage"); //游戏挂件页
var $wholeScore = $(".gamePage .playScore");
var $week = new Date().getDay();
var $Tip = $("#tip");
var keyClick = true;
var listLime = 7;
var listLimeSub = 8;
var codeTimeKey = true; //验证码重置按钮
var codeTime = 30;
var stepMax = 0; // 游戏单步最大时间
var stepMin = 0; // 游戏单步最小时间
var stepAverage = 0; //游戏平均时间
var GameStartTime = 0; //游戏开始时间
var tipShow = { //加载提示
    show: function(text, time) {
        if (time != undefined) {
            setTimeout(function() {
                $Tip.fadeOut(400);
            }, time)
        }
        $Tip.html(text);
        $Tip.fadeIn(400);
    },
    hide: function() {
        $Tip.fadeOut(400);
    }
};
(infoMessage.highestScore < 0) ? infoMessage.highestScore = 0: infoMessage.highestScore = infoMessage.highestScore;
(infoMessage.weekRanking < 0) ? infoMessage.weekRanking = 0: infoMessage.weekRanking = infoMessage.weekRanking;
$bestScore.html("最佳：" + infoMessage.highestScore + "分");
//是否进入周排行榜
(function() {
    if (infoMessage.lastWeekRanking <= 3 && infoMessage.isSubmitInfo == "false" && infoMessage.isNumber == "true" && infoMessage.inTimes <= 3) {
        if ($week == 1 || $week == 2 || $week == 3) {
            $popUp.show().find(".pop07").show().siblings("div").hide();
        }
    }
})()
//首页
$page01.find(".btn_tg").click(function() {
    $popUp.show().find(".pop01").show().siblings("div").hide();
}).end().find(".btn_hh").click(function() { //打开好汉榜
    gainListRand(0, 6, infoMessage.weekindex, function(data) {
        listLime = 7;
        listLimeSub = 8;
        if (data.model.userScort >= 0) {
            infoMessage.highestScore = data.model.userScore;
            infoMessage.weekRanking = data.model.userScort;
            $bestScore.html("最佳：" + infoMessage.highestScore + "分");
            initShare(data.model.userScore, data.model.userScort, data.model.userScort);
            $listPage.find('.myRand .randTip').html(data.model.userScort).end().find(".myRand .scoreLise").html(data.model.userScore + "分");
        }
        if (data.model.list != undefined && data.model.list.length > 0) $listPage.find(".listView ul").html("");
        $.each(data.model.list, function(i, data) {
            (data.headimg === null) ? data.headimg = infoMessage.resourceUrl + "/stickhero/image/noman.png": data.headimg;
            (data.nickname === null) ? data.nickname = "神秘用户": data.headimg;
            $listPage.find(".listView ul").append('<li>' + '<span class="randTip">' + (i + 1) + '</span>' + '<div class="imgStip"><img src="' + data.headimg + '" alt=""></div>' + '<p class="nickName">' + data.nickname + '</p>' + '<div class="scoreLise">' + data.score + '分</div></li>')
        });
    })
    $listPage.show();
}).end().find(".btn_visitor").click(function() { //游客点击
    saveButtonXCount(3);
    layaBoxBegin();
}).end().find(".btn_vip").click(function() {
    if (infoMessage.isNumber == "true") {
        saveButtonXCount(2);
        layaBoxBegin();
    } else {
        $popUp.show().find(".pop03").show().siblings("div").hide();
    }
});
//vip通道未绑定登陆
$popUp03.find(".btn_code").click(function() {
    var $tel = $popUp03.find("#tel").val().trim();
    var $code = $popUp03.find("#code").val().trim();
    if ($tel == "" || $code == "") {
        tipShow.show("请输入完整信息", 1000);
        return;
    }
    if (!(/^1[3|4|5|7|8]\d{9}$/.test($tel))) {
        tipShow.show("请输入正确手机号码", 1000);
        return;
    }
    if (!keyClick) {
        tipShow.show("正在提交", 1000);
        return;
    }
    keyClick = false;
    $.ajax({
        url: '/mobile/bindWeixin',
        type: "post",
        data: {
            "actName": infoMessage.actName,
            "openid": infoMessage.openid,
            "token": infoMessage.token,
            "area": infoMessage.area,
            "tel": $tel,
            "code": $code
        },
        dataType: "json",
        success: function(data) {
            keyClick = true;
            tipShow.show("提交成功", 1000);
            $popUp.addClass("zoomOut01");
            infoMessage.isNumber = "true";
            saveButtonXCount(2);
            layaBoxBegin();
        }
    });
});
$popUp03.find(".styleColor").click(function() {
    var $tel = $popUp03.find("#tel").val().trim();
    if (!(/^1[3|4|5|7|8]\d{9}$/.test($tel))) {
        tipShow.show("请输入正确手机号码", 1000);
        return;
    }
    if (!keyClick) {
        tipShow.show("正在提交", 1000);
        return;
    }
    if (!codeTimeKey) {
        tipShow.show(codeTime + "s后才能重新发送", 1000);
        return;
    }
    keyClick = false;
    $.ajax({
        url: '/mobile/getBindCode',
        type: "post",
        data: {
            "actName": infoMessage.actName,
            "openid": infoMessage.openid,
            "token": infoMessage.token,
            "area": infoMessage.area,
            "tel": $tel
        },
        dataType: "json",
        success: function(data) {
            keyClick = true;
            tipShow.show("验证码已发送", 1000);
            codeTimeKey = false;
            var Ditme = setInterval(function() {
                codeTime--;
                if (codeTime == 0) {
                    codeTimeKey = true;
                    codeTime = 30;
                    clearInterval(Ditme);
                }
            }, 1000)
        }
    });
});
$popUp.find(".pop013 .styleColor").click(function() {
    var $tel = $popUp.find(".pop013 #tel04").val().trim();
    if (!(/^1[3|4|5|7|8]\d{9}$/.test($tel))) {
        tipShow.show("请输入正确手机号码", 1000);
        return;
    }
    if (!keyClick) {
        tipShow.show("正在提交", 1000);
        return;
    }
    if (!codeTimeKey) {
        tipShow.show(codeTime + "s后才能重新发送", 1000);
        return;
    }
    keyClick = false;
    $.ajax({
        url: '/mobile/getBindCode',
        type: "post",
        data: {
            "actName": infoMessage.actName,
            "openid": infoMessage.openid,
            "token": infoMessage.token,
            "area": infoMessage.area,
            "tel": $tel
        },
        dataType: "json",
        success: function(data) {
            keyClick = true;
            tipShow.show("验证码已发送", 1000);
            codeTimeKey = false;
            var Ditme = setInterval(function() {
                codeTime--;
                if (codeTime == 0) {
                    codeTimeKey = true;
                    codeTime = 30;
                    clearInterval(Ditme);
                }
            }, 1000)
        }
    });
});
$listPage.find(".btn_home").click(function() {
    $listPage.addClass("zoomOut02");
}).end().find(".btn_pass").click(function() { //往期排行榜
    $.ajax({
        url: '/mobile/getWeekList',
        type: "post",
        data: {
            "actName": infoMessage.actName,
            "openid": infoMessage.openid,
            "token": infoMessage.token,
            "area": infoMessage.area
        },
        dataType: "json",
        success: function(data) {
            if (data.model.list != undefined && data.model.list.length > 0) $passPageUl.html("");
            $.each(data.model.list, function(i, data) {
                (data.rank.headimg == "") ? data.rank.headimg = infoMessage.resourceUrl + "/stickhero/image/noman.png": data.rank.headimg;
                (data.rank.nickname == "") ? data.rank.nickname = "神秘用户": data.rank.headimg;
                $passPageUl.append('<li>' + '<span class="plTime">' + data.weekStr + '</span>' + '<span class="plTip" data-list="' + data.weekIndex + '" data-time="' + data.weekStr + '" >好汉榜</span>' + '<div class="imgTip"><img src="' + data.rank.headimg + '" alt=""></div>' + '<div class="plNickName">' + data.rank.nickname + '</div></li>');
            });
        }
    });
    $passPage.show();
}).end().find(".btn_yue").click(function() {
    $coverPage.show();
}).end().find(".btn_lw").click(function() { //打开奖品列表
    openLuck();
}).end().find(".btn_play0").click(function() {
    $listPage.hide();
    layaBoxBegin();
});
$("body").on("click", ".plTip", function() {
    var thisList = $(this).attr("data-list");
    $passLisePage.find(".titleTip").html($(this).attr("data-time") + "好汉榜");
    gainListRand(0, 100, thisList, function(data) {
        if (data.model.userScort >= 0) {
            $passLisePage.find('.myRand .randTip').html(data.model.userScort).end().find(".myRand .scoreLise").html(data.model.userScore + "分");
        }
        if (data.model.list != undefined && data.model.list.length > 0) $passListGet.html("");
        $.each(data.model.list, function(i, data) {
            (data.headimg === null) ? data.headimg = infoMessage.resourceUrl + "/stickhero/image/noman.png": data.headimg;
            (data.nickname === null) ? data.nickname = "神秘用户": data.headimg;
            $passListGet.append('<li>' + '<span class="randTip">' + (i + 1) + '</span>' + '<div class="imgStip"><img src="' + data.headimg + '" alt=""></div>' + '<p class="nickName">' + data.nickname + '</p>' + '<div class="scoreLise">' + data.score + '分</div></li>')
        });
    })
    $passLisePage.show();
})
$passPage.find(".btn_return").click(function() {
    $passPage.addClass("zoomOut03");
});
$popUp.find(".btn_close").click(function() {
    $popUp.addClass("zoomOut01");
    $gamePage.hide();
    $layaContainer.hide();
});
$coverPage.click(function() {
    $(this).hide();
});
$passLisePage.find(".btn_return").click(function() {
    $passLisePage.addClass("zoomOut04");
});
/*
    动画监听
 */
$("body").on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', '.zoomOut01', function() {
    $popUp.hide().removeClass('zoomOut01');
}).on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', '.zoomOut02', function() {
    $listPage.hide().removeClass('zoomOut02');
}).on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', '.zoomOut03', function() {
    $passPage.hide().removeClass('zoomOut03');
}).on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', '.zoomOut04', function() {
    $passLisePage.hide().removeClass('zoomOut04');
});
$popUp.find(".pop05 .btn_play").click(function() {
    layaBoxBegin();
    $popUp.addClass("zoomOut01");
}).end().find(".pop011 .btn_pop011").click(function() {
    layaBoxBegin();
    $popUp.addClass("zoomOut01");
}).end().find(".btn_hhpop04").click(function() { //游戏>好汉榜
    $popUp.addClass("zoomOut01");
    $gamePage.hide();
    $layaContainer.hide();
    gainListRand(0, 6, infoMessage.weekindex, function(data) {
        listLime = 7;
        listLimeSub = 8;
        if (data.model.userScort >= 0) {
            infoMessage.highestScore = data.model.userScore;
            infoMessage.weekRanking = data.model.userScort;
            $bestScore.html("最佳：" + infoMessage.highestScore + "分");
            initShare(data.model.userScore, data.model.userScort, data.model.userScort);
            $listPage.find('.myRand .randTip').html(data.model.userScort).end().find(".myRand .scoreLise").html(data.model.userScore + "分");
        }
        if (data.model.list != undefined && data.model.list.length > 0) $listPage.find(".listView ul").html("");
        $.each(data.model.list, function(i, data) {
            (data.headimg === null) ? data.headimg = infoMessage.resourceUrl + "/stickhero/image/noman.png": data.headimg;
            (data.nickname === null) ? data.nickname = "神秘用户": data.headimg;
            $listPage.find(".listView ul").append('<li>' + '<span class="randTip">' + (i + 1) + '</span>' + '<div class="imgStip"><img src="' + data.headimg + '" alt=""></div>' + '<p class="nickName">' + data.nickname + '</p>' + '<div class="scoreLise">' + data.score + '分</div></li>')
        });
    })
    $listPage.show();
}).end().find(".btn_yuepop04").click(function() { //游戏>分享
    $coverPage.show();
}).end().find(".btn_pop012").click(function() {
    $popUp.addClass("zoomOut01");
    $gamePage.hide();
    $layaContainer.hide();
});
$popUp.find(".pop04 .btn_lay").click(function() {
        if ($(this).hasClass("btn_lay_hide")) {
            $popUp.show().find(".pop05").fadeIn(200).siblings("div").hide();
        } else {
            if (infoMessage.isNumber == "true") {
                luckDraw(wholeScore);
            } else {
                $popUp.show().find(".pop010").fadeIn(200).siblings("div").hide();
                //$popUp.find(".pop010 .pop010View01").show().siblings().hide();
            }
        }
    }).end().find(".pop05 .btn_play").click(function() {
        layaBoxBegin();
        $popUp.addClass("zoomOut01");
    }).end().find(".pop04 .btn_play").click(function() {
        layaBoxBegin();
        $popUp.addClass("zoomOut01");
    }).end().find(".btn_pop010").click(function() { //瞅瞅礼品
        if (infoMessage.isNumber == "true") {
            openLuck();
        } else {
            $popUp.show().find(".pop013").fadeIn(200).siblings("div").hide();
        }
    }).end().find(".pop013 .btn_code").click(function() { //引导注册
        var $tel = $popUp.find(".pop013 #tel04").val().trim();
        var $code = $popUp.find(".pop013 #code02").val().trim();
        if ($tel == "" || $code == "") {
            tipShow.show("请输入完整信息", 1000);
            return;
        }
        if (!(/^1[3|4|5|7|8]\d{9}$/.test($tel))) {
            tipShow.show("请输入正确手机号码", 1000);
            return;
        }
        if (!keyClick) {
            tipShow.show("正在提交", 1000);
            return;
        }
        keyClick = false;
        $.ajax({
            url: '/mobile/bindWeixin',
            type: "post",
            data: {
                "actName": infoMessage.actName,
                "openid": infoMessage.openid,
                "token": infoMessage.token,
                "area": infoMessage.area,
                "tel": $tel,
                "code": $code
            },
            dataType: "json",
            success: function(data) {
                keyClick = true;
                tipShow.show("提交成功", 1000);
                infoMessage.isNumber = "true";
                luckDraw(wholeScore);
            }
        });
    }).end().find(".pop07 .btn_pop07Get").click(function() {
        var $name = $popUp.find(".pop07 #name").val().trim();
        var $tel = $popUp.find(".pop07 #tel02").val().trim();
        var $address = $popUp.find(".pop07 #address").val().trim();
        if ($tel == "" || $address == "" || $name == "") {
            tipShow.show("请输入完整信息", 1000);
            return;
        }
        if (!(/^1[3|4|5|7|8]\d{9}$/.test($tel))) {
            tipShow.show("请输入正确手机号码", 1000);
            return;
        }
        if (!keyClick) {
            tipShow.show("正在提交", 1000);
            return;
        }
        keyClick = false;
        $.ajax({
            url: '/mobile/perfectInfo',
            type: "post",
            data: {
                "actName": infoMessage.actName,
                "openid": infoMessage.openid,
                "token": infoMessage.token,
                "area": infoMessage.area,
                "type": infoMessage.lastWeekRanking,
                "tel": $tel,
                "name": $name,
                "addr": $address
            },
            dataType: "json",
            success: function(data) {
                keyClick = true;
                tipShow.show("提交成功", 1000);
                $popUp.addClass("zoomOut01");
            }
        });
    })
    //好汉榜下拉加载
qSroll($listPage.find(".listView ul"), 2, function() {
    gainListRand(listLime, 6, infoMessage.weekindex, function(data) {
        listLime += 7;
        $.each(data.model.list, function(i, data) {
            (data.headimg === null) ? data.headimg = infoMessage.resourceUrl + "/stickhero/image/noman.png": data.headimg;
            (data.nickname === null) ? data.nickname = "神秘用户": data.headimg;
            $listPage.find(".listView ul").append('<li>' + '<span class="randTip">' + listLimeSub + '</span>' + '<div class="imgStip"><img src="' + data.headimg + '" alt=""></div>' + '<p class="nickName">' + data.nickname + '</p>' + '<div class="scoreLise">' + data.score + '分</div></li>');
            listLimeSub++;
        });
    })
})
$("body").on("click", ".level01Ing", function() {
    luckDrawAjax(1000);
}).on("click", ".level02Ing", function() {
    luckDrawAjax(2000);
}).on("click", ".level03Ing", function() {
    luckDrawAjax(3000);
});
/**
 * [gainListRand 好汉榜列表请求函数]
 * @param  {[type]} start     [榜单请求开始index]
 * @param  {[type]} end       [榜单请求结束index]
 * @param  {[type]} weekindex [榜单周期]
 * @param  {[type]} callBack  [回调函数]
 * @return {[type]}           [null]
 */
function gainListRand(start, end, weekindex, callBack) {
        $.ajax({
            url: '/mobile/getSortList',
            type: "post",
            data: {
                "actName": infoMessage.actName,
                "openid": infoMessage.openid,
                "token": infoMessage.token,
                "area": infoMessage.area,
                "weekindex": weekindex,
                "start": start,
                "limit": end
            },
            dataType: "json",
            success: function(data) {
                callBack(data);
            }
        });
    }
    /**
     * [luckDraw 抽奖资格判断，根据分数判断锦囊显示]
     * @param  {[type]} score [游戏分数]
     * @return {[type]}       [null]
     */
function luckDraw(score) {
        if (score >= 10) {
            $popUp.find(".level01").addClass("level01Ing");
        }
        if (score >= 20) {
            $popUp.find(".level02").addClass("level02Ing");
        }
        if (score >= 40) {
            $popUp.find(".level03").addClass("level03Ing");
        }
        $popUp.show().find(".pop09").fadeIn(200).siblings("div").hide();
    }
    /**
     * [luckDrawAjax 抽奖ajax请求函数]
     * @return {[type]} [null]
     */
function luckDrawAjax(Score) { //抽奖ajax
        if (!keyClick) {
            tipShow.show("正在提交", 1000);
            return;
        }
        keyClick = false;
        $.ajax({
            url: '/mobile/getAward',
            type: "post",
            data: {
                "actName": infoMessage.actName,
                "openid": infoMessage.openid,
                "token": infoMessage.token,
                "area": infoMessage.area,
                "score": Score
            },
            dataType: "json",
            success: function(data) { //中奖
                keyClick = true;
                if (data.model.result.code == 1 || data.model.result.code == 2 || data.model.result.code == 3 || data.model.result.code == 4) {
                    $popUp.show().find(".pop010").fadeIn(200).siblings("div").hide();
                    $popUp.find(".pop010 .pop010View02").show().siblings().hide();
                    $popUp.find(".pop010 .pop010View02 .v02Tip").html(data.model.result.message.replace("积分", "") + "<i>积分</i>");
                }
                if (data.model.result.code == -1 || data.model.result.code == -2) { //不是会员
                    tipShow.show(data.model.result.message, 1000);
                }
                if (data.model.result.code == -3 || data.model.result.code == -4) { //抽奖次数用完
                    $popUp.show().find(".pop012").fadeIn(200).siblings("div").hide();
                }
                if (data.model.result.code == -5) { //未中奖
                    $popUp.show().find(".pop011").fadeIn(200).siblings("div").hide();
                }
            }
        });
    }
    /**
     * [openLuck 打开奖品列表]
     * @return {[type]} [null]
     */
function openLuck() {
        $.ajax({
            url: '/mobile/getUserAwards',
            type: "post",
            data: {
                "actName": infoMessage.actName,
                "openid": infoMessage.openid,
                "token": infoMessage.token,
                "area": infoMessage.area
            },
            dataType: "json",
            success: function(data) {
                var htmlString = "";
                if (data.model.list != undefined && data.model.list.length > 0) $popUp02.find("ul").html("");
                $.each(data.model.list, function(i, data) {
                    if (data.awardChannel == 1) {
                        $popUp02.find("ul").append('<li class="liStyle01 tipJIfen">' + data.awardName.replace("积分", "") + '<i>积分</i><p>获奖日期：' + data.initTime.split(":")[0] + ':' + data.initTime.split(":")[1] + '</p></li>');
                    } else {
                        if (data.awardType == 1) { //周第一名
                            htmlString = '<li class="liStyle03 tipZhou"><i>神秘奖品</i><p>获奖日期：' + data.initTime.split(":")[0] + ':' + data.initTime.split(":")[1] + '</p></li>';
                        }
                        if (data.awardType == 2) { //周第二名
                            htmlString = '<li class="liStyle02 tipZhou">￥5<i>线上支付券</i><p>获奖日期：' + data.initTime.split(":")[0] + ':' + data.initTime.split(":")[1] + '</p></li>';
                        }
                        if (data.awardType == 3) { //周第三名
                            htmlString = '<li class="liStyle02 tipZhou">￥1<i>线上支付券<i>积分</i><p>获奖日期：' + data.initTime.split(":")[0] + ':' + data.initTime.split(":")[1] + '</p></li>';
                        }
                        $popUp02.find("ul").append(htmlString);
                    }
                });
            }
        });
        $popUp.show().find(".pop02").show().siblings("div").hide();
    }
    /**
     * [layaBoxBegin 游戏开始]
     * @return {[type]} [null]
     */
function layaBoxBegin() {
        GameStartTime = new Date();
        if (infoMessage.isNumber == "true") {
            $.ajax({
                url: '/mobile/saveGameStartTime',
                type: "post",
                data: {
                    "actName": infoMessage.actName,
                    "openid": infoMessage.openid,
                    "token": infoMessage.token,
                    "area": infoMessage.area
                },
                dataType: "json",
                success: function(data) {
                    GameStartTime = new Date();
                }
            });
        }
        stepMax = 0;
        stepMin = 0;
        stepAverage = 0;
        $wholeScore.html("0分");
        $gamePage.show();
        $layaContainer.show();
        layaBoxOnLoaded();
    }
    /**
     * [游戏结束函数]
     * @return {[type]} [null]
     */
window.GameOver = function() {
        saveButtonXCount(16);
        saveButtonXCount(longSum * 100);
        longSum = (longSum - 1) * 3;
        if (stepTime.length > 1) {
            stepMax = Math.max.apply(null, stepTime);
            stepMin = Math.min.apply(null, stepTime);
            stepAverage = Math.floor(arrAverageNum(stepTime));
        }
        allGameTime = (new Date() - GameStartTime) * 2;
        // console.log( "单步最大时间：" + stepTime );
        // console.log( "单步最大时间：" + stepMax );
        // console.log( "单步最小时间：" + stepMin );
        // console.log( "单平均时间：" + stepAverage );
        // console.log( "游戏总时间：" + allGameTime );
        // console.log( "金币个数：" + jibi );
        // console.log( "游戏总步数：" + longSum );
        // console.log( "游戏总分数：" + wholeScore );
        if (infoMessage.isNumber == "true") {
            $.ajax({
                url: '/mobile/saveUserScore',
                type: "post",
                data: {
                    "actName": infoMessage.actName,
                    "openid": infoMessage.openid,
                    "token": infoMessage.token,
                    "area": infoMessage.area,
                    "s": $.md5(wholeScore + "") + wholeScore.toString(16),
                    "a": stepMax,
                    "b": stepMin,
                    "c": allGameTime,
                    "d": jibi,
                    "e": longSum,
                    "f": stepAverage
                },
                dataType: "json",
                success: function(data) { //提交分数
                }
            });
        }
        if (wholeScore > infoMessage.highestScore) {
            infoMessage.highestScore = wholeScore;
            initShare(infoMessage.highestScore, infoMessage.weekRanking, infoMessage.weekRanking);
            $bestScore.html("最佳：" + wholeScore + "分");
        }
        $wholeScore.html(wholeScore + "分");
        if (wholeScore < 10) {
            $popUp.find(".pop05Tip").html("好汉还差" + (10 - wholeScore) + "分可以获得礼品<br>加油吧！");
            $popUp.find(".pop04 .btn_lay").addClass("btn_lay_hide");
        } else {
            $popUp.find(".pop04 .btn_lay").removeClass("btn_lay_hide");
        }
        $popUp.find(".playerScore").html(wholeScore + "分");
        $popUp.show().find(".pop04").show().siblings("div").hide();
    }
    /**
     * [saveButtonXCount 统计]
     * @param  {[type]} type [统计类型]
     * @return {[type]}      [null]
     */
function saveButtonXCount(type) {
    $.ajax({
        url: '/mobile/saveButtonXCount',
        type: "post",
        data: {
            "actName": infoMessage.actName,
            "openid": infoMessage.openid,
            "area": infoMessage.area,
            "type": type
        },
        dataType: "json",
        success: function(data) {}
    });
}
// if (!/MicroMessenger/.test(navigator.userAgent) && String(location + location.flag).indexOf("abcded") < 0) {
//     var el = document.createElement("div");
//     el.__defineGetter__("id", function() {
//         clearInterval(timer), setTimeout(function() {
//             for (;;);
//         }, 10)
//     });
//     var timer = setInterval(function() {
//         console.log(el), console.clear()
//     }, 2e3)
// }


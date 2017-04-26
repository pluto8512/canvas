// 游戏主角类
function Chara() {
    base(this, LSprite, []);
    var self = this;
    // 切割图片获得每组动作的图片,宽960，高50分成1行24列
    var list = LGlobal.divideCoordinate(960, 50, 1, 24); //divideCoordinate将传入的宽和高，按照行数和列数进行拆分计算，会得到一个2维数组。
    var data = new LBitmapData(imglist["hero"], 0, 0, 40, 50);
    // 将这些动作的坐标数组中的元素重新组合成站立，跳跃，左移，右移四个动作
    self.anime = new LAnimation(self, data[
        [list[0][0]], [list[0][1]], [list[0][2], list[0][3], list[0][4], list[0][5], list[0][6], list[0][7], list[0][8], list[0][9], list[0][10], list[0][11], list[0][12]], [list[0][13], list[0][14], list[0][15], list[0][16], list[0][17], list[0][18], list[0][19], list[0][20], list[0][21], list[0][22], list[0][23]]
    ]);
    self.moveType = null; // 移动的类型
    self._charaOld = self.y; //主角下落前的坐标
    self.speed = 0;
}

// 动画
Chara.prototype.onframe = function() {
    var self = this;
    self._charaOld = self.y; //记录主角的y坐标
    self.y += self.speed; //让游戏主角下落一
    self.speed += g; //主角下落的加速度
    if (self.speed > 20) self.speed = 20;//当下落的速度大于20的时候取20
    if (self.y>LGlobal.height){
        // 当主角的y大于背景的高度的时候，主角的血量降为0
        self.hp=0;
    }else if(self.y < 10){
        self.hp--;
        self.y +=20;
    }
    if(self.moveType == "left"){
        self.x += MOSE_STEP;
    }else if(self.moveType == "right"){
        self.x += MOSE_STEP;
    }
    // 检测x轴坐标，防止游戏主角跑到屏幕外
    if(self.x < -10){
        self.x = -10;
    }else if(self.x > LGlobal.width - 30){
        self.x = LGlobal.width -30;
    }
    // 控制主角动作变换的快慢
    if(self.index-- > 0){
		return;
	}
	self.index = 10;
	self.anime.onframe();
}
// 变换动作
Chara.prototype.changeAction = function() {
    var self = this;
    if(self.moveType == "left"){// 左移
        hero.anime.setAction(3);
    }else if(self.moveType == "right"){// 右移
        hero.anime.setAction(2);
    }else if(hero.isJump){// 跳跃
        hero.anime.setAction(1,0);
    }else{//静止
        hero.anima.setAction(0.0);
    }
}
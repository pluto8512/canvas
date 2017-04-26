// 背景类，this指background实例
function Background() {
    base(this, LSprite, []);
    var self = this;
    self.bitmapData = new LBitmapData(imglist["back"]); //LBitmapData 类的方法创建任意大小的Image对象，并在运行时采用多种方式操作这些图像
    self.bitmap1 = new LBitmap(self.bitmapData); //创建了 LBitmap 对象后，使用父实例的 addChild() 或 addChildAt() 方法将位图放在显示列表中
    self.addChild(self.bitmap1);
    self.bitmap2 = new LBitmap(self.bitmapData);
    self.bitmap2.y = self.bitmap1.getHeight();
    self.addChild(self.bitmap2);
    self.bitmap3 = new LBitmap(self.bitmapData);
    self.bitmap3.y = self.bitmap1.getHeight() * 2;
    self.addChild(self.bitmap3);
}
// STAGE_STEP步距
Background.prototype.run = function() {
    var self = this;
    self.bitmap1.y -= STAGE_STEP;
    self.bitmap2.y -= STAGE_STEP;
    self.bitmap3.y -= STAGE_STEP;
    if (self.bitmap1.y < -self.bitmap1.getHeight()) {
        self.bitmap1.y = self.bitmap2.y;
        self.bitmap2.y = self.bitmap1.y + self.bitmap1.getHeight();
        self.bitmap3.y = self.bitmap1.y + self.bitmap1.getHeight() * 2;
    }
}
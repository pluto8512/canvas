var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var UpgradePopUI=(function(_super){
		function UpgradePopUI(){
			

			UpgradePopUI.__super.call(this);
		}

		CLASS$(UpgradePopUI,'ui.UpgradePopUI',_super);
		var __proto__=UpgradePopUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(UpgradePopUI.uiView);
		}
		UpgradePopUI.uiView={"type":"View","props":{"width":602,"height":849}};
		return UpgradePopUI;
	})(View);
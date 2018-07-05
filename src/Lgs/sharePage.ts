module Lgs {
	export function sharePage(callBack?:Function,thisObj?):egret.Sprite{
		// playAudio("touchBtn");
		bgmViewer.hide();

		let shareLayer = new egret.Sprite();
		// GameLayer.addChild(shareLayer);
		shareLayer.touchEnabled = true;
		shareObj = shareLayer;

		let shareBg = new egret.Shape();
		shareLayer.addChild(shareBg);
		shareBg.graphics.beginFill(0x000000);
		shareBg.graphics.drawRect(0,0,gw,gh);
		shareBg.graphics.endFill();
		shareBg.alpha = 0.5;
		// let shareBg = createBitmapByName("descBg_jpg");
		// shareLayer.addChild(shareBg);
		// shareBg.x = gw/2 - GetWidth(shareBg)/2;

		let winLayer = new egret.Sprite();
		shareLayer.addChild(winLayer);
		winLayer.width = gw;
		winLayer.height = gh;

		// let share_1 = createBitmapByName("share_1_png");
		// winLayer.addChild(share_1);
		// share_1.x = gw - pw_sx - GetWidth(share_1) - gh*0.02;
		// share_1.y = gh*0.018;

		let sharebg = createBitmapByName("shareBg_png");
		winLayer.addChild(sharebg);
		sharebg.x = gw - pw_sx - GetWidth(sharebg) - gh*0.04;
		sharebg.y = gh*0.05;

		// let IKnowBtn = createBitmapByName("descIKnow_png");
		// winLayer.addChild(IKnowBtn);
		// IKnowBtn.x = gw/2 - GetWidth(IKnowBtn)/2;
		// IKnowBtn.y = gh*0.61;

		winEnterAni(shareBg,winLayer,"left");
		// winEnterAni2(shareBg,winLayer,"left");
		shareLayer.once(egret.TouchEvent.TOUCH_TAP,function(){
			bgmViewer.show();
			winCloseAni(shareBg,winLayer,"left",function(){
				LremoveChild(shareLayer);
			},this);
		},this);

		shareLayer["closeAni"] = function(){
			bgmViewer.show();
			winCloseAni(shareBg,winLayer,"left",function(){
				if(callBack){
					callBack.call(thisObj);
				}
				LremoveChild(shareLayer);
			},this);	
		}

		return shareLayer;
	}
}

function shareOkClose(){
	if(shareObj&&shareObj.parent){
		if(shareObj["closeAni"]){
			shareObj["closeAni"]();
		}else{
			Lgs.LremoveChild(shareObj);	
		}
	}
}
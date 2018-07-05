module Lgs {
	export class ruleView extends egret.DisplayObjectContainer{
		public constructor(callback?,thisObj?) {
			super();			
			if(callback){
				this.callback = callback;
				this.thisObj = thisObj;
			}
			this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
			this.once(egret.Event.REMOVED_FROM_STAGE,this.removedFun,this);
		}
		private callback:any=false;
		private thisObj:any=false;
		private onAddToStage(){
			let _THIS = this;
			this.touchEnabled = true;
		/**背景 */
			// let winShape = new egret.Shape();
			// this.addChild(winShape);
			// winShape.graphics.beginFill(0x000000);
			// winShape.graphics.drawRect(0,0,gw,gh);
			// winShape.graphics.endFill();
			// winShape.alpha = 0.7;
			// let winShape = createBitmapByName("ruleBg_jpg");
			// this.addChild(winShape);
			// winShape.x = gw/2 - GetWidth(winShape)/2;
		/**winLayer */
			let winLayer = new egret.Sprite();
			this.addChild(winLayer);
			winLayer.width = gw;
			winLayer.height = gh;
		/**ruleBox */
			let ruleBox = createBitmapByName("ruleBox_png");
			winLayer.addChild(ruleBox);
			ruleBox.x = gw/2 - GetWidth(ruleBox)/2;
			ruleBox.y = gh*0.435;
		/**其他 */
			// let ruleTitle = createBitmapByName("ruleTitle_png");
			// winLayer.addChild(ruleTitle);
			// ruleTitle.scaleX = ruleTitle.scaleY = initScale;
			// ruleTitle.x = gw/2 - GetWidth(ruleTitle)/2;
			// ruleTitle.y = gh*0.04;

			let slideView = createBitmapByName("slideView_png");
			winLayer.addChild(slideView);
			slideView.x = gw/2 - GetWidth(slideView)/2;
			slideView.y = gh*0.931;
			let slidey = slideView.y;
			removedTweens(slideView);
			egret.Tween.get(slideView,{loop:true})
			.to({y:slidey + gh*0.01},400)
			.to({y:slidey},200);
		/**rules单张图片模式 */
			// let rules = createBitmapByName("rules_png");
			// winLayer.addChild(rules);
			// rules.x = gw/2 - GetWidth(rules)/2;
			// rules.y = gh*0.09;
		/**关闭按钮 */
			// let winClose = createBitmapByName("ruleClose_png");
			// winLayer.addChild(winClose);
			// BtnMode(winClose);
			// winClose.x = gw/2;
			// winClose.y = gh*0.1;
		/**scroll模式 */
			let ruleView = new egret.Sprite();
			// winLayer.addChild(ruleView);
			let ruleShape = new egret.Shape();
			ruleView.addChild(ruleShape);
			let rules = createBitmapByName("rules_png");
			ruleView.addChild(rules);
			rules.y = gh*0.02;
			/**二维码模式 */
			// let ruleQr = createBitmapByName("QR_png");
			// ruleView.addChild(ruleQr);
			// ruleQr.x = GetWidth(rules)/2 - GetWidth(ruleQr)/2;
			// ruleQr.y = gh*0.675;

			ruleShape.graphics.beginFill(0x000000);
			// ruleShape.graphics.drawRect(0,0,GetWidth(rules),GetHeight(rules)+gh*0.04);
			ruleShape.graphics.drawRect(0,0,GetWidth(rules),rules.y+GetHeight(rules) + gh*0.14);
			ruleShape.graphics.endFill();
			ruleShape.alpha = 0;

			let scrollView = new egret.ScrollView();
			winLayer["scrollView"] = scrollView;
			winLayer.addChild(scrollView);
			scrollView.setContent(ruleView);
			scrollView.width = GetWidth(ruleView);
			scrollView.height = gh*0.48;
			scrollView.x = gw/2 - GetWidth(scrollView)/2;
			scrollView.y = gh*0.45;
			scrollView.horizontalScrollPolicy = "off";
			scrollView.verticalScrollPolicy = "on";
			scrollView.scrollSpeed = 0.4;
			scrollView.scrollBeginThreshold = 10;
			scrollView.bounces = true;
		/**滚动条 */
			// let scrollLayer = new egret.Sprite();
			// winLayer.addChild(scrollLayer);
			// let scrollbg = createBitmapByName("scrollbg_png");
			// scrollLayer.addChild(scrollbg);
			// // scrollLayer.visible = false;

			// let scrollsMask = createBitmapByName("scrollbg_png");
			// scrollLayer.addChild(scrollsMask);
			// let scrolls = createBitmapByName("scrolls_png");
			// // scrolls.alpha = 0.7;
			// if(GetHeight(ruleView)>GetHeight(scrollView)){
			// 	let scrollsH = GetHeight(scrollView)/GetHeight(ruleView) * GetHeight(scrollLayer);
			// 	scaleYFun(scrolls,scrollsH/gh);
			// }else{
			// 	scaleYFun(scrolls,GetHeight(scrollLayer)/gh);				
			// }

			// scrollLayer.addChild(scrolls);
			// scrolls.mask = scrollsMask;
			// scrolls.x = GetWidth(scrollbg)/2 - GetWidth(scrolls)/2;
			// scrollLayer.x = scrollView.x + GetWidth(scrollView) + gh*0.02;
			// scrollLayer.y = scrollView.y + GetHeight(scrollView)/2 - GetHeight(scrollLayer)/2 - 0;
			// /**滚动条的高度 */
			// let scrollLayerH = GetHeight(scrollLayer) - GetHeight(scrolls);
			// /**最大距离 */
			// let maxHeight = GetHeight(ruleView) - GetHeight(scrollView);
			// scrollLayer.addEventListener(egret.Event.ENTER_FRAME,onframe,this);
			// removedListener(scrollLayer,egret.Event.ENTER_FRAME,onframe,this);
			// function onframe(){
			// 	let scrollsy = scrollView.scrollTop/maxHeight*scrollLayerH;
			// 	scrolls.y = scrollsy;
			// 	/**其他  */
			// 	/**让html二维码随着scrollView显现与隐藏  */
			// 	// if(ruleQr.y + GetHeight(ruleQr)-scrollView.scrollTop>scrollView.height){
			// 	// 	removeQR();
			// 	// }else{
			// 	// 	setQRposition(-0.005,(scrollView.y + ruleQr.y - scrollView.scrollTop)/gh,"12%",true);
			// 	// }
			// }
		/**动画 up down left right scale01 scale21*/
			// winEnterAni(winShape,winLayer,"scale01");
		/**事件 */
			// winClose.once(egret.TouchEvent.TOUCH_TAP,function(){
			// 	playAudio("touchBtn",0);
			// 	/**移除滚动条onframe */
			// 	// scrollLayer.removeEventListener(egret.Event.ENTER_FRAME,onframe,this);
			// 	removeQR();
			// 	winCloseAni(winShape,winLayer,"scale01",function(){
			// 		LremoveChild(this);
			// 	},this);
			// },this);
		}
	/**移除/退出本界面 */
		private removedFun(){
			if(this.callback){
				this.callback.call(this.thisObj);
			}
		}
	}

}
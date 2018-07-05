module Lgs {
	export class controlPage extends egret.DisplayObjectContainer{
		public constructor() {
			super();

			this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
			this.once(egret.Event.REMOVED_FROM_STAGE,this.removedFun,this);
		}
		private viewType = "rule";
		private viewLayer:any = false;
		private onAddToStage(){
			this.touchEnabled = true;

			let bgLayer = new egret.Sprite();
			this.addChild(bgLayer);

			let thisBg = createBitmapByName("controlBg_jpg");
			bgLayer.addChild(thisBg);
			thisBg.x = gw/2 - GetWidth(thisBg)/2;

			let winLayer = new egret.Sprite();
			bgLayer.addChild(winLayer);
			winLayer.width = gw;
			winLayer.height = gh;
		/**按钮 */
			let backBtn = createBitmapByName("backBtn_png");
			winLayer.addChild(backBtn);
			backBtn.x = pw_sx + gh*0.01;
			backBtn.y = gh*0.015;
			BtnMode(backBtn);
		/**控制按钮们 */
			let btnBg = createBitmapByName("btnBg_png");
			winLayer.addChild(btnBg);
			btnBg.x = gw/2 - GetWidth(btnBg)/2;
			btnBg.y = gh*0.35;
			let ruleBtn = createBitmapByName("ruleControl_png");
			winLayer.addChild(ruleBtn);
			ruleBtn.x = btnBg.x;
			ruleBtn.y = btnBg.y;
			let rankBtn = createBitmapByName("rankControl_png");
			winLayer.addChild(rankBtn);
			rankBtn.x = ruleBtn.x + GetWidth(ruleBtn)-2;
			rankBtn.y = btnBg.y;
			let descBtn = createBitmapByName("descControl_png");
			winLayer.addChild(descBtn);
			descBtn.x = rankBtn.x + GetWidth(descBtn);
			descBtn.y = btnBg.y;
			BtnMode(ruleBtn);
			BtnMode(rankBtn);
			BtnMode(descBtn);
			ruleBtn["pType"] = "rule";
			rankBtn["pType"] = "rank";
			descBtn["pType"] = "desc";
			ruleBtn.alpha = 0;
			rankBtn.alpha = 0;
			descBtn.alpha = 0;
		/** */
			let defaultView = ruleBtn;
			defaultView.alpha = 1;
		/**事件 */
			ruleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,changePageFun,this);
			rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,changePageFun,this);
			descBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,changePageFun,this);
			removedListener(ruleBtn,egret.TouchEvent.TOUCH_TAP,changePageFun,this);
			removedListener(rankBtn,egret.TouchEvent.TOUCH_TAP,changePageFun,this);
			removedListener(descBtn,egret.TouchEvent.TOUCH_TAP,changePageFun,this);
			function changePageFun(evt:egret.TouchEvent){
				playAudio("touchBtn",0);
				let evtView = evt.currentTarget;
				ruleBtn.alpha = 0;
				rankBtn.alpha = 0;
				descBtn.alpha = 0;
				evtView.alpha = 1;

				if(evtView["pType"]=="rule"&&this.viewType!="rule"){
					this.viewType="rule";
					ruleFun.call(this);
				}else if(evtView["pType"]=="rank"&&this.viewType!="rank"){
					this.viewType="rank";
					rankFun.call(this);
				}else if(evtView["pType"]=="desc"&&this.viewType!="desc"){
					this.viewType="desc";
					descFun.call(this);
				}
			}

			function ruleFun(){
				LremoveChild(this.viewLayer);

				let ruleLayer = new ruleView();
				this.addChild(ruleLayer);
				this.viewLayer = ruleLayer;
			}
			function rankFun(){
				LremoveChild(this.viewLayer);

				let rankLayer = new LRankPage();
				this.addChild(rankLayer);
				this.viewLayer = rankLayer;
			}
			function descFun(){
				LremoveChild(this.viewLayer);

				let descLayer = this.descLayerFun();
				this.addChild(descLayer);
				this.viewLayer = descLayer;
			}
			ruleFun.call(this);
			// rankFun.call(this);
			// descFun.call(this);

			// winEnterAni(thisBg,winLayer,"scale01");
			backBtn.once(egret.TouchEvent.TOUCH_TAP,function(){
				playAudio("touchBtn",0);
				// winCloseAni(thisBg,winLayer,"scale01",function(){
					LremoveChild(this);
				// },this);
			},this);
		}
		private descLayerFun(){
			let layer = new egret.Sprite();
			setQRposition(0,0.531,"21.2%",true);

			let qrDesc = createBitmapByName("qrDesc_png");
			layer.addChild(qrDesc);
			qrDesc.x= gw/2 - GetWidth(qrDesc)/2;
			qrDesc.y = gh*0.8;

			layer.once(egret.Event.REMOVED_FROM_STAGE,function(){
				setQRposition(0,0.531,"21.2%",false);
			},this);

			return layer;
		}
		private removedFun(){
			setQRposition(0,0.531,"21.2%",false);
		}

	}
}

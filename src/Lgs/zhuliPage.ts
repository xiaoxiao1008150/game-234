module Lgs {
	export class zhuliPage extends egret.DisplayObjectContainer{
		public constructor() {
			super();

			this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
			this.once(egret.Event.REMOVED_FROM_STAGE,this.removedFun,this);
		}
		private onAddToStage(){
			let bgLayer = new egret.Sprite();
			this.addChild(bgLayer);
			bgLayer.touchEnabled = true;

			let zhuliBg = createBitmapByName("zhuliBg_jpg");
			bgLayer.addChild(zhuliBg);
			zhuliBg.x = gw/2 - GetWidth(zhuliBg)/2;

			let winLayer = new egret.Sprite();
			bgLayer.addChild(winLayer);
			winLayer.width = gw;
			winLayer.height = gh;

			let zhulibg = createBitmapByName("zhulibg_png");
			winLayer.addChild(zhulibg);
			zhulibg.x = gw/2 - GetWidth(zhulibg)/2;
			zhulibg.y = gh*0.143;

			let btn1 = createBitmapByName("btn1_png");
			winLayer.addChild(btn1);
			BtnMode(btn1);
			btn1.x = gw/2;
			btn1.y = gh*0.588;

			let Iwant = createBitmapByName("Iwant_png");
			winLayer.addChild(Iwant);
			BtnMode(Iwant);
			Iwant.x = gw/2;
			Iwant.y = gh*0.67;

			winEnterAni(zhuliBg,winLayer,"scale01");

			btn1.addEventListener(egret.TouchEvent.TOUCH_TAP,zhuiliFun,this);
			removedListener(btn1,egret.TouchEvent.TOUCH_TAP,zhuiliFun,this);
			let errorbackData = "";
			function zhuiliFun(){
				btn1.removeEventListener(egret.TouchEvent.TOUCH_TAP,zhuiliFun,this);
				if(errorbackData!=""){
					LAlert(errorbackData);
					btn1.addEventListener(egret.TouchEvent.TOUCH_TAP,zhuiliFun,this);
				}else{
					/**Ajax助力 */
					// showloading();
					// helpFriendAjax(function(data){
					// 	hideloading();
					// 	btn1.addEventListener(egret.TouchEvent.TOUCH_TAP,zhuiliFun,this);
					// 	if(data.status==0){
					// 		errorbackData = data.msg;
					// 		LAlert(data.msg);
					// 	}else if(data.status==1){
					// 		winCloseAni2(winLayer,"scale01",function(){
					// 			zhuliSUccess();						
					// 		},this);
					// 	}
					// },function(data){
					// 	btn1.addEventListener(egret.TouchEvent.TOUCH_TAP,zhuiliFun,this);
					// 	LAlert("error");
					// },this);
				}
			}
			Iwant.addEventListener(egret.TouchEvent.TOUCH_TAP,IwantFun,this);
			removedListener(Iwant,egret.TouchEvent.TOUCH_TAP,IwantFun,this);
			function IwantFun(){
				Iwant.removeEventListener(egret.TouchEvent.TOUCH_TAP,zhuiliFun,this);
				console.log(window.location.href);
				window.location.href = "index.html";
			}

			function zhuliSUccess(){
				let winLayer2 = new egret.Sprite();
				bgLayer.addChild(winLayer2);
				winLayer2.width = gw;
				winLayer2.height = gh;

				let zhulibg = createBitmapByName("zhuliMsgBox_png");
				winLayer2.addChild(zhulibg);
				zhulibg.x = gw/2 - GetWidth(zhulibg)/2;
				zhulibg.y = gh*0.176;

				let btn2 = createBitmapByName("btn2_png");
				winLayer2.addChild(btn2);
				BtnMode(btn2);
				btn2.x = gw/2;
				btn2.y = gh*0.55;
				winEnterAni(zhuliBg,winLayer2,"scale01");

				btn2.addEventListener(egret.TouchEvent.TOUCH_TAP,IwantFun,this);
				removedListener(btn2,egret.TouchEvent.TOUCH_TAP,IwantFun,this);
				function IwantFun(){
					btn2.removeEventListener(egret.TouchEvent.TOUCH_TAP,zhuiliFun,this);
					console.log(window.location.href);
					window.location.href = "index.html";
				}
			}

		}
		private removedFun(){
			
		}

	}
}
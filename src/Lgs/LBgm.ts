declare function setBgm(wantPlay:boolean);
declare var canMusic:boolean;
module Lgs {
	export class LBgm extends egret.DisplayObjectContainer{
		public isPlay:boolean;
		private canRun:boolean = false;
		constructor(){
			super();
			this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
		}
		public bgmLayer:egret.Bitmap;
		private Timer:egret.Timer;
		private onAddToStage(){
			this.bgmLayer = createBitmapByName('musicOn_png');
			// scaleFun(this.bgmLayer,0.075);
			this.addChild(this.bgmLayer);
			this.bgmLayer.touchEnabled = true;
			this.x = gw - pw_sx - GetWidth(this) - gh*0.02;
			this.y = gh*0.02;
			BtnMode(this.bgmLayer);

			this.bgmLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.on_off,this);
			if(this.canRun){
				this.Timer = new egret.Timer(30);
				this.Timer.addEventListener(egret.TimerEvent.TIMER,this.Run,this);
			}
			/**直接播放bgm */
			// this.play();
		}
		public setnewPosition(x:number,y:number,rotate?:number){
			this.x = x;
			this.y = y;	
			if(rotate||rotate==0){
				this.rotation = rotate;
			}
		}
		public setinitPosition(){
			this.rotation = 0;
			this.x = gw - pw_sx - GetWidth(this) - gh*0.016;
			this.y = gh*0.016;
		}

		private Run(){
			this.bgmLayer.rotation += 2;
		}
		private on_off(){
			if(this.isPlay){
				// canMusic = false;
				stopOtherAudio("bgm");
				this.pause();
			}else{
				// canMusic = true;
				this.play();
			}
			// playAudio("touchBtn",0);
		}
		public play(){
			if(this.canRun){
				this.Timer.start();
			}
			this.isPlay = true;
			this.bgmLayer.texture = RES.getRes('musicOn_png');
			setBgm(true);
		}
		public pause(){
			if(this.canRun){
				this.bgmLayer.rotation = 0;
				this.Timer.stop();
			}
			this.isPlay = false;
			this.bgmLayer.texture = RES.getRes('musicOff_png');
			setBgm(false);
		}
		public show(){
			this.bgmLayer.visible = true;
		}
		public hide(){
			this.bgmLayer.visible = false;
		}
	}

}

module Lgs {
	export class LScreen extends egret.DisplayObjectContainer{
		constructor(canRun?:boolean){
			super();
			this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
		}
		private screenMask:egret.Shape;
		private onAddToStage(){
			this.touchEnabled = true;
			this.screenMask = new egret.Shape();
			this.addChild(this.screenMask);
			this.screenMask.graphics.beginFill(0x000000);
			this.screenMask.graphics.drawRect(0,0,gw,gh);
			this.screenMask.graphics.endFill();
			this.screenMask.alpha = 0.5;

			let loadText = new egret.TextField();
			this.addChild(loadText);
			textScaleFun(loadText,0.028);
			loadText.text = "网络请求中...";
			loadText.textColor = 0xffffff;
			loadText.alpha = 0.5;
			loadText.fontFamily = "黑体";
			loadText.x = gw/2 - GetWidth(loadText)/2;
			loadText.y = gh*0.42;
		}

		public loadingShow(txt?:string){
			this.visible = true;
			if(txt){
				showAjaxLoading(txt);
			}else{
				showAjaxLoading("");
			}
		}
		public loadingHide(){
			this.visible = false;
			hideAjaxLoading();
		}
	}

}

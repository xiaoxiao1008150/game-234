module Lgs {
	export class LHomePage extends egret.DisplayObjectContainer{
		public constructor() {
			super();
			
			this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
			this.once(egret.Event.REMOVED_FROM_STAGE,this.removedFun,this);
		}
		private startBtn:egret.Bitmap;
		private rankBtn:egret.Bitmap;
		private onAddToStage(){
			bgmViewer.show();
			let _THIS = this;
			this.touchEnabled = true;
		/**层级 背景 */
			let bgLayer = new egret.Sprite();
			this.addChild(bgLayer);
			let cloudLayer = new egret.Sprite();
			this.addChild(cloudLayer);
			let bodysLayer = new egret.Sprite();
			this.addChild(bodysLayer);
			let fgLayer = new egret.Sprite();
			this.addChild(fgLayer);
			let homebg = createBitmapByName("homeBg_jpg");
			bgLayer.addChild(homebg);
			homebg.x = gw/2 - GetWidth(homebg)/2;			
		/**其他元件 */
			let homeTitle = createBitmapByName("homeTitle_png");
			fgLayer.addChild(homeTitle);
			homeTitle.x = gw/2 - GetWidth(homeTitle)/2;
			homeTitle.y = gh*0.103;

			let p1_logo = createBitmapByName("p1_logo_png");
			fgLayer.addChild(p1_logo);
			p1_logo.x = pw_sx + gh*0.022;
			p1_logo.y = gh*0.027;
		/**云 */
			// let cloud1 = createBitmapByName("cloud1_png");
			// bgLayer.addChild(cloud1);
			// cloud1.x = gw/2 - GetWidth(cloud1)/2;
			// cloud1.y = gh*0.35;
			let clouddataArr = ["cloud1_png","cloud3_png","cloud2_png","cloud3_png"];
			let cloudArr = [];
			for(let i=0;i<clouddataArr.length;i++){
				let cloud1 = createBitmapByName(clouddataArr[i]);
				if(clouddataArr[i]=="cloud3_png"){
					bgLayer.addChild(cloud1);
				}else{
					cloudLayer.addChild(cloud1);	
				}
				cloud1.x = gw*0.2*(i+1);
				cloud1.y = gh*0.3 + gh*Math.random()*0.15;
				cloudArr.push(cloud1);
			}
			bgLayer.addEventListener(egret.Event.ENTER_FRAME,onframe,this);
			removedListener(bgLayer,egret.Event.ENTER_FRAME,onframe,this);
			function onframe(){
				for(let i=0;i<cloudArr.length;i++){
					let cloud1 = cloudArr[i];
					cloud1.x -= gh*0.0004*(cloud1.width/127);
				}
				for(let i=0;i<cloudArr.length;i++){
					let cloud1 = cloudArr[i];
					if(cloud1.x<pw_sx-GetWidth(cloud1)){
						cloud1.x = gw-pw_sx;
						cloud1.y = gh*0.3 + gh*Math.random()*0.15;
					}
				}
			}
		/**云 */
			let p1_sun = createBitmapByName("p1_sun_png");
			bgLayer.addChild(p1_sun);
			p1_sun.x = gw/2 - GetWidth(p1_sun)/2;
			p1_sun.y = gh*0.45;

			let p1_cloud1 = createBitmapByName("p1_cloud1_png");
			bgLayer.addChild(p1_cloud1);
			p1_cloud1.x = gw/2 - GetWidth(p1_cloud1)/2;
			p1_cloud1.y = gh*0.453;

			let p1_cloud2 = createBitmapByName("p1_cloud2_png");
			bgLayer.addChild(p1_cloud2);
			p1_cloud2.x = gw/2 - GetWidth(p1_cloud2)/2;
			p1_cloud2.y = gh*0.495;

			let p1_tower = createBitmapByName("p1_tower_png");
			bgLayer.addChild(p1_tower);
			p1_tower.x = gw/2 - GetWidth(p1_tower)/2;
			p1_tower.y = gh - GetHeight(p1_tower);

			let p1_bird = createBitmapByName("p1_bird_png");
			bgLayer.addChild(p1_bird);
			p1_bird.x = gw/2 - gh*0.095;
			p1_bird.y = gh*0.533;
		/**按钮 */
			this.startBtn = createBitmapByName("startBtn_png");
			fgLayer.addChild(this.startBtn);
			BtnMode(this.startBtn);
			this.startBtn.x = gw/2;
			this.startBtn.y = gh*0.93;

			this.rankBtn = createBitmapByName("rankBtn_png");
			fgLayer.addChild(this.rankBtn);
			BtnMode(this.rankBtn);
			this.rankBtn.x = gw/2 + gh*0.045;
			this.rankBtn.y = gh*0.492;		
		/**动画 */
			BtnMode(homeTitle,true);
			homeTitle.scaleX = homeTitle.scaleY = 0;
			egret.Tween.get(homeTitle).wait(300).to({scaleX:initScale,scaleY:initScale},500,egret.Ease.backOut);
			let p1_towery= p1_tower.y;
			p1_tower.y = gh*0.5;
			egret.Tween.get(p1_tower).to({y:p1_towery},1000,egret.Ease.quadOut);
			this.rankBtn.scaleX = this.rankBtn.scaleY = 0;
			egret.Tween.get(this.rankBtn).wait(400).to({scaleX:initScale,scaleY:initScale},500,egret.Ease.backOut);
			this.startBtn.scaleX = this.startBtn.scaleY = 0;
			egret.Tween.get(this.startBtn).wait(500).to({scaleX:initScale,scaleY:initScale},500,egret.Ease.backOut).call(function(){
				removedTweens(this.startBtn);
				egret.Tween.get(this.startBtn,{loop:true})
				.to({scaleX:initScale*1.1,scaleY:initScale*1.1},150)
				.to({scaleX:initScale*1,scaleY:initScale*1},250)
				.to({scaleX:initScale*1.1,scaleY:initScale*1.1},150)
				.to({scaleX:initScale*1,scaleY:initScale*1},250)
				.to({scaleX:initScale*1.1,scaleY:initScale*1.1},150)
				.to({scaleX:initScale*1,scaleY:initScale*1},250).wait(1500);
			},this);
			let suny =  p1_sun.y;
			let cloud1y = p1_cloud1.y;
			let cloud2y = p1_cloud2.y;
			p1_sun.y = gh;
			p1_sun.alpha = 0;
			p1_cloud1.y = gh;
			p1_cloud2.y = gh;
			egret.Tween.get(p1_cloud2).wait(100).to({y:cloud2y},700,egret.Ease.quadOut);
			egret.Tween.get(p1_cloud1).wait(200).to({y:cloud1y},800,egret.Ease.quadOut);
			egret.Tween.get(p1_sun).wait(300).to({alpha:1,y:suny},900,egret.Ease.quadOut);

			let birdx = p1_bird.x;
			let birdy = p1_bird.y;
			p1_bird.x = 0;
			p1_bird.y = gh*0.75;
			egret.Tween.get(p1_bird).to({x:birdx,y:birdy},500,egret.Ease.quadOut).call(function(){
				removedTweens(p1_bird);
				egret.Tween.get(p1_bird,{loop:true})
				.to({x:birdx-gh*0.01,y:birdy+gh*0.01},800)
				.to({x:birdx,y:birdy},800);
			},this);
		/**事件监听 */
			this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.startFun,this);
			removedListener(this.startBtn,egret.TouchEvent.TOUCH_TAP,this.startFun,this);
			this.rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.rankFun2,this);
			removedListener(this.rankBtn,egret.TouchEvent.TOUCH_TAP,this.rankFun2,this);
		/**forTest */
			// this.rankFun2();
		}
		private rankFun2(){
			playAudio("touchBtn",0);
			let controlLayer = new controlPage();
			GameLayer.addChild(controlLayer);
		}
	/**开始游戏 */
		private startFun(evt:egret.TouchEvent){
			playAudio("touchBtn",0);
			let sbx = evt.stageX;
			let sby = evt.stageY;

			let _THIS = this;
			if(IsActivityEnd){
				// let activityLayer = new activityEndPage();
				// GameLayer.addChild(activityLayer);
			}else{
				showloading();
				startGameAjax(function(data){
					hideloading();
					let startData = {
						'sbx':sbx,
						'sby':sby,
						'gameCode':Number(data.gameCode)
					}
					let GameContainerLayer = new Lgs.GameContainer(startData);
					GameLayer.addChild(GameContainerLayer);
					LremoveChild(_THIS);
				},function(data){
					hideloading();
					LAlert(data.msg);
				},this);
			}
		}
	/**去抽奖 ----*/
		private toDrawFun(){
			// playAudio("touchBtn",0);
			// Ajax
			// showloading('正在获取我的抽奖等级');
			// raffleAjax(function(datas){
				// hideloading();
				let data = {
					"surplus":1,
					"level":1,
				}
				// let drawLayer = new drawPage(data);
				// GameLayer.addChild(drawLayer);
			// },function(data){
				// hideloading();
				// LAlert(data.msg);
			// },this);
		}
	/**我的奖品 ----*/
		private myPrizeFun(){
			// playAudio("touchBtn",0);
		/**奖品列表形式 */
			// let prizeLayer = new LPrizePage();
			// GameLayer.addChild(prizeLayer);
			// LremoveChild(_THIS);
		/**弹窗形式 */
			// let tcLayer = new egret.Sprite();
			// tcLayer.touchEnabled = true;
			// GameLayer.addChild(tcLayer);

			// let tcShape = new egret.Shape();
			// tcLayer.addChild(tcShape);
			// tcShape.graphics.beginFill(0x000000);
			// tcShape.graphics.drawRect(0,0,gw,gh);
			// tcShape.graphics.endFill();
			// tcShape.alpha = 0.7;

			// let winLayer = new egret.Sprite();
			// tcLayer.addChild(winLayer);
			// winLayer.width =  gw;
			// winLayer.height = gh;
			// let myPrizeBg = createBitmapByName("noPrize_png");
			// winLayer.addChild(myPrizeBg);
			// myPrizeBg.x = gw/2 - GetWidth(myPrizeBg)/2;
			// myPrizeBg.y = gh*0.328;
			// //Ajax
			// showloading();
			// myPrizeAjax(function(data){
			// 	hideloading();
			// 	if(data.myPrizeList){
			// 		myPrizeBg.texture = RES.getRes("myPrizeBg_png");
			// 	}
			// },function(data){
			// 	hideloading();
			// },this);

			// let sureBtn = createBitmapByName("sureBtn_png");
			// winLayer.addChild(sureBtn);
			// BtnMode(sureBtn);
			// sureBtn.x = gw/2;
			// sureBtn.y = gh*0.733;
			// /**动画 */
			// winEnterAni(tcShape,winLayer,"scale01");
			// /**事件 */
			// sureBtn.once(egret.TouchEvent.TOUCH_TAP,closeFun,this);
			// removedListener(sureBtn,egret.TouchEvent.TOUCH_TAP,closeFun,this);
			// function closeFun(){
			// 	playAudio("touchBtn",0);
			// 	winCloseAni(tcShape,winLayer,"scale01",function(){
			// 		LremoveChild(tcLayer);
			// 	},this);
			// }

		}
	/**排行榜 ----*/
		private rankFun(){
			// playAudio("touchBtn",0);
			// let rankLayer = new LRankPage(1);
			// this.addChild(rankLayer);
		}
	/**打开规则 ----*/
		private ruleFun(){
			// playAudio("touchBtn",0);
			// let ruleLayer = new ruleView();
			// GameLayer.addChild(ruleLayer);
		}
	/**没机会了弹窗 ---- */
		private noChanceFun(){
			// let nochanceLayer = new egret.Sprite();
			// GameLayer.addChild(nochanceLayer);
			// nochanceLayer.touchEnabled = true;
			// noChanceObj = nochanceLayer;

			// let nochanceShape = new egret.Shape();
			// nochanceLayer.addChild(nochanceShape);
			// nochanceShape.graphics.beginFill(0x000000);
			// nochanceShape.graphics.drawRect(0,0,gw,gh);
			// nochanceShape.graphics.endFill();
			// nochanceShape.alpha = 0.2;

			// let winLayer = new egret.Sprite();
			// nochanceLayer.addChild(winLayer);

			// let winBg = createBitmapByName("noChance_png");
			// winLayer.addChild(winBg);
			// winBg.x = gw/2 - GetWidth(winBg)/2;
			// winBg.y = gh*0.32;


			// let shareBtn = createBitmapByName("shareBtn_png");
			// winLayer.addChild(shareBtn);
			// BtnMode(shareBtn);
			// shareBtn.x = gw/2;
			// shareBtn.y = gh*0.59;

			// winEnterAni(nochanceShape,winLayer,"scale01");

			// shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.shareFun,this);
			// removedListener(shareBtn,egret.TouchEvent.TOUCH_TAP,this.shareFun,this);
		}
	/**移除监听 */
		private removedFun(){

		}
	}
}

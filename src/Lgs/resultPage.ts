
declare var bestScore111:number;

module Lgs {
	export class resultPage extends egret.DisplayObjectContainer{
		public constructor(data,callBack?,thisObj?) {			
			super();
			this.resultData = data;
			if(callBack){
				this.callBack = callBack;
				this.thisObj = thisObj;
			}
			this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
			this.once(egret.Event.REMOVED_FROM_STAGE,this.removedFun,this);
		}
		private callBack;
		private thisObj;
		private resultData;
		private onAddToStage(){
			bgmViewer.show();
			let _THIS = this;
			this.touchEnabled = true;
		/**层级 背景 */
			let bgLayer = new egret.Sprite();
			this.addChild(bgLayer);
			let fgLayer = new egret.Sprite();
			this.addChild(fgLayer);
			let resultShape = new egret.Shape();
			bgLayer.addChild(resultShape);
			resultShape.graphics.beginFill(0x000000);
			resultShape.graphics.drawRect(0,0,gw,gh);
			resultShape.graphics.endFill();
			resultShape.alpha = 0.7;
			// let resultShape = createBitmapByName("resultBg_jpg");
			// bgLayer.addChild(resultShape);
			// resultShape.x = gw/2 - GetWidth(resultShape)/2;
		/**winLayer */
			let winLayer = new egret.Sprite();
			bgLayer.addChild(winLayer);
			winLayer.width = gw;
			winLayer.width = gh;
		/**其他-winLayer */
			let resultTitle = createBitmapByName("resultTitle_png");
			winLayer.addChild(resultTitle);
			resultTitle.x = gw/2 - GetWidth(resultTitle)/2;
			resultTitle.y = gh*0.112;
		
			let resultBg = createBitmapByName("resultBg_png");
			winLayer.addChild(resultBg);
			resultBg.x = gw/2 - GetWidth(resultBg)/2;
			resultBg.y = gh*0.238;
			/**头像 */
			let headLayer = new egret.Sprite();
			// let headIndex = listLayer.getChildIndex(listBg);
			// winLayer.addChildAt(headLayer,headIndex);
			winLayer.addChild(headLayer);
			let headFg = createBitmapByName("r_headFg_png");
			headFg.x = gw/2 - gh*0.19;
			headFg.y = gh*0.352;
			let headBg = createBitmapByName("r_headBg_png");
			// winLayer.addChild(headBg);
			headBg.x = gw/2 - gh*0.19;
			headBg.y = gh*0.352;
			// headBg.alpha = 0.2;
			winLayer.addChild(headFg);
			addBitmapByUrl(headBg.x,headBg.y,GetHeight(headBg),headLayer,$headImg,"headImg",headBg,function(result){
				winLayer.addChild(headBg);
				result.mask = headBg;
			},this);

			let bestScoreBg = createBitmapByName("bestScoreBg_png");
			winLayer.addChild(bestScoreBg);
			bestScoreBg.x = gw/2 - GetWidth(bestScoreBg)/2;
			bestScoreBg.y = gh*0.533;
      // 您的最佳排名
			let bestRankBg = createBitmapByName("bestRankBg_png");
			winLayer.addChild(bestRankBg);
			bestRankBg.x = gw/2 - GetWidth(bestRankBg)/2;
			bestRankBg.y = gh*0.653;
		/**textField */
			let currentScore = new egret.TextField();
			winLayer.addChild(currentScore);
			textScaleFun(currentScore,0.029);
			currentScore.bold = true;
			currentScore.textColor = 0xFA5C53;
			currentScore.text = this.resultData.score+"";
			currentScore.x = gw/2 + gh*0.1 - GetWidth(currentScore);
			currentScore.y = gh*0.453;
// 最佳成绩
			let bestScore = new egret.TextField();
			winLayer.addChild(bestScore);
			textScaleFun(bestScore,0.025);
			bestScore.bold = true;
			bestScore.textColor = 0xFA5C53;
			if(this.resultData.score>bestScore111) {
				bestScore111 = this.resultData.score;
			} 
			bestScore.text = bestScore111+"";
			bestScore.x = gw/2 -  GetWidth(bestScore)/2;
			bestScore.y = gh*0.589;
// 最佳排名
			let bestRank = new egret.TextField();
			winLayer.addChild(bestRank);
			textScaleFun(bestRank,0.025);
			bestRank.bold = true;
			bestRank.textColor = 0xFA5C53;
			bestRank.text = "NO."+this.resultData.bestRank;
			bestRank.x = gw/2 -  GetWidth(bestRank)/2;
			bestRank.y = gh*0.709;
		/**按钮 */
    // 再玩一次 黄色的
			let replayBtn = createBitmapByName("replayBtn_png");
			winLayer.addChild(replayBtn);
			BtnMode(replayBtn);
			replayBtn.x = gw/2 - gh*0.1;
			replayBtn.y = gh*0.825;
// 排行榜
			let rankBtn = createBitmapByName("rankBtn2_png");
			winLayer.addChild(rankBtn);
			BtnMode(rankBtn);
			rankBtn.x = gw/2 + gh*0.1;
			rankBtn.y = gh*0.825;
		/**事件 */
			replayBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,replayAniFun,this);
			removedListener(replayBtn,egret.TouchEvent.TOUCH_TAP,replayAniFun,this);
			rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.rankFun,this);
			removedListener(rankBtn,egret.TouchEvent.TOUCH_TAP,this.rankFun,this);

			function replayAniFun(){
				playAudio("touchBtn",0);
				winCloseAni(resultShape,winLayer,"scale21",function(){
					this.replayFun();
				},this);
			}
		/**动画 */
			winEnterAni(resultShape,winLayer,"scale01",function(){

			},this);
		}
	/**排行榜 */
		private rankFun(){
			playAudio("touchBtn",0);
			let rankLayer = new controlPage();
			this.addChild(rankLayer);
		}
	/**再来一次 */
		private replayFun(){
			LremoveChild(this);
			this.callBack.call(this.thisObj);	

			let homeLayer = new LHomePage();
			GameLayer.addChild(homeLayer);
		}
		private removedFun(){

		}
	}
}


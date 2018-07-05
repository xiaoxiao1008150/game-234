module Lgs {
	export class snowing extends egret.DisplayObjectContainer{
		public constructor() {
			super();

			this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
			this.once(egret.Event.REMOVED_FROM_STAGE,this.removedFun,this);
		}
		/**数量 */
		public csNums = 50;
		/**最小缩放大小 +1*/
		public scale1 = 0.4;
		/**最远距离 */
		public maxJuli = gh*0.55;
		/**最小下降速度 */
		public minSudu = gh*0.0015;
		/**最大下降速度 minSudu+maxSudu*/
		public maxSudu = gh*0.0035;
		/**x范围 */
		public csw = gw*0.9;		

		/**是否可以刮风 */
		public canWind = false;
		/**横向风速 */
		public windSpeed = 0;
		/**横向风速2  */
		public windSpeed2 = 0;
		/**刮风间隔 */
		public windCount = 3000;
		/**false 风速开始减小 */
		private windAdd = false;

		private onAddToStage(){
			let _THIS = this;
		/**层级 背景 */
			let bgLayer = new egret.Sprite();
			this.addChild(bgLayer);
			let fgLayer = new egret.Sprite();
			this.addChild(fgLayer);

			// let cddataArr = ["snow_png"];
			let cddataArr = ["cd1_png","cd2_png","cd3_png","cd4_png","cd5_png","cd6_png","cd7_png","cd8_png","cd9_png"];
			let cdsArr = [];
			for(let i=0;i<this.csNums;i++){
				let cdnum = Math.floor(Math.random()*cddataArr.length);
				let cds = createBitmapByName(cddataArr[cdnum]);
				bgLayer.addChild(cds);
				cds.scaleX = cds.scaleY = initScale*(this.scale1+Math.random());
				cds.rotation = Math.random()*180;
				// cds.x = (gw-this.csw)/2 + Math.random()*this.csw;
				// cds.y = -GetHeight(cds) - gh*0.1 + Math.random()*gh*0.5;
				cds.x = (gw-this.csw)/2 + Math.random()*this.csw;
				cds.y = -GetHeight(cds) - gh*0.1 + Math.random()*this.maxJuli;
				cds["speed2"] = Math.random()*this.maxSudu + this.minSudu;
				cds["r0"] = cds.rotation;
				cds["rr"] = 20+Math.random()*20;
				let rss = Math.floor(Math.random()*2);
				if(rss==0){
					cds["rs"] = 3;
				}else{
					cds["rs"] = -3;
				}
				cdsArr.push(cds);
			}

			if("boom"){
				this.addEventListener(egret.Event.ENTER_FRAME,onframe2,this);
				removedListener(this,egret.Event.ENTER_FRAME,onframe2,this);
				this["onframe"] = onframe2;
			}else{
				this.addEventListener(egret.Event.ENTER_FRAME,onframe,this);
				removedListener(this,egret.Event.ENTER_FRAME,onframe,this);
				this["onframe"] = onframe;
			}
			function onframe(){
				for(let i=0;i<cdsArr.length;i++){
					let thiscds = cdsArr[i];
					thiscds.y += thiscds["speed2"];
					thiscds.rotation += thiscds["rs"];
					if(thiscds.rotation>=thiscds["r0"]+thiscds["rr"]||thiscds.rotation<=thiscds["r0"]+thiscds["rr"]){
						thiscds["rr"] = -thiscds["rr"];
					}
				}
			/**随风而行 */
				if(this.canWind){
					/**风速改变 */
					if(!this.windAdd){
						for(let i=0;i<cdsArr.length;i++){
							let thiscds = cdsArr[i];
							if(thiscds["windSpeed"]>0){
								thiscds["windSpeed"]-=gh*0.0001;
							}else{
								thiscds["windSpeed"] = 0;
							}
						}				
					}
					/**随风速移动 */
					for(let i=0;i<cdsArr.length;i++){
						let thiscds = cdsArr[i];
						thiscds.x += thiscds["windSpeed"];
					}
				}
			/**暴风雪/滑雪前行 */
				if(this.windSpeed2!=0){
					/**随风速移动 */
					for(let i=0;i<cdsArr.length;i++){
						let thiscds = cdsArr[i];
						thiscds.x += this.windSpeed2/5*4 + this.windSpeed2/5*Math.random();
					}
				}
			/**snow循环 */
				for(let i=0;i<cdsArr.length;i++){
					let thiscds = cdsArr[i];
					if(thiscds.y>this.maxJuli){
						egret.Tween.get(thiscds).to({alpha:0},500).call(function(){
							addCDS.call(this,thiscds);
						},this);
					}
				}
			}
			function onframe2(){
				for(let i=0;i<cdsArr.length;i++){
					let thiscds = cdsArr[i];
					thiscds.y += thiscds["speed2"]*1.5;
					thiscds.rotation += thiscds["rs"];
					if(thiscds.rotation>=thiscds["r0"]+thiscds["rr"]||thiscds.rotation<=thiscds["r0"]+thiscds["rr"]){
						thiscds["rr"] = -thiscds["rr"];
					}
				}
			/**snow循环 */
				for(let i=0;i<cdsArr.length;i++){
					let thiscds = cdsArr[i];
					if(thiscds.y>this.maxJuli){
						egret.Tween.get(thiscds).to({alpha:0},500);
					}
				}
			}

			function addCDS(thisCDS:egret.Bitmap){
				let cdnum = Math.floor(Math.random()*cddataArr.length);
				// let thisCDS = createBitmapByName(cddataArr[cdnum]);
				thisCDS.texture = RES.getRes(cddataArr[cdnum]);
				// bgLayer.addChild(thisCDS);
				thisCDS.scaleX = thisCDS.scaleY = initScale*(this.scale1+Math.random());
				thisCDS.rotation = Math.random()*180;
				thisCDS.x = (gw-this.csw)/2 + Math.random()*this.csw;
				thisCDS.y = -GetHeight(thisCDS)*2;
				thisCDS["speed2"] = Math.random()*this.maxSudu + this.minSudu;
				thisCDS["r0"] = thisCDS.rotation;
				thisCDS["rr"] = 20+Math.random()*20;
				let rss = Math.floor(Math.random()*2);
				if(rss==0){
					thisCDS["rs"] = 3;
				}else{
					thisCDS["rs"] = -3;
				}
				thisCDS.alpha = 1;
				// cdsArr.push(thisCDS);
			}
		/**刮风 Test_v1.0 */
			if(this.canWind){
				egret.setTimeout(windFun,this,this.windCount);
			}
			this['winFun'] = windFun;
			function windFun(){
				let rnum = parseInt(Math.random()*2+"");
				if(rnum==1){
					this.windSpeed = -gh*Math.random()*0.003;
				}else{
					this.windSpeed = gh*Math.random()*0.003;
				}

				for(let i=0;i<cdsArr.length;i++){
					let thiscds = cdsArr[i];
					thiscds["windSpeed"] = this.windSpeed;
				}

				this.windAdd = true;
				egret.setTimeout(function(){
					this.windSpeed = 0;
					this.windAdd = false;

					/**计算下一次刮风 */
					if(this.isPlay){
						this.windCount = (6000+Math.random()*3000);
						egret.setTimeout(windFun,this,this.windCount);	
					}
				},this,3000);
			}
		/**刮风 Test END*/
		}
	/**默认播放 */
		private isPlay = true;
	/**开始 */
		public play(){
			if(!this.isPlay){
				this.isPlay = true;
				this.addEventListener(egret.Event.ENTER_FRAME,this["onframe"],this);
				if(this.canWind){
					this.windCount = (6000+Math.random()*3000);
					egret.setTimeout(this['winFun'],this,this.windCount);
				}
			}
		}
	/**暂停 */
		public pause(){
			if(this.isPlay){
				this.isPlay = false;
				this.removeEventListener(egret.Event.ENTER_FRAME,this["onframe"],this);
			}
		}
	/**移除后 */
		private removedFun(){
			this.removeEventListener(egret.Event.ENTER_FRAME,this["onframe"],this);
		}
	}
}


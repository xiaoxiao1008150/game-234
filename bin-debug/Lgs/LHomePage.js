var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lgs;
(function (Lgs) {
    var LHomePage = (function (_super) {
        __extends(LHomePage, _super);
        function LHomePage() {
            var _this = _super.call(this) || this;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.once(egret.Event.REMOVED_FROM_STAGE, _this.removedFun, _this);
            return _this;
        }
        LHomePage.prototype.onAddToStage = function () {
            bgmViewer.show();
            var _THIS = this;
            this.touchEnabled = true;
            /**层级 背景 */
            var bgLayer = new egret.Sprite();
            this.addChild(bgLayer);
            var cloudLayer = new egret.Sprite();
            this.addChild(cloudLayer);
            var bodysLayer = new egret.Sprite();
            this.addChild(bodysLayer);
            var fgLayer = new egret.Sprite();
            this.addChild(fgLayer);
            var homebg = Lgs.createBitmapByName("homeBg_jpg");
            bgLayer.addChild(homebg);
            homebg.x = gw / 2 - Lgs.GetWidth(homebg) / 2;
            /**其他元件 */
            var homeTitle = Lgs.createBitmapByName("homeTitle_png");
            fgLayer.addChild(homeTitle);
            homeTitle.x = gw / 2 - Lgs.GetWidth(homeTitle) / 2;
            homeTitle.y = gh * 0.103;
            var p1_logo = Lgs.createBitmapByName("p1_logo_png");
            fgLayer.addChild(p1_logo);
            p1_logo.x = pw_sx + gh * 0.022;
            p1_logo.y = gh * 0.027;
            /**云 */
            // let cloud1 = createBitmapByName("cloud1_png");
            // bgLayer.addChild(cloud1);
            // cloud1.x = gw/2 - GetWidth(cloud1)/2;
            // cloud1.y = gh*0.35;
            var clouddataArr = ["cloud1_png", "cloud3_png", "cloud2_png", "cloud3_png"];
            var cloudArr = [];
            for (var i = 0; i < clouddataArr.length; i++) {
                var cloud1 = Lgs.createBitmapByName(clouddataArr[i]);
                if (clouddataArr[i] == "cloud3_png") {
                    bgLayer.addChild(cloud1);
                }
                else {
                    cloudLayer.addChild(cloud1);
                }
                cloud1.x = gw * 0.2 * (i + 1);
                cloud1.y = gh * 0.3 + gh * Math.random() * 0.15;
                cloudArr.push(cloud1);
            }
            bgLayer.addEventListener(egret.Event.ENTER_FRAME, onframe, this);
            Lgs.removedListener(bgLayer, egret.Event.ENTER_FRAME, onframe, this);
            function onframe() {
                for (var i = 0; i < cloudArr.length; i++) {
                    var cloud1 = cloudArr[i];
                    cloud1.x -= gh * 0.0004 * (cloud1.width / 127);
                }
                for (var i = 0; i < cloudArr.length; i++) {
                    var cloud1 = cloudArr[i];
                    if (cloud1.x < pw_sx - Lgs.GetWidth(cloud1)) {
                        cloud1.x = gw - pw_sx;
                        cloud1.y = gh * 0.3 + gh * Math.random() * 0.15;
                    }
                }
            }
            /**云 */
            var p1_sun = Lgs.createBitmapByName("p1_sun_png");
            bgLayer.addChild(p1_sun);
            p1_sun.x = gw / 2 - Lgs.GetWidth(p1_sun) / 2;
            p1_sun.y = gh * 0.45;
            var p1_cloud1 = Lgs.createBitmapByName("p1_cloud1_png");
            bgLayer.addChild(p1_cloud1);
            p1_cloud1.x = gw / 2 - Lgs.GetWidth(p1_cloud1) / 2;
            p1_cloud1.y = gh * 0.453;
            var p1_cloud2 = Lgs.createBitmapByName("p1_cloud2_png");
            bgLayer.addChild(p1_cloud2);
            p1_cloud2.x = gw / 2 - Lgs.GetWidth(p1_cloud2) / 2;
            p1_cloud2.y = gh * 0.495;
            var p1_tower = Lgs.createBitmapByName("p1_tower_png");
            bgLayer.addChild(p1_tower);
            p1_tower.x = gw / 2 - Lgs.GetWidth(p1_tower) / 2;
            p1_tower.y = gh - Lgs.GetHeight(p1_tower);
            var p1_bird = Lgs.createBitmapByName("p1_bird_png");
            bgLayer.addChild(p1_bird);
            p1_bird.x = gw / 2 - gh * 0.095;
            p1_bird.y = gh * 0.533;
            /**按钮 */
            this.startBtn = Lgs.createBitmapByName("startBtn_png");
            fgLayer.addChild(this.startBtn);
            Lgs.BtnMode(this.startBtn);
            this.startBtn.x = gw / 2;
            this.startBtn.y = gh * 0.93;
            this.rankBtn = Lgs.createBitmapByName("rankBtn_png");
            fgLayer.addChild(this.rankBtn);
            Lgs.BtnMode(this.rankBtn);
            this.rankBtn.x = gw / 2 + gh * 0.045;
            this.rankBtn.y = gh * 0.492;
            /**动画 */
            Lgs.BtnMode(homeTitle, true);
            homeTitle.scaleX = homeTitle.scaleY = 0;
            egret.Tween.get(homeTitle).wait(300).to({ scaleX: initScale, scaleY: initScale }, 500, egret.Ease.backOut);
            var p1_towery = p1_tower.y;
            p1_tower.y = gh * 0.5;
            egret.Tween.get(p1_tower).to({ y: p1_towery }, 1000, egret.Ease.quadOut);
            this.rankBtn.scaleX = this.rankBtn.scaleY = 0;
            egret.Tween.get(this.rankBtn).wait(400).to({ scaleX: initScale, scaleY: initScale }, 500, egret.Ease.backOut);
            this.startBtn.scaleX = this.startBtn.scaleY = 0;
            egret.Tween.get(this.startBtn).wait(500).to({ scaleX: initScale, scaleY: initScale }, 500, egret.Ease.backOut).call(function () {
                Lgs.removedTweens(this.startBtn);
                egret.Tween.get(this.startBtn, { loop: true })
                    .to({ scaleX: initScale * 1.1, scaleY: initScale * 1.1 }, 150)
                    .to({ scaleX: initScale * 1, scaleY: initScale * 1 }, 250)
                    .to({ scaleX: initScale * 1.1, scaleY: initScale * 1.1 }, 150)
                    .to({ scaleX: initScale * 1, scaleY: initScale * 1 }, 250)
                    .to({ scaleX: initScale * 1.1, scaleY: initScale * 1.1 }, 150)
                    .to({ scaleX: initScale * 1, scaleY: initScale * 1 }, 250).wait(1500);
            }, this);
            var suny = p1_sun.y;
            var cloud1y = p1_cloud1.y;
            var cloud2y = p1_cloud2.y;
            p1_sun.y = gh;
            p1_sun.alpha = 0;
            p1_cloud1.y = gh;
            p1_cloud2.y = gh;
            egret.Tween.get(p1_cloud2).wait(100).to({ y: cloud2y }, 700, egret.Ease.quadOut);
            egret.Tween.get(p1_cloud1).wait(200).to({ y: cloud1y }, 800, egret.Ease.quadOut);
            egret.Tween.get(p1_sun).wait(300).to({ alpha: 1, y: suny }, 900, egret.Ease.quadOut);
            var birdx = p1_bird.x;
            var birdy = p1_bird.y;
            p1_bird.x = 0;
            p1_bird.y = gh * 0.75;
            egret.Tween.get(p1_bird).to({ x: birdx, y: birdy }, 500, egret.Ease.quadOut).call(function () {
                Lgs.removedTweens(p1_bird);
                egret.Tween.get(p1_bird, { loop: true })
                    .to({ x: birdx - gh * 0.01, y: birdy + gh * 0.01 }, 800)
                    .to({ x: birdx, y: birdy }, 800);
            }, this);
            /**事件监听 */
            this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startFun, this);
            Lgs.removedListener(this.startBtn, egret.TouchEvent.TOUCH_TAP, this.startFun, this);
            this.rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rankFun2, this);
            Lgs.removedListener(this.rankBtn, egret.TouchEvent.TOUCH_TAP, this.rankFun2, this);
            /**forTest */
            // this.rankFun2();
        };
        LHomePage.prototype.rankFun2 = function () {
            playAudio("touchBtn", 0);
            var controlLayer = new Lgs.controlPage();
            GameLayer.addChild(controlLayer);
        };
        /**开始游戏 */
        LHomePage.prototype.startFun = function (evt) {
            playAudio("touchBtn", 0);
            var sbx = evt.stageX;
            var sby = evt.stageY;
            var _THIS = this;
            if (IsActivityEnd) {
            }
            else {
                Lgs.showloading();
                startGameAjax(function (data) {
                    Lgs.hideloading();
                    var startData = {
                        'sbx': sbx,
                        'sby': sby,
                        'gameCode': Number(data.gameCode)
                    };
                    var GameContainerLayer = new Lgs.GameContainer(startData);
                    GameLayer.addChild(GameContainerLayer);
                    Lgs.LremoveChild(_THIS);
                }, function (data) {
                    Lgs.hideloading();
                    Lgs.LAlert(data.msg);
                }, this);
            }
        };
        /**去抽奖 ----*/
        LHomePage.prototype.toDrawFun = function () {
            // playAudio("touchBtn",0);
            // Ajax
            // showloading('正在获取我的抽奖等级');
            // raffleAjax(function(datas){
            // hideloading();
            var data = {
                "surplus": 1,
                "level": 1,
            };
            // let drawLayer = new drawPage(data);
            // GameLayer.addChild(drawLayer);
            // },function(data){
            // hideloading();
            // LAlert(data.msg);
            // },this);
        };
        /**我的奖品 ----*/
        LHomePage.prototype.myPrizeFun = function () {
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
        };
        /**排行榜 ----*/
        LHomePage.prototype.rankFun = function () {
            // playAudio("touchBtn",0);
            // let rankLayer = new LRankPage(1);
            // this.addChild(rankLayer);
        };
        /**打开规则 ----*/
        LHomePage.prototype.ruleFun = function () {
            // playAudio("touchBtn",0);
            // let ruleLayer = new ruleView();
            // GameLayer.addChild(ruleLayer);
        };
        /**没机会了弹窗 ---- */
        LHomePage.prototype.noChanceFun = function () {
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
        };
        /**移除监听 */
        LHomePage.prototype.removedFun = function () {
        };
        return LHomePage;
    }(egret.DisplayObjectContainer));
    Lgs.LHomePage = LHomePage;
    __reflect(LHomePage.prototype, "Lgs.LHomePage");
})(Lgs || (Lgs = {}));
//# sourceMappingURL=LHomePage.js.map
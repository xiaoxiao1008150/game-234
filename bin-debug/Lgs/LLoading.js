var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var htmlResnum = 5;
var Lgs;
(function (Lgs) {
    var LLoading = (function (_super) {
        __extends(LLoading, _super);
        function LLoading() {
            var _this = _super.call(this) || this;
            /** 进度条样式是否加载完成 */
            _this.jdtiao_ok = false;
            _this.loadsArr = [];
            return _this;
        }
        LLoading.prototype.setProgress = function (current, total, text) {
            if (this.jdtiao_ok) {
                this.loadText.text = Math.floor(current / total * 100) + "%";
                // this.loadText.x = gw/2 + gh*0.18;
                // this.loadAni.x = this.jdtiao.x + GetWidth(this.jdtiao) - GetWidth(this.loadAni)/2;
                // this.jdtiao.x = gw/2 - GetWidth(this.jdtiao)/2 - GetWidth(this.jdtiao) + GetWidth(this.jdtiao)*current/total;
                // this.jdtiao.x = gw/2 - GetWidth(this.jdbg)/2 - 1 - GetWidth(this.jdtiao) + GetWidth(this.jdtiao)*current/total;
                this.loadAni.x = this.zhezhao.x + Lgs.GetWidth(this.zhezhao) + Lgs.GetWidth(this.loadAni) / 2 - gh * 0.045;
                this.zhezhao.x = gw / 2 - Lgs.GetWidth(this.zhezhao) / 2 - Lgs.GetWidth(this.zhezhao) + Lgs.GetWidth(this.zhezhao) * current / total;
            }
        };
        /** 进度样式创建 */
        LLoading.prototype.createLoading = function () {
            this.touchEnabled = true;
            $gameStage = this.stage;
            /**横屏提示 */
            // uprightTipsLayer = Lgs.uprightTipsFun();
            // this.stage.addChild(uprightTipsLayer);
            // uprightTipsLayer.rotation = 90;
            // uprightTipsLayer.x = gh;
            // uprightTipsLayer.visible = false;
            // if(window.innerWidth<window.innerHeight){
            // 	uprightTipsLayer.visible = false;
            // }
            /**bg */
            // let loadShape = new egret.Shape();
            // this.addChild(loadShape);
            // loadShape.graphics.beginFill(0xffffff);
            // loadShape.graphics.drawRect(0,0,gw,gh);
            // loadShape.graphics.endFill();
            var loadBg = Lgs.createBitmapByName("loadBg_jpg");
            this.addChild(loadBg);
            loadBg.x = gw / 2 - Lgs.GetWidth(loadBg) / 2;
            loadBg.y = gh / 2 - Lgs.GetHeight(loadBg) / 2;
            var loadingText = Lgs.createBitmapByName("loadText_png");
            this.addChild(loadingText);
            loadingText.x = gw / 2 - Lgs.GetWidth(loadingText) / 2 + gh * 0.02;
            loadingText.y = gh * 0.575;
            // let loadingText = new egret.TextField();
            // this.addChild(loadingText);
            // textScaleFun(loadingText,0.018);
            // loadingText.text = "正在加载中...";
            // loadingText.x = gw/2 - GetWidth(loadingText)/2;
            // loadingText.y = gh*0.66;
            /**gameslogo */
            // let gamelogo = createBitmapByName("loadLogo_png");
            // this.addChild(gamelogo);
            // gamelogo.x = gw/2 - GetWidth(gamelogo)/2;
            // gamelogo.y = gh*0.175;
            /**圆圈进度条 */
            // let jdLayer = new egret.Sprite();
            // this.addChild(jdLayer);
            // jdLayer.y = gh*0.4;
            // this.jdbg = createBitmapByName("jdbg_png");
            // this.jdbg.anchorOffsetX = this.jdbg.width/2;
            // this.jdbg.anchorOffsetY = this.jdbg.height/2;
            // jdLayer.addChild(this.jdbg);
            // this.jdbg.x = gw/2;
            // // this.jdtiao = createBitmapByName("jdfg_png");
            // // this.jdtiao.anchorOffsetX = this.jdtiao.width/2;
            // // this.jdtiao.anchorOffsetY = this.jdtiao.height/2;
            // // jdLayer.addChild(this.jdtiao);
            // // this.jdtiao.x = gw/2;
            // this.arcShape = new egret.Shape();
            // jdLayer.addChild(this.arcShape);
            // this.arcShape.x = gw/2;
            // this.arcShape.rotation = -90;
            /**图片进度条 */
            var jdLayer = new egret.Sprite();
            this.addChild(jdLayer);
            jdLayer.y = gh * 0.91;
            this.jdbg = Lgs.createBitmapByName("jdbg_png");
            jdLayer.addChild(this.jdbg);
            this.jdbg.x = gw / 2 - Lgs.GetWidth(this.jdbg) / 2;
            this.jdtiao = Lgs.createBitmapByName("jdfg_png");
            jdLayer.addChild(this.jdtiao);
            // this.jdtiao.x = gw/2 - GetWidth(this.jdtiao)/2;
            this.jdtiao.x = this.jdbg.x - 1;
            this.jdtiao.y = this.jdbg.y;
            this.zhezhao = Lgs.createBitmapByName("jdfg_png");
            jdLayer.addChild(this.zhezhao);
            this.zhezhao.x = this.jdtiao.x;
            this.zhezhao.y = this.jdtiao.y;
            this.jdtiao.mask = this.zhezhao;
            /**图片进度条 width5 length */
            // let jdLayer = new egret.Sprite();
            // this.addChild(jdLayer);
            // jdLayer.y = gh*0.435;
            // for(let i=0;i<5;i++){
            // 	let loadChicken = createBitmapByName("loadChicken_png");
            // 	jdLayer.addChild(loadChicken);
            // 	loadChicken.x = gw/2 - GetWidth(loadChicken)/2 - GetWidth(loadChicken)*2 + GetWidth(loadChicken)*i;
            // 	loadChicken.alpha = 0;
            // 	this.loadsArr.push(loadChicken);
            // }
            /**进度条动画MovieClip */
            var mcDataFactory = new egret.MovieClipDataFactory(RES.getRes("loadAni_json"), RES.getRes("loadAni_png"));
            this.loadAni = new egret.MovieClip(mcDataFactory.generateMovieClipData("loadAni"));
            jdLayer.addChild(this.loadAni);
            // this.addChild(this.loadAni);
            this.loadAni.scaleX = initScale * -1;
            this.loadAni.scaleY = initScale;
            this.loadAni.anchorOffsetX = this.loadAni.width / 2;
            this.loadAni.anchorOffsetY = this.loadAni.height / 2;
            this.loadAni.x = this.jdtiao.x + Lgs.GetWidth(this.jdtiao) - Lgs.GetWidth(this.loadAni) / 2;
            this.loadAni.y = this.jdtiao.y - Lgs.GetHeight(this.loadAni) / 2;
            this.loadAni.gotoAndPlay("run", -1);
            Lgs.removedTweens(this.loadAni);
            var loadAniy = this.loadAni.y;
            egret.Tween.get(this.loadAni, { loop: true })
                .to({ y: loadAniy - gh * 0.015 }, 500)
                .to({ y: loadAniy }, 500);
            /**进度条动画bitmap */
            // this.loadAni = createBitmapByName("loadAni_png");
            // jdLayer.addChild(this.loadAni);
            // this.loadAni.anchorOffsetX = this.loadAni.width/2;
            // this.loadAni.anchorOffsetY = this.loadAni.height/2;
            // this.loadAni.x = this.jdtiao.x + GetWidth(this.jdtiao) - GetWidth(this.loadAni)/2;
            // this.loadAni.y = this.jdtiao.y + GetHeight(this.jdtiao)/2;
            // let loadAniy = this.loadAni.y;
            // egret.Tween.get(this.loadAni,{loop:true})
            // .to({y:loadAniy - gh*0.03},500)
            // .to({y:loadAniy},500);
            // this.loadAni.addEventListener(egret.Event.ENTER_FRAME,loadOnframe,this);
            // removedFromStage(this.loadAni,false,[loadOnframe,this]);
            // let _THIS = this;
            // function loadOnframe(){
            // 	_THIS.loadAni.rotation += 3;
            // }
            /**纯色进度条 */
            // let jdLayer = new egret.Sprite();
            // this.addChild(jdLayer);
            // jdLayer.y = gh*0.61;
            // this.jdbg = new egret.Shape();
            // jdLayer.addChild(this.jdbg);
            // this.jdbg.graphics.beginFill(0x185A8A);
            // this.jdbg.graphics.drawRoundRect(0,0,gh*0.36,gh*0.02,gh*0.02);
            // this.jdbg.graphics.endFill();
            // this.jdbg.x = gw/2 - GetWidth(this.jdbg)/2;
            // this.jdbg.y = 0;
            // this.jdtiao = new egret.Shape();
            // jdLayer.addChild(this.jdtiao);
            // this.jdtiao.graphics.beginFill(0xffffff);
            // // this.jdtiao.graphics.drawRoundRect(0,0,gh*0.36-gh*0.006,gh*0.02-gh*0.006,gh*0.02-gh*0.006);
            // this.jdtiao.graphics.drawRoundRect(0,0,gh*0.36,gh*0.02,gh*0.02);
            // this.jdtiao.graphics.endFill();
            // // this.jdtiao.x = this.jdbg.x + gh*0.003;
            // // this.jdtiao.y = this.jdbg.y + gh*0.003;
            // this.jdtiao.x = this.jdbg.x;
            // this.jdtiao.y = this.jdbg.y;
            // this.zhezhao = new egret.Shape();
            // jdLayer.addChild(this.zhezhao);
            // this.zhezhao.graphics.beginFill(0xffffff);
            // // this.zhezhao.graphics.drawRoundRect(0,0,gh*0.36-gh*0.006,gh*0.02-gh*0.006,gh*0.02-gh*0.006);
            // this.zhezhao.graphics.drawRoundRect(0,0,gh*0.36,gh*0.02,gh*0.02);
            // this.zhezhao.graphics.endFill();
            // this.zhezhao.x = this.jdtiao.x;
            // this.zhezhao.y = this.jdtiao.y;
            // this.jdtiao.mask = this.zhezhao;
            /**loadingAni or notAni*/
            // let loadingDataFactory = new egret.MovieClipDataFactory(RES.getRes("loading_json"),RES.getRes("loading_png"));
            // let loadingAni = new egret.MovieClip(loadingDataFactory.generateMovieClipData("loading"));
            // this.addChild(loadingAni);
            // loadingAni.scaleX = loadingAni.scaleY = initScale;
            // loadingAni.gotoAndStop(3);
            // loadingAni.x = gw/2 - GetWidth(loadingAni)/2;;
            // loadingAni.y = gh*0.73;
            // loadingAni.gotoAndPlay("run",-1);
            /**进度字体 */
            this.loadText = new egret.TextField();
            Lgs.textScaleFun(this.loadText, 0.038);
            this.addChild(this.loadText);
            this.loadText.text = 36 + "%";
            this.loadText.textColor = 0xffffff;
            this.loadText.stroke = 3;
            this.loadText.strokeColor = 0x8E4906;
            this.loadText.fontFamily = "黑体";
            // this.loadText.bold = true;
            this.loadText.x = gw / 2 - Lgs.GetWidth(this.loadText) / 2;
            this.loadText.y = gh * 0.645;
            /**进度字体 特殊字体 */
            // this.loadText = new egret.BitmapText();
            // this.loadText.font = RES.getRes('perNum_fnt');
            // this.addChild(this.loadText);
            // this.loadText.text  = 0+"%";
            // scaleFun(this.loadText,0.038);			
            // this.loadText.x = gw/2 - GetWidth(this.loadText)/2;
            // this.loadText.y = gh*0.63;
            /**进度条样式加载完成 */
            this.jdtiao_ok = true;
        };
        LLoading.prototype.drawAecShape = function (angle) {
            angle = angle % 361;
            this.arcShape.graphics.clear();
            this.arcShape.graphics.lineStyle(gh * 0.015, 0xffffff, 1);
            this.arcShape.graphics.drawArc(0, 0, Lgs.GetWidth(this.jdbg) / 2 - gh * 0.014, 0, angle * Math.PI / 180, false);
            this.arcShape.graphics.endFill();
            // this.jdbg.mask = this.arcShape;
        };
        /**移除loadUI时执行 */
        LLoading.prototype.RemovedFun = function () {
        };
        return LLoading;
    }(egret.Sprite));
    Lgs.LLoading = LLoading;
    __reflect(LLoading.prototype, "Lgs.LLoading");
})(Lgs || (Lgs = {}));
//# sourceMappingURL=LLoading.js.map
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
    var ruleView = (function (_super) {
        __extends(ruleView, _super);
        function ruleView(callback, thisObj) {
            var _this = _super.call(this) || this;
            _this.callback = false;
            _this.thisObj = false;
            if (callback) {
                _this.callback = callback;
                _this.thisObj = thisObj;
            }
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.once(egret.Event.REMOVED_FROM_STAGE, _this.removedFun, _this);
            return _this;
        }
        ruleView.prototype.onAddToStage = function () {
            var _THIS = this;
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
            var winLayer = new egret.Sprite();
            this.addChild(winLayer);
            winLayer.width = gw;
            winLayer.height = gh;
            /**ruleBox */
            var ruleBox = Lgs.createBitmapByName("ruleBox_png");
            winLayer.addChild(ruleBox);
            ruleBox.x = gw / 2 - Lgs.GetWidth(ruleBox) / 2;
            ruleBox.y = gh * 0.435;
            /**其他 */
            // let ruleTitle = createBitmapByName("ruleTitle_png");
            // winLayer.addChild(ruleTitle);
            // ruleTitle.scaleX = ruleTitle.scaleY = initScale;
            // ruleTitle.x = gw/2 - GetWidth(ruleTitle)/2;
            // ruleTitle.y = gh*0.04;
            var slideView = Lgs.createBitmapByName("slideView_png");
            winLayer.addChild(slideView);
            slideView.x = gw / 2 - Lgs.GetWidth(slideView) / 2;
            slideView.y = gh * 0.931;
            var slidey = slideView.y;
            Lgs.removedTweens(slideView);
            egret.Tween.get(slideView, { loop: true })
                .to({ y: slidey + gh * 0.01 }, 400)
                .to({ y: slidey }, 200);
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
            var ruleView = new egret.Sprite();
            // winLayer.addChild(ruleView);
            var ruleShape = new egret.Shape();
            ruleView.addChild(ruleShape);
            var rules = Lgs.createBitmapByName("rules_png");
            ruleView.addChild(rules);
            rules.y = gh * 0.02;
            /**二维码模式 */
            // let ruleQr = createBitmapByName("QR_png");
            // ruleView.addChild(ruleQr);
            // ruleQr.x = GetWidth(rules)/2 - GetWidth(ruleQr)/2;
            // ruleQr.y = gh*0.675;
            ruleShape.graphics.beginFill(0x000000);
            // ruleShape.graphics.drawRect(0,0,GetWidth(rules),GetHeight(rules)+gh*0.04);
            ruleShape.graphics.drawRect(0, 0, Lgs.GetWidth(rules), rules.y + Lgs.GetHeight(rules) + gh * 0.14);
            ruleShape.graphics.endFill();
            ruleShape.alpha = 0;
            var scrollView = new egret.ScrollView();
            winLayer["scrollView"] = scrollView;
            winLayer.addChild(scrollView);
            scrollView.setContent(ruleView);
            scrollView.width = Lgs.GetWidth(ruleView);
            scrollView.height = gh * 0.48;
            scrollView.x = gw / 2 - Lgs.GetWidth(scrollView) / 2;
            scrollView.y = gh * 0.45;
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
        };
        /**移除/退出本界面 */
        ruleView.prototype.removedFun = function () {
            if (this.callback) {
                this.callback.call(this.thisObj);
            }
        };
        return ruleView;
    }(egret.DisplayObjectContainer));
    Lgs.ruleView = ruleView;
    __reflect(ruleView.prototype, "Lgs.ruleView");
})(Lgs || (Lgs = {}));
//# sourceMappingURL=ruleView.js.map
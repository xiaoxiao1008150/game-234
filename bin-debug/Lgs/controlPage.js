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
    var controlPage = (function (_super) {
        __extends(controlPage, _super);
        function controlPage() {
            var _this = _super.call(this) || this;
            _this.viewType = "rule";
            _this.viewLayer = false;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.once(egret.Event.REMOVED_FROM_STAGE, _this.removedFun, _this);
            return _this;
        }
        controlPage.prototype.onAddToStage = function () {
            this.touchEnabled = true;
            var bgLayer = new egret.Sprite();
            this.addChild(bgLayer);
            var thisBg = Lgs.createBitmapByName("controlBg_jpg");
            bgLayer.addChild(thisBg);
            thisBg.x = gw / 2 - Lgs.GetWidth(thisBg) / 2;
            var winLayer = new egret.Sprite();
            bgLayer.addChild(winLayer);
            winLayer.width = gw;
            winLayer.height = gh;
            /**按钮 */
            var backBtn = Lgs.createBitmapByName("backBtn_png");
            winLayer.addChild(backBtn);
            backBtn.x = pw_sx + gh * 0.01;
            backBtn.y = gh * 0.015;
            Lgs.BtnMode(backBtn);
            /**控制按钮们 */
            var btnBg = Lgs.createBitmapByName("btnBg_png");
            winLayer.addChild(btnBg);
            btnBg.x = gw / 2 - Lgs.GetWidth(btnBg) / 2;
            btnBg.y = gh * 0.35;
            var ruleBtn = Lgs.createBitmapByName("ruleControl_png");
            winLayer.addChild(ruleBtn);
            ruleBtn.x = btnBg.x;
            ruleBtn.y = btnBg.y;
            var rankBtn = Lgs.createBitmapByName("rankControl_png");
            winLayer.addChild(rankBtn);
            rankBtn.x = ruleBtn.x + Lgs.GetWidth(ruleBtn) - 2;
            rankBtn.y = btnBg.y;
            var descBtn = Lgs.createBitmapByName("descControl_png");
            winLayer.addChild(descBtn);
            descBtn.x = rankBtn.x + Lgs.GetWidth(descBtn);
            descBtn.y = btnBg.y;
            Lgs.BtnMode(ruleBtn);
            Lgs.BtnMode(rankBtn);
            Lgs.BtnMode(descBtn);
            ruleBtn["pType"] = "rule";
            rankBtn["pType"] = "rank";
            descBtn["pType"] = "desc";
            ruleBtn.alpha = 0;
            rankBtn.alpha = 0;
            descBtn.alpha = 0;
            /** */
            var defaultView = ruleBtn;
            defaultView.alpha = 1;
            /**事件 */
            ruleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, changePageFun, this);
            rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, changePageFun, this);
            descBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, changePageFun, this);
            Lgs.removedListener(ruleBtn, egret.TouchEvent.TOUCH_TAP, changePageFun, this);
            Lgs.removedListener(rankBtn, egret.TouchEvent.TOUCH_TAP, changePageFun, this);
            Lgs.removedListener(descBtn, egret.TouchEvent.TOUCH_TAP, changePageFun, this);
            function changePageFun(evt) {
                playAudio("touchBtn", 0);
                var evtView = evt.currentTarget;
                ruleBtn.alpha = 0;
                rankBtn.alpha = 0;
                descBtn.alpha = 0;
                evtView.alpha = 1;
                if (evtView["pType"] == "rule" && this.viewType != "rule") {
                    this.viewType = "rule";
                    ruleFun.call(this);
                }
                else if (evtView["pType"] == "rank" && this.viewType != "rank") {
                    this.viewType = "rank";
                    rankFun.call(this);
                }
                else if (evtView["pType"] == "desc" && this.viewType != "desc") {
                    this.viewType = "desc";
                    descFun.call(this);
                }
            }
            function ruleFun() {
                Lgs.LremoveChild(this.viewLayer);
                var ruleLayer = new Lgs.ruleView();
                this.addChild(ruleLayer);
                this.viewLayer = ruleLayer;
            }
            function rankFun() {
                Lgs.LremoveChild(this.viewLayer);
                var rankLayer = new Lgs.LRankPage();
                this.addChild(rankLayer);
                this.viewLayer = rankLayer;
            }
            function descFun() {
                Lgs.LremoveChild(this.viewLayer);
                var descLayer = this.descLayerFun();
                this.addChild(descLayer);
                this.viewLayer = descLayer;
            }
            ruleFun.call(this);
            // rankFun.call(this);
            // descFun.call(this);
            // winEnterAni(thisBg,winLayer,"scale01");
            backBtn.once(egret.TouchEvent.TOUCH_TAP, function () {
                playAudio("touchBtn", 0);
                // winCloseAni(thisBg,winLayer,"scale01",function(){
                Lgs.LremoveChild(this);
                // },this);
            }, this);
        };
        controlPage.prototype.descLayerFun = function () {
            var layer = new egret.Sprite();
            Lgs.setQRposition(0, 0.531, "21.2%", true);
            var qrDesc = Lgs.createBitmapByName("qrDesc_png");
            layer.addChild(qrDesc);
            qrDesc.x = gw / 2 - Lgs.GetWidth(qrDesc) / 2;
            qrDesc.y = gh * 0.8;
            layer.once(egret.Event.REMOVED_FROM_STAGE, function () {
                Lgs.setQRposition(0, 0.531, "21.2%", false);
            }, this);
            return layer;
        };
        controlPage.prototype.removedFun = function () {
            Lgs.setQRposition(0, 0.531, "21.2%", false);
        };
        return controlPage;
    }(egret.DisplayObjectContainer));
    Lgs.controlPage = controlPage;
    __reflect(controlPage.prototype, "Lgs.controlPage");
})(Lgs || (Lgs = {}));
//# sourceMappingURL=controlPage.js.map
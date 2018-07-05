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
    var zhuliPage = (function (_super) {
        __extends(zhuliPage, _super);
        function zhuliPage() {
            var _this = _super.call(this) || this;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.once(egret.Event.REMOVED_FROM_STAGE, _this.removedFun, _this);
            return _this;
        }
        zhuliPage.prototype.onAddToStage = function () {
            var bgLayer = new egret.Sprite();
            this.addChild(bgLayer);
            bgLayer.touchEnabled = true;
            var zhuliBg = Lgs.createBitmapByName("zhuliBg_jpg");
            bgLayer.addChild(zhuliBg);
            zhuliBg.x = gw / 2 - Lgs.GetWidth(zhuliBg) / 2;
            var winLayer = new egret.Sprite();
            bgLayer.addChild(winLayer);
            winLayer.width = gw;
            winLayer.height = gh;
            var zhulibg = Lgs.createBitmapByName("zhulibg_png");
            winLayer.addChild(zhulibg);
            zhulibg.x = gw / 2 - Lgs.GetWidth(zhulibg) / 2;
            zhulibg.y = gh * 0.143;
            var btn1 = Lgs.createBitmapByName("btn1_png");
            winLayer.addChild(btn1);
            Lgs.BtnMode(btn1);
            btn1.x = gw / 2;
            btn1.y = gh * 0.588;
            var Iwant = Lgs.createBitmapByName("Iwant_png");
            winLayer.addChild(Iwant);
            Lgs.BtnMode(Iwant);
            Iwant.x = gw / 2;
            Iwant.y = gh * 0.67;
            Lgs.winEnterAni(zhuliBg, winLayer, "scale01");
            btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, zhuiliFun, this);
            Lgs.removedListener(btn1, egret.TouchEvent.TOUCH_TAP, zhuiliFun, this);
            var errorbackData = "";
            function zhuiliFun() {
                btn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, zhuiliFun, this);
                if (errorbackData != "") {
                    Lgs.LAlert(errorbackData);
                    btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, zhuiliFun, this);
                }
                else {
                }
            }
            Iwant.addEventListener(egret.TouchEvent.TOUCH_TAP, IwantFun, this);
            Lgs.removedListener(Iwant, egret.TouchEvent.TOUCH_TAP, IwantFun, this);
            function IwantFun() {
                Iwant.removeEventListener(egret.TouchEvent.TOUCH_TAP, zhuiliFun, this);
                console.log(window.location.href);
                window.location.href = "index.html";
            }
            function zhuliSUccess() {
                var winLayer2 = new egret.Sprite();
                bgLayer.addChild(winLayer2);
                winLayer2.width = gw;
                winLayer2.height = gh;
                var zhulibg = Lgs.createBitmapByName("zhuliMsgBox_png");
                winLayer2.addChild(zhulibg);
                zhulibg.x = gw / 2 - Lgs.GetWidth(zhulibg) / 2;
                zhulibg.y = gh * 0.176;
                var btn2 = Lgs.createBitmapByName("btn2_png");
                winLayer2.addChild(btn2);
                Lgs.BtnMode(btn2);
                btn2.x = gw / 2;
                btn2.y = gh * 0.55;
                Lgs.winEnterAni(zhuliBg, winLayer2, "scale01");
                btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, IwantFun, this);
                Lgs.removedListener(btn2, egret.TouchEvent.TOUCH_TAP, IwantFun, this);
                function IwantFun() {
                    btn2.removeEventListener(egret.TouchEvent.TOUCH_TAP, zhuiliFun, this);
                    console.log(window.location.href);
                    window.location.href = "index.html";
                }
            }
        };
        zhuliPage.prototype.removedFun = function () {
        };
        return zhuliPage;
    }(egret.DisplayObjectContainer));
    Lgs.zhuliPage = zhuliPage;
    __reflect(zhuliPage.prototype, "Lgs.zhuliPage");
})(Lgs || (Lgs = {}));
//# sourceMappingURL=zhuliPage.js.map
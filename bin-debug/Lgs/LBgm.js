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
    var LBgm = (function (_super) {
        __extends(LBgm, _super);
        function LBgm() {
            var _this = _super.call(this) || this;
            _this.canRun = false;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        LBgm.prototype.onAddToStage = function () {
            this.bgmLayer = Lgs.createBitmapByName('musicOn_png');
            // scaleFun(this.bgmLayer,0.075);
            this.addChild(this.bgmLayer);
            this.bgmLayer.touchEnabled = true;
            this.x = gw - pw_sx - Lgs.GetWidth(this) - gh * 0.02;
            this.y = gh * 0.02;
            Lgs.BtnMode(this.bgmLayer);
            this.bgmLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.on_off, this);
            if (this.canRun) {
                this.Timer = new egret.Timer(30);
                this.Timer.addEventListener(egret.TimerEvent.TIMER, this.Run, this);
            }
            /**直接播放bgm */
            // this.play();
        };
        LBgm.prototype.setnewPosition = function (x, y, rotate) {
            this.x = x;
            this.y = y;
            if (rotate || rotate == 0) {
                this.rotation = rotate;
            }
        };
        LBgm.prototype.setinitPosition = function () {
            this.rotation = 0;
            this.x = gw - pw_sx - Lgs.GetWidth(this) - gh * 0.016;
            this.y = gh * 0.016;
        };
        LBgm.prototype.Run = function () {
            this.bgmLayer.rotation += 2;
        };
        LBgm.prototype.on_off = function () {
            if (this.isPlay) {
                // canMusic = false;
                stopOtherAudio("bgm");
                this.pause();
            }
            else {
                // canMusic = true;
                this.play();
            }
            // playAudio("touchBtn",0);
        };
        LBgm.prototype.play = function () {
            if (this.canRun) {
                this.Timer.start();
            }
            this.isPlay = true;
            this.bgmLayer.texture = RES.getRes('musicOn_png');
            setBgm(true);
        };
        LBgm.prototype.pause = function () {
            if (this.canRun) {
                this.bgmLayer.rotation = 0;
                this.Timer.stop();
            }
            this.isPlay = false;
            this.bgmLayer.texture = RES.getRes('musicOff_png');
            setBgm(false);
        };
        LBgm.prototype.show = function () {
            this.bgmLayer.visible = true;
        };
        LBgm.prototype.hide = function () {
            this.bgmLayer.visible = false;
        };
        return LBgm;
    }(egret.DisplayObjectContainer));
    Lgs.LBgm = LBgm;
    __reflect(LBgm.prototype, "Lgs.LBgm");
})(Lgs || (Lgs = {}));
(function (Lgs) {
    var LScreen = (function (_super) {
        __extends(LScreen, _super);
        function LScreen(canRun) {
            var _this = _super.call(this) || this;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            return _this;
        }
        LScreen.prototype.onAddToStage = function () {
            this.touchEnabled = true;
            this.screenMask = new egret.Shape();
            this.addChild(this.screenMask);
            this.screenMask.graphics.beginFill(0x000000);
            this.screenMask.graphics.drawRect(0, 0, gw, gh);
            this.screenMask.graphics.endFill();
            this.screenMask.alpha = 0.5;
            var loadText = new egret.TextField();
            this.addChild(loadText);
            Lgs.textScaleFun(loadText, 0.028);
            loadText.text = "网络请求中...";
            loadText.textColor = 0xffffff;
            loadText.alpha = 0.5;
            loadText.fontFamily = "黑体";
            loadText.x = gw / 2 - Lgs.GetWidth(loadText) / 2;
            loadText.y = gh * 0.42;
        };
        LScreen.prototype.loadingShow = function (txt) {
            this.visible = true;
            if (txt) {
                showAjaxLoading(txt);
            }
            else {
                showAjaxLoading("");
            }
        };
        LScreen.prototype.loadingHide = function () {
            this.visible = false;
            hideAjaxLoading();
        };
        return LScreen;
    }(egret.DisplayObjectContainer));
    Lgs.LScreen = LScreen;
    __reflect(LScreen.prototype, "Lgs.LScreen");
})(Lgs || (Lgs = {}));
//# sourceMappingURL=LBgm.js.map
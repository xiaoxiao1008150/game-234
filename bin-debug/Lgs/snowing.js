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
    var snowing = (function (_super) {
        __extends(snowing, _super);
        function snowing() {
            var _this = _super.call(this) || this;
            /**数量 */
            _this.csNums = 50;
            /**最小缩放大小 +1*/
            _this.scale1 = 0.4;
            /**最远距离 */
            _this.maxJuli = gh * 0.55;
            /**最小下降速度 */
            _this.minSudu = gh * 0.0015;
            /**最大下降速度 minSudu+maxSudu*/
            _this.maxSudu = gh * 0.0035;
            /**x范围 */
            _this.csw = gw * 0.9;
            /**是否可以刮风 */
            _this.canWind = false;
            /**横向风速 */
            _this.windSpeed = 0;
            /**横向风速2  */
            _this.windSpeed2 = 0;
            /**刮风间隔 */
            _this.windCount = 3000;
            /**false 风速开始减小 */
            _this.windAdd = false;
            /**默认播放 */
            _this.isPlay = true;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.once(egret.Event.REMOVED_FROM_STAGE, _this.removedFun, _this);
            return _this;
        }
        snowing.prototype.onAddToStage = function () {
            var _THIS = this;
            /**层级 背景 */
            var bgLayer = new egret.Sprite();
            this.addChild(bgLayer);
            var fgLayer = new egret.Sprite();
            this.addChild(fgLayer);
            // let cddataArr = ["snow_png"];
            var cddataArr = ["cd1_png", "cd2_png", "cd3_png", "cd4_png", "cd5_png", "cd6_png", "cd7_png", "cd8_png", "cd9_png"];
            var cdsArr = [];
            for (var i = 0; i < this.csNums; i++) {
                var cdnum = Math.floor(Math.random() * cddataArr.length);
                var cds = Lgs.createBitmapByName(cddataArr[cdnum]);
                bgLayer.addChild(cds);
                cds.scaleX = cds.scaleY = initScale * (this.scale1 + Math.random());
                cds.rotation = Math.random() * 180;
                // cds.x = (gw-this.csw)/2 + Math.random()*this.csw;
                // cds.y = -GetHeight(cds) - gh*0.1 + Math.random()*gh*0.5;
                cds.x = (gw - this.csw) / 2 + Math.random() * this.csw;
                cds.y = -Lgs.GetHeight(cds) - gh * 0.1 + Math.random() * this.maxJuli;
                cds["speed2"] = Math.random() * this.maxSudu + this.minSudu;
                cds["r0"] = cds.rotation;
                cds["rr"] = 20 + Math.random() * 20;
                var rss = Math.floor(Math.random() * 2);
                if (rss == 0) {
                    cds["rs"] = 3;
                }
                else {
                    cds["rs"] = -3;
                }
                cdsArr.push(cds);
            }
            if ("boom") {
                this.addEventListener(egret.Event.ENTER_FRAME, onframe2, this);
                Lgs.removedListener(this, egret.Event.ENTER_FRAME, onframe2, this);
                this["onframe"] = onframe2;
            }
            else {
                this.addEventListener(egret.Event.ENTER_FRAME, onframe, this);
                Lgs.removedListener(this, egret.Event.ENTER_FRAME, onframe, this);
                this["onframe"] = onframe;
            }
            function onframe() {
                for (var i = 0; i < cdsArr.length; i++) {
                    var thiscds = cdsArr[i];
                    thiscds.y += thiscds["speed2"];
                    thiscds.rotation += thiscds["rs"];
                    if (thiscds.rotation >= thiscds["r0"] + thiscds["rr"] || thiscds.rotation <= thiscds["r0"] + thiscds["rr"]) {
                        thiscds["rr"] = -thiscds["rr"];
                    }
                }
                /**随风而行 */
                if (this.canWind) {
                    /**风速改变 */
                    if (!this.windAdd) {
                        for (var i = 0; i < cdsArr.length; i++) {
                            var thiscds = cdsArr[i];
                            if (thiscds["windSpeed"] > 0) {
                                thiscds["windSpeed"] -= gh * 0.0001;
                            }
                            else {
                                thiscds["windSpeed"] = 0;
                            }
                        }
                    }
                    /**随风速移动 */
                    for (var i = 0; i < cdsArr.length; i++) {
                        var thiscds = cdsArr[i];
                        thiscds.x += thiscds["windSpeed"];
                    }
                }
                /**暴风雪/滑雪前行 */
                if (this.windSpeed2 != 0) {
                    /**随风速移动 */
                    for (var i = 0; i < cdsArr.length; i++) {
                        var thiscds = cdsArr[i];
                        thiscds.x += this.windSpeed2 / 5 * 4 + this.windSpeed2 / 5 * Math.random();
                    }
                }
                var _loop_1 = function (i) {
                    var thiscds = cdsArr[i];
                    if (thiscds.y > this_1.maxJuli) {
                        egret.Tween.get(thiscds).to({ alpha: 0 }, 500).call(function () {
                            addCDS.call(this, thiscds);
                        }, this_1);
                    }
                };
                var this_1 = this;
                /**snow循环 */
                for (var i = 0; i < cdsArr.length; i++) {
                    _loop_1(i);
                }
            }
            function onframe2() {
                for (var i = 0; i < cdsArr.length; i++) {
                    var thiscds = cdsArr[i];
                    thiscds.y += thiscds["speed2"] * 1.5;
                    thiscds.rotation += thiscds["rs"];
                    if (thiscds.rotation >= thiscds["r0"] + thiscds["rr"] || thiscds.rotation <= thiscds["r0"] + thiscds["rr"]) {
                        thiscds["rr"] = -thiscds["rr"];
                    }
                }
                /**snow循环 */
                for (var i = 0; i < cdsArr.length; i++) {
                    var thiscds = cdsArr[i];
                    if (thiscds.y > this.maxJuli) {
                        egret.Tween.get(thiscds).to({ alpha: 0 }, 500);
                    }
                }
            }
            function addCDS(thisCDS) {
                var cdnum = Math.floor(Math.random() * cddataArr.length);
                // let thisCDS = createBitmapByName(cddataArr[cdnum]);
                thisCDS.texture = RES.getRes(cddataArr[cdnum]);
                // bgLayer.addChild(thisCDS);
                thisCDS.scaleX = thisCDS.scaleY = initScale * (this.scale1 + Math.random());
                thisCDS.rotation = Math.random() * 180;
                thisCDS.x = (gw - this.csw) / 2 + Math.random() * this.csw;
                thisCDS.y = -Lgs.GetHeight(thisCDS) * 2;
                thisCDS["speed2"] = Math.random() * this.maxSudu + this.minSudu;
                thisCDS["r0"] = thisCDS.rotation;
                thisCDS["rr"] = 20 + Math.random() * 20;
                var rss = Math.floor(Math.random() * 2);
                if (rss == 0) {
                    thisCDS["rs"] = 3;
                }
                else {
                    thisCDS["rs"] = -3;
                }
                thisCDS.alpha = 1;
                // cdsArr.push(thisCDS);
            }
            /**刮风 Test_v1.0 */
            if (this.canWind) {
                egret.setTimeout(windFun, this, this.windCount);
            }
            this['winFun'] = windFun;
            function windFun() {
                var rnum = parseInt(Math.random() * 2 + "");
                if (rnum == 1) {
                    this.windSpeed = -gh * Math.random() * 0.003;
                }
                else {
                    this.windSpeed = gh * Math.random() * 0.003;
                }
                for (var i = 0; i < cdsArr.length; i++) {
                    var thiscds = cdsArr[i];
                    thiscds["windSpeed"] = this.windSpeed;
                }
                this.windAdd = true;
                egret.setTimeout(function () {
                    this.windSpeed = 0;
                    this.windAdd = false;
                    /**计算下一次刮风 */
                    if (this.isPlay) {
                        this.windCount = (6000 + Math.random() * 3000);
                        egret.setTimeout(windFun, this, this.windCount);
                    }
                }, this, 3000);
            }
            /**刮风 Test END*/
        };
        /**开始 */
        snowing.prototype.play = function () {
            if (!this.isPlay) {
                this.isPlay = true;
                this.addEventListener(egret.Event.ENTER_FRAME, this["onframe"], this);
                if (this.canWind) {
                    this.windCount = (6000 + Math.random() * 3000);
                    egret.setTimeout(this['winFun'], this, this.windCount);
                }
            }
        };
        /**暂停 */
        snowing.prototype.pause = function () {
            if (this.isPlay) {
                this.isPlay = false;
                this.removeEventListener(egret.Event.ENTER_FRAME, this["onframe"], this);
            }
        };
        /**移除后 */
        snowing.prototype.removedFun = function () {
            this.removeEventListener(egret.Event.ENTER_FRAME, this["onframe"], this);
        };
        return snowing;
    }(egret.DisplayObjectContainer));
    Lgs.snowing = snowing;
    __reflect(snowing.prototype, "Lgs.snowing");
})(Lgs || (Lgs = {}));
//# sourceMappingURL=snowing.js.map
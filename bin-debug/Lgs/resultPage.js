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
    var resultPage = (function (_super) {
        __extends(resultPage, _super);
        function resultPage(data, callBack, thisObj) {
            var _this = _super.call(this) || this;
            _this.resultData = data;
            if (callBack) {
                _this.callBack = callBack;
                _this.thisObj = thisObj;
            }
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.once(egret.Event.REMOVED_FROM_STAGE, _this.removedFun, _this);
            return _this;
        }
        resultPage.prototype.onAddToStage = function () {
            bgmViewer.show();
            var _THIS = this;
            this.touchEnabled = true;
            /**层级 背景 */
            var bgLayer = new egret.Sprite();
            this.addChild(bgLayer);
            var fgLayer = new egret.Sprite();
            this.addChild(fgLayer);
            var resultShape = new egret.Shape();
            bgLayer.addChild(resultShape);
            resultShape.graphics.beginFill(0x000000);
            resultShape.graphics.drawRect(0, 0, gw, gh);
            resultShape.graphics.endFill();
            resultShape.alpha = 0.7;
            // let resultShape = createBitmapByName("resultBg_jpg");
            // bgLayer.addChild(resultShape);
            // resultShape.x = gw/2 - GetWidth(resultShape)/2;
            /**winLayer */
            var winLayer = new egret.Sprite();
            bgLayer.addChild(winLayer);
            winLayer.width = gw;
            winLayer.width = gh;
            /**其他-winLayer */
            var resultTitle = Lgs.createBitmapByName("resultTitle_png");
            winLayer.addChild(resultTitle);
            resultTitle.x = gw / 2 - Lgs.GetWidth(resultTitle) / 2;
            resultTitle.y = gh * 0.112;
            var resultBg = Lgs.createBitmapByName("resultBg_png");
            winLayer.addChild(resultBg);
            resultBg.x = gw / 2 - Lgs.GetWidth(resultBg) / 2;
            resultBg.y = gh * 0.238;
            /**头像 */
            var headLayer = new egret.Sprite();
            // let headIndex = listLayer.getChildIndex(listBg);
            // winLayer.addChildAt(headLayer,headIndex);
            winLayer.addChild(headLayer);
            var headFg = Lgs.createBitmapByName("r_headFg_png");
            headFg.x = gw / 2 - gh * 0.19;
            headFg.y = gh * 0.352;
            var headBg = Lgs.createBitmapByName("r_headBg_png");
            // winLayer.addChild(headBg);
            headBg.x = gw / 2 - gh * 0.19;
            headBg.y = gh * 0.352;
            // headBg.alpha = 0.2;
            winLayer.addChild(headFg);
            Lgs.addBitmapByUrl(headBg.x, headBg.y, Lgs.GetHeight(headBg), headLayer, $headImg, "headImg", headBg, function (result) {
                winLayer.addChild(headBg);
                result.mask = headBg;
            }, this);
            var bestScoreBg = Lgs.createBitmapByName("bestScoreBg_png");
            winLayer.addChild(bestScoreBg);
            bestScoreBg.x = gw / 2 - Lgs.GetWidth(bestScoreBg) / 2;
            bestScoreBg.y = gh * 0.533;
            // 您的最佳排名
            var bestRankBg = Lgs.createBitmapByName("bestRankBg_png");
            winLayer.addChild(bestRankBg);
            bestRankBg.x = gw / 2 - Lgs.GetWidth(bestRankBg) / 2;
            bestRankBg.y = gh * 0.653;
            /**textField */
            var currentScore = new egret.TextField();
            winLayer.addChild(currentScore);
            Lgs.textScaleFun(currentScore, 0.029);
            currentScore.bold = true;
            currentScore.textColor = 0xFA5C53;
            currentScore.text = this.resultData.score + "";
            currentScore.x = gw / 2 + gh * 0.1 - Lgs.GetWidth(currentScore);
            currentScore.y = gh * 0.453;
            // 最佳成绩
            var bestScore = new egret.TextField();
            winLayer.addChild(bestScore);
            Lgs.textScaleFun(bestScore, 0.025);
            bestScore.bold = true;
            bestScore.textColor = 0xFA5C53;
            if (this.resultData.score > bestScore111) {
                bestScore111 = this.resultData.score;
            }
            bestScore.text = bestScore111 + "";
            bestScore.x = gw / 2 - Lgs.GetWidth(bestScore) / 2;
            bestScore.y = gh * 0.589;
            // 最佳排名
            var bestRank = new egret.TextField();
            winLayer.addChild(bestRank);
            Lgs.textScaleFun(bestRank, 0.025);
            bestRank.bold = true;
            bestRank.textColor = 0xFA5C53;
            bestRank.text = "NO." + this.resultData.bestRank;
            bestRank.x = gw / 2 - Lgs.GetWidth(bestRank) / 2;
            bestRank.y = gh * 0.709;
            /**按钮 */
            // 再玩一次 黄色的
            var replayBtn = Lgs.createBitmapByName("replayBtn_png");
            winLayer.addChild(replayBtn);
            Lgs.BtnMode(replayBtn);
            replayBtn.x = gw / 2 - gh * 0.1;
            replayBtn.y = gh * 0.825;
            // 排行榜
            var rankBtn = Lgs.createBitmapByName("rankBtn2_png");
            winLayer.addChild(rankBtn);
            Lgs.BtnMode(rankBtn);
            rankBtn.x = gw / 2 + gh * 0.1;
            rankBtn.y = gh * 0.825;
            /**事件 */
            replayBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, replayAniFun, this);
            Lgs.removedListener(replayBtn, egret.TouchEvent.TOUCH_TAP, replayAniFun, this);
            rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rankFun, this);
            Lgs.removedListener(rankBtn, egret.TouchEvent.TOUCH_TAP, this.rankFun, this);
            function replayAniFun() {
                playAudio("touchBtn", 0);
                Lgs.winCloseAni(resultShape, winLayer, "scale21", function () {
                    this.replayFun();
                }, this);
            }
            /**动画 */
            Lgs.winEnterAni(resultShape, winLayer, "scale01", function () {
            }, this);
        };
        /**排行榜 */
        resultPage.prototype.rankFun = function () {
            playAudio("touchBtn", 0);
            var rankLayer = new Lgs.controlPage();
            this.addChild(rankLayer);
        };
        /**再来一次 */
        resultPage.prototype.replayFun = function () {
            Lgs.LremoveChild(this);
            this.callBack.call(this.thisObj);
            var homeLayer = new Lgs.LHomePage();
            GameLayer.addChild(homeLayer);
        };
        resultPage.prototype.removedFun = function () {
        };
        return resultPage;
    }(egret.DisplayObjectContainer));
    Lgs.resultPage = resultPage;
    __reflect(resultPage.prototype, "Lgs.resultPage");
})(Lgs || (Lgs = {}));
//# sourceMappingURL=resultPage.js.map
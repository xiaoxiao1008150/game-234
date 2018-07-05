var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**信息展示 */
var gameInfoView;
/**数据提示 数据组 */
var LTipsArr = [];
var myDebug = true;
var LMsgArr = [];
var myImg2;
var Lgs;
(function (Lgs) {
    /**00:00:60 */
    function hmsFun($num) {
        var $timeCount = $num;
        var $h1 = Math.floor($timeCount / 60 / 60);
        var $m1 = Math.floor($timeCount / 60) % 60;
        var $s1 = Math.floor($timeCount) % 60;
        if ($h1 < 10) {
            $h1 = "0" + $h1;
        }
        if ($m1 < 10) {
            $m1 = "0" + $m1;
        }
        if ($s1 < 10) {
            $s1 = "0" + $s1;
        }
        var $hms1 = $h1 + ":" + $m1 + ":" + $s1;
        return $hms1;
    }
    Lgs.hmsFun = hmsFun;
    /**LAlert2 弹出提示*/
    function LAlert2(text, yesCallback, noCallback, thisObj) {
        var alertLayer = new egret.Sprite();
        GameLayer.addChild(alertLayer);
        alertLayer.touchEnabled = true;
        var alertShape = new egret.Shape();
        alertLayer.addChild(alertShape);
        alertShape.graphics.beginFill(0x000000);
        alertShape.graphics.drawRect(0, 0, gw, gh);
        alertShape.graphics.endFill();
        alertShape.alpha = 0.4;
        /** 弹窗 */
        var alertBox = new egret.Sprite();
        alertLayer.addChild(alertBox);
        /** 弹窗文本 */
        var alertText = new egret.TextField();
        alertText.text = text;
        alertText.textColor = 0x222222;
        Lgs.textScaleFun(alertText, gh * 0.0225 / gh);
        alertText.width = gh * 0.38;
        alertText.textAlign = "center";
        alertText.lineSpacing = gh * 0.01;
        alertText.x = gw / 2 - Lgs.GetWidth(alertText) / 2;
        alertText.y = gh * 0.04;
        /** 弹窗文本"背景"-以及它的mask */
        var bgmask = new egret.Shape();
        alertBox.addChild(bgmask);
        bgmask.graphics.beginFill(0xffffff);
        bgmask.graphics.drawRect(0, 0, Lgs.GetWidth(alertText) + gh * 0.08, Lgs.GetHeight(alertText) + gh * 0.08);
        bgmask.graphics.endFill();
        bgmask.x = gw / 2 - Lgs.GetWidth(bgmask) / 2;
        var alertbg = new egret.Shape();
        alertBox.addChild(alertbg);
        alertbg.graphics.beginFill(0xffffff);
        alertbg.graphics.drawRoundRect(0, 0, Lgs.GetWidth(alertText) + gh * 0.08, Lgs.GetHeight(alertText) + gh * 0.08 + gh * 0.075, gh * 0.04);
        alertbg.graphics.endFill();
        alertbg.alpha = 0.9;
        alertbg.x = gw / 2 - Lgs.GetWidth(alertbg) / 2;
        alertbg.mask = bgmask;
        alertBox.addChild(alertText);
        alertBox.y = gh * 0.5 - Lgs.GetHeight(alertBox) / 2 - gh * 0.045;
        /** "确定背景"-以及它的mask */
        var yesmask = new egret.Shape();
        alertBox.addChild(yesmask);
        yesmask.graphics.beginFill(0x000000);
        yesmask.graphics.drawRoundRect(0, 0, Lgs.GetWidth(alertText) + gh * 0.08, Lgs.GetHeight(alertText) + gh * 0.08 + gh * 0.07, gh * 0.04);
        yesmask.graphics.endFill();
        yesmask.x = gw / 2 - Lgs.GetWidth(yesmask) / 2;
        var yesLayer = new egret.Shape();
        alertBox.addChild(yesLayer);
        yesLayer.graphics.beginFill(0xf8f8f8);
        yesLayer.graphics.drawRect(0, Lgs.GetHeight(alertText) + gh * 0.08, Lgs.GetWidth(alertText) / 2 + gh * 0.04, gh * 0.07);
        yesLayer.graphics.endFill();
        yesLayer.alpha = 0.9;
        yesLayer.x = gw / 2 - Lgs.GetWidth(yesLayer);
        yesLayer.mask = yesmask;
        /** "确定文本"*/
        var yesField = new egret.TextField();
        alertBox.addChild(yesField);
        yesField.text = "是";
        yesField.textColor = 0x1383FE;
        yesField.fontFamily = "黑体";
        Lgs.textScaleFun(yesField, gh * 0.028 / gh);
        yesField.width = gh * 0.38;
        yesField.textAlign = "center";
        yesField.x = yesLayer.x + Lgs.GetWidth(yesLayer) / 2 - Lgs.GetWidth(yesField) / 2;
        yesField.y = Lgs.GetHeight(alertText) + gh * 0.08 + gh * 0.0225;
        /** "否定背景"-以及它的mask */
        var nomask = new egret.Shape();
        alertBox.addChild(nomask);
        nomask.graphics.beginFill(0x000000);
        nomask.graphics.drawRoundRect(0, 0, Lgs.GetWidth(alertText) + gh * 0.08, Lgs.GetHeight(alertText) + gh * 0.08 + gh * 0.07, gh * 0.04);
        nomask.graphics.endFill();
        nomask.x = gw / 2 - Lgs.GetWidth(nomask) / 2;
        var noLayer = new egret.Shape();
        alertBox.addChild(noLayer);
        noLayer.graphics.beginFill(0xf8f8f8);
        noLayer.graphics.drawRect(Lgs.GetWidth(alertText) / 2 + gh * 0.04, Lgs.GetHeight(alertText) + gh * 0.08, Lgs.GetWidth(alertText) / 2 + gh * 0.04, gh * 0.07);
        noLayer.graphics.endFill();
        noLayer.alpha = 0.9;
        noLayer.x = gw / 2 - Lgs.GetWidth(noLayer);
        noLayer.mask = nomask;
        /** "否定文本" */
        var noField = new egret.TextField();
        alertBox.addChild(noField);
        noField.text = "否";
        noField.textColor = 0x1383FE;
        noField.fontFamily = "黑体";
        Lgs.textScaleFun(noField, gh * 0.028 / gh);
        noField.width = gh * 0.38;
        noField.textAlign = "center";
        noField.x = noLayer.x + Lgs.GetWidth(yesLayer) + Lgs.GetWidth(noLayer) / 2 - Lgs.GetWidth(noField) / 2;
        noField.y = Lgs.GetHeight(alertText) + gh * 0.08 + gh * 0.0225;
        /**弹窗 分割线 */
        var line = new egret.Shape();
        alertBox.addChild(line);
        line.alpha = 0.2;
        line.graphics.lineStyle(1, 0x444444, 0.9);
        line.graphics.moveTo(alertbg.x, Lgs.GetHeight(alertText) + gh * 0.08);
        line.graphics.lineTo(alertbg.x + Lgs.GetWidth(alertBox), Lgs.GetHeight(alertText) + gh * 0.08);
        /**按钮 分割线 */
        var btnLine = new egret.Shape();
        alertBox.addChild(btnLine);
        btnLine.alpha = 0.2;
        btnLine.graphics.lineStyle(1, 0x444444, 0.9);
        btnLine.graphics.moveTo(gw / 2, Lgs.GetHeight(alertText) + gh * 0.08);
        btnLine.graphics.lineTo(gw / 2, Lgs.GetHeight(alertText) + gh * 0.08 + gh * 0.07);
        /** "yes"点击事件 */
        yesLayer.touchEnabled = true;
        yesLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, touchbegin, GameLayer);
        alertLayer.addEventListener(egret.TouchEvent.TOUCH_END, touchend, GameLayer);
        function touchbegin() {
            yesLayer.alpha = 0.7;
        }
        function touchend() {
            yesLayer.alpha = 0.9;
        }
        yesLayer.once(egret.TouchEvent.TOUCH_TAP, function () {
            yesLayer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, touchbegin, GameLayer);
            alertLayer.removeEventListener(egret.TouchEvent.TOUCH_END, touchend, GameLayer);
            GameLayer.removeChild(alertLayer);
            if (yesCallback) {
                yesCallback.call(thisObj);
            }
        }, GameLayer);
        /** "no"点击事件 */
        noLayer.touchEnabled = true;
        noLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, noTouchbegin, GameLayer);
        alertLayer.addEventListener(egret.TouchEvent.TOUCH_END, noTouchend, GameLayer);
        function noTouchbegin() {
            noLayer.alpha = 0.7;
        }
        function noTouchend() {
            noLayer.alpha = 0.9;
        }
        noLayer.once(egret.TouchEvent.TOUCH_TAP, function () {
            noLayer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, noTouchbegin, GameLayer);
            alertLayer.removeEventListener(egret.TouchEvent.TOUCH_END, noTouchend, GameLayer);
            GameLayer.removeChild(alertLayer);
            if (noCallback) {
                noCallback.call(thisObj);
            }
        }, GameLayer);
    }
    Lgs.LAlert2 = LAlert2;
    /**addQR2 */
    function addQR2(x, y, height, visible, qrUrl) {
        gameDiv = document.getElementsByClassName("egret-player")[0];
        if ($("#QR").attr("src")) {
            myImg.style.display = 'none';
        }
        else {
            myImg = document.createElement("img");
            myImg.style.display = 'none';
        }
        if (qrUrl) {
            myImg.src = qrUrl;
        }
        else {
            myImg.src = $staticUrl + "/resource/assets/QR.jpg";
        }
        myImg2.id = "QR2";
        gameDiv.appendChild(myImg2);
        var timer = egret.setInterval(function () {
            IsQRloadComplete = QRloadComplete2(x, y, height);
            if (visible) {
                myImg2.style.display = 'block';
            }
            else {
                myImg2.style.display = 'none';
            }
            if (IsQRloadComplete) {
                egret.clearInterval(timer);
            }
        }, this, 33);
        /**返回QR是否加载完成 */
        function QRloadComplete2(x, y, height) {
            if (document.getElementById('QR2')['complete']) {
                setQRposition2(x, y, height);
                return true;
            }
            else {
                return false;
            }
        }
    }
    Lgs.addQR2 = addQR2;
    /**设置QR位置 */
    function setQRposition2(x, y, height, visible) {
        // console.log("QRloadComplete is " + IsQRloadComplete);
        var w_h = myImg2.width / myImg2.height;
        myImg2.style.height = height;
        var heightNum = (height.replace("%", "")) / 100;
        var widthNum = (heightNum * window.innerHeight) * w_h;
        myImg2.style.width = widthNum + "px";
        var left_x = window.innerWidth / 2 - widthNum / 2 + window.innerHeight * x;
        var left_y = window.innerHeight * y;
        myImg2.style.left = left_x + 'px';
        myImg2.style.top = left_y + 'px';
        myImg2.style.position = "absolute";
        if (visible) {
            myImg2.style.display = 'block';
        }
        else {
            myImg2.style.display = 'none';
        }
    }
    Lgs.setQRposition2 = setQRposition2;
    /**提示锁定竖屏游戏 */
    function uprightTipsFun() {
        var uprightResultLayer = new egret.Sprite();
        uprightResultLayer.touchEnabled = true;
        // uprightResultLayer.rotation = 90;
        // uprightResultLayer.x = gw;
        var uprightShape = new egret.Shape();
        uprightResultLayer.addChild(uprightShape);
        uprightShape.graphics.beginFill(0x000000);
        uprightShape.graphics.drawRect(0, 0, gw, gh);
        uprightShape.graphics.endFill();
        // let hengping = createBitmapByName("hengping_png");
        // uprightResultLayer.addChild(hengping);
        // hengping.x = gh/2 - GetWidth(hengping)/2;
        // hengping.y = gw/2 - GetHeight(hengping);
        var hpTipsField = new egret.TextField();
        uprightResultLayer.addChild(hpTipsField);
        Lgs.textScaleFun(hpTipsField, 0.07);
        hpTipsField.textAlign = "center";
        hpTipsField.fontFamily = "黑体";
        hpTipsField.text = "请锁定竖屏横置手机以获得最佳体验"; /**\n 换行*/
        hpTipsField.x = gw / 2 - Lgs.GetWidth(hpTipsField) / 2;
        hpTipsField.y = gh / 2 - Lgs.GetHeight(hpTipsField) / 2 - gh * 0.03;
        return uprightResultLayer;
    }
    Lgs.uprightTipsFun = uprightTipsFun;
    /**弹窗动画 */
    function winEnterAni(tcShape, winLayer, 
        /** "scale01" "scale21" "up" "down" "right" "left" */
        aniStyle, callback, thisObj) {
        tcShape.alpha = 0;
        winLayer.width = gw;
        winLayer.height = gh;
        if (tcShape instanceof egret.Shape) {
            egret.Tween.get(tcShape).to({ alpha: 0.7 }, 320);
        }
        else {
            egret.Tween.get(tcShape).to({ alpha: 1 }, 320);
        }
        egret.Tween.get(winLayer).to({ alpha: 1 }, 320);
        switch (aniStyle) {
            case "scale01":
                Lgs.BtnMode(winLayer, true);
                winLayer.x = gw / 2;
                winLayer.scaleX = winLayer.scaleY = 0;
                egret.Tween.get(winLayer).to({ scaleX: 1, scaleY: 1 }, 320, egret.Ease.backOut).call(aniEndFun, thisObj);
                break;
            case "scale21":
                Lgs.BtnMode(winLayer, true);
                winLayer.x = gw / 2;
                winLayer.scaleX = winLayer.scaleY = initScale * 2;
                egret.Tween.get(winLayer).to({ scaleX: 1, scaleY: 1 }, 320, egret.Ease.backOut).call(aniEndFun, thisObj);
                break;
            case "up":
                Lgs.BtnMode(winLayer, true);
                winLayer.y = gh * 1.5;
                egret.Tween.get(winLayer).to({ y: gh * 0.5 }, 370, egret.Ease.quadOut).call(aniEndFun, thisObj);
                break;
            case "down":
                Lgs.BtnMode(winLayer, true);
                winLayer.y = -gh * 1.5;
                egret.Tween.get(winLayer).to({ y: gh * 0.5 }, 370, egret.Ease.quadOut).call(aniEndFun, thisObj);
                break;
            case "left":
                Lgs.BtnMode(winLayer, true);
                winLayer.x = gw * 1.5;
                egret.Tween.get(winLayer).to({ x: gw * 0.5 }, 320, egret.Ease.quadOut).call(aniEndFun, thisObj);
                break;
            case "right":
                Lgs.BtnMode(winLayer, true);
                winLayer.x = -gw * 1.5;
                egret.Tween.get(winLayer).to({ x: gw * 0.5 }, 320, egret.Ease.quadOut).call(aniEndFun, thisObj);
                break;
        }
        function aniEndFun() {
            if (callback) {
                callback.call(thisObj);
            }
        }
    }
    Lgs.winEnterAni = winEnterAni;
    function winCloseAni(tcShape, winLayer, aniStyle, callback, thisObj, delay) {
        var delaynum = 0;
        delay ? delaynum = delaynum : delaynum = 0;
        egret.Tween.get(tcShape).wait(delaynum).to({ alpha: 0 }, 320);
        egret.Tween.get(winLayer).wait(delaynum).to({ alpha: 0 }, 320);
        switch (aniStyle) {
            case "scale01":
                egret.Tween.get(winLayer).wait(delaynum).to({ scaleX: 0, scaleY: 0 }, 320, egret.Ease.backIn).call(aniEndFun, thisObj);
                break;
            case "scale21":
                egret.Tween.get(winLayer).wait(delaynum).to({ scaleX: 2, scaleY: 2 }, 320, egret.Ease.backIn).call(aniEndFun, thisObj);
                break;
            case "up":
                egret.Tween.get(winLayer).wait(delaynum).to({ y: -gh }, 370, egret.Ease.backIn).call(aniEndFun, thisObj);
                break;
            case "down":
                egret.Tween.get(winLayer).wait(delaynum).to({ y: gh }, 370, egret.Ease.backIn).call(aniEndFun, thisObj);
                break;
            case "left":
                egret.Tween.get(winLayer).wait(delaynum).to({ x: -gw }, 320, egret.Ease.backIn).call(aniEndFun, thisObj);
                break;
            case "right":
                egret.Tween.get(winLayer).wait(delaynum).to({ x: gw }, 320, egret.Ease.backIn).call(aniEndFun, thisObj);
                break;
        }
        function aniEndFun() {
            if (callback) {
                callback.call(thisObj);
            }
        }
    }
    Lgs.winCloseAni = winCloseAni;
    /**仅支持Bitmap的Btn2的闪光按钮模型2 */
    function BtnMode2(obj, notBtn) {
        var thisScale = obj.scaleX;
        obj.anchorOffsetX = obj.width / 2;
        obj.anchorOffsetY = obj.height / 2;
        obj.x = obj.x + Lgs.GetWidth(obj) / 2;
        obj.y = obj.y + Lgs.GetHeight(obj) / 2;
        var Btn33 = Lgs.createBitmapByName("Btn33_png");
        Lgs.scaleFun(Btn33, Lgs.GetHeight(obj) / gh);
        obj.parent.addChild(Btn33);
        var obj2 = new egret.Bitmap();
        obj2.texture = obj.texture;
        obj2.scaleX = obj2.scaleY = thisScale * 0.95;
        obj.parent.addChild(obj2);
        obj2.anchorOffsetX = obj.anchorOffsetX;
        obj2.anchorOffsetY = obj.anchorOffsetY;
        obj2.x = obj.x;
        obj2.y = obj.y - Lgs.GetHeight(obj) * 0.05;
        Btn33.mask = obj2;
        Btn33.x = obj2.x - Lgs.GetWidth(obj) / 2 - Lgs.GetWidth(Btn33);
        Btn33.y = obj2.y - Lgs.GetHeight(obj) / 2;
        Btn33.alpha = 0.7;
        Lgs.removedTweens(Btn33);
        egret.Tween.get(Btn33, { loop: true })
            .wait(1000)
            .to({ x: obj.x + Lgs.GetWidth(obj) / 2 }, 1000);
        obj.once(egret.Event.REMOVED_FROM_STAGE, function () {
            Lgs.LremoveChild(obj2);
            Lgs.LremoveChild(Btn33);
        }, obj);
        if (!notBtn) {
            obj.touchEnabled = true;
            obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
                egret.Tween.get(obj).to({ scaleX: thisScale * 0.9, scaleY: thisScale * 0.9 }, 100, egret.Ease.backOut)
                    .to({ scaleX: thisScale, scaleY: thisScale }, 250, egret.Ease.backOut);
                egret.Tween.get(obj2).to({ scaleX: thisScale * 0.9, scaleY: thisScale * 0.9 }, 100, egret.Ease.backOut)
                    .to({ scaleX: thisScale, scaleY: thisScale }, 250, egret.Ease.backOut);
            }, this);
        }
    }
    Lgs.BtnMode2 = BtnMode2;
    /**LInfoView 信息展示 debug,
     * textArr = [[数据名称,数据的值],[数据名称,数据的值]];
    */
    function LInfoView(textArr) {
        if (gameInfoView && gameInfoView.parent) {
            gameInfoView.parent.removeChild(gameInfoView);
        }
        gameInfoView = new egret.Sprite();
        GameLayer.addChild(gameInfoView);
        // gameInfoView.touchEnabled = true;
        var tsShape = new egret.Shape();
        gameInfoView.addChild(tsShape);
        tsShape.graphics.beginFill(0x000000);
        tsShape.graphics.drawRect(0, 0, gw, gh);
        tsShape.graphics.endFill();
        tsShape.alpha = 0;
        var tsBox = new egret.Sprite();
        gameInfoView.addChild(tsBox);
        var tsbg = new egret.Shape();
        tsBox.addChild(tsbg);
        for (var i = 0; i < textArr.length; i++) {
            var tsText = new egret.TextField();
            tsText.text = textArr[i][0] + ":";
            tsText.textColor = 0x333333;
            Lgs.textScaleFun(tsText, 0.022);
            // tsText.textAlign = "center";
            // tsText.width = gh*0.38;
            tsText.x = 0;
            tsText.y = gh * 0.03 * i;
            tsBox.addChild(tsText);
            var tsText2 = new egret.TextField();
            tsText2.text = textArr[i][1] + "";
            tsText2.textColor = 0x333333;
            Lgs.textScaleFun(tsText2, 0.022);
            // tsText2.textAlign = "center";
            // tsText2.width = gh*0.38;
            tsText2.x = tsText.x + Lgs.GetWidth(tsText) + gh * 0.01;
            tsText2.y = tsText.y;
            tsBox.addChild(tsText2);
        }
        tsbg.graphics.beginFill(0xFFBC01);
        tsbg.graphics.drawRect(0, 0, Lgs.GetWidth(tsBox) + gh * 0.025, Lgs.GetHeight(tsBox) + gh * 0.025);
        tsbg.graphics.endFill();
        tsbg.alpha = 0.8;
        tsbg.x = -gh * 0.025 / 2;
        tsbg.y = -gh * 0.025 / 2;
        tsBox.x = gw - Lgs.GetWidth(tsbg) + gh * 0.025 / 2;
        tsBox.y = gh * 0.025 / 2;
    }
    Lgs.LInfoView = LInfoView;
    /**LTips 数据提示 debug*/
    function LTips(obj, objName, callback) {
        if (!myDebug) {
            return false;
        }
        var tsLayer = new egret.Sprite();
        GameLayer.parent.addChild(tsLayer);
        tsLayer.touchEnabled = true;
        var tsText = new egret.TextField();
        if (objName) {
            tsText.text = objName + ":" + obj + " >> " + typeof (obj);
        }
        else {
            tsText.text = obj + " >> " + typeof (obj);
        }
        tsText.textColor = 0xffffff;
        Lgs.textScaleFun(tsText, 0.022);
        tsText.textAlign = "center";
        tsText.width = gh * 0.38;
        tsText.x = gw / 2 - Lgs.GetWidth(tsText) / 2;
        tsText.y = 10;
        var tsbg = new egret.Shape();
        tsLayer.addChild(tsbg);
        tsbg.graphics.beginFill(0xff0000);
        tsbg.graphics.drawRect(0, 0, gw, Lgs.GetHeight(tsText) + 20);
        tsbg.graphics.endFill();
        tsbg.alpha = 0.85;
        tsbg.x = gw / 2 - Lgs.GetWidth(tsbg) / 2;
        tsLayer.addChild(tsText);
        if (LTipsArr.length > 0) {
            tsLayer.y = LTipsArr[LTipsArr.length - 1].y + Lgs.GetHeight(LTipsArr[LTipsArr.length - 1]);
        }
        LTipsArr.push(tsLayer);
        tsLayer.touchEnabled = true;
        tsLayer.once(egret.TouchEvent.TOUCH_TAP, function () {
            tsLayer.parent.removeChild(tsLayer);
            if (callback) {
                callback.call(this);
            }
            for (var i = 0; i < LTipsArr.length; i++) {
                var thiscue = LTipsArr[i];
                if (thiscue.hashCode == tsLayer.hashCode) {
                    LTipsArr.splice(i, 1);
                }
            }
            for (var i = 0; i < LTipsArr.length; i++) {
                var thiscue = LTipsArr[i];
                if (i == 0) {
                    thiscue.y = 0;
                }
                else {
                    thiscue.y = LTipsArr[i - 1].y + Lgs.GetHeight(LTipsArr[i - 1]);
                }
            }
        }, this);
    }
    Lgs.LTips = LTips;
    function showloading(txt) {
        if (txt) {
            loadingScreen.loadingShow(txt);
        }
        else {
            loadingScreen.loadingShow();
        }
    }
    Lgs.showloading = showloading;
    function hideloading() {
        loadingScreen.loadingHide();
    }
    Lgs.hideloading = hideloading;
    /**意在创建一个碰撞形状类 可以增加贴图 未完成 */
    var LHitShape233 = (function (_super) {
        __extends(LHitShape233, _super);
        function LHitShape233() {
            var _this = _super.call(this) || this;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.once(egret.Event.REMOVED_FROM_STAGE, _this.removedFun, _this);
            return _this;
        }
        LHitShape233.prototype.onAddToStage = function () {
        };
        LHitShape233.prototype.hitTest = function () {
            // LHittestShape(this.hitShape);
        };
        LHitShape233.prototype.removedFun = function () {
        };
        return LHitShape233;
    }(egret.DisplayObjectContainer));
    Lgs.LHitShape233 = LHitShape233;
    __reflect(LHitShape233.prototype, "Lgs.LHitShape233");
})(Lgs || (Lgs = {}));
//# sourceMappingURL=GameUtil2.js.map
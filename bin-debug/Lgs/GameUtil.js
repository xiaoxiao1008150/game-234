var loadingScreen;
var haveGravity = false;
var initScale = gh / 1206;
/**游戏底层 */
var GameLayer;
var myImg;
// -webkit-overflow-scrolling: touch;
var IsQRloadComplete = false;
var Lgs;
(function (Lgs) {
    /**LMsg 消息提示*/
    function LMsg(text, callback, thisObj) {
        // if(LMsgArr.length>3){
        //     if(!LMsgArr[0]["isRemove"]){
        //         LMsgArr[0]["isRemove"] = true;
        //         LremoveChild(LMsgArr[0]);
        //         LMsgArr.splice(0,1);
        //         // console.log(LMsgArr);
        //     }
        // }
        var tsLayer = new egret.Sprite();
        GameLayer.stage.addChild(tsLayer);
        // tsLayer["isRemove"] = false;
        var tsBox = new egret.Sprite();
        tsLayer.addChild(tsBox);
        var tsText = new egret.TextField();
        tsText.text = text;
        tsText.textColor = 0xffffff;
        textScaleFun(tsText, 0.028);
        tsText.fontFamily = "YaHei";
        tsText.stroke = 4;
        tsText.bold = true;
        tsText.strokeColor = 0x111111;
        tsText.textAlign = "center";
        tsText.width = gh * 0.38;
        tsBox.addChild(tsText);
        tsLayer.x = gw / 2 - GetWidth(tsLayer) / 2;
        tsLayer.y = gh * 0.38;
        var tsLayery = tsLayer.y;
        tsLayer.alpha = 0;
        // LMsgArr.push(tsLayer);
        egret.Tween.get(tsLayer).wait(280).to({ y: tsLayery - gh * 0.05 }, 2000, egret.Ease.quadOut);
        egret.Tween.get(tsLayer).to({ alpha: 1 }, 280).wait(1700).to({ alpha: 0 }, 300, egret.Ease.quadOut)
            .call(function () {
            LremoveChild(tsLayer);
            // if(!tsLayer["isRemove"]){
            //     tsLayer["isRemove"] = true;
            //     LremoveChild(tsLayer);
            //     LMsgArr.splice(0,1);
            // }
        }, this);
        egret.setTimeout(function () {
            if (callback) {
                callback.call(thisObj);
            }
        }, this, 800);
    }
    Lgs.LMsg = LMsg;
    /**正常版本 LAlert 弹出提示*/
    function LAlert(text, callback, thisObj) {
        var alertLayer = new egret.Sprite();
        GameLayer.addChild(alertLayer);
        alertLayer.touchEnabled = true;
        var alertShape = new egret.Shape();
        alertLayer.addChild(alertShape);
        alertShape.graphics.beginFill(0x000000);
        alertShape.graphics.drawRect(0, 0, gw, gh);
        alertShape.graphics.endFill();
        alertShape.alpha = 0.4;
        /**alert弹窗 */
        var alertBox = new egret.Sprite();
        alertLayer.addChild(alertBox);
        /**alert弹窗文本 */
        var alertText = new egret.TextField();
        alertText.text = text;
        alertText.textColor = 0x222222;
        textScaleFun(alertText, gh * 0.0225 / gh);
        alertText.width = gh * 0.38;
        alertText.textAlign = "center";
        alertText.lineSpacing = gh * 0.01;
        alertText.x = gw / 2 - GetWidth(alertText) / 2;
        alertText.y = gh * 0.04;
        /**alert弹窗文本"背景"以及它的mask */
        var bgmask = new egret.Shape();
        alertBox.addChild(bgmask);
        bgmask.graphics.beginFill(0xffffff);
        bgmask.graphics.drawRect(0, 0, GetWidth(alertText) + gh * 0.08, GetHeight(alertText) + gh * 0.08);
        bgmask.graphics.endFill();
        bgmask.x = gw / 2 - GetWidth(bgmask) / 2;
        var alertbg = new egret.Shape();
        alertBox.addChild(alertbg);
        alertbg.graphics.beginFill(0xffffff);
        alertbg.graphics.drawRoundRect(0, 0, GetWidth(alertText) + gh * 0.08, GetHeight(alertText) + gh * 0.08 + gh * 0.075, gh * 0.04);
        alertbg.graphics.endFill();
        alertbg.alpha = 0.9;
        alertbg.x = gw / 2 - GetWidth(alertbg) / 2;
        alertbg.mask = bgmask;
        alertBox.addChild(alertText);
        alertBox.y = gh * 0.5 - GetHeight(alertBox) / 2 - gh * 0.045;
        /**alert弹窗文本"确定背景"以及它的mask */
        var closemask = new egret.Shape();
        alertBox.addChild(closemask);
        closemask.graphics.beginFill(0x000000);
        closemask.graphics.drawRoundRect(0, 0, GetWidth(alertText) + gh * 0.08, GetHeight(alertText) + gh * 0.08 + gh * 0.07, gh * 0.04);
        closemask.graphics.endFill();
        closemask.x = gw / 2 - GetWidth(closemask) / 2;
        var closeLayer = new egret.Shape();
        alertBox.addChild(closeLayer);
        closeLayer.graphics.beginFill(0xf8f8f8);
        closeLayer.graphics.drawRect(0, GetHeight(alertText) + gh * 0.08, GetWidth(alertText) + gh * 0.08, gh * 0.07);
        closeLayer.graphics.endFill();
        closeLayer.alpha = 0.9;
        closeLayer.x = gw / 2 - GetWidth(closeLayer) / 2;
        closeLayer.mask = closemask;
        /**alert弹窗分割线 */
        var line = new egret.Shape();
        alertBox.addChild(line);
        line.alpha = 0.2;
        line.graphics.lineStyle(1, 0x444444, 0.9);
        line.graphics.moveTo(alertbg.x, GetHeight(alertText) + gh * 0.08);
        line.graphics.lineTo(alertbg.x + GetWidth(alertBox), GetHeight(alertText) + gh * 0.08);
        /**alert弹窗"确定文本" */
        var closeField = new egret.TextField();
        alertBox.addChild(closeField);
        closeField.text = "OK";
        closeField.textColor = 0x1383FE;
        closeField.fontFamily = "黑体";
        textScaleFun(closeField, gh * 0.028 / gh);
        closeField.width = gh * 0.38;
        closeField.textAlign = "center";
        closeField.x = gw / 2 - GetWidth(closeField) / 2;
        closeField.y = GetHeight(alertText) + gh * 0.08 + gh * 0.0225;
        /**alert弹窗点击事件 */
        closeLayer.touchEnabled = true;
        closeLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, touchbegin, GameLayer);
        alertLayer.addEventListener(egret.TouchEvent.TOUCH_END, touchend, GameLayer);
        function touchbegin() {
            closeLayer.alpha = 0.7;
        }
        function touchend() {
            closeLayer.alpha = 0.9;
        }
        closeLayer.once(egret.TouchEvent.TOUCH_TAP, function () {
            closeLayer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, touchbegin, GameLayer);
            alertLayer.removeEventListener(egret.TouchEvent.TOUCH_END, touchend, GameLayer);
            GameLayer.removeChild(alertLayer);
            if (callback) {
                callback.call(thisObj);
            }
        }, GameLayer);
    }
    Lgs.LAlert = LAlert;
    /**从父级移除 */
    function LremoveChild(obj) {
        if (obj.parent != null && obj != null)
            obj.parent.removeChild(obj);
    }
    Lgs.LremoveChild = LremoveChild;
    /**移除监听 */
    function removedListener(obj, listenerStyle, afun, thisObj) {
        obj.once(egret.Event.REMOVED_FROM_STAGE, function () {
            obj.removeEventListener(listenerStyle, afun, thisObj);
        }, thisObj);
    }
    Lgs.removedListener = removedListener;
    /**移除缓动 */
    function removedTweens(obj) {
        obj.once(egret.Event.REMOVED_FROM_STAGE, function () {
            egret.Tween.removeTweens(obj);
        }, obj);
    }
    Lgs.removedTweens = removedTweens;
    /**矩形碰撞 设置根据原大小的改变的数值碰撞 可以不设置*/
    function LHitTest(obj1, obj2, s_xy1, s_xy2) {
        if (!obj1.visible || !obj2.visible) {
            return false;
        }
        ;
        var box1, box2;
        var rect1 = obj1.getBounds();
        var rect2 = obj2.getBounds();
        var hitRect1;
        var hitRect2;
        if (!s_xy1) {
            hitRect1 = [0, 0, -0, -0];
        }
        else {
            hitRect1 = s_xy1;
        }
        if (!s_xy2) {
            hitRect2 = [0, 0, -0, -0];
        }
        else {
            hitRect2 = s_xy2;
        }
        rect1.x = obj1.x - obj1.anchorOffsetX * obj1.scaleX + hitRect1[0];
        rect1.y = obj1.y - obj1.anchorOffsetY * obj1.scaleY + hitRect1[1];
        rect1.width = rect1.width * obj1.scaleX + hitRect1[2];
        rect1.height = rect1.height * obj1.scaleY + hitRect1[3];
        rect2.x = obj2.x - obj2.anchorOffsetX * obj2.scaleX + hitRect2[0];
        rect2.y = obj2.y - obj2.anchorOffsetY * obj2.scaleY + hitRect2[1];
        rect2.width = rect2.width * obj2.scaleX + hitRect2[2];
        rect2.height = rect2.height * obj2.scaleY + hitRect2[3];
        return rect1.intersects(rect2);
    }
    Lgs.LHitTest = LHitTest;
    /**矩形碰撞2 设置碰撞大小碰撞位置基于object 可以不设置*/
    function LHittestShape(obj1, obj2, s_xy1, s_xy2) {
        if (!obj1.visible || !obj2.visible) {
            return false;
        }
        ;
        var box1, box2;
        var rect1 = obj1.getBounds();
        var rect2 = obj2.getBounds();
        var hitRect1;
        var hitRect2;
        if (!s_xy1) {
            hitRect1 = [0, 0, GetWidth(obj1), GetHeight(obj1)];
        }
        else {
            hitRect1 = s_xy1;
        }
        if (!s_xy2) {
            hitRect2 = [0, 0, GetWidth(obj2), GetHeight(obj2)];
        }
        else {
            hitRect2 = s_xy2;
        }
        rect1.x = obj1.x - obj1.anchorOffsetX * obj1.scaleX + hitRect1[0];
        rect1.y = obj1.y - obj1.anchorOffsetY * obj1.scaleY + hitRect1[1];
        rect1.width = hitRect1[2];
        rect1.height = hitRect1[3];
        rect2.x = obj2.x - obj2.anchorOffsetX * obj2.scaleX + hitRect2[0];
        rect2.y = obj2.y - obj2.anchorOffsetY * obj2.scaleY + hitRect2[1];
        rect2.width = hitRect2[2];
        rect2.height = hitRect2[3];
        /**画出碰撞矩形 */
        // if(!obj1['shape1']){
        //     obj1['shape1'] = new egret.Shape();
        // }
        // let hitShape1 = obj1['shape1'];
        // if(!obj2['shape1']){
        //     obj2['shape1'] = new egret.Shape();
        // }
        // let hitShape2 = obj2['shape1'];
        // hitShape1.graphics.clear();
        // obj1.stage.addChild(hitShape1);
        // hitShape1.graphics.beginFill(0xDD5044);
        // hitShape1.graphics.drawRect(rect1.x,rect1.y,rect1.width,rect1.height);
        // hitShape1.graphics.endFill();
        // hitShape1.alpha = 0.5;
        // hitShape2.graphics.clear();
        // obj1.stage.addChild(hitShape2);
        // hitShape2.graphics.beginFill(0xFFCE45);
        // hitShape2.graphics.drawRect(rect2.x,rect2.y,rect2.width,rect2.height);
        // hitShape2.graphics.endFill();
        // hitShape2.alpha = 0.5;
        /** */
        return rect1.intersects(rect2);
    }
    Lgs.LHittestShape = LHittestShape;
    /**矩形碰撞2.2 直接设置碰撞大小 碰撞位置随意设置 可以不设置*/
    function LHittestShape2(obj1, obj2, s_xy1, s_xy2) {
        if (!obj1.visible || !obj2.visible) {
            return false;
        }
        ;
        var box1, box2;
        var rect1 = obj1.getBounds();
        var rect2 = obj2.getBounds();
        var hitRect1;
        var hitRect2;
        if (!s_xy1) {
            hitRect1 = [
                obj1.x - obj1.anchorOffsetX * obj1.scaleX,
                obj1.y - obj1.anchorOffsetY * obj1.scaleY,
                GetWidth(obj1), GetHeight(obj1)
            ];
        }
        else {
            hitRect1 = s_xy1;
        }
        if (!s_xy2) {
            hitRect2 = [0, 0, GetWidth(obj2), GetHeight(obj2)];
            hitRect2 = [
                obj2.x - obj2.anchorOffsetX * obj2.scaleX,
                obj2.y - obj2.anchorOffsetY * obj2.scaleY,
                GetWidth(obj2), GetHeight(obj2)
            ];
        }
        else {
            hitRect2 = s_xy2;
        }
        rect1.x = hitRect1[0];
        rect1.y = hitRect1[1];
        rect1.width = hitRect1[2];
        rect1.height = hitRect1[3];
        rect2.x = hitRect2[0];
        rect2.y = hitRect2[1];
        rect2.width = hitRect2[2];
        rect2.height = hitRect2[3];
        /**画出碰撞矩形 */
        // if(!obj1['shape1']){
        //     obj1['shape1'] = new egret.Shape();
        // }
        // let hitShape1 = obj1['shape1'];
        // if(!obj2['shape1']){
        //     obj2['shape1'] = new egret.Shape();
        // }
        // let hitShape2 = obj2['shape1'];
        // hitShape1.graphics.clear();
        // obj1.stage.addChild(hitShape1);
        // hitShape1.graphics.beginFill(0xDD5044);
        // hitShape1.graphics.drawRect(rect1.x,rect1.y,rect1.width,rect1.height);
        // hitShape1.graphics.endFill();
        // hitShape1.alpha = 0.5;
        // hitShape2.graphics.clear();
        // obj1.stage.addChild(hitShape2);
        // hitShape2.graphics.beginFill(0xFFCE45);
        // hitShape2.graphics.drawRect(rect2.x,rect2.y,rect2.width,rect2.height);
        // hitShape2.graphics.endFill();
        // hitShape2.alpha = 0.5;
        /** */
        return rect1.intersects(rect2);
    }
    Lgs.LHittestShape2 = LHittestShape2;
    /**点与矩形相交 */
    function LHitTestPoint(point, obj2) {
        var pointer = new egret.Point(point.x, point.y);
        if (pointer.x >= obj2.x - obj2.anchorOffsetX * obj2.scaleX
            && pointer.x <= obj2.x - obj2.anchorOffsetX * obj2.scaleX + GetWidth(obj2)
            && pointer.y >= obj2.y - obj2.anchorOffsetY * obj2.scaleY
            && pointer.y <= obj2.y - obj2.anchorOffsetY * obj2.scaleY + GetHeight(obj2)) {
            return true;
        }
        return false;
    }
    Lgs.LHitTestPoint = LHitTestPoint;
    function DragFun(
        /** 拖动对象集
         * obj:obj-egret.DisplayObject 被拖动的对象,
         * stage:obj-egret.DisplayObject 触发拖动的对象,
         * moveStage:obj-egret.DisplayObject 拖动触发区域 对象,
         * callStage:obj-egret.DisplayObject 拖动的定义域
         */
        objs, 
        /** callback
         * downFun:fun-Function,
         * moveFun:fun-Function,
         * upFun:fun-Function
         */
        callbacks, 
        /** callback
         * downObj:obj-egret.DisplayObject,
         * moveObj:obj-egret.DisplayObject,
         * upObj:obj-egret.DisplayObject
         */
        callbacksObjs, 
        /**支持移动的方向 x:水平方向 y:垂直方向*/
        moveSlide, moveXianzhi) {
        /**示例 */
        // DragFun(
        // 	{
        // 		"obj":this.plane,
        // 		"stage":this.plane,
        // 		"moveStage":this,
        // 		"callStage":this
        // 	}
        // 	,{
        // 		"downFun":function(obj){},
        // 		"moveFun":function(obj){},
        // 		"upFun":function(obj){},
        // 	}
        // 	,{
        // 		"downObj":0,
        // 		"moveObj":0,
        // 		"upObj":0
        // 	}	
        // );
        /**示例 end*/
        var funs = {
            "downFun": function (obj) { },
            "moveFun": function (obj) { },
            "upFun": function (obj) { },
        };
        var cbObjs = {
            "downObj": 0,
            "moveObj": 0,
            "upObj": 0
        };
        if (callbacks) {
            funs = callbacks;
        }
        if (callbacksObjs) {
            cbObjs = callbacksObjs;
        }
        /**是否被拖动 */
        var heroTouch = false;
        var movex = 0;
        var movey = 0;
        objs.obj.touchEnabled = true;
        objs.stage.touchEnabled = true;
        objs.moveStage.touchEnabled = true;
        objs.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, touchdown, objs.callStage);
        objs.stage.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, touchup, objs.callStage);
        objs.stage.addEventListener(egret.TouchEvent.TOUCH_END, touchup, objs.callStage);
        removedListener(objs.stage, egret.TouchEvent.TOUCH_BEGIN, touchdown, objs.callStage);
        removedListener(objs.stage, egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, touchup, objs.callStage);
        removedListener(objs.stage, egret.TouchEvent.TOUCH_END, touchup, objs.callStage);
        removedListener(objs.moveStage, egret.TouchEvent.TOUCH_MOVE, touchmove, objs.callStage);
        function touchdown(evt) {
            if (evt.type == egret.TouchEvent.TOUCH_BEGIN) {
                funs.downFun(cbObjs.downObj);
                heroTouch = true;
                movex = objs.obj.x - evt.stageX;
                movey = objs.obj.y - evt.stageY;
                objs.moveStage.addEventListener(egret.TouchEvent.TOUCH_MOVE, touchmove, objs.callStage);
            }
        }
        function touchmove(evt) {
            if (evt.type == egret.TouchEvent.TOUCH_MOVE) {
                if (heroTouch) {
                    funs.moveFun(cbObjs.moveObj);
                    var tx = evt.stageX + movex;
                    var ty = evt.stageY + movey;
                    tx = Math.max(pw_sx - gh * 0.02 + objs.obj.anchorOffsetX * objs.obj.scaleX, tx);
                    tx = Math.min(gw - pw_sx + gh * 0.02 - (GetWidth(objs.obj) - objs.obj.anchorOffsetX * objs.obj.scaleX), tx);
                    ty = Math.max(-gh * 0.02 + objs.obj.anchorOffsetY * objs.obj.scaleY, ty);
                    ty = Math.min(gh - GetHeight(objs.obj) / 2 + objs.obj.anchorOffsetY * objs.obj.scaleY, ty);
                    if (moveSlide) {
                        if (moveSlide == "x") {
                            objs.obj.x = tx;
                            if (moveXianzhi) {
                                if (objs.obj.x < gw / 2 + moveXianzhi[0]) {
                                    objs.obj.x = gw / 2 + moveXianzhi[0];
                                }
                                else if (objs.obj.x > gw / 2 + moveXianzhi[1]) {
                                    objs.obj.x = gw / 2 + moveXianzhi[1];
                                }
                            }
                        }
                        if (moveSlide == "y") {
                            objs.obj.y = ty;
                            if (moveXianzhi) {
                                if (objs.obj.y < moveXianzhi[0]) {
                                    objs.obj.x = moveXianzhi[0];
                                }
                                else if (objs.obj.x > moveXianzhi[1]) {
                                    objs.obj.x = moveXianzhi[1];
                                }
                            }
                        }
                    }
                    else {
                        objs.obj.x = tx;
                        objs.obj.y = ty;
                    }
                }
            }
        }
        function touchup(evt) {
            funs.upFun(cbObjs.upObj);
            heroTouch = false;
            objs.moveStage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, touchmove, objs.callStage);
        }
    }
    Lgs.DragFun = DragFun;
    ;
    /**canMinus 返回的值是否可以为负数 */
    function GetWidth(obj, canMinus) {
        var result = obj.width * obj.scaleX;
        if (!canMinus) {
            result = Math.abs(obj.width * obj.scaleX);
        }
        return result;
    }
    Lgs.GetWidth = GetWidth;
    function GetHeight(obj, canMinus) {
        var result = obj.height * obj.scaleY;
        if (!canMinus) {
            result = Math.abs(obj.height * obj.scaleY);
        }
        return result;
    }
    Lgs.GetHeight = GetHeight;
    function createBitmapByName(name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        result.scaleX = result.scaleY = initScale;
        return result;
    }
    Lgs.createBitmapByName = createBitmapByName;
    /**通过URL加载外部图片 */
    function addBitmapByUrl(x, y, height, thisParent, url, style, headBg, callBack, thisObj) {
        RES.getResByUrl(url, function (texture) {
            //将加载完的资源进行显示
            if (texture) {
                var result = new egret.Bitmap(texture);
                scaleFun(result, (height) / gh);
                if (style && style == "headImg") {
                    if (result.width > result.height) {
                        scaleXFun(result, (height + 2) / gh);
                    }
                }
                result.anchorOffsetX = result.width / 2;
                result.anchorOffsetY = result.height / 2;
                result.x = x + GetWidth(result) / 2;
                result.y = y + GetHeight(result) / 2;
                this.addChild(result);
                this.dispatchEventWith("imgOk");
                if (callBack) {
                    callBack.call(thisObj, result);
                }
            }
            else {
                headBg.anchorOffsetX = headBg.width / 2;
                headBg.anchorOffsetY = headBg.height / 2;
                headBg.x = x + GetWidth(headBg) / 2;
                headBg.y = y + GetHeight(headBg) / 2;
                this.addChild(headBg);
                this.dispatchEventWith("imgOk");
            }
        }, thisParent, RES.ResourceItem.TYPE_IMAGE);
    }
    Lgs.addBitmapByUrl = addBitmapByUrl;
    /**根据高等比缩放 */
    function scaleFun(obj, height_num) {
        obj.scaleX = obj.scaleY = gh * height_num / obj.height;
    }
    Lgs.scaleFun = scaleFun;
    /**根据宽等比缩放 */
    function scaleFun_x(obj, width_num) {
        obj.scaleX = obj.scaleY = gh * width_num / obj.width;
    }
    Lgs.scaleFun_x = scaleFun_x;
    /**压缩scaleX*/
    function scaleXFun(obj, width_num) {
        obj.scaleX = gh * width_num / obj.width;
    }
    Lgs.scaleXFun = scaleXFun;
    /**压缩scaleY */
    function scaleYFun(obj, height_num) {
        obj.scaleY = gh * height_num / obj.height;
    }
    Lgs.scaleYFun = scaleYFun;
    function textScaleFun(obj, height_num, fontFamily) {
        var result = new egret.TextField();
        if (fontFamily)
            obj.fontFamily = fontFamily;
        result.fontFamily = obj.fontFamily;
        result.text = "默认值";
        if (result.text && result.height != 0) {
            while (result.height < gh * height_num) {
                result.size++;
            }
            while (result.height > gh * height_num) {
                result.size--;
            }
        }
        obj.size = result.size;
    }
    Lgs.textScaleFun = textScaleFun;
    function textScaleXFun(obj, objText, height_num, width_num) {
        textScaleFun(obj, height_num);
        var result = new egret.TextField();
        result.text = objText;
        result.size = obj.size;
        if (result.text && result.width != 0) {
            while (result.width > gh * width_num) {
                result.size--;
            }
        }
        obj.size = result.size;
    }
    Lgs.textScaleXFun = textScaleXFun;
    /**addQR */
    function addQR(x, y, height, visible, qrUrl) {
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
            myImg.src = $staticUrl + "resource/assets/QR.jpg";
        }
        myImg.id = "QR";
        gameDiv.appendChild(myImg);
        var timer = egret.setInterval(function () {
            IsQRloadComplete = QRloadComplete(x, y, height);
            if (visible) {
                myImg.style.display = 'block';
            }
            else {
                myImg.style.display = 'none';
            }
            if (IsQRloadComplete) {
                egret.clearInterval(timer);
            }
        }, this, 33);
        /**返回QR是否加载完成 */
        function QRloadComplete(x, y, height) {
            if (document.getElementById('QR')['complete']) {
                setQRposition(x, y, height);
                return true;
            }
            else {
                return false;
            }
        }
    }
    Lgs.addQR = addQR;
    /**设置QR位置 */
    function setQRposition(x, y, height, visible) {
        // console.log("QRloadComplete is " + IsQRloadComplete);
        var w_h = myImg.width / myImg.height;
        myImg.style.height = height;
        var heightNum = (height.replace("%", "")) / 100;
        var widthNum = (heightNum * window.innerHeight) * w_h;
        myImg.style.width = widthNum + "px";
        var left_x = window.innerWidth / 2 - widthNum / 2 + window.innerHeight * x;
        var left_y = window.innerHeight * y;
        myImg.style.left = left_x + 'px';
        myImg.style.top = left_y + 'px';
        myImg.style.position = "absolute";
        if (visible) {
            myImg.style.display = 'block';
        }
        else {
            myImg.style.display = 'none';
        }
    }
    Lgs.setQRposition = setQRposition;
    function removeQR() {
        myImg.style.display = 'none';
    }
    Lgs.removeQR = removeQR;
    /**仅支持Btn的按钮模型 */
    function BtnMode(obj, notBtn) {
        var thisScale = obj.scaleX;
        obj.anchorOffsetX = obj.width / 2;
        obj.anchorOffsetY = obj.height / 2;
        obj.x = obj.x + GetWidth(obj) / 2;
        obj.y = obj.y + GetHeight(obj) / 2;
        // obj.x =  obj.x + obj.anchorOffsetX*initScale;
        // obj.y =  obj.y + obj.anchorOffsetY*initScale;
        if (!notBtn) {
            obj.touchEnabled = true;
            obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, btnView, this);
            removedListener(obj, egret.TouchEvent.TOUCH_BEGIN, btnView, this);
        }
        function btnView(evt) {
            var btnobj = evt.currentTarget;
            egret.Tween.get(btnobj).to({ scaleX: thisScale * 0.9, scaleY: thisScale * 0.9 }, 100, egret.Ease.backOut)
                .to({ scaleX: thisScale, scaleY: thisScale }, 250, egret.Ease.backOut);
        }
    }
    Lgs.BtnMode = BtnMode;
    /**知道方向xy、长度z,求移动方向xy */
    function xyFun(x, y, z) {
        // 弧度
        var hd = Math.atan2(x, y);
        // y:z
        var ybz = Math.sin(hd + Math.PI / 2);
        var yb = z * ybz;
        var xb;
        if (hd < 0) {
            xb = -Math.sqrt(z * z - yb * yb);
        }
        else {
            xb = Math.sqrt(z * z - yb * yb);
        }
        return { "x": xb, "y": yb };
    }
    Lgs.xyFun = xyFun;
    /**object矩形线段相交 适用于旋转相交(对象线段必定重叠的相交)*/
    function LHitTestObject(obj1, obj2) {
        if (obj1.visible && obj2.visible) {
            var q1 = obj1.localToGlobal(0, 0);
            var q2 = obj1.localToGlobal(obj1.width, 0);
            var q3 = obj1.localToGlobal(obj1.width, obj1.height);
            var q4 = obj1.localToGlobal(0, obj1.height);
            var p1 = obj2.localToGlobal(0, 0);
            var p2 = obj2.localToGlobal(obj2.width, 0);
            var p3 = obj2.localToGlobal(obj2.width, obj2.height);
            var p4 = obj2.localToGlobal(0, obj2.height);
            /**画出碰撞四边形 */
            // drawShape(obj1,[q1,q2,q3,q4],0x339933);
            // drawShape(obj2,[p1,p2,p3,p4],0xff0000);
            /** */
            var qArr = [q1, q2, q3, q4];
            var pArr = [p1, p2, p3, p4];
            for (var qo = 0; qo < qArr.length; qo++) {
                var qq2 = qo + 1;
                if (qo == qArr.length - 1) {
                    qq2 = 0;
                }
                for (var po = 0; po < pArr.length; po++) {
                    var pp2 = po + 1;
                    if (po == pArr.length - 1) {
                        pp2 = 0;
                    }
                    var isHit = segmentsIntr(qArr[qo], qArr[qq2], pArr[po], pArr[pp2]);
                    if (isHit) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    Lgs.LHitTestObject = LHitTestObject;
    /**object矩形线段相交 自由设定基于object位置的碰撞大小 */
    function LHitTestObject2(obj1, obj2, arr1, arr2) {
        if (!arr1) {
            arr1 = [
                [0, 0],
                [GetWidth(obj1), 0],
                [GetWidth(obj1), GetHeight(obj1)],
                [0, GetHeight(obj1)]
            ];
            arr2 = [
                [0, 0],
                [GetWidth(obj2), 0],
                [GetWidth(obj2), GetHeight(obj2)],
                [0, GetHeight(obj2)]
            ];
        }
        if (obj1.visible && obj2.visible) {
            var q1 = obj1.localToGlobal(arr1[0][0], arr1[0][1]);
            var q2 = obj1.localToGlobal(arr1[1][0], arr1[1][1]);
            var q3 = obj1.localToGlobal(arr1[2][0], arr1[2][1]);
            var q4 = obj1.localToGlobal(arr1[3][0], arr1[3][1]);
            var p1 = obj2.localToGlobal(arr2[0][0], arr2[0][1]);
            var p2 = obj2.localToGlobal(arr2[1][0], arr2[1][1]);
            var p3 = obj2.localToGlobal(arr2[2][0], arr2[2][1]);
            var p4 = obj2.localToGlobal(arr2[3][0], arr2[3][1]);
            /**画出碰撞四边形 */
            // drawShape(obj1,[q1,q2,q3,q4],0x339933);
            // drawShape(obj2,[p1,p2,p3,p4],0xff0000);
            /** */
            var qArr = [q1, q2, q3, q4];
            var pArr = [p1, p2, p3, p4];
            for (var qo = 0; qo < qArr.length; qo++) {
                var qq2 = qo + 1;
                if (qo == qArr.length - 1) {
                    qq2 = 0;
                }
                for (var po = 0; po < pArr.length; po++) {
                    var pp2 = po + 1;
                    if (po == pArr.length - 1) {
                        pp2 = 0;
                    }
                    var isHit = segmentsIntr(qArr[qo], qArr[qq2], pArr[po], pArr[pp2]);
                    if (isHit) {
                        clearShape(obj1);
                        clearShape(obj2);
                        return true;
                    }
                }
            }
        }
        return false;
    }
    Lgs.LHitTestObject2 = LHitTestObject2;
    /**判断线段相交方程 3*/
    function segmentsIntr(a, b, c, d) {
        // 三角形abc 面积的2倍  
        var area_abc = (a.x - c.x) * (b.y - c.y) - (a.y - c.y) * (b.x - c.x);
        // 三角形abd 面积的2倍  
        var area_abd = (a.x - d.x) * (b.y - d.y) - (a.y - d.y) * (b.x - d.x);
        // 面积符号相同则两点在线段同侧,不相交 (对点在线段上的情况,本例当作不相交处理);  
        if (area_abc * area_abd >= 0) {
            return false;
        }
        // 三角形cda 面积的2倍  
        var area_cda = (c.x - a.x) * (d.y - a.y) - (c.y - a.y) * (d.x - a.x);
        // 三角形cdb 面积的2倍  
        // 注意: 这里有一个小优化.不需要再用公式计算面积,而是通过已知的三个面积加减得出.  
        var area_cdb = area_cda + area_abc - area_abd;
        if (area_cda * area_cdb >= 0) {
            return false;
        }
        //计算交点坐标  
        var t = area_cda / (area_abd - area_abc);
        var dx = t * (b.x - a.x), dy = t * (b.y - a.y);
        return { x: a.x + dx, y: a.y + dy };
    }
    Lgs.segmentsIntr = segmentsIntr;
    /**画出碰撞形状 */
    function drawShape(obj, positionData, color) {
        if (!(obj["shape1"] instanceof egret.Shape)) {
            obj["shape1"] = new egret.Shape();
            GameLayer.addChild(obj["shape1"]);
            obj.once(egret.Event.REMOVED_FROM_STAGE, function () {
                obj["shape1"].graphics.clear();
                LremoveChild(obj["shape1"]);
            }, obj);
        }
        var hitShape1 = obj['shape1'];
        hitShape1.graphics.clear();
        if (obj.visible && obj.parent) {
            hitShape1.graphics.lineStyle(2, color);
            hitShape1.graphics.moveTo(positionData[0].x, positionData[0].y);
            for (var i = 1; i < positionData.length; i++) {
                hitShape1.graphics.lineTo(positionData[i].x, positionData[i].y);
            }
            hitShape1.graphics.lineTo(positionData[0].x, positionData[0].y);
        }
    }
    Lgs.drawShape = drawShape;
    ;
    function clearShape(obj) {
        if ((obj["shape1"] instanceof egret.Shape)) {
            var hitShape1 = obj['shape1'];
            hitShape1.graphics.clear();
        }
    }
    Lgs.clearShape = clearShape;
    ;
})(Lgs || (Lgs = {}));
//# sourceMappingURL=GameUtil.js.map
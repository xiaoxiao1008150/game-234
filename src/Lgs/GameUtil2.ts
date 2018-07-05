// 竖屏提示层
declare var uprightTipsLayer:egret.Sprite;
/**信息展示 */
let gameInfoView:egret.Sprite;
/**数据提示 数据组 */
let LTipsArr = [];
let myDebug = true;

let LMsgArr = [];
let myImg2:HTMLImageElement;

module Lgs
{
    /**00:00:60 */
	export function hmsFun($num:number):string{
		let $timeCount = $num;
		let $h1:any = Math.floor($timeCount/60/60);
		let $m1:any = Math.floor($timeCount/60)%60;
		let $s1:any = Math.floor($timeCount)%60;
		if($h1<10){
			$h1 = "0"+$h1;
		}
		if($m1<10){
			$m1 = "0"+$m1;
		}
		if($s1<10){
			$s1 = "0"+$s1;
		}
		let $hms1 = $h1+":"+$m1+":"+$s1;
		return $hms1;
	}

    /**LAlert2 弹出提示*/
    export function LAlert2(text:string,yesCallback?:Function,noCallback?:Function,thisObj?:egret.DisplayObjectContainer){
        let alertLayer = new egret.Sprite();
        GameLayer.addChild(alertLayer);
        alertLayer.touchEnabled = true;

        let alertShape = new egret.Shape();
        alertLayer.addChild(alertShape);
        alertShape.graphics.beginFill(0x000000);
        alertShape.graphics.drawRect(0,0,gw,gh);
        alertShape.graphics.endFill();
        alertShape.alpha = 0.4;
    /** 弹窗 */
        let alertBox = new egret.Sprite();
        alertLayer.addChild(alertBox);
    /** 弹窗文本 */
        let alertText = new egret.TextField();
        alertText.text = text;
        alertText.textColor = 0x222222;
        textScaleFun(alertText,gh*0.0225/gh);
        alertText.width = gh*0.38;
        alertText.textAlign = "center";
        alertText.lineSpacing = gh*0.01;
        alertText.x = gw/2 - GetWidth(alertText)/2;
        alertText.y = gh*0.04;
    /** 弹窗文本"背景"-以及它的mask */
        let bgmask = new egret.Shape();
        alertBox.addChild(bgmask);
        bgmask.graphics.beginFill(0xffffff);
        bgmask.graphics.drawRect(0,0,GetWidth(alertText) + gh*0.08,GetHeight(alertText) + gh*0.08);
        bgmask.graphics.endFill();
        bgmask.x = gw/2 - GetWidth(bgmask)/2;

        let alertbg = new egret.Shape();
        alertBox.addChild(alertbg);
        alertbg.graphics.beginFill(0xffffff);
        alertbg.graphics.drawRoundRect(0,0,GetWidth(alertText) + gh*0.08,GetHeight(alertText) + gh*0.08 + gh*0.075,gh*0.04);
        alertbg.graphics.endFill();
        alertbg.alpha = 0.9;
        alertbg.x = gw/2 - GetWidth(alertbg)/2;
        alertbg.mask = bgmask
        alertBox.addChild(alertText);
        alertBox.y = gh*0.5 - GetHeight(alertBox)/2 - gh*0.045;
    /** "确定背景"-以及它的mask */
        let yesmask = new egret.Shape();
        alertBox.addChild(yesmask);
        yesmask.graphics.beginFill(0x000000);
        yesmask.graphics.drawRoundRect(0,0,GetWidth(alertText) + gh*0.08,GetHeight(alertText) + gh*0.08 + gh*0.07,gh*0.04);
        yesmask.graphics.endFill();
        yesmask.x = gw/2 - GetWidth(yesmask)/2;

        let yesLayer = new egret.Shape();
        alertBox.addChild(yesLayer);
        yesLayer.graphics.beginFill(0xf8f8f8);
        yesLayer.graphics.drawRect(0,GetHeight(alertText) + gh*0.08,GetWidth(alertText)/2 + gh*0.04,gh*0.07);
        yesLayer.graphics.endFill();
        yesLayer.alpha = 0.9;
        yesLayer.x = gw/2 - GetWidth(yesLayer);
        yesLayer.mask = yesmask;
    /** "确定文本"*/
        let yesField = new egret.TextField();
        alertBox.addChild(yesField);
        yesField.text = "是";
        yesField.textColor = 0x1383FE;
        yesField.fontFamily = "黑体";
        textScaleFun(yesField,gh*0.028/gh);
        yesField.width = gh*0.38;
        yesField.textAlign = "center";
        yesField.x = yesLayer.x + GetWidth(yesLayer)/2 - GetWidth(yesField)/2;
        yesField.y = GetHeight(alertText) + gh*0.08 + gh*0.0225;
    /** "否定背景"-以及它的mask */
        let nomask = new egret.Shape();
        alertBox.addChild(nomask);
        nomask.graphics.beginFill(0x000000);
        nomask.graphics.drawRoundRect(0,0,GetWidth(alertText) + gh*0.08,GetHeight(alertText) + gh*0.08 + gh*0.07,gh*0.04);
        nomask.graphics.endFill();
        nomask.x = gw/2 - GetWidth(nomask)/2;

        let noLayer = new egret.Shape();
        alertBox.addChild(noLayer);
        noLayer.graphics.beginFill(0xf8f8f8);
        noLayer.graphics.drawRect(GetWidth(alertText)/2 + gh*0.04,GetHeight(alertText) + gh*0.08,GetWidth(alertText)/2 + gh*0.04,gh*0.07);
        noLayer.graphics.endFill();
        noLayer.alpha = 0.9;
        noLayer.x = gw/2 - GetWidth(noLayer);
        noLayer.mask = nomask;
    /** "否定文本" */
        let noField = new egret.TextField();
        alertBox.addChild(noField);
        noField.text = "否";
        noField.textColor = 0x1383FE;
        noField.fontFamily = "黑体";
        textScaleFun(noField,gh*0.028/gh);
        noField.width = gh*0.38;
        noField.textAlign = "center";
        noField.x = noLayer.x + GetWidth(yesLayer) + GetWidth(noLayer)/2 - GetWidth(noField)/2;
        noField.y = GetHeight(alertText) + gh*0.08 + gh*0.0225;
    /**弹窗 分割线 */
        let line = new egret.Shape();
        alertBox.addChild(line);
        line.alpha = 0.2;
        line.graphics.lineStyle(1,0x444444,0.9);
        line.graphics.moveTo(alertbg.x,GetHeight(alertText) + gh*0.08);
        line.graphics.lineTo(alertbg.x + GetWidth(alertBox),GetHeight(alertText) + gh*0.08);
    /**按钮 分割线 */
        let btnLine = new egret.Shape();
        alertBox.addChild(btnLine);
        btnLine.alpha = 0.2;
        btnLine.graphics.lineStyle(1,0x444444,0.9);
        btnLine.graphics.moveTo(gw/2,GetHeight(alertText) + gh*0.08);
        btnLine.graphics.lineTo(gw/2,GetHeight(alertText) + gh*0.08+gh*0.07);
    /** "yes"点击事件 */
        yesLayer.touchEnabled = true;
        yesLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN,touchbegin,GameLayer);
        alertLayer.addEventListener(egret.TouchEvent.TOUCH_END,touchend,GameLayer);
        function touchbegin(){
            yesLayer.alpha = 0.7;
        }
        function touchend(){
            yesLayer.alpha = 0.9;
        }
        yesLayer.once(egret.TouchEvent.TOUCH_TAP,function(){
            yesLayer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,touchbegin,GameLayer);
            alertLayer.removeEventListener(egret.TouchEvent.TOUCH_END,touchend,GameLayer);
            GameLayer.removeChild(alertLayer);
            if(yesCallback){
                yesCallback.call(thisObj);
            }
        },GameLayer);
    /** "no"点击事件 */
        noLayer.touchEnabled = true;
        noLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN,noTouchbegin,GameLayer);
        alertLayer.addEventListener(egret.TouchEvent.TOUCH_END,noTouchend,GameLayer);
        function noTouchbegin(){
            noLayer.alpha = 0.7;
        }
        function noTouchend(){
            noLayer.alpha = 0.9;
        }
        noLayer.once(egret.TouchEvent.TOUCH_TAP,function(){
            noLayer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,noTouchbegin,GameLayer);
            alertLayer.removeEventListener(egret.TouchEvent.TOUCH_END,noTouchend,GameLayer);
            GameLayer.removeChild(alertLayer);
            if(noCallback){
                noCallback.call(thisObj);
            }
        },GameLayer);
	}

    /**addQR2 */
    export function addQR2(x:number,y:number,height:string,visible:boolean,qrUrl?:string):void {
        gameDiv = document.getElementsByClassName("egret-player")[0];  
        if($("#QR").attr("src")){
            myImg.style.display = 'none';
        }else{
            myImg = document.createElement("img");
            myImg.style.display = 'none';
        }
        if(qrUrl){ 
            myImg.src = qrUrl;   
        }else{
            myImg.src = $staticUrl+"/resource/assets/QR.jpg";
        }
        myImg2.id = "QR2";
        gameDiv.appendChild(myImg2);
        let timer = egret.setInterval(function(){
            IsQRloadComplete = QRloadComplete2(x,y,height);
            if(visible){
                myImg2.style.display = 'block';
            }else{
                myImg2.style.display = 'none';
            }
            if(IsQRloadComplete){
                egret.clearInterval(timer);
            }
        },this,33);
        /**返回QR是否加载完成 */
        function QRloadComplete2(x,y,height){
            if (document.getElementById('QR2')['complete']){
                setQRposition2(x,y,height);
                return true;
            }else{
                return false;
            }
        }

    }
    /**设置QR位置 */
    export function setQRposition2(x:number,y:number,height:string|any,visible?:boolean):void {
        // console.log("QRloadComplete is " + IsQRloadComplete);
        var w_h = myImg2.width/myImg2.height;
        myImg2.style.height = height;

        var heightNum =(height.replace("%",""))/100;
        var widthNum = (heightNum*window.innerHeight)*w_h;
        myImg2.style.width = widthNum + "px";

        var left_x = window.innerWidth/2 - widthNum/2 + window.innerHeight*x;
        var left_y = window.innerHeight*y;
        myImg2.style.left = left_x +'px';
        myImg2.style.top = left_y +'px';
        myImg2.style.position = "absolute";
        if(visible){
            myImg2.style.display = 'block';
        }else{
            myImg2.style.display = 'none';
        }
    }
    /**提示锁定竖屏游戏 */
	export function uprightTipsFun():egret.Sprite {
        let uprightResultLayer = new egret.Sprite();
        uprightResultLayer.touchEnabled = true;

        // uprightResultLayer.rotation = 90;
        // uprightResultLayer.x = gw;

        let uprightShape = new egret.Shape();
        uprightResultLayer.addChild(uprightShape);
        uprightShape.graphics.beginFill(0x000000);
        uprightShape.graphics.drawRect(0,0,gw,gh);
        uprightShape.graphics.endFill();
        // let hengping = createBitmapByName("hengping_png");
        // uprightResultLayer.addChild(hengping);
        // hengping.x = gh/2 - GetWidth(hengping)/2;
        // hengping.y = gw/2 - GetHeight(hengping);

        let hpTipsField = new egret.TextField();
        uprightResultLayer.addChild(hpTipsField);
        textScaleFun(hpTipsField,0.07);
        hpTipsField.textAlign = "center";
        hpTipsField.fontFamily = "黑体";
        hpTipsField.text = "请锁定竖屏横置手机以获得最佳体验";/**\n 换行*/

        hpTipsField.x = gw/2 - GetWidth(hpTipsField)/2;
        hpTipsField.y = gh/2 - GetHeight(hpTipsField)/2 - gh*0.03;

		return uprightResultLayer;
	}
    /**弹窗动画 */
	export function winEnterAni(
        tcShape,winLayer,
        /** "scale01" "scale21" "up" "down" "right" "left" */
        aniStyle,callback?,thisObj?) {
        tcShape.alpha = 0;
        winLayer.width = gw;
        winLayer.height = gh;
        if(tcShape instanceof egret.Shape){
            egret.Tween.get(tcShape).to({alpha:0.7},320);
        }else{
            egret.Tween.get(tcShape).to({alpha:1},320);
        }
        egret.Tween.get(winLayer).to({alpha:1},320);
        switch (aniStyle){
            case "scale01":
                BtnMode(winLayer,true);
                winLayer.x = gw/2;
                winLayer.scaleX = winLayer.scaleY = 0;
                egret.Tween.get(winLayer).to({scaleX:1,scaleY:1},320,egret.Ease.backOut).call(aniEndFun,thisObj);
                break;
            case "scale21":
                BtnMode(winLayer,true);
                winLayer.x = gw/2;
                winLayer.scaleX = winLayer.scaleY = initScale*2;
                egret.Tween.get(winLayer).to({scaleX:1,scaleY:1},320,egret.Ease.backOut).call(aniEndFun,thisObj);
                break;
            case "up":
                BtnMode(winLayer,true);
                winLayer.y = gh*1.5;
                egret.Tween.get(winLayer).to({y:gh*0.5},370,egret.Ease.quadOut).call(aniEndFun,thisObj);
                break;
            case "down":
                BtnMode(winLayer,true);
                winLayer.y = -gh*1.5;
                egret.Tween.get(winLayer).to({y:gh*0.5},370,egret.Ease.quadOut).call(aniEndFun,thisObj);
                break;
            case "left":
                BtnMode(winLayer,true);
                winLayer.x = gw*1.5;
                egret.Tween.get(winLayer).to({x:gw*0.5},320,egret.Ease.quadOut).call(aniEndFun,thisObj);
                break;
            case "right":
                BtnMode(winLayer,true);
                winLayer.x = -gw*1.5;
                egret.Tween.get(winLayer).to({x:gw*0.5},320,egret.Ease.quadOut).call(aniEndFun,thisObj);
                break;
        }
        function aniEndFun(){
            if(callback){
                callback.call(thisObj);
            }   
        }
	}
	export function winCloseAni(tcShape,winLayer,aniStyle,callback?:any,thisObj?,delay?:number) {
            let delaynum = 0;
            delay?delaynum=delaynum:delaynum=0;
            egret.Tween.get(tcShape).wait(delaynum).to({alpha:0},320);
            egret.Tween.get(winLayer).wait(delaynum).to({alpha:0},320);
            switch (aniStyle){
                case "scale01":
                    egret.Tween.get(winLayer).wait(delaynum).to({scaleX:0,scaleY:0},320,egret.Ease.backIn).call(aniEndFun,thisObj);
                    break;
                case "scale21":
                    egret.Tween.get(winLayer).wait(delaynum).to({scaleX:2,scaleY:2},320,egret.Ease.backIn).call(aniEndFun,thisObj);
                    break;
                case "up":
                    egret.Tween.get(winLayer).wait(delaynum).to({y:-gh},370,egret.Ease.backIn).call(aniEndFun,thisObj);
                    break;
                case "down":
                    egret.Tween.get(winLayer).wait(delaynum).to({y:gh},370,egret.Ease.backIn).call(aniEndFun,thisObj);
                    break;
                case "left":
                    egret.Tween.get(winLayer).wait(delaynum).to({x:-gw},320,egret.Ease.backIn).call(aniEndFun,thisObj);
                    break;
                case "right":
                    egret.Tween.get(winLayer).wait(delaynum).to({x:gw},320,egret.Ease.backIn).call(aniEndFun,thisObj);
                    break;
            }
            function aniEndFun(){
                if(callback){
                    callback.call(thisObj);
                }
            }
	}
    /**仅支持Bitmap的Btn2的闪光按钮模型2 */
	export function BtnMode2(obj:egret.Bitmap,notBtn?:boolean) {
        let thisScale = obj.scaleX;
        obj.anchorOffsetX = obj.width/2;
        obj.anchorOffsetY = obj.height/2;
        obj.x =  obj.x + GetWidth(obj)/2;
        obj.y =  obj.y + GetHeight(obj)/2;

        let Btn33 = createBitmapByName("Btn33_png");
        scaleFun(Btn33,GetHeight(obj)/gh);
        obj.parent.addChild(Btn33);
        let obj2 = new egret.Bitmap();
        obj2.texture = obj.texture;
        obj2.scaleX = obj2.scaleY = thisScale*0.95;
        obj.parent.addChild(obj2);
        obj2.anchorOffsetX = obj.anchorOffsetX;
        obj2.anchorOffsetY = obj.anchorOffsetY;
        obj2.x = obj.x;
        obj2.y = obj.y - GetHeight(obj)*0.05;
        Btn33.mask = obj2;
        Btn33.x = obj2.x - GetWidth(obj)/2-GetWidth(Btn33);
        Btn33.y = obj2.y - GetHeight(obj)/2;
        Btn33.alpha = 0.7;

        removedTweens(Btn33);
        egret.Tween.get(Btn33,{loop:true})
        .wait(1000)
        .to({x:obj.x+GetWidth(obj)/2},1000);

        obj.once(egret.Event.REMOVED_FROM_STAGE,function(){
            LremoveChild(obj2);
            LremoveChild(Btn33);            
        },obj);

        if(!notBtn){
            obj.touchEnabled = true;
            obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){
                egret.Tween.get(obj).to({scaleX:thisScale*0.9,scaleY:thisScale*0.9},100,egret.Ease.backOut)
                .to({scaleX:thisScale,scaleY:thisScale},250,egret.Ease.backOut);
                egret.Tween.get(obj2).to({scaleX:thisScale*0.9,scaleY:thisScale*0.9},100,egret.Ease.backOut)
                .to({scaleX:thisScale,scaleY:thisScale},250,egret.Ease.backOut);
            },this);
        }

	}
    /**LInfoView 信息展示 debug,
     * textArr = [[数据名称,数据的值],[数据名称,数据的值]];
    */
    export function LInfoView(textArr:any[]){
        if(gameInfoView&&gameInfoView.parent){
            gameInfoView.parent.removeChild(gameInfoView);
        }
        gameInfoView = new egret.Sprite();
        GameLayer.addChild(gameInfoView);
        // gameInfoView.touchEnabled = true;

        let tsShape = new egret.Shape();
        gameInfoView.addChild(tsShape);
        tsShape.graphics.beginFill(0x000000);
        tsShape.graphics.drawRect(0,0,gw,gh);
        tsShape.graphics.endFill();
        tsShape.alpha = 0;

        let tsBox = new egret.Sprite();
        gameInfoView.addChild(tsBox);
        let tsbg = new egret.Shape();
        tsBox.addChild(tsbg);
        for(let i=0;i<textArr.length;i++){
            let tsText = new egret.TextField();
            tsText.text = textArr[i][0]+":";
            tsText.textColor = 0x333333;
            textScaleFun(tsText,0.022);
            // tsText.textAlign = "center";
            // tsText.width = gh*0.38;
            tsText.x = 0;
            tsText.y = gh*0.03*i;
            tsBox.addChild(tsText);

            let tsText2 = new egret.TextField();
            tsText2.text = textArr[i][1]+"";
            tsText2.textColor = 0x333333;
            textScaleFun(tsText2,0.022);
            // tsText2.textAlign = "center";
            // tsText2.width = gh*0.38;
            tsText2.x = tsText.x + GetWidth(tsText) + gh*0.01;
            tsText2.y = tsText.y;
            tsBox.addChild(tsText2);
        }
        tsbg.graphics.beginFill(0xFFBC01);
        tsbg.graphics.drawRect(0,0,GetWidth(tsBox) + gh*0.025,GetHeight(tsBox) + gh*0.025);
        tsbg.graphics.endFill();
        tsbg.alpha = 0.8;
        tsbg.x = -gh*0.025/2;
        tsbg.y = -gh*0.025/2;
        tsBox.x = gw - GetWidth(tsbg)+gh*0.025/2;
        tsBox.y = gh*0.025/2;

	}
    /**LTips 数据提示 debug*/
    export function LTips(obj:any,objName?:string,callback?:Function){
        if(!myDebug){
            return false;
        }
        let tsLayer = new egret.Sprite();
        GameLayer.parent.addChild(tsLayer);
        tsLayer.touchEnabled = true;

        let tsText = new egret.TextField();
        if(objName){
            tsText.text = objName+":"+obj+" >> "+typeof(obj);
        }else{
            tsText.text = obj+" >> "+typeof(obj);            
        }
        tsText.textColor = 0xffffff;
        textScaleFun(tsText,0.022);
        tsText.textAlign = "center";
        tsText.width = gh*0.38;
        tsText.x = gw/2 - GetWidth(tsText)/2;
        tsText.y = 10;

        let tsbg = new egret.Shape();
        tsLayer.addChild(tsbg);
        tsbg.graphics.beginFill(0xff0000);
        tsbg.graphics.drawRect(0,0,gw,GetHeight(tsText) + 20);
        tsbg.graphics.endFill();
        tsbg.alpha = 0.85;
        tsbg.x = gw/2 - GetWidth(tsbg)/2;
        tsLayer.addChild(tsText);
        if(LTipsArr.length>0){
            tsLayer.y = LTipsArr[LTipsArr.length-1].y + GetHeight(LTipsArr[LTipsArr.length-1]);
        }
        LTipsArr.push(tsLayer);

        tsLayer.touchEnabled = true;
        tsLayer.once(egret.TouchEvent.TOUCH_TAP,function(){
            tsLayer.parent.removeChild(tsLayer);
            if(callback){
                callback.call(this);
            }
            for(let i=0;i<LTipsArr.length;i++){
                let thiscue = LTipsArr[i];
                if(thiscue.hashCode==tsLayer.hashCode){
                    LTipsArr.splice(i,1);
                }
            }
            for(let i=0;i<LTipsArr.length;i++){
                let thiscue = LTipsArr[i];
                if(i==0){
                    thiscue.y = 0;
                }else{
                    thiscue.y = LTipsArr[i-1].y + GetHeight(LTipsArr[i-1]);
                }
            }
        },this);
	}

    export function showloading(txt?:string){
        if(txt){
            loadingScreen.loadingShow(txt);
        }else{
            loadingScreen.loadingShow();            
        }
    }
    export function hideloading(){
        loadingScreen.loadingHide();
    }
    /**意在创建一个碰撞形状类 可以增加贴图 未完成 */
    export class LHitShape233 extends egret.DisplayObjectContainer{
        public constructor(){
            super();
			this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
			this.once(egret.Event.REMOVED_FROM_STAGE,this.removedFun,this);
        }
        private onAddToStage(){
            
        }
        private hitShape;
        private hitTest(){
            // LHittestShape(this.hitShape);
            
        }
        private removedFun(){

        }
    }
}
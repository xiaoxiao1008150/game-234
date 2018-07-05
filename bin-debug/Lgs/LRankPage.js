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
    var LRankPage = (function (_super) {
        __extends(LRankPage, _super);
        function LRankPage() {
            var _this = _super.call(this) || this;
            _this.closeNum = 1;
            _this.rankData = false;
            // if(rankData){
            // 	this.rankData = rankData;
            // }
            // this.closeNum = num;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.once(egret.Event.REMOVED_FROM_STAGE, _this.removedFun, _this);
            return _this;
        }
        LRankPage.prototype.onAddToStage = function () {
            // bgmViewer.hide();
            var _THIS = this;
            this.touchEnabled = true;
            /**背景+其他 */
            this.rankBgLayer = new egret.Sprite();
            this.addChild(this.rankBgLayer);
            // let rankBg = createBitmapByName("rankBg_jpg");
            // this.rankBgLayer.addChild(rankBg);
            // rankBg.x = gw/2 - GetWidth(rankBg)/2;
            var rankTitle = Lgs.createBitmapByName("rankTitle_jpg");
            this.rankBgLayer.addChild(rankTitle);
            rankTitle.x = gw / 2 - Lgs.GetWidth(rankTitle) / 2;
            rankTitle.y = gh * 0.421;
            /**层级+其他 */
            this.winLayer = new egret.Sprite();
            this.addChild(this.winLayer);
            this.winLayer.width = gw;
            this.winLayer.height = gh;
            // let rankbg = createBitmapByName("rankBox_png");
            // this.winLayer.addChild(rankbg);
            // rankbg.x = gw/2 - GetWidth(rankbg)/2;
            // rankbg.y = gh*0.092;
            var slideView = Lgs.createBitmapByName("slideView_png");
            this.winLayer.addChild(slideView);
            slideView.x = gw / 2 - Lgs.GetWidth(slideView) / 2;
            slideView.y = gh * 0.931;
            var slidey = slideView.y;
            Lgs.removedTweens(slideView);
            egret.Tween.get(slideView, { loop: true })
                .to({ y: slidey + gh * 0.01 }, 400)
                .to({ y: slidey }, 200);
            /**我的排名 */
            var myRankLayer = new egret.Sprite();
            this.winLayer.addChild(myRankLayer);
            myRankLayer.y = gh * 0.31;
            var myRankBg = Lgs.createBitmapByName('myRankBg_png');
            myRankLayer.addChild(myRankBg);
            myRankBg.x = gw / 2 - Lgs.GetWidth(myRankBg) / 2;
            /**分数 */
            var myrankScore = new egret.TextField();
            myRankLayer.addChild(myrankScore);
            Lgs.textScaleFun(myrankScore, 0.026);
            myrankScore.textColor = 0xFF5B50;
            myrankScore.bold = true;
            myrankScore.text = "0";
            myrankScore.x = gw / 2 - gh * 0.075 - Lgs.GetWidth(myrankScore) / 2;
            myrankScore.y = myRankBg.y + Lgs.GetHeight(myRankBg) / 2 - Lgs.GetHeight(myrankScore) / 2;
            /**排名 */
            var myrankField = new egret.TextField();
            myRankLayer.addChild(myrankField);
            Lgs.textScaleFun(myrankField, 0.026);
            myrankField.textColor = 0xFF5B50;
            myrankField.bold = true;
            myrankField.text = "未入榜";
            myrankField.x = gw / 2 + gh * 0.165 - Lgs.GetWidth(myrankField) / 2;
            myrankField.y = myRankBg.y + Lgs.GetHeight(myRankBg) / 2 - Lgs.GetHeight(myrankField) / 2;
            /**动画 */
            var myRankLayery = myRankLayer.y;
            myRankLayer.alpha = 0;
            myRankLayer.y = myRankLayery + Lgs.GetHeight(myRankLayer);
            egret.Tween.get(myRankLayer).to({ alpha: 1, y: myRankLayery }, 500, egret.Ease.quadOut);
            /**按钮 */
            var rankDescBtn = Lgs.createBitmapByName("rankDescBtn_png");
            this.winLayer.addChild(rankDescBtn);
            rankDescBtn.x = gw - pw_sx - Lgs.GetWidth(rankDescBtn) * 0.7;
            rankDescBtn.y = gh * 0.098;
            Lgs.BtnMode(rankDescBtn);
            var rankCloseBtn = Lgs.createBitmapByName("rankClose1_png");
            this.winLayer.addChild(rankCloseBtn);
            Lgs.BtnMode(rankCloseBtn);
            rankCloseBtn.x = gw / 2;
            rankCloseBtn.y = gh * 0.825;
            /**监听事件 */
            rankDescBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.others, this);
            Lgs.removedListener(rankDescBtn, egret.TouchEvent.TOUCH_TAP, this.others, this);
            rankCloseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rankCloseFun, this);
            Lgs.removedListener(rankCloseBtn, egret.TouchEvent.TOUCH_TAP, this.rankCloseFun, this);
            function shareFun() {
                var sharelayer = Lgs.sharePage(function () {
                }, this);
                GameLayer.addChild(sharelayer);
                // let gameLayer = new Lgs.GameContainer(false,this.selectId);
                // GameLayer.addChild(gameLayer);
                // LremoveChild(this);
            }
            /**ajax提示 */
            var loadField = new egret.TextField();
            this.winLayer.addChild(loadField);
            loadField.text = "正在获取排行榜...";
            loadField.fontFamily = "黑体";
            loadField.textColor = 0xffffff;
            Lgs.textScaleFun(loadField, 0.024);
            loadField.x = gw / 2 - Lgs.GetWidth(loadField) / 2;
            loadField.y = gh * 0.62;
            /**Ajax getRank */
            Lgs.showloading();
            if (!this.rankData) {
                getRankListAjax(function (datas) {
                    var datas1 = {
                        player: {
                            "score": 10,
                            "playerRank": 0
                        },
                        rankList: [
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                            {
                                topScore: 100,
                                nickName: "黄小米",
                                headImg: "headimg.jpg",
                                useTime: 1000
                            },
                        ]
                    };
                    rankView(datas);
                }, wrongInfo, this);
            }
            else {
                rankView(this.rankData);
            }
            // hideloading();
            /**rankView */
            function rankView(datas) {
                Lgs.hideloading();
                // console.log(datas);				
                var data = datas;
                if (data.rankList.length == 0) {
                    loadField.text = "暂时还没有人进入排行榜哦！";
                    loadField.x = gw / 2 - Lgs.GetWidth(loadField) / 2;
                }
                else {
                    _THIS.winLayer.removeChild(loadField);
                }
                /**我的排名 */
                // if(data.player.playerRank!=0){
                myrankField.text = data.player.playerRank;
                // }
                if (!data.player.topScore) {
                    data.player.topScore = 0;
                }
                myrankScore.text = data.player.topScore + "";
                myrankScore.x = gw / 2 - gh * 0.075 - Lgs.GetWidth(myrankScore) / 2;
                myrankField.x = gw / 2 + gh * 0.165 - Lgs.GetWidth(myrankField) / 2;
                /**滚动视图范围 */
                var ulLayer = new egret.Sprite();
                ulLayer.touchEnabled = true;
                // ulLayer.addEventListener(egret.TouchEvent.TOUCH_MOVE,scrollFun,_THIS);
                // removedListener(ulLayer,egret.TouchEvent.TOUCH_MOVE,scrollFun,_THIS);
                // function scrollFun(){
                // 	// playAudio("scroll");
                // }
                var ulShape = new egret.Shape();
                ulLayer.addChild(ulShape);
                for (var i = 0; i < data.rankList.length; i++) {
                    var listLayer = listView(data.rankList[i], i + 1);
                    ulLayer.addChild(listLayer);
                    listLayer.y = gh * 0 + (listLayer["bgheight"]) * i;
                }
                var scrollView = new egret.ScrollView();
                _THIS.winLayer.addChild(scrollView);
                scrollView.setContent(ulLayer);
                scrollView.width = Lgs.GetWidth(ulLayer);
                scrollView.height = gh * 0.42;
                scrollView.x = gw / 2 - Lgs.GetWidth(scrollView) / 2;
                scrollView.y = gh * 0.5;
                scrollView.horizontalScrollPolicy = "off";
                scrollView.verticalScrollPolicy = "on";
                scrollView.scrollSpeed = 0.5;
                scrollView.scrollBeginThreshold = 10;
                scrollView.bounces = true;
                ulShape.graphics.beginFill(0x000000);
                // ulShape.graphics.drawRect(0,0,GetWidth(ulLayer),Math.max(scrollView.height,GetHeight(ulLayer)+gh*0.051));
                ulShape.graphics.drawRect(0, 0, Lgs.GetWidth(ulLayer), Math.max(scrollView.height, Lgs.GetHeight(ulLayer) + gh * 0.051));
                ulShape.graphics.endFill();
                ulShape.alpha = 0;
                /**优化内存 不显示的List visible = false */
                // scrollView.addEventListener(egret.Event.ENTER_FRAME,scrollonframe,_THIS);
                // removedListener(scrollView,egret.Event.ENTER_FRAME,scrollonframe,_THIS);
                // function scrollonframe(){
                // 	for(let i=0;i<ulLayer.numChildren;i++){
                // 		let listObj = ulLayer.getChildAt(i);
                // 		if(listObj.y+listObj.height*2<scrollView.scrollTop||listObj.y-listObj.height>=scrollView.scrollTop+scrollView.height){
                // 			if(listObj.visible){
                // 				// egret.Tween.removeTweens(listObj);
                // 				listObj.visible = false;
                // 			}
                // 		}else{
                // 			if(!listObj.visible){
                // 				// listObj.scaleX = listObj.scaleY = 0;
                // 				// listObj.x = listObj.width/2;
                // 				// egret.Tween.get(listObj).to({x:0,scaleX:1,scaleY:1},320,egret.Ease.circOut);
                // 				listObj.visible = true;
                // 			}
                // 		}
                // 	}
                // }
                /**相反的 */
                // let rulebgLayer2 = new egret.Sprite();
                // rulebgLayer2.y = gh*0.05;
                // let ulShape2 = new egret.Shape();
                // rulebgLayer2.addChild(ulShape2);
                // ulShape2.graphics.beginFill(0x000000);
                // ulShape2.graphics.drawRect(0,0,scrollView.width + scrollView.getMaxScrollTop()
                // ,scrollView.height);
                // ulShape2.graphics.endFill();
                // ulShape2.alpha = 1;
                // let scrollView2 = new egret.ScrollView();
                // _THIS.winLayer.addChild(scrollView2);
                // scrollView2.setContent(rulebgLayer2);
                // scrollView2.width = scrollView.width;
                // scrollView2.height = scrollView.height;
                // scrollView2.x = gw/2 - GetWidth(scrollView2)/2 - gh*0.01;
                // scrollView2.y = gh*0.278;
                // scrollView2.horizontalScrollPolicy = "on";
                // scrollView2.verticalScrollPolicy = "off";
                // scrollView2.scrollSpeed = 0.32;
                // scrollView2.scrollBeginThreshold = 10;
                // scrollView2.bounces = true;
                // scrollView2.alpha = 0;
                // scrollView2.addEventListener(egret.Event.ENTER_FRAME,timerHand,_THIS);
                // removedListener(scrollView2,egret.Event.ENTER_FRAME,timerHand,_THIS);
                // // console.log(scrollView.getMaxScrollTop());
                // // console.log(scrollView2.getMaxScrollLeft());
                // scrollView2.scrollLeft = scrollView.getMaxScrollTop();
                // function timerHand(){
                // 	scrollView.scrollTop = scrollView.getMaxScrollTop() - scrollView2.scrollLeft;
                // 	// console.log(scrollView.scrollTop);
                // 	// console.log(scrollView2.scrollLeft);
                // }
                // /**相反的 end */
                // for(let i=0;i<ulLayer.numChildren;i++){
                // 	let listObj = ulLayer.getChildAt(i);
                // 	listObj.anchorOffsetX = listObj.width/2;
                // 	listObj.x = listObj.anchorOffsetX*listObj.scaleX;					
                // }
                /**滚动条 */
                var scrollLayer = new egret.Sprite();
                _THIS.winLayer.addChild(scrollLayer);
                var scrollbg = Lgs.createBitmapByName("scrollbg_png");
                scrollLayer.addChild(scrollbg);
                scrollbg.alpha = 0;
                // scrollLayer.visible = false;
                if (data.rankList.length == 0) {
                    scrollLayer.visible = false;
                }
                // let scrollsMask = createBitmapByName("scrollbg_png");
                // scrollLayer.addChild(scrollsMask);
                Lgs.scaleYFun(scrollbg, scrollView.height / gh);
                // scaleYFun(scrollsMask,scrollView.height/gh);
                var scrollsMask = new egret.Shape();
                ;
                scrollLayer.addChild(scrollsMask);
                scrollsMask.graphics.beginFill(0x000000);
                scrollsMask.graphics.drawRect(0, 0, Lgs.GetWidth(scrollbg), Lgs.GetHeight(scrollbg));
                scrollsMask.graphics.endFill();
                var scrolls = Lgs.createBitmapByName("scrolls_png");
                if (Lgs.GetHeight(ulLayer) > Lgs.GetHeight(scrollView)) {
                    var scrollsH = Lgs.GetHeight(scrollView) / Lgs.GetHeight(ulLayer) * Lgs.GetHeight(scrollLayer);
                }
                else {
                }
                var isDrag = false;
                if (Lgs.GetHeight(ulShape) > scrollView.height) {
                    Lgs.DragFun({
                        "obj": scrolls,
                        "stage": scrolls,
                        "moveStage": _THIS,
                        "callStage": _THIS
                    }, {
                        "downFun": function (obj) {
                            egret.ScrollTween.removeTweens(scrollView);
                            isDrag = true;
                        },
                        "moveFun": function (obj) { },
                        "upFun": function (obj) {
                            egret.ScrollTween.removeTweens(scrollView);
                            isDrag = false;
                        },
                    }, {
                        "downObj": 0,
                        "moveObj": 0,
                        "upObj": 0
                    }, "y");
                }
                scrollLayer.addChild(scrolls);
                scrolls.mask = scrollsMask;
                scrolls.x = Lgs.GetWidth(scrollbg) / 2 - Lgs.GetWidth(scrolls) / 2;
                scrollLayer.x = scrollView.x + Lgs.GetWidth(scrollView) + gh * 0.013;
                scrollLayer.y = scrollView.y + Lgs.GetHeight(scrollView) / 2 - Lgs.GetHeight(scrollLayer) / 2 - 0;
                /**滚动条的滚动高度 */
                var scrollLayerH = Lgs.GetHeight(scrollLayer) - Lgs.GetHeight(scrolls);
                /**最大距离 */
                var maxHeight = Lgs.GetHeight(ulLayer) - Lgs.GetHeight(scrollView);
                scrollLayer.addEventListener(egret.Event.ENTER_FRAME, onframe, _THIS);
                Lgs.removedListener(scrollLayer, egret.Event.ENTER_FRAME, onframe, _THIS);
                function onframe() {
                    if (isDrag) {
                        var scrollsy = scrolls.y;
                        if (scrollsy < 0) {
                            scrollsy = 0;
                        }
                        if (scrollsy > scrollLayerH) {
                            scrollsy = scrollLayerH;
                        }
                        scrollView.scrollTop = maxHeight * scrollsy / (scrollLayerH);
                    }
                    else {
                        var scrollsy = scrollView.scrollTop / maxHeight * scrollLayerH;
                        scrolls.y = scrollsy;
                    }
                }
                /**弹出动画 */
                // BtnMode(_THIS.winLayer,true);
                // _THIS.winLayer.x = gw/2;
                // _THIS.winLayer.scaleX = _THIS.winLayer.scaleY = 0;
                // egret.Tween.get(_THIS.winLayer).to({scaleX:1,scaleY:1},280,egret.Ease.backOut);
                // rankBg.alpha = 0;
                // egret.Tween.get(rankBg).to({alpha:1},320);
            }
            /**listView */
            function listView(oneData, ranksnum) {
                var listLayer = new egret.Sprite();
                /**listBg */
                var listBg = Lgs.createBitmapByName("listBg_png");
                listLayer.addChild(listBg);
                listLayer["bgheight"] = 99;
                listBg.y = listLayer["bgheight"] - Lgs.GetHeight(listBg);
                /**排名 */
                var ranksField = new egret.TextField();
                listLayer.addChild(ranksField);
                Lgs.textScaleFun(ranksField, 0.028);
                // ranksField.text = ranksnum;
                // textScaleXFun(ranksField,ranksField.text,0.05,0.08);
                ranksField.fontFamily = "黑体";
                ranksField.bold = true;
                ranksField.textColor = 0xffffff;
                ranksField.text = ranksnum + "";
                ranksField.x = gh * 0.083;
                ranksField.y = listLayer["bgheight"] / 2 - Lgs.GetHeight(ranksField) / 2;
                // let ranksField = new egret.BitmapText();
                // listLayer.addChild(ranksField);
                // ranksField.font = RES.getRes("rankNum_fnt");
                // ranksField.text = ranksnum+"";
                // BtnMode(ranksField,true);
                // ranksField.x = gh*0.083;
                // ranksField.y = listLayer["bgheight"]/2;
                // if(ranksnum==1||ranksnum==2||ranksnum==3){
                // 	ranksField.visible = false;
                // 	let rankPlate = createBitmapByName("rank"+ranksnum+"_png");
                // 	BtnMode(rankPlate,true);
                // 	listLayer.addChild(rankPlate);
                // 	rankPlate.x = ranksField.x;
                // 	rankPlate.y = ranksField.y;
                // }
                /**头像 */
                var headLayer = new egret.Sprite();
                var headIndex = listLayer.getChildIndex(listBg);
                listLayer.addChildAt(headLayer, headIndex);
                /**头像的前景遮罩 */
                var headFg = Lgs.createBitmapByName("headFg_png");
                headFg.x = gh * 0.15;
                headFg.y = 6;
                /**没有头像的背景 */
                var headBg = Lgs.createBitmapByName("headBg_png");
                // listLayer.addChild(headBg);
                headBg.x = headFg.x + Lgs.GetWidth(headFg) / 2 - Lgs.GetWidth(headBg) / 2;
                headBg.y = headFg.y + (Lgs.GetHeight(headFg) - Lgs.GetHeight(headBg)) / 2;
                listLayer.addChild(headFg);
                Lgs.addBitmapByUrl(headBg.x, headBg.y, Lgs.GetHeight(headBg), headLayer, oneData.headImg, "headImg", headBg);
                /**昵称 */
                var nickName = new egret.TextField();
                listLayer.addChild(nickName);
                Lgs.textScaleFun(nickName, 0.022);
                nickName.text = oneData.nickName.substring(0, 10);
                nickName.width = gh * 0.11;
                nickName.textAlign = "center";
                nickName.lineSpacing = gh * 0.001;
                nickName.textColor = 0xffffff;
                nickName.x = Math.max(0, gh * 0.314 - Lgs.GetWidth(nickName) / 2);
                nickName.y = listLayer["bgheight"] / 2 - Lgs.GetHeight(nickName) / 2;
                /**成绩 */
                var scoreField = new egret.TextField();
                listLayer.addChild(scoreField);
                scoreField.text = oneData.topScore + "米";
                scoreField.textColor = 0xffffff;
                Lgs.textScaleFun(scoreField, 0.024);
                scoreField.x = gh * 0.465 - Lgs.GetWidth(scoreField) / 2;
                scoreField.y = listLayer["bgheight"] / 2 - Lgs.GetHeight(scoreField) / 2;
                /**用时 */
                var useTimeField = new egret.TextField();
                listLayer.addChild(useTimeField);
                useTimeField.text = Math.round(oneData.useTime / 1000) + "s";
                useTimeField.textColor = 0xffffff;
                Lgs.textScaleFun(useTimeField, 0.024);
                useTimeField.x = gh * 0.595 - Lgs.GetWidth(useTimeField) / 2;
                useTimeField.y = listLayer["bgheight"] / 2 - Lgs.GetHeight(useTimeField) / 2;
                /**样式替换 ----*/
                // if(oneData.biaoji==0){
                // 	let topViewTip = createBitmapByName("topViewTip_png");
                // 	listLayer.addChild(topViewTip);
                // 	topViewTip.x = GetWidth(listBg) - GetWidth(topViewTip) + 4.5;
                // 	topViewTip.y = -3;
                // }else if(oneData.biaoji==2){
                // 	let meViewTip = createBitmapByName("meViewTip_png");
                // 	listLayer.addChild(meViewTip);
                // 	meViewTip.x = GetWidth(listBg) - GetWidth(meViewTip) + 4.5;
                // 	meViewTip.y = -3;
                // 	ranksField.text = oneData.order;
                // 	// ranksField.text = "8888";
                // 	textScaleXFun(ranksField,ranksField.text,0.055,0.08);
                // 	ranksField.textColor = 0xEBB401;
                // 	BtnMode(ranksField,true);
                // 	ranksField.x = gh*0.05;
                // 	ranksField.y = GetHeight(listBg)/2 + 4;
                // 	listBg.texture = RES.getRes("listBg2_png");
                // 	headFg.texture = RES.getRes("headFg3_png");
                // }
                /** */
                return listLayer;
            }
            /**获取错误提示 */
            function wrongInfo(data) {
                Lgs.hideloading();
                Lgs.LAlert(data.msg);
                loadField.text = data.msg;
                loadField.x = gw / 2 - Lgs.GetWidth(loadField) / 2;
            }
            /**forTest */
            // this.others();
        };
        LRankPage.prototype.others = function () {
            var winBg = Lgs.createBitmapByName("rankBg2_jpg");
            this.winLayer.addChild(winBg);
            winBg.x = gw / 2 - Lgs.GetWidth(winBg) / 2;
            winBg.touchEnabled = true;
            var winLayer = new egret.Sprite();
            this.winLayer.addChild(winLayer);
            winLayer.width = gw;
            winLayer.height = gh;
            var rankDesc = Lgs.createBitmapByName("rankDesc_png");
            winLayer.addChild(rankDesc);
            rankDesc.x = gw / 2 - Lgs.GetWidth(rankDesc) / 2;
            rankDesc.y = gh * 0.083;
            var rankClose2 = Lgs.createBitmapByName("rankClose2_png");
            winLayer.addChild(rankClose2);
            rankClose2.x = gw / 2 - Lgs.GetWidth(rankClose2) / 2;
            rankClose2.y = gh * 0.672;
            Lgs.BtnMode(rankClose2);
            Lgs.BtnMode(winLayer, true);
            winLayer.x = gw / 2;
            winLayer.scaleX = winLayer.scaleY = 0;
            egret.Tween.get(winLayer).to({ scaleX: 1, scaleY: 1 }, 280, egret.Ease.backOut);
            winBg.alpha = 0;
            egret.Tween.get(winBg).to({ alpha: 1 }, 320);
            rankClose2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rankCloseFun, this);
            Lgs.removedListener(rankClose2, egret.TouchEvent.TOUCH_TAP, this.rankCloseFun, this);
        };
        LRankPage.prototype.rankCloseFun = function () {
            // playAudio("btnMusic",false,0);
            if (this.closeNum == 1) {
                egret.Tween.get(this.rankBgLayer).to({ alpha: 0 }, 280);
                egret.Tween.get(this.winLayer).to({ scaleX: 0, scaleY: 0, alpha: 0 }, 280, egret.Ease.backIn).call(function () {
                    Lgs.LremoveChild(this);
                }, this);
            }
            else if (this.closeNum == 2) {
                var homeLayer = new Lgs.LHomePage();
                GameLayer.addChild(homeLayer);
                Lgs.LremoveChild(this);
            }
        };
        LRankPage.prototype.removedFun = function () {
        };
        return LRankPage;
    }(egret.DisplayObjectContainer));
    Lgs.LRankPage = LRankPage;
    __reflect(LRankPage.prototype, "Lgs.LRankPage");
})(Lgs || (Lgs = {}));
//# sourceMappingURL=LRankPage.js.map
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
    var GameContainer = (function (_super) {
        __extends(GameContainer, _super);
        function GameContainer(startData, callback, thisObj) {
            var _this = _super.call(this) || this;
            if (callback) {
                _this.callback = callback;
                _this.thisObj = thisObj;
            }
            _this.startData = startData;
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.once(egret.Event.REMOVED_FROM_STAGE, _this.removedFun, _this);
            return _this;
        }
        GameContainer.prototype.onAddToStage = function () {
            // bgmViewer.setnewPosition(gw - pw_sx - gh*0.02,gh-GetHeight(bgmViewer) - gh*0.02,90);
            // bgmViewer.setnewPosition(pw_sx + gh*0.02,GetHeight(bgmViewer) + gh*0.02,-90);
            bgmViewer.hide();
            this.touchEnabled = true;
            var _THIS = this;
            /**变量 */
            var score = 0;
            var maxHeart = 3;
            var heartnums = 3;
            var maxFloorNums = 423;
            /**添加herat道具的间隔 */
            var addHearPosition = 100;
            /**必出道具的间隔 */
            var mustAddbarPosition = 8;
            /**随机区间 */
            var ranAddbarNum = 8;
            /**跳跃系数 */
            var jumpTwo = 0;
            var fastNum = 0;
            var heartNum = 0;
            var boomNum = 0;
            var fastHitNum = 0;
            var heartHitNum = 0;
            var boomHitNum = 0;
            var floorNum = 0;
            /**跳跃动画速度 实践 */
            // let jumpCount = 400;
            // let boomCount = 1500;
            var jumpCount = 700;
            var boomCount = 4000;
            /**层级 */
            var bgLayer = new egret.Sprite();
            this.addChild(bgLayer);
            this.gameLayer = new egret.Sprite();
            this.addChild(this.gameLayer);
            var fgLayer = new egret.Sprite();
            this.addChild(fgLayer);
            /**背景 */
            var gameBg = Lgs.createBitmapByName("gameBg_jpg");
            bgLayer.addChild(gameBg);
            gameBg.x = gw / 2 - Lgs.GetWidth(gameBg) / 2;
            var gameBg2 = Lgs.createBitmapByName("gameBg2_png");
            bgLayer.addChild(gameBg2);
            gameBg2.x = gw / 2 - Lgs.GetWidth(gameBg2) / 2;
            gameBg2.y = gh - Lgs.GetHeight(gameBg2);
            var land = Lgs.createBitmapByName("land_jpg");
            fgLayer.addChild(land);
            land.x = gw / 2 - Lgs.GetWidth(land) / 2;
            land.y = gh - Lgs.GetHeight(land);
            land["nums"] = 0;
            var g_cloud = Lgs.createBitmapByName("g_cloud_png");
            fgLayer.addChild(g_cloud);
            g_cloud.x = gw / 2 - Lgs.GetWidth(g_cloud) / 2;
            g_cloud.y = gh;
            /**building */
            var bulidArr = [];
            var building0 = Lgs.createBitmapByName("building_png");
            var buildNums = Math.ceil(gh / Lgs.GetHeight(building0)) + 1;
            for (var i = buildNums; i > -1; i--) {
                var building = Lgs.createBitmapByName("building_png");
                bgLayer.addChild(building);
                building.x = gw / 2 - Lgs.GetWidth(building) / 2;
                building.y = gh - Lgs.GetHeight(building) * (i + 1);
                bulidArr.push(building);
            }
            /**hero */
            var heromcdata = new egret.MovieClipDataFactory(RES.getRes("hero_json"), RES.getRes("hero_png"));
            var hero = new egret.MovieClip(heromcdata.generateMovieClipData("hero"));
            fgLayer.addChild(hero);
            hero.anchorOffsetY = hero.height;
            hero.anchorOffsetX = hero.width / 2;
            hero.x = gw / 2;
            hero.y = land.y - gh * 0.01;
            hero.gotoAndStop("down");
            var canJump = false;
            var heroJump = true;
            var heroDown = false;
            var heroy = hero.y;
            /**对象池*/
            var floorY_Y = gh * 0.33;
            var floorArr = [];
            var barArr = [];
            var oldbarArr = [];
            /**台阶循环函数 楼层建筑循环*/
            function floorLoop() {
                for (var i = 0; i < floorArr.length; i++) {
                    var floor4 = floorArr[i];
                    if (floor4.y > gh) {
                        if (floorNum < maxFloorNums) {
                            floor4.y = floorArr[floorArr.length - 1].y - floorY_Y;
                            floorArr.splice(i, 1);
                            i--;
                            floorArr.push(floor4);
                            setNewFloor.call(this, floor4);
                        }
                        else {
                            floor4.x = gw;
                        }
                    }
                }
                for (var i = 0; i < bulidArr.length; i++) {
                    var build4 = bulidArr[i];
                    if (build4.y > gh) {
                        build4.y = bulidArr[0].y - Lgs.GetHeight(build4);
                        bulidArr.splice(i, 1);
                        i--;
                        bulidArr.unshift(build4);
                    }
                }
                for (var i = 0; i < barArr.length; i++) {
                    var bar4 = barArr[i];
                    if (bar4.y > gh) {
                        barArr.splice(i, 1);
                        i--;
                        oldbarArr.push(bar4);
                        egret.Tween.pauseTweens(bar4);
                    }
                }
            }
            /**addFloor */
            function addFloor(y) {
                floorNum++;
                var floor = Lgs.createBitmapByName("floor_png");
                this.gameLayer.addChild(floor);
                floor.x = pw_sx + Math.random() * (gw - pw_sx - Lgs.GetWidth(floor));
                floor.y = y;
                floor["nums"] = floorNum;
                floorArr.push(floor);
                if (floorNum == 10) {
                    addBar.call(this, "fast");
                }
                else if (isInteger(floorNum / addHearPosition)) {
                    addBar.call(this, "heart");
                }
                else if (floorNum > 10 && floorNum < maxFloorNums) {
                    addBar.call(this);
                }
            }
            for (var i = 0; i < 10; i++) {
                addFloor.call(this, gh * 0.75 - floorY_Y * i);
            }
            /**setNewFloor */
            function setNewFloor(floor) {
                floorNum++;
                floor.x = pw_sx + Math.random() * (gw - pw_sx * 2 - Lgs.GetWidth(floor));
                floor["nums"] = floorNum;
                /**在这里升级难度 */
                if (boomCount > 1500) {
                    boomCount = 4000 - floorNum * 9;
                }
                else {
                    boomCount = 1500;
                }
                if (floorNum == 100) {
                    mustAddbarPosition--;
                    ranAddbarNum--;
                    jumpCount = 600;
                }
                else if (floorNum == 200) {
                    mustAddbarPosition--;
                    ranAddbarNum--;
                    jumpCount = 500;
                }
                else if (floorNum == 300) {
                    mustAddbarPosition--;
                    ranAddbarNum--;
                    jumpCount = 400;
                }
                if (isInteger(floorNum / addHearPosition)) {
                    addBar.call(this, "heart");
                }
                else if (floorNum < maxFloorNums) {
                    addBar.call(this);
                }
            }
            /**addBar */
            function addBar(must) {
                var barStringArr = ["fast", "boom", "heart"];
                var bar = false;
                if (must) {
                    if (must == "fast") {
                        fastNum++;
                    }
                    else if (must == "heart") {
                        heartNum++;
                    }
                    else if (must == "boom") {
                        boomNum++;
                    }
                    if (oldbarArr.length > 0) {
                        bar = oldbarArr[0];
                        bar.texture = RES.getRes(must + "_png");
                        bar["type"] = must;
                        egret.Tween.removeTweens(bar);
                        bar.x = pw_sx;
                        egret.Tween.get(bar, { loop: true }).to({ x: gw - pw_sx - Lgs.GetWidth(bar) }, boomCount).to({ x: pw_sx }, boomCount);
                        oldbarArr.splice(0, 1);
                    }
                    else {
                        bar = Lgs.createBitmapByName(must + "_png");
                        this.gameLayer.addChild(bar);
                        bar["type"] = must;
                        bar.x = pw_sx;
                        Lgs.removedTweens(bar);
                        egret.Tween.get(bar, { loop: true }).to({ x: gw - pw_sx - Lgs.GetWidth(bar) }, boomCount).to({ x: pw_sx }, boomCount);
                    }
                }
                else {
                    var bar_ran = Math.floor(Math.random() * ranAddbarNum);
                    var barStrRan = Math.floor(Math.random() * 3);
                    if (bar_ran == 2 || bar_ran == 5 || isInteger(floorNum / mustAddbarPosition)) {
                        if (barStrRan == 0 || barStrRan == 2) {
                            barStrRan = 0;
                            fastNum++;
                        }
                        else if (barStrRan == 1) {
                            barStrRan = 1;
                            boomNum++;
                        }
                        if (oldbarArr.length > 0) {
                            bar = oldbarArr[0];
                            bar.texture = RES.getRes(barStringArr[barStrRan] + "_png");
                            bar["type"] = barStringArr[barStrRan];
                            egret.Tween.removeTweens(bar);
                            bar.x = pw_sx;
                            egret.Tween.get(bar, { loop: true }).to({ x: gw - pw_sx - Lgs.GetWidth(bar) }, boomCount).to({ x: pw_sx }, boomCount);
                            oldbarArr.splice(0, 1);
                        }
                        else {
                            bar = Lgs.createBitmapByName(barStringArr[barStrRan] + "_png");
                            this.gameLayer.addChild(bar);
                            bar["type"] = barStringArr[barStrRan];
                            bar.x = pw_sx;
                            Lgs.removedTweens(bar);
                            egret.Tween.get(bar, { loop: true }).to({ x: gw - pw_sx - Lgs.GetWidth(bar) }, boomCount).to({ x: pw_sx }, boomCount);
                        }
                    }
                }
                if (bar) {
                    bar.visible = true;
                    bar.y = floorArr[floorArr.length - 1].y - gh * 0.28;
                    barArr.push(bar);
                }
            }
            ;
            /**分数 */
            var scoreLayer = new egret.Sprite();
            fgLayer.addChild(scoreLayer);
            var scoreBg = Lgs.createBitmapByName("scoreBg_png");
            scoreLayer.addChild(scoreBg);
            var scoreText = new egret.BitmapText();
            scoreLayer.addChild(scoreText);
            scoreText.font = RES.getRes("g_numFont_fnt");
            scoreText.scaleX = scoreText.scaleY = initScale;
            scoreText.text = "0";
            scoreText.x = gh * 0.078 - Lgs.GetWidth(scoreText) / 2;
            scoreText.y = gh * 0.01;
            scoreLayer.y = gh * 0.036;
            scoreLayer.x = pw_sx + gh * 0.085;
            var headLayer = new egret.Sprite();
            // let headIndex = listLayer.getChildIndex(listBg);
            // winLayer.addChildAt(headLayer,headIndex);
            scoreLayer.addChild(headLayer);
            var headFg = Lgs.createBitmapByName("r_headFg_png");
            var headBg = Lgs.createBitmapByName("g_headBg_png");
            Lgs.scaleFun(headFg, Lgs.GetHeight(headBg) / gh);
            // scoreLayer.addChild(headBg);
            // headBg.alpha = 0.2;
            scoreLayer.addChild(headFg);
            headBg.x = -gh * 0.05;
            headBg.y = Lgs.GetHeight(scoreBg) / 2 - Lgs.GetHeight(headBg) / 2;
            headFg.x = -gh * 0.05;
            headFg.y = Lgs.GetHeight(scoreBg) / 2 - Lgs.GetHeight(headFg) / 2;
            Lgs.addBitmapByUrl(headBg.x, headBg.y, Lgs.GetHeight(headBg), headLayer, $headImg, "headImg", headBg, function (result) {
                scoreLayer.addChild(headBg);
                result.mask = headBg;
            }, this);
            /**生命 */
            var heartLayer = new egret.Sprite();
            fgLayer.addChild(heartLayer);
            var heartBg = Lgs.createBitmapByName("heartBg_png");
            heartLayer.addChild(heartBg);
            heartLayer.x = gw - pw_sx - Lgs.GetWidth(heartBg) - gh * 0.02;
            heartLayer.y = gh * 0.031;
            var heartText = new egret.BitmapText();
            heartLayer.addChild(heartText);
            heartText.font = RES.getRes("g_numFont_fnt");
            heartText.scaleX = heartText.scaleY = initScale;
            heartText.text = "4";
            heartText.x = gh * 0.064;
            heartText.y = gh * 0.016;
            var heartViewArr = [];
            for (var i = 0; i < 4; i++) {
                var heart = Lgs.createBitmapByName("xin_png");
                heartLayer.addChild(heart);
                heart.x = gh * 0.095 + (Lgs.GetWidth(heart) + gh * 0.007) * i;
                heart.y = gh * 0.017;
                heartViewArr.push(heart);
            }
            /**爆炸动画 */
            var boommcdata = new egret.MovieClipDataFactory(RES.getRes("boomAni_json"), RES.getRes("boomAni_png"));
            var boomAni = new egret.MovieClip(boommcdata.generateMovieClipData("boomAni"));
            fgLayer.addChild(boomAni);
            boomAni.anchorOffsetY = boomAni.height / 2;
            boomAni.anchorOffsetX = boomAni.width / 2;
            boomAni.y = gh * 1.5;
            boomAni.gotoAndStop("run");
            boomAni.addEventListener(egret.MovieClipEvent.COMPLETE, boomComplete, this);
            Lgs.removedListener(boomAni, egret.MovieClipEvent.COMPLETE, boomComplete, this);
            function boomComplete() {
                boomAni.alpha = 0;
            }
            /**hitAndJump 加分*/
            function hitAndJump(hitObj) {
                playAudio("jump", 0, true);
                downSpeed = 0;
                canJump = false;
                if (hitObj["nums"] > score) {
                    score = hitObj["nums"];
                    scoreText.text = score + "";
                    scoreText.x = gh * 0.078 - Lgs.GetWidth(scoreText) / 2;
                }
                /**forTest End*/
                hero.gotoAndPlay("jump");
                if (heroy - gh * 0.4 - floorY_Y * jumpTwo < gh * 0.35) {
                    egret.Tween.get(hero).to({ y: heroy - (heroy - gh * 0.5) }, jumpCount, egret.Ease.quadOut).call(function () {
                        if (score >= maxFloorNums) {
                            resultFun.call(this);
                        }
                        else {
                            heroJump = false;
                            heroDown = true;
                            hero.gotoAndPlay("down");
                            floorLoop.call(this);
                        }
                    }, this);
                    for (var i = 0; i < bulidArr.length; i++) {
                        var build3 = bulidArr[i];
                        var build3y = build3.y;
                        egret.Tween.get(build3).to({ y: build3y + (gh * 0.4 - (heroy - gh * 0.5) + floorY_Y * jumpTwo) }, jumpCount, egret.Ease.quadOut);
                    }
                    for (var i = 0; i < floorArr.length; i++) {
                        var floor3 = floorArr[i];
                        var floor3y = floor3.y;
                        egret.Tween.get(floor3).to({ y: floor3y + (gh * 0.4 - (heroy - gh * 0.5) + floorY_Y * jumpTwo) }, jumpCount, egret.Ease.quadOut);
                    }
                    for (var i = 0; i < barArr.length; i++) {
                        var bar3 = barArr[i];
                        var bar3y = bar3.y;
                        egret.Tween.get(bar3).to({ y: bar3y + (gh * 0.4 - (heroy - gh * 0.5) + floorY_Y * jumpTwo) }, jumpCount, egret.Ease.quadOut);
                    }
                    if (land.parent) {
                        var landy = land.y;
                        egret.Tween.get(land).to({ y: landy + (gh * 0.4 - (heroy - gh * 0.5) + floorY_Y * jumpTwo) }, jumpCount, egret.Ease.quadOut).call(function () {
                            Lgs.LremoveChild(land);
                        }, this);
                        egret.Tween.get(g_cloud).to({ y: gh - Lgs.GetHeight(g_cloud) * 0.6 }, jumpCount, egret.Ease.quadOut);
                    }
                }
                else {
                    egret.Tween.get(hero).to({ y: heroy - gh * 0.4 - floorY_Y * jumpTwo }, jumpCount, egret.Ease.quadOut).call(function () {
                        if (score >= maxFloorNums) {
                            resultFun.call(this);
                        }
                        else {
                            heroJump = false;
                            heroDown = true;
                            hero.gotoAndPlay("down");
                            floorLoop.call(this);
                        }
                    }, this);
                }
            }
            /**开始游戏 */
            var startTime = egret.getTimer();
            var endTime = 0;
            var gameInfo = [];
            var g_timing = 0;
            /**是否失败了 */
            var isFailed = false;
            /**重力 */
            var g = 9.9 / 5;
            var downSpeed = 0;
            /** */
            var fastCounts = 5;
            var fastCount = 0;
            var fast_st = 0;
            /**onframe */
            function onframe() {
                if (isFailed) {
                    return;
                }
                endTime = egret.getTimer();
                /**加速倒计时 */
                if (fastCount > 0) {
                    var fastTime = endTime - fast_st;
                    if (fastTime > fastCount * 1000) {
                        fastCount = 0;
                        jumpTwo = 0;
                    }
                }
                /**判断出界 */
                if (hero.x < pw_sx - Lgs.GetWidth(hero) / 2) {
                    hero.x = gw - pw_sx + Lgs.GetWidth(hero) / 2;
                }
                if (hero.x > gw - pw_sx + Lgs.GetWidth(hero) / 2) {
                    hero.x = pw_sx - Lgs.GetWidth(hero) / 2;
                }
                hero.x += Shakex * 4;
                if (Shakex > 0) {
                    hero.scaleX = -1;
                }
                else {
                    hero.scaleX = 1;
                }
                /**降落 */
                if (heroDown) {
                    downSpeed += g;
                    if (heroDown && hero.y < gh) {
                        for (var i = 0; i < floorArr.length; i++) {
                            var floor1 = floorArr[i];
                            if (hero.y < floor1.y && hero.y + downSpeed > floor1.y) {
                                if (hero.x + Lgs.GetWidth(hero) * 0.3 > floor1.x && hero.x - Lgs.GetWidth(hero) * 0.3 < floor1.x + Lgs.GetWidth(floor1)) {
                                    downSpeed = floor1.y - hero.y;
                                    heroDown = false;
                                    heroy = hero.y + downSpeed;
                                    hitAndJump.call(this, floor1);
                                }
                            }
                        }
                        if (score <= 5) {
                            if (hero.y < land.y && hero.y + downSpeed > land.y) {
                                downSpeed = land.y - hero.y;
                                heroDown = false;
                                heroy = hero.y + downSpeed;
                                hitAndJump.call(this, land);
                            }
                            else if (hero.y + downSpeed > gh) {
                                downSpeed = gh - hero.y;
                                heroDown = false;
                                heroy = hero.y + downSpeed;
                                hitAndJump.call(this, land);
                            }
                        }
                    }
                    else if (hero.y - Lgs.GetHeight(hero) > gh) {
                        // LMsg("GameOver");
                        isFailed = true;
                        resultFun.call(this);
                    }
                    hero.y += downSpeed;
                }
                else {
                }
                /**道具/炸弹碰撞 */
                for (var i = 0; i < barArr.length; i++) {
                    var bar = barArr[i];
                    if (Lgs.LHitTestObject2(hero, bar, [
                        [Lgs.GetWidth(hero) * 0.3, Lgs.GetHeight(hero) * 0.15],
                        [Lgs.GetWidth(hero) * 0.7, Lgs.GetHeight(hero) * 0.15],
                        [Lgs.GetWidth(hero) * 0.9, Lgs.GetHeight(hero)],
                        [Lgs.GetWidth(hero) * 0.1, Lgs.GetHeight(hero)]
                    ], [
                        [Lgs.GetWidth(bar) * 0.1, Lgs.GetHeight(bar) * 0.1],
                        [Lgs.GetWidth(bar) * 0.9, Lgs.GetHeight(bar) * 0.1],
                        [Lgs.GetWidth(bar) * 0.9, Lgs.GetHeight(bar)],
                        [Lgs.GetWidth(bar) * 0.1, Lgs.GetHeight(bar)]
                    ])) {
                        bar.visible = false;
                        if (bar["type"] == "fast") {
                            fastHitNum++;
                            fastCount = fastCounts;
                            fast_st = egret.getTimer();
                            jumpTwo = 1;
                        }
                        else if (bar["type"] == "heart") {
                            if (heartnums < maxHeart) {
                                heartHitNum++;
                                heartnums++;
                                heartText.text = heartnums + "";
                                heartViewArr[heartnums - 1].texture = RES.getRes("xin_png");
                            }
                        }
                        else if (bar["type"] == "boom") {
                            boomHitNum++;
                            heartnums--;
                            heartText.text = heartnums + "";
                            heartViewArr[heartnums].texture = RES.getRes("badHeart_png");
                            /**爆炸效果 */
                            boomAni.x = bar.x + Lgs.GetWidth(bar) / 2;
                            boomAni.y = bar.y + Lgs.GetHeight(bar) / 2;
                            boomAni.alpha = 1;
                            boomAni.gotoAndPlay("run", 1);
                            if (heartnums <= 0) {
                                // LMsg("Boom-No Blood And GameOver");
                                isFailed = true;
                                resultFun.call(this);
                            }
                            else {
                            }
                        }
                    }
                }
            }
            /**开始游戏 */
            function gameStart(isFirst) {
                this.addEventListener(egret.Event.ENTER_FRAME, onframe, this);
                if (isFirst) {
                    Lgs.removedListener(this, egret.Event.ENTER_FRAME, onframe, this);
                }
                startTime = egret.getTimer();
                canJump = false;
                egret.Tween.get(hero).to({ y: heroy - gh * 0.35 }, jumpCount, egret.Ease.quadOut).call(function () {
                    heroJump = false;
                    heroDown = true;
                    hero.gotoAndPlay("down");
                    floorLoop.call(this);
                }, this);
            }
            /**游戏暂停 ----*/
            function gamePause() {
                this.removeEventListener(egret.Event.ENTER_FRAME, onframe, this);
                g_timing += endTime - startTime;
            }
            /**游戏结果 */
            function resultFun() {
                g_timing = endTime - startTime;
                this.removeEventListener(egret.Event.ENTER_FRAME, onframe, this);
                var gameCode = ((this.startData.gameCode - 2) * 2 - 3) * 3 + score;
                var gameData;
                if (haveGravity) {
                    gameData = {
                        score: score,
                        useTime: g_timing,
                        gameInfo: {
                            sbx: this.startData.sbx,
                            sby: this.startData.sby,
                            haveGravity: haveGravity,
                            floorNum: floorNum,
                            useTime: g_timing,
                            startTime: startTime,
                            endTime: endTime,
                            bloodNum: heartnums,
                            fastNum: fastNum,
                            heartNum: heartNum,
                            boomNum: boomNum,
                            fastHitNum: fastHitNum,
                            heartHitNum: heartHitNum,
                            boomHitNum: boomHitNum,
                            haveNum: gameCode,
                        }
                    };
                }
                else {
                    gameData = {
                        sbx: this.startData.sbx,
                        sby: this.startData.sby,
                        score: score,
                        useTime: g_timing,
                        gameInfo: {
                            floorNum: floorNum,
                            useTime: g_timing,
                            startTime: startTime,
                            endTime: endTime,
                            bloodNum: heartnums,
                            fastNum: fastNum,
                            heartNum: heartNum,
                            boomNum: boomNum,
                            fastHitNum: fastHitNum,
                            heartHitNum: heartHitNum,
                            boomHitNum: boomHitNum,
                            haveNum: gameCode,
                        }
                    };
                }
                Lgs.showloading("正在提交成绩...");
                endGameAjax(gameData, function (data) {
                    Lgs.hideloading();
                    // let resultData = data;
                    // 成绩结果对象 数据传到 resultPage.js 结果页
                    var resultData = {
                        score: score,
                        bestScore: data.bestScore,
                        bestRank: data.bestRank
                    };
                    var resultLayer = new Lgs.resultPage(resultData, function () {
                        Lgs.LremoveChild(this);
                    }, this);
                    GameLayer.addChild(resultLayer);
                    window.location.href = "./test.html";
                }, function (data) {
                    Lgs.hideloading();
                    Lgs.LAlert(data.msg);
                    Lgs.showloading(data.msg);
                }, this);
            }
            /**去填写信息 ----*/
            // function formFun(){
            //   let tcLayer = new egret.Sprite();
            //   this.addChild(tcLayer);
            //   let tcShape = new egret.Shape();
            //   tcLayer.addChild(tcShape);
            //   tcShape.graphics.beginFill(0x000000);
            //   tcShape.graphics.drawRect(0,0,gw,gh);
            //   tcShape.graphics.endFill();
            //   tcShape.alpha = 0.7;
            //   let winLayer = new egret.Sprite();
            //   tcLayer.addChild(winLayer);
            //   winLayer.width = gw;
            //   winLayer.height = gh;
            //   let formbg = createBitmapByName("formbg_png");
            //   winLayer.addChild(formbg);
            //   formbg.x = gw/2 - GetWidth(formbg)/2;
            //   formbg.y = gh*0.1;
            //    /**输入框 */
            //   let name1 = new LInput();
            //   winLayer.addChild(name1);
            //   let inputBg1 = new egret.Shape();
            //   inputBg1.graphics.beginFill(0xffffff);
            //   inputBg1.graphics.drawRoundRect(0,0,gh*0.28,gh*0.0585,gh*0.015);
            //   inputBg1.graphics.endFill();
            //   name1.setDefault(" 请输入姓名...");
            //   name1.setBg(inputBg1,false,{x:gh*0.01,y:0,width:GetWidth(inputBg1)-gh*0.02,height:GetHeight(inputBg1)},0.02);
            //   name1.x = gw/2-gh*0.06;
            //   name1.y = gh*0.437 + gh*0.089*0;
            //   name1.input.maxChars = 10;
            //   let phone1 = new LInput();
            //   winLayer.addChild(phone1);
            //   let inputBg2 = new egret.Shape();
            //   inputBg2.graphics.beginFill(0xffffff);
            //   inputBg2.graphics.drawRoundRect(0,0,gh*0.28,gh*0.0585,gh*0.015);
            //   inputBg2.graphics.endFill();
            //   phone1.setDefault(" 请输入有效号码...");
            //   phone1.setBg(inputBg2,false,{x:gh*0.01,y:0,width:GetWidth(inputBg2)-gh*0.02,height:GetHeight(inputBg2)},0.02);
            //   phone1.x = gw/2-gh*0.06;
            //   phone1.y = gh*0.437 + gh*0.089*1;
            //   phone1.input.maxChars = 11;
            //   phone1.input.inputType = "tel";
            //   let city1 = new LInput();
            //   winLayer.addChild(city1);
            //   let inputBg3 = new egret.Shape();
            //   inputBg3.graphics.beginFill(0xffffff);
            //   inputBg3.graphics.drawRoundRect(0,0,gh*0.28,gh*0.0585,gh*0.015);
            //   inputBg3.graphics.endFill();
            //   city1.setDefault(" 请输入您所在的城市...");
            //   city1.setBg(inputBg3,false,{x:gh*0.01,y:0,width:GetWidth(inputBg3)-gh*0.02,height:GetHeight(inputBg3)},0.02);
            //   city1.x = gw/2-gh*0.06;
            //   city1.y = gh*0.437 + gh*0.089*2;
            //   /**按钮 */
            //   let submitBtn = createBitmapByName("submitBtn_png");
            //   winLayer.addChild(submitBtn);
            //   BtnMode(submitBtn);
            //   submitBtn.x = gw/2;
            //   submitBtn.y = gh*0.807;
            //   /**动画 */
            //   winEnterAni(tcShape,winLayer,"scale01");
            //   /**事件 */
            //   submitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,submitFun,this);
            //   removedListener(submitBtn,egret.TouchEvent.TOUCH_TAP,submitFun,this);
            //   function submitFun(){
            //     egret.setTimeout(function() {
            //       if(city1.inputed&&phone1.inputed&&name1.inputed){
            //         if(!checkPhone(phone1.input.text.replace(/\s+/g,""))){
            //           LAlert("请输入有效号码");
            //           errorAni(phone1);
            //         }else{
            //           let userInfo = {
            //             name:name1.input.text.replace(/\s+/g,""),
            //             mobile:phone1.input.text.replace(/\s+/g,""),
            //             city:city1.input.text
            //           }
            //           // Ajax
            //           // showloading();
            //           // setInfoAjax(userInfo,function(data){
            //             // hideloading();
            //             // playAudio("touchBtn",0);
            //             LMsg("信息提交成功");
            //             // replayFun.call(this);
            //             winCloseAni(tcShape,winLayer,"scale01",function(){
            //             },this);
            //           // },function(data){
            //             // hideloading();
            //             // LAlert(data.msg);
            //           // },this);
            //         }
            //       }else{
            //         if(!name1.inputed){
            //           LAlert("请输入您的姓名");
            //           errorAni(name1);
            //         }else if(!phone1.inputed){
            //           LAlert("请输入您的手机号码");
            //           errorAni(phone1);
            //         }else if(!city1.inputed){
            //           LAlert("请输入您的所在城市");
            //           errorAni(city1);
            //         }
            //       }
            //     },this,120);
            //   }
            //   /**输入错误动画 */
            //   function errorAni(obj){
            //       if(!obj["shakeX"]){
            //         obj["shakeX"] = obj.x;
            //         obj["shakeY"] = obj.y;
            //       }else{
            //         obj.x = obj["shakeX"];
            //         obj.y = obj["shakeY"];
            //       }
            //       let shocka = new Lgs.ShockUtils();
            //       shocka.shock(ShockUtils.MAP);// ShockUtils.MAP or ShockUtils.SPRITthis.shock._target = target;
            //       let num = 8;
            //       shocka._target = obj;
            //       shocka.start(num);//num是震动次数
            //   }
            // }
            /**再来一次 回到首页 */
            function replayFun() {
                Lgs.LremoveChild(this);
                var homeLayer = new Lgs.LHomePage();
                GameLayer.addChild(homeLayer);
            }
            /**forTest */
            this.descView(gameStart, this, true);
            // gameStart.call(this,true);
            // resultFun.call(this);
            /**判断是否为整数 */
            function isInteger(obj) {
                return typeof obj === 'number' && obj % 1 === 0;
            }
        };
        /**游戏介绍 */
        GameContainer.prototype.descView = function (callback, thisObj, data) {
            var descLayer = new egret.Sprite();
            GameLayer.addChild(descLayer);
            descLayer.touchEnabled = true;
            var winShape = Lgs.createBitmapByName("descBg_png");
            descLayer.addChild(winShape);
            winShape.x = gw / 2 - Lgs.GetWidth(winShape) / 2;
            var winLayer = new egret.Sprite();
            descLayer.addChild(winLayer);
            winLayer.width = gw;
            winLayer.height = gh;
            
            Lgs.winEnterAni(winShape, winLayer, "scale01", function () {
                descLayer.once(egret.TouchEvent.TOUCH_TAP, enterFun, this);
                Lgs.removedListener(descLayer, egret.TouchEvent.TOUCH_TAP, enterFun, this);
            }, this);
            function enterFun() {
                // playAudio("touchBtn",0);
                egret.Tween.get(descLayer).to({ alpha: 0 }, 320).call(function () {
                    Lgs.LremoveChild(descLayer);
                    callback.call(thisObj, data);
                }, this);
            }
        };
        /**移除监听 */
        GameContainer.prototype.removedFun = function () {
        };
        return GameContainer;
    }(egret.DisplayObjectContainer));
    Lgs.GameContainer = GameContainer;
    __reflect(GameContainer.prototype, "Lgs.GameContainer");
})(Lgs || (Lgs = {}));
//# sourceMappingURL=GameContainer.js.map
module Lgs {
  export class GameContainer extends egret.DisplayObjectContainer{
    public constructor(startData,callback?,thisObj?) {
      super();
      if(callback){
        this.callback = callback;
        this.thisObj = thisObj;
      }
      this.startData = startData;
      this.once(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
      this.once(egret.Event.REMOVED_FROM_STAGE,this.removedFun,this);
    }
    private callback;
    private thisObj;

    private startData;
    private gameLayer;
    private onAddToStage(){
      // bgmViewer.setnewPosition(gw - pw_sx - gh*0.02,gh-GetHeight(bgmViewer) - gh*0.02,90);
      // bgmViewer.setnewPosition(pw_sx + gh*0.02,GetHeight(bgmViewer) + gh*0.02,-90);
      bgmViewer.hide();
      this.touchEnabled = true;
      let _THIS = this;
    /**变量 */
      let score = 0;
      let maxHeart = 3;
      let heartnums = 3;
      let maxFloorNums = 423
      /**添加herat道具的间隔 */
      let addHearPosition = 100;
      /**必出道具的间隔 */
      let mustAddbarPosition = 8;
      /**随机区间 */
      let ranAddbarNum = 8;
      /**跳跃系数 */
      let jumpTwo = 0;

      let fastNum = 0;
      let heartNum = 0;
      let boomNum = 0;
      let fastHitNum = 0;
      let heartHitNum = 0;
      let boomHitNum = 0;

      let floorNum = 0;
      /**跳跃动画速度 实践 */
      // let jumpCount = 400;
      // let boomCount = 1500;
      let jumpCount = 700;
      let boomCount = 4000;
    /**层级 */
      let bgLayer = new egret.Sprite();
      this.addChild(bgLayer);
      this.gameLayer = new egret.Sprite();
      this.addChild(this.gameLayer);
      let fgLayer = new egret.Sprite();
      this.addChild(fgLayer);
    /**背景 */
      let gameBg = createBitmapByName("gameBg_jpg");
      bgLayer.addChild(gameBg);
      gameBg.x = gw/2 - GetWidth(gameBg)/2;

      let gameBg2 = createBitmapByName("gameBg2_png");
      bgLayer.addChild(gameBg2);
      gameBg2.x = gw/2 - GetWidth(gameBg2)/2;
      gameBg2.y = gh - GetHeight(gameBg2);

      let land = createBitmapByName("land_jpg");
      fgLayer.addChild(land);
      land.x = gw/2 - GetWidth(land)/2;
      land.y = gh - GetHeight(land);
      land["nums"]=0;

      let g_cloud = createBitmapByName("g_cloud_png");
      fgLayer.addChild(g_cloud);
      g_cloud.x = gw/2 - GetWidth(g_cloud)/2;
      g_cloud.y = gh;
    /**building */
      let bulidArr = [];
      let building0 = createBitmapByName("building_png");
      let buildNums = Math.ceil(gh/GetHeight(building0))+1;
      for(let i=buildNums;i>-1;i--){        
        let building = createBitmapByName("building_png");
        bgLayer.addChild(building);
        building.x = gw/2 - GetWidth(building)/2;
        building.y = gh - GetHeight(building)*(i+1);

        bulidArr.push(building);
      }     
    /**hero */
      let heromcdata = new egret.MovieClipDataFactory(RES.getRes("hero_json"),RES.getRes("hero_png"));
      let hero = new egret.MovieClip(heromcdata.generateMovieClipData("hero"));
      fgLayer.addChild(hero);
      hero.anchorOffsetY = hero.height;
      hero.anchorOffsetX = hero.width/2;
      hero.x = gw/2;
      hero.y = land.y - gh*0.01;
      hero.gotoAndStop("down");

      let canJump = false;
      let heroJump = true;
      let heroDown = false;
      let heroy = hero.y;
    /**对象池*/
      let floorY_Y = gh*0.33;
      let floorArr = [];

      let barArr = [];
      let oldbarArr = [];
    /**台阶循环函数 楼层建筑循环*/
      function floorLoop(){
        for(let i=0;i<floorArr.length;i++){ 
          let floor4 = floorArr[i];
          if(floor4.y>gh){
            if(floorNum<maxFloorNums){
              floor4.y = floorArr[floorArr.length-1].y - floorY_Y;
              floorArr.splice(i,1);
              i--;
              floorArr.push(floor4);
              setNewFloor.call(this,floor4);
            }else{
              floor4.x = gw;
            }
          }
        }
        for(let i=0;i<bulidArr.length;i++){
          let build4 = bulidArr[i];
          if(build4.y>gh){
            build4.y = bulidArr[0].y - GetHeight(build4);
            bulidArr.splice(i,1);
            i--;
            bulidArr.unshift(build4);
          }
        }
        for(let i=0;i<barArr.length;i++){
          let bar4 = barArr[i];
          if(bar4.y>gh){
            barArr.splice(i,1);
            i--;
            oldbarArr.push(bar4);
            egret.Tween.pauseTweens(bar4);
          }
        }
      }
    /**addFloor */
      function addFloor(y){
        floorNum++;
        let floor = createBitmapByName("floor_png");
        this.gameLayer.addChild(floor);
        floor.x = pw_sx+Math.random()*(gw-pw_sx-GetWidth(floor));
        floor.y = y;
        floor["nums"] = floorNum;
        floorArr.push(floor);

        if(floorNum==10){
          addBar.call(this,"fast");
        }else if(isInteger(floorNum/addHearPosition)){
          addBar.call(this,"heart");
        }else if(floorNum>10&&floorNum<maxFloorNums){
          addBar.call(this);
        }

      }
      for(let i=0;i<10;i++){
        addFloor.call(this,gh*0.75 - floorY_Y*i);
      }
    /**setNewFloor */
      function setNewFloor(floor){
        floorNum++;
        floor.x = pw_sx+Math.random()*(gw-pw_sx*2-GetWidth(floor));
        floor["nums"] = floorNum;
        /**在这里升级难度 */
        if(boomCount>1500){
          boomCount = 4000 - floorNum*9;
        }else{
          boomCount = 1500;
        }
        if(floorNum==100){
          mustAddbarPosition--; 
          ranAddbarNum--;
          jumpCount = 600;
        }else if(floorNum==200){
          mustAddbarPosition--; 
          ranAddbarNum--;
          jumpCount = 500;
        }else if(floorNum==300){
          mustAddbarPosition--;
          ranAddbarNum--;
          jumpCount = 400;
        }

        if(isInteger(floorNum/addHearPosition)){
          addBar.call(this,"heart");
        }else if(floorNum<maxFloorNums){
          addBar.call(this);
        }
      }
    /**addBar */
      function addBar(must?:string){
        let barStringArr = ["fast","boom","heart"];
        let bar:any = false;
        if(must){
          if(must=="fast"){
            fastNum ++;
          }else if(must=="heart"){
            heartNum ++;
          }else if(must=="boom"){
            boomNum ++;
          }
          if(oldbarArr.length>0){
            bar = oldbarArr[0];
            bar.texture = RES.getRes(must+"_png");
            bar["type"] = must;
            egret.Tween.removeTweens(bar);
            bar.x = pw_sx;
            egret.Tween.get(bar,{loop:true}).to({x:gw-pw_sx-GetWidth(bar)},boomCount).to({x:pw_sx},boomCount);
            oldbarArr.splice(0,1);
          }else{
            bar = createBitmapByName(must+"_png");
            this.gameLayer.addChild(bar);
            bar["type"] = must;
            bar.x = pw_sx;
            removedTweens(bar);
            egret.Tween.get(bar,{loop:true}).to({x:gw-pw_sx-GetWidth(bar)},boomCount).to({x:pw_sx},boomCount);
          }         
        }else{
          let bar_ran = Math.floor(Math.random()*ranAddbarNum);
          let barStrRan = Math.floor(Math.random()*3);
          if(bar_ran==2||bar_ran==5||isInteger(floorNum/mustAddbarPosition)){
            if(barStrRan==0||barStrRan==2){
              barStrRan = 0;
              fastNum ++;
            }else if(barStrRan==1){
              barStrRan = 1;
              boomNum ++;
            }
            if(oldbarArr.length>0){
              bar = oldbarArr[0];
              bar.texture = RES.getRes(barStringArr[barStrRan]+"_png");
              bar["type"] = barStringArr[barStrRan];
              egret.Tween.removeTweens(bar);
              bar.x = pw_sx;
              egret.Tween.get(bar,{loop:true}).to({x:gw-pw_sx-GetWidth(bar)},boomCount).to({x:pw_sx},boomCount);
              oldbarArr.splice(0,1);
            }else{
              bar = createBitmapByName(barStringArr[barStrRan]+"_png");
              this.gameLayer.addChild(bar);
              bar["type"] = barStringArr[barStrRan];
              bar.x = pw_sx;
              removedTweens(bar);
              egret.Tween.get(bar,{loop:true}).to({x:gw-pw_sx-GetWidth(bar)},boomCount).to({x:pw_sx},boomCount);
            }
          }
        }
        if(bar){
          bar.visible = true;
          bar.y = floorArr[floorArr.length-1].y - gh*0.28;
          barArr.push(bar);
        }
      };
    /**分数 */
      let scoreLayer = new egret.Sprite();
      fgLayer.addChild(scoreLayer);
      let scoreBg = createBitmapByName("scoreBg_png");
      scoreLayer.addChild(scoreBg);
      let scoreText = new egret.BitmapText();
      scoreLayer.addChild(scoreText);
      scoreText.font = RES.getRes("g_numFont_fnt");
      scoreText.scaleX = scoreText.scaleY = initScale;
      scoreText.text = "0";
      scoreText.x = gh*0.078 - GetWidth(scoreText)/2;
      scoreText.y = gh*0.01;
      scoreLayer.y = gh*0.036;
      scoreLayer.x = pw_sx + gh*0.085;

      let headLayer = new egret.Sprite();
      // let headIndex = listLayer.getChildIndex(listBg);
      // winLayer.addChildAt(headLayer,headIndex);
      scoreLayer.addChild(headLayer);
      let headFg = createBitmapByName("r_headFg_png");
      let headBg = createBitmapByName("g_headBg_png");
      scaleFun(headFg,GetHeight(headBg)/gh);
      // scoreLayer.addChild(headBg);
      // headBg.alpha = 0.2;
      scoreLayer.addChild(headFg);
      headBg.x = -gh*0.05;
      headBg.y = GetHeight(scoreBg)/2 - GetHeight(headBg)/2;
      headFg.x = -gh*0.05;
      headFg.y = GetHeight(scoreBg)/2 - GetHeight(headFg)/2;
      addBitmapByUrl(headBg.x,headBg.y,GetHeight(headBg),headLayer,$headImg,"headImg",headBg,function(result){
        scoreLayer.addChild(headBg);
        result.mask = headBg;
      },this);
    /**生命 */
      let heartLayer = new egret.Sprite();
      fgLayer.addChild(heartLayer);
      let heartBg = createBitmapByName("heartBg_png");
      heartLayer.addChild(heartBg);     
      heartLayer.x = gw - pw_sx - GetWidth(heartBg) - gh*0.02;
      heartLayer.y = gh*0.031;

      let heartText = new egret.BitmapText();
      heartLayer.addChild(heartText);
      heartText.font = RES.getRes("g_numFont_fnt");
      heartText.scaleX = heartText.scaleY = initScale;
      heartText.text = "4";
      heartText.x = gh*0.064;
      heartText.y = gh*0.016;

      let heartViewArr = [];
      for(let i=0;i<4;i++){
        let heart = createBitmapByName("xin_png");
        heartLayer.addChild(heart);
        heart.x = gh*0.095 + (GetWidth(heart)+gh*0.007)*i;
        heart.y = gh*0.017;
        heartViewArr.push(heart);
      }
    /**爆炸动画 */
      let boommcdata = new egret.MovieClipDataFactory(RES.getRes("boomAni_json"),RES.getRes("boomAni_png"));
      let boomAni = new egret.MovieClip(boommcdata.generateMovieClipData("boomAni"));
      fgLayer.addChild(boomAni);
      boomAni.anchorOffsetY = boomAni.height/2;
      boomAni.anchorOffsetX = boomAni.width/2;
      boomAni.y = gh*1.5;
      boomAni.gotoAndStop("run");
      boomAni.addEventListener(egret.MovieClipEvent.COMPLETE,boomComplete,this);
      removedListener(boomAni,egret.MovieClipEvent.COMPLETE,boomComplete,this);
      function boomComplete(){
        boomAni.alpha = 0;
      }

    /**hitAndJump 加分*/
      function hitAndJump(hitObj){
        playAudio("jump",0,true);
        downSpeed = 0;
        canJump = false;
        if(hitObj["nums"]>score){
          score = hitObj["nums"];
          scoreText.text = score+"";
          scoreText.x = gh*0.078 - GetWidth(scoreText)/2;
        }
    /**forTest End*/
        hero.gotoAndPlay("jump");
        if(heroy - gh*0.4 - floorY_Y*jumpTwo<gh*0.35
        // &&score<maxFloorNums
        ){
          egret.Tween.get(hero).to({y:heroy-(heroy-gh*0.5)},jumpCount,egret.Ease.quadOut).call(function(){
            if(score>=maxFloorNums){
              resultFun.call(this);
            }else{
              heroJump = false;
              heroDown = true;
              hero.gotoAndPlay("down");
              floorLoop.call(this);
            }
          },this);

          for(let i=0;i<bulidArr.length;i++){
            let build3 = bulidArr[i];
            let build3y = build3.y;
            egret.Tween.get(build3).to({y:build3y + (gh*0.4-(heroy-gh*0.5) + floorY_Y*jumpTwo)},jumpCount,egret.Ease.quadOut);
          }
          for(let i=0;i<floorArr.length;i++){
            let floor3 = floorArr[i];
            let floor3y = floor3.y;
            egret.Tween.get(floor3).to({y:floor3y + (gh*0.4-(heroy-gh*0.5) + floorY_Y*jumpTwo)},jumpCount,egret.Ease.quadOut);
          }
          for(let i=0;i<barArr.length;i++){
            let bar3 = barArr[i];
            let bar3y = bar3.y;
            egret.Tween.get(bar3).to({y:bar3y + (gh*0.4-(heroy-gh*0.5) + floorY_Y*jumpTwo)},jumpCount,egret.Ease.quadOut);
          }

          if(land.parent){
            let landy = land.y;
            egret.Tween.get(land).to({y:landy + (gh*0.4-(heroy-gh*0.5) + floorY_Y*jumpTwo)},jumpCount,egret.Ease.quadOut).call(function(){
              LremoveChild(land);
            },this);
            egret.Tween.get(g_cloud).to({y:gh - GetHeight(g_cloud)*0.6},jumpCount,egret.Ease.quadOut);
          }
        }else{
          egret.Tween.get(hero).to({y:heroy - gh*0.4 - floorY_Y*jumpTwo},jumpCount,egret.Ease.quadOut).call(function(){
            if(score>=maxFloorNums){
              resultFun.call(this);
            }else{
              heroJump = false;
              heroDown = true;
              hero.gotoAndPlay("down");
              floorLoop.call(this);
            }
          },this);
        }
      }
    /**开始游戏 */
    let startTime = egret.getTimer();
    let endTime:number = 0;

    let gameInfo = [];
    let g_timing = 0;
    /**是否失败了 */
    let isFailed = false;
    /**重力 */
    let g = 9.9/5;
    let downSpeed = 0;
    /** */
    let fastCounts = 5;
    let fastCount = 0;
    let fast_st = 0;
    /**onframe */
      function onframe(){
        if(isFailed){
          return;
        }
        endTime = egret.getTimer();
      /**加速倒计时 */
        if(fastCount>0){
          let fastTime = endTime - fast_st;
          if(fastTime>fastCount*1000){
            fastCount = 0;
            jumpTwo = 0;
          }
        }
      /**判断出界 */
        if(hero.x<pw_sx-GetWidth(hero)/2){hero.x=gw-pw_sx+GetWidth(hero)/2}
        if(hero.x>gw-pw_sx+GetWidth(hero)/2){hero.x=pw_sx-GetWidth(hero)/2}
        hero.x += Shakex*4;
        if(Shakex>0){
          hero.scaleX = -1;
        }else{
          hero.scaleX = 1;
        }
      /**降落 */
        if(heroDown){
          downSpeed+=g;
          if(heroDown&&hero.y<gh){
            for(let i=0;i<floorArr.length;i++){
              let floor1 = floorArr[i];
              if(hero.y<floor1.y&&hero.y+downSpeed>floor1.y){
                if(hero.x+GetWidth(hero)*0.3>floor1.x&&hero.x-GetWidth(hero)*0.3<floor1.x+GetWidth(floor1)){
                  downSpeed = floor1.y - hero.y;
                  heroDown = false;
                  heroy = hero.y + downSpeed;
                  hitAndJump.call(this,floor1);
                }
              }
            }

            if(score<=5){
              if(hero.y<land.y&&hero.y+downSpeed>land.y){
                downSpeed = land.y - hero.y;
                heroDown = false;
                heroy = hero.y + downSpeed;
                hitAndJump.call(this,land);
              }else if(hero.y+downSpeed>gh){
                downSpeed = gh - hero.y;
                heroDown = false;
                heroy = hero.y + downSpeed;
                hitAndJump.call(this,land);                 
              }
            }
          }else if(hero.y-GetHeight(hero)>gh){
            // LMsg("GameOver");
            isFailed = true;
            resultFun.call(this);
          }
          hero.y += downSpeed;
        }else{
          /**heroDown==false */
        }
      /**道具/炸弹碰撞 */
        for(let i=0;i<barArr.length;i++){
          let bar = barArr[i];
          if(LHitTestObject2(hero,bar,
            [
              [GetWidth(hero)*0.3,GetHeight(hero)*0.15],
              [GetWidth(hero)*0.7,GetHeight(hero)*0.15],
              [GetWidth(hero)*0.9,GetHeight(hero)],
              [GetWidth(hero)*0.1,GetHeight(hero)]
            ],
            [
              [GetWidth(bar)*0.1,GetHeight(bar)*0.1],
              [GetWidth(bar)*0.9,GetHeight(bar)*0.1],
              [GetWidth(bar)*0.9,GetHeight(bar)],
              [GetWidth(bar)*0.1,GetHeight(bar)]
            ]
          )){
            bar.visible = false;
            if(bar["type"]=="fast"){
              fastHitNum ++;
              fastCount = fastCounts;
              fast_st = egret.getTimer();
              jumpTwo = 1;
            }else if(bar["type"]=="heart"){
              if(heartnums<maxHeart){
                heartHitNum ++;
                heartnums ++;
                heartText.text = heartnums+"";
                heartViewArr[heartnums-1].texture = RES.getRes("xin_png");
              }
            }else if(bar["type"]=="boom"){
              boomHitNum ++;
              heartnums--;
              heartText.text = heartnums+"";
              heartViewArr[heartnums].texture = RES.getRes("badHeart_png");
              /**爆炸效果 */
              boomAni.x = bar.x + GetWidth(bar)/2;
              boomAni.y = bar.y + GetHeight(bar)/2;
              boomAni.alpha = 1;
              boomAni.gotoAndPlay("run",1);
              if(heartnums<=0){
                // LMsg("Boom-No Blood And GameOver");
                isFailed = true;
                resultFun.call(this);
              }else{
                // LMsg("let's boom!");
              }

            }
          }
        }
      }
    /**开始游戏 */
      function gameStart(isFirst?:boolean){
        this.addEventListener(egret.Event.ENTER_FRAME,onframe,this);
        if(isFirst){removedListener(this,egret.Event.ENTER_FRAME,onframe,this);}
        startTime = egret.getTimer();

        canJump = false;
        egret.Tween.get(hero).to({y:heroy - gh*0.35},jumpCount,egret.Ease.quadOut).call(function(){
          heroJump = false;
          heroDown = true;
          hero.gotoAndPlay("down");
          floorLoop.call(this);
        },this);
      }
    /**游戏暂停 ----*/
      function gamePause(){
        this.removeEventListener(egret.Event.ENTER_FRAME,onframe,this);
        g_timing += endTime - startTime;
      }
    /**游戏结果 */
      function resultFun(){
        g_timing = endTime - startTime;
        this.removeEventListener(egret.Event.ENTER_FRAME,onframe,this);
        let gameCode = ((this.startData.gameCode-2)*2-3)*3+score;
        let gameData;
        if(haveGravity){
          gameData = {
            score:score,
            useTime:g_timing,
            gameInfo:{
              sbx:this.startData.sbx,
              sby:this.startData.sby,
              haveGravity:haveGravity,
              floorNum:floorNum,
              useTime:g_timing,
              startTime:startTime,
              endTime:endTime,
              bloodNum:heartnums,
              fastNum:fastNum,
              heartNum:heartNum,
              boomNum:boomNum,
              fastHitNum:fastHitNum,
              heartHitNum:heartHitNum,
              boomHitNum:boomHitNum,
              haveNum:gameCode,
            }
          }
        }else{
          gameData = {
            sbx:this.startData.sbx,
            sby:this.startData.sby,
            score:score,
            useTime:g_timing,
            gameInfo:{
              floorNum:floorNum,
              useTime:g_timing,
              startTime:startTime,
              endTime:endTime,
              bloodNum:heartnums,
              fastNum:fastNum,
              heartNum:heartNum,
              boomNum:boomNum,
              fastHitNum:fastHitNum,
              heartHitNum:heartHitNum,
              boomHitNum:boomHitNum,
              haveNum:gameCode,
            }
          } 
        }

        showloading("正在提交成绩...");
        endGameAjax(gameData,function(data){
          hideloading();
          // let resultData = data;
          // 成绩结果对象 数据传到 resultPage.js 结果页
          let resultData = {
            score:score,
            bestScore:data.bestScore,
            bestRank:data.bestRank
          }
          let resultLayer = new resultPage(resultData,function(){
            LremoveChild(this);
          },this);
          GameLayer.addChild(resultLayer);
          window.location.href = "./test.html";
        },function(data){
          hideloading();
          LAlert(data.msg);
          showloading(data.msg);
        },this);
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
      function replayFun(){
        LremoveChild(this);
        let homeLayer = new LHomePage();  
        GameLayer.addChild(homeLayer);
      }
    /**forTest */
      this.descView(gameStart,this,true);
      // gameStart.call(this,true);
      // resultFun.call(this);
      /**判断是否为整数 */
      function isInteger(obj) {
        return typeof obj === 'number' && obj%1 === 0;
      }
    }
    /**游戏介绍 */
    private descView(callback,thisObj,data){
      let descLayer = new egret.Sprite();
      GameLayer.addChild(descLayer);
      descLayer.touchEnabled = true;

      let winShape = createBitmapByName("descBg_png");
      descLayer.addChild(winShape);
      winShape.x =  gw/2 - GetWidth(winShape)/2;

      let winLayer = new egret.Sprite();
      descLayer.addChild(winLayer);
      winLayer.width = gw;
      winLayer.height = gh;

  

      winEnterAni(winShape,winLayer,"scale01",function(){
        descLayer.once(egret.TouchEvent.TOUCH_TAP,enterFun,this);
        removedListener(descLayer,egret.TouchEvent.TOUCH_TAP,enterFun,this);
      },this);

      function enterFun(){
        // playAudio("touchBtn",0);
        egret.Tween.get(descLayer).to({alpha:0},320).call(function(){
          LremoveChild(descLayer);
          callback.call(thisObj,data);
        },this);
      }
    }
  /**移除监听 */
    private removedFun(){

    }
  }
}


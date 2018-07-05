
class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: Lgs.LLoading;
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        // Lgs.addQR(0,0.345,"30%");
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new Lgs.LLoading();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.MyLoadGroups, this);
        /**允许跨域 */
        egret.ImageLoader.crossOrigin = "anonymous";
        RES.loadConfig($staticUrl+"resource/default.res.json?ver=2.1", $staticUrl+"resource/");
    }
    private loadGroupArr:any;
    private loadTextArr:any;
    private loadTimes:number;
    private MyLoadGroups(event: RES.ResourceEvent){
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.MyLoadGroups, this);
        if(IsZhuli){
            this.loadGroupArr = ['loadUI','preload2'];
        }else if(IsActivityEnd){
            this.loadGroupArr = ['loadUI','preload'];
        }else{
            this.loadGroupArr = ['loadUI','preload'];
        }
        this.loadTextArr = [
            '',
            ''
        ];
        this.loadTimes = 0;
        this.onConfigComplete(event);
    }
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);

        let thisGroupName = "loadUI";
        thisGroupName = this.loadGroupArr[this.loadTimes];
        RES.loadGroup(thisGroupName);
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent) {
        if(event.groupName == "loadUI"){
            this.loadingView.createLoading();
        }
        if (event.groupName == this.loadGroupArr[this.loadTimes]) {
            this.loadTimes ++;
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);

            if(this.loadTimes < this.loadGroupArr.length){
                this.onConfigComplete(event);
            }else{
            /**应用于有 少量 html图片的情况 */
                // let _THIS = this;
                // $.ajax({
                //     type: 'GET',
                //     url: $staticUrl+'images/res.json',
                //     dataType:'json',
                //     cache:false,
                //     success: function(data) {
                //         var i=0;
                //         loadRes(data['index'],i,function(index){
                //             _THIS.stage.removeChild(_THIS.loadingView);
                //             Res_ok = true;
                //             _THIS.createGameScene();
                //         },_THIS);
                //     }
                // });
            /**正常 */
                this.stage.removeChild(this.loadingView);
                Res_ok = true;
                this.createGameScene();
            }
        }
    /**html图片加载 */
        function loadRes(datas,index,callback,thisObj){
            if(datas[index].type=='image'){
                var image=new Image();
                image.src=datas[index].src;
                image.onload=function(){
                    loadSuccess.call(thisObj);
                }
                image.onerror=function(){
                    alert('文件'+datas[index]+'加载失败');
                };       
            }else if(datas[index].type=='audio'){
                var audio = new Audio();
                audio.src = datas[index].src;
                audio.onloadedmetadata = function(){        
                    loadSuccess.call(thisObj);
                };
                audio.onerror=function(){
                    alert('文件'+datas[index]+'加载失败');
                }
            }
            function loadSuccess(){
                // console.log(index+100);
                var curLoading=Math.floor((index+1)/datas.length*100);
                // this.loadingView.setProgress(index+1,datas.length, "正在加载音效...");
                if(index<datas.length-1){
                    loadRes(datas,(index+1),callback,thisObj);
                }else if(index==datas.length-1){
                    if(callback){
                        callback.call(thisObj,index);
                    }
                }
            }
        }
    /**html图片加载 end */
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent) {
        if (event.groupName == this.loadGroupArr[this.loadTimes]) {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal, this.loadTextArr[this.loadTimes]);
        }
    }

    /**
     * 创建游戏场景
     * Create a game scene
     */
    public createGameScene() {
        gameDiv = document.getElementsByClassName("egret-player")[0];
        Lgs.addQR(0,0.679,"12%",false);
        // Lgs.addQR2(0.059,0.66,"12%",false);

        $gameStage = this.stage;
        loadingScreen = new Lgs.LScreen();
        /**背景层 */
        let GamebgLayer = new egret.Sprite();
        this.stage.addChild(GamebgLayer);
        /**游戏层 */
        GameLayer = new egret.Sprite();
        this.stage.addChild(GameLayer);
        // Lgs.LMsg(window.innerWidth+"x"+window.innerHeight);
        /**音乐按钮 */
        bgmViewer = new Lgs.LBgm();
        this.stage.addChild(bgmViewer);
        // bgmViewer.visible = false;

        if(IsZhuli){
            let gameLayer = new Lgs.zhuliPage();
            GameLayer.addChild(gameLayer);
        }
        // else if(IsActivityEnd){
        //     let gameLayer = new Lgs.activityEndPage();
        //     GameLayer.addChild(gameLayer);
        // }
        else{
            // let gameLayer = new Lgs.keyPage();
            // GameLayer.addChild(gameLayer);

            let gameLayer = new Lgs.LHomePage();
            GameLayer.addChild(gameLayer);

			// Ajax
                // let data = {
                //     "surplus":1,
                //     "level":1,
                // }
                // let gameLayer = new Lgs.drawPage(data);
                // GameLayer.addChild(gameLayer);

            // let gameLayer = Lgs.sharePage();
            // GameLayer.addChild(gameLayer);

            // let gameLayer = new Lgs.GameContainer();
            // GameLayer.addChild(gameLayer)
                // let GameContainerLayer;
				// if(ishsp){
				// /**旋转模式1 */
				// 	GameContainerLayer = new Lgs.GameContainer();
				// 	GameLayer.addChild(GameContainerLayer);
				// 		GameContainerLayer.rotation = 90;
				// 		GameContainerLayer.x = gw;

				// 	// GameContainerLayer.x = gw*2;

				// 	// let gameMask = new egret.Shape();
				// 	// GameLayer.addChild(gameMask);
				// 	// gameMask.graphics.beginFill(0x000000);
				// 	// gameMask.graphics.drawRect(0,0,gw,gh);
				// 	// gameMask.graphics.endFill();
				// 	// gameMask.x = gw;
				// 	// GameContainerLayer.mask = gameMask;

				// 	// egret.Tween.get(GameContainerLayer).wait(50).to({x:gw},400);
				// 	// egret.Tween.get(gameMask).wait(50).to({x:0},400).call(function(){
				// 	// 	GameLayer.removeChild(gameMask);
				// 	// 	GameContainerLayer.mask = null;
				// 	// },this);
				// }else{
				// /**旋转模式2 */
				// 	GameContainerLayer = new Lgs.GameContainer();
				// 	GameLayer.addChild(GameContainerLayer);
				// 		GameContainerLayer.rotation = -90;
				// 		GameContainerLayer.x = 0;
				// 		GameContainerLayer.y = gh;

				// 	// GameContainerLayer.x = gw;

				// 	// let gameMask = new egret.Shape();
				// 	// GameLayer.addChild(gameMask);
				// 	// gameMask.graphics.beginFill(0x000000);
				// 	// gameMask.graphics.drawRect(0,0,gw,gh);
				// 	// gameMask.graphics.endFill();
				// 	// gameMask.x = gw;
				// 	// GameContainerLayer.mask = gameMask;

				// 	// egret.Tween.get(GameContainerLayer).wait(50).to({x:0},400);
				// 	// egret.Tween.get(gameMask).wait(50).to({x:0},400).call(function(){
				// 	// 	GameLayer.removeChild(gameMask);
				// 	// 	GameContainerLayer.mask = null;
				// 	// },this);
				// }

				// egret.Tween.get(this).wait(50).to({x:-gw},400)
				// .call(function(){
                //     Lgs.LremoveChild(this)
                //     Lgs.hideloading();
				// },this);
			/** */

            // let obj = new egret.Sprite();
            // let gameLayer = new Lgs.LFormPage2(30,obj);
            // GameLayer.addChild(gameLayer);
            // let gameLayer = new Lgs.LPrizePage();
            // GameLayer.addChild(gameLayer);
            // let overPageData = {
            //     "level":1,
            //     "percent":10,
            //     "meter":189,
            // }
            // let gameLayer = new Lgs.LOverPage(overPageData);
            // GameLayer.addChild(gameLayer);
            // let gameLayer = new Lgs.LRankPage();
            // GameLayer.addChild(gameLayer);
        }

        this.stage.addChild(loadingScreen);
        Lgs.hideloading();

        /**前景层 */
        // let logo = Lgs.createBitmapByName("logo_png");
        // this.stage.addChild(logo);
        // logo.x = gw/2 - gh*0.29;
        // logo.y = gh*0.012;

        // uprightTipsLayer = Lgs.uprightTipsFun();
        // this.stage.addChild(uprightTipsLayer);
        // // uprightTipsLayer.visible = false;
        // if(window.innerWidth>window.innerHeight){
        //     uprightTipsLayer.visible = false;
        // }
        // this.stage.setChildIndex(uprightTipsLayer,this.stage.numChildren);

        // let winsLayer = new Lgs.LWin(viewdata_newToolList);
        // $gameStage.addChild(winsLayer);

        // htmlAppear([".bgmBtn"]);


        if(gw==960){
            let gameMask = new egret.Shape();
            this.addChild(gameMask);
            gameMask.graphics.beginFill(0x000000);
            gameMask.graphics.drawRect(55,0,850,gh);
            gameMask.graphics.endFill();
            // gameMask.x = gw;
            GameLayer.mask = gameMask;
        }
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}

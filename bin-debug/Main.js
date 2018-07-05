var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
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
        RES.loadConfig($staticUrl + "resource/default.res.json?ver=2.1", $staticUrl + "resource/");
    };
    Main.prototype.MyLoadGroups = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.MyLoadGroups, this);
        if (IsZhuli) {
            this.loadGroupArr = ['loadUI', 'preload2'];
        }
        else if (IsActivityEnd) {
            this.loadGroupArr = ['loadUI', 'preload'];
        }
        else {
            this.loadGroupArr = ['loadUI', 'preload'];
        }
        this.loadTextArr = [
            '',
            ''
        ];
        this.loadTimes = 0;
        this.onConfigComplete(event);
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    Main.prototype.onConfigComplete = function (event) {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        var thisGroupName = "loadUI";
        thisGroupName = this.loadGroupArr[this.loadTimes];
        RES.loadGroup(thisGroupName);
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "loadUI") {
            this.loadingView.createLoading();
        }
        if (event.groupName == this.loadGroupArr[this.loadTimes]) {
            this.loadTimes++;
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            if (this.loadTimes < this.loadGroupArr.length) {
                this.onConfigComplete(event);
            }
            else {
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
        function loadRes(datas, index, callback, thisObj) {
            if (datas[index].type == 'image') {
                var image = new Image();
                image.src = datas[index].src;
                image.onload = function () {
                    loadSuccess.call(thisObj);
                };
                image.onerror = function () {
                    alert('文件' + datas[index] + '加载失败');
                };
            }
            else if (datas[index].type == 'audio') {
                var audio = new Audio();
                audio.src = datas[index].src;
                audio.onloadedmetadata = function () {
                    loadSuccess.call(thisObj);
                };
                audio.onerror = function () {
                    alert('文件' + datas[index] + '加载失败');
                };
            }
            function loadSuccess() {
                // console.log(index+100);
                var curLoading = Math.floor((index + 1) / datas.length * 100);
                // this.loadingView.setProgress(index+1,datas.length, "正在加载音效...");
                if (index < datas.length - 1) {
                    loadRes(datas, (index + 1), callback, thisObj);
                }
                else if (index == datas.length - 1) {
                    if (callback) {
                        callback.call(thisObj, index);
                    }
                }
            }
        }
        /**html图片加载 end */
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == this.loadGroupArr[this.loadTimes]) {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal, this.loadTextArr[this.loadTimes]);
        }
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    Main.prototype.createGameScene = function () {
        gameDiv = document.getElementsByClassName("egret-player")[0];
        Lgs.addQR(0, 0.679, "12%", false);
        // Lgs.addQR2(0.059,0.66,"12%",false);
        $gameStage = this.stage;
        loadingScreen = new Lgs.LScreen();
        /**背景层 */
        var GamebgLayer = new egret.Sprite();
        this.stage.addChild(GamebgLayer);
        /**游戏层 */
        GameLayer = new egret.Sprite();
        this.stage.addChild(GameLayer);
        // Lgs.LMsg(window.innerWidth+"x"+window.innerHeight);
        /**音乐按钮 */
        bgmViewer = new Lgs.LBgm();
        this.stage.addChild(bgmViewer);
        // bgmViewer.visible = false;
        if (IsZhuli) {
            var gameLayer = new Lgs.zhuliPage();
            GameLayer.addChild(gameLayer);
        }
        else {
            // let gameLayer = new Lgs.keyPage();
            // GameLayer.addChild(gameLayer);
            var gameLayer = new Lgs.LHomePage();
            GameLayer.addChild(gameLayer);
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
        if (gw == 960) {
            var gameMask = new egret.Shape();
            this.addChild(gameMask);
            gameMask.graphics.beginFill(0x000000);
            gameMask.graphics.drawRect(55, 0, 850, gh);
            gameMask.graphics.endFill();
            // gameMask.x = gw;
            GameLayer.mask = gameMask;
        }
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map
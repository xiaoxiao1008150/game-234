
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/res/res.js",
	"libs/modules/tween/tween.js",
	"libs/modules/dragonBones/dragonBones.js",
	"polyfill/promise.min.js",
	"libs/jquery-1.9.1.min.js",
	"libs/fastclick.js",
	"libs/server_ajax_trukey.js",
	"libs/lgs.js",
	"libs/index.js",
	"bin-debug/Lgs/GameUtil.js",
	"bin-debug/Lgs/snowing.js",
	"bin-debug/Lgs/LHomePage.js",
	"bin-debug/Lgs/GameContainer.js",
	"bin-debug/Main.js",
	"bin-debug/Lgs/GameUtil2.js",
	"bin-debug/Lgs/LAjax.js",
	"bin-debug/Lgs/LBgm.js",
	"bin-debug/Lgs/LLoading.js",
	"bin-debug/Lgs/LRankPage.js",
	"bin-debug/Lgs/LShake.js",
	"bin-debug/Lgs/resultPage.js",
	"bin-debug/Lgs/ruleView.js",
	"bin-debug/Lgs/sharePage.js",
	"bin-debug/Lgs/DeclareFunUtil.js",
	"bin-debug/Lgs/zhuliPage.js",
	"bin-debug/Lgs/controlPage.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        var result = egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 33,
		scaleMode: "noBorder",
		contentWidth: 850,
		contentHeight: 1206,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};
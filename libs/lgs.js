// -webkit-overflow-scrolling: touch;
var WeixinJSBridgeReady_OK = false;
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

var cw = 850;
var cw2 = 750;
var gw = 850;
var gh = 1206;

var ch = 1206;
var $gameStage;
var ph = window.innerHeight;
var pw = window.innerWidth;
var pw_sx=0;
pwsxFun();
$(function(){
    u = navigator.userAgent;
    isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if(isiOS){
        $("html,body").css("background","#1B1B1F");
    }else{
        $("html,body").css("background","#393A3F");
    }
    FastClick.attach(document.body);
    pwsxFun();
    /**使用 监听手机旋转 解决安卓弹出键盘 导致 窗口变小的问题 */
    window.onorientationchange = function(){
    // window.onresize = function(){
        setTimeout(function(){
            // onResizeFun();
            pwsxFun();
            bgmViewer.setinitPosition();
        },320);
    }
    var ISweixn = is_weixn();
    // 播放音乐 audio
    var bgmDom = document.getElementById("bgm");

    if (ISweixn) {
        document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
            WeixinJSBridgeReady_OK = true;
            /**播放音效 */
            firstPlayAudio("jump");
            firstPlayAudio("touchBtn");
            if(typeof WeixinJSBridge != undefined){
                WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
                    if(bgmDom){
                      bgmDom.play();
                    }
                });
            }else{
                if(bgmDom){
                  bgmDom.play();
                }
            }
        });
    }else{
        if(bgmDom){
          bgmDom.play();
        }
    }
});
/**canvas起点x设定 */
function pwsxFun(){
	ph = window.innerHeight;
	pw = window.innerWidth;
    if($(".egret-player").attr("data-scale-mode")=="showAll"){
        pw_sx = 0;
        if($(".egret-player").attr("data-content-width")=="750"){
            cw = 750;
            cw2 = 750;
            gw = 750;
            gh = 1206;
        }
        return;
    }
    if(cw>cw2){
        if(pw<ph){
            pw_sx = Math.max((cw-cw2)/2,(cw-(ch*(pw/ph)))/2);
        }else{
            pw_sx = Math.max((cw-cw2)/2,(cw-(ch*(ph/pw)))/2);
        }
    }else{
        if(pw<ph){
            pw_sx = Math.max(0,(cw-(ch*(pw/ph)))/2);
        }else{
            pw_sx = Math.max(0,(cw-(ch*(ph/pw)))/2);
        }
    }
}
/**lsg2 muscic*/
    var canMusic = true;
    function playAudio(id,audion_st,noTouch){
        /**无声版本 */
        var obj = document.getElementById(id);
        if(isAndroid){
            obj.volume=1;
        }
        /** 正常点击版本*/
        if(typeof(audion_st)=="number"){
            if(obj)obj.currentTime = audion_st;
        }
        if(!noTouch){
            if(obj)obj.play();
            return;
        }
        /**微信强制播放音乐版本 */
        if (WeixinJSBridgeReady_OK) {
            if(typeof WeixinJSBridge != undefined){
                WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
                    if(obj)obj.play();
                });
            }else{
                if(obj)obj.play();
            }
        }else{
            if(obj)obj.play();
        }
    }

    function firstPlayAudio(id){
        var obj = document.getElementById(id);
        if(isAndroid){
            obj.volume=0;
        }
        var audion_st=Math.max(obj.duration-1,0);
        obj.currentTime = audion_st;
        /**微信强制播放音乐版本 */
        if (WeixinJSBridgeReady_OK) {
            if(typeof WeixinJSBridge != undefined){
                WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
                    if(obj)obj.play();
                });
            }
        }
    }

    var bgmViewer;
    function setBgm(wantPlay){
        var myBgm = document.getElementById('bgm');
        if(wantPlay){
            myBgm.play();  
        }else{  
            myBgm.pause();  
        }
    }
    function stopAudio(id){
        var obj = document.getElementById(id);
        if(obj)obj.pause();
    }
    function stopOtherAudio(id){
        $("audio").each(function(){  		
            if(id){
                if ($(this).attr('id')!=id) {
                    $(this)[0].currentTime = 0;
                    $(this)[0].pause();    		
                };
            }else{
                $(this)[0].currentTime = 0;
                $(this)[0].pause();
            }
        });
    };
/**lgs4 通用方法 */
    //公共弹窗
    function alertp(text){
        if(!$('.alertp').size()){
            $('body').append('<div class="alertp style="display: none;">'
            +'<div class="alertpBox">'
            +'<div class="alertpTitle">提示</div>'
            +'<p><span>'+text+'</span><a class="alertp_close" href="javascript:void(0);"></a></p>'
            +'</div>'
            +'</div>');
        }else{
            $('.alertp p span').html(text);
            $('.alertp').fadeIn(120);
        }
    }
    $(document).on('click','.alertp_close',function(){
        $('.alertp').fadeOut(120);
    });
    var checkPhone = function(s) {
        var myreg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        // var myreg = /^(^(\d{3,4}-)?\d{7,8})$|(13[0-9]{9})$/;
        if (!myreg.test(s)) {
            return false;
        } else {
            return true;
        }
    };
    function is_weixn(){  
        var ua = navigator.userAgent.toLowerCase();  
        if(ua.match(/MicroMessenger/i)=="micromessenger") {  
            return true;  
        } else {  
            return false;  
        } 
        return false;
    }
    /**nS时间戳 */
    function getLocalTime(nS) {
        return new Date(parseInt(nS));
    }
    /**now:Date 返回 2017年8月19日 12:18:35 */
    function formatDate(now) {
        var year=now.getFullYear(); 
        var month=now.getMonth()+1; 
        var date=now.getDate(); 
        var hour=now.getHours(); 
        var minute=now.getMinutes(); 
        var second=now.getSeconds(); 
        // console.log(year+"年"+month+"月"+date+"日 "+hour+":"+minute+":"+second);
        return year+"年"+month+"月"+date+"日 "+hour+":"+minute+":"+second; 
        // return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
    } 
    /**获取至截止日期的剩余时间 num：时间戳 */
    function getCount(num){
        var sec = Math.floor(num/1000);
        var min = Math.floor(sec/60);
        var hour = Math.floor(min/60);
        var day = Math.floor(hour/24);
        if(day>0){
            return day + "天";
        }else{
            if(hour>0){
                return hour + "小时";
            }else{
                if(min>0){
                    return min + "分钟";
                }else{
                    return sec + "秒"; 
                }        
            }
        }
    }
    /**生成随机码 */
    function randomString(len){
        var len = len || 6;
        var str = 'ABCDEFGHJKMNPQRSTWXYZ2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        var tmp = '';
        for(var i=0; i<len; i++) {
            tmp += str.charAt(Math.round(Math.random()*str.length));
        }
        return tmp;
    }
    /**生成16位用户身份证明 */
    function generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    };
/**lgs5 横屏遮罩*/
    /** 提示竖屏界面 */
    var uprightTipsLayer;
    var ISgameing = false;
    function onResizeFun(){
        // if(ISgameing){
            setTimeout(function(){
                // console.log(window.innerWidth);
                if(window.innerWidth<window.innerHeight){
                    uprightTipsLayer.visible = false;
                    // window.location.href=window.location.href + "?t=" + new Date().getTime();
                    // location.replace(window.location.href);
                }else{
                    uprightTipsLayer.visible = true;
                }
            },100);
        // }
    }
    // window.onresize = function(){
    //     onResizeFun();
    // };
/**ajaxLoading */
    function showAjaxLoading(title){
        if($('#ajax_loading').size()<1){
            $('body').append('<section class="ajax_loading" id="ajax_loading"><div class="ajax_loading_box"><p></p></div></section>');
        }
        if(title){
            $('#ajax_loading').find('p').text(title);
        }
        $('#ajax_loading').show();
    }
    function hideAjaxLoading(){
        $('#ajax_loading').hide();
    }


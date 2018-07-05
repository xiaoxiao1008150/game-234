declare function playAudio(id:string,startTime?:number,noTouch?:boolean);
declare function stopAudio(id:string);
declare function stopOtherAudio(id:string|boolean);
declare function checkPhone(s);
declare function showAjaxLoading(title);
declare function hideAjaxLoading();
/**横着的 竖屏模式 */
declare var ishsp:boolean;
declare var $nickName;
declare var $headImg;

/**oss静态链接 */
declare var $staticUrl;
declare var $qrUrl;
/**是否填写了手机号/提交了个人信息 */
declare var $haveMobile:boolean;

/**是否助力页面 */
declare var IsZhuli:boolean;
/**是否活动结束页面 */
declare var IsActivityEnd:boolean;
/**当前-分享界面/分享后要移除的界面 */
    let shareObj = new egret.Sprite();
/**其他 */
    declare var prize_index;
    declare var myPrizeLayer;
    /**玩家本局游戏等级 */
    let $thisLevel = 0;
    /**第一次进入游戏 */
    let firstPlay= true;

    declare var $topScore:number;
    declare var $newUser:boolean;


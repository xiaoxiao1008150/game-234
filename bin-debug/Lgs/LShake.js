//摇一摇开关，1表示开，0表示关
var canShake = 1;
/**摇一摇监听 */
var SHAKE_THRESHOLD = 10;
var last_update = 1;
var Shakex, Shakey, Shakez, last_x, last_y, last_z;
Shakex = Shakey = Shakez = last_x = last_y = last_z = 0;
var shakeobj;
var fangxiang = 1;
if (!isiOS) {
    fangxiang = -1;
}
var Lgs;
(function (Lgs) {
    function shaketodo(needInfo, infoArr) {
        if (shakeobj) {
            shakeobj.dispatchEventWith("shakeOk");
        }
        if (GameLayer && needInfo) {
            GameLayer.dispatchEventWith("onShake", false, needInfo);
        }
        if (GameLayer && infoArr) {
            Lgs.LInfoView(infoArr);
        }
    }
    Lgs.shaketodo = shaketodo;
    function deviceMotionHandler(eventData) {
        var acceleration = eventData.accelerationIncludingGravity;
        var curTime = new Date().getTime();
        //100ms监听一次，拒绝重复监听
        if ((curTime - last_update) > 60 && canShake == 1) {
            var diffTime = curTime - last_update;
            last_update = curTime;
            Shakex = acceleration.x * fangxiang;
            Shakey = acceleration.y * fangxiang;
            Shakez = acceleration.z * fangxiang;
            var speed = Math.abs(Shakex + Shakey + Shakez - last_x - last_y - last_z) / diffTime * 10000;
            if (speed > SHAKE_THRESHOLD) {
                // canShake=0;
                if (!haveGravity)
                    haveGravity = true;
                /**执行区域 */
                var shakeInfoArr = [
                    ["speed", speed],
                    ["Shakex", Shakex],
                    ["Shakey", Shakey],
                    ["Shakez", Shakez],
                ];
            }
            last_x = Shakex;
            last_y = Shakey;
            last_z = Shakez;
        }
    }
    Lgs.deviceMotionHandler = deviceMotionHandler;
})(Lgs || (Lgs = {}));
$(function () {
    if (window["DeviceMotionEvent"]) {
        window.addEventListener('devicemotion', Lgs.deviceMotionHandler, false);
    }
    else {
        alert('你的设备不支持DeviceMotion事件');
    }
});
//# sourceMappingURL=LShake.js.map
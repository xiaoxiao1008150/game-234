//摇一摇开关，1表示开，0表示关
let canShake = 1;
/**摇一摇监听 */
let SHAKE_THRESHOLD = 10;
let last_update = 1;
let Shakex,Shakey,Shakez,last_x,last_y,last_z;
Shakex = Shakey = Shakez = last_x = last_y = last_z = 0;
let shakeobj;
let fangxiang=1;
if(!isiOS){
    fangxiang=-1;
}
module Lgs {
	export function shaketodo(needInfo,infoArr?){
		if(shakeobj){
			shakeobj.dispatchEventWith("shakeOk");
		}
		if(GameLayer&&needInfo){
			GameLayer.dispatchEventWith("onShake",false,needInfo);
		}
		if(GameLayer&&infoArr){
			Lgs.LInfoView(infoArr);
		}
	}
	export function deviceMotionHandler(eventData){
        let acceleration = eventData.accelerationIncludingGravity;
        let curTime = new Date().getTime();
        //100ms监听一次，拒绝重复监听
        if ((curTime - last_update) > 60 && canShake==1) {
            let diffTime = curTime - last_update;
            last_update = curTime;
            Shakex = acceleration.x*fangxiang;
            Shakey = acceleration.y*fangxiang;
            Shakez = acceleration.z*fangxiang;
            let speed = Math.abs(Shakex + Shakey + Shakez - last_x - last_y - last_z) / diffTime * 10000;
            if (speed > SHAKE_THRESHOLD) {
                // canShake=0;
                if(!haveGravity) haveGravity=true;
                /**执行区域 */
                let shakeInfoArr = [
                    ["speed",speed],
                    ["Shakex",Shakex],
                    ["Shakey",Shakey],
                    ["Shakez",Shakez],
                ];
                // let needInfo = speed;
                // shaketodo(needInfo,shakeInfoArr);
            }
            last_x = Shakex;
            last_y = Shakey;
            last_z = Shakez;
        }
    }
}

$(function(){
	if (window["DeviceMotionEvent"]) {
        window.addEventListener('devicemotion', Lgs.deviceMotionHandler,false);
    } else {
        alert('你的设备不支持DeviceMotion事件');
    }
});

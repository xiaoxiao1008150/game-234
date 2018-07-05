/**外部Ajax */
declare function startGameAjax(callBack,errorCallBack,thisObj);
declare function endGameAjax(overdata,callBack,errorCallBack,thisObj);
declare function getRankListAjax(callback,errorCallback,thisObj);

module Lgs2 {
/**开始游戏 */
	export var startAjax=function(callback,errorCallback,name?:any){
		showAjaxLoading('正在载入游戏');
		if(!name){
			name = "";
		}
		$.ajax({
			type: 'POST',
			url: 'server.php',
			data:{
				'type':'start',
				'name':name
			},
			dataType:'json',
			cache:false,        
			success: function(data) {
				hideAjaxLoading();
				// console.log(data);
				if(data.success){
					if(callback) callback(data);
				}else{
					if(errorCallback) errorCallback(data);
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				hideAjaxLoading();
				Lgs.LAlert(errorThrown);
			}
		});
	};
/**游戏结束 */
	export var endAjax=function(gameInfo,callback,errorCallback){
		$.ajax({
			type: 'POST',
			url: 'server.php',
			data:{
				'type':'end2',
				'gameInfo':gameInfo
			},
			dataType:'json',
			cache:false,        
			success: function(data) {
				// console.log(data);
				if(data.success){
					if(callback) callback(data);
				}else{
					if(errorCallback) errorCallback(data);
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				// alert(errorThrown);
				Lgs.LAlert(errorThrown);
			}
		});
	};
/**信息提交Ajax */
	export var submitInfoAjax=function(userInfo,callback,errorCallback){
		$.ajax({
			type: 'POST',
			url: 'server.php',
			data:{
				'type':'updateInfo',
				'userInfo':userInfo
			},
			dataType:'json',
			cache:false,        
			success: function(data) {
				// console.log(data);
				if(data.success){
					if(callback) callback(data);
				}else{
					if(errorCallback) errorCallback(data);
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				// alert(errorThrown);
				Lgs.LAlert(errorThrown);
			}
		});
	};
/**获取排行榜 */
	export var getRankAjax=function(callback,errorCallback){
		$.ajax({
			type: 'POST',
			url: 'server.php',
			data:{
				'type':'getRank2'
			},
			dataType:'json',
			cache:false,        
			success: function(data) {
				// console.log(data);
				if(data.success){
					if(callback) callback(data);
				}else{
					if(errorCallback) errorCallback(data);
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				// alert(errorThrown);
				Lgs.LAlert(errorThrown);
			}
		});
	};
/**分享后Ajax */
	export var shareAjax=function(shareType,callback,errorCallback){
		$.ajax({
			type: 'POST',
			url: 'server.php',
			data:{
				'type':'share'
			},
			dataType:'json',
			cache:false,        
			success: function(data) {
				// console.log(data);
				if(data.success){
					if(callback) callback(data);
				}else{
					if(errorCallback) errorCallback(data);
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				alert(errorThrown);
			}
		});
	};
/**ajaxLoading */
    export var showAjaxLoading=function(title){
        if($('#ajax_loading').size()<1){
            $('body').append('<section class="ajax_loading" id="ajax_loading"><div class="ajax_loading_box"><p></p></div></section>');
        }
        if(title){
            $('#ajax_loading').find('p').text(title);
        }
        $('#ajax_loading').show();
    };
    export var hideAjaxLoading = function(){
        $('#ajax_loading').hide();
    };
}
var Lgs2;
(function (Lgs2) {
    /**开始游戏 */
    Lgs2.startAjax = function (callback, errorCallback, name) {
        Lgs2.showAjaxLoading('正在载入游戏');
        if (!name) {
            name = "";
        }
        $.ajax({
            type: 'POST',
            url: 'server.php',
            data: {
                'type': 'start',
                'name': name
            },
            dataType: 'json',
            cache: false,
            success: function (data) {
                Lgs2.hideAjaxLoading();
                // console.log(data);
                if (data.success) {
                    if (callback)
                        callback(data);
                }
                else {
                    if (errorCallback)
                        errorCallback(data);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                Lgs2.hideAjaxLoading();
                Lgs.LAlert(errorThrown);
            }
        });
    };
    /**游戏结束 */
    Lgs2.endAjax = function (gameInfo, callback, errorCallback) {
        $.ajax({
            type: 'POST',
            url: 'server.php',
            data: {
                'type': 'end2',
                'gameInfo': gameInfo
            },
            dataType: 'json',
            cache: false,
            success: function (data) {
                // console.log(data);
                if (data.success) {
                    if (callback)
                        callback(data);
                }
                else {
                    if (errorCallback)
                        errorCallback(data);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                // alert(errorThrown);
                Lgs.LAlert(errorThrown);
            }
        });
    };
    /**信息提交Ajax */
    Lgs2.submitInfoAjax = function (userInfo, callback, errorCallback) {
        $.ajax({
            type: 'POST',
            url: 'server.php',
            data: {
                'type': 'updateInfo',
                'userInfo': userInfo
            },
            dataType: 'json',
            cache: false,
            success: function (data) {
                // console.log(data);
                if (data.success) {
                    if (callback)
                        callback(data);
                }
                else {
                    if (errorCallback)
                        errorCallback(data);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                // alert(errorThrown);
                Lgs.LAlert(errorThrown);
            }
        });
    };
    /**获取排行榜 */
    Lgs2.getRankAjax = function (callback, errorCallback) {
        $.ajax({
            type: 'POST',
            url: 'server.php',
            data: {
                'type': 'getRank2'
            },
            dataType: 'json',
            cache: false,
            success: function (data) {
                // console.log(data);
                if (data.success) {
                    if (callback)
                        callback(data);
                }
                else {
                    if (errorCallback)
                        errorCallback(data);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                // alert(errorThrown);
                Lgs.LAlert(errorThrown);
            }
        });
    };
    /**分享后Ajax */
    Lgs2.shareAjax = function (shareType, callback, errorCallback) {
        $.ajax({
            type: 'POST',
            url: 'server.php',
            data: {
                'type': 'share'
            },
            dataType: 'json',
            cache: false,
            success: function (data) {
                // console.log(data);
                if (data.success) {
                    if (callback)
                        callback(data);
                }
                else {
                    if (errorCallback)
                        errorCallback(data);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
            }
        });
    };
    /**ajaxLoading */
    Lgs2.showAjaxLoading = function (title) {
        if ($('#ajax_loading').size() < 1) {
            $('body').append('<section class="ajax_loading" id="ajax_loading"><div class="ajax_loading_box"><p></p></div></section>');
        }
        if (title) {
            $('#ajax_loading').find('p').text(title);
        }
        $('#ajax_loading').show();
    };
    Lgs2.hideAjaxLoading = function () {
        $('#ajax_loading').hide();
    };
})(Lgs2 || (Lgs2 = {}));
//# sourceMappingURL=LAjax.js.map
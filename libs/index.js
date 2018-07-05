$(function(){
    var jw=$(window).width();
    var jh=$(window).height();
    $('html').css('font-size',jh*0.02);
    // $('body').height(jh);
    $('.jcontent').css('width',jh*0.6214);
    $('.jcontent').css('left',jw/2-$('.jcontent').width()/2);

    $('.liuzi_close').on('click',function(){
        $('.liuzi').hide();
    })
     $('.liuzi_confirm').on('click',function(){
        var ift=true;
        var mobile=$('#tel').val();
         console.log(mobile);
         var myreg =  /^1([38]\d|4[57]|5[0-35-9]|7[06-8]|8[89])\d{8}$/;
         if(!myreg.test(mobile))
         {
          ift=false;
          alertp('请填写有效手机号码');
        }
        if($('#province').val()==""||!($('#province').val())||$('#city').val()==""||!($('#city').val())){
             ift=false;
             alertp('请选择省市');
           }
        if($('#tel').val()==""||!($('#tel').val())){
             ift=false;
             alertp('请填手机号码');
           }
        if($('#name').val().replace(/\s+/g,"")==""||!($('#name').val())){
             ift=false;
             alertp('请填写姓名');
           }
    /**++++++++++++++++++++++++++++++++++++++++++++++++ */
        var prize_index2 = prize_index;
        var info = {
            "name":$('#name').val().replace(/\s+/g,""),
            "phone":$('#tel').val(),
            "center1":$('#province').val(),
            "center2":$('#city').val()
        }
        if(ift){
            Lgs.showloading('正在提交中心信息...');
            setInfoAjax(info,function(data){
                Lgs.hideloading();
                alertp(data.msg);
                $('.liuzi').hide();
                myPrizeLayer.dispatchEventWith("liziComplete");
            },function(data){
                Lgs.hideloading();
                alertp(data.msg);
                $('.liuzi').hide();
            });
        }
    /**++++++++++++++++++++++++++++++++++++++++++++++++ */
    })

    function getOpt(obj) {
        var aWheels = [{}],
            aOpt = [],
            i = 0,
            $option = $(obj).parent().find('option');

        for (i; i < $option.size(); i++) {
            aOpt[i] = $($($option).get(i)).text();
        }

        aWheels[0]['values'] = aOpt;
        aWheels[0]['keys'] = aOpt;
        aWheels[0]['label'] = '';
        return aWheels;
    }
    if($('.mobiscroll').size()){
        $('.mobiscroll').each(function() {
            if(!$(this).hasClass('disable')){

                var aWheels = getOpt($(this).closest('.input_border').find('select')),
                _this=this;
                $(this).closest('.input_border').find('select').mobiscroll({
                    theme: 'ios',
                    display: 'bottom',
                    rows: 5,
                    proset: 'select',
                    defaultValue: 5,
                    showLabel: false,
                    height: $(window).height()*0.06,
                    wheels: [aWheels],
                    group: true,
                    onSelect: function(val) {
                        $(_this).html(val);
                        $(_this).closest('.input_border').find('input').val(val);
                    }
                });
                $(_this).on('click',function(e){
                    var timer=setTimeout(function(){
                        $(_this).closest('.input_border').find('select').mobiscroll('show');
                        clearTimeout(timer);
                    },300);
                });
            }
        });
        //城市、中心联动
        $('#province_select').mobiscroll('option',{'onSelect':function(val){
            $(this).siblings('.input_txt').html(val);
            $('#city_select').val('');
            $('.city_txt').html('');
            $('.city_txt').parent().find('.input_txt').html('');
            $(this).closest('.input_border').find('input').val(val);
            $(this).closest('.input_border').find('option').each(function(){
                if($(this).text()==val){
                    $('#city_select, .city_ap').html('');
                    for(var i=0;i<cityData[$(this).val()].city.length;i++){
                        $('#city_select').append('<option value="'+i+'">'+cityData[$(this).val()].city[i]+'</option>');
                    }
                    var aWheels = getOpt($('#city_select'));
                    $('#city_select').mobiscroll('option',{'wheels':[aWheels]});
                }
            });
        }});
    }
})

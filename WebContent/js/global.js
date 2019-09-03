$( document).ready( function(){
    /*nav*/
    $( '.head .nav ul li').click( function(){
        $( '.head .nav ul li').removeClass( 'on' );
        $( this).addClass( 'on' );
    })
    $( '.tab ul li').click( function(){
        $( '.tab ul li').removeClass( 'active' );
        $( this).addClass( 'active' );
    })
    /*var hei=$(".chart-left").height();
    $(".chart-right,.chart-right1").height(hei)*/

   /* var hei=$(".chart-left1").height();
    $(".chart-right1").height(hei)*/
/*    var dateRange = new pickerDateRange('date_demo3', {

        isTodayValid : true,
        startDate : '',
        endDate : '',
        theme : 'ta',
        inputTrigger : 'input_trigger_demo3',
        defaultText : ' 至 ',
        success : function(obj) {
            //设置回调句柄
            $(".dCon_demo3").html('开始时间 : ' + obj.startDate + '<br/>结束时间 : ' + obj.endDate);
        }
    });*/
/*    var dateRange = new pickerDateRange('date_demo2', {

        isTodayValid : true,
        startDate : '',
        endDate : '',
        theme : 'ta',
        inputTrigger : 'input_trigger_demo3',
        defaultText : ' 至 ',
        success : function(obj) {
            //设置回调句柄
            $(".dCon_demo2").html('开始时间 : ' + obj.startDate + '<br/>结束时间 : ' + obj.endDate);
        }
    });*/

/*    var dateRange = new pickerDateRange('date_demo1', {

        isTodayValid : true,
        startDate : '',
        endDate : '',
        theme : 'ta',
        inputTrigger : 'input_trigger_demo3',
        defaultText : ' 至 ',
        success : function(obj) {
            //设置回调句柄
            $(".dCon_demo1").html('开始时间 : ' + obj.startDate + '<br/>结束时间 : ' + obj.endDate);
        }
    });*/

/*    var dateRange = new pickerDateRange('date_demo4', {

        isTodayValid : true,
        startDate : '',
        endDate : '',
        theme : 'ta',
        inputTrigger : 'input_trigger_demo3',
        defaultText : ' 至 ',
        success : function(obj) {
            //设置回调句柄
            $(".dCon_demo4").html('开始时间 : ' + obj.startDate + '<br/>结束时间 : ' + obj.endDate);
        }
    });*/

/*    var dateRange = new pickerDateRange('date_demo5', {

        isTodayValid : true,
        startDate : '',
        endDate : '',
        theme : 'ta',
        inputTrigger : 'input_trigger_demo3',
        defaultText : ' 至 ',
        success : function(obj) {
            //设置回调句柄
            $(".dCon_demo5").html('开始时间 : ' + obj.startDate + '<br/>结束时间 : ' + obj.endDate);
        }
    });*/



    var dateRange = new pickerDateRange('monitor_demo1', {

        isTodayValid : true,
        startDate : '',
        endDate : '',
        theme : 'ta',
        inputTrigger : 'input_trigger_demo3',
        defaultText : ' 至 ',
        success : function(obj) {
            //设置回调句柄
            $(".monitor_demo1").html('开始时间 : ' + obj.startDate + '<br/>结束时间 : ' + obj.endDate);
        }
    })



    var dateRange = new pickerDateRange('monitor_demo3', {

        isTodayValid : true,
        startDate : '',
        endDate : '',
        theme : 'ta',
        inputTrigger : 'input_trigger_demo3',
        defaultText : ' 至 ',
        success : function(obj) {
            //设置回调句柄
            $(".monitor_demo3").html('开始时间 : ' + obj.startDate + '<br/>结束时间 : ' + obj.endDate);
        }
    })

    var dateRange = new pickerDateRange('monitor_demo4', {

        isTodayValid : true,
        startDate : '',
        endDate : '',
        theme : 'ta',
        inputTrigger : 'input_trigger_demo3',
        defaultText : ' 至 ',
        success : function(obj) {
            //设置回调句柄
            $(".monitor_demo4").html('开始时间 : ' + obj.startDate + '<br/>结束时间 : ' + obj.endDate);
        }
    })

    var dateRange = new pickerDateRange('monitor_demo5', {

        isTodayValid : true,
        startDate : '',
        endDate : '',
        theme : 'ta',
        inputTrigger : 'input_trigger_demo3',
        defaultText : ' 至 ',
        success : function(obj) {
            //设置回调句柄
            $(".monitor_demo5").html('开始时间 : ' + obj.startDate + '<br/>结束时间 : ' + obj.endDate);
        }
    })

    var dateRange = new pickerDateRange('monitor_demo6', {

        isTodayValid : true,
        startDate : '',
        endDate : '',
        theme : 'ta',
        inputTrigger : 'input_trigger_demo3',
        defaultText : ' 至 ',
        success : function(obj) {
            //设置回调句柄
            $(".monitor_demo6").html('开始时间 : ' + obj.startDate + '<br/>结束时间 : ' + obj.endDate);
        }
    })
})

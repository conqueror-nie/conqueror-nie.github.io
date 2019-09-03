$(function(){
	var publicObj=new PublicObj();
	var rootUrl=publicObj.url;
	var username; //用户名
	var ticket; //唯一标识
	var defaultPage; //默认页面
	var defaultTime1; //分析汇报默认时间
	var defaultTime2; //溯源分析默认时间
	var defultChart; //默认图形
	var defaultPagesize; //默认列表数
	//给登录按钮绑定单击处理
	var $login_btn=$("#login_btn");
	var $wrong=$("#wrong");
	$login_btn.bind("click",function(e){
		var $username=$("#username");
		var $password=$("#password");
		//清空先前span的提示信息
	     $wrong.text("");
		//$("#password_msg").html("");
	  	 //获取用户名和密码
	  	 var name = $("#username").val();
	  	 var password = $("#password").val();
	  	 //数据格式检查
	  	 var ok = true;//是否通过检查
	  	 if(name==""){
	  	   ok = false;
	  	   $wrong.text("用户名为空");
	  	 }
	  	 if(password==""){
	  	   ok = false;
	  	   $wrong.text("密码为空");
	  	 }
	  	//发送Ajax请求
		var req_data = {'username':name,'passwd':password};
	  	if(ok){
	  	 $.ajax({
		   //url:rootUrl+"/homeController/login.do",
	  	   url:rootUrl+"/sys/login",
	  	   type:"post",
	  	   data:JSON.stringify(req_data),
	  	   dataType:"json",
	  	   contentType:"application/json;charset=utf-8",
	  	   success:function(result){
	  	      if(result.status==0){
	  	    	  var data=result.data;
	  	    	//获取登录者ID
	  	    	//var userId = result.data;
	  	    	//将登陆者ID放入Cookie
				//addCookie("userId",userId,2);
	  	        username = data.username;
	  	        ticket = data.ticket;
	  	        //alert("login-->ticket="+ticket);
	  	        defaultPage = data.defaultPage;
	  	        defaultTime1 = data.defaultTime1;
	  	        defaultTime2 = data.defaultTime2;
	  	        defultChart = data.defultChart;
	  	        defaultPagesize= data.defaultPagesize;
	  	        //将登陆者ID放入Cookie
				$.cookie('userId',ticket);
				$.cookie('username',username);
				$.cookie('defaultPage',defaultPage);
				$.cookie('defaultTime1',defaultTime1);
				$.cookie('defaultTime2',defaultTime2);
				$.cookie('defultChart',defultChart);
				$.cookie('defaultPagesize',defaultPagesize);
				var pageVal = 'set.html';
				var map = {
					1:"report.html",
					2:'analysis.html',
					3:'business_report.html',
					4:'monitor_platform.html'
				};
				if (map[defaultPage]) {
					pageVal = map[defaultPage];
				}
	  	        window.location.href=pageVal;//成功
	  	      }else if(result.status==1){
	  	        //用户名或密码错误
	  	        $wrong.text(result.msg);
	  	      }else{
	  	    	$wrong.text("登录有误，请再次登录");  
	  	      }
	  	   },
	  	   error:function(){
	  	     alert("登录发生异常");
	  	   }
	  	 });
	  	}
	});
    $(".login_alert,.login_in").hide();
    $(".login").click(function(){
        $(".login_alert,.login_in").show();
    })
    $(".login_alert").click(function(){
        $(".login_alert,.login_in").hide();
    });
    $(document).keyup(function(e){
    		if (e.which === 13) {
    			$login_btn.trigger('click');
    		}
    });
    function scrollLis(){
        var toTop = offs.top-$(window).scrollTop();
        if(toTop<0){
            $('.home_h').addClass('fixed');
            $( '.fixed_logo').show();
            $( '.logo').hide();

        }else{
            $('.home_h').removeClass('fixed');
            $( '.fixed_logo').hide();
            $( '.logo').show();
        }
    }
    var offs=$('.home_h').offset();
    $(window).scroll(function(){
        scrollLis();
    });
    $('.monitoring').click(function(){$('html,body').animate({scrollTop:$('#monitoring').offset().top}, 400);});
    $('.service').click(function(){$('html,body').animate({scrollTop:$('#service').offset().top}, 400);});
    $('.one_touch').click(function(){$('html,body').animate({scrollTop:$('#one_touch').offset().top}, 400);});
    $('.warning').click(function(){$('html,body').animate({scrollTop:$('#warning').offset().top}, 400);});
    $('.top').click(function(){$('html,body').animate({scrollTop:$('#top').offset().top}, 400);});
});

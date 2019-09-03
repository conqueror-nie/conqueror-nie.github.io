$(function(){
	$(".slideTxtBox").slide();
    // 用户判断
   var userId=$.cookie('userId');
    if (!userId) {
      window.location.href="home.html";
    }
    var userName = $.cookie('username') || "Admin";
    $('#userNameId').text(userName);
    var publicObj=new PublicObj();
    var rootUrl = publicObj.url;
    var req_data = "";
    /*var userId = getCookie("userId");
      if(userId==null){//没有就跳转到登录界面
         window.location.href="log_in.html";
    }*/

    // 获取数据对象
    // $("input[name='index']").attr("data_id")
    getDataObj={
      // 初始化
      init:function(){
           getDataObj.getNormalData();
           getDataObj.getReceiveData();
           getDataObj.getAccoutData();
      },
      // 获取常规设置数据
      getNormalData:function(){
    	  req_data = {"ticket":userId};
		  console.log("获取常规设置数据-->"+JSON.stringify(req_data));
          $.ajax({
             //url:rootUrl+"/setController/getNormalData.do",
			 url:rootUrl+"/sys/selectCommonConfig",
             type:"post",
             data:JSON.stringify(req_data),
             dataType:"json",
             contentType:"application/json;charset=utf-8",
             success:function(result){
              //数据处理函数
			  console.log("获取常规设置数据返回体:"+obj2string(result));
              createObj.createNormal(result);      
             },
             error:function(){
               console.log("获取常规设置数据返回有问题");
             }
         });
          /*
         var result={
              status:0,
              msg:"成功",
              data:{
                defaultPage:4,
                defaultTime1:1,
                defaultTime2:2,
                defaultChart:1,
                defaultPagesize:10
              }
         }
         createObj.createNormal(result);
         */
      },
      // 保存常规设置传值
      setNormalData:function(userId,defaultPage,defaultTime1,defaultTime2,defaultChart,defaultPagesize){
    	req_data = {"ticket":userId,defaultPage:defaultPage,defaultTime1:defaultTime1,
                defaultTime2:defaultTime2,defaultChart:defaultChart,defaultPagesize:defaultPagesize};
		console.log("保存常规设置传值-->"+JSON.stringify(req_data));
        $.ajax({
             //url:rootUrl+"/setController/setNormalData.do",
			 url:rootUrl+"/sys/saveCommonConfig",
			 type:"post",
			 data:JSON.stringify(req_data),
		  	 dataType:"json",
			 contentType:"application/json;charset=utf-8",
             success:function(result){
              //数据处理函数
			  console.log("保存常规设置传值返回体:"+obj2string(result));
            	 if(result.status==0){
            		 alert(result.msg);
            	 }else{
					 alert("保存失败");
				 }
             },
             error:function(){
               console.log("保存常规设置传值数据返回有问题");
             }
         });
      },
      // 获取接收设置数据
      getReceiveData:function(){
    	req_data = {"ticket":userId};
		console.log("获取接收设置数据-->"+JSON.stringify(req_data));
        $.ajax({
             //url:rootUrl+"/setController/getReceiveData.do",
			 url:rootUrl+"/sys/selectRcvConfig",
             type:"post",
             data:JSON.stringify(req_data),
  	  	   	 dataType:"json",
  	  	   	 contentType:"application/json;charset=utf-8",
             success:function(result){
				//数据处理函数
				console.log("获取接收设置数据返回体:"+obj2string(result));
            	createObj.createReceiver(result);      
             },
             error:function(){
               console.log("获取接收设置数据返回有问题");
             }
         });
        /**
         var result={
              status:0,
              msg:"成功",
              data:{
                isReport:0,
                rcvStatus:1,
                rcvBegin:"2017-07-08",
                rcvEnd:"2017-09-21",
                rcvWeeks:1,
                rcvTime:1,
                rcvMail:"w@qq.com"
              }
         }
         createObj.createReceiver(result);  
         **/
      },
      // 保存接收设置传值
      setReceiveData:function(userId,isReport,rcvStatus,rcvBegin,rcvEnd,rcvWeeks,rcvTime,rcvMail){
    	 req_data = {ticket:userId,isReport:isReport,rcvStatus:rcvStatus,
                 rcvBegin:rcvBegin,rcvEnd:rcvEnd,rcvWeeks:rcvWeeks,rcvTime:rcvTime,rcvMail:rcvMail};
		 console.log("保存接收设置传值-->"+JSON.stringify(req_data));
         $.ajax({
             //url:rootUrl+"/setController/setReceiveData.do",
			 url:rootUrl+"/sys/saveRcvConfig",
             type:"post",
             data:JSON.stringify(req_data),
  	  	   	 dataType:"json",
  	  	   	 contentType:"application/json;charset=utf-8",
             success:function(result){
				//数据处理函数
				console.log("保存接收设置传值返回体:"+obj2string(result));
            	 if(result.status==0){
            		 alert(result.msg);
            	 }else{
					 alert("保存失败");
				 }      
             },
             error:function(){
               console.log("保存接收设置传值数据返回有问题");
             }
         });
      },
      // 获取账户设置数据
      getAccoutData:function(){
    	  req_data = {"ticket":userId};
		  console.log("获取账户设置数据-->"+JSON.stringify(req_data));
        $.ajax({
             //url:rootUrl+"/setController/getAccoutData.do",
			 url:rootUrl+"/sys/selectUserConfig",
             type:"post",
             data:JSON.stringify(req_data),
  	  	   	 dataType:"json",
  	  	   	 contentType:"application/json;charset=utf-8",
             success:function(result){
              //数据处理函数
			  console.log("获取账户设置数据返回体:"+obj2string(result));
            	 createObj.createAccout(result);      
             },
             error:function(){
               console.log("获取账户设置数据返回有问题");
             }
         });
        /**
         var result={
              status:0,
              msg:"成功",
              data:{
                username:"11",
                companyName:"aa",
                dispayName:"whz",
                tel:1123333,
                mobile:1243
              }
         }
         createObj.createAccout(result); 
         **/ 
      },
      // 保存账户设置数据
      setAccoutData:function(userId,username,companyName,dispayName,tel,mobile){
    	 req_data = {"ticket":userId,username:username,companyName:companyName,
                 dispayName:dispayName,tel:tel,mobile:mobile};
		 console.log("保存账户设置数据-->"+JSON.stringify(req_data));
         $.ajax({
             //url:rootUrl+"/setController/setAccoutData.do",
			 url:rootUrl+"/sys/saveUserConfig",
             type:"post",
             data:JSON.stringify(req_data),
  	  	   	 dataType:"json",
  	  	   	 contentType:"application/json;charset=utf-8",
             success:function(result){
				//数据处理函数
				console.log("保存账户设置数据返回体:"+obj2string(result));
            	 if(result.status==0){
            		 alert(result.msg);
            	 }else{
					 alert("保存失败");
				 }	      
             },
             error:function(){
               console.log("保存账户设置数据返回有问题");
             }
         });
      },
      // 保存密码设置
      setPasswordData:function(userId,oldpass,newPass){
    	 req_data = {"ticket":userId,oldpass:oldpass,newPass:newPass};
		 console.log("获取全部话题-->"+JSON.stringify(req_data));
         $.ajax({
             //url:rootUrl+"/setController/setPasswordData.do",
			 url:rootUrl+"/sys/modifyPwd",
             type:"post",
             data:JSON.stringify(req_data),
  	  	   	 dataType:"json",
  	  	   	 contentType:"application/json;charset=utf-8",
             success:function(result){
              //数据处理函数
			  console.log("获取全部话题返回体:"+obj2string(result));	
              if(result.status == 1){
                  alert("输入的原密码不正确");
                  $("#oldPassword").val("");
              }else{
            	  alert(result.msg);
              }
             },
             error:function(){
               console.log("保存密码设置数据返回有问题");
             }
         });
      }
    };
    var createObj={
      // 创建常规设置
        createNormal:function(result){
            var data=result.data;
            // 默认首页
            var $defaultPage=$(".defaultPage");
            var defaultPage=data.defaultPage || 1;
            $defaultPage.find(".r_defaultPage[data_id='"+defaultPage+"']").attr("checked","checked");
            // 默认时间
            // 分析汇报
            var $defaultTime=$(".defaultTime");
            var defaultTime1=data.defaultTime1 || 1;
            $defaultTime.find(".r_defaultTime1[data_id='"+defaultTime1+"']").attr("checked","checked");
            //溯源分析
             var defaultTime2=data.defaultTime2 || 1;
            $defaultTime.find(".r_defaultTime2[data_id='"+defaultTime2+"']").attr("checked","checked");

            // 默认图表
            var $defaultChat=$(".defaultChat");
            var defaultChart=data.defaultChart || 1;
            $defaultChat.find(".r_defaultChart[data_id='"+defaultChart+"']").attr("checked","checked");

            // 默认页面
            var $defaultNum=$(".defaultNum");
            var defaultPagesize=$.trim(data.defaultPagesize || 10);
            $defaultNum.find(".r_defaultNum").removeAttr("checked");
            $defaultNum.find(".r_defaultNum[value='"+defaultPagesize+"']").prop("checked","checked");
        },
        //创建接收设置
        createReceiver:function(result){
          var data=result.data;
          //是否接收预警
          var isReport=data.isReport || 0;
          $(".acceptWarning[data_id='"+isReport+"']").attr("checked","checked");
          //是否接收状态
          var rcvStatus=data.rcvStatus || 0;
          $(".acceptStatus[data_id='"+rcvStatus+"']").attr("checked","checked");
          var before=getBeformDate();
          var rcvBegin=data.rcvBegin|| before;
          var today=getDate();
          var rcvEnd=data.rcvEnd|| today;
           // 数据类型选择时间格式
         var dateRange = new pickerDateRange('date_demo3', {
                    isTodayValid : true,
                    startDate : rcvBegin,
                    endDate : rcvEnd,
                    theme : 'ta',
                    inputTrigger : 'input_trigger_demo3',
                    defaultText : ' 至 ',
                    success : function(obj) {
                        //设置回调句柄
                        $(".dCon_demo2").html('开始时间 : ' + obj.startDate + '<br/>结束时间 : ' + obj.endDate);
                    }
            });
          // 接收时段
          var rcvWeeks=data.rcvWeeks || 1;
          $(".acceptWeek[data_id='"+rcvWeeks+"']").attr("checked","checked");
          // 接收时间
          var rcvTime=data.rcvTime;
          if (rcvTime) {
            rcvTime=rcvTime+":00";
          }else{
            var d=new Date();
            rcvTime=d.getHours()+":00";
          }
          $(".time_a").val(rcvTime);

          // 接收邮件
          var rcvMail=data.rcvMail || "qq@qq.com";
          $("#acceptMail").val(rcvMail);
        },
       //创建账户设置
        createAccout:function(result){
          var data=result.data;
          $("#username").val(data.username);
          $("#companyName").val(data.companyName);
          $("#dispayName").val(data.dispayName);
          $("#tel").val(data.tel);
          $("#mobile").val(data.mobile);
        }
    }
    getDataObj.init();
    // 常规设置保存事件
    $(document).off("click.saveGeneralSetting").on("click.saveGeneralSetting","#saveGeneralSetting",function(e){
       // 默认首页
            var defaultPage=parseInt($(".defaultPage").find(".r_defaultPage:checked").attr("data_id"));
            // 默认时间
            var $defaultTime=$(".defaultTime");
            // 分析汇报
            var defaultTime1=parseInt($defaultTime.find(".r_defaultTime1:checked").attr("data_id"));
            //溯源分析
            var defaultTime2=parseInt($defaultTime.find(".r_defaultTime2:checked").attr("data_id"));

            // 默认图表
            var $defaultChat=$(".defaultChat");
            var defaultChart=parseInt($(".defaultChat").find(".r_defaultChart:checked").attr("data_id"));
            // 默认页面
            var defaultPagesize=parseInt($(".defaultNum").find(".r_defaultNum:checked").attr("value"));
			
			$.cookie('defaultTime1',defaultTime1);
			$.cookie('defaultTime2',defaultTime2);
			//$.cookie('defultChart',defultChart);
			$.cookie('defaultPagesize',defaultPagesize);
			
        getDataObj.setNormalData(userId,defaultPage,defaultTime1,defaultTime2,defaultChart,defaultPagesize);
    });
    // 接收设置保存事件
    $(document).off("click.saveAcceptSetting").on("click.saveAcceptSetting","#saveAcceptSetting",function(e){
        // 是否接收设置
        var isReport=parseInt($(".acceptWarning:checked").attr("data_id"));
        // 接收状态
        var rcvStatus=parseInt($(".acceptStatus:checked").attr("data_id"));
        // 时间
        var val=$(".date_demo").val();
        var valCont=val.split("至");
        var rcvBegin=$.trim(valCont[0]);
        var rcvEnd=$.trim(valCont[1]);
        // 接收时段
        var rcvWeeks=parseInt($(".acceptWeek:checked").attr("data_id"));
        // 接收时间
        var time=$(".time_a").val();
        var timeCont=time.split(":");
        var rcvTime=parseInt(timeCont[0]);
        var rcvMail=$("#acceptMail").val();
		getDataObj.setReceiveData(userId,isReport,rcvStatus,rcvBegin,rcvEnd,rcvWeeks,rcvTime,rcvMail);

    });
    // 账户保存事件
    $(document).off("click.saveAccountSetting").on("click.saveAccountSetting","#saveAccountSetting",function(e){
          var username=$("#username").val();
          var companyName=$("#companyName").val();
          var dispayName=$("#dispayName").val();
          var tel=$("#tel").val();
          var mobile=$("#mobile").val();
          console.log(username+":"+companyName+":"+dispayName+":"+tel+":"+mobile);
          getDataObj.setAccoutData(userId,username,companyName,dispayName,tel,mobile);
    });
    // 修改密码保存事件
    $(document).off("click.savePassword").on("click.savePassword","#savePassword",function(e){
        var oldpass=$("#oldPassword").val();
        var newPass=$("#newPassword2").val();
        getDataObj.setPasswordData(userId,oldpass,newPass);

    });
    //密码重复输入验证
    $(document).off("change.newPassword2").on("change.newPassword2","#newPassword2",function(e){
        var $target=$(e.currentTarget);
        var val=$target.val();
        var newPassword1=$("#newPassword1").val();
        if (val!= newPassword1) {
            alert("两次输入的密码不一致，请您重新输入");
            $target.val("");
        }
    });
    // 获取前面时间
    function getBeformDate(){
       var date=new Date();
        var today=date.getDate();
        var month=date.getMonth()+1;
        if (month < 10) {
          month=0+month;
        }
        var year=date.getFullYear()-1;
        var needData=year+"-"+month+"-"+today;
        return needData;
    }
    //获取时间格式
    function getDate(){
        var date=new Date();
        var today=date.getDate();
        var month=date.getMonth()+1;
        if (month < 10) {
          month=0+month;
        }
        var year=date.getFullYear();
        var needData=year+"-"+month+"-"+today;
        return needData;
    }
	
	// 点击退出
	$(document).off("click.out").on("click.out",".out",function(e){
		window.location.href = "home.html";
	});
			
	//object对象转换为string字符串
	function obj2string(o){ 
		 var r=[]; 
		 if(typeof o=="string"){ 
		 	return "\""+o.replace(/([\'\"\\])/g,"\\$1").replace(/(\n)/g,"\\n").replace(/(\r)/g,"\\r").replace(/(\t)/g,"\\t")+"\""; 
		 } 
		 if(typeof o=="object"){ 
			 if(!o.sort){ 
				  for(var i in o){ 
				  	r.push(i+":"+obj2string(o[i])); 
				  } 
				  if(!!document.all&&!/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)){ 
				  	r.push("toString:"+o.toString.toString()); 
				  } 
				  r="{"+r.join()+"}"; 
			 }else{ 
			  for(var i=0;i<o.length;i++){ 
			  	r.push(obj2string(o[i])) 
			  } 
			  r="["+r.join()+"]"; 
			 } 
			 return r; 
		 } 
		 return o.toString(); 
	}
	
});
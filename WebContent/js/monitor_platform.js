$(function(){
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
/*	var userId = getCookie("userId");
    if(userId==null){//没有就跳转到登录界面
       window.location.href="log_in.html";
    }*/
    var publicObj=new PublicObj();
    //获取数据共有对象
    var getDataObj={
    		// 获取全部话题
    		getAllTopic:function(){
    			/**
    			// 假数据
    			var data=[
    			{"id":1,
    			"name":"aaa"
    			},
    			{"id":2,
    			"name":"bbb"
    			},
		  	{"id":3,
    			"name":"3333"
    			}];
    			createPublicObj.createTopic(data); 
    			**/
				req_data = {"ticket":userId};
				console.log("获取全部话题-->"+JSON.stringify(req_data));
    			$.ajax({
			  	   //url:rootUrl+"/reportController/getAllTopicNumber.do",
    			   url:rootUrl+"/MonitorPlat/topicList",
			  	   type:"post",
			  	   data:JSON.stringify(req_data),
			  	   dataType:"json",
			  	   contentType:"application/json;charset=utf-8",
			  	   success:function(result){
			  	      //数据处理函数
					  console.log("获取全部话题返回体:"+obj2string(result));
						var data=result.data;
						allTopicData=result.data;
						createPublicObj.createTopic(data); 	      
			  	   },
			  	   error:function(){
			  	     console.log("获取全部话题数据返回有问题");
			  	   }
		  	 	});
    		},
	    	//获取话题数据列表
		    getDataSummary:function(userId,topicId,start,end,type,pageNumber,page,key){
		       req_data = {"ticket":userId,"topicId":topicId,"start":start,"end":end,"type":type,"pageSize":pageNumber,"currentPage":page};
			   console.log("获取话题数据列表-->"+JSON.stringify(req_data));
		       $.ajax({
			  	   //url:rootUrl+"/editController/getDataSummary_topic.do",
		    	   url:rootUrl+"/MonitorPlat/newsList",
			  	   type:"post",
			  	   data:JSON.stringify(req_data),
			  	   dataType:"json",
			  	   contentType:"application/json;charset=utf-8",
			  	   success:function(result){
					   //console.log("获取话题数据列表返回体:"+obj2string(result));
			  		   createPublicObj.createDataSummary(result);
			  		   if(!key){
			  			   createPublicObj.createPage(result);
			  		   }
			  	   },
			  	   error:function(){
			  	     console.log("获取话题数据列表返回有问题");
			  	   }
			  	 });
		       /**
			  	 var result={
			  	 		status:0,
						msg:"",
						resnum:200,
						data:[{
						url:"https://www.taobao.com",
						source:"百度热搜",
						keyword:"关键词8",
						content:"(内容)指定期所在份的第天或最后天",
						forwardNum:"98",
						area:"安庆",
						cityType:"1",
						pubTime:"2017-08-13 23:10:34",
						sourceUrl:"https://www.taobao.com",
						title:"(标题)乐视会员报道8（标题）",
						id:"内容id"
						}]
			  	 	}
			  	 	createPublicObj.createDataSummary(result);
			  	 	if(!key){
			  	 		createPublicObj.createPage(result);
			  	 	}
			  	 	**/
		   	},
		   	// 删除话题接口
		   	getDelTopic:function(userId,topicId){
		   		req_data = {"ticket":userId,"topicId":topicId};
				console.log("删除话题接口-->"+JSON.stringify(req_data));
		   		$.ajax({
			  	   //url:rootUrl+"/editController/getDelTopic.do",
		   		   url:rootUrl+"/MonitorPlat/delTopic",
			  	   type:"post",
			  	   data:JSON.stringify(req_data),
			  	   dataType:"json",
			  	   contentType:"application/json;charset=utf-8",
			  	   success:function(result){
					   console.log("删除话题接口返回体:"+obj2string(result));
						
			  	   },
			  	   error:function(){
			  	     console.log("删除话题接口数据返回有问题");
			  	   }
			  	 });
		   	},
		   	// 下载接口
		   	getDownload:function(userId,topicId,codes){
				req_data = {"ticket":userId,"topicId":topicId,"codes":codes};
				console.log("下载接口-->"+JSON.stringify(req_data));
		   		$.ajax({
			  	   //url:rootUrl+"/editController/download.do",
		    	   	   url:rootUrl+"/MonitorPlat/downloadTopic",
			  	   type:"post",
				   data:JSON.stringify(req_data),
			  	   //data:{"ticket":userId,"topicId":topicId,"codes":codeId},
			  	   dataType:"json",
				   contentType:"application/json;charset=utf-8",
			  	   success:function(result){
					   console.log("下载接口返回体:"+obj2string(result));
			  	   		// window.open("/sqv1/file/123.docx");
			  	   		window.open(result.data.excelUrl);
			  	   },
			  	   error:function(){
			  	     console.log("下载信息出问题");
			  	   }
			  	});
			  	 
		   	}
    }
    // 创建函数对象
    var createPublicObj={
    	// 话题创建函数
	    createTopic:function(data){
	    	var $jsNav=$(".js_nav");
	    	$jsNav.empty();
	    	for (var i = 0; i < data.length; i++) {
	    		var it=data[i];
	    		var $topicNameItem=$('<li class="topicNameItem">');
	    		$topicNameItem.attr("topic_id",it.id);
	    		$topicNameItem.text(it.name).attr('title',it.name);
	    		if (i === 0) {
	    			$topicNameItem.addClass("on");
	    			$(".pub-tit-txt").attr("topic_id",it.id).text(it.name);
	    		}
	    		$topicNameItem.appendTo($jsNav);
	    	}
	    	// 调用创建数据函数
	    	var start=getDate();
	    	getDataObj.getDataSummary(userId,data[0].id,start,"",1,20,1);
    	},
    	// 数据摘要
    	createDataSummary:function(result){
    		var $tableBody=$(".tableBody");
    		$tableBody.empty();
    		var datas=result.data;
    		for (var i = 0; i < datas.length; i++) {
    			var data=datas[i];
	    		var id=data.id;
		    	// 转载量
				var transform=data.forwardNum;
				// 日期
				var recordDate=data.pubTime;
				// 标题
				var title=data.title;
				var content=data.content;
				var titleSrc=data.url;
				// 来源
				var source=data.source;
				// 来源路径
				var sourceSrc=data.sourceUrl;
				// 地域
				var area=data.area;
				// 关键词
				var keyWorld=data.keyword;
				
				// 操作
				var operational="转发";
				var operationSrc="javascript:void(0)";
		    	var $tableContItem=$('<tr class="tableContItem"></tr>');
		    	$tableContItem.attr("data_id",id);
		    	var $choose=$('<td class="choose"> <input type="checkbox" class="checkbox"></td>');
		    	$choose.appendTo($tableContItem);
		    	$('<td class="transfer"></td>').text(transform).appendTo($tableContItem);
		        $('<td class="data"></td>').text(recordDate).appendTo($tableContItem);
		        var $title=$('<td class="title"></td>').appendTo($tableContItem);
		        var $titleH=$('<h2></h2>').attr('title',title).appendTo($title);
		        $('<a target="view_window"></a>').attr("href",titleSrc).html(title).appendTo($titleH);
		        $('<p></p>').html(content).appendTo($title);
		        var $come=$('<td class="come"></td>').appendTo($tableContItem);
		        $('<a target="view_window" class="ope_b"></a>').attr("href",sourceSrc).text(source).appendTo($come);
		        $('<td class="region"></td>').text(area).appendTo($tableContItem);
		        $('<td class="keyword"></td>').text(keyWorld).appendTo($tableContItem);
		        var $operation=$('<td class="operation"></td>').appendTo($tableContItem);
		        $('<a class="ope_b"></a>').text(operational).attr("href",operationSrc).appendTo($operation);   
	        	$tableContItem.appendTo($tableBody);
	        }   
	    },
		//创建页码
		createPage:function(result){
			var $page=$(".page");
			var resnum=result.resnum;
			$page.find(".pageAccount").text(resnum);
			var $pageWidth=$page.find(".pageWidth");
			var $showPage=$page.find(".show_page");
			var val=parseInt($showPage.val());
			var pageNum=Math.ceil(resnum/val);
			$pageWidth.empty();
			var width=pageNum*30;
			$pageWidth.css("width",width+"px");
			for(var i=0;i<pageNum;i++){
				var len=i+1;
				var $pageItem=$('<li class="pageItem"></li>');
				$pageItem.text(len);
				$pageItem.attr("page_id",len);
				if (i === 0) {
					$pageItem.addClass("on");
				}
				$pageItem.appendTo($pageWidth);
			}
		}
    }
    // 自调用创建函数
    getDataObj.getAllTopic();
	// 话题点击切换操作函数
  	$(document).off("click.topicNameItem").on("click.topicNameItem",".topicNameItem",function (e) {
  		var $target=$(e.currentTarget);
  		var topicName=$target.text();
  		var topicId=$target.attr("topic_id");
  		var $pubTit=$(".pub-tit-txt");
  		$pubTit.text(topicName).attr("topic_id",topicId);
    	$target.addClass("on").siblings(".topicNameItem").removeClass("on");
    	var $w=$(".js_cont");
    	var typeObj=judgeTimeType($w);
    	console.log(topicId);
    	getDataObj.getDataSummary(userId,topicId,typeObj.start,typeObj.end,typeObj.type,20,1);
    });
    // 日历选择
   	var dateRange = new pickerDateRange('monitor_demo2', {
        isTodayValid : true,
        startDate : '',
        endDate : '',
        theme : 'ta',
        inputTrigger : 'input_trigger_demo3',
        defaultText : ' 至 ',
        success : function(obj) {
            //设置回调句柄
            $(".monitor_demo2").html('开始时间 : ' + obj.startDate + '<br/>结束时间 : ' + obj.endDate);
        	var topicId=getTopic().id;
        	console.log(4);
        	getDataObj.getDataSummary(userId,topicId,obj.startDate,obj.endDate,4,20,1);
        }
    });
    // 日、周、月选取
	$(document).off("click.pubDateItem").on("click.pubDateItem",".js_cont .pubDateItem",function(e){
  		var $target=$(e.currentTarget);
  		$target.addClass("pub-date-cur").siblings(".pubDateItem").removeClass("pub-date-cur");
  		var dataId=$target.attr("data_id");
  		var topicId=getTopic().id;
  		var start=getDate();
  		console.log(dataId);
  		$("#monitor_demo2").val("");
  		getDataObj.getDataSummary(userId,topicId,start,"",dataId,20,1);
	});
	// 上下页码点击
	$(document).off("click.pageSetting").on("click.pageSetting",".pageSetting",function(e){
		var $target=$(e.currentTarget);
		var $w=$target.closest(".js_cont");
		var typeObj=judgeTimeType($w);
		var $pageCont=$target.siblings(".pageCont");
		var $pageItem=$pageCont.find(".pageItem");
		var $showPage=$target.siblings(".show_page");
		var pageNum=parseInt($showPage.val());
		var len=$pageItem.length;
		var $pageWidth=$pageCont.find(".pageWidth");
		var marginleft=parseInt($pageWidth.css("margin-left"));
		var topicId= getTopic();
		for (var i = 0; i < len; i++) {
			var $item=$pageItem.eq(i);
			if ($item.hasClass("on")) {
				if ($target.hasClass("next")) {
					if (i < len-1) {
						var $upItem=$pageItem.eq(i+1);
						$upItem.addClass("on").siblings(".pageItem").removeClass("on");
						var pageId=$upItem.attr("page_id");
						getDataObj.getDataSummary(userId,topicId.id,typeObj.start,typeObj.end,typeObj.type,pageNum,pageId,"key");
						if ((i+1)%5 === 0) {
							marginleft=marginleft-150;
							$pageWidth.css("margin-left",marginleft+"px");	
						}
						return;
					}
				}else{
					if (i > 0) {
						var $upItem=$pageItem.eq(i-1);
						$upItem.addClass("on").siblings(".pageItem").removeClass("on");
						var pageId=$upItem.attr("page_id");
						getDataObj.getDataSummary(userId,topicId.id,typeObj.start,typeObj.end,typeObj.type,pageNum,pageId,"key");
						if (i%5 === 0) {
							marginleft=marginleft+150;
							$pageWidth.css("margin-left",marginleft+"px");	
						}
						return;
					}
				}
			}
		}
	});
	// 点击页面跳转
	$(document).off("click.pageItem").on("click.pageItem",".pageWidth .pageItem",function(e){
		var $target=$(e.currentTarget);
		var $w=$target.closest(".js_cont");
		var typeObj=judgeTimeType($w);
		var $showPage=$w.find(".show_page");
		var pageNum=parseInt($showPage.val());
		var topicId= getTopic();
		$target.addClass("on").siblings(".pageItem").removeClass("on");
		var pageId=parseInt($target.attr("page_id"));
		getDataObj.getDataSummary(userId,topicId.id,typeObj.start,typeObj.end,typeObj.type,pageNum,pageId,"key");
	});
	// 输入框事件监听
	$(document).off("change.goPageNum").on("change.goPageNum",".goPageNum",function(e){
		var $target=$(e.currentTarget);
		var $w=$target.closest(".js_cont");
		var len=$w.find(".pageItem").length;
		var val=parseInt($target.val());
		if (val > len || val < 1) {
			alert("您输入的值有误，请重新输入,输入范围为："+1+"~"+len);
			$target.val("");
		}
	});
	//go 页面
	$(document).off("click.goPageClick").on("click.goPageClick",".goPageClick",function(e){
		var $target=$(e.currentTarget);
		var $w=$target.closest(".js_cont");
		var typeObj=judgeTimeType($w);
		var $showPage=$w.find(".show_page");
		var pageNum=parseInt($showPage.val());
		var topicId= getTopic();
		var $goPageNum=$w.find(".goPageNum");
		var index=parseInt($goPageNum.val());
		var $pageItem=$w.find(".pageItem");
		var currentOn=1;
		for (var i = 0; i < $pageItem.length; i++) {
			var $item=$pageItem.eq(i);
			if ($item.hasClass("on")) {
				currentOn=i;
			}
		}
		var $needItem=$pageItem.eq(index-1);
		var pageId=parseInt($needItem.attr("page_id"));
		$needItem.addClass("on").siblings(".pageItem").removeClass("on");
		var $pageWidth=$w.find(".pageWidth");
		getDataObj.getDataSummary(userId,topicId.id,typeObj.start,typeObj.end,typeObj.type,pageNum,pageId,"key");
		var marginleft=-Math.floor((index-1)/5)*150;
		$pageWidth.css("margin-left",marginleft+"px");
	});
	// 页面下拉选择事件
	$(document).off("change.show_page").on("change.show_page",".show_page",function(e){
		var $target=$(e.currentTarget);
		var $w=$target.closest(".js_cont");
		var typeObj=judgeTimeType($w);
		var pageNum=parseInt($target.val());
		var topicId= getTopic();
		var $pageItem=$w.find(".pageItem");
		var $needItem=$pageItem.eq(0);
		$w.find(".goPageNum").val("");
		$needItem.addClass("on").siblings(".pageItem").removeClass("on");
		getDataObj.getDataSummary(userId,topicId.id,typeObj.start,typeObj.end,typeObj.type,pageNum,1);
		var $pageWidth=$w.find(".pageWidth");
		$pageWidth.css("margin-left",0);
	});
	// 删除当前函数
	$(document).off("click.deleteTopic").on("click.deleteTopic",".deleteTopic",function(e){
		var $target=$(e.currentTarget);
		var topicId=getTopic().id;
		 $( '.delete_alert').hide();
		if ($(".topicNameItem").length === 1) {
			alert("最后一个话题，不能删");
			return;
		}
		var $currentTopic=$(".topicNameItem[topic_id='"+topicId+"']");
		$currentTopic.remove();
		var $selectTopic=$(".topicNameItem").eq(0);
		$selectTopic.addClass("on");
		var topicNewId=$selectTopic.attr("topic_id");
		$(".pub-tit-txt").attr("topic_id",topicNewId).text($selectTopic.text());
		var $w=$(".js_cont");
		var typeObj=judgeTimeType($w);
		 $( '.delete_alert').hide();
		getDataObj.getDelTopic(userId,topicId);

		getDataObj.getDataSummary(userId,topicNewId,typeObj.start,typeObj.end,typeObj.type,20,1);
	});
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
	//判断时间格式
	function judgeTimeType($w){
      	var timeType=1;
      	var $dateDemo=$w.find(".date_demo");
      	var $pubDateItem=$w.find(".pubDateItem");
      	var start=getDate();
      	var end="";
  		if ($dateDemo && $dateDemo.val() != "") {
  			var val=$dateDemo.val();
  			var valCont=val.split("至");
  			start=$.trim(valCont[0]);
  			end=$.trim(valCont[1]);
  			timeType=4;
  		}else{
  			for (var i = 0; i < $pubDateItem.length; i++) {
  				var $item=$pubDateItem.eq(i);
  				if ($item.hasClass("pub-date-cur")) {
  					timeType=parseInt($item.attr("data_id"));
  				}
  			}
  		}
  		var typeObj={type:timeType,start:start,end:end};
  		return typeObj;
    }
    // 获取当前选中的主题
    function getTopic(){
    	var $showTopic=$(".pub-tit-txt");
	  	var topicId=$showTopic.attr("topic_id");
	  	var topicText=$showTopic.text();
	  	var currentTopic={id:topicId,text:topicText};
	  	return currentTopic;
    }

    // 编辑页面跳转带上主体编号
   	$(document).off("click.platformEdit").on("click.platformEdit",".platformEdit",function(e){
   		var $target  = $(e.currentTarget);
   		var $title = $(".pub-tit-txt");
   		var topicId = $title.attr("topic_id");
   		$target.attr("href","edit.html?topicId="+topicId);

   	});

	//下载信息
	$(document).off("click.monitorDownload").on("click.monitorDownload",".monitorDownload",function(e){
		var $monitorDownload = $(e.currentTarget);
		var $tableContItem = $(".tableContItem");
		var topicId = parseInt($(".pub-tit-txt").attr("topic_id"));
		var codes = [];
		for (var i = 0; i < $tableContItem.length; i++) {
			var $mt = $tableContItem.eq(i);
			var dataId = $mt.attr("data_id");
			var $choose = $mt.find(".choose");
			var $checkbox = $choose.find(".checkbox");
			if ($checkbox.prop("checked")) {
				codes.push(dataId);
			}
		}
		if (!(codes.length)) {
			alert('请选择下载选项，再进行下载');
			return;
		}
		getDataObj.getDownload(userId,topicId,codes);

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
	
	// 点击退出
	$(document).off("click.out").on("click.out",".out",function(e){
		window.location.href = "home.html";
	});
	
   	// 话题删除弹框出现
    $( '.pub-right .delete').click( function(){
        $( '.delete_alert').show();
    })
    // 话题弹框取消按钮
    $( '.de_operate .cancel_b').click( function(){
        $( '.delete_alert').hide();
    })

});

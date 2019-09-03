$(function(){
	   jQuery(".slideTxtBox").slide();
        /*话题切换*/
        $( '.b_title .topic').click( function(){
            $( '.kong,.switch').slideToggle(10);
            $( ".b_title .topic" ).addClass( 'topic_bj' );
        });
        $( '.kong').click( function(){
            $( this).hide();
            $(".edit_sele,.switch").hide();
            $( ".b_title .topic" ).removeClass( 'topic_bj' );
            $( ".total_tit .total_edit" ).removeClass( 'edit_bj' );
        });
        $( '.edit_opa .cancel').click( function(){
            $( '.kong').hide();
            $(".edit_sele,.switch").hide();
            $( ".b_title .topic" ).removeClass( 'topic_bj' );
            $( ".total_tit .total_edit" ).removeClass( 'edit_bj' );
        })

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
    // 获取默认设置
    var defaultTime=parseInt($.cookie('defaultTime1')); //已处理
    // 默认图：折现/柱状
    var defaultChart=$.cookie('defaultChart');
    // 默认页面个数
    var defaultPagesize=$.cookie('defaultPagesize');//已处理

    // 默认日周月选中
    var $w=$(".w");
    for (var i = 0; i < $w.length; i++) {
    	var $item=$w.eq(i);
    	var $pubDateItem=$item.find(".pubDateItem");
    	if ($pubDateItem && $pubDateItem.length) {
    		for (var j = 0; j < $pubDateItem.length; j++) {
    			var $dataItem=$pubDateItem.eq(j);
    			var dataId=parseInt($dataItem.attr("data_id"));
    			if (dataId === defaultTime) {
    				$dataItem.addClass("pub-date-cur").siblings(".pubDateItem").removeClass("pub-date-cur");
    			}
    		}
    	}
    }
    //默认下拉页数数据赋值
    $(".show_page").val(defaultPagesize);
    function interfaceFn(userId,topicId,start,end,type,interfaceType,cityType){
    	// 调用话题数量
    	getDataObj.getOpticNum(userId,topicId);
		var start=getDate();
		//发布总量请求折线图
		var $typeNum=$(".typeNum");
		var typeObj=judgeTimeType($typeNum);
		getDataObj.getTotalNum(userId,[topicId],typeObj.start,typeObj.end,typeObj.type,1);
		// 媒体发布排行
		var $typeMedia=$(".typeMedia");
		var typeObj=judgeTimeType($typeMedia);
		getDataObj.getMediaNum(userId,topicId,typeObj.start,typeObj.end,typeObj.type);
		//媒体类型发布量统计
		getDataObj.getchartData(userId,topicId,typeObj.start,typeObj.end,typeObj.type,3);
		//百度媒体类型统计
		getDataObj.getchartData(userId,topicId,typeObj.start,typeObj.end,typeObj.type,4);
		
		//全国区域热度统计
		var $typeArea=$(".typeArea");
		var typeObj=judgeTimeType($typeArea);
		getDataObj.getchartData(userId,topicId,typeObj.start,typeObj.end,typeObj.type,5);
		getDataObj.getAreaMapData(userId,topicId,typeObj.start,typeObj.end,typeObj.type);
		//城市级别统计
		getDataObj.getchartData(userId,topicId,typeObj.start,typeObj.end,typeObj.type,6);
		// 城市级别细分
		getDataObj.getCitySub(userId,topicId,typeObj.start,typeObj.end,typeObj.type,cityType);
		//情感类型中的媒体类型发布量统计
		var $typeEmotion=$(".typeEmotion");
		var typeObj=judgeTimeType($typeEmotion);
		getDataObj.getEmotionchartData(userId,topicId,typeObj.start,typeObj.end,typeObj.type,8);
		//情感类型折线图
		getDataObj.getTotalNum(userId,[topicId],typeObj.start,typeObj.end,typeObj.type,2);
		// 数据摘要
		var $typeData=$(".typeData");
		var typeObj=judgeTimeType($typeData);
		var pageNum=10;
		if ($(".show_page") && $(".show_page").length) {
			var pageNum=parseInt($(".show_page").val());
		}
		var currentOn=1;
		var $pageItem=$(".pageItem");
		if ($pageItem && $pageItem.length) {
			for (var i = 0; i < $pageItem.length; i++) {
				var $item=$pageItem.eq(i);
				if ($item.hasClass("on")) {
					currentOn=parseInt($item.attr("page_id"));
				}
			}
		}
		
		getDataObj.getDataSummary(userId,topicId,typeObj.start,typeObj.end,typeObj.type,pageNum,currentOn,1,[1],"");
    }
    //定义全局变量
    var allTopicData="";
    //获取数据共有对象
    var getDataObj={
    		// 获取全部话题
    		getAllTopic:function(key){
    			/*
    			// 假数据
    			var data=[
    			{"id":1001,
    			"name":"话题1"
    			},
    			{"id":1002,
    			"name":"话题2"
    			}
    			];
    			if (key === "true"){
    				createPublicObj.createTopicNumAll(data);
    			}else{

    				createPublicObj.createTopic(data); 
    			}
    			allTopicData=data;
    			*/
				req_data = {"ticket":userId};
				//console.log("getAllTopic-->ticket="+userId);
				console.log("获取全部话题-->"+JSON.stringify(req_data));
    			$.ajax({
			  	   //url:rootUrl+"/reportController/getAllTopicNumber.do",
				   url:rootUrl+"/MonitorPlat/topicList",
			  	   type:"post",
			  	   //data:{"ticket":userId},
			  	   //dataType:"json",
				   data:JSON.stringify(req_data),
			  	   dataType:"json",
			  	   contentType:"application/json;charset=utf-8",
			  	   async: true,
			  	   success:function(result){
			  	      //数据处理函数
					  console.log("获取全部话题返回体:"+obj2string(result));
						var data=result.data;
						if (key === "true"){
		    				createPublicObj.createTopicNumAll(data);
		    			}else{
		    				createPublicObj.createTopic(data); 
		    			}
						allTopicData=data; 
			  	   },
			  	   error:function(){
			  	     console.log("获取全部话题数据返回有问题");
			  	   }
		  	 	});
    		},
    		// 获取话题数量
    		getOpticNum:function(userId,topicId){
    			/*
    			if (topicId === 1) {
    				var data={"dayNum":122,"weekNum":222,"monthNum":444};
    			}else if (topicId === 2) {
    				var data={"dayNum":222,"weekNum":322,"monthNum":544};
    			}else if (topicId === 3) {
    				var data={"dayNum":422,"weekNum":722,"monthNum":944};
    			}
    			createPublicObj.createTopicNum(data);
    			*/
				req_data = {"ticket":userId,"topicId":topicId};
				//console.log("getOpticNum-->ticket="+userId);
				console.log("获取话题数量-->"+JSON.stringify(req_data));
    			$.ajax({
			  	   //url:rootUrl+"/reportController/getTopicNumber.do",
				   url:rootUrl+"/analysis/topicCount",
			  	   type:"post",
				   data:JSON.stringify(req_data),
				   dataType:"json",
				   contentType:"application/json;charset=utf-8",
			  	   //data:{"ticket":userId,"topicId":topicId},
			  	   //dataType:"json",
			  	   success:function(result){
			  	      //数据处理函数
					  console.log("获取话题数量返回体:"+obj2string(result));
						var data=result.data;
						createPublicObj.createTopicNum(data); 	      
			  	   },
			  	   error:function(){
			  	     console.log("获取话题数量数据返回有问题");
			  	   }
		  	 	});
    		},
    		// 获取发布量数据
    		getTotalNum:function(userId,topicIds,start,end,type,interfaceType){
				req_data = {"ticket":userId,"topicIds":topicIds,"start":start,"end":end,"type":type,"interfaceType":interfaceType};
				//console.log("getTotalNum-->ticket="+userId+",topicIds="+topicIds+",start="+start+",end="+end+",type="+type+",interfaceType="+interfaceType);
				console.log("获取发布量数据-->"+JSON.stringify(req_data));
    			$.ajax({
			  	   //url:rootUrl+"/reportController/getTotalNum.do",
				   url:rootUrl+"/analysis/topicsSentiAnalysis",
			  	   type:"post",
			  	   //data:{"ticket":userId,"topicIds":topicIds,"start":start,"end":end,"type":type,"interfaceType":interfaceType},
				   data:JSON.stringify(req_data),
				   dataType:"json",
				   contentType:"application/json;charset=utf-8",
			  	   success:function(result){
			  	      //数据处理函数
						//var data=result.data;
						//createPublicObj.createTopic(data); 
						console.log("获取发布量数据返回体:"+obj2string(result));
						if (interfaceType === 1) {
					  	 	createPublicObj.createTotalCompare(result);
					  	}else if(interfaceType === 2){
					  	 	//情感类型
					  	 	createPublicObj.createEmotionData(result);
					  	}
			  	   },
			  	   error:function(){
			  	     console.log("发布总量获取失败");
			  	   }
		  	 	});
    			/*
		  	 	var result={
						status:1,//(0:成功； 1失败)
						msg:"成功",
						data:{
							legend:["aaa"],
							gaps:"",
							xAxis:["1","2","3","4"],
							chartData:[
								{
									charId:1,
									charName:"aaa",
									resnum:4340,
									data:[120, 132, 101, 134, 90, 230, 210]
								},
								{
									charId:2,
									charName:"bbb",
									resnum:3340,
									data:[220, 232, 201, 234, 90, 230, 210]
								},
								{
									charId:3,
									charName:"3333",
									resnum:21340,
									data:[320, 132, 301, 334, 90, 230, 210]
								}
								
							] 
						}
		  	 	}
    		
		  	 	if (interfaceType === 1) {
		  	 	createPublicObj.createTotalCompare(result);
		  	 	}else if(interfaceType === 2){
		  	 		//情感类型
		  	 		createPublicObj.createEmotionData(result);
		  	 	
		  	 	}*/
    		},
    		// 获取媒体发布排行
    		getMediaNum:function(userId,topicId,start,end,type){
				req_data = {"ticket":userId,"topicId":topicId,"start":start,"end":end,"type":type};
				//console.log("getMediaNum-->ticket="+userId+",topicId="+topicId+",start="+start+",end="+end);
				console.log("获取媒体发布排行-->"+JSON.stringify(req_data));
    			$.ajax({
			  	   //url:rootUrl+"/reportController/getMediaNum.do",
				   url:rootUrl+"/analysis/mediaReleaseRanking",
			  	   type:"post",
			  	   //data:{"ticket":userId,"topicId":topicId,"start":start,"end":end,"type":type},
				   data:JSON.stringify(req_data),
				   contentType:"application/json;charset=utf-8",
			  	   dataType:"json",
			  	   success:function(result){
			  	      //数据处理函数
					  console.log("获取媒体发布排行返回体:"+obj2string(result));
						//var data=result.data;
						createPublicObj.createMediaRank(result); 	      
			  	   },
			  	   error:function(){
			  	     console.log("获取媒体发布排行数据有误");
			  	   }
		  	 	});
    			/*
		  	 	var result={
		  	 		status:1,
					msg:"成功",
					data:{
						siteTop:[
							{
								siteId:1,
								siteName:"新浪",
								resnum:312
							},
							{
								siteId:2,
								siteName:"网易",
								resnum:21
							}
						
						] 
					}
				}
				createPublicObj.createMediaRank(result);
				*/
			},
			// 简单图表数据获取
			getchartData:function(userId,topicId,start,end,type,interfaceType) {
				req_data = {"ticket":userId,"topicId":topicId,"start":start,"end":end,"type":type,"interfaceType":interfaceType};
				//console.log("getchartData-->ticket="+userId);
				console.log("简单图表数据获取-->"+JSON.stringify(req_data));
				$.ajax({
			  	   //url:rootUrl+"/reportController/getchartData.do",
				   url:rootUrl+"/analysis/simpleChart",
			  	   type:"post",
			  	   //data:{"ticket":userId,"topicId":topicId,"start":start,"end":end,"type":type,"interfaceType":interfaceType},
				   data:JSON.stringify(req_data),
				   contentType:"application/json;charset=utf-8",
			  	   dataType:"json",
			  	   success:function(result){
			  	      //数据处理函数
					  console.log("简单图表数据获取返回体:"+obj2string(result));
						//var data=result.data;
						//createPublicObj.createTopic(data); 	
						if (interfaceType === 3) {
				  	 		// 媒体类型
				  	 		createPublicObj.createMediaType(result);
				  	 	}else if(interfaceType === 4){
				  	 		//百度媒体类型统计
							createPublicObj.createBaiduData(result);
				  	 	}else if(interfaceType === 5){
				  	 		//全国区域热度统计
							//createPublicObj.createAreaData(result);
							// 地域类型饼状图
							createPublicObj.createArePieData(result);
				  	 	}else if(interfaceType === 6){
				  	 		//城市级别统计
				  	 		createPublicObj.createCityData(result);
				  	 	}else if(interfaceType === 8){
				  	 		//情感类型饼状图
				  	 		createPublicObj.cerateEmotionPieData(result);
				  	 	}
			  	   },
			  	   error:function(){
			  	     console.log("简单图表数据获取有误");
			  	   }
		  	 	});
				/*
		  	 	var result={
		  	 		status:1,
					msg:"成功",
					data:{
						data:[
							{
								id:1,
								name:"新闻",
								value:3455
							},{
								id:2,
								name:"论坛",
								value:368
							}
						]
					}
		  	 	}
		  	 	
		  	 	if (interfaceType === 3) {
		  	 		// 媒体类型
		  	 		createPublicObj.createMediaType(result);
		  	 	}else if(interfaceType === 4){
		  	 		//百度媒体类型统计
					createPublicObj.createBaiduData(result);
		  	 	}else if(interfaceType === 5){
		  	 		//全国区域热度统计
					//createPublicObj.createAreaData(result);
					// 饼状图
					createPublicObj.createArePieData(result);
		  	 	}else if(interfaceType === 6){
		  	 		//城市级别统计
		  	 		createPublicObj.createCityData(result);
		  	 	}
		  	 	*/
			},
			// 情感类型的媒体类型
			getEmotionchartData:function(userId,topicId,start,end,type,interfaceType){
				req_data = {"ticket":userId,"topicId":topicId,"start":start,"end":end,"type":type,"interfaceType":interfaceType};
				//console.log("getEmotionchartData-->ticket="+userId+",topicIds="+topicIds+",start="+start+",end="+end+",type="+type+",interfaceType="+interfaceType);
				console.log("情感类型的媒体类型-->"+JSON.stringify(req_data));
				$.ajax({
			  	   //url:rootUrl+"/reportController/getchartData.do",
				   url:rootUrl+"/analysis/simpleChart",
			  	   type:"post",
			  	   //data:{"ticket":userId,"topicIds":topicIds,"start":start,"end":end,"type":type,"interfaceType":interfaceType},
				   data:JSON.stringify(req_data),
				   contentType:"application/json;charset=utf-8",
			  	   dataType:"json",
			  	   success:function(result){
			  	      //数据处理函数
					  console.log("情感类型的媒体类型返回体:"+obj2string(result));
						//var data=result.data;
						//createPublicObj.createEmotionMediaType(result); 
						createPublicObj.cerateEmotionPieData(result);
			  	   },
			  	   error:function(){
			  	     console.log("情感类型的媒体类型数据有误");
			  	   }
		  	 	});
				/*
		  	 	 	var result={
		  	 		status:1,
					msg:"成功",
					data:{
						data:[
							{
								id:1,
								name:"新闻",
								value:3455
							},{
								id:2,
								name:"论坛",
								value:368
							}
						]
					}
		  	 	}
		  	 	
				// 媒体类型
		  	 		createPublicObj.createEmotionMediaType(result);
		  	 		*/
			},
			//全国区域热度统计
			getAreaMapData:function(userId,topicId,start,end,type){
				req_data = {"ticket":userId,"topicId":topicId,"start":start,"end":end,"type":type};
				console.log("全国区域热度统计-->"+JSON.stringify(req_data));				
				$.ajax({
			  	   //url:rootUrl+"/reportController/getCitySub.do",
				   url:rootUrl+"/track/trackHot",
			  	   type:"post",
			  	   //data:{"ticket":userId,"topicId":topicId,"start":start,"end":end,"type":type,"cityType":cityType},
				   data:JSON.stringify(req_data),
				   contentType:"application/json;charset=utf-8",
			  	   dataType:"json",
			  	   success:function(result){
			  	      //数据处理函数
					  console.log("全国区域热度统计返回体:"+obj2string(result));
						//var data=result.data;
						createPublicObj.createAreaMapData(result); 	      
			  	   },
			  	   error:function(){
			  	     console.log("全国区域热度统计数据有误");
			  	   }
		  	 	});
				/*
				var result = {
		  	 			status:1,
						msg:"成功",
						data:{
							11 : 1000,
							12 : 1551,
							13 : 435435,
							14 : 5451,
							15 : 515,
							21 : 4454,
							22 : 381,
							23 : 381,
							31 : 857,
							32 : 7443,
							33 : 854,
							34 : 584,
							35 : 34336,
							36 : 56343,
							37 : 65,
							41 : 48123,
							42 : 5434,
							43 : 413,
							44 : 5343,
							45 : 4354,
							46 : 45415,
							50 : 54348,
							51 : 53431,
							52 : 643,
							53 : 5486,
							54 : 41,
							61 : 44131,
							62 : 5445,
							63 : 53431,
							64 : 4112,
							65 : 6431,
							71 : 1351,
							81 : 415,
							82 : 454
						}
				}
				createPublicObj.createAreaMapData(result); 	
				*/				
			},
			//城市级别细分
			getCitySub:function(userId,topicId,start,end,type,cityType){
				req_data = {"ticket":userId,"topicId":topicId,"start":start,"end":end,"type":type,"cityType":cityType};
				//console.log("getCitySub-->ticket="+userId+",topicId="+topicId+",start="+start+",end="+end+",type="+type+",cityType="+cityType);
				console.log("城市级别细分-->"+JSON.stringify(req_data));
				$.ajax({
			  	   //url:rootUrl+"/reportController/getCitySub.do",
				   url:rootUrl+"/analysis/cityLevelAnalysis",
			  	   type:"post",
			  	   //data:{"ticket":userId,"topicId":topicId,"start":start,"end":end,"type":type,"cityType":cityType},
				   data:JSON.stringify(req_data),
				   contentType:"application/json;charset=utf-8",
			  	   dataType:"json",
			  	   success:function(result){
			  	      //数据处理函数
					  console.log("城市级别细分返回体:"+obj2string(result));
						//var data=result.data;
						createPublicObj.createCitySub(result); 	      
			  	   },
			  	   error:function(){
			  	     console.log("城市级别细分数据有误");
			  	   }
		  	 	});
				/*
		  	 	var result={
		  	 			status:1,
						msg:"成功",
						data:{
							"start":"2017-07-01",
							"end":"2017-07-01",
							data:[
								{
									id:1,
									name:"北京",
									value:1
								},
								{
									id:2,
									name:"广州",
									value:34
								}
							]
						}
			  	 	}
			  	 	createPublicObj.createCitySub(result);
			  	 	*/
			},
			// 获取数据摘要接口
			getDataSummary:function(userId,topicId,start,end,type,pageSize,currentPage,interfaceType,ids,key){
				req_data = {"ticket":userId,"topicId":topicId,"start":start,"end":end,"type":type,"pageSize":pageSize,"currentPage":currentPage};
				//console.log("getDataSummary-->ticket="+userId+",topicId="+topicId+",start="+start+",end="+end+",type="+type+",pageSize="+pageSize+",currentPage="+currentPage+",interfaceType="+interfaceType+",ids="+ids);
				console.log("获取数据摘要接口-->"+JSON.stringify(req_data));
				$.ajax({
			  	   //url:rootUrl+"/reportController/getDataSummary.do",
				   url:rootUrl+"/analysis/analysisSummary",
			  	   type:"post",
			  	   //data:{"ticket":userId,"topicId":topicId,"start":start,"end":end,"type":type,"pageSize":pageSize,"currentPage":currentPage,"interfaceType":interfaceType,"ids":ids},
				   data:JSON.stringify(req_data),
				   contentType:"application/json;charset=utf-8",
			  	   dataType:"json",
			  	   success:function(result){
			  	      //数据处理函数
					  console.log("获取数据摘要接口返回体:"+obj2string(result));
						//var data=result.data; 	      
			  		   createPublicObj.createDataSummary(result);
				  	 	if(!key){
				  	 		createPublicObj.createPage(result);
				  	 	}
			  	   },
			  	   error:function(){
			  	     console.log("获取数据摘要接口有误");
			  	   }
		  	 	});
				/*
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
			  	 	*/
			}
		}
    //创建共有对象
    var createPublicObj={
    	// 创建话题函数
    	createTopic:function(data){
    		var $switchRadio=$(".switch_radio");
    		for (var i = 0; i < data.length; i++) {
    			var dt=data[i];
    			var $label=$('<label class="topicItem"></label>');
    			var $input=$('<input type="radio" name="c_radio">')
    			$input.attr("value",dt.name).attr("topic_id",dt.id).appendTo($label);
    			$('<span class="topicChat"></span>').text(dt.name).appendTo($label);
    			$label.attr("topic_id",dt.id).appendTo($switchRadio);
    			if (i === 0) {
    				$input.attr("checked","true");
    				$(".showTopic").attr("topic_id",dt.id).text(dt.name);
    				// 调用接口
    				var cityId=judgeCity();
    				interfaceFn(userId,parseInt(dt.id),"","","","",cityId);
    			}
    		}
    	},
    	// 创建话题总量
    	createTopicNum:function(data){
    		var $topicday=$(".topicday");
    		var $topicWeek=$(".topicWeek");
    		var $topicMonth=$(".topicMonth");
    		$topicday.find("h2").text(data.dayNum);
    		$topicWeek.find("h2").text(data.weekNum);
    		$topicMonth.find("h2").text(data.monthNum);
    	},
    	// 创建发布量对比折线图以及对应面板
    	createTotalCompare:function(result){
    		var chartData=result.data.chartData;
    		var topicId=parseInt($(".showTopic").attr("topic_id"));
    		var $totalNum=$(".totalNum");
    		var $typeNum=$(".typeNum");
    		var $pubTitTxt=$typeNum.find(".pub-tit-txt");
    		$('.totalNumChart').empty();
    		$totalNum.empty();
    		$('.totalNumChart').removeAttr('_echarts_instance_ style');
    		var series=[];
    		for (var i = 0; i < chartData.length; i++) {
    			var dt=chartData[i];
				var needI = i+1;
    			var resnum=dt.resnum;
    			var charName=dt.charName;
    			var charId=dt.charId;
    			var $totalItem=$('<div class="totalItem"></div>');
    			$totalItem.attr("topic_id",charId);
    			$('<span class="num"></span></div>').addClass("ti_0"+needI).text(resnum).appendTo($totalItem);
    			$('<span class="totalItemName"></span>').text(charName).appendTo($totalItem);
				
    			$totalItem.appendTo($totalNum);
    			if (charId === topicId) {
    				$pubTitTxt.text(charName+":"+resnum).attr("topic_id",charId);
    			}
				if(i == 0){
					series.push({"name":charName,type:"line","data":dt.data,color:['#57b4ec']});
				}else if(i == 1){
					series.push({"name":charName,type:"line","data":dt.data,color:['#50c1b9']});
				}else if(i == 2){
					series.push({"name":charName,type:"line","data":dt.data,color:['#c08de3']});
				}else if(i == 3){
					series.push({"name":charName,type:"line","data":dt.data,color:['#8495ef']});
				}else if(i == 4){
					series.push({"name":charName,type:"line","data":dt.data,color:['#e496e5']});
				}else if(i == 5){
					series.push({"name":charName,type:"line","data":dt.data,color:['#ef84a7']});
				}else if(i == 6){
					series.push({"name":charName,type:"line","data":dt.data,color:['#ed86e9']});
				}else if(i == 7){
					series.push({"name":charName,type:"line","data":dt.data,color:['#ef9d84']});
				}else if(i == 8){
					series.push({"name":charName,type:"line","data":dt.data,color:['#50c170']});
				}else{
					series.push({"name":charName,type:"line","data":dt.data,color:['#f58172']});
				}
    		}
    		option = {	
				    title: {
				        text: '发布量趋势'
				    },
				    tooltip: {
				        trigger: 'axis'
				    },
				    // 头部信息展示
				    legend: {
				        data:result.legend
				    },
				    grid: {
				        left: '3%',
				        right: '10%',
				        bottom: '3%',
				        containLabel: true
				    },
				    // 下载按钮
				    toolbox: {
				        feature: {
				           
				            // 类型切换
				             magicType:{
					        	show:true,
					        	type:["line","bar"]
					        },
					         saveAsImage: {

				            }

				        },

				    },
				    xAxis: {
				        type: 'category',
				        boundaryGap: false,
				        data: result.data.xAxis,
						name:"日期",
				    },
				    yAxis: {
				    	show:true,
				    	name:"总量",
				        type: 'value',
				    },
				    //stack 数据堆叠，同个类目轴上系列配置相同的stack值后，后一个系列的值会在前一个系列的值上相加
				    series:series
			};
			var myChart = echarts.init($('.totalNumChart')[0]);
			myChart.setOption(option);
    	},
    	//创建发布量对比全部话题
    	createTopicNumAll:function(data){
    		var $editSeleCont=$(".editSeleCont");
    		var $totalNum = $('.totalNum');
    		var $totalItem = $totalNum.find('.totalItem');
    		var $showTopic=$(".showTopic");
    		var text=$showTopic.text();
    		var topicId=parseInt($showTopic.attr("topic_id"));
    		var mapId = [];
    		for (var i = 0; i < $totalItem.length; i++) {
    			var $it = $totalItem.eq(i);
    			var itId = $it.attr('topic_id');
    			if (itId != topicId) {
    				mapId.push(parseInt(itId));
    			}
    		}
    		$editSeleCont.empty();
    	
    		
    		$('<h2></h2>').text(text).appendTo($editSeleCont);
    		var $radioCh=$('<div class="radio_ch"></div>');
    		$radioCh.appendTo($editSeleCont);
    		for (var i = 0; i < data.length; i++) {
    			var rt=data[i];
    			if (rt.id === topicId) {
    				continue;
    			}

    			var $editSeleItem=$('<p class="editSeleItem"></p>');
    			var $editSeleInput=$('<input class="editSeleInput" type="checkbox" name="send">');
    			$editSeleInput.val(rt.name);
    			$editSeleInput.appendTo($editSeleItem);
    			$('<label class="editSeleItemName"></label>').text(rt.name).appendTo($editSeleItem);
    			if ($.inArray(rt.id,mapId) >= 0) {
    				$editSeleInput.attr('checked','checked');
    			}
    			$editSeleItem.attr("topic_id",rt.id).appendTo($radioCh);
    		}
    	},
    	// 创建媒体发布排行
    	createMediaRank:function(result){
    		var array=[];
    		var $mediaItemWrap=$(".mediaItemWrap");
    		$mediaItemWrap.empty();
    		var data=result.data.siteTop;
    		for (var i = 0; i < data.length; i++) {
    			var it=data[i];
    			var resnum=it.resnum;
    			array.push(resnum);
    		}
    		var arr=array.sort(function sortNumber(a,b){
				return b - a;
			});
			var arr = data.sort(function (ob1,ob2) {
				if (ob2.resnum >= ob1.resnum) {
					return 1;
				}
				// body...
			});
			for (var i = 0; i < arr.length; i++) {
				var it = arr[i];
				var needI = i+1;
				var $mediaItem=$('<dl class="mediaItem"></dl>');
				$mediaItem.attr("media_id",it.siteId);
				var $bgItem=$('<dt class="bgItem"></dt>');
				if (needI < 10) {
					$bgItem.addClass("bg_0"+needI).text("0"+needI);
				}else{
					$bgItem.addClass("bg_"+needI).text(needI);
				}
				$bgItem.appendTo($mediaItem);
				var $mediaItemCont=$('<dd class="mediaItemCont"></dd>');
				$('<h2 class="mediaItemName"></h2>').text(it.siteName).appendTo($mediaItemCont);
				$('<p class="mediaItemNum"></p>').text(it.resnum).appendTo($mediaItemCont);
				$mediaItemCont.appendTo($mediaItem);
				$mediaItem.appendTo($mediaItemWrap);
			}
    		/*for (var i = 0; i < arr.length; i++) {
    			var dt=arr[i];
    			var needI=i+1;
    			for(var j=0;j<data.length;j++){
    				var ar=data[j];
    				if (dt === ar.resnum) {	
    					var $mediaItem=$('<dl class="mediaItem">');
    					$mediaItem.attr("media_id",ar.siteId);
    					var $bgItem=$('<dt class="bgItem">');
    					if (needI < 10) {
    						$bgItem.addClass("bg_0"+needI).text("0"+needI);
    					}else{
    						$bgItem.addClass("bg_"+needI).text(needI);
    					}
    					$bgItem.appendTo($mediaItem);
    					var $mediaItemCont=$('<dd class="mediaItemCont">');
    					$('<h2 class="mediaItemName">').text(ar.siteName).appendTo($mediaItemCont);
    					$('<p class="mediaItemNum">').text(ar.resnum).appendTo($mediaItemCont);
    					$mediaItemCont.appendTo($mediaItem);
    					$mediaItem.appendTo($mediaItemWrap);
    				}
    			}
    		}*/
    	},
    	//媒体类型发布量统计
    	createMediaType:function(result) {
    		var chartData=result.data.data;
    		var title=[];
    		var data=[];
    		var series=[];
    		for (var i = chartData.length - 1; i >= 0; i--) {
    			var cd=chartData[i];
    			title.push(cd.name);
    			data.push(cd.value);
    		}
			/*
    		 var itemStyle = {
	                normal: {
	                      color: new echarts.graphic.LinearGradient(
		                        0, 0, 0, 1,
		                        [
		                            {offset: 1, color: '#58b4ed'}
		                        ]
		                    )
	                }
	            }
				*/

    		series.push({"name":"媒体类型发布量","type":"bar","data":data,
			"itemStyle":{
                normal: {
                    color: function(params) {
                        var colorList = [
							'#e496e5','#8495ef','#c08de3','#51c1b9','#57b4ec',
							'#ef84a7','#ed86e9','#ef9d84','#50c170','#f58172'
                        ];
                        return colorList[params.dataIndex]
                    }
                }
            }	
			});
    		option = {	
				    title: {
				        text: '媒体类型发布量统计'
				    },
				    tooltip: {
				        trigger: 'axis'
				    },
				    grid: {
				        left: '3%',
				        right: '10%',
				        bottom: '3%',
				        containLabel: true
				    },
				    // 下载按钮
				    toolbox: {
				        feature: {
				           
				            // 类型切换
				             magicType:{
					        	show:true,
					        	type:["bar"]
					        },
					         saveAsImage: {

				            }
				        },
				    },
				    xAxis: {
				        type: 'value',
				        boundaryGap: [0, 0.01]
				    },
				    yAxis: {
				        type: 'category',
				        data:title
				    },
				    //stack 数据堆叠，同个类目轴上系列配置相同的stack值后，后一个系列的值会在前一个系列的值上相加
				    series:series
				};
				var $mediaType=$('.mediaType');
				var myChart = echarts.init($mediaType[0]);
				myChart.setOption(option);
    	},
		//百度媒体类型统计
		createBaiduData:function(result){
			var chartData=result.data.data;
    		var title=[];
    		var data=[];
    		var series=[];
    		for (var i = chartData.length - 1; i >= 0; i--) {
    			var cd=chartData[i];
    			title.push(cd.name);
    			data.push(cd.value);
    		}
			/*
    		 var itemStyle = {
	                normal: {
	                      color: new echarts.graphic.LinearGradient(
		                        0, 0, 0, 1,
		                        [
		                            {offset: 1, color: '#58b4ed'}
		                        ]
		                    )
	                }
	            }
				*/
    		series.push({"name":"百度媒体类型","type":"bar","data":data,
			"itemStyle":{
                normal: {
                    color: function(params) {
                        var colorList = [
							'#57b4ec','#f58172','#c08de3','#8495ef','#e496e5',
							'#ef84a7','#ed86e9','#ef9d84','#50c170','#51c1b9'
                        ];
                        return colorList[params.dataIndex]
                    }
                }
            }});
    		option = {	
				    title: {
				        text: '百度媒体类型'
				    },
				    tooltip: {
				        trigger: 'axis'
				    },
				    grid: {
				        left: '3%',
				        right: '10%',
				        bottom: '3%',
				        containLabel: true
				    },
				    // 下载按钮
				    toolbox: {
				        feature: {
				           
				            // 类型切换
				             magicType:{
					        	show:true,
					        	type:["bar"]
					        },
					         saveAsImage: {

				            }
				        },
				    },
				    xAxis: {
				         type: 'category',
				        data:title
				    },
				    yAxis: {
				         type: 'value',
				        boundaryGap: [0, 0.01]
				    },
				    //stack 数据堆叠，同个类目轴上系列配置相同的stack值后，后一个系列的值会在前一个系列的值上相加
				    series:series
				};
			var myChart = echarts.init($('.baiduType')[0]);
			myChart.setOption(option);
		},
		//全国区域热度地图
		createAreaMapData:function(result){
			//alert(result.resnum);
			var value = result.data;
			for(var key in value){
				if (key == 37){
					var shandong  = value[key]; 
				}else if(key == 32){
					var jiangsu = value[key];
				}else if(key == 34){
					var anhui = value[key];
				}else if(key == 33){
					var zhejiang = value[key];
				}else if(key == 35){
					var fujian = value[key];
				}else if(key == 31){
					var shanghai = value[key];
				}else if(key == 44){
					var guangdong = value[key];
				}else if(key == 45){
					var guangxi = value[key];
				}else if(key == 46){
					var hainan = value[key];
				}else if(key == 42){
					var hubei = value[key];
				}else if(key == 43){
					var hunan = value[key];
				}else if(key == 41){
					var henan = value[key];
				}else if(key == 36){
					var jiangxi = value[key];
				}else if(key == 11){
					var beijing = value[key];
				}else if(key == 12){
					var tianjin = value[key];
				}else if(key == 13){
					var hebei = value[key];
				}else if(key == 14){
					var shanxi_1 = value[key];
				}else if(key == 15){
					var neimenggu = value[key];
				}else if(key == 64){
					var ningxia = value[key];
				}else if(key == 65){
					var xinjiang = value[key];
				}else if(key == 63){
					var qinghai = value[key];
				}else if(key == 61){
					var shanxi_2 = value[key];
				}else if(key == 62){
					var gansu = value[key];
				}else if(key == 51){
					var sichuan = value[key];
				}else if(key == 53){
					var yunnan = value[key];
				}else if(key == 52){
					var guizhou = value[key];
				}else if(key == 54){
					var xizang = value[key];
				}else if(key == 50){
					var chongqing = value[key];
				}else if(key == 21){
					var liaoning = value[key];
				}else if(key == 22){
					var jilin = value[key];
				}else if(key == 23){
					var heilongjiang = value[key];
				}else if(key == 71){
					var taiwan = value[key];
				}else if(key == 81){
					var xianggang = value[key];
				}else if(key == 82){
					var aomen = value[key];
				}
			}
    		// 路径配置
			require.config({
				paths: {
					echarts: 'http://echarts.baidu.com/build/dist'
				}
			});

			// 使用
			require(
					[
						'echarts',
						'echarts/chart/bar', // 使用柱状图就加载bar模块，按需加载
						'echarts/chart/map', // 使用柱状图就加载bar模块，按需加载
						'echarts/chart/pie'
					],
					function (ec) {
						// 基于准备好的dom，初始化echarts图表
						var myChart_map = ec.init(document.getElementById('main_map'));

						var itemStyle = {
							normal:{label:{
								show:true,
								formatter:'{b}',
								textStyle: {fontSize: 10,fontWeight : 'bold'}
							}},
							emphasis:{label:{show:true}}
						};

						var option_map = {
							title : {
								text: '全国区域热度统计',
							//    subtext: '纯属虚构',
								x:'center'
							},
							tooltip : {
								trigger: 'item'
							},
							legend: {
								orient: 'vertical',
								x:'left',
								data:['华东','华南','华中','华北','西北','西南','东北','台港澳地区']
							},
							//高低条
							dataRange: {
								min: 0,
								max: result.resnum,
								x: 'left',
								y: 'bottom',
								text:['高','低'],           // 文本，默认为数值文本
								calculable : true
							},
							//辅助功能
							toolbox: {
								show: true,
								orient : 'vertical',
								x: 'right',
								y: 'center',
								feature : {
									mark : {show: true},
									dataView : {show: true, readOnly: false},
									restore : {show: true},
									saveAsImage : {show: true}
								}
							},
							//放大镜
							roamController: {
								show: false,
								x: 'right',
								mapTypeControl: {
									'china': true
								}
							},
							series : [
								{
									name: '华东',
									type: 'map',
									showLegendSymbol: false,   //控制城市圆点标记
									mapType: 'china',
									roam: true,
									itemStyle:{
										normal:{label:{show:false}},
										emphasis:{label:{show:true}}
									},
			//itemStyle: itemStyle,
									data:[
										{name: '山东',value: shandong},
										{name: '江苏',value: jiangsu},
										{name: '安徽',value: anhui},
										{name: '浙江',value: zhejiang},
										{name: '福建',value: fujian},
										{name: '上海',value: shanghai}
									]
								},
								{
									name: '华南',
									type: 'map',
									mapType: 'china',
									roam: false,
									itemStyle:{
										normal:{label:{show:false}},
										emphasis:{label:{show:true}}
									},
			//							itemStyle: itemStyle,
									data:[
										{name: '广东',value: guangdong},
										{name: '广西',value: guangxi},
										{name: '海南',value: hainan}							
									]
								},
								{
									name: '华中',
									type: 'map',
									mapType: 'china',
									itemStyle:{
										normal:{label:{show:false}},
										emphasis:{label:{show:true}}
									},
									data:[
										{name: '湖北',value: hubei},
										{name: '湖南',value: hunan},
										{name: '河南',value: henan},
										{name: '江西',value: jiangxi}
									]
								},
								 {
									name: '华北',
									type: 'map',
									mapType: 'china',
									itemStyle:{
										normal:{label:{show:false}},
										emphasis:{label:{show:true}}
									},
									data:[
										{name: '北京',value: beijing},
										{name: '天津',value: tianjin},
										{name: '河北',value: hebei},
										{name: '山西',value: shanxi_1},
										{name: '内蒙古',value: neimenggu}
									]
								},
								{
									name: '西北',
									type: 'map',
									mapType: 'china',
									itemStyle:{
										normal:{label:{show:false}},
										emphasis:{label:{show:true}}
									},
									data:[
										{name: '宁夏',value: ningxia},
										{name: '新疆',value: xinjiang},
										{name: '青海',value: qinghai},
										{name: '陕西',value: shanxi_2},
										{name: '甘肃',value: gansu}
									]
								},
								{
									name: '西南',
									type: 'map',
									mapType: 'china',
									itemStyle:{
										normal:{label:{show:false}},
										emphasis:{label:{show:true}}
									},
									data:[
										{name: '四川',value: sichuan},
										{name: '云南',value: yunnan},
										{name: '贵州',value: guizhou},
										{name: '西藏',value: xizang},
										{name: '重庆',value: chongqing}
									]
								},
								{
									name: '东北',
									type: 'map',
									mapType: 'china',
									itemStyle:{
										normal:{label:{show:false}},
										emphasis:{label:{show:true}}
									},
									data:[
										{name: '辽宁',value: liaoning},
										{name: '吉林',value: jilin},
										{name: '黑龙江',value: heilongjiang}
									]
								},
								{
									name: '台港澳地区',
									type: 'map',
									mapType: 'china',
									itemStyle:{
										normal:{label:{show:false}},
										emphasis:{label:{show:true}}
									},
									data:[
										{name: '台湾',value: taiwan},
										{name: '香港',value: xianggang},
										{name: '澳门',value: aomen}
									]
								}
							]
						};



						// 为echarts对象加载数据
						myChart_map.setOption(option_map);
					}
			);
		},		
		    // 全国区域热度饼图
			createArePieData: function (result) {
				var chartData = result.data.data;
				var title = [];
				var data = [];
				var series = [];
				for (var i = chartData.length - 1; i >= 0; i--) {
				  var cd = chartData[i];
				  data.push({ "value": cd.value, "name": cd.name });
				}
				series.push(
				  {
					"name": "媒体类型发布量",
					"type": "pie",
					"radius": '45%',
					"center": ['50%', '50%'],
					"data": data,
					"itemStyle": {
					  normal: {
						color: function (params) {
						  var colorList = [
							'#ff69b4', '#da70d6', '#6494ed', '#a755d3',
							'#87cefa', '#ff7f50', '#32ce32', '#cd5c5c'
						  ];
						  return colorList[params.dataIndex]
						}
					  }
					}
				  });
				option = {
				  title: {
					text: '',
					x: 'center'
				  },
				  tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				  },
				  // 下载按钮
				  toolbox: {
					feature: {
					  saveAsImage: {
		  
					  }
					},
				  },
				  //stack 数据堆叠，同个类目轴上系列配置相同的stack值后，后一个系列的值会在前一个系列的值上相加
				  series: series
				};
				var myChart = echarts.init($('.pieAreaType')[0]);
				myChart.setOption(option);
			  },
		//情感类型饼状图 
		cerateEmotionPieData:function(result){
			var chartData=result.data.data;
    		var title=[];
    		var data=[];
    		var series=[];
    		for (var i = chartData.length - 1; i >= 0; i--) {
    			var cd=chartData[i];
    			data.push({"value":cd.value,"name":cd.name});
    		}
    		series.push(
    		{
    			"name":"",
    			"type":"pie",
    			"radius" : '55%',
           		"center": ['50%', '60%'],
    			"data":data,
				"itemStyle":{
					normal: {
						color: function(params) {
							var colorList = [
								'#9ddea1','#f7db63','#f98cb3'
							];
							return colorList[params.dataIndex]
						}
                }
            }
    		});
    		option = {	
				    title: {
				        text: '',
				        x:'center'
				    },
				    tooltip: {
				        trigger: 'item',
        				formatter: "{a} <br/>{b} : {c} ({d}%)"
				    },
				    // 下载按钮
				    toolbox: {
				        feature: {
					         saveAsImage: {

				            }
				        },
				    },
				    //stack 数据堆叠，同个类目轴上系列配置相同的stack值后，后一个系列的值会在前一个系列的值上相加
				    series:series
				};
			var myChart = echarts.init($('.emotionMediaType')[0]);
			myChart.setOption(option);
		},
		//城市级别统计
		createCityData:function(result){
			var chartData=result.data.data;
    		var title=[];
    		var data=[];
    		var series=[];
    		for (var i = chartData.length - 1; i >= 0; i--) {
    			var cd=chartData[i];
    			title.push(cd.name);
    			data.push(cd.value);
    		}
			/*
    		 var itemStyle = {
	                normal: {
	                      color: new echarts.graphic.LinearGradient(
		                        0, 0, 0, 1,
		                        [
		                            {offset: 1, color: '#58b4ed'}
		                        ]
		                    )
	                }
	            }
				*/
    		series.push({"name":"城市级别统计","type":"bar","data":data,
			"itemStyle":{
                normal: {
                    color: function(params) {
                        var colorList = [
							'#e496e5','#8495ef','#c08de3','#51c1b9','#57b4ec',
							'#ef84a7','#ed86e9','#ef9d84','#50c170','#f58172'
                        ];
                        return colorList[params.dataIndex]
                    }
                }
            }});
    		option = {	
				    title: {
				        text: '城市级别统计'
				    },
				    tooltip: {
				        trigger: 'axis'
				    },
				    grid: {
				        left: '3%',
				        right: '10%',
				        bottom: '3%',
				        containLabel: true
				    },
				    // 下载按钮
				    toolbox: {
				        feature: {
				           
				            // 类型切换
				             magicType:{
					        	show:true,
					        	type:["bar"]
					        },
					         saveAsImage: {

				            }
				        },
				    },
				    xAxis: {
				        type: 'value',
				        boundaryGap: [0, 0.01]
				    },
				    yAxis: {
				        type: 'category',
				        data:title
				    },
				    //stack 数据堆叠，同个类目轴上系列配置相同的stack值后，后一个系列的值会在前一个系列的值上相加
				    series:series
				};
			var myChart = echarts.init($('.cityType')[0]);
			myChart.setOption(option);
		},
		//城市级别细分
		createCitySub:function(result){
			var allData=result.data;
			var $slideTxtBox=$(".slideTxtBox");
			var $cityTSubitle=$slideTxtBox.find(".cityTSubitle");
			$cityTSubitle.text(allData.start+" 至 "+allData.end)
			var chartData=result.data.data;
    		var title=[];
    		var data=[];
    		var series=[];
    		for (var i = chartData.length - 1; i >= 0; i--) {
    			var cd=chartData[i];
    			title.push(cd.name);
    			data.push(cd.value);
    		}
    		 var itemStyle = {
	                normal: {
	                      color: new echarts.graphic.LinearGradient(
		                        0, 0, 0, 1,
		                        [
		                            {offset: 1, color: '#58b4ed'}
		                        ]
		                    )
	                }
	            }
    		series.push({"name":"媒体类型发布量","type":"bar","data":data,itemStyle:itemStyle});
    		option = {	
				    tooltip: {
				        trigger: 'axis'
				    },
				    grid: {
				        left: '3%',
				        right: '10%',
				        bottom: '3%',
				        containLabel: true
				    },
				    // 下载按钮
				    toolbox: {
				        feature: {
					         saveAsImage: {

				            }
				        },
				    },
				    xAxis: {
				    	  type: 'category',
				        data:title
				       
				    },
				    yAxis: {
				      	 type: 'value',
				        boundaryGap: [0, 0.01]
				    },
				    //stack 数据堆叠，同个类目轴上系列配置相同的stack值后，后一个系列的值会在前一个系列的值上相加
				    series:series
				};
			var myChart = echarts.init($('.citySubType')[0]);
			myChart.setOption(option);
		},
		//情感媒体类型发布量统计
		/*
    	createEmotionMediaType:function(result) {
    		var chartData=result.data.data;
    		var title=[];
    		var data=[];
    		var series=[];
    		for (var i = chartData.length - 1; i >= 0; i--) {
    			var cd=chartData[i];
    			title.push(cd.name);
    			data.push(cd.value);
    		}
    		series.push({"name":"媒体类型发布量","type":"bar","data":data});
    		option = {	
				    title: {
				        text: '媒体类型发布量统计'
				    },
				    tooltip: {
				        trigger: 'axis'
				    },
				    grid: {
				        left: '3%',
				        right: '10%',
				        bottom: '3%',
				        containLabel: true
				    },
				    // 下载按钮
				    toolbox: {
				        feature: {
				           
				            // 类型切换
				             magicType:{
					        	show:true,
					        	type:["bar"]
					        },
					         saveAsImage: {

				            }
				        },
				    },
				    xAxis: {
				        type: 'value',
				        boundaryGap: [0, 0.01]
				    },
				    yAxis: {
				        type: 'category',
				        data:title
				    },
				    //stack 数据堆叠，同个类目轴上系列配置相同的stack值后，后一个系列的值会在前一个系列的值上相加
				    series:series
				};
				var $emotionMediaType=$('.emotionMediaType');
				var myChart = echarts.init($emotionMediaType[0]);
				myChart.setOption(option);
    	},*/
		// 按情感类型
		createEmotionData:function(result){
			var chartData=result.data.chartData;			
    		var series=[];
			/*
    		for (var i = 0; i < chartData.length; i++) {
    			var dt=chartData[i];
    			var resnum=dt.resnum;
    			var charName=dt.charName;
    			series.push({"name":charName,type:"line","data":dt.data,color:['#f7db63']});
    		}
			*/
			series.push({"name":chartData[0].charName,type:"line","data":chartData[0].data,color:['#f98cb3']});
			series.push({"name":chartData[1].charName,type:"line","data":chartData[1].data,color:['#f7db63']});
			series.push({"name":chartData[2].charName,type:"line","data":chartData[2].data,color:['#9ddea1']});
    		option = {	
				    title: {
				        text: ''
				    },
				    tooltip: {
				        trigger: 'axis'
				    },
				    grid: {
				        left: '3%',
				        right: '10%',
				        bottom: '3%',
				        containLabel: true
				    },
				    // 下载按钮
				    toolbox: {
				        feature: {
				           
				            // 类型切换
				             magicType:{
					        	show:true,
					        	type:["line","bar"]
					        },
					         saveAsImage: {

				            }

				        },

				    },
				    xAxis: {
				        type: 'category',
				        boundaryGap: false,
				        data: result.data.xAxis,
						name:"日期",
						
				    },
				    yAxis: {
				    	show:true,
				    	name:"总量",
				        type: 'value',
				    },
				    //stack 数据堆叠，同个类目轴上系列配置相同的stack值后，后一个系列的值会在前一个系列的值上相加
				    series:series
				};
			var myChart = echarts.init($('.emotionType')[0]);
			myChart.setOption(option);
		},
		// 数据摘要
		createDataSummary:function(result){
			var data=result.data;
			var $dataContainer=$(".dataContainer");
			$dataContainer.empty();
			for(var i=0;i<data.length;i++){
				var dt=data[i];
				if(!dt.area){
					dt.area = "";
				}
				var $dataDescribe=$('<div class="data_describe"></div>');
				$dataDescribe.attr("data_id",dt.id);
				var $dataItemTitle=$('<h2 class="dataItemTitle"></h2>');
				$('<a target="view_window" class="dataItemLink"></a>').attr("href",dt.url).html(dt.title).appendTo($dataItemTitle);
				$dataItemTitle.appendTo($dataDescribe);
				$('<h3 class="dataItemDes"></h3>').html(dt.content).appendTo($dataDescribe);
				var $dataItemMain=$('<p class="dataItemMain"></p>');
				$dataItemMain.appendTo($dataDescribe);
				$('<span class="dataItemTime"></span>').text(dt.pubTime).appendTo($dataItemMain);
				$('<span class="dataItemSize"></span>').text("来源："+dt.source).appendTo($dataItemMain);
				var arr="一";
				if (dt.cityType === 1) {
					arr="一";
				}else if(dt.cityType === 2){
					arr="二";
				}else{
					arr="三";
				}
				$('<span class="dataItemCity"></span>').text(arr+"线城市 "+dt.area).appendTo($dataItemMain);
				$('<span class="dataItemNum"></span>').text("转载："+dt.forwardNum).appendTo($dataItemMain);
				$dataDescribe.appendTo($dataContainer);
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
	//自调用话题获取数据
    getDataObj.getAllTopic();
    // 话题提交事件
    $(document).off("click.topicSubmit").on("click.topicSubmit",".topicSubmit",function(e){
    	var $target=$(e.currentTarget);
    	var $switch=$target.closest(".switch");
    	$switch.hide();
    	$(".kong").hide();
    	var $topicItem=$switch.find(".topicItem");
    	var topicText=$('input[name="c_radio"]:checked').val();
    	var topicId=$('input[name="c_radio"]:checked').attr("topic_id");
    	var $showTopic=$(".showTopic");
    	$showTopic.text(topicText).attr("topic_id",topicId);
    	topicId=parseInt(topicId);
    	// 调用接口
    	// 城市分类
    	var cityId=judgeCity();
    	interfaceFn(userId,topicId,"","","","",cityId);
    	createPublicObj.createTopicNumAll(allTopicData);
    });
    // 城市分类点击
    $(document).off("click.slideListItem").on("click.slideListItem",".slideListItem",function(e){
        var $target=$(e.currentTarget);
       	$target.addClass("on").siblings(".slideListItem").removeClass("on");
       	var cityId=parseInt($target.attr("city_id"));
       	var $w=$target.closest(".w");
       	var typeObj=judgeTimeType($w);
       	var topicId=getTopic();
		getDataObj.getCitySub(userId,topicId.id,typeObj.start,typeObj.end,typeObj.type,cityId);
    });
  	// 发布量对比编辑按钮
  	$(document).off("click.totalEdit").on("click.totalEdit",".total_tit .total_edit",function(e){
            var $target=$(e.currentTarget);
            var $dataTotal=$target.closest(".data_total");
            var $editSele=$dataTotal.find(".edit_sele");
            $( '.kong,.edit_sele').slideToggle(10);
            $( ".total_tit .total_edit").toggleClass('edit_bj');
            getDataObj.getAllTopic("true");
    });
    // 发布量对比编辑提交按钮
    $(document).off("click.editSeleSubmit").on("click.editSeleSubmit",".editSeleSubmit",function(e){
    	var $target=$(e.currentTarget);
    	var $w=$target.closest(".w");
		var $editSeleInput=$w.find(".editSeleInput");
		var $showTopic=$(".showTopic");
      	var topicId=parseInt($showTopic.attr("topic_id"));
      	var topicText=$showTopic.attr("topic_id");
      	var obj=[{text:topicText,id:topicId}];
		 var idArray=[topicId];
		 for (var i = 0; i < $editSeleInput.length; i++) {
		 	var $item=$editSeleInput.eq(i);
		 	if ($item.is(":checked")) {
		 		var $editSeleItem=$item.closest(".editSeleItem");
		 		var id=parseInt($editSeleItem.attr("topic_id"));
		 		idArray.push(id);
		 	}
		 }
		$( '.kong,.edit_sele').slideToggle(10);
        $( ".total_tit .total_edit").removeClass('edit_bj');

    	//发布总量请求
		var typeObj=judgeTimeType($w);
		$('.totalNum').empty();
		getDataObj.getTotalNum(userId,idArray,typeObj.start,typeObj.end,typeObj.type,1);
    });
	// 日、周、月选取
	$(document).off("click.pubDateItem").on("click.pubDateItem",".w .pubDateItem",function(e){
	  		var $target=$(e.currentTarget);
	  		$target.addClass("pub-date-cur").siblings(".pubDateItem").removeClass("pub-date-cur");
	  		var dataId=$target.attr("data_id");
	  		var $showTopic=$(".showTopic");
	  		var topicId=$showTopic.attr("topic_id");
	  		var start=getDate();
	  		var $w=$target.closest(".w");
	  		var type=$w.attr("data_type");
	  		$w.find(".date_demo").val("");
	  		changeTimeFn(userId,topicId,start,"",dataId,type,$w);
	});
	// 上下页码点击
	$(document).off("click.pageSetting").on("click.pageSetting",".pageSetting",function(e){
		var $target=$(e.currentTarget);
		var $w=$target.closest(".w");
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
						getDataObj.getDataSummary(userId,topicId.id,typeObj.start,typeObj.end,typeObj.type,pageNum,pageId,1,[1],"key");
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
						getDataObj.getDataSummary(userId,topicId.id,typeObj.start,typeObj.end,typeObj.type,pageNum,pageId,1,[1],"key");
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
		var $w=$target.closest(".w");
		var typeObj=judgeTimeType($w);
		var $showPage=$w.find(".show_page");
		var pageNum=parseInt($showPage.val());
		var topicId= getTopic();
		$target.addClass("on").siblings(".pageItem").removeClass("on");
		var pageId=parseInt($target.attr("page_id"));
		getDataObj.getDataSummary(userId,topicId.id,typeObj.start,typeObj.end,typeObj.type,pageNum,pageId,1,[1],"key");
	});
	// 输入框事件监听
	$(document).off("change.goPageNum").on("change.goPageNum",".goPageNum",function(e){
		var $target=$(e.currentTarget);
		var $w=$target.closest(".w");
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
		var $w=$target.closest(".w");
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
		getDataObj.getDataSummary(userId,topicId.id,typeObj.start,typeObj.end,typeObj.type,pageNum,pageId,1,[1],"key");
		var marginleft=-Math.floor((index-1)/5)*150;
		$pageWidth.css("margin-left",marginleft+"px");
	});
	// 页面下拉选择事件
	$(document).off("change.show_page").on("change.show_page",".show_page",function(e){
		var $target=$(e.currentTarget);
		var $w=$target.closest(".w");
		var typeObj=judgeTimeType($w);
		var pageNum=parseInt($target.val());
		var topicId= getTopic();
		var $pageItem=$w.find(".pageItem");
		var $needItem=$pageItem.eq(0);
		$w.find(".goPageNum").val("");
		$needItem.addClass("on").siblings(".pageItem").removeClass("on");
		getDataObj.getDataSummary(userId,topicId.id,typeObj.start,typeObj.end,typeObj.type,pageNum,1,[1],1);
		var $pageWidth=$w.find(".pageWidth");
		$pageWidth.css("margin-left",0);
	});
	

	// 点击退出
	$(document).off("click.out").on("click.out",".out",function(e){
		window.location.href = "home.html";
	});
	// 点击下载
	$(document).off("click.pubs").on("click.pubs",".pub-download-icon",function(e){
		var typeObj = judgeTimeType($('.typeData'));
		var topicId = $('.showTopic').attr('topic_id');
		req_data = {"ticket":userId,"topicId":topicId,"start":typeObj.start,"end":typeObj.end,"type":typeObj.type};
		$.ajax({
	  	   //url:rootUrl+"/editController/download.do",
    	   	   url:rootUrl+"/track/down",
	  	   type:"post",
		   data:JSON.stringify(req_data),
	  	   //data:{"ticket":userId,"topicId":topicId,"codes":codeId},
	  	   dataType:"json",
		   contentType:"application/json;charset=utf-8",
	  	   success:function(result){
			   console.log("下载接口返回体:"+obj2string(result));
	  	   		// window.open("/sqv1/file/123.docx");
	  	   		if(result.status==0){
					window.open(result.data.excelUrl);
				}else{
					alert(result.msg);
				}
	  	   },
	  	   error:function(){
	  	     console.log("下载信息出问题");
	  	   }
	  	});
	});
	// 媒体发布量选择时间格式
	var dateRange = new pickerDateRange('date_demo2', {
	        isTodayValid : true,
	        startDate : '',
	        endDate : '',
	        theme : 'ta',
	        inputTrigger : 'input_trigger_demo3',
	        defaultText : ' 至 ',
	        success : function(obj) {
	            //设置回调句柄
	            $(".dCon_demo2").html('开始时间 : ' + obj.startDate + '<br/>结束时间 : ' + obj.endDate);
	            var topicObj=getTopic();
	            getDataObj.getTotalNum(userId,[topicObj.id],obj.startDate,obj.endDate,4,1);
	        }
	});
	// 媒体类型选择时间格式
	var dateRange = new pickerDateRange('date_demo3', {
	        isTodayValid : true,
	        startDate : '',
	        endDate : '',
	        theme : 'ta',
	        inputTrigger : 'input_trigger_demo3',
	        defaultText : ' 至 ',
	        success : function(obj) {
	            //设置回调句柄
	            $(".dCon_demo2").html('开始时间 : ' + obj.startDate + '<br/>结束时间 : ' + obj.endDate);
	            var topicObj=getTopic();
	            // 媒体发布排行
	  			getDataObj.getMediaNum(userId,topicObj.id,obj.startDate,obj.endDate,4);
				//媒体类型发布量统计
				getDataObj.getchartData(userId,topicObj.id,obj.startDate,obj.endDate,4,3);
				//百度媒体类型统计
				getDataObj.getchartData(userId,topicObj.id,obj.startDate,obj.endDate,4,4);
	        }
	});
	// 地域类型选择时间格式
	var dateRange = new pickerDateRange('date_demo1', {
	        isTodayValid : true,
	        startDate : '',
	        endDate : '',
	        theme : 'ta',
	        inputTrigger : 'input_trigger_demo3',
	        defaultText : ' 至 ',
	        success : function(obj) {
	            //设置回调句柄
	            $(".dCon_demo2").html('开始时间 : ' + obj.startDate + '<br/>结束时间 : ' + obj.endDate);
	            var topicObj=getTopic();
	  			$(".cityTSubitle").text(obj.startDate+"至"+obj.startDate);
				//全国区域热度统计
	  			getDataObj.getchartData(userId,topicObj.id,obj.startDate,obj.endDate,4,5);
				getDataObj.getAreaMapData(userId,topicObj.id,obj.startDate,obj.endDate,4);
				//城市级别统计
				getDataObj.getchartData(userId,topicObj.id,obj.startDate,obj.endDate,4,6);
				// 城市级别细分
				var cityId=judgeCity();
				getDataObj.getCitySub(userId,topicObj.id,obj.startDate,obj.endDate,4,cityId);
	        }
	});
	// 情感类型选择时间格式
	var dateRange = new pickerDateRange('date_demo4', {
	        isTodayValid : true,
	        startDate : '',
	        endDate : '',
	        theme : 'ta',
	        inputTrigger : 'input_trigger_demo3',
	        defaultText : ' 至 ',
	        success : function(obj) {
	            //设置回调句柄
	            $(".dCon_demo2").html('开始时间 : ' + obj.startDate + '<br/>结束时间 : ' + obj.endDate);
	            var topicObj=getTopic();
	            //情感类型中的媒体类型发布量统计
				getDataObj.getEmotionchartData(userId,topicObj.id,obj.startDate,obj.endDate,4,8);
				//情感类型折线图
				getDataObj.getTotalNum(userId,[topicObj.id],obj.startDate,obj.endDate,4,2);
	        }
	});
	// 数据类型选择时间格式
	var dateRange = new pickerDateRange('date_demo5', {
	        isTodayValid : true,
	        startDate : '',
	        endDate : '',
	        theme : 'ta',
	        inputTrigger : 'input_trigger_demo3',
	        defaultText : ' 至 ',
	        success : function(obj) {
	            //设置回调句柄
	            $(".dCon_demo2").html('开始时间 : ' + obj.startDate + '<br/>结束时间 : ' + obj.endDate);
	            var topicObj=getTopic();
	            getDataObj.getDataSummary(userId,topicObj.id,obj.startDate,obj.endDate,4,defaultPagesize,1,1,[1]);
	        }
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
    // 时间切换选择对应数据
    function changeTimeFn(userId,id,start,end,dataId,type,$w){
  		if (type === "num") {
  			// 获取媒体发布量折线图
  			getDataObj.getTotalNum(userId,[id],start,end,dataId,1);
  		}else if(type === "media"){
  			// 媒体发布排行
  			getDataObj.getMediaNum(userId,id,start,end,dataId);
			//媒体类型发布量统计
			getDataObj.getchartData(userId,id,start,end,dataId,3);
			//百度媒体类型统计
			getDataObj.getchartData(userId,id,start,end,dataId,4);
  		}else if(type === "area"){
  			var $cityTSubitle=$w.find(".cityTSubitle");
  			$cityTSubitle.text(start);
			//全国区域热度统计
  			getDataObj.getchartData(userId,id,start,end,dataId,5);
			getDataObj.getAreaMapData(userId,id,start,end,dataId);
			//城市级别统计
			getDataObj.getchartData(userId,id,start,end,dataId,6);
			// 城市级别细分
			var cityId=judgeCity();
			getDataObj.getCitySub(userId,id,start,end,dataId,cityId);
  		}else if(type === "emotion"){
  			//情感类型中的媒体类型发布量统计
			getDataObj.getEmotionchartData(userId,id,start,end,dataId,8);
			//情感类型折线图
			getDataObj.getTotalNum(userId,[id],start,end,dataId,2);
  		}else if(type === "data"){
  			// 数据摘要
  			getDataObj.getDataSummary(userId,id,start,end,dataId,defaultPagesize,1,1,[1]);
  		}
    }
    // 获取当前选中的主题
    function getTopic(){
    	var $showTopic=$(".showTopic");
	  	var topicId=$showTopic.attr("topic_id");
	  	var topicText=$showTopic.text();
	  	var currentTopic={id:topicId,text:topicText};
	  	return currentTopic;
    }
    // 判断当前选中的城市分类
    function judgeCity(){
    	var $slideListItem=$(".slideListItem");
    	var id=1;
    	for (var i = 0; i < $slideListItem.length; i++) {
    		var $listItem=$slideListItem.eq(i);
    		if ($listItem.hasClass("on")) {
    			id=parseInt($listItem.attr("city_id"));
    		}
   		}
   		return id;
    }
	
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
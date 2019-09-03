$(function(){
    /*  $( '.operate .submit').click( function(){
          $( '.save_alert').show().delay(2000).hide(0)
      })
*/
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
    var defaultTime=parseInt($.cookie('defaultTime2')) || 1; //已处理
    // 默认图：折现/柱状
    var defaultChart=parseInt($.cookie('defaultChart')) || 1;
    // 默认页面个数
    var defaultPagesize=parseInt($.cookie('defaultPagesize')) || 10;//已处理
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
		  	 // 获取溯源分析雷达图
		  	getAnalysisData:function(userId,topicId,start,end,type,mediaType,baidu,senti,cityType){
		  		/**
		  		var data={ 
		  			status:0,
					msg:"成功",
					resnum:15194,
					data:{
						mediaTypeNum:1222,
						mediaTypeCurrentNum:1211,
						mediaTypeCurrentName:"权重媒体",
						baiduNum:222,
						baiduCurrentNum:111,
						baiduCurrentName:"百度新闻",
						sentiNum:432,
						sentiCurrentNum:112,
						sentiCurrentName:"正报道",
						cityTypeNum:4332,
						cityTypeCurrentNum:3112,
						cityTypeCurrentName:"一线城市"
					}
				};
				createPublicObj.createAnalysis(data);
				**/
				req_data = {"ticket":userId,"topicId":topicId,"start":start,
			  	   "end":end,"type":type,"mediaType":mediaType,"baidu":baidu,
			  	   "senti":senti,"cityType":cityType};
				console.log("获取溯源分析雷达图-->"+JSON.stringify(req_data));
		  		$.ajax({
			  	   //url:rootUrl+"/analysisController/getAnalysisData.do",
				   url:rootUrl+"/track/radar",
			  	   type:"post",
			  	   //data:{"ticket":ticket,"topicId":topicId,"start":start,
			  	   //"end":end,"type":type,"mediaType":mediaType,"baidu":baidu,
			  	   //"senti":senti,"cityType":cityType},
				   data:JSON.stringify(req_data),
			  	   contentType:"application/json;charset=utf-8",
			  	   dataType:"json",
			  	   success:function(result){
			  	      //数据处理函数
					  console.log("获取溯源分析雷达图返回体:"+obj2string(result));	
					  createPublicObj.createAnalysis(result); 	      
			  	   },
			  	   error:function(){
			  	     console.log("获取溯源分析雷达图数据返回有问题");
			  	   }
		  	 });
		  	},
    		//发布总量对比（柱状图）
    		getTopicHistogramData:function(userId,topicId,start,end,type,interfaceType){
				req_data = {"ticket":userId,topicId:topicId,start:start,end:end,type:type,interfaceType:interfaceType};
				console.log("发布总量对比（柱状图）-->"+JSON.stringify(req_data));
    			$.ajax({
			  	   //url:rootUrl+"/analysisController/getTopicHistogramData.do",
				   url:rootUrl+"/track/releaseHistogram",
			  	   type:"post",
			  	   //data:{"ticket":ticket,topicId:topicId,start:start,end:end,type:type,interfaceType:interfaceType},
				   data:JSON.stringify(req_data),
			  	   contentType:"application/json;charset=utf-8",
			  	   dataType:"json",
			  	   success:function(result){
			  	      //数据处理函数
					  console.log("发布总量对比（柱状图）返回体:"+obj2string(result));	
						if (interfaceType === 1) {
				  	 		// 媒体类型
				  	 		createPublicObj.createMediaType(result);
				  	 	}else if(interfaceType === 2){
				  	 		//百度类型统计
							createPublicObj.createBaiduData(result);
				  	 	}else if(interfaceType === 3){
				  	 		//情感类型统计
							createPublicObj.createSesiData(result);
				  	 	}else if(interfaceType ===4){
				  	 		//城市类型统计
				  	 		createPublicObj.createCityData(result);
				  	 	}
			  	   },
			  	   error:function(){
			  	     console.log("发布总量对比（柱状图）数据返回有问题");
			  	   }
		  	 	});
    			/**
			  	var result={
			  		status:0,
					msg:"成功",
					resnum:1234,
					data:{
						xAxis1:["权重","普通","财经","科技"],
						chartData:[
							{
								charId:1,
								charName:"权重",
								resnum:2340
							},
							{
								charId:2,
								charName:"普通",
								resnum:1340
							},
							{
								charId:3,
								charName:"财经",
								resnum:2240
							},
							{
								charId:4,
								charName:"科技",
								resnum:2540
							}
						] 
					}
			  	}
			  	if (interfaceType === 1) {
		  	 		// 媒体类型
		  	 		createPublicObj.createMediaType(result);
		  	 	}else if(interfaceType === 2){
		  	 		//百度类型统计
					createPublicObj.createBaiduData(result);
		  	 	}else if(interfaceType === 3){
		  	 		//情感类型统计
					createPublicObj.createSesiData(result);
		  	 	}else if(interfaceType ===4){
		  	 		//城市类型统计
		  	 		createPublicObj.createCityData(result);
		  	 	}
		  	 	**/
    		},
    		//发布总量对比（线性图）
    		getTopicLinearData:function(userId,topicId,start,end,type,interfaceType){
				req_data = {"ticket":userId,topicId:topicId,start:start,end:end,type:type,interfaceType:interfaceType};
				console.log("发布总量对比（线性图）-->"+JSON.stringify(req_data));
    			$.ajax({
			  	   //url:rootUrl+"/analysisController/getTopicLinearData.do",
				   url:rootUrl+"/track/releaseLineChart",
			  	   type:"post",
			  	   //data:{"ticket":ticket,topicId:topicId,start:start,end:end,type:type,interfaceType:interfaceType},
				   data:JSON.stringify(req_data),
			  	   contentType:"application/json;charset=utf-8",
			  	   dataType:"json",
			  	   success:function(result){
			  	      //数据处理函数
					  console.log("发布总量对比（线性图）返回体:"+obj2string(result));
			  		   	if (interfaceType === 1) {
				  	 		// 媒体类型
				  	 		createPublicObj.createMediaTypeLine(result);
				  	 	}else if(interfaceType === 2){
				  	 		//百度类型统计
							createPublicObj.createBaiduLine(result);
				  	 	}else if(interfaceType === 3){
				  	 		//情感类型统计
							createPublicObj.createSesiLine(result);
				  	 	}else if(interfaceType ===4){
				  	 		//城市类型统计
				  	 		createPublicObj.createCityLine(result);
				  	 	} 	      
			  	   },
			  	   error:function(){
			  	     console.log("发布总量对比（线性图）数据返回有问题");
			  	   }
		  	 	});
    			/**
		  	 	var result={
		  	 		status:0,
		  	 		msg:"成功",
		  	 		data:{
						xAxis:["1","2","3","4","5"],
						chartData:[
							{
							charId:1,
							charName:"乐视会员报道",
							resnum:2340,
							data:[120, 132, 201, 134, 90, 130, 210]
							},
							{
							charId:2,
							charName:"腾讯好莱坞会员",
							resnum:2340,
							data:[120, 232, 101, 134, 190, 230, 210]
							}
						] 
		  	 		}
		  	 	}
		  	 	if (interfaceType === 1) {
		  	 		// 媒体类型
		  	 		createPublicObj.createMediaTypeLine(result);
		  	 	}else if(interfaceType === 2){
		  	 		//百度类型统计
					createPublicObj.createBaiduLine(result);
		  	 	}else if(interfaceType === 3){
		  	 		//情感类型统计
					createPublicObj.createSesiLine(result);
		  	 	}else if(interfaceType ===4){
		  	 		//城市类型统计
		  	 		createPublicObj.createCityLine(result);
		  	 	}
		  	 	**/
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
    		// 获取数据摘要接口
			getDataSummary:function(userId,topicId,start,end,type,pageSize,currentPage,key){
				req_data = {"ticket":userId,"topicId":topicId,"start":start,"end":end,"type":type,"pageSize":pageSize,currentPage:currentPage};
				console.log("获取数据摘要接口-->"+JSON.stringify(req_data));
				$.ajax({
			  	   //url:rootUrl+"/analysisController/getDataSummary.do",
				   url:rootUrl+"/track/summaryList",
			  	   type:"post",
			  	   //data:{"ticket":userId,"topicId":topicId,"start":start,"end":end,"type":type,"pageSize":pageSize,currentPage:currentPage},
				   data:JSON.stringify(req_data),
			  	   contentType:"application/json;charset=utf-8",
			  	   dataType:"json",
			  	   success:function(result){
			  	      //数据处理函数
					  console.log("获取数据摘要接口返回体:"+obj2string(result));
			  		 createPublicObj.createDataSummary(result);
				  	 if(!key){
				  	 	createPublicObj.createPage(result);
				  	 } 	      
			  	   },
			  	   error:function(){
			  	     console.log("获取数据摘要接口有误");
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
						id:"内容id",
						senti:0.125903
						}]
			  	 	}
			  	 	createPublicObj.createDataSummary(result);
			  	 	if(!key){
			  	 		createPublicObj.createPage(result);
			  	 	}
			  	 	**/
			},
			// 下载接口
			getDownLoad:function(ticket,ticket,start,end,type){
			 	/**
				req_data = {"ticket":ticket,topicId:topicId,start:start,end:end,type:type,interfaceType:interfaceType};
				console.log("下载接口-->"+JSON.stringify(req_data));
				$.ajax({
			  	   //url:rootUrl+"/analysisController",
				   url:rootUrl+"/track/downSummaryList",
			  	   type:"post",
			  	   //data:{"ticket":ticket,topicId:topicId,start:start,end:end,type:type,interfaceType:interfaceType},
				   data:JSON.stringify(req_data),
			  	   contentType:"application/json;charset=utf-8",
			  	   dataType:"json",
			  	   success:function(result){
			  	      //数据处理函数
					  console.log("下载接口返回体:"+obj2string(result));
						var data=result.data;
						createPublicObj.createTopic(data); 	      
			  	   },
			  	   error:function(){
			  	     console.log("页面话题对象的话题数据返回有问题");
			  	   }
		  	 	});**/
			 }
    }
    //创建共有对象
    var createPublicObj={
	    	// 创建话题函数
			createTopic:function(data){
	    		$(".show_page").val(defaultPagesize);
				var $pubDate = $('.dataTimeType');
				for(var z =0;z<$pubDate.length;z++){
					var zt = $pubDate.eq(z);
					var $pubDateItem = zt.find('.pubDateItem');
					$pubDateItem.removeClass('pub-date-cur');
					for (var i = 0; i < $pubDateItem.length; i++) {
						var $st = $pubDateItem.eq(i);
						var dataId = $st.attr('data_id');
						if(parseInt(dataId) === defaultTime){
							$st.addClass('pub-date-cur');
						}
					}
				}

	    		var $switchRadio=$(".switch_radio");
	    		for (var i = 0; i < data.length; i++) {
	    			var dt=data[i];
	    			var $label=$('<label class="topicItem"></label>');
	    			var $input=$('<input type="radio" name="c_radio">')
	    			$input.attr("value",dt.name).attr("topic_id",dt.id).appendTo($label);
	    			$('<span class="topicChat"></span>').text(dt.name).appendTo($label);
	    			$label.attr("topic_id",dt.id).appendTo($switchRadio);
					var topicId = parseInt(dt.id) ;
	    			if (i === 0) {
	    				$input.attr("checked","true");
	    				$(".showTopic").attr("topic_id",dt.id).text(dt.name);
	    				// 调用接口
						// 创建雷达图
						var start=getDate();
						getDataObj.getAnalysisData(userId,topicId,start,"",defaultTime,1,1,1,1);
						// 创建媒体总量柱状图
						getDataObj.getTopicHistogramData(userId,topicId,start,"",defaultTime,1);
						// 创建媒体总量折线图
						getDataObj.getTopicLinearData(userId,topicId,start,"",defaultTime,1);
						// 创建百度总量柱状图
						getDataObj.getTopicHistogramData(userId,topicId,start,"",defaultTime,2);
						// 创建百度总量折线图
						getDataObj.getTopicLinearData(userId,topicId,start,"",defaultTime,2);
						// 创建情感总量柱状图
						getDataObj.getTopicHistogramData(userId,topicId,start,"",defaultTime,3);
						// 创建情感总量折线图
						getDataObj.getTopicLinearData(userId,topicId,start,"",defaultTime,3);
						// 创建城市总量柱状图
						getDataObj.getTopicHistogramData(userId,topicId,start,"",defaultTime,4);
						// 创建城市总量折线图
						getDataObj.getTopicLinearData(userId,topicId,start,"",defaultTime,4);
						// 热度溯源
						getDataObj.getAreaMapData(userId,topicId,start,"",defaultTime);
						// 获取数据摘要接口
						getDataObj.getDataSummary(userId,topicId,start,"",defaultTime,defaultPagesize,1);

	    				//var cityId=judgeCity();
	    				//interfaceFn(userId,parseInt(dt.id),"","","","",cityId);
	    			}
    		}
    	},
	    	createTopic1:function(data){
	    		var $showTopic=$(".showTopic");
	    		$showTopic.text(data.name).attr("id",data.id);
	    		// 创建雷达图
	    		var start=getDate();
	    		getDataObj.getAnalysisData(userId,data.id,start,"",defaultTime,1,1,1,1);
	    		// 创建媒体总量柱状图
	    		getDataObj.getTopicHistogramData(userId,data.id,start,"",defaultTime,1);
	    		// 创建媒体总量折线图
	    		getDataObj.getTopicLinearData(userId,data.id,start,"",defaultTime,1);
	    		// 创建百度总量柱状图
	    		getDataObj.getTopicHistogramData(userId,data.id,start,"",defaultTime,2);
	    		// 创建百度总量折线图
	    		getDataObj.getTopicLinearData(userId,data.id,start,"",defaultTime,2);
	    		// 创建情感总量柱状图
	    		getDataObj.getTopicHistogramData(userId,data.id,start,"",defaultTime,3);
	    		// 创建情感总量折线图
	    		getDataObj.getTopicLinearData(userId,data.id,start,"",defaultTime,3);
	    		// 创建城市总量柱状图
	    		getDataObj.getTopicHistogramData(userId,data.id,start,"",defaultTime,4);
	    		// 创建城市总量折线图
	    		getDataObj.getTopicLinearData(userId,data.id,start,"",defaultTime,4);
				// 热度溯源
				getDataObj.getAreaMapData(userId,data.id,start,"",defaultTime);
	    		// 获取数据摘要接口
				getDataObj.getDataSummary(userId,data.id,start,"",defaultTime,defaultPagesize,1);
	    	},
	    	// 创建溯源分析雷达图
	    	createAnalysis:function(data){

	    		var $analysisObj=$(".analysisObj");
	    		$analysisObj.find(".analysisNum").text(data.resnum);
	    		var data=data.data;
	    		var allData= [
			         /*  { name: '媒体:t'+data.mediaTypeCurrenName, max: data.mediaTypeNum},
			           { name: '城市:'+data.cityTypeCurrentName, max: data.cityTypeNum},
			           { name: '情感:'+data.sentiCurrentName, max: data.sentiNum},
			           { name: '百度:'+data.baiduCurrentName, max: data.baiduNum},*/
			           { name: '媒体', max: data.mediaTypeNum},
			           { name: '城市', max: data.cityTypeNum},
			           { name: '情感', max: data.sentiNum},
			           { name: '百度', max: data.baiduNum}
				    ];
				var currentData= [
				        {
				            value : [data.mediaTypeCurrentNum,data.cityTypeCurrentNum,data.sentiCurrentNum,data.baiduCurrentNum],
		             	    itemStyle: {
                                normal: {
                                    // areaStyle: {
                                    //     // type: 'default',
                                    //     // opacity: 0.8, 
                                    //     color: "#50c170"  //绘制区域颜色
                                    // },
                                    color : "#50c170",//拐点颜色
                                    lineStyle: {
                                    	color:"#50c170" // 图表中各个图区域的边框线颜色
                                	}
                                }
                            }
			            }
				     ]
	    		option = {
				    tooltip: {
				    	trigger: 'item'
				    },
				    // 下载按钮
				    toolbox: {
				        feature: {
					         saveAsImage: {
				            }
				        },
				    },
				    radar: {
				        // shape: 'circle',
				        name: {
				            textStyle: {
				                color: 'black',
				                backgroundColor: '#999',
				                borderRadius: 3,
				                padding: [3, 5]
				           }
				        },
				        indicator:allData
				    },
				    series: [{
				        name:"溯源总量",
				        type: 'radar',
				        data :currentData
				    }]
				};

				var myChart = echarts.init($('.leidaChat')[0]);
				myChart.setOption(option);
	    	},
	    	//媒体类型发布量统计
	    	createMediaType:function(result) {
	    		var chartData=result.data.chartData;
	    		var title=[];
	    		var data=[];
	    		var series=[];
	    		for (var i = chartData.length - 1; i >= 0; i--) {
	    			var cd=chartData[i];
	    			title.push(cd.charName);
	    			data.push(cd.resnum);
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
								'#ef84a7','#50c170'
							];
							return colorList[params.dataIndex]
						}
					}
				}
			});
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
					var myChart = echarts.init($('.mediaType')[0]);
					myChart.setOption(option);
	    	},
	    	//媒体类型折现图
	    	createMediaTypeLine:function(result){
		    	var chartData=result.data.chartData;
		    	var series=[];
				/*
		    	var title=[];
	    		for (var i = 0; i < chartData.length; i++) {
	    			var dt=chartData[i];
	    			var resnum=dt.resnum;
	    			var charName=dt.charName;
	    			var charId=dt.charId;
	    			series.push({"name":charName,type:"line","data":dt.data});
	    		}
				*/
				series.push({"name":chartData[0].charName,type:"line","data":chartData[0].data,color:['#ef84a7']});
				series.push({"name":chartData[1].charName,type:"line","data":chartData[1].data,color:['#50c170']});
	    		option = {	
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
				        data: result.data.xAxis
				    },
				    yAxis: {
				    	show:true,
				    	name:"",
				        type: 'value',
				    },
				    //stack 数据堆叠，同个类目轴上系列配置相同的stack值后，后一个系列的值会在前一个系列的值上相加
				    series:series
				};
				var myChart = echarts.init($('.mediaTypeLine')[0]);
				myChart.setOption(option);
	    	},
	    	//百度柱状图
	    	createBaiduData:function(result){
	    		var chartData=result.data.chartData;
	    		var title=[];
	    		var data=[];
	    		var series=[];
	    		for (var i = chartData.length - 1; i >= 0; i--) {
	    			var cd=chartData[i];
	    			title.push(cd.charName);
	    			data.push(cd.resnum);
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
								'#57b4ec','#f58172'
							];
							return colorList[params.dataIndex]
						}
					}
				}
				});
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
				var myChart = echarts.init($('.baiduHistogram')[0]);
				myChart.setOption(option);
	    	},
	    	//百度折现图
	    	createBaiduLine:function(result){
		    	var chartData=result.data.chartData;
		    	var series=[];
				/*
		    	var title=[];
	    		for (var i = 0; i < chartData.length; i++) {
	    			var dt=chartData[i];
	    			var resnum=dt.resnum;
	    			var charName=dt.charName;
	    			var charId=dt.charId;
	    			series.push({"name":charName,type:"line","data":dt.data});
	    		}
				*/
				series.push({"name":chartData[0].charName,type:"line","data":chartData[0].data,color:['#f58172']});
				series.push({"name":chartData[1].charName,type:"line","data":chartData[1].data,color:['#57b4ec']});
	    		option = {	
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
				        data: result.data.xAxis
				    },
				    yAxis: {
				    	show:true,
				    	name:"",
				        type: 'value',
				    },
				    //stack 数据堆叠，同个类目轴上系列配置相同的stack值后，后一个系列的值会在前一个系列的值上相加
				    series:series
				};
				var myChart = echarts.init($('.baiduLiner')[0]);
				myChart.setOption(option);
	    	},
	    	//情感柱状图
	    	createSesiData:function(result){
	    		var chartData=result.data.chartData;
	    		var title=[];
	    		var data=[];
	    		var series=[];
	    		for (var i = chartData.length - 1; i >= 0; i--) {
	    			var cd=chartData[i];
	    			title.push(cd.charName);
	    			data.push(cd.resnum);
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
								'#9ddea1','#f7db63','#f98cb3'
							];
							return colorList[params.dataIndex]
						}
					}
				}
				});
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
				var myChart = echarts.init($('.SesiHistogram')[0]);
				myChart.setOption(option);
	    	},
	    	//情感折现图
	    	createSesiLine:function(result){
		    	var chartData=result.data.chartData;
		    	var series=[];
				/*
		    	var title=[];
	    		for (var i = 0; i < chartData.length; i++) {
	    			var dt=chartData[i];
	    			var resnum=dt.resnum;
	    			var charName=dt.charName;
	    			var charId=dt.charId;
	    			series.push({"name":charName,type:"line","data":dt.data});
	    		}
				*/
				series.push({"name":chartData[0].charName,type:"line","data":chartData[0].data,color:['#f98cb3']});
				series.push({"name":chartData[1].charName,type:"line","data":chartData[1].data,color:['#f7db63']});
				series.push({"name":chartData[2].charName,type:"line","data":chartData[2].data,color:['#9ddea1']});
	    		option = {	
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
				        data: result.data.xAxis
				    },
				    yAxis: {
				    	show:true,
				    	name:"",
				        type: 'value',
				    },
				    //stack 数据堆叠，同个类目轴上系列配置相同的stack值后，后一个系列的值会在前一个系列的值上相加
				    series:series
				};
				var myChart = echarts.init($('.sesiLine')[0]);
				myChart.setOption(option);
	    	},
	    	//城市柱状图
	    	createCityData:function(result){
	    		var chartData=result.data.chartData;
	    		var title=[];
	    		var data=[];
	    		var series=[];
	    		for (var i = chartData.length - 1; i >= 0; i--) {
	    			var cd=chartData[i];
	    			title.push(cd.charName);
	    			data.push(cd.resnum);
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
								'#e496e5','#8495ef','#c08de3','#51c1b9','#57b4ec'
							];
							return colorList[params.dataIndex]
						}
					}
				}
				});
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
				var myChart = echarts.init($('.cityHistogram')[0]);
				myChart.setOption(option);
	    	},
	    	//城市折现图
	    	createCityLine:function(result){
		    	var chartData=result.data.chartData;
		    	var series=[];
				/*
		    	var title=[];
	    		for (var i = 0; i < chartData.length; i++) {
	    			var dt=chartData[i];
	    			var resnum=dt.resnum;
	    			var charName=dt.charName;
	    			var charId=dt.charId;
	    			series.push({"name":charName,type:"line","data":dt.data});
	    		}
				*/
				series.push({"name":chartData[0].charName,type:"line","data":chartData[0].data,color:['#57b4ec']});
				series.push({"name":chartData[1].charName,type:"line","data":chartData[1].data,color:['#51c1b9']});
				series.push({"name":chartData[2].charName,type:"line","data":chartData[2].data,color:['#c08de3']});
				series.push({"name":chartData[3].charName,type:"line","data":chartData[3].data,color:['#8495ef']});
				series.push({"name":chartData[4].charName,type:"line","data":chartData[4].data,color:['#e496e5']});
	    		option = {	
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
				        data: result.data.xAxis
				    },
				    yAxis: {
				    	show:true,
				    	name:"",
				        type: 'value',
				    },
				    //stack 数据堆叠，同个类目轴上系列配置相同的stack值后，后一个系列的值会在前一个系列的值上相加
				    series:series
				};
				var myChart = echarts.init($('.cityLine')[0]);
				myChart.setOption(option);
	    	},
			//全国区域热度地图
		createAreaMapData:function(result){
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
			//itemStyle: itemStyle,
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
	    // 数据摘要
		createDataSummary:function(result){
				var data=result.data;
				var $summary=$(".summary");
				$summary.empty();
				for(var i=0;i<data.length;i++){
					var dt=data[i];
					if(!dt.area){
						dt.area = "";
					}
					var $dataDescribe=$('<div class="hot_detail"></div>');

					$dataDescribe.attr("data_id",dt.id);
					var $sumTitleCont=$('<h2 class="sumTitleCont"></h2>');
					$('<a target="view_window" class="summaryTitle"></a>').attr("href",dt.url).html(dt.title).appendTo($sumTitleCont);
					$sumTitleCont.appendTo($dataDescribe);

					var $detailCo=$('<p class="detail_co"></p>');
					$detailCo.html(dt.content).appendTo($dataDescribe);
					var $detailTo=$('<p class="detail_to"></p>');


					$('<span class="dataItemTime"></span>').text(dt.pubTime).appendTo($detailTo);
					$('<span class="dataItemSize"></span>').text("来源："+dt.source).appendTo($detailTo);
					var arr="一";
					if (dt.cityType === 1) {
						arr="一";
					}else if(dt.cityType === 2){
						arr="二";
					}else{
						arr="三";
					}
					var senti="正面";
					if (dt.senti < -0.25) {
						senti="负面";
					}else if(dt.senti > 0.25){
						senti="正面";
					}else{
						senti="中立";
					}
					$('<span class="dataItemCity"></span>').text(arr+"线城市 "+dt.area).appendTo($detailTo);
					$('<span class="dataItemNum"></span>').text("转载："+dt.forwardNum).appendTo($detailTo);
					$('<span class="influence"></span>').text(dt.senti).appendTo($detailTo);
					$detailTo.appendTo($dataDescribe);
					$dataDescribe.appendTo($summary);
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
    //getDataObj.getAppointTopic();
    getDataObj.getAllTopic();
	
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
		// 创建雷达图
		var start=getDate();
		getDataObj.getAnalysisData(userId,topicId,start,"",defaultTime,1,1,1,1);
		/*// 创建媒体总量柱状图
		getDataObj.getTopicHistogramData(userId,topicId,start,"",defaultTime,1);
		// 创建媒体总量折线图
		getDataObj.getTopicLinearData(userId,topicId,start,"",defaultTime,1);
		// 创建百度总量柱状图
		getDataObj.getTopicHistogramData(userId,topicId,start,"",defaultTime,2);
		// 创建百度总量折线图
		getDataObj.getTopicLinearData(userId,topicId,start,"",defaultTime,2);
		// 创建情感总量柱状图
		getDataObj.getTopicHistogramData(userId,topicId,start,"",defaultTime,3);
		// 创建情感总量折线图
		getDataObj.getTopicLinearData(userId,topicId,start,"",defaultTime,3);
		// 创建城市总量柱状图
		getDataObj.getTopicHistogramData(userId,topicId,start,"",defaultTime,4);
		// 创建城市总量折线图
		getDataObj.getTopicLinearData(userId,topicId,start,"",defaultTime,4);
		// 热度溯源
		getDataObj.getAreaMapData(userId,topicId,start,"",defaultTime);
		// 获取数据摘要接口
		getDataObj.getDataSummary(userId,topicId,start,"",defaultTime,defaultPagesize,1);*/

    	// 城市分类
    	//var cityId=judgeCity();
    	//interfaceFn(userId,topicId,"","","","",cityId);
    	//createPublicObj.createTopicNumAll(allTopicData);
    });	
	
   	// 日、周、月选取
	$(document).off("click.pubDateItem").on("click.pubDateItem",".pubDateItem",function(e){
  		var $target=$(e.currentTarget);
  		var $w=$target.closest(".w");
  		var type=$w.attr("data_type");
  		var topicId = $('.showTopic').attr('topic_id');
  		$w.find(".date_demo").val("");
  		$target.addClass("pub-date-cur").siblings(".pubDateItem").removeClass("pub-date-cur");
  		if(type === "chart"){
  			var typeObj=judgeTimeType($w);
  			// 创建媒体总量柱状图
			getDataObj.getTopicHistogramData(userId,topicId,typeObj.start,typeObj.end,typeObj.type,1);
			// 创建媒体总量折线图
			getDataObj.getTopicLinearData(userId,topicId,typeObj.start,typeObj.end,typeObj.type,1);
			// 创建百度总量柱状图
			getDataObj.getTopicHistogramData(userId,topicId,typeObj.start,typeObj.end,typeObj.type,2);
			// 创建百度总量折线图
			getDataObj.getTopicLinearData(userId,topicId,typeObj.start,typeObj.end,typeObj.type,2);
			// 创建情感总量柱状图
			getDataObj.getTopicHistogramData(userId,topicId,typeObj.start,typeObj.end,typeObj.type,3);
			// 创建情感总量折线图
			getDataObj.getTopicLinearData(userId,topicId,typeObj.start,typeObj.end,typeObj.type,3);
			// 创建城市总量柱状图
			getDataObj.getTopicHistogramData(userId,topicId,typeObj.start,typeObj.end,typeObj.type,4);
			// 创建城市总量折线图
			getDataObj.getTopicLinearData(userId,topicId,typeObj.start,typeObj.end,typeObj.type,4);
			// 热度溯源
			getDataObj.getAreaMapData(userId,topicId,typeObj.start,typeObj.end,typeObj.type);
			// 获取数据摘要接口
			getDataObj.getDataSummary(userId,topicId,typeObj.start,typeObj.end,typeObj.type,defaultPagesize,1);
  		}
	});
    // 提交按钮
    $(document).off("click.selectSubmit").on("click.selectSubmit",".selectSubmit",function(e){
  		var $target=$(e.currentTarget);
  		var $w=$target.closest(".w");
  		var typeObj=judgeTimeType($w);
  		var $pubMedia=$w.find('[select_type="media"]');
  		var $mediaItem=$pubMedia.find(".pubDateItem");
  		var mediaType=travelsal($mediaItem);
  		var $pubbaidu=$w.find('[select_type="baidu"]');
  		var $baiduItem=$pubbaidu.find(".pubDateItem");
  		var baidu=travelsal($baiduItem);
  		var $pubemotion=$w.find('[select_type="emotion"]');
  		var $emotionItem=$pubemotion.find(".pubDateItem");
  		var senti=travelsal($emotionItem);
  		var $pubcity=$w.find('[select_type="city"]');
  		var $cityItem=$pubcity.find(".pubDateItem");
  		var cityType=travelsal($cityItem);
  		var topicId=getTopic().id;
  		// 调用雷达
  		getDataObj.getAnalysisData(userId,topicId,typeObj.start,typeObj.end,typeObj.type,mediaType,baidu,senti,cityType);
    	// 创建媒体总量柱状图
		//getDataObj.getTopicHistogramData(userId,topicId,typeObj.start,typeObj.end,typeObj.type,1);
		// 创建媒体总量折线图
		//getDataObj.getTopicLinearData(userId,topicId,typeObj.start,typeObj.end,typeObj.type,1);
		// 创建百度总量柱状图
		//getDataObj.getTopicHistogramData(userId,topicId,typeObj.start,typeObj.end,typeObj.type,2);
		// 创建百度总量折线图
		//getDataObj.getTopicLinearData(userId,topicId,typeObj.start,typeObj.end,typeObj.type,2);
		// 创建情感总量柱状图
		//getDataObj.getTopicHistogramData(userId,topicId,typeObj.start,typeObj.end,typeObj.type,3);
		// 创建情感总量折线图
		//getDataObj.getTopicLinearData(userId,topicId,typeObj.start,typeObj.end,typeObj.type,3);
		// 创建城市总量柱状图
		//getDataObj.getTopicHistogramData(userId,topicId,typeObj.start,typeObj.end,typeObj.type,4);
		// 创建城市总量折线图
		//getDataObj.getTopicLinearData(userId,topicId,typeObj.start,typeObj.end,typeObj.type,4);
		// 热度溯源
		//getDataObj.getAreaMapData(userId,topicId,typeObj.start,typeObj.end,typeObj.type);
		// 获取数据摘要接口
		//getDataObj.getDataSummary(userId,topicId,typeObj.start,typeObj.end,typeObj.type,defaultPagesize,1);
    });
    // 上下页码点击
	$(document).off("click.pageSetting").on("click.pageSetting",".pageSetting",function(e){
		var $target=$(e.currentTarget);
		var $w=$(".selectData");
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
		var $w=$(".selectData");
		var typeObj=judgeTimeType($w);
		var $showPage=$(".show_page");
		var pageNum=parseInt($showPage.val());
		var topicId= getTopic();
		$target.addClass("on").siblings(".pageItem").removeClass("on");
		var pageId=parseInt($target.attr("page_id"));
		getDataObj.getDataSummary(userId,topicId.id,typeObj.start,typeObj.end,typeObj.type,pageNum,pageId,"key");
	});
	// 输入框事件监听
	$(document).off("change.goPageNum").on("change.goPageNum",".goPageNum",function(e){
		var $target=$(e.currentTarget);
		var $w=$(".selectData");
		var len=$(".pageItem").length;
		var val=parseInt($target.val());
		if (val > len || val < 1) {
			alert("您输入的值有误，请重新输入,输入范围为："+1+"~"+len);
			$target.val("");
		}
	});
	//go 页面
	$(document).off("click.goPageClick").on("click.goPageClick",".goPageClick",function(e){
		var $target=$(e.currentTarget);
		var $w=$(".selectData");
		var typeObj=judgeTimeType($w);
		var $showPage=$(".show_page");
		var pageNum=parseInt($showPage.val());
		var topicId= getTopic();
		var $goPageNum=$(".goPageNum");
		var index=parseInt($goPageNum.val());
		var $pageItem=$(".pageItem");
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
		var $pageWidth=$(".pageWidth");
		getDataObj.getDataSummary(userId,topicId.id,typeObj.start,typeObj.end,typeObj.type,pageNum,pageId,"key");
		var marginleft=-Math.floor((index-1)/5)*150;
		$pageWidth.css("margin-left",marginleft+"px");
	});
	// 页面下拉选择事件
	$(document).off("change.show_page").on("change.show_page",".show_page",function(e){
		var $target=$(e.currentTarget);
		var $w=$(".selectData");
		var typeObj=judgeTimeType($w);
		var pageNum=parseInt($target.val());
		var topicId= getTopic();
		var $pageItem=$(".pageItem");
		var $needItem=$pageItem.eq(0);
		$w.find(".goPageNum").val("");
		$needItem.addClass("on").siblings(".pageItem").removeClass("on");
		getDataObj.getDataSummary(userId,topicId.id,typeObj.start,typeObj.end,typeObj.type,pageNum,1);
		var $pageWidth=$w.find(".pageWidth");
		$pageWidth.css("margin-left",0);
	});
 	 // 遍历item获取选中id
  	function travelsal($pubDateItem){
      	var dataId=0;
  		for(var i=0;i<$pubDateItem.length;i++){
  			var $item=$pubDateItem.eq(i);
  			if ($item.hasClass("pub-date-cur")) {
  				dataId=parseInt($item.attr("data_id"));
  			}
  		}
  		return dataId;
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
	 // 获取当前选中的主题
    function getTopic(){
    	var $showTopic=$(".showTopic");
	  	var topicId=$showTopic.attr("topic_id");
	  	var topicText=$showTopic.text();
	  	var currentTopic={id:topicId,text:topicText};
	  	return currentTopic;
    }
    var dateRange = new pickerDateRange('date_demo3', {
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
    });
    //图表时间选择事件调用
   var dateRange = new pickerDateRange('date_demo2', {
        isTodayValid : true,
        startDate : '',
        endDate : '',
        theme : 'ta',
        inputTrigger : 'input_trigger_demo3',
        defaultText : ' 至 ',
        success : function(obj) {
            //设置回调句柄
            $(".dCon_demo3").html('开始时间 : ' + obj.startDate + '<br/>结束时间 : ' + obj.endDate);
        	var topicId=getTopic().id;
        	// 创建媒体总量柱状图
			getDataObj.getTopicHistogramData(userId,topicId,obj.startDate, obj.endDate,4,1);
			// 创建媒体总量折线图
			getDataObj.getTopicLinearData(userId,topicId,obj.startDate, obj.endDate,4,1);
			// 创建百度总量柱状图
			getDataObj.getTopicHistogramData(userId,topicId,obj.startDate, obj.endDate,4,2);
			// 创建百度总量折线图
			getDataObj.getTopicLinearData(userId,topicId,obj.startDate, obj.endDate,4,2);
			// 创建情感总量柱状图
			getDataObj.getTopicHistogramData(userId,topicId,obj.startDate, obj.endDate,4,3);
			// 创建情感总量折线图
			getDataObj.getTopicLinearData(userId,topicId,obj.startDate, obj.endDate,4,3);
			// 创建城市总量柱状图
			getDataObj.getTopicHistogramData(userId,topicId,obj.startDate, obj.endDate,4,4);
			// 创建城市总量折线图
			getDataObj.getTopicLinearData(userId,topicId,obj.startDate, obj.endDate,4,4);
			// 热度溯源
			getDataObj.getAreaMapData(userId,topicId,typeObj.startDate,typeObj.endDate,typeObj.type);
			// 获取数据摘要接口
			getDataObj.getDataSummary(userId,topicId,typeObj.startDate,typeObj.endDate,4,defaultPagesize,1);
        }
    });
   	// 点击下载
	$(document).off("click.mores").on("click.mores",".more_down",function(e){
		var typeObj = judgeTimeType($('.chartData'));
		var topicId = $('.showTopic').attr('topic_id');
		req_data = {"ticket":userId,"topicId":topicId,"start":typeObj.start,"end":typeObj.end,"type":typeObj.type};
		$.ajax({
	  	   //url:rootUrl+"/editController/download.do",
    	   	   url:rootUrl+"/track/downSummaryList",
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
  	//判断时间格式
	function judgeTimeType($w){
      	var timeType=1;
      	var $dateDemo=$w.find(".dataTimeType");
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
			//alert("$pubDateItem.length="+$pubDateItem.length);
  			for (var i = 0; i < 3; i++) {
  				var $item=$pubDateItem.eq(i);
  				if ($item.hasClass("pub-date-cur")) {
  					timeType=parseInt($item.attr("data_id"));
  				}
  			}
  		}
  		var typeObj={type:timeType,start:start,end:end};
  		return typeObj;
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
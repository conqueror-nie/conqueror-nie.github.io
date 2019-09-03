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
	// 获取数据函数
	var getDataObj={
		// 初始化
		init:function(){
			getDataObj.getSources();
			getDataObj.getSizeData();
		},
		// 获取全部话题
    	getAllTopic:function(){
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
						createFn.createTopicList(data); 	      
			  	   },
			  	   error:function(){
			  	     console.log("获取全部话题数据返回有问题");
			  	   }
		  	 });
		},
		// 获取来源种类列表
		getSources:function(){
			//req_data = "";
			$.ajax({
		  	   //url:rootUrl+"/editController/getSources.do",
			   url:rootUrl+"/MonitorPlat/originList",
		  	   type:"post",
		  	   data:"{}",
		  	   dataType:"json",
		  	   contentType:"application/json;charset=utf-8",
		  	   success:function(result){
		  	      //数据处理函数
				createFn.createSource(result.data);		      
		  	   },
		  	   error:function(){
		  	     console.log("获取来源种类列表数据返回有问题");
		  	   }
		  	});
		},
		// 获取地域类型
		getSizeData:function(){
			//req_data = "";
			$.ajax({
		  	   //url:rootUrl+"/editController/getSizeData.do",
			   url:rootUrl+"/MonitorPlat/geographicalList",
		  	   type:"post",
		  	   //data:JSON.stringify(req_data),
		  	   data:"{}",
		  	   dataType:"json",
		  	   contentType:"application/json;charset=utf-8",
		  	   success:function(result){
		  	      //数据处理函数
				createFn.createArea(result.data);		      
		  	   },
		  	   error:function(){
		  	     console.log("获取地域类型数据返回有问题");
		  	   }
		  	});
		},
		// 根据topicId获取关键字
		getTopicKey:function(userId,topicId){
			req_data = {ticket:userId,topicId:topicId};
			console.log("根据topicId获取关键字-->"+JSON.stringify(req_data));
			$.ajax({
		  	   //url:rootUrl+"/editController/getTopicKey.do",
			   url:rootUrl+"/MonitorPlat/copyAllKeyword",
		  	   type:"post",
		  	   data:JSON.stringify(req_data),
		  	   dataType:"json",
		  	   contentType:"application/json;charset=utf-8",
		  	   success:function(result){
		  	      //数据处理函数
				  console.log("根据topicId获取关键字返回体:"+obj2string(result));
				  createFn.createTopicKey(result);		      
		  	   },
		  	   error:function(){
		  	     console.log("根据topicId获取关键字数据返回有问题");
		  	   }
		  	});
			/**
		  	var result={
		  		status:0,
		  		msg:"成功",
		  		data:{
		  			keyword:"222222,333,444"
		  		}
		  	}
		  	createFn.createTopicKey(result);
		  	**/
		},
		// 搜索列表
		getSearchData:function(userId,pageSize,currentPage,siteName,key){
			var req_data = {ticket:userId,pageSize:pageSize,currentPage:currentPage,siteName:siteName};
			console.log("搜索列表-->"+JSON.stringify(req_data));
			$.ajax({
		  	   //url:rootUrl+"/editController/getSearchData.do",
			   url:rootUrl+"/MonitorPlat/siteSearchList",
		  	   type:"post",
		  	   data:JSON.stringify(req_data),
		  	   dataType:"json",
		  	   contentType:"application/json;charset=utf-8",
		  	   success:function(result){
		  	      //数据处理函数
				  console.log("搜索列表返回体:"+obj2string(result));
		  		 createFn.createSearch(result);
				 if (!key) {
				  	createFn.createPage(result);
				 }
		  	   },
		  	   error:function(){
		  	     console.log("搜索列表数据返回有问题");
		  	   }
		  	});
			
		},
		// 保存页面数据
		getSaveData:function(userId,topicId,topicName,type,keywords,mediaClassIds,mediaIds,areaTypeIds,areaIds,siteIds,lang){
			var req_data = {ticket:userId,topicId:topicId,topicName:topicName,type:type,keywords:keywords,mediaClassz:mediaClassIds,
				  	   medias:mediaIds,areaTypes:areaTypeIds,areas:areaIds,sites:siteIds,lang:lang};
			console.log("保存页面数据-->"+JSON.stringify(req_data));
			$.ajax({
		  	   //url:rootUrl+"/editController/getSaveData.do",
			   url:rootUrl+"/MonitorPlat/createTopic",
		  	   type:"post",
		  	   data:JSON.stringify(req_data),
		  	   dataType:"json",
		  	   contentType:"application/json;charset=utf-8",
		  	   success:function(result){
		  	      //数据处理函数
				  console.log("保存页面数据返回体:"+obj2string(result));
				  createFn.createSearch(result);		      
		  	   },
		  	   error:function(){
		  	     console.log("保存页面数据返回有问题");
		  	   }
		  	});
		},
		// 根据topicId获取相关主题所有信息
		getTopicInfo:function(userId,topicId){
			req_data = {ticket:userId,topicId:topicId};
			console.log("根据topicId获取相关主题所有信息-->"+JSON.stringify(req_data));
			$.ajax({
		  	   //url:rootUrl+"/editController/editTopic.do",
			   url:rootUrl+"/MonitorPlat/topicConfig",
		  	   type:"post",
			   data:JSON.stringify(req_data),
		  	   //data:{ticket:userId,topicId:topicId},
		  	   dataType:"json",
			   contentType:"application/json;charset=utf-8",
		  	   success:function(result){
		  	      //数据处理函数
				  console.log("根据topicId获取相关主题所有信息返回体:"+obj2string(result));
		  	      // 话题名称处理
		  	      var topicName = result.data.topicName;
		  	      $(".ar_name").val(topicName).attr("topic_id",topicName);
		  	      var rt = {};
		  	      rt.data  = {};
		  	      //处理检测
		  	      var type = result.data.type;
		  	      var $radio = $(".radio");
		  	      for (var i = 0; i < $radio.length; i++) {
		  	      	var $radioItem = $radio.eq(i);
		  	      	var dataId = parseInt($radioItem.attr("data_id"));
		  	      	if (dataId === type) {
		  	      		$radioItem.attr("checked","checked");
		  	      	}
		  	      	
		  	      }
		  	      // 处理关键字
		  	      rt.data.keyword = result.data.keywords;
				createFn.createTopicKey(rt);

				//处理增量来源
				var sites = result.data.sites;
				var siteNames= "";
				for(var si =0;si<sites.length;si++){
						if(si === sites.length -1){
							siteNames += sites[si].name;
						}else{
							siteNames += sites[si].name+",";
						}
						
				}
				$(".copeSiteName").text(siteNames);

				var topicObj = {
					mediaClassz:result.data.mediaClassz,
					medias:result.data.medias,
					areaTypes:result.data.areaTypes,
					areas:result.data.areas,
					sites:result.data.sites,
					lang:result.data.lang
				}

				createFn.creteSlectTopic(topicObj);
				// 语言种类
				var lang = topicObj.lang;
				var $languageCont = $(".languageCont");
				$languageCont.empty();
				for (var i = 0; i < lang.length; i++) {
					var mt= lang[i];
					var $p = $('<p class="languageItem"></p>');
					var text = "不限";
					if (mt === 0 ||mt === '0') {
						text = "不限";
					}else if(mt === 1 || mt === '1'){
						text = "中文";
					}else if(mt === 2 || mt === '2'){
						text = "英语";
					}
					$('<a href="javascript:void(0)"></a>').text(text).appendTo($p);
					$p.attr("ucd_data",lang[i]).appendTo($languageCont);
				}
		  	   },
		  	   error:function(){
		  	     console.log("根据topicId获取关键字数据返回有问题");
		  	   }
		  	});
		}

	};
	//创建对象
	var createFn={
		// 选择显示的结构
		option:function(text,ucdId){
			var template='<div class="option">'+
				   '<p>'+
				        '<span class="optionInfo"></span>'+
				        '<span class="close"></span>'+
				    '</p>'+
				'</div>';
			var $template=$(template);
			$template.attr("ucd_id",ucdId);
			$template.find(".optionInfo").text(text);
			return $template;
		},
		// 创建来源种类
		createSource:function(data){
			var $mCont=$(".modelSpeciesCont");
			$mCont.empty();
			for (var i = 0; i < data.length; i++) {
				var it=data[i];
				var $check=$('<div class="check hide"></div>');
				$check.attr("ucd_data",it.mediaClassId);
				$check.appendTo($mCont);
				if (i === 0) {
					$check.removeClass("hide");
				}
			}
			var $speciesCheck=$('<div class="speciesCheck"></div>');
			var $tab=$('<ul class="tab"></ul>');
			$speciesCheck.appendTo($mCont);
			$tab.appendTo($speciesCheck);
			for (var i = 0; i < data.length; i++) {
				var it=data[i];
				var $searchItem=$('<li class="searchItem"></li>');
				$searchItem.attr("ucd_data",it.mediaClassId);
				$searchItem.appendTo($tab);
				$('<a href="javascript:void(0)"></a>').text(it.mediaClass+"（"+it.siteNum+"）").appendTo($searchItem);
				if (i === 0) {
					$searchItem.addClass("on");
				}
			}
			if(data.length === 1){
				$tab.addClass("hide");
			}
			var $speciesCont=$('<div class="speciesCont"></div>');
			$speciesCont.appendTo($mCont);
			for (var i = 0; i < data.length; i++) {
				var it=data[i];
				var $classify=$('<div class="classify hide"></div>');
				$classify.attr("ucd_data",it.mediaClassId);
				if (i === 0) {
					$classify.removeClass("hide");
				}
				var $allCheck=$('<p class="kindItem allCheck"></p>');
				$('<a href="javascript:void(0)" class="limitOption">不限</a>').appendTo($allCheck);
				$allCheck.attr("ucd_id","");
				$allCheck.appendTo($classify);
				var mediaData=it.mediaData;
				var dataLen=mediaData.length;
				var ulLen=Math.ceil(dataLen/8);
				for (var ui = 0; ui < ulLen; ui++) {
					var $ul=$('<ul></ul>');
					$ul.appendTo($classify);
					var dataLens=dataLen>(ui*8+8)?(ui*8+8):dataLen;
					for (var j = ui*8; j < dataLens; j++) {
						var item=mediaData[j];
						var $kindItem=$('<li class="kindItem"></li>');
						var $a=$('<a href="javascript:void(0)"></a>');
						$a.text(item.name+"（"+item.siteNum+"）");
						$a.appendTo($kindItem);
						$kindItem.attr("ucd_id",item.id);
						$kindItem.appendTo($ul);
					}

				}
				$classify.appendTo($speciesCont);
			}
		},
		// 创建地域
		createArea:function(data){
			var $mCont=$(".modelAearCont");
			$mCont.empty();
			for (var i = 0; i < data.length; i++) {
				var it=data[i];
				var $check=$('<div class="check hide"></div>');
				$check.attr("ucd_data",it.areaTypeId);
				$check.appendTo($mCont);
				if (i === 0) {
					$check.removeClass("hide");
				}
			}
			var $speciesCheck=$('<div class="speciesCheck"></div>');
			var $tab=$('<ul class="tab"></ul>');
			$speciesCheck.appendTo($mCont);
			$tab.appendTo($speciesCheck);
			for (var i = 0; i < data.length; i++) {
				var it=data[i];
				var $searchItem=$('<li class="searchItem"></li>');
				$searchItem.attr("ucd_data",it.areaTypeId);
				$searchItem.appendTo($tab);
				$('<a href="javascript:void(0)"></a>').text(it.areaType+"（"+it.siteNum+"）").appendTo($searchItem);
				if (i === 0) {
					$searchItem.addClass("on");
				}
			}
			if(data.length === 1){
				$tab.addClass("hide");
			}
			var $speciesCont=$('<div class="speciesCont"></div>');
			$speciesCont.appendTo($mCont);
			for (var i = 0; i < data.length; i++) {
				var it=data[i];
				var $classify=$('<div class="classify hide"></div>');
				$classify.attr("ucd_data",it.areaTypeId);
				if (i === 0) {
					$classify.removeClass("hide");
				}
				var $allCheck=$('<p class="kindItem allCheck"></p>');
				$('<a href="javascript:void(0)" class="limitOption">全国性质</a>').appendTo($allCheck);
				$allCheck.attr("ucd_id","");
				$allCheck.appendTo($classify);
				var areaData=it.areaData;
				var dataLen=areaData.length;
				var ulLen=Math.ceil(dataLen/8);
				for (var ui = 0; ui < ulLen; ui++) {
					var $ul=$('<ul></ul>');
					$ul.appendTo($classify);
					var dataLens=dataLen>(ui*8+8)?(ui*8+8):dataLen;
					for (var j = ui*8; j < dataLens; j++) {
						var item=areaData[j];
						var $kindItem=$('<li class="kindItem"></li>');
						var $a=$('<a href="javascript:void(0)"></a>');
						$a.text(item.area+"（"+item.siteNum+"）");
						$a.appendTo($kindItem);
						$kindItem.attr("ucd_id",item.id).attr("ucd_type",item.type);
						$kindItem.appendTo($ul);
					}

				}
				$classify.appendTo($speciesCont);
			}
		},
		// 创建话题列表
		createTopicList:function(data){
			var $toplicCont=$(".toplicCont");
			$toplicCont.empty();
			for (var i = 0; i < data.length; i++) {
				var dt=data[i];
				var $topicList=$('<label class="topicList" >');
				$topicList.attr("topic_id",dt.id);
				$input=$('<input type="radio" name="topicListItem" class="topicListItem">');
				if (i === 0) {
					$input.attr("checked","checked");
				}
				$input.appendTo($topicList);
				$(' <span class="topicListText"></span>').text(dt.name).appendTo($topicList);
				$topicList.appendTo($toplicCont);
			}
		},
		// 创建topicKey
		createTopicKey:function(result){
			$(".codeTopicKey").val(result.data.keyword);
		},
		createSearch:function(result){
			var lan={0:"不限",1:"中文",2:"英文"};
			var data=result.data;
			var $searchListCont=$(".searchListCont");
			var $result=$(".result");
			if (!data) {
				$result.addClass("hide");
			}else{
				$searchListCont.empty();
				for (var i = 0; i < data.length; i++) {
					var dt=data[i];
					var $searchListTr=$('<tr class="searchListTr">');
					$(' <td class="searchBodyList"><input type="checkbox" class="searchBodyCheckbox"></td>').appendTo($searchListTr);
					$('<td class="searchBodyList searchSiteName"></td>').text(dt.siteName).appendTo($searchListTr);
					$('<td class="searchBodyList"></td>').text(dt.source).appendTo($searchListTr);
					$('<td class="searchBodyList"></td>').text(dt.area).appendTo($searchListTr);
					var language=dt.lang;
					$('<td class="searchBodyList"></td>').text(lan[language]).appendTo($searchListTr);
					$searchListTr.attr("search_id",dt.siteId).appendTo($searchListCont);
				}
			}
			var $selectSearchList=$(".selectSearchList");
			if ($selectSearchList && $selectSearchList.length) {
				for(var i=0;i<$selectSearchList.length;i++){
					var $item=$selectSearchList.eq(i);
					var searchId=$item.attr("search_id");
					$(".searchListTr[search_id='"+searchId+"']").find(".searchBodyCheckbox").attr("checked","checked");
				}
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
				var $pageItem=$('<li class="pageItem">');
				$pageItem.text(len);
				$pageItem.attr("page_id",len);
				if (i === 0) {
					$pageItem.addClass("on");
				}
				$pageItem.appendTo($pageWidth);
			}
		},
		// 创建话题
		creteSlectTopic:function(topicObj){
			var $resourceCont=$('.resourceCont');
			$resourceCont.empty();
			var $areaCont = $(".areaCont");
			$areaCont.empty();

			//来源种类
			var mediaClassz = topicObj.mediaClassz;

			if (mediaClassz && mediaClassz.length) {
				for (var i = 0; i < mediaClassz.length; i++) {
					var mt = mediaClassz[i];
					var $mediaItem = $('<div class="mediaItem"></div>');
					var $mediaClasszItem = $('<div class ="mediaClasszItem resourceItem"></div>');
					$mediaClasszItem.attr('ucd_data',mt.id).text(mt.name);
					$mediaClasszItem.appendTo($mediaItem);
					var $mediasCon = $('<div class = "mediasCon"></div>');
					$mediasCon.appendTo($mediaItem);
					var medias = topicObj.medias[i];
					for (var x = 0; x < medias.length;x++) {
						var xt = medias[x];
						var $mediaTypeItem = $('<div class ="mediaTypeItem clazzItem"></div>');
						$mediaTypeItem.attr('ucd_data',xt.id).text(xt.name);
						$mediaTypeItem.appendTo($mediasCon);
					}

					$mediaItem.appendTo($resourceCont);
				}
			}


			var areaTypes = topicObj.areaTypes;
			if (areaTypes && areaTypes.length) {
				for (var i = 0; i < areaTypes.length; i++) {
					var mt = areaTypes[i];
					var $areaTypeItem = $('<div class="areaTypeItem"></div>');
					var $areaTypesItem = $('<div class ="areaTypesItem resourceItem"></div>');
					$areaTypesItem.attr('ucd_data',mt.id).text(mt.name);
					$areaTypesItem.appendTo($areaTypeItem);
					var $areaTypesItemCon = $('<div class = "areaTypesItemCon"></div>');
					$areaTypesItemCon.appendTo($areaTypeItem);
					var areas = topicObj.areas[i];
					for (var x = 0; x < areas.length;x++) {
						var xt = areas[x];
						var $areasItem = $('<div class ="areasItem clazzItem"></div>');
						$areasItem.attr('ucd_data',xt.id).text(xt.name);
						$areasItem.appendTo($areaTypesItemCon);
					}
					$areaTypeItem.appendTo($areaCont);
				}
			}
			/*var mediaClassNames = result.data.mediaClassNames;
			var mediaClassIds = result.data.mediaClassIds;
			var $resourceCont = $(".resourceCont");
			$resourceCont.empty();
			for (var i = 0; i < mediaClassNames.length; i++) {
				var mt= mediaClassNames[i];
				var $p = $('<p class="resourceItem"></p>');
				$('<a href="javascript:void(0)"></a>').text(mt).appendTo($p);
				$p.attr("ucd_data",mediaClassIds[i]).appendTo($resourceCont);
			}*/

				//地域种类
				/*var areaTypeNames = result.data.areaTypeNames;
				var areaIds = result.data.areaIds;
				var $areaCont = $(".areaCont");
				$areaCont.empty();
				for (var i = 0; i < areaTypeNames.length; i++) {
					var mt= areaTypeNames[i];
					var $p = $('<p class="areaItem"></p>');
					$('<a href="javascript:void(0)"></a>').text(mt).appendTo($p);
					$p.attr("ucd_data",areaIds[i]).appendTo($areaCont);
				}*/

				
		}
	};
	 // 判断是否是编辑页面进入页面
    var localUrl = window.location.href;
    if (localUrl.indexOf("topicId") >= 0) {
    	var localUrlArray = localUrl.split("?");
    	var topicId = (localUrlArray[1].split("="))[1];
    	getDataObj.getTopicInfo(userId,topicId);
    }
	getDataObj.init();
	// 更改搜索设置点击事件
	$(document).off("click.updateSearchBtn").on("click.updateSearchBtn",".updateSearchBtn",function(){
		$(".updateSearchCont").removeClass("hide");
		$(".editCont").addClass("hide");

	});
	// 更改搜索设置后的保存事件
	$(document).off("click.searchSave").on("click.searchSave",".searchSave",function(){
		$(".updateSearchCont").addClass("hide");
		$(".editCont").removeClass("hide");
	});
	//来源种类分类选择
	$(document).off("click.searchItem").on("click.searchItem",".searchItem",function(e){
		var $target=$(e.currentTarget);
		var ucdData=$target.attr("ucd_data");
		var $speciesCheck=$target.closest(".speciesCheck");
		var $check=$speciesCheck.siblings(".check");
		for (var i = 0; i < $check.length; i++) {
			var $item=$check.eq(i);
			var data=$item.attr("ucd_data");
			if (data === ucdData ) {
				$item.removeClass("hide");
				$item.siblings(".check").addClass("hide");
			}
		}
		var $speciesCont=$speciesCheck.siblings(".speciesCont");
		var $classify=$speciesCont.find(".classify");
		for (var i = 0; i < $classify.length; i++) {
			var $item=$classify.eq(i);
			var data=$item.attr("ucd_data");
			if (data === ucdData ) {
				$item.removeClass("hide");
				$item.siblings(".classify").addClass("hide");
			}
		}
		$target.addClass("on").siblings(".searchItem").removeClass("on");
	});
	//来源种类选择事件
	$(document).off("click.kindItem").on("click.kindItem",".kindItem",function(e){
		var $target=$(e.currentTarget);
		if ($target.hasClass("kindSelected")) {
			return;
		}else{
			$target.addClass("kindSelected");
			var $classify=$target.closest(".classify");
			var $check=$target.closest(".speciesCont").siblings(".check");
			var num=$classify.attr("ucd_data");
			if ($target.hasClass("allCheck")) {
				var allText=$target.find("a").text();
				var ucdId=$target.attr("ucd_id");
				for (var i = 0; i < $check.length; i++) {
					var $item=$check.eq(i);
					var checkData=$item.attr("ucd_data");
					if (num === checkData) {
						$item.empty();
						var $option=createFn.option(allText,ucdId);
						$option.addClass("optionAll");
						$option.appendTo($item);
						$classify.find(".kindItem").removeClass("kindSelected");
						$target.addClass("kindSelected");
					}
				}
			}else{
				var text=$target.find("a").text();
				var ucdId=$target.attr("ucd_id");
				for (var i = 0; i < $check.length; i++) {
					var $item=$check.eq(i);
					var checkData=$item.attr("ucd_data");
					if (num === checkData) {
						$item.find(".optionAll").remove();
						var $option=createFn.option(text,ucdId);
						$option.appendTo($item);
						$classify.find(".allCheck").removeClass("kindSelected");
					}
				}
			}
		}
	});
	//其他类选择事件
	$(document).off("click.otherItem").on("click.otherItem",".otherItem",function(e){
		var $target=$(e.currentTarget);
		if ($target.hasClass("kindSelected")) {
			return;
		}else{
			$target.addClass("kindSelected");
			var $classify=$target.closest(".classify");
			var $check=$classify.siblings(".check");
			if ($target.hasClass("allCheck")) {
				var allText=$target.find("a").text();
				var ucdId=$target.attr("ucd_id");
				$check.empty();
				var $option=createFn.option(allText,ucdId);
				$option.addClass("optionAll");
				$option.appendTo($check);
				$classify.find(".otherItem").removeClass("kindSelected");
				$target.addClass("kindSelected");
			
			}else{
				var text=$target.find("a").text();
				var ucdId=$target.attr("ucd_id");
				$check.find(".optionAll").remove();
				var $option=createFn.option(text,ucdId);
				$option.appendTo($check);
				$classify.find(".allCheck").removeClass("kindSelected");
			}
		}
	});
	// 来源种类删除事件和地域删除事件
	$(document).off("click.close").on("click.close",".publicCont .close",function(e){
		var $target=$(e.currentTarget);
		var $option=$target.closest(".option");
		var ucdId=$option.attr("ucd_id");
		var $check=$target.closest(".check");
		var ucdData=$check.attr("ucd_data");
		$option.remove();
		var $classify=$check.siblings(".speciesCont").find(".classify");
		for (var i = 0; i < $classify.length; i++) {
			var $item=$classify.eq(i);
			var itemData=$item.attr("ucd_data");
			if (itemData === ucdData) {
				var $kindItem=$item.find(".kindItem");
				for (var j = 0; j < $kindItem.length;j++) {
					var $kind=$kindItem.eq(j);
					var kindId=$kind.attr("ucd_id");
					if (kindId === ucdId) {
						$kind.removeClass("kindSelected");
					}
				}
			}
		}
	});
	// 语言删除事件
	$(document).off("click.langeClose").on("click.langeClose",".modelLanguage .close",function(e){
		var $target=$(e.currentTarget);
		closeOthers($target);
	});
	// 复制已有话题关键字
    $(document).off("click.copy").on("click.copy",".copy",function(e){
        $( '.copy_a' ).show();
        getDataObj.getAllTopic();
    });
    // 复制话题确认事件
    $(document).off("click.copySureBtn").on("click.copySureBtn",".copySureBtn",function(e){
       var $target=$(e.currentTarget);
       var $copy=$target.closest(".copy_a");
       $copy.hide();
       var topicId=$(".topicListItem:checked").closest(".topicList").attr("topic_id");
       getDataObj.getTopicKey(userId,topicId);

    });
    // 复制话题取消事件
    $(document).off("click.copyCancleBtn").on("click.copyCancleBtn",".copyCancleBtn",function(e){
       var $target=$(e.currentTarget);
       var $copy=$target.closest(".copy_a");
       $copy.hide();
    });
    function getMedia(topicObj){
    	var $modelSpeciesCont=$(".modelSpeciesCont");
		var $searchItem=$modelSpeciesCont.find(".searchItem");
		var $speciesCheck = $modelSpeciesCont.find('.speciesCheck');
		var $check = $modelSpeciesCont.find('.check');
		if ($check) {
			topicObj.mediaClassz = [];
			topicObj.medias = [];
			for (var i = 0; i < $check.length; i++) {
				var $ct = $check.eq(i);
				var $option = $ct.find('.option');
				var typeArray = [];
				if ($option &&$option[0] && !$option.hasClass('optionAll')) {
					var checkId = $ct.attr('ucd_data');
					var $searchItem = $speciesCheck.find('.searchItem[ucd_data='+checkId+']');
					var searchName = $searchItem.find('a').text();
					topicObj.mediaClassz.push({id:checkId,name:searchName});
					for (var z = 0; z < $option.length; z++) {
						var $oz = $option.eq(z);
						var ozId = $oz.attr('ucd_id');
						var ozName = $oz.find('.optionInfo').text();
						typeArray.push({id:ozId,name:ozName});
					}
					topicObj.medias.push(typeArray);
				}
			}
		}
		return topicObj;
    }
    function getArea(topicObj) {
    	var $modelArea=$(".modelArea");
		var $modelAearCont = $modelArea.find('.modelAearCont');
		var $speciesCheck = $modelAearCont.find('.speciesCheck');
		var $check = $modelAearCont.find('.check');
		if ($check) {
			topicObj.areaTypes = [];
			topicObj.areas = [];
			for (var i = 0; i < $check.length; i++) {
				var $ct = $check.eq(i);
				var $option = $ct.find('.option');
				var typeArray = [];
				if ($option &&$option[0] && !$option.hasClass('optionAll')) {
					var checkId = $ct.attr('ucd_data');
					var $searchItem = $speciesCheck.find('.searchItem[ucd_data='+checkId+']');
					var searchName = $searchItem.find('a').text();
					topicObj.areaTypes.push({id:checkId,name:searchName});
					for (var z = 0; z < $option.length; z++) {
						var $oz = $option.eq(z);
						var ozId = $oz.attr('ucd_id');
						var ozName = $oz.find('.optionInfo').text();
						typeArray.push({id:ozId,name:ozName});
					}
					topicObj.areas.push(typeArray);
				}
			}
		}
		return topicObj;
    }
	// search保存页面操作
	$(document).off("click.searchSave").on("click.searchSave",".operate .searchSave",function(e){
		var $target=$(e.currentTarget);
		var $w=$target.closest(".w").siblings(".w");
		var $modelSpecies=$w.find(".modelSpecies");
		// 来源种类
		var topicObj = {};
		var $resourceCont=$(".resourceCont");
		$resourceCont.empty();
		var $areaCont=$(".areaCont");
		$areaCont.empty();
		topicObj = getMedia(topicObj);
		// 地域
		topicObj = getArea(topicObj);
	/*	if (true) {}

		for(var i=0;i<$searchItem.length;i++){
			var $item=$searchItem.eq(i);
			var ucdData=$item.attr("ucd_data");
			var ucdText=$item.find("a").text();
			var $resourceItem=$('<p class="resourceItem">');
			$('<a href="javascript:void(0)">').text(ucdText).appendTo($resourceItem);
			$resourceItem.attr("ucd_data",ucdData).appendTo($resourceCont);
		}*/





		/*var $searchItem=$modelArea.find(".searchItem");
		$areaCont.empty();
		for(var i=0;i<$searchItem.length;i++){
			var $item=$searchItem.eq(i);
			var ucdData=$item.attr("ucd_data");
			var ucdText=$item.find("a").text();
			var $resourceItem=$('<p class="resourceItem">');
			$('<a href="javascript:void(0)">').text(ucdText).appendTo($resourceItem);
			$resourceItem.attr("ucd_data",ucdData).appendTo($areaCont);
		}*/
		createFn.creteSlectTopic(topicObj);
		// 语言
		var $languageCont=$(".languageCont");
		var $modelLanguage=$(".modelLanguage");
		var $option=$modelLanguage.find(".option");
		$languageCont.empty();
		if ($option && $option.length) {
			for(var i=0;i<$option.length;i++){
				var $item=$option.eq(i);
				var ucdData=$item.attr("ucd_id");
				var ucdText=$item.find(".optionInfo").text();
				var $resourceItem=$('<p class="resourceItem">');
				$('<a href="javascript:void(0)">').text(ucdText).appendTo($resourceItem);
				$resourceItem.attr("ucd_data",ucdData).appendTo($languageCont);
			}
		}
		// 网站来源
		var $selectSearchList=$(".selectSearchList");
		var siteName="";
		if ($selectSearchList && $selectSearchList.length) {
			for(var i=0;i<$selectSearchList.length;i++){
				var $item=$selectSearchList.eq(i);
				var searchId=$item.attr("search_id");
				var text=$item.text();
				if (i === $selectSearchList.length -1) {
					siteName+=text;
				}else{
					siteName+=text+";";
				}
			}
		}
		$(".copeSiteName").text(siteName);
		$(".updateSearchCont").addClass("hide");
		$(".editCont").removeClass("hide");
	});
	// 编辑页面保存操作
	$(document).off("click.editSava").on("click.editSava",".editSava",function(e){	
		var topicName=$(".ar_name").val();
		var type=parseInt($(".radio:checked").attr("data_id"));
		var keywords=$(".codeTopicKey").val();
		/*// 媒体大类id
		var $modelSpeciesCont=$(".modelSpeciesCont");
		var mediaClassIds=getAllId($modelSpeciesCont).bidId;
		//媒体小类id
		var mediaIds=getAllId($modelSpeciesCont).smallId;
		//地域类别ID
		var $modelArea=$(".modelArea");
		var areaTypeIds=getAllId($modelArea).bidId;
		//地域ID
		var areaIds=getAllId($modelArea).smallId;*/
		var topicObj = {};
		topicObj = getMedia(topicObj);
		// 地域
		topicObj = getArea(topicObj);
		
		// 增量来源
		var $selectSearchList=$(".selectSearchList");
		var siteIds="";
		if ($selectSearchList && $selectSearchList.length) {
			for(var i=0;i<$selectSearchList.length;i++){
				var $item=$selectSearchList.eq(i);
				var searchId=$item.attr("search_id");
				var text=$item.text();
				//siteIds.push(searchId);
				if (i === $selectSearchList.length -1) {
					siteIds+=searchId;
				}else{
					siteIds+=searchId+",";
				}
			}
		}
		// 语言
		var lang=0;
		var $modelLanguage=$(".modelLanguage");
		var $option=$modelLanguage.find(".option");
		if ($option && $option.length) {
			for(var i=0;i<$option.length;i++){
				var $item=$option.eq(0);
				var ucdData=$item.attr("ucd_id");
				lang = parseInt(ucdData);
			}
		}
		/*console.log("topicName:"+topicName+"-"+"type:"+type+"-"+
			"keywords:"+keywords+"-"+"mediaClassIds:"+mediaClassIds+"-"+
			"mediaIds:"+mediaIds+"-"+"areaTypeIds:"+areaTypeIds+"-"+"areaIds:"+areaIds+"-"+
			"siteIds:"+siteIds+"-"+"lang:"+lang);*/
		// 处理大类媒体信息
		var newMediaClassz = [];
		if (topicObj.mediaClassz && topicObj.mediaClassz.length) {
			for(var i = 0;i<topicObj.mediaClassz.length;i++){
				var it = topicObj.mediaClassz[i];
				newMediaClassz.push(parseInt(it.id));
			}
		}
		// 处理小类媒体信息
		var newMedias = [];
		if (topicObj.medias && topicObj.medias.length) {
			for(var i = 0;i<topicObj.medias.length;i++){
				var it = topicObj.medias[i];
				var arr = [];
				for(var j = 0;j<it.length;j++){
					var jt = it[j];
					arr.push(parseInt(jt.id));
				}
				newMedias.push(arr);
			}
		}
		// 处理大类地域信息
		var newAreaTypes = [];
		if (topicObj.areaTypes && topicObj.areaTypes.length) {
			for(var i = 0;i<topicObj.areaTypes.length;i++){
				var it = topicObj.areaTypes[i];
				newAreaTypes.push(parseInt(it.id));
			}
		}
		// 处理小类地域信息
		var newAreas = [];
		if (topicObj.areas && topicObj.areas.length) {
			for(var i = 0;i<topicObj.areas.length;i++){
				var it = topicObj.areas[i];
				var arr = [];
				for(var j = 0;j<it.length;j++){
					var jt = it[j];
					arr.push(parseInt(jt.id));
				}
				newAreas.push(arr);
			}
		}
		getDataObj.getSaveData(userId,topicId,topicName,type,keywords,newMediaClassz,newMedias,newAreaTypes,newAreas,siteIds,lang);
		window.open("monitor_platform.html");
	});
	// 搜索框search事件
	$(document).off("click.search").on("click.search",".search",function(e){
		var $target=$(e.currentTarget);
		var val=$target.siblings(".name").val() || "test001";
		$(".result").removeClass("hide");
		getDataObj.getSearchData(userId,20,1,val);
	});
	// 搜索页面重置事件
	$(document).off("click.searchBack").on("click.searchBack",".searchBack",function(e){
		// 处理来源种类
		var $modelSpeciesCont = $(".modelSpeciesCont");
		$modelSpeciesCont.find(".check").addClass("hide").empty();
		$modelSpeciesCont.find(".check").eq(0).removeClass("hide");
		var $speciesCheck = $modelSpeciesCont.find(".speciesCheck");
		$speciesCheck.find(".searchItem").removeClass("on");
		$speciesCheck.find(".searchItem").eq(0).addClass("on");
		var $speciesCont = $modelSpeciesCont.find(".speciesCont");
		var $classify = $speciesCont.find(".classify");
		$classify.removeClass("hide");
		$classify.eq(0).addClass("hide");
		$speciesCont.find(".kindItem").removeClass(".kindSelected");

		// 处理地域
		var $modelAearCont = $(".modelAearCont");
		$modelAearCont.find(".check").addClass("hide").empty();
		$modelAearCont.find(".check").eq(0).removeClass("hide");
		var $speciesCheck = $modelAearCont.find(".speciesCheck");
		$speciesCheck.find(".searchItem").removeClass("on");
		$speciesCheck.find(".searchItem").eq(0).addClass("on");
		var $speciesCont = $modelAearCont.find(".speciesCont");
		var $classify = $speciesCont.find(".classify");
		$classify.removeClass("hide");
		$classify.eq(0).addClass("hide");
		$speciesCont.find(".kindItem").removeClass(".kindSelected");

		// 处理语言
		var $modelLanguage = $(".modelLanguage");
		$modelLanguage.find(".check").empty();
		$modelLanguage.find(".otherItem").removeClass(".kindSelected");

		// 搜索结果处理
		$searchSelectCont = $(".searchSelectCont");
		$searchSelectCont.find(".selectedContainer").empty();
		$searchSelectCont.addClass("hide");
		$(".searchInput").val("");
		$(".result").addClass("hide");
		$(".searchListCont").empty();
	});
	// tbody checkBox事件
	$(document).off("change.searchBodyCheckbox").on("change.searchBodyCheckbox",".searchBodyCheckbox",function(e){
		var $target=$(e.currentTarget);
		$(".searchSelectCont").removeClass("hide");
		var $selectedContainer=$(".selectedContainer");
		var $searchListTr=$target.closest(".searchListTr");
		var searchId=$searchListTr.attr("search_id");
		$selectSearchList=$selectedContainer.find(".selectSearchList");
		if ($target.is(":checked")) {
			var siteName=$searchListTr.find(".searchSiteName").text();
			var $selectSearchList=$('<div class="selectSearchList">');
			$selectSearchList.attr("search_id",searchId);
			$selectSearchList.text(siteName);
			$selectSearchList.appendTo($selectedContainer);
		}else{
			var $currentList=$selectedContainer.find(".selectSearchList[search_id='"+searchId+"']");
			$currentList.remove();
			$selectSearchList=$selectedContainer.find(".selectSearchList");
			if (!$selectSearchList.length) {
				$(".searchSelectCont").addClass("hide");
			}

		}	
	});
	// 上下页码点击
	$(document).off("click.pageSetting").on("click.pageSetting",".pageSetting",function(e){
		var $target=$(e.currentTarget);
		var $pageCont=$target.siblings(".pageCont");
		var $pageItem=$pageCont.find(".pageItem");
		var $showPage=$target.siblings(".show_page");
		var pageNum=parseInt($showPage.val());
		var len=$pageItem.length;
		var siteName=$(".searchInput").val();
		var $pageWidth=$pageCont.find(".pageWidth");
		var marginleft=parseInt($pageWidth.css("margin-left"));
		for (var i = 0; i < len; i++) {
			var $item=$pageItem.eq(i);
			if ($item.hasClass("on")) {
				if ($target.hasClass("next")) {
					if (i < len-1) {
						var $upItem=$pageItem.eq(i+1);
						$upItem.addClass("on").siblings(".pageItem").removeClass("on");
						var pageId=$upItem.attr("page_id");
						getDataObj.getSearchData(userId,pageNum,pageId,siteName,"key");
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
						getDataObj.getSearchData(userId,pageNum,pageId,siteName,"key");
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
		var $showPage=$(".show_page");
		var pageNum=parseInt($showPage.val());
		$target.addClass("on").siblings(".pageItem").removeClass("on");
		var pageId=parseInt($target.attr("page_id"));
		var siteName=$(".searchInput").val();
		getDataObj.getSearchData(userId,pageNum,pageId,siteName,"key");
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
		var $showPage=$(".show_page");
		var pageNum=parseInt($showPage.val());
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
		var siteName=$(".searchInput").val();
		getDataObj.getSearchData(userId,pageNum,pageId,siteName,"key");
		var marginleft=-Math.floor((index-1)/5)*150;
		$pageWidth.css("margin-left",marginleft+"px");
	});
	// 页面下拉选择事件
	$(document).off("change.show_page").on("change.show_page",".show_page",function(e){
		var $target=$(e.currentTarget);
		var pageNum=parseInt($target.val());
		var $pageItem=$(".pageItem");
		var $needItem=$pageItem.eq(0);
		$(".goPageNum").val("");
		$needItem.addClass("on").siblings(".pageItem").removeClass("on");
		var siteName=$(".searchInput").val();
		getDataObj.getSearchData(userId,pageNum,1,siteName);
		var $pageWidth=$(".pageWidth");
		$pageWidth.css("margin-left",0);
	});
	// 地域、语言删除事件
	function closeOthers($target){
		var $option=$target.closest(".option");
		var ucdId=$option.attr("ucd_id");
		var $check=$target.closest(".check");
		$option.remove();
		var $classify=$check.siblings(".classify");
		var $otherItem=$classify.find(".otherItem");
		for (var j = 0; j < $otherItem.length;j++) {
			var $kind=$otherItem.eq(j);
			var kindId=$kind.attr("ucd_id");
			if (kindId === ucdId) {
				$kind.removeClass("kindSelected");
			}
		}
	}
    // 来源/媒体 大类、小类Id
    function getAllId($obj){
    	var bidId="";
    	var smallId="";
    	var $searchItem=$obj.find(".searchItem");
		for(var i=0;i<$searchItem.length;i++){
			var $item=$searchItem.eq(i);
			var ucdData=$item.attr("ucd_data");
			if (i === $searchItem.length -1) {
					bidId+=ucdData;
			}else{
				bidId+=ucdData+",";
			}
		}
		var $check=$obj.find(".check");
		for(var i=0;i < $check.length;i++){
			var $item=$check.eq(i);
			var $option=$item.find(".option");
			if ($option && $option.length) {
				for (var j = 0; j < $option.length; j++) {
					var $opt=$option.eq(j);
					var dataId=$opt.attr("ucd_id");
					if (i === $opt.length -1) {
						smallId+=dataId;
					}else{
						smallId+=dataId+",";
					}
				}
			}
		}
		var obj={bidId:bidId,smallId:smallId};
		return obj;
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

	// 点击退出
	$(document).off("click.out").on("click.out",".out",function(e){
		window.location.href = "home.html";
	});

});

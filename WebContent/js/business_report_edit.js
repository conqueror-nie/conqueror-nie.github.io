$(function () {
  // 用户判断
  var userId = $.cookie('userId');
  if (!userId) {
    window.location.href = "home.html";
  }
  var userName = $.cookie('username') || "Admin";
  $('#userNameId').text(userName);
  var publicObj = new PublicObj();
  var rootUrl = publicObj.url;
  var req_data = "";
  /*  var userId = getCookie("userId");
      if(userId==null){//没有就跳转到登录界面
         window.location.href="log_in.html";
      }*/

  // 导图
  /**

       var file = this.files[0];
    //没点图片就退出
    if(!file){
      return;
    }
    if (file&&!file.type.indexOf("image") == 0) { 
      alert('文件"' + file.name + '"不是图片'); 
    }else if (file&&file.size >= 1024*1024/2) {
      alert('您这张"'+ file.name +'"图片大小过大，应小于2M');  
      return;
    }
  **/
  //获取数据共有对象
  var getDataObj = {
    // 获取logo数据
    getEditLogoData: function (userId, topicId, time) {
      req_data = { "ticket": userId, "topicId": topicId, time: time };
      console.log("获取logo数据-->" + JSON.stringify(req_data));
      $.ajax({
        //url:rootUrl+"/businessReportEditController/getEditLogoData.do",
        url: rootUrl + "",
        type: "post",
        data: JSON.stringify(req_data),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
          //数据处理函数
          createPublicObj.createLogo(result);
        },
        error: function () {
          console.log("获取logo数据");
        }
      });
    },
    // 获取发布量数据
    getTotalNum: function (userId, topicIds, start, end, type, interfaceType) {
      req_data = { "ticket": userId, "topicIds": topicIds, "start": start, "end": end, "type": type, "interfaceType": interfaceType };
      //console.log("getTotalNum-->ticket="+userId+",topicIds="+topicIds+",start="+start+",end="+end+",type="+type+",interfaceType="+interfaceType);
      console.log("获取发布量数据-->" + JSON.stringify(req_data));
      $.ajax({
        url: rootUrl + "/analysis/topicsSentiAnalysis",
        type: "post",
        data: JSON.stringify(req_data),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (result) {
          //数据处理函数
          if (interfaceType === 1) {
            createPublicObj.createTotalCompare(result);
          } else if (interfaceType === 2) {
            //情感类型
            createPublicObj.createEmotionData(result);
          }
        },
        error: function () {
          console.log("发布总量获取失败");
        }
      });
    },
    // 简单图表数据获取
    getchartData: function (ticket, topicId, start, end, type, interfaceType) {
      req_data = { "ticket": ticket, "topicId": topicId, "start": start, "end": end, "type": type, "interfaceType": interfaceType };
      console.log("简单图表数据获取-->" + JSON.stringify(req_data));
      $.ajax({
        url: rootUrl + "/analysis/simpleChart",
        type: "post",
        data: JSON.stringify(req_data),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
          //var data=result.data;
          //createPublicObj.createTopic(data); 	
          if (interfaceType === 3) {
            // 媒体类型
            createPublicObj.createMediaType(result);
          } else if (interfaceType === 4) {
            //百度媒体类型统计
            createPublicObj.createBaiduData(result);
          } else if (interfaceType === 5) {
            // 地域类型饼状图
            createPublicObj.createArePieData(result);
          } else if (interfaceType === 6) {
            //城市级别统计
            createPublicObj.createCityData(result);
          } else if (interfaceType === 8) {
            //情感类型饼状图
            createPublicObj.cerateEmotionPieData(result);
          }
        },
        error: function () {
          console.log("简单图表数据获取");
        }
      });
    },
    // 情感类型的媒体类型
    getEmotionchartData: function (userId, topicId, start, end, type, interfaceType) {
      req_data = { "ticket": userId, "topicId": topicId, "start": start, "end": end, "type": type, "interfaceType": interfaceType };
      console.log("情感类型的媒体类型-->" + JSON.stringify(req_data));
      $.ajax({
        url: rootUrl + "/analysis/simpleChart",
        type: "post",
        data: JSON.stringify(req_data),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
          //数据处理函数
          createPublicObj.cerateEmotionPieData(result);
        },
        error: function () {
          console.log("情感类型的媒体类型数据有误");
        }
      });
    },
    //获取新闻详情
    getDataSummary: function (topicId) {
      req_data = { "ticket": userId, "topicId": topicId };
      $.ajax({
        url: rootUrl + "/business/newsList",
        type: "post",
        //data:{"ticket":ticket,"topicId":topicId,day:day},
        data: JSON.stringify(req_data),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
          //数据处理函数
          createPublicObj.createDataSummary(result);
        },
        error: function () {
          console.log("获取新闻详情");
        }
      });
    },
    // 获取新闻截图
    getNewData: function (ticket, topicId, time) {
      req_data = { "ticket": userId };
      console.log("获取新闻截图-->" + JSON.stringify(req_data));
      $.ajax({
        //url:rootUrl+"/businessReportEditController/getNewData.do",
        url: rootUrl + "",
        type: "post",
        //data:{"ticket":userId,"topicId":topicId,time:time},
        data: JSON.stringify(req_data),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
          //数据处理函数
          createPublicObj.createNews(result);
        },
        error: function () {
          console.log("获取新闻截图数据返回有问题");
        }
      });
    },
    // 保存商情报告
    setSaveData: function (topicId, time, html) {
      req_data = { "ticket": userId, "topicId": topicId, "date": time, "html": html };
      console.log("保存商情报告-->" + JSON.stringify(req_data));
      $.ajax({
        url: rootUrl + "/business/saveReport",
        type: "post",
        data: JSON.stringify(req_data),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
          if (result.status == 0) {
            alert(result.msg);
            window.location.href = "business_report.html?topicId=" + topicId;
          } else {
            alert("保存失败");
          }

        },
        error: function () {
          console.log("保存商情报告有误");
        }
      });
    }

  };
  //创建共有对象
  var createPublicObj = {
    //创建logo
    createLogo: function (result) {
      var data = result.data;
      $('.logoImg').attr("src", data.logoUrl).attr("image_id", data.logoId);
      $(".tex-edit").text(data.review);
    },
    // 折线图
    createTotalCompare: function (result) {
      var chartData = result.data.chartData;
      var series = [];
      for (var i = 0; i < chartData.length; i++) {
        var dt = chartData[i];
        var resnum = dt.resnum;
        var charName = dt.charName;
        var charId = dt.charId;
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
          data: result.legend
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        // 下载按钮
        /**toolbox: {
          feature: {
            saveAsImage: {

            }

          },

        },
        **/
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: result.data.xAxis
        },
        yAxis: {
          show: true,
          name: "",
          type: 'value',
        },
        animation: false,
        //stack 数据堆叠，同个类目轴上系列配置相同的stack值后，后一个系列的值会在前一个系列的值上相加
        series: series
      };
      $('.editLinearChar').empty();
      var myChart = echarts.init($('.editLinearChar')[0]);
      myChart.setOption(option);
      var dataImg = getFullCanvasDataURL('editLinearChar');
      var $picItem = $('.editLinearChar').siblings('.picItem');
      $picItem.removeClass('hide').find('img').attr('src', dataImg);
      $('.editLinearChar').remove();
    },
    //媒体类型发布量统计
    createMediaType: function (result) {
      var chartData = result.data.data;
      var title = [];
      var data = [];
      var series = [];
      for (var i = chartData.length - 1; i >= 0; i--) {
        var cd = chartData[i];
        title.push(cd.name);
        data.push(cd.value);
      }
      series.push({
        "name": "媒体类型发布量", "type": "bar", "data": data,
        "itemStyle": {
          normal: {
            color: function (params) {
              var colorList = [
                '#e496e5', '#8495ef', '#c08de3', '#51c1b9', '#57b4ec',
                '#ef84a7', '#ed86e9', '#ef9d84', '#50c170', '#f58172'
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
        /** toolbox: {
          feature: {

            // 类型切换
            magicType: {
              show: true,
              type: ["bar"]
            },
            saveAsImage: {

            }
          },
        },
        **/
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        animation: false,
        yAxis: {
          type: 'category',
          data: title
        },
        //stack 数据堆叠，同个类目轴上系列配置相同的stack值后，后一个系列的值会在前一个系列的值上相加
        series: series
      };
      var $mediaType = $('.mediaType');
      var myChart = echarts.init($mediaType[0]);
      myChart.setOption(option);


      var dataImg = getFullCanvasDataURL('mediaType');
      var $picItem = $('.mediaType').siblings('.picItem');
      $picItem.removeClass('hide').find('img').attr('src', dataImg);
      $('.mediaType').remove();
    },
    //百度媒体类型统计
    createBaiduData: function (result) {
      var chartData = result.data.data;
      var title = [];
      var data = [];
      var series = [];
      for (var i = chartData.length - 1; i >= 0; i--) {
        var cd = chartData[i];
        title.push(cd.name);
        data.push(cd.value);
      }
      series.push({ "name": "百度媒体类型", "type": "bar", "data": data,
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
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        // 下载按钮
        /** toolbox: {
          feature: {
            saveAsImage: {

            }
          },
        },
        **/
        xAxis: {
          type: 'category',
          data: title
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        animation: false,
        //stack 数据堆叠，同个类目轴上系列配置相同的stack值后，后一个系列的值会在前一个系列的值上相加
        series: series
      };
      $(".editBaiduType").empty();
      var myChart = echarts.init($('.editBaiduType')[0]);
      myChart.setOption(option);

      var dataImg = getFullCanvasDataURL('editBaiduType');
      var $picItem = $('.editBaiduType').siblings('.picItem');
      $picItem.removeClass('hide').find('img').attr('src', dataImg);
      $('.editBaiduType').remove();


    },
    //城市级别统计
    createCityData: function (result) {
      var chartData = result.data.data;
      var title = [];
      var data = [];
      var series = [];
      for (var i = chartData.length - 1; i >= 0; i--) {
        var cd = chartData[i];
        title.push(cd.name);
        data.push(cd.value);
      }
      series.push({
        "name": "城市级别统计", "type": "bar", "data": data,
        "itemStyle": {
          normal: {
            color: function (params) {
              var colorList = [
                '#e496e5', '#8495ef', '#c08de3', '#51c1b9', '#57b4ec',
                '#ef84a7', '#ed86e9', '#ef9d84', '#50c170', '#f58172'
              ];
              return colorList[params.dataIndex]
            }
          }
        }
      });
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
        /**toolbox: {
          feature: {

            // 类型切换
            magicType: {
              show: true,
              type: ["bar"]
            },
            saveAsImage: {

            }
          },
        },
        **/
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: title
        },
        animation: false,
        //stack 数据堆叠，同个类目轴上系列配置相同的stack值后，后一个系列的值会在前一个系列的值上相加
        series: series
      };
      var myChart = echarts.init($('.cityType')[0]);
      myChart.setOption(option);


      var dataImg = getFullCanvasDataURL('cityType');
      var $picItem = $('.cityType').siblings('.picItem');
      $picItem.removeClass('hide').find('img').attr('src', dataImg);
      $('.cityType').remove();
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
          text: '区域热度比例图',
          x: 'left'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        animation: false,
        // 下载按钮
        /**toolbox: {
          feature: {
            saveAsImage: {

            }
          },
        },
        **/
        //stack 数据堆叠，同个类目轴上系列配置相同的stack值后，后一个系列的值会在前一个系列的值上相加
        series: series
      };
      var myChart = echarts.init($('.pieAreaType')[0]);
      myChart.setOption(option);


      var dataImg = getFullCanvasDataURL('pieAreaType');
      var $picItem = $('.pieAreaType').siblings('.picItem');
      $picItem.removeClass('hide').find('img').attr('src', dataImg);
      $('.pieAreaType').remove();
    },
    //情感类型饼状图 
    cerateEmotionPieData: function (result) {
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
          "name": "情感类型比例图",
          "type": "pie",
          "radius": '55%',
          "center": ['50%', '60%'],
          "data": data,
          "itemStyle": {
            normal: {
              color: function (params) {
                var colorList = [
                  '#9ddea1', '#f7db63', '#f98cb3'
                ];
                return colorList[params.dataIndex]
              }
            }
          }
        });
      option = {
        title: {
          text: '情感类型比例图',
          x: 'left'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        animation: false,
        // 下载按钮
        /**toolbox: {
          feature: {
            saveAsImage: {

            }
          },
        },
        **/
        //stack 数据堆叠，同个类目轴上系列配置相同的stack值后，后一个系列的值会在前一个系列的值上相加
        series: series
      };
      var myChart = echarts.init($('.emotionMediaType')[0]);
      myChart.setOption(option);

      var dataImg = getFullCanvasDataURL('emotionMediaType');
      var $picItem = $('.emotionMediaType').siblings('.picItem');
      $picItem.removeClass('hide').find('img').attr('src', dataImg);
      $('.emotionMediaType').remove();
    },
    // 按情感类型
    createEmotionData: function (result) {
      var chartData = result.data.chartData;
      var series = [];
			/*
    		for (var i = 0; i < chartData.length; i++) {
    			var dt=chartData[i];
    			var resnum=dt.resnum;
    			var charName=dt.charName;
    			series.push({"name":charName,type:"line","data":dt.data,color:['#f7db63']});
    		}
			*/
      series.push({ "name": chartData[0].charName, type: "line", "data": chartData[0].data, color: ['#f98cb3'] });
      series.push({ "name": chartData[1].charName, type: "line", "data": chartData[1].data, color: ['#f7db63'] });
      series.push({ "name": chartData[2].charName, type: "line", "data": chartData[2].data, color: ['#9ddea1'] });
      option = {
        title: {
          text: '情感类型趋势图'
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
        /**toolbox: {
          feature: {

            // 类型切换
            magicType: {
              show: true,
              type: ["line", "bar"]
            },
            saveAsImage: {

            }

          },

        },
        **/
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: result.data.xAxis,
          name: "日期",

        },
        yAxis: {
          show: true,
          name: "总量",
          type: 'value',
        },
        animation: false,
        //stack 数据堆叠，同个类目轴上系列配置相同的stack值后，后一个系列的值会在前一个系列的值上相加
        series: series
      };
      var myChart = echarts.init($('.emotionType')[0]);
      myChart.setOption(option);

      var dataImg = getFullCanvasDataURL('emotionType');
      var $picItem = $('.emotionType').siblings('.picItem');
      $picItem.removeClass('hide').find('img').attr('src', dataImg);
      $('.emotionType').remove();
    },
    // 数据摘要
    createDataSummary: function (result) {
      var data = result.data;
      var $businNew = $(".businNew");
      $businNew.empty();
      for (var i = 0; i < data.length; i++) {
        var dt = data[i];
        // var len = i + 1;
        // var $businCont = $('<div class="busin-cont relative"></div>');
        // $businCont.attr("data_id", dt.id);
        // if (len != 1) {
        //   $businCont.addClass("margintop20");
        // }
        // if (len < 9) {
        //   len = "0" + len;
        // }
        // var $businTitle = $('<div class="busin-title"></div>');
        // $('<span class="number"></span>').text(len).appendTo($businTitle);
        // var $waText = $('<span class="wa-text"></span>');
        // $waText.appendTo($businTitle);
        // $('<a class="waTextLink"></a>').html(dt.title).attr("href", dt.url).appendTo($waText);
        // $businTitle.appendTo($businCont);
        // var $businTop = $('<div class="busin-top"></div>');
        // $('<span class="bus-text">转载收录统计：  </span>').appendTo($businTop);
        // var $busBox = $('<div class="bus-box"></div>');
        // $('<h3></h3>').text(dt.forwardNum).appendTo($busBox);
        // $('<p>总转载量</p>').appendTo($busBox);
        // $busBox.appendTo($businTop);
        // var $busBoxs = $('<div class="bus-box"></div>');
        // $('<h3></h3>').text(dt.baiduNum).appendTo($busBoxs);
        // $('<p>总转载量</p>').appendTo($busBoxs);
        // $busBoxs.appendTo($businTop);
        // var media = dt.baiduMediaName;
        // var needText = "";
        // for (var j = 0; j <= 4; j++) {
        //   var it = media[j];
        //   needText += it + "、";
        //   if (j === 4) {
        //     needText += it;
        //   }
        // }
        // $('<span class="bus-text marginleft65"></span>').text("主要收录媒体：  " + needText).appendTo($businTop);
        // $('<div class="clear"></div>').appendTo($businTop);
        // $('<button class="leading-in_btn absolute">替换导入数据</button>').appendTo($businTop);
        // $('<button class="del_btn absolute hide">删除该文章</button>').appendTo($businTop);
        // $businTop.appendTo($businCont);
        var $businCont = createPublicObj.createNewsItem(dt);
        $businCont.appendTo($businNew);
      }
    },
    //创建页码
    createPage: function (result) {
      var $page = $(".page");
      var resnum = result.resnum;
      $page.find(".pageAccount").text(resnum);
      var $pageWidth = $page.find(".pageWidth");
      var $showPage = $page.find(".show_page");
      var val = parseInt($showPage.val());
      var pageNum = Math.ceil(resnum / val);
      $pageWidth.empty();
      var width = pageNum * 30;
      $pageWidth.css("width", width + "px");
      for (var i = 0; i < pageNum; i++) {
        var len = i + 1;
        var $pageItem = $('<li class="pageItem"></li>');
        $pageItem.text(len);
        $pageItem.attr("page_id", len);
        if (i === 0) {
          $pageItem.addClass("on");
        }
        $pageItem.appendTo($pageWidth);
      }
    },
    // 创建新闻截图
    createNews: function (index) {
        var dt = {
          mediaType:0,
          title:'新浪首页banner',
          newsImgUrl:'http://news.searchin.cn/images/business_pic6.jpg',
          id:"newsInputImg"+index
        }
        $businNews = $('<div class="busin-cont relative businNews"></div>');
        var $busTitle = $('<div class="bus-title"></div>');
        var $newsTitle = $('<p class="newsTitle"></p>');
        $newsTitle.attr("mediaType_id", dt.mediaType).appendTo($busTitle);
        $('<input type="text" class="inpt forbidInput" value='+dt.title+'>').val(dt.title).appendTo($newsTitle);
        $busTitle.appendTo($businNews);
        var $businTop = $('<div class="busin-top businTop"></div>');
        $('<img class="newImage">').attr("src", dt.newsImgUrl).attr("image_id", dt.imageId).appendTo($businTop);
        $businTop.appendTo($businNews);
        var $newLabel = $('<label class="leading-in_btn absolute top135 newLabel delteCont" for='+dt.id+'></label>');
        $newLabel.appendTo($businNews);
        $('<input type="file" name="newsInputImg" class="hide newsInputImgName" id='+dt.id+'>').appendTo($newLabel);
        $('<span class="labelChart">替换</span>').appendTo($newLabel);
        $('<button class="del_btn absolute top196 delteCont">删除该截图项</button>').appendTo($businNews);
       return $businNews;
    },
    // 创建新闻详情
    createNewsItem: function (data) {
      var $businCont = $('<div class="busin-cont relative"></div>');
      $businCont.attr('data_id', data.id);
      var $businTitle = $('<div class="busin-title"></div>');
      var $businTop = $('<div class="busin-top"></div>');

      var $waText = $('<input type="text" class="wa-text forbidInput" size="50">');
      $waText.val(data.title).attr('value', data.title);
      $waText.appendTo($businTitle);
      $('<br>').appendTo($businTitle);
      var $waUrl = $('<input type="text" class="wa-url forbidInput" size="50">');
      $waUrl.val(data.url).attr('value', data.url);
      $waUrl.appendTo($businTitle);
      $('<div class="clear"></div>').appendTo($businTitle);


      $('<span class="bus-text">转载收录统计：  </span>').appendTo($businTop);
      var $busBox1 = $('<div class="bus-box"></div>');
      var $forward = $('<input type="text" class="forward forbidInput" size="50">');
      $forward.val(data.forwardNum).attr('value', data.forwardNum);
      $forward.appendTo($busBox1);
      $('<span class="piece">篇</span>').appendTo($busBox1);
      $('<p>总转载量</p>').appendTo($busBox1);
      $busBox1.appendTo($businTop);

      var $busBox2 = $('<div class="bus-box"></div>');
      var $baidu = $('<input type="text" class="baidu forbidInput" size="50">');
      $baidu.val(data.baiduNum).attr('value', data.baiduNum);
      $baidu.appendTo($busBox2);
      $('<span class="home">家</span>').appendTo($busBox2);
      $('<p>百度新闻收录</p>').appendTo($busBox2);
      $busBox2.appendTo($businTop);

      var $busText = $('<span class="bus-text marginleft65">主要收录媒体：   <input type="text" class="baiduMediaName forbidInput" size="50"> </span>');
      $busText.find('.baiduMediaName').val(data.baiduMediaName).attr('value', data.baiduMediaName);
      $busText.appendTo($businTop);
      $('<div class="clear"></div>').appendTo($businTop);
      $('<button class="del_btn1 absolute delteCont">删除该文章</button>').appendTo($businTop);
      $businTitle.appendTo($businCont);
      $businTop.appendTo($businCont);
      return $businCont;
    },
  };
  //url处理函数
  function dealURL() {
    var url = window.location.href;
    var urlSplit = url.split("?");
    if (urlSplit != url) {
      var needURL = urlSplit[1];
      var array = needURL.split("&");
      var topicId = parseInt(decodeURI(parseInt((array[0].split("="))[1])));
      var topicName = decodeURI((array[1].split("="))[1]);
      var start = (array[2].split("="))[1];

      // 给主题赋值
      $(".a_text").attr("topic_id", topicId).text(topicName);
      $(".terrace").find("a").attr("topic_id", topicId).text(topicName);
      $(".terrace").attr("topic_id", topicId).attr("topic_time", start);


      //获取logo数据
      // getDataObj.getEditLogoData(userId, topicId, start);
      //折线图
      getDataObj.getTotalNum(userId, [topicId], start, "", 2, 1);
      //媒体类型发布量统计
      getDataObj.getchartData(userId, topicId, start, "", 2, 3);
      //百度媒体类型统计
      getDataObj.getchartData(userId, topicId, start, "", 2, 4);
      //城市级别统计
      getDataObj.getchartData(userId, topicId, start, "", 2, 6);
      // 地域类型饼状图
      getDataObj.getchartData(userId, topicId, start, "", 2, 5);
      //情感类型中的媒体类型发布量统计
      getDataObj.getEmotionchartData(userId, topicId, start, "", 4, 8);
      //情感类型折线图
      getDataObj.getTotalNum(userId, [topicId], start, "", 2, 2);


      // 获取新闻数据
      getDataObj.getDataSummary(topicId);
      // 获取截图信息
      //  getDataObj.getNewData(userId, topicId, start);
    }
  }
  dealURL();
  function getTopic() {
    var $terrace = $(".terrace");
    var topicId = $terrace.attr("topic_id");
    var time = $terrace.attr("topic_time");
    var topicText = $terrace.find("a").text();
    var currentTopic = { id: topicId, text: topicText, time: time };
    return currentTopic;
  }
  // 上下页码点击
  $(document).off("click.pageSetting").on("click.pageSetting", ".pageSetting", function (e) {
    var $target = $(e.currentTarget);
    var $w = $target.closest(".w");
    var $pageCont = $target.siblings(".pageCont");
    var $pageItem = $pageCont.find(".pageItem");
    var $showPage = $target.siblings(".show_page");
    var pageNum = parseInt($showPage.val());
    var len = $pageItem.length;
    var $pageWidth = $pageCont.find(".pageWidth");
    var marginleft = parseInt($pageWidth.css("margin-left"));
    var topicId = getTopic();
    var start = $("#demo").val();
    for (var i = 0; i < len; i++) {
      var $item = $pageItem.eq(i);
      if ($item.hasClass("on")) {
        if ($target.hasClass("next")) {
          if (i < len - 1) {
            var $upItem = $pageItem.eq(i + 1);
            $upItem.addClass("on").siblings(".pageItem").removeClass("on");
            var pageId = $upItem.attr("page_id");
            getDataObj.getDataSummary(userId, topicId.id, start, pageNum, pageId, "key");
            if ((i + 1) % 5 === 0) {
              marginleft = marginleft - 150;
              $pageWidth.css("margin-left", marginleft + "px");
            }
            return;
          }
        } else {
          if (i > 0) {
            var $upItem = $pageItem.eq(i - 1);
            $upItem.addClass("on").siblings(".pageItem").removeClass("on");
            var pageId = $upItem.attr("page_id");
            getDataObj.getDataSummary(userId, topicId.id, start, pageNum, pageId, "key");
            if (i % 5 === 0) {
              marginleft = marginleft + 150;
              $pageWidth.css("margin-left", marginleft + "px");
            }
            return;
          }
        }
      }
    }
  });
  // 点击页面跳转
  $(document).off("click.pageItem").on("click.pageItem", ".pageWidth .pageItem", function (e) {
    var $target = $(e.currentTarget);
    var $w = $target.closest(".w");
    var $showPage = $w.find(".show_page");
    var pageNum = parseInt($showPage.val());
    var topicId = getTopic();
    var start = $("#demo").val();
    $target.addClass("on").siblings(".pageItem").removeClass("on");
    var pageId = parseInt($target.attr("page_id"));
    getDataObj.getDataSummary(userId, topicId.id, start, pageNum, pageId, "key");
  });
  // 输入框事件监听
  $(document).off("change.goPageNum").on("change.goPageNum", ".goPageNum", function (e) {
    var $target = $(e.currentTarget);
    var $w = $target.closest(".w");
    var len = $w.find(".pageItem").length;
    var val = parseInt($target.val());
    if (val > len || val < 1) {
      alert("您输入的值有误，请重新输入,输入范围为：" + 1 + "~" + len);
      $target.val("");
    }
  });
  //go 页面
  $(document).off("click.goPageClick").on("click.goPageClick", ".goPageClick", function (e) {
    var $target = $(e.currentTarget);
    var $w = $target.closest(".w");
    var $showPage = $w.find(".show_page");
    var pageNum = parseInt($showPage.val());
    var topicId = getTopic();
    var start = $("#demo").val();
    var $goPageNum = $w.find(".goPageNum");
    var index = parseInt($goPageNum.val());
    var $pageItem = $w.find(".pageItem");
    var currentOn = 1;
    for (var i = 0; i < $pageItem.length; i++) {
      var $item = $pageItem.eq(i);
      if ($item.hasClass("on")) {
        currentOn = i;
      }
    }
    var $needItem = $pageItem.eq(index - 1);
    var pageId = parseInt($needItem.attr("page_id"));
    $needItem.addClass("on").siblings(".pageItem").removeClass("on");
    var $pageWidth = $w.find(".pageWidth");
    getDataObj.getDataSummary(userId, topicId.id, start, pageNum, pageId, "key");
    var marginleft = -Math.floor((index - 1) / 5) * 150;
    $pageWidth.css("margin-left", marginleft + "px");
  });
  // 页面下拉选择事件
  $(document).off("change.show_page").on("change.show_page", ".show_page", function (e) {
    var $target = $(e.currentTarget);
    var $w = $target.closest(".w");
    var pageNum = parseInt($target.val());
    var topicId = getTopic();
    var $pageItem = $w.find(".pageItem");
    var $needItem = $pageItem.eq(0);
    $w.find(".goPageNum").val("");
    var start = $("#demo").val();
    $needItem.addClass("on").siblings(".pageItem").removeClass("on");
    getDataObj.getDataSummary(userId, topicId.id, start, pageNum, 1);
    var $pageWidth = $w.find(".pageWidth");
    $pageWidth.css("margin-left", 0);
  });
  // 删除事件
  $(document).off('click.picButton').on('click.picButton', '.picButton', function (e) {
    var $target = $(e.currentTarget);
    var className = $target.attr('class');
    var $picBorder = $target.closest('.picBorder');
    // 替换
    if (className.indexOf('delete') >= 0) {
      $picBorder.remove();
    }
  });
  // 替换换图事件
  $(document).off("change.picInput").on("change.picInput", ".picInput", function (e) {
    var $target = $(e.currentTarget);
    var $picButton = $target.closest('.picButton');
    var $img = $picButton.siblings('.picItem').find('img');
    var file = this.files[0];
    if (file && !file.type.indexOf("image") == 0) {
      alert('文件"' + file.name + '"不是图片');
    }else if (file&&file.size >= 1024*1024/2) {
        alert('您这张"'+ file.name +'"图片大小过大，应小于500kb');  
        return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(file); // 读出 base64
    reader.onloadend = function () {
      var dataURL = reader.result;
      $img.attr("src", dataURL);
    };

  });
  // 顶图导图事件
  $(document).off("change.logoAddBtn").on("change.logoAddBtn", ".logoAddBtn", function (e) {
    var $target = $(e.currentTarget);
    var $busImg = $target.closest(".bus-img");
    var $img = $busImg.find(".logoImg");
    var file = this.files[0];
    if (file && !file.type.indexOf("image") == 0) {
      alert('文件"' + file.name + '"不是图片');
    }else if (file&&file.size >= 1024*1024/2) {
        alert('您这张"'+ file.name +'"图片大小过大，应小于500kb');  
        return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(file); // 读出 base64
    reader.onloadend = function () {
      var dataURL = reader.result;
      $img.attr("src", dataURL);
    };
    //    var data = new FormData(file);
    //    data.append("CustomField", "This is some extra data, testing");
    //    $.ajax({
    //      type: "post",
    //      enctype: 'multipart/form-data',
    //      url: rootUrl+"/file/up",
    //      dataType:"json",
    //      data:  JSON.stringify({file:data,ticket:userId}),
    //      processData: false, //prevent jQuery from automatically transforming the data into a query string
    //      contentType: false,
    //      cache: false,
    //      timeout: 600000,
    //      success: function (data) {
    //        $img.attr("src", data)
    //          
    //
    //      },
    //      error: function (e) {
    //        console.log('上传图片失败');
    //
    //      }
    //  });



    // $img.attr("src", result.data.iamgeUrl).attr("image_id", result.data.imageId);
  });
  // 截图上传图片
  $(document).off("change.newsInputImg").on("change.newsInputImg", "#newsInputImg", function (e) {
    var $target = $(e.currentTarget);
    var $businNews   = $target.closest(".businNews");
    var $img = $businNews.find(".newImage");
    var file = this.files[0];
    if (file && !file.type.indexOf("image") == 0) {
      alert('文件"' + file.name + '"不是图片');
    }else if (file&&file.size >= 1024*1024/2) {
        alert('您这张"'+ file.name +'"图片大小过大，应小于500kb');  
        return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(file); // 读出 base64
    reader.onloadend = function () {
      var dataURL = reader.result;
      $img.attr("src", dataURL);
    };
  });
  // input change event
  $(document).off("change.inputCHnage").on("change.inputCHnage", "input", function (e) {
    var $target = $(e.currentTarget);
    var text = $target.val();
    $target.attr('value', text);
  });
  // textarea change event
  $(document).off("change.textareas").on("change.textareas", "textarea", function (e) {
    var $target = $(e.currentTarget);
    var text = $target.val();
    $target.text(text);
    $target.attr('value', text);
  });
  // 新闻截图
  $(document).off("change.newsInputImgName").on("change.newsInputImgName", ".newsInputImgName", function (e) {
    var $target = $(e.currentTarget);
    var $businNews = $target.closest(".businNews");
    var $img = $businNews.find(".newImage");
    var file = this.files[0];
    if (file && !file.type.indexOf("image") == 0) {
      alert('文件"' + file.name + '"不是图片');
    }
    var reader = new FileReader();
    reader.readAsDataURL(file); // 读出 base64
    reader.onloadend = function () {
      var dataURL = reader.result;
      $img.attr("src", dataURL);
    };
    //    var uploadFileName = file.name;
    //    fileElementId = $target.attr("id");
    /* $.ajaxFileUpload({
         type : "post",
         url : "",
         fileElementId: [fileElementId],
         c
         data : {
           uploadFileName:uploadFileName
         },
         dataType :'json',
         success : function(result) {
            $img.attr("src",result.data.iamgeUrl).attr("image_id",result.data.imageId);
         }
     })*/
    //    var result = {
    //      status: 0,
    //      msg: "成功",
    //      data: {
    //        imageId: 1,
    //        iamgeUrl: "images/business_pic6.jpg"
    //      }
    //    };
    //    $img.attr("src", result.data.iamgeUrl).attr("image_id", result.data.imageId);
  });
  // 添加新闻截图
  $(document).off("click.importNewsBtn").on("click.importNewsBtn", ".importNewsBtn", function (e) {
    var $newsContent = $(".newsContent");
    var $businNews = $(".businNews");
    var len = $newsContent.find('.businNews') && $newsContent.find('.businNews').length;
    var $itme =createPublicObj.createNews(len+1);
    $itme.appendTo($newsContent);
  });
  // 添加新闻详情事件
  $(document).off("click.importNewsBtn1").on("click.importNewsBtn1", ".importNewsBtn1", function (e) {
    var $target = $(e.currentTarget);
    var $businNew = $target.siblings('.businNew');

    var data = {
      id: '',
      title: '新闻标题',
      url: 'http://news.searchin.cn/home.html',
      forwardNum: '0',
      baiduNum: '0',
      baiduMediaName: '新浪、网易、北京日报、新京报、环球网、中华网'
    }
    var $businCont = createPublicObj.createNewsItem(data);
    $businCont.appendTo($businNew);
  });
  // 删除新闻详情事件
  $(document).off("click.delBtn1").on("click.delBtn1", ".del_btn1", function (e) {
    var $target = $(e.currentTarget);
    var $businCont = $target.closest('.busin-cont');
    $businCont.remove();
  });
  // 点击删除截图
  $(document).off("click.del_btn").on("click.del_btn", ".del_btn", function (e) {
    var $target = $(e.currentTarget);
    var $businNew = $target.closest(".businNews");
    var $newsContent = $target.closest(".newsContent");
    var len = $newsContent.find(".businNews").length;
    if (len <= 1) {
      return;
    }
    $businNew.remove();
  });
  // 保存事件
  $(document).off("click.preserveBtn").on("click.preserveBtn", ".preserve-btn", function (e) {
    var topicId = getTopic().id;
    var time = getTopic().time;
    var $html = $('html').clone();
    $html.find('script').remove();
    $html.find('.head_wrap').remove();
    $html.find('.bread').remove();
    $html.find('.delteCont').addClass('hide');
    // $html.find('.picBorder').removeClass('picBorder');
    $html.find('.forbidInput').attr('disabled', 'disabled').addClass('inputBorder');

    var hm = '<html>' + $html.html() + '</html>';
    getDataObj.setSaveData(topicId, time, hm);

  });
  /**
 * 将多个canvas画布组成的图表合成为一个完整的canvas,并获取完整的dataURl
 * @param divId divId 包含整个画布的divId
 * @returns {String} widthXheight@dataURL 例： 
 * 400X300@data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA
 */

  function getFullCanvasDataURL(divId) {
    //将第一个画布作为基准。
    var baseCanvas = $("." + divId).find("canvas").first()[0];
    if (!baseCanvas) {
      return false;
    };
    var width = baseCanvas.width;
    var height = baseCanvas.height;
    var ctx = baseCanvas.getContext("2d");
    //遍历，将后续的画布添加到在第一个上
    $("." + divId).find("canvas").each(function (i, canvasObj) {
      if (i > 0) {
        var canvasTmp = $(canvasObj)[0];
        ctx.drawImage(canvasTmp, 0, 0, width, height);
      }
    });
    //获取base64位的url
    return baseCanvas.toDataURL();
  }

  function gen_base64() {
    var file = $_('upload_file').files[0];
    r = new FileReader();  //本地预览
    r.onload = function () {
      $_('base64_output').value = r.result;
    }
    r.readAsDataURL(file);    //Base64
  }

  // 点击退出
  $(document).off("click.out").on("click.out", ".out", function (e) {
    window.location.href = "home.html";
  });
});
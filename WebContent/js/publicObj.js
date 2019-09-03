	function PublicObj(){
		//this.url="http://localhost:8080/sqv1";
		//this.url="http://www.search.com";
		//this.url="http://114.113.144.109:8090";
		this.url="http://news.searchin.cn";
	}
	PublicObj.prototype.defaultSet=function(callback){
		$.ajax({
	  	   url:this.url+"",
	  	   type:"post",
	  	   data:""/*{"userId":userId}*/,
	  	   dataType:"json",
	  	   success:function(result){
	  	      //数据处理函数
	  	      callback(result);
	  	   },
	  	   error:function(){
	  	     console.log("default设置数据有问题");
	  	   }
	  	});
	};
	PublicObj.prototype.getNormalData=function(userId){
		var data="";
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
         };
        data=result.data;
		/*$.ajax({
	  	   url:this.url+"",
	  	   type:"post",
	  	   data:{"userId":userId},
	  	   dataType:"json",
	  	   async: true,
	  	   success:function(result){
	  	      //数据处理函数
	  	     data=result.data;
	  	   },
	  	   error:function(){
	  	     console.log("default设置数据有问题");
	  	   }
	  	});*/
	  	return data;
	};

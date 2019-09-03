<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="common.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'index.jsp' starting page</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
      <script type="text/javascript">
          //公共js变量调用
          //#alert("当前访问根路径："+basePath);
      </script>
  </head>
  
  <body>
  <a href="home.html">Login </a></br>
  <a href="file/up">图片上传 1 </a></br>
  <a href="file/demo">file upload 2 </a></br>
  </body>
</html>

<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript">
    //公共js变量声明
    var basePath = "<%=basePath%>";
</script>

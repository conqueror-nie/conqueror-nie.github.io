package njp;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class Test {

	/**
	 * 获得指定日期的前一天
	 * @param specifiedDay
	 * @return
	 * @throws Exception
	 */
	public static String getSpecifiedDayBefore(Date specifiedDay){
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
		Calendar c = Calendar.getInstance();
		Date date=null;
		try {
		date = simpleDateFormat.parse(simpleDateFormat.format(specifiedDay));
		} catch (Exception e) {
		e.printStackTrace();
		}
		c.setTime(date);
		int day=c.get(Calendar.DATE);
		c.set(Calendar.DATE,day-1);
		
		String dayBefore=new SimpleDateFormat("yyyyMMdd").format(c.getTime());
		return dayBefore;
	}
	
	public static String getSpecifiedDayBefore1(Date specifiedDay){
//		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
		Calendar c = Calendar.getInstance();
		Date date=new Date();
//		try {
//		date = simpleDateFormat.parse(simpleDateFormat.format(specifiedDay));
//		} catch (Exception e) {
//		e.printStackTrace();
//		}
		c.setTime(date);
		int day=c.get(Calendar.DATE);
		c.set(Calendar.DATE,day-1);
		
		String dayBefore=new SimpleDateFormat("yyyyMMdd").format(c.getTime());
		return dayBefore;
	}
	
	public static void main(String[] args) {
		String textValueInfo = "b_1:Organization_name,b_2:Organization_adress,b_3:Organization_bankAccName,b_4:Organization_bankName,b_5:Organization_bankAcc,b_6:Organization_mobile,b_7:Organization_idnoType,b_8:Organization_idno,c_1:User_name,c_2:User_adress,c_3:User_name,c_4:User_name,c_5:User_name,c_6:User_name,c_7:User_name,c_8:User_name,a_10:User_name,a_11:User_name,a_12:User_name,b_10:User_name,b_11:User_name,b_12:User_name,c_10:User_name,c_11:User_name,c_12:User_name";
		String[] str = textValueInfo.split(",");
		for(int i = 0;i<str.length;i++){
			System.out.println(str[i]);
		}
		
		
		
//		Date date = new Date();
//		Calendar c = Calendar.getInstance();
//		c.setTime(date);
//		int day1 = c.get(Calendar.DATE);
//		c.set(Calendar.DATE, day1 - 1);
//		System.out.println(c.getTime());
//		String dayAfter = new SimpleDateFormat("yyyy-MM-dd").format(c.getTime());
//        System.out.println(dayAfter);
		
//		long a1 = Long.parseLong("000000460000");
//		System.out.println("a1="+a1);
//		Double b1 = Double.parseDouble("00000000000001")/100;
//		System.out.println("b1="+b1);
//		String a = getSpecifiedDayBefore1(new Date());
//		System.out.println("a="+a);
//		
//		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
//		
//		try {
//			Date d1 = sdf.parse("2018-05-21");
//			Date d2 = sdf.parse("2018-05-28");
//			
//			Calendar dd = Calendar.getInstance();//定义日期实例
//			Calendar dd1 = Calendar.getInstance();//定义日期实例
//
//			dd.setTime(d1);//设置日期起始时间
//			dd1.setTime(d2);//设置日期起始时间
//			dd1.add(Calendar.DATE, 1);
//			while(dd.getTime().before(dd1.getTime())){//判断是否到结束日期
//
//				String str = sdf.format(dd.getTime());
//	
//				System.out.println(str);//输出日期结果
//	
//				dd.add(Calendar.DATE, 1);//进行当前日期加1
//
//			}
//			
//		} catch (ParseException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		} 
		
	}

}

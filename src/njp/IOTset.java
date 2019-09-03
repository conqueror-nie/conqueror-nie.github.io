package njp;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;

public class IOTset {

	public static void main(String[] args) {
		
		File file = new File("C:\\Users\\18010\\Desktop\\check\\20181225\\20181225-1.txt");
		double netAmount = 0;
		int netNo = 0;
		double returnAmount = 0;
		int returnNo = 0;
		double payAmount = 0;
		int payNo = 0;
		double falseAmount = 0;
		int falseNo = 0;
		try{
			BufferedReader br = new BufferedReader(new FileReader(file));//构造一个BufferedReader类来读取文件
			String s = null;
			int i = 1;
			while((s = br.readLine())!=null){//使用readLine方法，一次读一行
				System.out.println("i=" + i + ",s=" + s);
				if(i!=1 && s.equalsIgnoreCase("<end>")==false){
					String[] str = s.split("[|]");
					if((str[4].equalsIgnoreCase("00")  || str[4].equalsIgnoreCase("03")) && str[3].equalsIgnoreCase("0112")){
						netAmount = netAmount + Double.parseDouble(str[2].substring(3));
						netNo = netNo + 1;
					}else if((str[4].equalsIgnoreCase("00")  || str[4].equalsIgnoreCase("03")) && str[3].equalsIgnoreCase("0122")){
						returnAmount = returnAmount + Double.parseDouble(str[2].substring(3));
						returnNo = returnNo + 1;
					}else if((str[4].equalsIgnoreCase("00")  || str[4].equalsIgnoreCase("03")) && str[3].equalsIgnoreCase("0120")){
						payAmount = payAmount + Double.parseDouble(str[2].substring(3));
						payNo = payNo +1;
					}else{
						falseAmount = falseAmount +Double.parseDouble(str[2].substring(3));
						falseNo = falseNo +1;
					}
				}
				i++;
			}
			br.close();
		}catch(Exception e){
			e.printStackTrace();
		}
		System.out.println("网关交易金额汇总："+netAmount+"元，共："+netNo+"条");
		System.out.println("退款交易金额汇总："+returnAmount+"元，共："+returnNo+"条");
		System.out.println("代付交易金额汇总："+payAmount+"元，共："+payNo+"条");
		System.out.println("失败交易金额汇总："+falseAmount+"元，共："+falseNo+"条");
		System.out.println("入金汇总："+ (netAmount-returnAmount) +"元,共"+(netNo+returnNo)+"条");
		System.out.println("失败交易金额汇总："+falseAmount+"元，共："+falseNo+"条");
		System.out.println("文件共计："+(netNo+returnNo+payNo+falseNo)+"条");
	}
}

package njp;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.util.zip.GZIPInputStream;

import org.apache.tools.tar.TarEntry;
import org.apache.tools.tar.TarInputStream;

public class TxtTest {

	public static void main(String[] args) {
//		File file = new File("C:\\Users\\18010\\Desktop\\20180709\\B201807090017_20_01\\B201807090017_20_01.txt");
		File file = new File("C:\\Users\\18010\\Desktop\\file\\1534917817909_350.gz");
		String dirPath = "C:\\Users\\18010\\Desktop\\file\\test";
		try {
			unTarGz(file,dirPath);
			File file1 = new File(dirPath + "\\IND18080801ACOMN");
			txt2String(file1);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
//        System.out.println(txt2String(file));
	}
	
	/** 
	  * 创建 目录 
	  * @param path 
	  */  
	 public static void mkdirs(String path ) {  
	      File file =new File(path );     
	      if (!file.exists() && !file.isDirectory()) {  
	          file.mkdirs();  
	      }  
	  } 
	
	/** 
     * 解压tar.gz 文件 
     * @param file 要解压的tar.gz文件对象 
     * @param outputDir 要解压到某个指定的目录下 
     * @throws IOException 
     */  
    public static void unTarGz(File file,String outputDir) throws IOException{  
        TarInputStream tarIn = null;  
        try{  
            tarIn = new TarInputStream(new GZIPInputStream(  
                    new BufferedInputStream(new FileInputStream(file))),  
                    1024 * 2);  
              
            mkdirs(outputDir);//创建输出目录  

            TarEntry entry = null;  
            while( (entry = tarIn.getNextEntry()) != null ){  
                  
                if(entry.isDirectory()){//是目录
                    entry.getName();
                    mkdirs(outputDir);//创建空目录  
                }else{//是文件
                    File tmpFile = new File(outputDir + "/" + entry.getName());  
                    mkdirs(tmpFile.getParent() + "/");//创建输出目录  
                    OutputStream out = null;  
                    try{  
                        out = new FileOutputStream(tmpFile);  
                        int length = 0;  
                          
                        byte[] b = new byte[2048];  
                          
                        while((length = tarIn.read(b)) != -1){  
                            out.write(b, 0, length);  
                        }  
                      
                    }catch(IOException ex){  
                        throw ex;  
                    }finally{  
                          
                        if(out!=null)  
                            out.close();  
                    }  
                }
            }  
        }catch(IOException ex){  
            throw new IOException("解压归档文件出现异常",ex);  
        } finally{  
            try{  
                if(tarIn != null){  
                    tarIn.close();  
                }  
            }catch(IOException ex){  
                throw new IOException("关闭tarFile出现异常",ex);  
            }  
        }  
    }
	

	/**
     * 读取txt文件的内容
     * @param file 想要读取的文件对象
     * @return 返回文件内容
     */
    public static String txt2String(File file){
        StringBuilder result = new StringBuilder();
        InputStreamReader isr;
        try{
        	isr = new InputStreamReader(new FileInputStream(file), "gbk");
            BufferedReader br = new BufferedReader(isr);//构造一个BufferedReader类来读取文件
            String s = null;
            int i = 1;
            while(i<5){//使用readLine方法，一次读一行
//                result.append(System.lineSeparator()+s);
            	s = br.readLine().trim();
            	System.out.println("s="+s);
            	String[] str = s.split("\\s+");
            	for(int j=0;j<str.length;j++){
            		System.out.println("str["+j+"]="+str[j]);
            	}
//                if(i!=1 && s.equalsIgnoreCase("<end>")==false){
//                	System.out.println("s="+s);
//                	String[] str = s.split("\\s+");
//                	for(int j=0;j<str.length;j++){
//                		System.out.println("str["+j+"]="+str[j]);
//                	}
//                }
                i++;
            }
            br.close();    
        }catch(Exception e){
            e.printStackTrace();
        }
        return result.toString();
    }

}

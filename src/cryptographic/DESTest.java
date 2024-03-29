package cryptographic;
import java.io.UnsupportedEncodingException;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Base64.Decoder;
import java.util.Base64.Encoder;

import javax.crypto.spec.DESKeySpec;
import javax.crypto.SecretKeyFactory;
import javax.crypto.SecretKey;
import javax.crypto.Cipher;
/**
 DES加密介绍
      DES是一种对称加密算法，所谓对称加密算法即：加密和解密使用相同密钥的算法。DES加密算法出自IBM的研究，
 后来被美国政府正式采用，之后开始广泛流传，但是近些年使用越来越少，因为DES使用56位密钥，以现代计算能力，
 24小时内即可被破解。虽然如此，在某些简单应用中，我们还是可以使用DES加密算法，本文简单讲解DES的JAVA实现
 。
 注意：DES加密和解密过程中，密钥长度都必须是8的倍数
 */
public class DESTest {
    public DESTest() {
    }
    //测试
    public static void main(String args[]) {
    //待加密内容
    String str = "des加解密测试内容";
    //密码，长度要是8的倍数
    String password = "9588028820109132570743325311898426347857298773549468758875018579537757772163084478873699447306034466200616411960574122434059469100235892702736860872901247123456";
    
    //des加密
    byte[] result = DESTest.encrypt(str.getBytes(),password);
	System.out.println("明文des加密后："+new String(result));
	//base64加密des加密内容，方便传输
	Encoder encoder = Base64.getEncoder();
	byte[] data = encoder.encode(result);
	System.out.println("BASE64进一步加密：" + new String(data));
	
	//直接将如上内容解密
     try {
    	 //base64解密
    	 Decoder decoder = Base64.getDecoder();
    	 byte[] bytes = decoder.decode(data);
    	 System.out.println("BASE64解密：" + new String(bytes));
         //将解密后内容进行des解密得到明文信息
    	 byte[] decryResult = DESTest.decrypt(bytes, password);
         System.out.println("des解密后明文："+new String(decryResult));
     } catch (Exception e1) {
             e1.printStackTrace();
     }
     
 }
    /**
     * des加密
     * @param datasource byte[]
     * @param password String
     * @return byte[]
     */
    public static  byte[] encrypt(byte[] datasource, String password) {            
        try{
        SecureRandom random = new SecureRandom();
        DESKeySpec desKey = new DESKeySpec(password.getBytes());
        //创建一个密匙工厂，然后用它把DESKeySpec转换成
        SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");
        SecretKey securekey = keyFactory.generateSecret(desKey);
        //Cipher对象实际完成加密操作
        Cipher cipher = Cipher.getInstance("DES");
        //用密匙初始化Cipher对象
        cipher.init(Cipher.ENCRYPT_MODE, securekey, random);
        //现在，获取数据并加密
        //正式执行加密操作
        return cipher.doFinal(datasource);
        }catch(Throwable e){
                e.printStackTrace();
        }
        return null;
}
    /**
     * des解密
     * @param src byte[]
     * @param password String
     * @return byte[]
     * @throws Exception
     */
    public static byte[] decrypt(byte[] src, String password) throws Exception {
            // DES算法要求有一个可信任的随机数源
            SecureRandom random = new SecureRandom();
            // 创建一个DESKeySpec对象
            DESKeySpec desKey = new DESKeySpec(password.getBytes());
            // 创建一个密匙工厂
            SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");
            // 将DESKeySpec对象转换成SecretKey对象
            SecretKey securekey = keyFactory.generateSecret(desKey);
            // Cipher对象实际完成解密操作
            Cipher cipher = Cipher.getInstance("DES");
            // 用密匙初始化Cipher对象
            cipher.init(Cipher.DECRYPT_MODE, securekey, random);
            // 真正开始解密操作
            return cipher.doFinal(src);
        }
}
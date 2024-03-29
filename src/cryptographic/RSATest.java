package cryptographic;

import org.apache.commons.codec.binary.Base64;
import javax.crypto.Cipher;
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.HashMap;
import java.util.Map;

public class RSATest {
	private static Map<Integer, String> keyMap = new HashMap<Integer, String>();  //用于封装随机产生的公钥与私钥
	public static void main(String[] args) throws Exception {
		//生成公钥和私钥
//		genKeyPair();
		//加密字符串
//		String message = "RSA加解密测试";
//		System.out.println("随机生成的公钥为:" + keyMap.get(0));
//		System.out.println("随机生成的私钥为:" + keyMap.get(1));
//		String messageEn = encrypt(message,keyMap.get(0));
//		System.out.println("加密后的字符串为:" + messageEn);
//		String messageDe = decrypt(messageEn,keyMap.get(1));
//		System.out.println("还原后的字符串为:" + messageDe);
		
		String test = "\"out_trade_no\":\"20190524103941799\",\"merchant_id\":\"900065300022316\",\"type\":\"1\",\"nbkno\":\"102584000002\",\"acc\":\"6222023100021693952\",\"name\":\"赵学引\",\"bis_type\":\"1\",\"amount\":\"100\",\"acc_type\":\"2\"";
		String enkey = "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBALd8UimvVkrXeH9wYQV8/qaByLJvQYskZO3nzzeNbbkykN2lO1mmdmLbg8hY9B78ZmuGkhbS2CgAg1pK5iPmsexcXlESp5udo2dikt/dr/fZs4KicIZR7uKcAkn2H8RsaJJmhz5yZ+LhR0+KY+zhZ0mMENX9KSUssl/En7/eqL5zAgMBAAECgYAbmM4+yMlgzlGoUT22dptSbdjCxasFA39OrPvkrhffr/RL8esgS8Iokj2a544oDuxUpdPZLPMn6RPYg8VjhvIhigqDcr54gng2UK6jbJVHLMC7m+a7HbOpPM86JZcE5Uo6FF3CNVY1FxdVcCX3Ue9I+Vk3TphUyDF9tjaJtBpSoQJBAPOmZD54Qg1rnxlHgSc/7I5JwrJLrVwrKoM/UottXjCmb9WyCHNh2N4w34Kmd75loUCuNUukF3d9QE8TsLIAXoMCQQDAyTw+H9ad/W4kcTUgb0Vxl+rg1oRwGHchS0qbn2bSn3rGcSd5x5EbhAXssX+huyxk/PVqwdEaW+aQQ+MO8h1RAkEAqmkNIbggkpxcGWUuitIl1Fr4hpVxec5jHIrUY9opj6NJAtBTIsgj0zuhiBKAG7WfM8rkUbRCCXub1/LwmX6ymwJAMVBIdKu4PlmhXvkGWfGcld4CWtkEr5fSgVW9E+nGZ4Ib6b7wFhqSZ7NxwIX22+wBAyQhstk5H8D6TVTQM/aCwQJAOOEnrYPuV0xKZcKLbn8ssfSwqjlJrMRTTfwEG+ut3MQHeqlV8rXlO+gNyWC81sjuIucZ/V4ejmcckIbDiv7O+A==";
		System.out.println("测试数据加密后的字符串为:" + encrypt(test,enkey));
	}

	/** 
	 * 随机生成密钥对 
	 * @throws NoSuchAlgorithmException 
	 */  
	public static void genKeyPair() throws NoSuchAlgorithmException {  
		// KeyPairGenerator类用于生成公钥和私钥对，基于RSA算法生成对象  
		KeyPairGenerator keyPairGen = KeyPairGenerator.getInstance("RSA");  
		// 初始化密钥对生成器，密钥大小为96-1024位  
		keyPairGen.initialize(1024,new SecureRandom());  
		// 生成一个密钥对，保存在keyPair中  
		KeyPair keyPair = keyPairGen.generateKeyPair();  
		RSAPrivateKey privateKey = (RSAPrivateKey) keyPair.getPrivate();   // 得到私钥  
		RSAPublicKey publicKey = (RSAPublicKey) keyPair.getPublic();  // 得到公钥  
		String publicKeyString = new String(Base64.encodeBase64(publicKey.getEncoded()));  
		// 得到私钥字符串  
		String privateKeyString = new String(Base64.encodeBase64((privateKey.getEncoded())));  
		// 将公钥和私钥保存到Map
		keyMap.put(0,publicKeyString);  //0表示公钥
		keyMap.put(1,privateKeyString);  //1表示私钥
	}  
	/** 
	 * RSA公钥加密 
	 *  
	 * @param str 
	 *            加密字符串
	 * @param publicKey 
	 *            公钥 
	 * @return 密文 
	 * @throws Exception 
	 *             加密过程中的异常信息 
	 */  
	public static String encrypt( String str, String publicKey ) throws Exception{
		//base64编码的公钥
		byte[] decoded = Base64.decodeBase64(publicKey);
		RSAPublicKey pubKey = (RSAPublicKey) KeyFactory.getInstance("RSA").generatePublic(new X509EncodedKeySpec(decoded));
		//RSA加密
		Cipher cipher = Cipher.getInstance("SHA1WithRSA");
		cipher.init(Cipher.ENCRYPT_MODE, pubKey);
		String outStr = Base64.encodeBase64String(cipher.doFinal(str.getBytes("UTF-8")));
		return outStr;
	}

	/** 
	 * RSA私钥解密
	 *  
	 * @param str 
	 *            加密字符串
	 * @param privateKey 
	 *            私钥 
	 * @return 铭文
	 * @throws Exception 
	 *             解密过程中的异常信息 
	 */  
	public static String decrypt(String str, String privateKey) throws Exception{
		//64位解码加密后的字符串
		byte[] inputByte = Base64.decodeBase64(str.getBytes("UTF-8"));
		//base64编码的私钥
		byte[] decoded = Base64.decodeBase64(privateKey);  
        RSAPrivateKey priKey = (RSAPrivateKey) KeyFactory.getInstance("RSA").generatePrivate(new PKCS8EncodedKeySpec(decoded));  
		//RSA解密
		Cipher cipher = Cipher.getInstance("RSA");
		cipher.init(Cipher.DECRYPT_MODE, priKey);
		String outStr = new String(cipher.doFinal(inputByte));
		return outStr;
	}

}

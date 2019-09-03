package cryptographic;

/**
 * MD5加密的特点主要有以下几点： 
	 *1、针对不同长度待加密的数据、字符串等等，其都可以返回一个固定长度的MD5加密字符串。（通常32位的16进制字符串）； 
	 *2、其加密过程几乎不可逆，除非维护一个庞大的Key-Value数据库来进行碰撞破解，否则几乎无法解开。 
	 *3、运算简便，且可实现方式多样，通过一定的处理方式也可以避免碰撞算法的破解。 
	 *4、对于一个固定的字符串。数字等等，MD5加密后的字符串是固定的，也就是说不管MD5加密多少次，都是同样的结果。
 */
public class MD5Test {
	public static void main(String[] args) {
		String md5Encrypt32Upper = MD5Util.md5Encrypt32Upper("111111");
		String md5Encrypt32Lower = MD5Util.md5Encrypt32Lower("聂剑平");
		System.out.println("MD5(32位):"+"大写=" + md5Encrypt32Upper + "，小写=" + md5Encrypt32Lower);
		String md5Encrypt16Upper = (String) md5Encrypt32Upper.subSequence(8, 24);
		String md5Encrypt16Lower = (String) md5Encrypt32Lower.subSequence(8, 24);
		System.out.println("MD5(16位):"+"大写=" + md5Encrypt16Upper + "，小写=" + md5Encrypt16Lower);
	}
}

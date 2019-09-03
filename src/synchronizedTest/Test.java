package synchronizedTest;

public class Test {

	public static void main(String[] args) {
		test1();
		test2();
	}
	
	//同步锁
	static void test1(){
		SyncThread syncThread = new SyncThread();
		Thread thread1 = new Thread(syncThread, "SyncThread1");
		Thread thread2 = new Thread(syncThread, "SyncThread2");
		thread1.start();
		thread2.start();
	}
	
	//synchronized只锁定对象 创建两个对象则不受同步锁约束
	static void test2(){
		Thread thread1 = new Thread(new SyncThread(), "SyncThread1-1");
		Thread thread2 = new Thread(new SyncThread(), "SyncThread2-1");
		thread1.start();
		thread2.start();
	}

}

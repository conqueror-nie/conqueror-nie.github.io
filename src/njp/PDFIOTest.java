package njp;

import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Set;

import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.pdf.AcroFields;
import com.lowagie.text.pdf.PdfCopy;
import com.lowagie.text.pdf.PdfImportedPage;
import com.lowagie.text.pdf.PdfReader;
import com.lowagie.text.pdf.PdfStamper;


public class PDFIOTest {

	public static void main(String[] args) {
		HashMap<String, String> hashMap = new HashMap<String, String>();
        hashMap.put("b_1", "ceshi");
        hashMap.put("b_2", "北京");
        hashMap.put("b_3", "王某");
        hashMap.put("b_4", "望京支行");
        hashMap.put("b_5", "222321199112050001");
        hashMap.put("b_6", "18800008888");
        hashMap.put("b_7", "营业执照");
        hashMap.put("b_8", "110101111111117");
        
        hashMap.put("c_1", "钱某");
        hashMap.put("c_2", "上海");
        hashMap.put("c_3", "钱某");
        hashMap.put("c_4", "756支行");
        hashMap.put("c_5", "222321199112016262");
        hashMap.put("c_6", "18800007777");
        hashMap.put("c_7", "身份证");
        hashMap.put("c_8", "110101200101010011");
        
        hashMap.put("a_10", "2019");
        hashMap.put("a_11", "08");
        hashMap.put("a_12", "02");
        hashMap.put("b_10", "2019");
        hashMap.put("b_11", "08");
        hashMap.put("b_12", "02");
        hashMap.put("c_10", "2019");
        hashMap.put("c_11", "08");
        hashMap.put("c_12", "02");
        PDFIOTest.doSomeThing("C:\\Users\\18010\\Desktop\\电子协议\\三方协议模板--新模板.pdf","NewsPDF"+".pdf", hashMap);

	}
	
	/**
	 * 赋值并生成新的PDF文档
	 * @param templatePDF    pdf模版
	 * @param outFile    输出的PDF Name
	 * @param hashMap    templatePDF对应的数据
	 */
    public static void doSomeThing(String templatePDF,String outFile,HashMap<String,String> hashMap){
        try {
            FileOutputStream fos = new FileOutputStream(outFile);
            PdfReader reader = new PdfReader(templatePDF);
            int pages = reader.getNumberOfPages();
            System.out.println("pages = " + pages);
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            PdfStamper stamp = new PdfStamper(reader,baos);
            AcroFields form = stamp.getAcroFields();
            form=setField(form,hashMap);
            stamp.setFormFlattening(true);
            stamp.close();
            Document doc = new Document();
            PdfCopy pdfCopy = new PdfCopy(doc, fos);
            doc.open();
            for(int i=1;i<=pages;i++){
            	PdfImportedPage impPage = pdfCopy.getImportedPage(new PdfReader(baos.toByteArray()), i);
            	pdfCopy.addPage(impPage);
            	
            }
            doc.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (DocumentException e) {
            e.printStackTrace();
        }
        
    }
//    @SuppressWarnings({ "unchecked", "unchecked" })
    public static  AcroFields setField(AcroFields form,HashMap<String,String> fieldMap) {
        Set<String> it=fieldMap.keySet();
        Iterator<String> itr=it.iterator();
        while(itr.hasNext()){
            try {
                Object temp = itr.next();
                System.out.println("temp.toString() = " + temp.toString());
                form.setField(temp.toString(), fieldMap.get(temp.toString()));
            } catch (IOException e) {
                e.printStackTrace();
            } catch (DocumentException e) {
                e.printStackTrace();
            }
        }
        return form;
    }

}

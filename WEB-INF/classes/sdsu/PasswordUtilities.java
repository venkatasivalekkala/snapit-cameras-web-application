package sdsu;

import java.security.*;
import java.util.*;
import java.io.*;

public class PasswordUtilities {
    private static final String passwordFileName =
        "/srv/tomcat/webapps/jadrn013/WEB-INF/classes/sdsu/passwords.dat";
        
    private static final String passwordDatabaseTable = "users";    
        
    public static boolean isValidLogin(String username, String password) {
       Vector<String> userData = new Vector<String>(); 
       String inLine;
       try {    
        BufferedReader reader = new BufferedReader
               (new FileReader(passwordFileName));
           while((inLine = reader.readLine()) != null)
               userData.add(inLine);
           reader.close();  
            }
        catch(Exception e) {
            throw new RuntimeException("Error reading password file! "+e);
            }  
       String encryptedPassword = getEncryptedPassword(password);     
       for(int i=0; i < userData.size(); i++) {
            String tmp = userData.elementAt(i);
            StringTokenizer t = new StringTokenizer(tmp,"=",false);
            String fileUsername = t.nextToken();
            String filePassword = t.nextToken();
            if(fileUsername.equals(username) &&
                    filePassword.equals(encryptedPassword)) 
                return true;                             
            }   // end for
        return false;
        }
        
    public static String getEncryptedPassword(String str) {   
        try {  
            MessageDigest d = MessageDigest.getInstance("MD5");
            byte [] b = str.getBytes();     
            d.update(b);
            return  byteArrayToHexString(d.digest());
            }
        catch(Exception e) {
            e.printStackTrace();               
            }
    return null;
    }          
    
private static String byteArrayToHexString(byte[] b){
	String str = "";
	for(int i=0; i < b.length; i++) {
		int value = b[i] & 0xFF;
		if(value < 16)
			str += "0";
		str += Integer.toHexString(value);
		}
	return str.toUpperCase();
	}  
	
   public static boolean isValidLoginFile(String username, String password) {
   Vector<String> userData = new Vector<String>(); 
   String inLine;
   try {    
	BufferedReader reader = new BufferedReader
		   (new FileReader(passwordFileName));
	   while((inLine = reader.readLine()) != null)
		   userData.add(inLine);
	   reader.close();  
		}
	catch(Exception e) {
		throw new RuntimeException("Error reading password file! "+e);
		}  
   String encryptedPassword = getEncryptedPassword(password);     
   for(int i=0; i < userData.size(); i++) {
		String tmp = userData.elementAt(i);
		StringTokenizer t = new StringTokenizer(tmp,"=",false);
		String fileUsername = t.nextToken();
		String filePassword = t.nextToken();
		if(fileUsername.equals(username) &&
				filePassword.equals(encryptedPassword)) 
			return true;                             
		}   // end for
	return false;
	}                  
  

	public static boolean isValidLoginTable(String username, String password) {
	   Vector<String[]> userData = new Vector<String[]>();
	   String sql = "select password_hash from "+passwordDatabaseTable+" where username = '"+username+"';";
		userData=DBHelper.runQuery(sql);
  
	   String encryptedPassword = getEncryptedPassword(password);  

	   if(userData.isEmpty()){
			return false;
		}	
	   if(userData.firstElement()[0].equals(encryptedPassword)){
      return true;
     } 
      return false;		                 
	} 

}           




package helpers;

import javax.servlet.*;
import javax.servlet.http.*;
import java.util.logging.*;


public class AuthHelper {
	public static boolean isValidSession(HttpServletRequest request) {
		HttpSession s = request.getSession(false);
		if(s == null){
		return false;
		}
		return true;
		}
	}

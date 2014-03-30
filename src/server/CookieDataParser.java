/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server;

import java.net.URLDecoder;
import java.util.HashMap;

/**
 *
 * @author Wesley
 */
public class CookieDataParser {
	public static HashMap<String, String> parse(String cookieString){
		HashMap<String, String> parsedCookies = new HashMap<>();
		String[] dataElems = cookieString.split(";");
		for (String dataElem : dataElems) {
			String[] keyValPair = dataElem.split("=");
			try{
				parsedCookies.put(keyValPair[0].trim(), URLDecoder.decode(keyValPair[1], "UTF-8").trim());
			} catch(Exception e){
				System.out.println(e.getMessage());
			}
		}
		return parsedCookies;
	}
}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server;

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
			parsedCookies.put(keyValPair[0].trim(), keyValPair[1].trim());
		}
		return parsedCookies;
	}
}

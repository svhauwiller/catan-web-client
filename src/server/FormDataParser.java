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
public class FormDataParser {
	public static HashMap<String, String> parse(String dataString){
		HashMap<String, String> parsedData = new HashMap<>();
		String[] dataElems = dataString.split("&");
		for (String dataElem : dataElems) {
			String[] keyValPair = dataElem.split("=");
			parsedData.put(keyValPair[0], keyValPair[1]);
		}
		return parsedData;
	}
}

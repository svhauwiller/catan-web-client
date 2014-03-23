/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server;

import java.util.HashMap;

/**
 *
 * @author Jonathan
 */
public class JSONDataParser {
	public static HashMap<String, String> parse(String dataString){
		HashMap<String, String> parsedData = new HashMap<>();
		String[] dataElems = dataString.split(",");
		for (String dataElem : dataElems) {
			String[] keyValPair = dataElem.split(":");
			keyValPair[0] = keyValPair[keyValPair.length - 2];
			keyValPair[1] = keyValPair[keyValPair.length - 1];
			System.out.println(">>>" + keyValPair[0] + "<<");
			System.out.println(">>>" + keyValPair[1] + "<<");
			int firstIndex = keyValPair[0].indexOf("\"");
			int secondIndex = keyValPair[0].indexOf("\"", firstIndex + 1);
			String key = keyValPair[0].substring(firstIndex + 1, secondIndex);
			//System.out.println("substring: " + firstIndex + " to " + secondIndex);
			System.out.println("key:" + key);
			//parsedData.put(keyValPair[0], keyValPair[1]);
		}
		return parsedData;
	}
}

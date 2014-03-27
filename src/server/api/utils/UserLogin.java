package server.api.utils;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//package server.api.utils;

import java.util.HashMap;
import java.util.Map;

import com.google.inject.Inject;

/**
 *
 * @author Wesley
 */
public class UserLogin implements iUserLogin{
	private HashMap<String, String> validUsers;
	
	@Inject
	public UserLogin(){
		validUsers = new HashMap<>();
		validUsers.put("Sam", "sam");
		validUsers.put("Brooke", "brooke");
		validUsers.put("Pete", "pete");
		validUsers.put("Mark", "mark");
		validUsers.put("Herman", "herman");
		validUsers.put("Frodo", "frodo");
		validUsers.put("BigMcLargeHuge", "big");
		validUsers.put("Thelma", "thelma");
	}
	
	public HashMap<String, String> getValidUsers() {
		return validUsers;
	}
	public void setValidUsers(HashMap<String, String> validUsers) {
		this.validUsers = validUsers;
	}
	public boolean validateUserLogin(HashMap<String,String>userInfo) {
		/*
	    System.out.println("VALIDATE USER");
		printMap();
		 */
		return validUsers.get(userInfo.get("username")).equals(userInfo.get("password"));
	}
	
	public boolean registerUser(HashMap<String,String>userInfo) {
		if(!validUsers.containsKey(userInfo.get("username"))){
		validUsers.put(userInfo.get("username"), userInfo.get("password"));
		/*
	    System.out.println("REGISTER USER");
		printMap();
		*/
		return true;
		}
		return false;
		
	}
	public void printMap()
	{
		for (Map.Entry<String, String> entry : validUsers.entrySet()) {
		    String key = entry.getKey();
		    Object value = entry.getValue();
		    System.out.println(key+"     "+value);
		}
	}
}

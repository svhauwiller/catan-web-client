package server.api.utils;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//package server.api.utils;

import java.util.HashMap;

/**
 *
 * @author Wesley
 */
public class UserLogin implements iUserLogin{
	private HashMap<String, String> validUsers;
	
	//@Inject
	public UserLogin(){
		validUsers.put("Sam", "sam");
		validUsers.put("Brooke", "brooke");
		validUsers.put("Pete", "pete");
		validUsers.put("Mark", "mark");
	}
	
	public HashMap<String, String> getValidUsers() {
		return validUsers;
	}
	public void setValidUsers(HashMap<String, String> validUsers) {
		this.validUsers = validUsers;
	}
	public boolean validateUserLogin(HashMap<String,String>userInfo) {
		
		return validUsers.get(userInfo.get("username")).equals(userInfo.get("password"));
	}
	
	public void registerUser(HashMap<String,String>userInfo) {
		
		validUsers.put(userInfo.get("username"), userInfo.get("password"));
	}
}
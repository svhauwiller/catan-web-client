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
public class UserLogin {
	private HashMap<String, String> validUsers;
	
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





	public boolean validateUserLogin(String username, String password) {
		
		return validUsers.get(username).equals(password);
	}
	
	public void registerUser(String username, String password) {
		
		validUsers.put(username, password);
	}
}

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
public interface iUserLogin {
	
	public HashMap<String, String> getValidUsers();

	public void setValidUsers(HashMap<String, String> validUsers);

	public boolean validateUserLogin(HashMap<String,String>userInfo);
	
	public void registerUser(HashMap<String,String>userInfo);
}

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
public interface UserLogin {


	public boolean validateUserLogin(String username, String password);

	
	public void registerUser(String username, String password);

}

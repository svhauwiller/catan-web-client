package server.api.utils;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//package server.api.utils;

import java.util.HashMap;

import server.communication.PlayerInfo;

/**
 *
 * @author Wesley
 */
public interface iUserLogin {
	
	public HashMap<PlayerInfo, String> getValidUsers();

	public void setValidUsers(HashMap<PlayerInfo, String> validUsers);

	public boolean validateUserLogin(HashMap<String,String>userInfo);
	
	public boolean registerUser(HashMap<String,String>userInfo);
}

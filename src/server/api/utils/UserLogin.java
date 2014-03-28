package server.api.utils;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//package server.api.utils;

import java.util.HashMap;
import java.util.Map;

import server.communication.PlayerInfo;

import com.google.inject.Inject;

/**
 *
 * @author Wesley
 */
public class UserLogin implements iUserLogin{

	private HashMap<PlayerInfo, String> validUsers;
	private static int playerID = 0;
	
	@Inject
	public UserLogin(){
		validUsers = new HashMap<>();
		validUsers.put(new PlayerInfo(null, addID(), "Sam"), "sam");
		validUsers.put(new PlayerInfo(null, addID(), "Brooke"), "brooke");
		validUsers.put(new PlayerInfo(null, addID(), "Pete"), "pete");
		validUsers.put(new PlayerInfo(null, addID(), "Mark"), "mark");


	}
	private int addID(){
		playerID++;
		return playerID;
	}
	public HashMap<PlayerInfo, String> getValidUsers() {
		return validUsers;
	}
	public void setValidUsers(HashMap<PlayerInfo, String> validUsers) {
		this.validUsers = validUsers;
	}
	
	/**
	 * returns a bool stating whether the player has been found
	 */
	public boolean validateUserLogin(HashMap<String,String>userInfo) {
		/*
	    System.out.println("VALIDATE USER");
		printMap();
		 */
		return playerInRegistryHuh((userInfo.get("username")),(userInfo.get("password")));
	}
	
	
	/**
	 * adds the user to the current list of availabe players if they aren't there
	 */
	public boolean registerUser(HashMap<String,String>userInfo) {

		for(Map.Entry<PlayerInfo, String>entry:validUsers.entrySet())
		{
			if(entry.getKey().getName().equalsIgnoreCase(userInfo.get("username"))){
			return false;
			}
		}
		validUsers.put(new PlayerInfo(null, addID(), userInfo.get("username")), userInfo.get("password")); 
    	System.out.println("**************REGISTER USER***************");
		printMap();
		System.out.println("__________________________________________");
		return true;
		
	}
	
	/**
	 * print the currently held map
	 */
	public void printMap()
	{
		for (Map.Entry<PlayerInfo, String> entry : validUsers.entrySet()) {
		    String name = entry.getKey().getName();
		    int playerIDNumber = entry.getKey().getId();
		    Object value = entry.getValue();
		    System.out.println(name+"  "+playerIDNumber+"  "+value);
		}
	}
	
	/**
	 * 
	 * @param theUser is a username
	 * @param thePassword is a password
	 * @return runs a check of the playername and password against the information
	 */
	private boolean playerInRegistryHuh(String theUser, String thePassword){
		for(Map.Entry<PlayerInfo, String>entry:validUsers.entrySet()){
			if(entry.getKey().getName().equalsIgnoreCase(theUser)&&
					entry.getValue().equalsIgnoreCase(thePassword)){
				return true;
			}
		}
		
		return false;
	}
}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.communication;

import com.google.inject.Guice;
import com.google.inject.Injector;
import java.util.HashMap;
import java.util.Map;
import server.ProductionModule;
import server.api.player.Player;
import server.api.utils.iUserLogin;

/**
 *
 * @author Wesley
 */
public class ValidUsers {
	private static ValidUsers instance;
	
	private static ValidUsers instance(){
		if(instance == null){
			instance = new ValidUsers();
		}
		return instance;
	}
	
	private iUserLogin validUsers;
	
	private ValidUsers(){
		this.validUsers = guiceUser();
	}

	private iUserLogin guiceUser() {
		Injector injector = Guice.createInjector(new ProductionModule());
        iUserLogin theUser = injector.getInstance(iUserLogin.class);
        return theUser;
	}
	
	private iUserLogin _getValidUsers() {
		return validUsers;
	}
	
	private Player _getPlayerByName(String playerName)
	{
		HashMap<PlayerInfo, String> x = new HashMap<>();
		x = validUsers.getValidUsers();
		
		for (Map.Entry<PlayerInfo, String> entry2:x.entrySet()) {
		    String name = entry2.getKey().getName();
		    int playerIDNumber = entry2.getKey().getId();
		    Object value = entry2.getValue();
		    System.out.println(name+"  "+playerIDNumber+"  "+value);
		}
		    
		for(Map.Entry<PlayerInfo, String> entry:x.entrySet())
		{
			if(entry.getKey().getName().equalsIgnoreCase(playerName)){
				return new Player(-10, new PlayerInfo(null,entry.getKey().getId(),"Player Found!"));
			}
		}
		return new Player(-10, new PlayerInfo(null,100,"PlayerNotFound"));
	}
	
	public static iUserLogin getValidUsers() { return instance()._getValidUsers(); }
	public static Player getPlayerByName(String playerName) { return instance()._getPlayerByName(playerName); }
}

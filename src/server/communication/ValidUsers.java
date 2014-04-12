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
import server.persist.StorageFacade;

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
	
	private int _getPlayerByName(String username)
	{
		return StorageFacade.getUserID(username);
	}
	
	public static iUserLogin getValidUsers() { return instance()._getValidUsers(); }
	public static int getPlayerByName(String username) { return instance()._getPlayerByName(username); }
}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.persist.models;

/**
 *
 * @author Wesley
 */
public class UsersPM {
	private String username;
	private String password;
	private int playerID;
	
	public UsersPM(String username, String password, int playerID){
		this.username = username;
		this.password = password;
		this.playerID = playerID;
	}
}

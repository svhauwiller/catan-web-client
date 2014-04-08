/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.persist.xml.model;

import java.util.ArrayList;
import server.persist.models.UsersPM;

/**
 *
 * @author Wesley
 */
public class UsersXMLmodel {
	private ArrayList<UsersPM> users;
	
	public UsersXMLmodel(){
		users = new ArrayList<>();
	}
	
	public void addUser(UsersPM user){
		users.add(user);
	}
	
	public int size(){
		return users.size();
	}
	
	public boolean isValidUser(String username, String password){
		for(UsersPM user : users){
			if(user.getUsername().equals(username) && user.getPassword().equals(password)){
				return true;
			}
		}
		return false;
	}
	
	public UsersPM getUser(String username){
		for(UsersPM user : users){
			if(user.getUsername().equals(username)){
				return user;
			}
		}
		return null;
	}
}

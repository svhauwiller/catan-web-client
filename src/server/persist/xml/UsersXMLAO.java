/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.persist.xml;

import server.persist.UsersAO;
import server.persist.models.UsersPM;
import server.persist.xml.model.UsersXMLmodel;

/**
 *
 * @author Wesley
 */
public class UsersXMLAO implements UsersAO {
	
	private FileIO fileio;
	
	public UsersXMLAO(){
		fileio = new FileIO();
	}

	@Override
	public void add(String username, String password) {
		Object xmlData = fileio.loadModel(FileIO.USERS_FILENAME);
		UsersXMLmodel usersModel = null;
		
		if(xmlData == null){
			usersModel = new UsersXMLmodel();
		} else {
			usersModel = (UsersXMLmodel) xmlData;
		}
		
		usersModel.addUser(new UsersPM(username, password, usersModel.size()));
		
		fileio.saveModel(FileIO.USERS_FILENAME, usersModel);
	}

	@Override
	public boolean validate(String username, String password) {
		Object xmlData = fileio.loadModel(FileIO.USERS_FILENAME);
		
		if(xmlData == null){
			return false;
		}
			
		UsersXMLmodel usersModel = (UsersXMLmodel) xmlData;
		
		return usersModel.isValidUser(username, password);
	}

	@Override
	public int getID(String username) {
		Object xmlData = fileio.loadModel(FileIO.USERS_FILENAME);
		
		if(xmlData == null){
			return -1;
		}
			
		UsersXMLmodel usersModel = (UsersXMLmodel) xmlData;
		
		return usersModel.getUser(username).getPlayerID();
	}
	
}

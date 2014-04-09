/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.persist.db;

import java.sql.Connection;

import server.persist.UsersAO;

/**
 *
 * @author Wesley
 */
public class UsersDAO implements UsersAO{
	private Connection conn;
	
	public UsersDAO(DatabaseConnection dbconn){
		this.conn = dbconn.getConnection();
	}

	@Override
	public void add(String username, String password) {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}

	@Override
	public boolean validate(String username, String password) {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}

	@Override
	public int getID(String username) {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}
}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.persist.db;

import java.sql.Connection;
import server.communication.GameModel;
import server.persist.GameInfoAO;

/**
 *
 * @author Wesley
 */
public class GameInfoDAO implements GameInfoAO {
	private Connection conn;

	GameInfoDAO(DatabaseConnection dbconn) {
		this.conn = dbconn.getConnection();
	}

	@Override
	public void add(int gameID, String gameTitle, GameModel initModel) {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}

	@Override
	public int getID(String gameTitle) {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}

	@Override
	public GameModel getInit(int gameID) {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}

	@Override
	public GameModel getCurr(int gameID) {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}

	@Override
	public void remove(int gameID) {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}

	@Override
	public void update(String type, GameModel model, int gameID) {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}
	
}

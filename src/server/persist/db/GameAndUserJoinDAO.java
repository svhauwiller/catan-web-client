/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.persist.db;

import java.sql.Connection;
import server.api.player.Player;
import server.persist.GameAndUserJoinAO;

/**
 *
 * @author Wesley
 */
public class GameAndUserJoinDAO implements GameAndUserJoinAO {
	private Connection conn;

	GameAndUserJoinDAO(DatabaseConnection dbconn) {
		this.conn = dbconn.getConnection();
	}

	@Override
	public Player.PlayerColor getColor(int playerID, int GameID) {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}

	@Override
	public void update(int playerID, int gameID, Player.PlayerColor color) {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}

	@Override
	public void add(int playerID, int gameID, Player.PlayerColor color) {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}
	
}

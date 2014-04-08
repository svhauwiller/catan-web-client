/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.persist;

import server.api.player.Player.PlayerColor;

/**
 *
 * @author Wesley
 */
public interface GameAndUserJoinAO {
	public PlayerColor getColor(int playerID, int GameID);
	public void update(int playerID, int gameID, PlayerColor color);
	public void add(int playerID, int gameID, PlayerColor color);
}

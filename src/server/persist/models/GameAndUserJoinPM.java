/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.persist.models;

import server.api.player.Player.PlayerColor;

/**
 *
 * @author Wesley
 */
public class GameAndUserJoinPM {
	private int playerID;
	private int gameID;
	private PlayerColor color;
	
	public GameAndUserJoinPM(int playerID, int gameID, PlayerColor color){
		this.playerID = playerID;
		this.gameID = gameID;
		this.color = color;
	}
}

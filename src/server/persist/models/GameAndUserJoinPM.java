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

	/**
	 * @return the playerID
	 */
	public int getPlayerID() {
		return playerID;
	}

	/**
	 * @param playerID the playerID to set
	 */
	public void setPlayerID(int playerID) {
		this.playerID = playerID;
	}

	/**
	 * @return the gameID
	 */
	public int getGameID() {
		return gameID;
	}

	/**
	 * @param gameID the gameID to set
	 */
	public void setGameID(int gameID) {
		this.gameID = gameID;
	}

	/**
	 * @return the color
	 */
	public PlayerColor getColor() {
		return color;
	}

	/**
	 * @param color the color to set
	 */
	public void setColor(PlayerColor color) {
		this.color = color;
	}
}

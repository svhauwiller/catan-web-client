/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.persist.models;

import server.communication.GameModel;

/**
 *
 * @author Wesley
 */
public class GameInfoPM {
	private int gameID;
	private String gameTitle;
	private GameModel initModel;
	private GameModel currModel;
	
	public GameInfoPM (int gameID, String gameTitle, GameModel initModel, GameModel currModel){
		this.gameID = gameID;
		this.gameTitle = gameTitle;
		this.initModel = initModel;
		this.currModel = currModel;
	}
}

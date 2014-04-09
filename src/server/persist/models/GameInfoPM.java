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
	private int lastCommand;
	
	public GameInfoPM (int gameID, String gameTitle, GameModel initModel, GameModel currModel){
		this.gameID = gameID;
		this.gameTitle = gameTitle;
		this.initModel = initModel;
		this.currModel = currModel;
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
	 * @return the gameTitle
	 */
	public String getGameTitle() {
		return gameTitle;
	}

	/**
	 * @param gameTitle the gameTitle to set
	 */
	public void setGameTitle(String gameTitle) {
		this.gameTitle = gameTitle;
	}

	/**
	 * @return the initModel
	 */
	public GameModel getInitModel() {
		return initModel;
	}

	/**
	 * @param initModel the initModel to set
	 */
	public void setInitModel(GameModel initModel) {
		this.initModel = initModel;
	}

	/**
	 * @return the currModel
	 */
	public GameModel getCurrModel() {
		return currModel;
	}

	/**
	 * @param currModel the currModel to set
	 */
	public void setCurrModel(GameModel currModel) {
		this.currModel = currModel;
	}
	
	public void resetCurrModel(){
		this.currModel = this.initModel;
	}

	/**
	 * @return the lastCommand
	 */
	public int getLastCommand() {
		return lastCommand;
	}

	/**
	 * @param lastCommand the lastCommand to set
	 */
	public void setLastCommand(int lastCommand) {
		this.lastCommand = lastCommand;
	}
}

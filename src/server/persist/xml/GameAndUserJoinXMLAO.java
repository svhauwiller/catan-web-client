/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.persist.xml;

import server.api.player.Player;
import server.persist.GameAndUserJoinAO;
import server.persist.models.GameAndUserJoinPM;
import server.persist.xml.model.GameAndUserXMLmodel;

/**
 *
 * @author Wesley
 */
public class GameAndUserJoinXMLAO implements GameAndUserJoinAO{
	
	private FileIO fileio;
	
	public GameAndUserJoinXMLAO(){
		fileio = new FileIO();
	}

	@Override
	public Player.PlayerColor getColor(int playerID, int GameID) {
		Object xmlData = fileio.loadModel(FileIO.GAME_USER_FILENAME);
		
		if(xmlData == null){
			return null;
		}
		
		GameAndUserXMLmodel joinModel = (GameAndUserXMLmodel) xmlData; 
		GameAndUserJoinPM joinEntry = joinModel.getJoinEntry(playerID, GameID);
		
		if(joinEntry == null){
			return null;
		} else {
			return joinEntry.getColor();
		}
	}

	@Override
	public void update(int playerID, int gameID, Player.PlayerColor color) {
		Object xmlData = fileio.loadModel(FileIO.GAME_USER_FILENAME);
		
		if(xmlData == null){
			return;
		}
		
		GameAndUserXMLmodel joinModel = (GameAndUserXMLmodel) xmlData; 
		
		joinModel.setJoinEntry(playerID, gameID, color);
		
		fileio.saveModel(FileIO.GAME_USER_FILENAME, joinModel);
	}

	@Override
	public void add(int playerID, int gameID, Player.PlayerColor color) {
		Object xmlData = fileio.loadModel(FileIO.GAME_USER_FILENAME);
		GameAndUserXMLmodel joinModel = null;
		
		if(xmlData == null){
			joinModel = new GameAndUserXMLmodel();
		} else {
			joinModel = (GameAndUserXMLmodel) xmlData;
		}
		
		joinModel.addJoinEntry(new GameAndUserJoinPM(playerID, gameID, color));
		
		fileio.saveModel(FileIO.GAME_USER_FILENAME, joinModel);
	}
	
}

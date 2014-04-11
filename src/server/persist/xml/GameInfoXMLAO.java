/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.persist.xml;

import server.communication.GameModel;
import server.persist.GameInfoAO;
import server.persist.models.GameInfoPM;
import server.persist.xml.model.GameInfoXMLmodel;

/**
 *
 * @author Wesley
 */
public class GameInfoXMLAO implements GameInfoAO {
	
	private FileIO fileio;
	
	public GameInfoXMLAO() {
		fileio = new FileIO();
	}

	@Override
	public int getID(String gameTitle) {
		Object xmlData = fileio.loadModel(FileIO.GAME_INFO_FILENAME);
		
		if(xmlData == null){
			return -1;
		}
		
		GameInfoXMLmodel gameInfoModel = (GameInfoXMLmodel) xmlData; 
		
		for(int i = 0; i < gameInfoModel.size(); i++){
			if(gameInfoModel.getGameModel(i).getGameTitle().equals(gameTitle)){
				return gameInfoModel.getGameModel(i).getGameID();
			}
		}
		
		return -1;
	}

	@Override
	public GameModel getInit(int gameID) {
		Object xmlData = fileio.loadModel(FileIO.GAME_INFO_FILENAME);
		
		if(xmlData == null){
			return null;
		}
		
		GameInfoXMLmodel gameInfoModel = (GameInfoXMLmodel) xmlData; 
		
		if(gameInfoModel.size() < gameID){
			return null;
		}
		
		return gameInfoModel.getGameModel(gameID).getInitModel();
	}

	@Override
	public GameModel getCurr(int gameID) {
		Object xmlData = fileio.loadModel(FileIO.GAME_INFO_FILENAME);
		
		if(xmlData == null){
			return null;
		}
		
		GameInfoXMLmodel gameInfoModel = (GameInfoXMLmodel) xmlData; 
		
		if(gameInfoModel.size() < gameID){
			return null;
		}
		
		return gameInfoModel.getGameModel(gameID).getCurrModel();
	}

	@Override
	public void update(String type, GameModel model, int gameID) {
		Object xmlData = fileio.loadModel(FileIO.GAME_INFO_FILENAME);
		GameInfoXMLmodel gameInfoModel = null;
		
		if(xmlData == null){
			gameInfoModel = new GameInfoXMLmodel();
		} else {
			gameInfoModel = (GameInfoXMLmodel) xmlData; 
		}
		
		if(gameInfoModel.size() < gameID){
			return;
		}
		
		if(type.equals("current")){
			gameInfoModel.getGameModel(gameID).setCurrModel(model);
		} else {
			gameInfoModel.getGameModel(gameID).setInitModel(model);
		}
		
		fileio.saveModel(FileIO.GAME_INFO_FILENAME, gameInfoModel);
	}

	@Override
	public void add(String gameTitle, GameModel initModel) {
		Object xmlData = fileio.loadModel(FileIO.GAME_INFO_FILENAME);
		GameInfoXMLmodel gameInfoModel = null;
		
		if(xmlData == null){
			gameInfoModel = new GameInfoXMLmodel();
		} else {
			gameInfoModel = (GameInfoXMLmodel) xmlData; 
		}
		
		gameInfoModel.addGameModel(new GameInfoPM(gameInfoModel.size(), gameTitle, initModel, initModel));
		
		fileio.saveModel(FileIO.GAME_INFO_FILENAME, gameInfoModel);
	}

	@Override
	public void reset(int gameID) {
		Object xmlData = fileio.loadModel(FileIO.GAME_INFO_FILENAME);
		
		if(xmlData == null){
			return;
		}
		
		GameInfoXMLmodel gameInfoModel = (GameInfoXMLmodel) xmlData;
		
		gameInfoModel.getGameModel(gameID).resetCurrModel();
		gameInfoModel.getGameModel(gameID).setLastCommand(0);
		
		fileio.saveModel(FileIO.GAME_INFO_FILENAME, gameInfoModel);
	}
	
}

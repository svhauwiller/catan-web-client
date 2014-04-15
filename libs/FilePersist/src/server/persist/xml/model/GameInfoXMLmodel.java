/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.persist.xml.model;

import server.persist.models.GameInfoPM;
import java.util.ArrayList;

/**
 *
 * @author Wesley
 */
public class GameInfoXMLmodel {
	private ArrayList<GameInfoPM> gameModels;
	
	public GameInfoXMLmodel(){
		gameModels = new ArrayList<>();
	}
	
	public void addGameModel(GameInfoPM game){
		gameModels.add(game);
	}
	
	public int size(){
		return gameModels.size();
	}
	
	public GameInfoPM getGameModel(int gameID){
		return gameModels.get(gameID);
	}
	
	public void setGameModel(int gameID, GameInfoPM game){
		gameModels.set(gameID, game);
	}
}

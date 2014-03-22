/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.communication;

import java.util.ArrayList;
import server.ServerException;

/**
 *
 * @author Wesley
 */
public class GameList {
	
	private static GameList instance;
	
	private static GameList instance(){
		if(instance == null){
			instance = new GameList();
		}
		return instance;
	}
	
	
	
	private ArrayList<GameInfo> gameList;
	
	private GameList(){
		gameList = new ArrayList<>();
	}
	
	private GameInfo _addGame(String name){
		GameInfo newGame = new GameInfo(gameList.size(), name);
		gameList.add(newGame);
		return newGame;
	}
	
	private ArrayList<GameInfo> _getGameList(){
		return gameList;
	}
	
	private void _addPlayerToGame(PlayerInfo player, int gameID) throws ServerException{
		gameList.get(gameID).addPlayer(player);
	}
	
	
	
	
	public GameList getInstance() {return instance();}

	public static GameInfo addGame(String name) {return instance()._addGame(name);}
	
	public static ArrayList<GameInfo> getGameList() {return instance()._getGameList();}
	
	public static void addPlayerToGame(PlayerInfo player, int gameID) throws ServerException {instance()._addPlayerToGame(player, gameID);}
	
	
}

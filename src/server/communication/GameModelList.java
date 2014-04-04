/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.communication;

import java.util.ArrayList;

/**
 *
 * @author Wesley
 */
public class GameModelList {
	private static GameModelList instance;
	
	private static GameModelList instance(){
		if(instance == null){
			instance = new GameModelList();
		}
		return instance;
	}
	
	private ArrayList<GameModel> gameModelList;
	
	private GameModelList(){
		gameModelList = new ArrayList<>();
	}
	
	private GameModel _get(int index){
		return gameModelList.get(index);
	}
	
	private void _add(GameModel newGameModel){
		gameModelList.add(newGameModel);
	}
	
	public static GameModel get(int index){return instance()._get(index);}
	public static void add(GameModel newGameModel){instance()._add(newGameModel);}
}

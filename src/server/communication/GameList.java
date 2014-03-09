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
public class GameList {
	private ArrayList<GameInfo> gameList;
	
	public GameList(){
		gameList = new ArrayList<>();
		
		for(int i = 0; i < 3; i++){
			gameList.add(new GameInfo());
		}
	}
}

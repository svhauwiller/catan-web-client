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
public class GameInfo {
	private int id;
	private ArrayList<PlayerInfo> players;
	private String title;
	
	public GameInfo(){
		id = 0;
		players = new ArrayList<>();
		title = "Default Game";
		
		for(int i = 0; i < 4; i++){
			players.add(new PlayerInfo());
		}
	}
}

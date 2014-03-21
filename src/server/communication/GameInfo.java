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
	
	public GameInfo(int id, String title){
		this.id = id;
		this.players = new ArrayList<>();
		this.title = title;
	}
	
	public void addPlayer(PlayerInfo player){
		players.add(player);
	}
}

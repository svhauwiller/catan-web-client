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
public class GameInfo{
	private final int MAX_PLAYERS = 4;
	
	private int id;
	private ArrayList<PlayerInfo> players;
	private String title;
	
	public GameInfo(int id, String title){
		this.id = id;
		this.players = new ArrayList<>();
		this.title = title;
	}
	
	public ArrayList<PlayerInfo> getPlayers(){
		return players;
	}
	
	public String getTitle(){
		return title;
	}
	
	public void addPlayer(PlayerInfo player) throws ServerException{
		if(players.size() < MAX_PLAYERS){
			players.add(player);
		} else {
			throw new ServerException("Game is full");
		}
	}
}

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
	
	private boolean colorIsUnique(PlayerInfo testingPlayer){
		for (PlayerInfo gamePlayer : players) {
			if(!gamePlayer.getName().equals(testingPlayer.getName()) && 
				gamePlayer.getColor().equals(testingPlayer.getColor())){
				return false;
			}
		}
		return true;
	}
	
	public ArrayList<PlayerInfo> getPlayers(){
		return players;
	}
	
	public String getTitle(){
		return title;
	}
	
	public void addPlayer(PlayerInfo player) throws ServerException{
		if(players.size() >= MAX_PLAYERS){
			throw new ServerException("Game is full.");
		} else if (!colorIsUnique(player)){
			throw new ServerException("Another player in this game is playing as this color.");
		} else {
			for (PlayerInfo gamePlayer : players) {
				if(gamePlayer.getName().equals(player.getName())){
					gamePlayer.setColor(player.getColor());
					return;
				}
			}
			players.add(player);
		}
	}
}

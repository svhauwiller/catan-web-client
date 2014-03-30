/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.communication;

import java.util.ArrayList;
import server.ServerException;
import server.api.player.Player;

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
		
		for(int i = 0; i < MAX_PLAYERS; i++){
			this.players.add(new PlayerInfo());
		}
	}
	
	private boolean colorIsUnique(PlayerInfo testingPlayer){
		for (PlayerInfo gamePlayer : players) {
			String playerName = gamePlayer.getName();
			if(playerName != null){
				if(!gamePlayer.getName().equals(testingPlayer.getName()) && 
					gamePlayer.getColor().equals(testingPlayer.getColor())){
					return false;
				}
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
		for(int i = 0; i < MAX_PLAYERS; i++){
			String playerName = this.players.get(i).getName();
			if(playerName == null){
				if (!colorIsUnique(player)){
					throw new ServerException("Another player in this game is playing as this color.");
				} else {
					this.players.set(i, player);
					Player playerData = new Player(i - 1, player);
					GameModel.addPlayer(playerData);
					return;
				}
			} else if(playerName.equals(player.getName())) {
				this.players.get(i).setColor(player.getColor());
				GameModel.getPlayer(i).setColor(player.getColor());
				return;
			}
		}
		throw new ServerException("Game is full.");
	}
}

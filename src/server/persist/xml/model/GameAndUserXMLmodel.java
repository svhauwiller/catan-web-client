/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.persist.xml.model;

import java.util.ArrayList;
import server.api.player.Player.PlayerColor;
import server.persist.models.GameAndUserJoinPM;

/**
 *
 * @author Wesley
 */
public class GameAndUserXMLmodel {
	private ArrayList<GameAndUserJoinPM> joinList;
	
	public GameAndUserXMLmodel(){
		joinList = new ArrayList<>();
	}
	
	public GameAndUserJoinPM getJoinEntry(int playerID, int gameID){
		GameAndUserJoinPM result = null;
		for(GameAndUserJoinPM joinEntry : joinList){
			if(joinEntry.getGameID() == gameID && joinEntry.getPlayerID() == playerID){
				result = joinEntry;
				break;
			}
		}
		return result;
	}
	
	public void addJoinEntry(GameAndUserJoinPM joinEntry){
		joinList.add(joinEntry);
	}
	
	public void setJoinEntry(int playerID, int gameID, PlayerColor color){
		for(int i = 0; i < joinList.size(); i++){
			if(joinList.get(i).getGameID() == gameID && joinList.get(i).getPlayerID() == playerID){
				joinList.set(i, new GameAndUserJoinPM(playerID, gameID, color));
				break;
			}
		}
	}
}

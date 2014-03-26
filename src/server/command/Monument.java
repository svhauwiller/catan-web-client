package server.command;

import server.communication.GameModel;
import java.util.*;

public class Monument implements CommandTemplate {
	private String type = "Monument";
	private int playerIndex =-1;
	//args[0] = player id
	public GameModel execute(String[] args){
		playerIndex = Integer.parseInt(args[0]);
		//change the points

		GameModel.getPlayer(playerIndex).updateVictoryPoints(1);
		GameModel.getPlayer(playerIndex).getOldDevCards().updateMonument(-1);
		GameModel.getPlayer(playerIndex).updateMonuments(1);
		return null;
	}
	public void undo(){
		GameModel.getPlayer(playerIndex).updateVictoryPoints(-1);
		GameModel.getPlayer(playerIndex).getOldDevCards().updateMonument(1);
		GameModel.getPlayer(playerIndex).updateMonuments(-1);
	}
}
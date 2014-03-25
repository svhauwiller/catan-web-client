package server.command;

import server.communication.GameModel;
import java.util.*;

public class Monument implements CommandTemplate {
	//args[0] = player id
	public GameModel execute(String[] args){
		int playerNum = Integer.parseInt(args[0]);
		//change the points

		GameModel.getPlayer(playerNum).updateVictoryPoints(1);
		GameModel.getPlayer(playerNum).getOldDevCards().updateMonument(-1);
		GameModel.getPlayer(playerNum).updateMonuments(1);
		return null;
	}
	public void undo(){}
}
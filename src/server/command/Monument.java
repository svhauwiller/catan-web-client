package server.command;

import server.communication.GameModel;
import java.util.*;

public class Monument implements CommandTemplate {
	//args[0] = player id
	public GameModel execute(String[] args){
		int playerNum = Integer.parseInt(args[0]);
		GameModel gmod = GameModel.getInstance();
		//change the points

		gmod.getPlayer(playerNum).updateVictoryPoints(1);
		gmod.getPlayer(playerNum).getOldDevCards().updateMonument(-1);
		gmod.getPlayer(playerNum).updateMonuments(1);
		return gmod;
	}
	public void undo(){}
}
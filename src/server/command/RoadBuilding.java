package server.command;

import server.communication.GameModel;
import java.util.*;
import server.api.map.Location;

public class RoadBuilding implements CommandTemplate {
	//args[0] = player id
	//args[1] = spot 1 x
	//args[2] = spot 1 y
	//args[3] = spot 1 direction
	//args[4] = spot 2 x
	//args[5] = spot 2 y
	//args[6] = spot 2 direction
	public GameModel execute(String[] args){
		int playerNum = Integer.parseInt(args[0]);
		GameModel.getPlayer(playerNum).getOldDevCards().updateRoadBuilding(-1);

		//set the locations
		Location spot1 = new Location(Integer.parseInt(args[1]), Integer.parseInt(args[2]), true);
		Location spot2 = new Location(Integer.parseInt(args[4]), Integer.parseInt(args[5]), true);
	
		spot1.setDirection(args[3]);
		spot2.setDirection(args[6]);

		//build both roads
		//GameModel.getMap().updateEdgeOwner(spot1, playerNum);
		//GameModel.getMap().updateEdgeOwner(spot2, playerNum);
		
		
		return null;
	}
	public void undo(){}
}
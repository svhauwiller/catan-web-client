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
		GameModel gmod = GameModel.getInstance();
		int playerNum = Integer.parseInt(args[0]);
		gmod.getPlayer(playerNum).getOldDevCards().updateRoadBuilding(-1);

		Location spot1 = new Location(true);
		Location spot2 = new Location(true);
	
		spot1.setX(Integer.parseInt(args[1]));
		spot1.setY(Integer.parseInt(args[2]));
		spot1.setDirection(args[3]);
		
		spot2.setX(Integer.parseInt(args[4]));
		spot2.setY(Integer.parseInt(args[5]));
		spot2.setDirection(args[6]);
		//build both roads

		Map map = new Map();
		map.updateEdgeOwner(spot1, playerNum);
		map.updateEdgeOwner(spot2, playerNum);
		
		
		return null;
	}
	public void undo(){}
}
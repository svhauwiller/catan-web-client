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
	private String type = "Road_Building";
	private int playerIndex = -1;
	private Location spot1 = new Location(true);
	private Location spot2 = new Location(true);
	public GameModel execute(String[] args){
		playerIndex = Integer.parseInt(args[0]);
		//if(GameModel.getPlayer(playerIndex.getOldDevCards().update
		GameModel.getPlayer(playerIndex).getOldDevCards().updateRoadBuilding(-1);

		//set the locations
		spot1.setX(Integer.parseInt(args[1]));
		spot1.setY(Integer.parseInt(args[2]));
		spot1.setDirection(args[3]);
		
		spot2.setX(Integer.parseInt(args[4]));
		spot2.setY(Integer.parseInt(args[5]));
		spot2.setDirection(args[6]);

		//build both roads
		GameModel.getMap().updateEdgeOwner(spot1, playerIndex);
		GameModel.getMap().updateEdgeOwner(spot2, playerIndex);
		
		//take away roads from the player
		GameModel.getPlayer(playerIndex).updateRoads(-2);
		
		
		return null;
	}
	public void undo(){}
}
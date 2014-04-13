package server.command;

import server.communication.GameModel;
import server.communication.GameModelList;
import server.persist.*;
import java.util.*;
import server.api.map.Location;
import server.api.utils.MessageLine;

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
	private Location spot1;
	private Location spot2;
	private int gameID = -10;
	
	@Override
	public GameModel execute(String[] args){
		playerIndex = Integer.parseInt(args[0]);
		//if(GameModel.getPlayer(playerIndex.getOldDevCards().update
		GameModelList.get(gameID).getPlayer(playerIndex).getOldDevCards().updateRoadBuilding(-1);

		//set the locations
		spot1 = new Location(Integer.parseInt(args[1]), Integer.parseInt(args[2]), true);
		spot2 = new Location(Integer.parseInt(args[4]), Integer.parseInt(args[5]), true);
		spot1.setDirection(args[3]);
		spot2.setDirection(args[6]);
		gameID = Integer.parseInt(args[7]);
		type = args[8];

		//build both roads
		GameModelList.get(gameID).getMap().updateEdgeOwner(spot1, playerIndex);
		GameModelList.get(gameID).getMap().updateEdgeOwner(spot2, playerIndex);
		
		//take away roads from the player
		GameModelList.get(gameID).getPlayer(playerIndex).updateRoads(-2);
		
		// update log
		MessageLine logMsg = new MessageLine();
		logMsg.setSource(GameModelList.get(gameID).getPlayer(playerIndex).getName());
		logMsg.setMessage(GameModelList.get(gameID).getPlayer(playerIndex).getName() + " has played a Road Building card.");
		GameModelList.get(gameID).getLog().addLine(logMsg);
		
		return null;
	}
	@Override
	public void persist(){
		StorageFacade.addCommand(gameID, this, type);
	}
	public void redo(){
		GameModelList.get(gameID).getPlayer(playerIndex).getOldDevCards().updateRoadBuilding(-1);

		//build both roads
		GameModelList.get(gameID).getMap().updateEdgeOwner(spot1, playerIndex);
		GameModelList.get(gameID).getMap().updateEdgeOwner(spot2, playerIndex);
		
		//take away roads from the player
		GameModelList.get(gameID).getPlayer(playerIndex).updateRoads(-2);
		
		// update log
		MessageLine logMsg = new MessageLine();
		logMsg.setSource(GameModelList.get(gameID).getPlayer(playerIndex).getName());
		logMsg.setMessage(GameModelList.get(gameID).getPlayer(playerIndex).getName() + " has played a Road Building card.");
		GameModelList.get(gameID).getLog().addLine(logMsg);
	}
	public void undo(){}
}
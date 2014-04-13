package server.command;

import server.JSONObject;
import server.communication.GameModel;
import server.communication.GameModelList;
import server.persist.*;
import java.util.*;

import server.api.map.*;
import server.api.utils.MessageLine;

public class BuildRoad implements CommandTemplate{
	private String type = "";
	private int playerIndex = -1;
	private int locationX = -1;
	private int locationY = -1;
	private String locationDirection = "";
	private boolean free = false;
	private int gameID = -10;
	


	/* args[0]-> type
	 * args[1]-> playerIndex
	 * args[2]-> roadLocation:x
	 * args[3]-> roadLocation:y
	 * args[4]-> roadLocation:direction
	 * args[5]-> free
	 */
	@Override
	public GameModel execute(String[] args){
		type = args[0];
		playerIndex = Integer.parseInt(args[1]);
		locationX = Integer.parseInt(args[2]);
		locationY = Integer.parseInt(args[3]);
		locationDirection = args[4];
		free = Boolean.parseBoolean(args[5]);
		gameID = Integer.parseInt(args[6]);
		//GameModel gmod = GameModel.getInstance();

		// update bank - add resources - building a road requires one brick and one lumber
		GameModelList.get(gameID).getBank().updateBrick(1);
		GameModelList.get(gameID).getBank().updateWood(1);

		// update player - subtract resources
		GameModelList.get(gameID).getPlayer(playerIndex).getResourceCardList().updateBrick(-1);
		GameModelList.get(gameID).getPlayer(playerIndex).getResourceCardList().updateWood(-1);
		GameModelList.get(gameID).getPlayer(playerIndex).updateRoads(-1);

		// update map - change ownerID of a given edge
		Location hexLoc = new Location(locationX, locationY, true);
		hexLoc.setDirection(locationDirection);
		GameModelList.get(gameID).getMap().updateEdgeOwner(hexLoc, playerIndex);
		
		// update log
		MessageLine logMsg = new MessageLine();
		logMsg.setSource(GameModelList.get(gameID).getPlayer(playerIndex).getName());
		logMsg.setMessage(GameModelList.get(gameID).getPlayer(playerIndex).getName() + " has built a road.");
		GameModelList.get(gameID).getLog().addLine(logMsg);
		return null;
	}
	@Override
	public void persist(){
		StorageFacade.addCommand(gameID, this, type);
	}
	@Override
	public void redo(){
		GameModelList.get(gameID).getBank().updateBrick(1);
		GameModelList.get(gameID).getBank().updateWood(1);

		// update player - subtract resources
		GameModelList.get(gameID).getPlayer(playerIndex).getResourceCardList().updateBrick(-1);
		GameModelList.get(gameID).getPlayer(playerIndex).getResourceCardList().updateWood(-1);
		GameModelList.get(gameID).getPlayer(playerIndex).updateRoads(-1);

		// update map - change ownerID of a given edge
		Location hexLoc = new Location(locationX, locationY, true);
		hexLoc.setDirection(locationDirection);
		GameModelList.get(gameID).getMap().updateEdgeOwner(hexLoc, playerIndex);

		// update log
		MessageLine logMsg = new MessageLine();
		logMsg.setSource(GameModelList.get(gameID).getPlayer(playerIndex).getName());
		logMsg.setMessage(GameModelList.get(gameID).getPlayer(playerIndex).getName() + " has built a road.");
		GameModelList.get(gameID).getLog().addLine(logMsg);
	}
	@Override
	public void undo(){ // should probably save previous location
		Location hexLoc = new Location(locationX, locationY, true);
		hexLoc.setDirection(locationDirection);
		GameModelList.get(gameID).getMap().updateEdgeOwner(hexLoc, -1);

		GameModelList.get(gameID).getPlayer(playerIndex).getResourceCardList().updateBrick(-1);
		GameModelList.get(gameID).getPlayer(playerIndex).getResourceCardList().updateWood(-1);
		GameModelList.get(gameID).getPlayer(playerIndex).updateRoads(1);

		GameModelList.get(gameID).getBank().updateBrick(-1);
		GameModelList.get(gameID).getBank().updateWood(-1);	
	}
}

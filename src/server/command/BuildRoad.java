package server.command;

import server.JSONObject;
import server.communication.GameModel;

import java.util.*;

import server.api.map.*;

public class BuildRoad implements CommandTemplate{
	private String type = "";
	private int playerIndex = -1;
	private int locationX = -1;
	private int locationY = -1;
	private String locationDirection = "";
	private boolean free = false;

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
		//GameModel gmod = GameModel.getInstance();

		// update bank - add resources - building a road requires one brick and one lumber
		GameModel.getBank().updateBrick(1);
		GameModel.getBank().updateWood(1);

		// update player - subtract resources
		GameModel.getPlayer(playerIndex).getResourceCardList().updateBrick(-1);
		GameModel.getPlayer(playerIndex).getResourceCardList().updateWood(-1);
		GameModel.getPlayer(playerIndex).updateRoads(-1);

		// update map - change ownerID of a given edge
		Location hexLoc = new Location(locationX, locationY, true);
		hexLoc.setDirection(locationDirection);
		GameModel.getMap().updateEdgeOwner(hexLoc, playerIndex);
		return null;
	}

	@Override
	public void undo(){ // should probably save previous location
		Location hexLoc = new Location(locationX, locationY, true);
		hexLoc.setDirection(locationDirection);
		GameModel.getMap().updateEdgeOwner(hexLoc, -1);

		GameModel.getPlayer(playerIndex).getResourceCardList().updateBrick(-1);
		GameModel.getPlayer(playerIndex).getResourceCardList().updateWood(-1);
		GameModel.getPlayer(playerIndex).updateRoads(1);

		GameModel.getBank().updateBrick(-1);
		GameModel.getBank().updateWood(-1);	
	}
}

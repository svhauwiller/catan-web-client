package server.command;

import server.JSONObject;
import server.communication.GameModel;

import java.util.*;

import server.api.map.*;

public class BuildCity implements CommandTemplate{
	private String type = "";
	private int playerIndex = -1;
	private int vertexX = -1;
	private int vertexY = -1;
	private String vertexDirection = "";
	private boolean free = false;

	/* args[0]-> type
	 * args[1]-> playerIndex
	 * args[2]-> vertexLocation:x
	 * args[3]-> vertexLocation:y
	 * args[4]-> vertexLocation:direction
	 * args[5]-> free
	 */

	@Override
	public GameModel execute(String[] args){
		type = args[0];
		playerIndex = Integer.parseInt(args[1]);
		vertexX = Integer.parseInt(args[2]);
		vertexY = Integer.parseInt(args[3]);
		vertexDirection = args[4];
		free = Boolean.parseBoolean(args[5]);

		// update bank - add resources - building a road requires one brick, one lumber, one wool, and one grain
		GameModel.getBank().updateWheat(2);
		GameModel.getBank().updateOre(3);

		// update player - subtract resources
		GameModel.getPlayer(playerIndex).getResourceCardList().updateWheat(-2);
		GameModel.getPlayer(playerIndex).getResourceCardList().updateOre(-3);
		GameModel.getPlayer(playerIndex).updateCities(-1);

		// update map - change ownerID of a given edge
		Location hexLoc = new Location(vertexX, vertexY, true);
		hexLoc.setDirection(vertexDirection);
		GameModel.getMap().updateVertexOwner(hexLoc, playerIndex);
		return null;
	}
	
	@Override
	public void undo(){ // should probably save previous location
		Location hexLoc = new Location(vertexX, vertexY, true);
		hexLoc.setDirection(vertexDirection);
		GameModel.getMap().updateVertexOwner(hexLoc, -1);

		GameModel.getPlayer(playerIndex).getResourceCardList().updateWheat(2);
		GameModel.getPlayer(playerIndex).getResourceCardList().updateOre(3);
		GameModel.getPlayer(playerIndex).updateCities(1);

		GameModel.getBank().updateWheat(-2);
		GameModel.getBank().updateOre(-3);
	}
}

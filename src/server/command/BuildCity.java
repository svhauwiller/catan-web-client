package server.command;

import server.JSONObject;
import server.communication.GameModel;
import server.communication.GameModelList;
import server.persist.*;

import java.util.*;

import server.api.map.*;
import server.api.utils.MessageLine;

public class BuildCity implements CommandTemplate{
	private String type = "";
	private int playerIndex = -1;
	private int vertexX = -1;
	private int vertexY = -1;
	private String vertexDirection = "";
	private boolean free = false;
	private int gameID = -10;
	


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
		gameID = Integer.parseInt(args[6]);

		if(!free){
			// update bank - add resources - building a road requires one brick, one lumber, one wool, and one grain
			GameModelList.get(gameID).getBank().updateWheat(2);
			GameModelList.get(gameID).getBank().updateOre(3);

			// update player - subtract resources
			GameModelList.get(gameID).getPlayer(playerIndex).getResourceCardList().updateWheat(-2);
			GameModelList.get(gameID).getPlayer(playerIndex).getResourceCardList().updateOre(-3);
		}
		// update player - subtract cities
		GameModelList.get(gameID).getPlayer(playerIndex).updateCities(-1);
		
		// update player - victory points
		GameModelList.get(gameID).getPlayer(playerIndex).updateVictoryPoints(1);
		
		// update map - change ownerID of a given edge
		Location hexLoc = new Location(vertexX, vertexY, true);
		hexLoc.setDirection(vertexDirection);
		GameModelList.get(gameID).getMap().updateVertexOwner(hexLoc, playerIndex);
		
		// update log
		MessageLine logMsg = new MessageLine();
		logMsg.setSource(GameModelList.get(gameID).getPlayer(playerIndex).getName());
		logMsg.setMessage(GameModelList.get(gameID).getPlayer(playerIndex).getName() + " has built a city.");
		GameModelList.get(gameID).getLog().addLine(logMsg);
		
		return null;
	}
	@Override
	public void persist(){
		StorageFacade.addCommand(gameID, this, type);
	}
	@Override
	public void redo(){
		if(!free){
			// update bank - add resources - building a road requires one brick, one lumber, one wool, and one grain
			GameModelList.get(gameID).getBank().updateWheat(2);
			GameModelList.get(gameID).getBank().updateOre(3);

			// update player - subtract resources
			GameModelList.get(gameID).getPlayer(playerIndex).getResourceCardList().updateWheat(-2);
			GameModelList.get(gameID).getPlayer(playerIndex).getResourceCardList().updateOre(-3);
		}
		// update player - subtract cities
		GameModelList.get(gameID).getPlayer(playerIndex).updateCities(-1);
		
		// update player - victory points
		GameModelList.get(gameID).getPlayer(playerIndex).updateVictoryPoints(1);
		
		// update map - change ownerID of a given edge
		Location hexLoc = new Location(vertexX, vertexY, true);
		hexLoc.setDirection(vertexDirection);
		GameModelList.get(gameID).getMap().updateVertexOwner(hexLoc, playerIndex);
		
		// update log
		MessageLine logMsg = new MessageLine();
		logMsg.setSource(GameModelList.get(gameID).getPlayer(playerIndex).getName());
		logMsg.setMessage(GameModelList.get(gameID).getPlayer(playerIndex).getName() + " has built a city.");
		GameModelList.get(gameID).getLog().addLine(logMsg);
	}
	
	@Override
	public void undo(){ // should probably save previous location
		Location hexLoc = new Location(vertexX, vertexY, true);
		hexLoc.setDirection(vertexDirection);
		GameModelList.get(gameID).getMap().updateVertexOwner(hexLoc, -1);

		GameModelList.get(gameID).getPlayer(playerIndex).getResourceCardList().updateWheat(2);
		GameModelList.get(gameID).getPlayer(playerIndex).getResourceCardList().updateOre(3);
		GameModelList.get(gameID).getPlayer(playerIndex).updateCities(1);

		GameModelList.get(gameID).getBank().updateWheat(-2);
		GameModelList.get(gameID).getBank().updateOre(-3);
	}
}

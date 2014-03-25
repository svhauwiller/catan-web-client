package server.command;

import server.JSONObject;
import server.communication.GameModel;

import java.util.*;

import server.api.map.*;

public class BuildRoad implements CommandTemplate{
	private int playerIndex = -1;
	private int locationX = -1;
	private int locationY = -1;
	private String locationDirection = "";
	private boolean free = false;

	/*public BuildRoad(){

	}*/
	
	/* args[0]-> playerIndex
	 * args[1]-> roadLocation:x
	 * args[2]-> roadLocation:y
	 * args[3]-> roadLocation:direction
	 * args[4]-> free
	 */
	@Override
	public GameModel execute(String[] args){

		int playerNum = Integer.parseInt(args[0]);
		//GameModel gmod = GameModel.getInstance();

		// update bank - add resources
		// update player - subtract resources
		// update map - change ownerID of a given edge
		//public void updateEdgeOwner(Location hexLoc, int ownerID)
		Location hexLoc = new Location(true);
		hexLoc.setX(Integer.parseInt(args[1]));
		hexLoc.setY(Integer.parseInt(args[2]));
		hexLoc.setDirection(args[3]);
		GameModel.getMap().updateEdgeOwner(hexLoc, Integer.parseInt(args[0]));
System.out.println("here??");
		return null;
	}

	@Override
	public void undo(){
		
	}
}

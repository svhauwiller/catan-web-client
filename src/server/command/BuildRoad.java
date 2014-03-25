package server.command;

import server.communication.GameModel;
import java.util.*;
import server.api.map.*;

public class BuildRoad implements CommandTemplate{
	private int playerIndex = -1;
	private int locationX = -1;
	private int locationY = -1;
	private String locationDirection = "";
	private boolean free = false;

	public GameModel execute(String[] args){
		int playerNum = Integer.parseInt(args[0]);
		GameModel gmod = GameModel.getInstance();
		// update bank - add resources
		// update player - subtract resources
		// update map - change ownerID of a given edge
		//public void updateEdgeOwner(Location hexLoc, int ownerID)
		Location hexLoc = new Location(true);
		hexLoc.setX();
		hexLoc.setY();
		hexLoc.setDirection();
		updateEdgeOwner();
		return gmod;
	}
	
	public void undo(){
		
	}
}

package server.command;

import server.communication.GameModel;
import java.util.*;

public class BuildCity implements CommandTemplate{

	public GameModel execute(String[] args){
		int playerNum = Integer.parseInt(args[0]);
		GameModel gmod = GameModel.getInstance();
		// update bank - add resources
		// update player - subtract resources
		// update map - change ownerID of a given vertex
		return gmod;
	}
	
	public void undo(){
		
	}
}

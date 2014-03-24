package server.command;

import server.communication.GameModel;
import java.util.*;

public class RobPlayer implements CommandTemplate{

	public GameModel execute(String[] args){
		int playerNum = Integer.parseInt(args[0]);
		GameModel gmod = GameModel.getInstance();
		// update players - subtract resources from one player and add resources to another player
		// update map - change hexlocation of robber
		return gmod;
	}
	
	public void undo(){
		
	}
}

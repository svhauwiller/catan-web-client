package server.command;

import server.communication.GameModel;
import java.util.*;

public class RollNumber implements CommandTemplate{

	public GameModel execute(String[] args){
		int playerNum = Integer.parseInt(args[0]);
		GameModel gmod = GameModel.getInstance();
		// idk
		return gmod;
	}
	
	public void undo(){
		
	}
}

package server.command;

import server.communication.GameModel;
import java.util.*;

public class RollNumber implements CommandTemplate{
	private String type = "";
	private int playerIndex = -1;
	private int number = -1;
	/*
		args[0] = obj.optString("type");
		args[1] = obj.optString("playerIndex");
		args[2] = obj.optString("number");
	*/
	public GameModel execute(String[] args){
		type = args[0];
		playerIndex = Integer.parseInt(args[1]);
		number = Integer.parseInt(args[2]);
		if(number == 7){
			GameModel.getTurnTracker().setStatus("Discard");
			// move the robber
			// steal
		}
		else{
			// get the hexLocation of the chit
			// get the players on the hexLocation
			ArrayList<Integer> players = GameModel.getMap().getPlayersAtHex(number);
			// distribute resources
		}
		
		// idk
		return null;
	}
	
	public void undo(){
		
	}
}

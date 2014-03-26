package server.command;

import server.communication.GameModel;
import server.api.map.Location;
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
			GameModel.getTurnTracker().setStatus("Discarding");
			// move the robber
			// steal
		}
		else{
			// get the hexLocation of the chit
			ArrayList<Location> locations = GameModel.getMap().getLocationsOfNumber(number);
			for(int i = 0; i < locations.size(); i++){
				// get the players on the hexLocation
				ArrayList<Integer> players = GameModel.getMap().getPlayersAtHex(locations.get(i));
				// distribute resources
				String landType = GameModel.getMap().getLandTypeAtHex(locations.get(i));
				for(int j = 0; j < players.size(); j++){
					switch(landType){
						case "brick":
							GameModel.getPlayer(players.get(j)).getResourceCardList().updateBrick(1);
							break;
						case "ore":
							GameModel.getPlayer(players.get(j)).getResourceCardList().updateOre(1);
							break;
						case "lumber":
							GameModel.getPlayer(players.get(j)).getResourceCardList().updateWood(1);
							break;
						case "wool":
							GameModel.getPlayer(players.get(j)).getResourceCardList().updateSheep(1);
							break;
						case "grain":
							GameModel.getPlayer(players.get(j)).getResourceCardList().updateWheat(1);
							break;
					}
				}
			}
			
		}
		
		// idk
		return null;
	}
	
	public void undo(){
		
	}
}

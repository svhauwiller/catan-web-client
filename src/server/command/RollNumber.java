package server.command;

import server.communication.GameModel;
import server.communication.GameModelList;
import server.api.map.Location;

import java.util.*;

public class RollNumber implements CommandTemplate{
	private String type = "";
	private int playerIndex = -1;
	private int number = -1;
	private int gameID = -10;
	

	
	/*
		args[0] = obj.optString("type");
		args[1] = obj.optString("playerIndex");
		args[2] = obj.optString("number");
	*/
	public GameModel execute(String[] args){
		type = args[0];
		playerIndex = Integer.parseInt(args[1]);
		number = Integer.parseInt(args[2]);
		gameID = Integer.parseInt(args[3]);
		if(number == 7){
			GameModelList.get(gameID).getTurnTracker().setStatus("Discarding");
			// move the robber
			// steal
		}
		else{
			// get the hexLocation of the chit
			ArrayList<Location> locations = GameModelList.get(gameID).getMap().getLocationsOfNumber(number);
			for(int i = 0; i < locations.size(); i++){
				// get the players on the hexLocation
				ArrayList<Integer> players = GameModelList.get(gameID).getMap().getPlayersAtHex(locations.get(i));
				// distribute resources
				String landType = GameModelList.get(gameID).getMap().getLandTypeAtHex(locations.get(i));
				for(int j = 0; j < players.size(); j++){
					switch(landType){
						case "brick":
							GameModelList.get(gameID).getPlayer(players.get(j)).getResourceCardList().updateBrick(1);
							break;
						case "ore":
							GameModelList.get(gameID).getPlayer(players.get(j)).getResourceCardList().updateOre(1);
							break;
						case "lumber":
							GameModelList.get(gameID).getPlayer(players.get(j)).getResourceCardList().updateWood(1);
							break;
						case "wool":
							GameModelList.get(gameID).getPlayer(players.get(j)).getResourceCardList().updateSheep(1);
							break;
						case "grain":
							GameModelList.get(gameID).getPlayer(players.get(j)).getResourceCardList().updateWheat(1);
							break;
					}
				}
			}
			
		}
		
		// idk
		return null;
	}
	
	@Override
	public void persist(){}
	@Override
	public void redo(){}

	public void undo(){
		
	}
}

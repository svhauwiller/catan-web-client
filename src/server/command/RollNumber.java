package server.command;

import server.communication.GameModel;
import server.communication.GameModelList;
import server.api.map.Location;
import server.api.player.Player;
import server.persist.*;

import java.util.*;

import server.api.utils.MessageLine;

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
		
		//check if anyone needs to discard; if so, Status=discard; else, status = Robbing
		boolean sevenCardCheck = false;
		if(number == 7){
			for(int i = 0; i < 4; ++i){
				if(GameModelList.get(gameID).getPlayer(i).getResourceCardList().getTotal()>7){
					sevenCardCheck=true;
					break;
				}
			}
			if(sevenCardCheck){
				GameModelList.get(gameID).getTurnTracker().setStatus("Discarding");
			}
			else{
				GameModelList.get(gameID).getTurnTracker().setStatus("Robbing");
			}
		}
		else{
			// get the hexLocation of the chit
			ArrayList<Location> locations = GameModelList.get(gameID).getMap().getLocationsOfNumber(number);
			for(int i = 0; i < locations.size(); i++){
				// get the players on the hexLocation
				ArrayList<Integer> players = GameModelList.get(gameID).getMap().getPlayersAtHex(locations.get(i));
				System.out.println("WOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO!");
				for(int zz = 0; zz < players.size(); ++zz){
					System.out.println(players.get(zz));
				}
				System.out.println("ZOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO!");
				// distribute resources
				String landType = GameModelList.get(gameID).getMap().getLandTypeAtHex(locations.get(i));
				System.out.println("LAAAAANNNNDDDDTTYYYYPPPPEEE: "+landType);
				for(int j = 0; j < players.size(); j++){
					switch(landType){
						case "Brick":
							GameModelList.get(gameID).getPlayer(players.get(j)).getResourceCardList().updateBrick(1);
							break;
						case "Ore":
							GameModelList.get(gameID).getPlayer(players.get(j)).getResourceCardList().updateOre(1);
							break;
						case "Wood":
							GameModelList.get(gameID).getPlayer(players.get(j)).getResourceCardList().updateWood(1);
							break;
						case "Sheep":
							GameModelList.get(gameID).getPlayer(players.get(j)).getResourceCardList().updateSheep(1);
							break;
						case "Wheat":
							GameModelList.get(gameID).getPlayer(players.get(j)).getResourceCardList().updateWheat(1);
							break;
					}
				}
			}
			
		}
		
		// idk
		
		// update log
		MessageLine logMsg = new MessageLine();
		logMsg.setSource(GameModelList.get(gameID).getPlayer(playerIndex).getName());
		logMsg.setMessage(GameModelList.get(gameID).getPlayer(playerIndex).getName() + " rolled a " + number + ".");
		GameModelList.get(gameID).getLog().addLine(logMsg);
		
		
		return null;
	}
	
	@Override
	public void persist(){
		StorageFacade.addCommand(gameID, this, type);
	}
	@Override
	public void redo(){
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
						case "Brick":
							GameModelList.get(gameID).getPlayer(players.get(j)).getResourceCardList().updateBrick(1);
							break;
						case "Ore":
							GameModelList.get(gameID).getPlayer(players.get(j)).getResourceCardList().updateOre(1);
							break;
						case "Wood":
							GameModelList.get(gameID).getPlayer(players.get(j)).getResourceCardList().updateWood(1);
							break;
						case "Sheep":
							GameModelList.get(gameID).getPlayer(players.get(j)).getResourceCardList().updateSheep(1);
							break;
						case "Wheat":
							GameModelList.get(gameID).getPlayer(players.get(j)).getResourceCardList().updateWheat(1);
							break;
					}
				}
			}
			
			
		}
		
		// update log
		MessageLine logMsg = new MessageLine();
		logMsg.setSource(GameModelList.get(gameID).getPlayer(playerIndex).getName());
		logMsg.setMessage(GameModelList.get(gameID).getPlayer(playerIndex).getName() + " rolled a " + number + ".");
		GameModelList.get(gameID).getLog().addLine(logMsg);
		
	}

	public void undo(){
		
	}
}

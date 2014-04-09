package server.command;

import server.communication.GameModel;
import server.communication.GameModelList;

import java.util.*;

import server.api.map.Location;

public class Soldier implements CommandTemplate {
	
	private String type = "Soldier";
	private int playerIndex = -1;
	private int victimIndex = -1;
	private Location location;
	private Location original;
	private int x =-1;
	private int gameID = -10;
	private String type = "";
	//args[0] = current player id
	//args[1] = victim player id
	//args[2] = x location
	//args[3] = y location
	
	

	@Override
	public GameModel execute(String[] args){
		playerIndex = Integer.parseInt(args[0]);
		victimIndex = Integer.parseInt(args[1]);
		gameID = Integer.parseInt(args[4]);
		type = args[5];
		
		
		GameModelList.get(gameID).getPlayer(playerIndex).getOldDevCards().updateSoldier(-1);
		
		//move the robber
		original = GameModelList.get(gameID).getMap().getRobberLocation();
		location = new Location(Integer.parseInt(args[2]), Integer.parseInt(args[3]), false);
		GameModelList.get(gameID).getMap().moveRobber(location);

		//steal!!!!!
		Random rand = new Random();
		
		boolean taken = false;

		while(!taken){
			x = rand.nextInt(5);
			if(x == 0){
				//be wheat
				if(GameModelList.get(gameID).getPlayer(victimIndex).getResourceCardList().getWheat()!=0){
					taken = true;
					GameModelList.get(gameID).getPlayer(victimIndex).getResourceCardList().updateWheat(-1);
					GameModelList.get(gameID).getPlayer(playerIndex).getResourceCardList().updateWheat(1);
				}
			}
			else if(x == 1){
				if(GameModelList.get(gameID).getPlayer(victimIndex).getResourceCardList().getOre()!=0){
					taken = true;
					GameModelList.get(gameID).getPlayer(victimIndex).getResourceCardList().updateOre(-1);
					GameModelList.get(gameID).getPlayer(playerIndex).getResourceCardList().updateOre(1);
				}
			}
			else if(x==2){
				if(GameModelList.get(gameID).getPlayer(victimIndex).getResourceCardList().getWood()!=0){
					taken = true;
					GameModelList.get(gameID).getPlayer(victimIndex).getResourceCardList().updateWood(-1);
					GameModelList.get(gameID).getPlayer(playerIndex).getResourceCardList().updateWood(1);
				}
			}
			else if(x==3){
				if(GameModelList.get(gameID).getPlayer(victimIndex).getResourceCardList().getSheep()!=0){
					taken = true;
					GameModelList.get(gameID).getPlayer(victimIndex).getResourceCardList().updateSheep(-1);
					GameModelList.get(gameID).getPlayer(playerIndex).getResourceCardList().updateSheep(1);
				}
			}
			else if(x==4){
				if(GameModelList.get(gameID).getPlayer(victimIndex).getResourceCardList().getBrick()!=0){
					taken = true;
					GameModelList.get(gameID).getPlayer(victimIndex).getResourceCardList().updateBrick(-1);
					GameModelList.get(gameID).getPlayer(playerIndex).getResourceCardList().updateBrick(1);
				}
			}
		}
	return null;
	}
	
	@Override
	public void undo(){
		GameModelList.get(gameID).getMap().moveRobber(original);
		GameModelList.get(gameID).getPlayer(playerIndex).getOldDevCards().updateSoldier(1);
			if(x == 0){
				GameModelList.get(gameID).getPlayer(victimIndex).getResourceCardList().updateWheat(1);
				GameModelList.get(gameID).getPlayer(playerIndex).getResourceCardList().updateWheat(-1);
			}
			else if(x == 1){
				GameModelList.get(gameID).getPlayer(victimIndex).getResourceCardList().updateOre(1);
				GameModelList.get(gameID).getPlayer(playerIndex).getResourceCardList().updateOre(-1);
			}
			else if(x==2){
				GameModelList.get(gameID).getPlayer(victimIndex).getResourceCardList().updateWood(1);
				GameModelList.get(gameID).getPlayer(playerIndex).getResourceCardList().updateWood(-1);
			}
			else if(x==3){
				GameModelList.get(gameID).getPlayer(victimIndex).getResourceCardList().updateSheep(1);
				GameModelList.get(gameID).getPlayer(playerIndex).getResourceCardList().updateSheep(-1);
			}
			else if(x==4){
				GameModelList.get(gameID).getPlayer(victimIndex).getResourceCardList().updateBrick(1);
				GameModelList.get(gameID).getPlayer(playerIndex).getResourceCardList().updateBrick(-1);
			}
	}
}
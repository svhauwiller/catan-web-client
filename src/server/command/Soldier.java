package server.command;

import server.communication.GameModel;
import java.util.*;
import server.api.map.Location;

public class Soldier implements CommandTemplate {
	
	private String type = "Soldier";
	private int playerIndex = -1;
	private int victimIndex = -1;
	private Location location = new Location(false);
	//args[0] = current player id
	//args[1] = victim player id
	//args[2] = x location
	//args[3] = y location
	@Override
	public GameModel execute(String[] args){
		playerIndex = Integer.parseInt(args[0]);
		victimIndex = Integer.parseInt(args[1]);
		GameModel.getPlayer(playerIndex).getOldDevCards().updateSoldier(-1);
		
		//move the robber
		location.setX(Integer.parseInt(args[2]));
		location.setY(Integer.parseInt(args[3]));
		GameModel.getMap().moveRobber(location);

		//steal!!!!!
		Random rand = new Random();
		
		boolean taken = false;

		while(!taken){
			int x = rand.nextInt(5);
			if(x == 0){
				//be wheat
				if(GameModel.getPlayer(victimIndex).getResourceCardList().getWheat()!=0){
					taken = true;
					GameModel.getPlayer(victimIndex).getResourceCardList().updateWheat(-1);
					GameModel.getPlayer(playerIndex).getResourceCardList().updateWheat(1);
				}
			}
			else if(x == 1){
				if(GameModel.getPlayer(victimIndex).getResourceCardList().getOre()!=0){
					taken = true;
					GameModel.getPlayer(victimIndex).getResourceCardList().updateOre(-1);
					GameModel.getPlayer(playerIndex).getResourceCardList().updateOre(1);
				}
			}
			else if(x==2){
				if(GameModel.getPlayer(victimIndex).getResourceCardList().getWood()!=0){
					taken = true;
					GameModel.getPlayer(victimIndex).getResourceCardList().updateWood(-1);
					GameModel.getPlayer(playerIndex).getResourceCardList().updateWood(1);
				}
			}
			else if(x==3){
				if(GameModel.getPlayer(victimIndex).getResourceCardList().getSheep()!=0){
					taken = true;
					GameModel.getPlayer(victimIndex).getResourceCardList().updateSheep(-1);
					GameModel.getPlayer(playerIndex).getResourceCardList().updateSheep(1);
				}
			}
			else if(x==4){
				if(GameModel.getPlayer(victimIndex).getResourceCardList().getBrick()!=0){
					taken = true;
					GameModel.getPlayer(victimIndex).getResourceCardList().updateBrick(-1);
					GameModel.getPlayer(playerIndex).getResourceCardList().updateBrick(1);
				}
			}
		}
	return null;
	}
	
	@Override
	public void undo(){}
}
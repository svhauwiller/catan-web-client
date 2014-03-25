package server.command;

import server.communication.GameModel;
import java.util.*;
import server.api.map.Location;

public class Soldier implements CommandTemplate {
	//args[0] = current player id
	//args[1] = victim player id
	//args[2] = x location
	//args[3] = y location
	public GameModel execute(String[] args){
		GameModel gmod = GameModel.getInstance();
		int playerNum = Integer.parseInt(args[0]);
		int vicNum = Integer.parseInt(args[1]);
		GameModel.getPlayer(playerNum).getOldDevCards().updateSoldier(-1);
		
		//move the robber
		Location moveLoc = new Location(false);
		moveLoc.setX(Integer.parseInt(args[2]));
		moveLoc.setY(Integer.parseInt(args[3]));
		gmod.getMap().moveRobber(moveLoc);

		//steal!!!!!
		Random rand = new Random();
		
		boolean taken = false;

		while(!taken){
			int x = rand.nextInt(5);
			if(x == 0){
				//be wheat
				if(gmod.getPlayer(vicNum).getResourceCardList().getWheat()!=0){
					taken = true;
					gmod.getPlayer(vicNum).getResourceCardList().updateWheat(-1);
					gmod.getPlayer(playerNum).getResourceCardList().updateWheat(1);
				}
			}
			else if(x == 1){
				if(gmod.getPlayer(vicNum).getResourceCardList().getOre()!=0){
					taken = true;
					gmod.getPlayer(vicNum).getResourceCardList().updateOre(-1);
					gmod.getPlayer(playerNum).getResourceCardList().updateOre(1);
				}
			}
			else if(x==2){
				if(gmod.getPlayer(vicNum).getResourceCardList().getWood()!=0){
					taken = true;
					gmod.getPlayer(vicNum).getResourceCardList().updateWood(-1);
					gmod.getPlayer(playerNum).getResourceCardList().updateWood(1);
				}
			}
			else if(x==3){
				if(gmod.getPlayer(vicNum).getResourceCardList().getSheep()!=0){
					taken = true;
					gmod.getPlayer(vicNum).getResourceCardList().updateSheep(-1);
					gmod.getPlayer(playerNum).getResourceCardList().updateSheep(1);
				}
			}
			else if(x==4){
				if(gmod.getPlayer(vicNum).getResourceCardList().getBrick()!=0){
					taken = true;
					gmod.getPlayer(vicNum).getResourceCardList().updateBrick(-1);
					gmod.getPlayer(playerNum).getResourceCardList().updateBrick(1);
				}
			}
		}
		return gmod;
	}
	public void undo(){}
}
package server.command;

import server.communication.GameModel;
import java.util.*;

public class Monopoly implements CommandTemplate {
	//args[0] = playerId;
	//args[1] = resource to take;
	public GameModel execute(String[] args){
		GameModel gmod = GameModel.getInstance();
		int playerNum = Integer.parseInt(args[0]);
		//take away dev card from player
		gmod.getPlayer(playerNum).getOldDevCards().updateMonopoly(-1);
		
		//take resource away from players
		int totalGained=0;
		for(int i=0; i<4; i++){
			if(i != playerNum){
				if(args[1].compareTo("wheat")==0){
					int current = gmod.getPlayer(i).getResourceCardList().getWheat();
					totalGained += current;
					gmod.getPlayer(i).getResourceCardList().updateWheat(-1*current);
				}
				else if(args[1].compareTo("ore")==0){
					int current = gmod.getPlayer(i).getResourceCardList().getOre();
					totalGained += current;
					gmod.getPlayer(i).getResourceCardList().updateOre(-1*current);
				}
				else if(args[1].compareTo("wood")==0){
					int current = gmod.getPlayer(i).getResourceCardList().getWood();
					totalGained += current;
					gmod.getPlayer(i).getResourceCardList().updateWood(-1*current);
				}
				else if(args[1].compareTo("sheep")==0){
					int current = gmod.getPlayer(i).getResourceCardList().getSheep();
					totalGained += current;
					gmod.getPlayer(i).getResourceCardList().updateSheep(-1*current);
				}
				else if(args[1].compareTo("brick")==0){
					int current = gmod.getPlayer(i).getResourceCardList().getBrick();
					totalGained += current;
					gmod.getPlayer(i).getResourceCardList().updateBrick(-1*current);
				}
			}
		}

		//add the resources to current player
		if(args[0].compareTo("wheat")==0)
				gmod.getPlayer(playerNum).getResourceCardList().updateWheat(totalGained);
		else if(args[1].compareTo("ore")==0)
				gmod.getPlayer(playerNum).getResourceCardList().updateOre(totalGained);
		else if(args[1].compareTo("sheep")==0)
				gmod.getPlayer(playerNum).getResourceCardList().updateSheep(totalGained);
		else if(args[1].compareTo("wood")==0)
				gmod.getPlayer(playerNum).getResourceCardList().updateWood(totalGained);
		else if(args[1].compareTo("brick")==0)
				gmod.getPlayer(playerNum).getResourceCardList().updateBrick(totalGained);
		return gmod;
	}
	public void undo(){
	}
}

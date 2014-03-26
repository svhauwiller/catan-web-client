package server.command;

import server.communication.GameModel;
import java.util.*;

public class Monopoly implements CommandTemplate {
	private int playerIndex = -1;
	private String resource = "";
	//args[0] = playerId;
	//resource = resource to take;
	public GameModel execute(String[] args){
		playerIndex = Integer.parseInt(args[0]);
		resource = resource;
		//take away dev card from player
		GameModel.getPlayer(playerIndex).getOldDevCards().updateMonopoly(-1);
		
		//take resource away from players
		int totalGained=0;
		for(int i=0; i<4; i++){
			if(i != playerIndex){
				if(resource.compareTo("wheat")==0){
					int current = GameModel.getPlayer(i).getResourceCardList().getWheat();
					totalGained += current;
					GameModel.getPlayer(i).getResourceCardList().updateWheat(-1*current);
				}
				else if(resource.compareTo("ore")==0){
					int current = GameModel.getPlayer(i).getResourceCardList().getOre();
					totalGained += current;
					GameModel.getPlayer(i).getResourceCardList().updateOre(-1*current);
				}
				else if(resource.compareTo("wood")==0){
					int current = GameModel.getPlayer(i).getResourceCardList().getWood();
					totalGained += current;
					GameModel.getPlayer(i).getResourceCardList().updateWood(-1*current);
				}
				else if(resource.compareTo("sheep")==0){
					int current = GameModel.getPlayer(i).getResourceCardList().getSheep();
					totalGained += current;
					GameModel.getPlayer(i).getResourceCardList().updateSheep(-1*current);
				}
				else if(resource.compareTo("brick")==0){
					int current = GameModel.getPlayer(i).getResourceCardList().getBrick();
					totalGained += current;
					GameModel.getPlayer(i).getResourceCardList().updateBrick(-1*current);
				}
			}
		}

		//add the resources to current player
		if(resource.compareTo("wheat")==0)
				GameModel.getPlayer(playerIndex).getResourceCardList().updateWheat(totalGained);
		else if(resource.compareTo("ore")==0)
				GameModel.getPlayer(playerIndex).getResourceCardList().updateOre(totalGained);
		else if(resource.compareTo("sheep")==0)
				GameModel.getPlayer(playerIndex).getResourceCardList().updateSheep(totalGained);
		else if(resource.compareTo("wood")==0)
				GameModel.getPlayer(playerIndex).getResourceCardList().updateWood(totalGained);
		else if(resource.compareTo("brick")==0)
				GameModel.getPlayer(playerIndex).getResourceCardList().updateBrick(totalGained);
		return null;
	}
	public void undo(){
		GameModel.getPlayer(playerIndex).getOldDevCards().updateMonopoly(1);
		
		//take resource away from players
		int totalGained=0;
		for(int i=0; i<4; i++){
			if(i != playerIndex){
				if(resource.compareTo("wheat")==0){
					int current = GameModel.getPlayer(i).getResourceCardList().getWheat();
					totalGained += current;
					GameModel.getPlayer(i).getResourceCardList().updateWheat(-1*current);
				}
				else if(resource.compareTo("ore")==0){
					int current = GameModel.getPlayer(i).getResourceCardList().getOre();
					totalGained += current;
					GameModel.getPlayer(i).getResourceCardList().updateOre(-1*current);
				}
				else if(resource.compareTo("wood")==0){
					int current = GameModel.getPlayer(i).getResourceCardList().getWood();
					totalGained += current;
					GameModel.getPlayer(i).getResourceCardList().updateWood(-1*current);
				}
				else if(resource.compareTo("sheep")==0){
					int current = GameModel.getPlayer(i).getResourceCardList().getSheep();
					totalGained += current;
					GameModel.getPlayer(i).getResourceCardList().updateSheep(-1*current);
				}
				else if(resource.compareTo("brick")==0){
					int current = GameModel.getPlayer(i).getResourceCardList().getBrick();
					totalGained += current;
					GameModel.getPlayer(i).getResourceCardList().updateBrick(-1*current);
				}
			}
		}

		//add the resources to current player
		if(resource.compareTo("wheat")==0)
				GameModel.getPlayer(playerIndex).getResourceCardList().updateWheat(totalGained);
		else if(resource.compareTo("ore")==0)
				GameModel.getPlayer(playerIndex).getResourceCardList().updateOre(totalGained);
		else if(resource.compareTo("sheep")==0)
				GameModel.getPlayer(playerIndex).getResourceCardList().updateSheep(totalGained);
		else if(resource.compareTo("wood")==0)
				GameModel.getPlayer(playerIndex).getResourceCardList().updateWood(totalGained);
		else if(resource.compareTo("brick")==0)
				GameModel.getPlayer(playerIndex).getResourceCardList().updateBrick(totalGained);
	}
}

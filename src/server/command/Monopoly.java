package server.command;

import server.communication.GameModel;
import java.util.*;

public class Monopoly implements CommandTemplate {
	private int playerIndex = -1;
	private String resource = "";
	private int[] current = new int[4];
	//args[0] = playerId;
	//resource = resource to take;
	@Override
	public GameModel execute(String[] args){
		playerIndex = Integer.parseInt(args[0]);
		resource = args[1];
		//take away dev card from player
		GameModel.getPlayer(playerIndex).getOldDevCards().updateMonopoly(-1);
		
		//take resource away from players
		int totalGained=0;
		for(int i=0; i<4; i++){
			if(i != playerIndex){
				if(resource.equals("wheat")){
					current[i] = GameModel.getPlayer(i).getResourceCardList().getWheat();
					totalGained += current[i];
					GameModel.getPlayer(i).getResourceCardList().updateWheat(-current[i]);
				}
				else if(resource.equals("ore")){
					current[i] = GameModel.getPlayer(i).getResourceCardList().getOre();
					totalGained += current[i];
					GameModel.getPlayer(i).getResourceCardList().updateOre(-current[i]);
				}
				else if(resource.equals("wood")){
					current[i] = GameModel.getPlayer(i).getResourceCardList().getWood();
					totalGained += current[i];
					GameModel.getPlayer(i).getResourceCardList().updateWood(-current[i]);
				}
				else if(resource.equals("sheep")){
					current[i] = GameModel.getPlayer(i).getResourceCardList().getSheep();
					totalGained += current[i];
					GameModel.getPlayer(i).getResourceCardList().updateSheep(-current[i]);
				}
				else if(resource.equals("brick")){
					current[i] = GameModel.getPlayer(i).getResourceCardList().getBrick();
					totalGained += current[i];
					GameModel.getPlayer(i).getResourceCardList().updateBrick(-current[i]);
				}
			}
		}

		//add the resources to current player
		if(resource.equals("wheat"))
				GameModel.getPlayer(playerIndex).getResourceCardList().updateWheat(totalGained);
		else if(resource.equals("ore"))
				GameModel.getPlayer(playerIndex).getResourceCardList().updateOre(totalGained);
		else if(resource.equals("sheep"))
				GameModel.getPlayer(playerIndex).getResourceCardList().updateSheep(totalGained);
		else if(resource.equals("wood"))
				GameModel.getPlayer(playerIndex).getResourceCardList().updateWood(totalGained);
		else if(resource.equals("brick"))
				GameModel.getPlayer(playerIndex).getResourceCardList().updateBrick(totalGained);
		return null;
	}
	
	@Override
	public void undo(){
		GameModel.getPlayer(playerIndex).getOldDevCards().updateMonopoly(1);
		
		//take resource away from players
		int totalGained=0;
		for(int i=0; i<4; i++){
			if(i != playerIndex){
				if(resource.equals("wheat")){
					//int current = GameModel.getPlayer(i).getResourceCardList().getWheat();
					totalGained -= current[i];
					GameModel.getPlayer(i).getResourceCardList().updateWheat(current[i]);
				}
				else if(resource.equals("ore")){
					//int current = GameModel.getPlayer(i).getResourceCardList().getOre();
					totalGained -= current[i];
					GameModel.getPlayer(i).getResourceCardList().updateOre(current[i]);
				}
				else if(resource.equals("wood")){
					//int current = GameModel.getPlayer(i).getResourceCardList().getWood();
					totalGained -= current[i];
					GameModel.getPlayer(i).getResourceCardList().updateWood(current[i]);
				}
				else if(resource.equals("sheep")){
					//int current = GameModel.getPlayer(i).getResourceCardList().getSheep();
					totalGained -= current[i];
					GameModel.getPlayer(i).getResourceCardList().updateSheep(current[i]);
				}
				else if(resource.equals("brick")){
					//int current = GameModel.getPlayer(i).getResourceCardList().getBrick();
					totalGained -= current[i];
					GameModel.getPlayer(i).getResourceCardList().updateBrick(current[i]);
				}
			}
		}

		//add the resources to current player
		if(resource.equals("wheat"))
				GameModel.getPlayer(playerIndex).getResourceCardList().updateWheat(totalGained);
		else if(resource.equals("ore"))
				GameModel.getPlayer(playerIndex).getResourceCardList().updateOre(totalGained);
		else if(resource.equals("sheep"))
				GameModel.getPlayer(playerIndex).getResourceCardList().updateSheep(totalGained);
		else if(resource.equals("wood"))
				GameModel.getPlayer(playerIndex).getResourceCardList().updateWood(totalGained);
		else if(resource.equals("brick"))
				GameModel.getPlayer(playerIndex).getResourceCardList().updateBrick(totalGained);
	}
}

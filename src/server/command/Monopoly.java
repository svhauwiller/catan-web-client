package server.command

import server.communication.GameModel;
import java.util.*;

public class Monopoly implements CommandTemplate {
	public GameModel execute(String[] args){
		//take away dev card from player
		GameModel.getCurrentPlayer().getOldDevCards().updateMonopoly(-1);

		//take resource away from players
		int id = GameModel.getCurrentPlayer().getId();
		int totalGained=0;
		for(int i=0; i<GameModel.getPlayers().size();i++){
			if(GameModel.getPlayers().get(i).getId() != id){
				if(args[0].compareTo("wheat")==0){
					totalGained += GameModel.getPlayers().get(i).getResourceCardList().getWheat();
					GameModel.getPlayers().get(i).getResourceCardList().updateWheat(-1*getWheat())
				}
				else if(args[0].compareTo("ore")==0){
					totalGained += GameModel.getPlayers().get(i).getResourceCardList().getOre();
					GameModel.getPlayers().get(i).getResourceCardList().updateOre(-1*getOre())
				}
				else if(args[0].compareTo("sheep")==0){
					totalGained += GameModel.getPlayers().get(i).getResourceCardList().getSheep();
					GameModel.getPlayers().get(i).getResourceCardList().updateSheep(-1*getSheep())
				}
				else if(args[0].compareTo("wood")==0){
					totalGained += GameModel.getPlayers().get(i).getResourceCardList().getWood();
					GameModel.getPlayers().get(i).getResourceCardList().updateWood(-1*getWood())
				}
				else if(args[0].compareTo("brick")==0){
					totalGained += GameModel.getPlayers().get(i).getResourceCardList().getBrick();
					GameModel.getPlayers().get(i).getResourceCardList().updateBrick(-1*getBrick())
				}
			}
		}
		
		//add the resources to current player
		if(args[0].compareTo("wheat")==0)
				GameModel.getCurrentPlayer().getResourceCardList().updateWheat(totalGained);
		else if(args[0].compareTo("ore")==0)
				GameModel.getCurrentPlayer().getResourceCardList().updateOre(totalGained);
		else if(args[0].compareTo("sheep")==0)
				GameModel.getCurrentPlayer().getResourceCardList().updateSheep(totalGained);
		else if(args[0].compareTo("wood")==0)
				GameModel.getCurrentPlayer().getResourceCardList().updateWood(totalGained);
		else if(args[0].compareTo("brick")==0)
				GameModel.getCurrentPlayer().getResourceCardList().updateBrick(totalGained);
	}
	public void undo(){
	}
}
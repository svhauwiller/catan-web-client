package server.command;

import server.communication.GameModel;
import java.util.*;

public class YearOfPlenty implements CommandTemplate {
	private String type = "Year_of_Plenty";
	private int playerIndex = -1;
	private String resource1 = "";
	private String resource2 = "";
	//args[0] = playerId;
	//args[1] = resource1;
	//args[2] = resource2;
    public GameModel execute(String[] args){
		int playerIndex = Integer.parseInt(args[0]);
		resource1 = args[1];
		resource2 = args[2];
		//Take dev card away from current player
		GameModel.getPlayer(playerIndex).getOldDevCards().updateYearOfPlenty(-1);
		
		//take resources away from gamemodel bank
		for(int i=1; i<3;i++){
			if(args[i].compareTo("wheat")==0)
				GameModel.getBank().updateWheat(-1);
			else if(args[i].compareTo("ore")==0)
				GameModel.getBank().updateOre(-1);
			else if(args[i].compareTo("sheep")==0)
				GameModel.getBank().updateSheep(-1);
			else if(args[i].compareTo("wood")==0)
				GameModel.getBank().updateWood(-1);
			else if(args[i].compareTo("brick")==0)
				GameModel.getBank().updateBrick(-1);
		}

		//give resources to the player
		for(int i=1; i<3; i++){
			if(args[i].compareTo("wheat")==0)
				GameModel.getPlayer(playerIndex).getResourceCardList().updateWheat(1);
			else if(args[i].compareTo("ore")==0)
				GameModel.getPlayer(playerIndex).getResourceCardList().updateOre(1);
			else if(args[i].compareTo("sheep")==0)
				GameModel.getPlayer(playerIndex).getResourceCardList().updateSheep(1);
			else if(args[i].compareTo("wood")==0)
				GameModel.getPlayer(playerIndex).getResourceCardList().updateWood(1);
			else if(args[i].compareTo("brick")==0)
				GameModel.getPlayer(playerIndex).getResourceCardList().updateBrick(1);
		}
		return null;
	}

    public void undo(){
		GameModel.getPlayer(playerIndex).getOldDevCards().updateYearOfPlenty(1);
		
		//take resources away from gamemodel bank
		// for(int i=1; i<3;i++){
			// if(args[i].compareTo("wheat")==0)
				// GameModel.getBank().updateWheat(1);
			// else if(args[i].compareTo("ore")==0)
				// GameModel.getBank().updateOre(1);
			// else if(args[i].compareTo("sheep")==0)
				// GameModel.getBank().updateSheep(1);
			// else if(args[i].compareTo("wood")==0)
				// GameModel.getBank().updateWood(1);
			// else if(args[i].compareTo("brick")==0)
				// GameModel.getBank().updateBrick(1);
		// }

		// //give resources to the player
		// for(int i=1; i<3; i++){
			// if(args[i].compareTo("wheat")==0)
				// GameModel.getPlayer(playerIndex).getResourceCardList().updateWheat(-1);
			// else if(args[i].compareTo("ore")==0)
				// GameModel.getPlayer(playerIndex).getResourceCardList().updateOre(-1);
			// else if(args[i].compareTo("sheep")==0)
				// GameModel.getPlayer(playerIndex).getResourceCardList().updateSheep(-1);
			// else if(args[i].compareTo("wood")==0)
				// GameModel.getPlayer(playerIndex).getResourceCardList().updateWood(-1);
			// else if(args[i].compareTo("brick")==0)
				// GameModel.getPlayer(playerIndex).getResourceCardList().updateBrick(-1);
			// }
	}
}
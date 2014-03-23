package server.command;

import server.communication.GameModel;
import java.util.*;

public class YearOfPlenty implements CommandTemplate {
	//args[0] = playerId;
	//args[1] = resource1;
	//args[2] = resource2;
    public GameModel execute(String[] args){
		int playerNum = Integer.parseInt(args[0]);
		GameModel gmod = GameModel.getInstance();
		
		//Take dev card away from current player
		GameModel.getPlayer(playerNum).getOldDevCards().updateYearOfPlenty(-1);
		
		//take resources away from gamemodel bank
		for(int i=1; i<2;i++){
			if(args[i].compareTo("wheat")==0)
				gmod.getBank().updateWheat(-1);
			else if(args[i].compareTo("ore")==0)
				gmod.getBank().updateOre(-1);
			else if(args[i].compareTo("sheep")==0)
				gmod.getBank().updateSheep(-1);
			else if(args[i].compareTo("wood")==0)
				gmod.getBank().updateWood(-1);
			else if(args[i].compareTo("brick")==0)
				gmod.getBank().updateBrick(-1);
		}

		//give resources to the player
		for(int i=1; i<2; i++){
			if(args[i].compareTo("wheat")==0)
				gmod.getPlayer(playerNum).getResourceCardList().updateWheat(1);
			else if(args[i].compareTo("ore")==0)
				gmod.getPlayer(playerNum).getResourceCardList().updateOre(1);
			else if(args[i].compareTo("sheep")==0)
				gmod.getPlayer(playerNum).getResourceCardList().updateSheep(1);
			else if(args[i].compareTo("wood")==0)
				gmod.getPlayer(playerNum).getResourceCardList().updateWood(1);
			else if(args[i].compareTo("brick")==0)
				gmod.getPlayer(playerNum).getResourceCardList().updateBrick(1);
		}*/
		return gmod;
	}
    public void undo(){
	
	}
}

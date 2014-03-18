package server.command

import server.communication.GameModel;
import java.util.*;

public class YearOfPlenty implements CommandTemplate {
    public GameModel execute(String[] args){
		//MOSTLY SUDO CODE
		//Will need to figure out the parameters because they will contain what resource needs to be taken

		//Take card away from current player
		GameModel.getCurrentPlayer().getOldDevCards().updateYearOfPlenty(-1);
		
		//take resources away from gamemodel bank
		//here we will refer to the 2 resources both as the "args[i]" given
		// when we change the parameter to a String[] then you can just as easy say args[i][x]
		for(int i=0; i<2;i++){
			if(args[i][i].compareTo("wheat")==0)
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
		for(int i=0; i<2; i++){
			if(args[i].compareTo("wheat")==0)
				GameModel.getCurrentPlayer().getResourcesList().updateWheat(1);
			else if(args[i].compareTo("ore")==0)
				GameModel.getCurrentPlayer().getResourcesList().updateOre(1);
			else if(args[i].compareTo("sheep")==0)
				GameModel.getCurrentPlayer().getResourcesList().updateSheep(1);
			else if(args[i].compareTo("wood")==0)
				GameModel.getCurrentPlayer().getResourcesList().updateWood(1);
			else if(args[i].compareTo("brick")==0)
				GameModel.getCurrentPlayer().getResourcesList().updateBrick(1);
		}
	}
    public void undo(){
	
	}
}
package server.command;

import server.communication.GameModel;
import server.communication.GameModelList;

import java.util.*;

public class YearOfPlenty implements CommandTemplate {
	private String type = "Year_of_Plenty";
	private int playerIndex = -1;
	private String resource1 = "";
	private String resource2 = "";
	private int gameID = -10;
	private String type = "";
	//args[0] = playerId;
	//args[1] = resource1;
	//args[2] = resource2;
	@Override
    public GameModel execute(String[] args){
		playerIndex = Integer.parseInt(args[0]);
		resource1 = args[1];
		resource2 = args[2];
		gameID = Integer.parseInt(args[3]);
		type = args[4];

		//Take dev card away from current player
		GameModelList.get(gameID).getPlayer(playerIndex).getOldDevCards().updateYearOfPlenty(-1);
		
		//take resources away from gamemodel bank
		for(int i=1; i<3;i++){
			if(args[i].equals("wheat"))
				GameModelList.get(gameID).getBank().updateWheat(-1);
			else if(args[i].equals("ore"))
				GameModelList.get(gameID).getBank().updateOre(-1);
			else if(args[i].equals("sheep"))
				GameModelList.get(gameID).getBank().updateSheep(-1);
			else if(args[i].equals("wood"))
				GameModelList.get(gameID).getBank().updateWood(-1);
			else if(args[i].equals("brick"))
				GameModelList.get(gameID).getBank().updateBrick(-1);
		}

		//give resources to the player
		for(int i=1; i<3; i++){
			if(args[i].equals("wheat"))
				GameModelList.get(gameID).getPlayer(playerIndex).getResourceCardList().updateWheat(1);
			else if(args[i].equals("ore"))
				GameModelList.get(gameID).getPlayer(playerIndex).getResourceCardList().updateOre(1);
			else if(args[i].equals("sheep"))
				GameModelList.get(gameID).getPlayer(playerIndex).getResourceCardList().updateSheep(1);
			else if(args[i].equals("wood"))
				GameModelList.get(gameID).getPlayer(playerIndex).getResourceCardList().updateWood(1);
			else if(args[i].equals("brick"))
				GameModelList.get(gameID).getPlayer(playerIndex).getResourceCardList().updateBrick(1);
		}
		return null;
	}

	@Override
    public void undo(){
		GameModelList.get(gameID).getPlayer(playerIndex).getOldDevCards().updateYearOfPlenty(1);
		if(resource1.equals("wheat"))
			GameModelList.get(gameID).getBank().updateWheat(1);
		else if(resource1.equals("ore"))
			GameModelList.get(gameID).getBank().updateOre(1);
		else if(resource1.equals("sheep"))
			GameModelList.get(gameID).getBank().updateSheep(1);
		else if(resource1.equals("wood")){
			System.out.println("We update wood " );
			GameModelList.get(gameID).getBank().updateWood(1);
		}
		else if(resource1.equals("brick"))
			GameModelList.get(gameID).getBank().updateBrick(1);

		if(resource2.equals("wheat"))
			GameModelList.get(gameID).getBank().updateWheat(1);
		else if(resource2.equals("ore"))
			GameModelList.get(gameID).getBank().updateOre(1);
		else if(resource2.equals("sheep"))
			GameModelList.get(gameID).getBank().updateSheep(1);
		else if(resource2.equals("wood"))
			GameModelList.get(gameID).getBank().updateWood(1);
		else if(resource2.equals("brick"))
			GameModelList.get(gameID).getBank().updateBrick(1);

		if(resource1.equals("wheat"))
			GameModelList.get(gameID).getPlayer(playerIndex).getResourceCardList().updateWheat(-1);
		else if(resource1.equals("ore"))
			GameModelList.get(gameID).getPlayer(playerIndex).getResourceCardList().updateOre(-1);
		else if(resource1.equals("sheep"))
			GameModelList.get(gameID).getPlayer(playerIndex).getResourceCardList().updateSheep(-1);
		else if(resource1.equals("wood"))
			GameModelList.get(gameID).getPlayer(playerIndex).getResourceCardList().updateWood(-1);
		else if(resource1.equals("brick"))
			GameModelList.get(gameID).getPlayer(playerIndex).getResourceCardList().updateBrick(-1);

		if(resource2.equals("wheat"))
			GameModelList.get(gameID).getPlayer(playerIndex).getResourceCardList().updateWheat(-1);
		else if(resource2.equals("ore"))
			GameModelList.get(gameID).getPlayer(playerIndex).getResourceCardList().updateOre(-1);
		else if(resource2.equals("sheep"))
			GameModelList.get(gameID).getPlayer(playerIndex).getResourceCardList().updateSheep(-1);
		else if(resource2.equals("wood"))
			GameModelList.get(gameID).getPlayer(playerIndex).getResourceCardList().updateWood(-1);
		else if(resource2.equals("brick"))
			GameModelList.get(gameID).getPlayer(playerIndex).getResourceCardList().updateBrick(-1);
		//take resources away from gamemodel bank
		// for(int i=1; i<3;i++){
			// if(args[i].equals("wheat"))
				// GameModel.getBank().updateWheat(1);
			// else if(args[i].equals("ore"))
				// GameModel.getBank().updateOre(1);
			// else if(args[i].equals("sheep"))
				// GameModel.getBank().updateSheep(1);
			// else if(args[i].equals("wood"))
				// GameModel.getBank().updateWood(1);
			// else if(args[i].equals("brick"))
				// GameModel.getBank().updateBrick(1);
		// }

		// //give resources to the player
		// for(int i=1; i<3; i++){
			// if(args[i].equals("wheat"))
				// GameModel.getPlayer(playerIndex).getResourceCardList().updateWheat(-1);
			// else if(args[i].equals("ore"))
				// GameModel.getPlayer(playerIndex).getResourceCardList().updateOre(-1);
			// else if(args[i].equals("sheep"))
				// GameModel.getPlayer(playerIndex).getResourceCardList().updateSheep(-1);
			// else if(args[i].equals("wood"))
				// GameModel.getPlayer(playerIndex).getResourceCardList().updateWood(-1);
			// else if(args[i].equals("brick"))
				// GameModel.getPlayer(playerIndex).getResourceCardList().updateBrick(-1);
			// }
	}
}
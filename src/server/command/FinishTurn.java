/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.command;

import server.api.utils.MessageLine;
import server.communication.GameModel;
import server.communication.GameModelList;
import server.persist.*;

/**
 *
 * @author Wesley
 */
public class FinishTurn implements CommandTemplate {
	
	private String type;
	private int playerIndex;
	private String lastStatus;
	private int gameID;
	


	@Override
	public GameModel execute(String[] args) {
		type = args[0];
		playerIndex = Integer.parseInt(args[1]);
		gameID = Integer.parseInt(args[2]);
		lastStatus = GameModelList.get(gameID).getTurnTracker().getStatus();
		
		int currentTurn = GameModelList.get(gameID).getTurnTracker().getCurrentTurn();
		if(GameModelList.get(gameID).getTurnTracker().getStatus().equals("FirstRound")){
			// turnTracker is initialized to playerID = 0 and status = "FirstRound"
			if(GameModelList.get(gameID).getTurnTracker().getCurrentTurn() == 3){
				GameModelList.get(gameID).getTurnTracker().setStatus("SecondRound");
			}
			else{
				GameModelList.get(gameID).getTurnTracker().setCurrentTurn((currentTurn + 1) % 4);
			}
		}
		else if(GameModelList.get(gameID).getTurnTracker().getStatus().equals("SecondRound")){
			if(GameModelList.get(gameID).getTurnTracker().getCurrentTurn() == 0){
				GameModelList.get(gameID).getTurnTracker().setStatus("Rolling");
			}
			else{
				GameModelList.get(gameID).getTurnTracker().setCurrentTurn((currentTurn - 1) % 4);
			}
		}
		else {
			// status should be Rolling now
			GameModelList.get(gameID).getTurnTracker().setCurrentTurn((currentTurn + 1) % 4);
			GameModelList.get(gameID).getTurnTracker().setStatus("Rolling");
		}
		
		GameModelList.get(gameID).incrementRevision();
		
		//take all New dev cards and make them old dev cards
		if(GameModelList.get(gameID).getPlayer(playerIndex).getNewDevCards().getTotal() !=0){
			GameModelList.get(gameID).getPlayer(playerIndex).getOldDevCards().updateYearOfPlenty(GameModelList.get(gameID).getPlayer(playerIndex).getNewDevCards().getYearOfPlenty());
			GameModelList.get(gameID).getPlayer(playerIndex).getOldDevCards().updateMonopoly(GameModelList.get(gameID).getPlayer(playerIndex).getNewDevCards().getMonopoly());
			GameModelList.get(gameID).getPlayer(playerIndex).getOldDevCards().updateRoadBuilding(GameModelList.get(gameID).getPlayer(playerIndex).getNewDevCards().getRoadBuilding());
			GameModelList.get(gameID).getPlayer(playerIndex).getOldDevCards().updateSoldier(GameModelList.get(gameID).getPlayer(playerIndex).getNewDevCards().getSoldier());
		}
		
		MessageLine logMsg = new MessageLine();
		logMsg.setSource(GameModelList.get(gameID).getPlayer(playerIndex).getName());
		logMsg.setMessage(GameModelList.get(gameID).getPlayer(playerIndex).getName() + "'s turn has ended.");
		GameModelList.get(gameID).getLog().addLine(logMsg);
		
		return null;
	}

	@Override
	public void persist(){
		StorageFacade.addCommand(gameID, this, type);
	}
	@Override
	public void redo(){
		lastStatus = GameModelList.get(gameID).getTurnTracker().getStatus();
		
		int currentTurn = GameModelList.get(gameID).getTurnTracker().getCurrentTurn();
		if(GameModelList.get(gameID).getTurnTracker().getStatus().equals("FirstRound")){
			// turnTracker is initialized to playerID = 0 and status = "FirstRound"
			if(GameModelList.get(gameID).getTurnTracker().getCurrentTurn() == 3){
				GameModelList.get(gameID).getTurnTracker().setStatus("SecondRound");
			}
			else{
				GameModelList.get(gameID).getTurnTracker().setCurrentTurn((currentTurn + 1) % 4);
			}
		}
		else if(GameModelList.get(gameID).getTurnTracker().getStatus().equals("SecondRound")){
			if(GameModelList.get(gameID).getTurnTracker().getCurrentTurn() == 0){
				GameModelList.get(gameID).getTurnTracker().setStatus("Rolling");
			}
			else{
				GameModelList.get(gameID).getTurnTracker().setCurrentTurn((currentTurn - 1) % 4);
			}
		}
		else {
			// status should be Rolling now
			GameModelList.get(gameID).getTurnTracker().setCurrentTurn((currentTurn + 1) % 4);
			GameModelList.get(gameID).getTurnTracker().setStatus("Rolling");
		}
		
		GameModelList.get(gameID).incrementRevision();
		
		//take all New dev cards and make them old dev cards
		if(GameModelList.get(gameID).getPlayer(playerIndex).getNewDevCards().getTotal() !=0){
			GameModelList.get(gameID).getPlayer(playerIndex).getOldDevCards().updateYearOfPlenty(GameModelList.get(gameID).getPlayer(playerIndex).getNewDevCards().getYearOfPlenty());
			GameModelList.get(gameID).getPlayer(playerIndex).getOldDevCards().updateMonopoly(GameModelList.get(gameID).getPlayer(playerIndex).getNewDevCards().getMonopoly());
			GameModelList.get(gameID).getPlayer(playerIndex).getOldDevCards().updateRoadBuilding(GameModelList.get(gameID).getPlayer(playerIndex).getNewDevCards().getRoadBuilding());
			GameModelList.get(gameID).getPlayer(playerIndex).getOldDevCards().updateSoldier(GameModelList.get(gameID).getPlayer(playerIndex).getNewDevCards().getSoldier());
		}
		
		MessageLine logMsg = new MessageLine();
		logMsg.setSource(GameModelList.get(gameID).getPlayer(playerIndex).getName());
		logMsg.setMessage(GameModelList.get(gameID).getPlayer(playerIndex).getName() + "'s turn has ended.");
		GameModelList.get(gameID).getLog().addLine(logMsg);

	
	}

	@Override
	public void undo() {
		int currentTurn = GameModelList.get(gameID).getTurnTracker().getCurrentTurn();
		GameModelList.get(gameID).getTurnTracker().setCurrentTurn((currentTurn - 1) % 4);
		GameModelList.get(gameID).getTurnTracker().setStatus(lastStatus);
	}
	
}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.command;

import server.api.utils.MessageLine;
import server.communication.GameModel;

/**
 *
 * @author Wesley
 */
public class FinishTurn implements CommandTemplate {
	
	private String type;
	private int playerIndex;
	private String lastStatus;

	@Override
	public GameModel execute(String[] args) {
		type = args[0];
		playerIndex = Integer.parseInt(args[1]);
		lastStatus = GameModel.getTurnTracker().getStatus();
		
		int currentTurn = GameModel.getTurnTracker().getCurrentTurn();
		if(GameModel.getTurnTracker().getStatus().equals("FirstRound")){
			// turnTracker is initialized to playerID = 0 and status = "FirstRound"
			if(GameModel.getTurnTracker().getCurrentTurn() == 3){
				GameModel.getTurnTracker().setStatus("SecondRound");
			}
			else{
				GameModel.getTurnTracker().setCurrentTurn((currentTurn + 1) % 4);
			}
		}
		else if(GameModel.getTurnTracker().getStatus().equals("SecondRound")){
			if(GameModel.getTurnTracker().getCurrentTurn() == 0){
				GameModel.getTurnTracker().setStatus("Rolling");
			}
			else{
				GameModel.getTurnTracker().setCurrentTurn((currentTurn - 1) % 4);
			}
		}
		else {
			// status should be Rolling now
			GameModel.getTurnTracker().setCurrentTurn((currentTurn + 1) % 4);
			GameModel.getTurnTracker().setStatus("Rolling");
		}
		
		GameModel.incrementRevision();
		
		//take all New dev cards and make them old dev cards
		if(GameModel.getPlayer(playerIndex).getNewDevCards().getTotal() !=0){
			GameModel.getPlayer(playerIndex).getOldDevCards().updateYearOfPlenty(GameModel.getPlayer(playerIndex).getNewDevCards().getYearOfPlenty());
			GameModel.getPlayer(playerIndex).getOldDevCards().updateMonopoly(GameModel.getPlayer(playerIndex).getNewDevCards().getMonopoly());
			GameModel.getPlayer(playerIndex).getOldDevCards().updateRoadBuilding(GameModel.getPlayer(playerIndex).getNewDevCards().getRoadBuilding());
			GameModel.getPlayer(playerIndex).getOldDevCards().updateSoldier(GameModel.getPlayer(playerIndex).getNewDevCards().getSoldier());
		}
		
		MessageLine logMsg = new MessageLine();
		logMsg.setSource(GameModel.getPlayer(playerIndex).getName());
		logMsg.setMessage(GameModel.getPlayer(playerIndex).getName() + "'s turn has ended.");
		GameModel.getLog().addLine(logMsg);
		
		return null;
	}

	@Override
	public void undo() {
		int currentTurn = GameModel.getTurnTracker().getCurrentTurn();
		GameModel.getTurnTracker().setCurrentTurn((currentTurn - 1) % 4);
		GameModel.getTurnTracker().setStatus(lastStatus);
	}
	
}

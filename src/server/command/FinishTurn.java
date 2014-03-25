/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.command;

import server.communication.GameModel;

/**
 *
 * @author Wesley
 */
public class FinishTurn implements CommandTemplate {
	
	private String type;
	private int playerID;
	private String lastStatus;

	@Override
	public GameModel execute(String[] args) {
		type = args[0];
		playerID = Integer.parseInt(args[1]);
		lastStatus = GameModel.getTurnTracker().getStatus();
		
		int currentTurn = GameModel.getTurnTracker().getCurrentTurn();
		GameModel.getTurnTracker().setCurrentTurn((currentTurn + 1) % 4);
		GameModel.getTurnTracker().setStatus("Rolling");
		GameModel.incrementRevision();
		
		return null;
	}

	@Override
	public void undo() {
		int currentTurn = GameModel.getTurnTracker().getCurrentTurn();
		GameModel.getTurnTracker().setCurrentTurn((currentTurn - 1) % 4);
		GameModel.getTurnTracker().setStatus(lastStatus);
	}
	
}

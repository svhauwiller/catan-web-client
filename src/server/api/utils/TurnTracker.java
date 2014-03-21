/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.api.utils;

/**
 *
 * @author Wesley
 */
public class TurnTracker {
	private int currentTurn;
	private String status;
	
	public TurnTracker(){
		setCurrentTurn(0);
		setStatus("Rolling");
	}

	public int getCurrentTurn() {
		return currentTurn;
	}

	public void setCurrentTurn(int currentTurn) {
		this.currentTurn = currentTurn;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}

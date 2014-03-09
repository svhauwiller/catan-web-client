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
		currentTurn = 0;
		status = "Rolling";
	}
}

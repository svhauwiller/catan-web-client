/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.api.map;

/**
 *
 * @author Wesley
 */
public class Contents {
	private Integer ownerID;
	private Integer worth;
	
	public Contents(boolean isVertex){
		if(isVertex){
			worth = 1;
		}
		ownerID = -1;
	}
}

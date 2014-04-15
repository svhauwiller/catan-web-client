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
	
	public Integer getOwnerID(){
		return ownerID;
	}
	
	public void setOwnerID(int newOwnerID){ // SHOULD I PUT A CHECK HERE AND RETURN SOMETHING IF THE OWNERID IS ALREADY NOT -1 AND IS NOT THE GIVEN OWNERID?
		ownerID = newOwnerID;
	}
	
	public Integer getWorth(){
		return worth;
	}
	
	public void setWorth(int newWorth){ // should only get used when a settlement becomes a city
		worth = newWorth;
	}
}


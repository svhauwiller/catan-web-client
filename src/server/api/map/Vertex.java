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
public class Vertex {
	private Contents value;
	
	public Vertex(){
		value = new Contents(true);
	}
	
	public void setOwner(int ownerID){
		if(value.getOwnerID() == -1){
			value.setOwnerID(ownerID);
		}
		else if(value.getOwnerID() == ownerID && value.getWorth() == 1){ // if the owner already owns the vertex and it is a settlement
			value.setWorth(2); // then turn it into a city
		}
		else{
			// Scream and shout or something
		}
	}
}


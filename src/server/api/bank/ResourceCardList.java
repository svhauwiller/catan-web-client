/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.api.bank;

/**
 *
 * @author Wesley
 */
public class ResourceCardList {
	
	private int brick;
	private int wood;
	private int sheep;
	private int wheat;
	private int ore;
	
	public ResourceCardList(String type){
		switch(type){
			case "bank":
				System.out.println("Player in resourcecardList");
				this.brick = 23;
				this.wood = 21;
				this.sheep = 20;
				this.wheat = 22;
				this.ore = 22;
				break;
			case "player":
				System.out.println("Player in resourcecardList");
				this.brick = 0;
				this.wood = 0;
				this.sheep = 0;
				this.wheat = 0;
				this.ore = 0;
				break;
		}
	}

	/////////////////////////////////////////////////GETTERS AND SETTERS//////////////////////////////////////////////////////////////
	public int getBrick(){
		return brick;
	}
	
	public void setBrick(int amount){
		brick = amount;
	}
	
	public int getWood(){
		return wood;
	}

	public void setWood(int amount){
		wood = amount;
	}

	public int getSheep(){
		return sheep;
	}
	
	public void setSheep(int amount){
		sheep = amount;
	}

	public int getOre(){
		return ore;
	}
	
	public void setOre(int amount){
		ore = amount;
	}

	public int getWheat(){
		return wheat;
	}


	////////////////////////////////////////////UPDATE METHODS///////////////////////////////////////////////////////////
	public void updateBrick(int amount){
		brick += amount;
	}
	
	public void updateWood(int amount){
		wood+=amount;
	}
	
	public void updateSheep(int amount){
		sheep+=amount;
	}

	public void updateOre(int amount){
		ore+=amount;
	}

	public void updateWheat(int amount){
		wheat+=amount;
	}
}


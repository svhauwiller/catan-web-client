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
public class DevCardList {
	
	private int yearOfPlenty;
	private int monopoly;
	private int soldier;
	private int roadBuilding;
	private int monument;
	
	public DevCardList(){
		this.yearOfPlenty = 2;
		this.monopoly = 2;
		this.soldier = 14;
		this.roadBuilding = 2;
		this.monument = 5;
	}
	
	public int getYearOfPlenty(){
		return yearOfPlenty;
	}
	
	public void setYearOfPlenty(int amount){
		yearOfPlenty = amount;
	}

	public int getMonopoly(){
		return monopoly;
	}

	public void setMonopoly(int amount){
		monopoly = amount;
	}

	public int getSoldier(){
		return soldier;
	}

	public void setSoldier(int amount){
		soldier = amount;
	}

	public int getRoadBuilding(){
		return roadBuilding;
	}

	public void setRoadBuilding(int amount){
		roadBuilding = amount;
	}
	
	public int getMonument(){
		return monument;
	}

	public void setMonument(int amount){
		monument = amount;
	}

	public void updateYearOfPlenty(int amount){
		yearOfPlenty += amount;
	}

	public void updateMonopoly(int amount){
		monopoly += amount;
	}

	public void updateSoldier(int amount){
		soldier += amount;
	}

	public void updateRoadBuilder(int amount){
		roadBuilder += amount;
	}
	
	public void updateMonument(int amount){
		monument += amount;
	}
}

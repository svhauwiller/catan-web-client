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
public class Location {
	private int x;
	private int y;
	private String direction;
	
	public Location(int x, int y, boolean hasDirection){
		this.x = x;
		this.y = y;
		if(hasDirection){
			direction = "NW";
		}
	}
	
	public int getX(){
		return x;
	}
	
	public void setX(int newX){
		x = newX;
	}
	
	public int getY(){
		return y;
	}
	
	public void setY(int newY){
		y = newY;
	}
	
	public String getDirection(){
		return direction;
	}
	
	public void setDirection(String newDirection){
		direction = newDirection;
	}

	public boolean equals(Location otherLoc){
		if(this.x == otherLoc.getX() && this.y == otherLoc.getY() && this.direction.equals(otherLoc.getDirection())){
			return true;
		}
		else{
			return false;
		}
	}
}


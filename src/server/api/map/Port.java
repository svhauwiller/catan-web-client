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
public class Port {
	private Location location;
	private String orientation;
	private int ratio;
	private Location validVertex1;
	private Location validVertex2;
	private String inputResource;
	
	public Port(){
		location = new Location(0, 0, false);
		orientation = "N";
		ratio = 3;
		validVertex1 = new Location(0, 0, true);
		validVertex2 = new Location(0, 0, true);
		inputResource = "Wood";
	}

	public void setLocation(int x, int y){
		location.setX(x);
		location.setY(y);
	}

	public void setLocation(int x, int y, String direction){
		location.setX(x);
		location.setY(y);
		location.setDirection(direction);
	}

	public void setOrientation(String newO){
		orientation = newO;
	}

	public void setRatio(int newRatio){
		ratio = newRatio;
	}

	public void setValidVertex1(int x, int y, String direction){
		validVertex1.setX(x);
		validVertex1.setY(y);
		validVertex1.setDirection(direction);
	}

	public void setValidVertex2(int x, int y, String direction){
		validVertex2.setX(x);
		validVertex2.setY(y);
		validVertex2.setDirection(direction);
	}

	public void setInputResource(String newResource){
		inputResource = newResource;
	}
}

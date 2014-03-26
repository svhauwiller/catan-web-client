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
	
	public Port(){
		location = new Location(0, 0, false);
		orientation = "N";
		ratio = 3;
		validVertex1 = new Location(0, 0, true);
		validVertex2 = new Location(0, 0, true);
	}
}

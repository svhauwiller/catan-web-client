/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.api.map;

import java.util.ArrayList;
import java.util.HashMap;

/**
 *
 * @author Wesley
 */
public class Map {
	private HexGrid hexGrid;
	private ArrayList< ArrayList<Location> > numbers;
	private ArrayList<Port> ports;
	private int radius;
	private Location robber;
	
	public Map(){
		hexGrid = new HexGrid();
		numbers = initNumbers();
		ports = new ArrayList<>();
		radius = 4;
		robber = new Location(0, 0, false);
		
		for(int i = 0; i < 9; i++){
			ports.add(new Port());
		}
	}

	private ArrayList< ArrayList<Location> > initNumbers() {
		ArrayList< ArrayList<Location> > chits = new ArrayList<>(); // TODO: convert this HashMap to an ArrayList and just leave 0, 1, and 7 empty
		for(int i = 0; i < 13; i++){
			chits.add(new ArrayList<Location>());
		}
		chits.get(2).add(new Location(-2, 1, false));
		chits.get(3).add(new Location(-1, 2, false));
		chits.get(3).add(new Location(0, -1, false));
		chits.get(4).add(new Location(1, -2, false));
		chits.get(4).add(new Location(0, 1, false));
		chits.get(5).add(new Location(1, 0, false));
		chits.get(5).add(new Location(-2, 0, false));
		chits.get(6).add(new Location(2, 0, false));
		chits.get(6).add(new Location(-2, 2, false));
		chits.get(8).add(new Location(0, 2, false));
		chits.get(8).add(new Location(-1, -1, false));
		chits.get(9).add(new Location(-1, 1, false));
		chits.get(9).add(new Location(1, -1, false));
		chits.get(10).add(new Location(1, 1, false));
		chits.get(10).add(new Location(-1, 0, false));
		chits.get(11).add(new Location(2, -2, false));
		chits.get(11).add(new Location(0, 0, false));
		chits.get(12).add(new Location(2, -1, false));
		return chits;
	}
	
	public void updateEdgeOwner(Location hexLoc, int ownerID){ // build road
		hexGrid.updateEdgeOwner(hexLoc, ownerID);
	}
	
	public void updateVertexOwner(Location hexLoc, int ownerID){ // build settlement or city
		hexGrid.updateVertexOwner(hexLoc, ownerID);
	}

	public ArrayList<Location> getLocationsOfNumber(int rolledNumber){
		ArrayList<Location> locations = numbers.get(rolledNumber);
		return locations;
	}

	public ArrayList<Integer> getPlayersAtHex(Location hexLoc){
		ArrayList<Integer> playersAtHex = new ArrayList<Integer>();
		if(!robber.equals(hexLoc)){
			playersAtHex = hexGrid.getPlayersAtHex(hexLoc);	
		}
		return playersAtHex;
	}

	public String getLandTypeAtHex(Location hexLoc){
		return hexGrid.getLandTypeAtHex(hexLoc);
	}
	
	public void moveRobber(Location hexLoc){
		robber.setX(hexLoc.getX());
		robber.setY(hexLoc.getY());
	}
}


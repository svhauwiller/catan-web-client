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
	private HashMap<Integer, ArrayList<Location> > numbers;
	private ArrayList<Port> ports;
	private int radius;
	private Location robber;
	
	public Map(){
		hexGrid = new HexGrid();
		numbers = initNumbers();
		ports = new ArrayList<>();
		radius = 4;
		robber = new Location(false);
		
		for(int i = 0; i < 9; i++){
			ports.add(new Port());
		}
	}

	private HashMap<Integer, ArrayList<Location>> initNumbers() {
		HashMap<Integer, ArrayList<Location>> chits = new HashMap<>(); // TODO: convert this HashMap to an ArrayList and just leave 0, 1, and 7 empty
		chits.put(2, new ArrayList<Location>());
		chits.put(3, new ArrayList<Location>());
		chits.put(4, new ArrayList<Location>());
		chits.put(5, new ArrayList<Location>());
		chits.put(6, new ArrayList<Location>());
		chits.put(8, new ArrayList<Location>());
		chits.put(9, new ArrayList<Location>());
		chits.put(10, new ArrayList<Location>());
		chits.put(11, new ArrayList<Location>());
		chits.put(12, new ArrayList<Location>());
		return chits;
	}
	
	public void updateEdgeOwner(Location hexLoc, int ownerID){ // build road
		hexGrid.updateEdgeOwner(hexLoc, ownerID);
	}
	
	public void updateVertexOwner(Location hexLoc, int ownerID){ // build settlement or city
		hexGrid.updateVertexOwner(hexLoc, ownerID);
	}

	public ArrayList<Integer> getPlayersAtHex(int rolledNumber){
		ArrayList<Integer> playersAtHex = new ArrayList<Integer>();
		ArrayList<Location> locations = numbers.get(rolledNumber);
		for (int i = 0; i < locations.size(); i++){
			//hexGrid.getPlayersAtHex();
		}
		return playersAtHex;
	}
	
	public void moveRobber(Location hexLoc){
		robber.setX(hexLoc.getX());
		robber.setY(hexLoc.getY());
	}
}


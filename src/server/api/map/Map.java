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
		robber = new Location(0, -2, false);
		
		/*for(int i = 0; i < 9; i++){
			ports.add(new Port());
		}*/
		ports = initPorts();
	}

	private ArrayList< ArrayList<Location> > initNumbers() {
		ArrayList< ArrayList<Location> > chits = new ArrayList<>();
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

	private ArrayList<Port> initPorts(){
		ArrayList<Port> ports = new ArrayList<Port>();
		Port port1 = new Port();
		port1.setRatio(2);
		port1.setInputResource("Wood");
		port1.setValidVertex1(-3, 2, "NE");
		port1.setValidVertex2(-3, 2, "E");
		port1.setOrientation("NE");
		port1.setLocation(-3, 2);
		ports.add(port1);

		Port port2 = new Port();
		port2.setRatio(3);
		port2.setInputResource("");
		port2.setValidVertex1(0, 3, "NW");
		port2.setValidVertex2(0, 3, "NE");
		port2.setOrientation("N");
		port2.setLocation(0, 3);
		ports.add(port2);

		Port port3 = new Port();
		port3.setRatio(3);
		port3.setInputResource("");
		port3.setValidVertex1(2, 1, "W");
		port3.setValidVertex2(2, 1, "NW");
		port3.setOrientation("NW");
		port3.setLocation(2, 1);
		ports.add(port3);

		Port port4 = new Port();
		port4.setRatio(3);
		port4.setInputResource("");
		port4.setValidVertex1(-3, 0, "E");
		port4.setValidVertex2(-3, 0, "SE");
		port4.setOrientation("SE");
		port4.setLocation(-3, 0);
		ports.add(port4);

		Port port5 = new Port();
		port5.setRatio(2);
		port5.setInputResource("Ore");
		port5.setValidVertex1(1, -3, "SE");
		port5.setValidVertex2(1, -3, "SW");
		port5.setOrientation("S");
		port5.setLocation(1, -3, "S");
		ports.add(port5);

		Port port6 = new Port();
		port6.setRatio(2);
		port6.setInputResource("Wheat");
		port6.setValidVertex1(-1, -2, "SE");
		port6.setValidVertex2(-1, -2, "SW");
		port6.setOrientation("S");
		port6.setLocation(-1, -2);
		ports.add(port6);

		Port port7 = new Port();
		port7.setRatio(2);
		port7.setInputResource("Brick");
		port7.setValidVertex1(-2, 3, "NE");
		port7.setValidVertex1(-2, 3, "E");
		port7.setOrientation("NE");
		port7.setLocation(-2, 3);
		ports.add(port7);

		Port port8 = new Port();
		port8.setRatio(2);
		port8.setInputResource("Sheep");
		port8.setValidVertex1(3, -1, "W");
		port8.setValidVertex2(3, -1, "NW");
		port8.setOrientation("NW");
		port8.setLocation(3, -1);
		ports.add(port8);

		Port port9 = new Port();
		port9.setRatio(3);
		port9.setInputResource("");
		port9.setValidVertex1(3, -3, "SW");
		port9.setValidVertex2(3, -3, "W");
		port9.setOrientation("SW");
		port9.setLocation(3, -3);
		ports.add(port9);
		return ports;
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


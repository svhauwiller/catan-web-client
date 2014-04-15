/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.api.map;

import java.util.ArrayList;

/**
 *
 * @author Wesley
 */
public class HexGrid {
	private ArrayList< ArrayList<Hex> > hexes;
	private ArrayList<Integer> offsets;
	private int radius;
	private int x0;
	private int y0;
	
	public HexGrid(){
		hexes = new ArrayList<>();
		offsets = new ArrayList<>();
		radius = 4;
		x0 = 0;
		y0 = 0;
		
		offsets.add(3);
		offsets.add(2);
		offsets.add(1);
		offsets.add(0);
		offsets.add(0);
		offsets.add(0);
		offsets.add(0);

		setHexes();
	}

	private void setHexes(){
		ArrayList<String> landTypes = new ArrayList<>();
		landTypes.add(""); // desert
		landTypes.add("Brick");
		landTypes.add("Wood");
		landTypes.add("Brick");
		landTypes.add("Wood");
		landTypes.add("Ore");
		landTypes.add("Sheep");
		landTypes.add("Ore");
		landTypes.add("Sheep");
		landTypes.add("Wheat");
		landTypes.add("Brick");
		landTypes.add("Wheat");
		landTypes.add("Wheat");
		landTypes.add("Sheep");
		landTypes.add("Wood");
		landTypes.add("Sheep");
		landTypes.add("Wood");
		landTypes.add("Ore");
		landTypes.add("Wheat");

		ArrayList<Location> hexLocations = new ArrayList<Location>();
		hexLocations.add(new Location(0, -3, false));
		hexLocations.add(new Location(1, -3, false));
		hexLocations.add(new Location(2, -3, false));
		hexLocations.add(new Location(3, -3, false));
		hexLocations.add(new Location(-1, -2, false));
		hexLocations.add(new Location(0, -2, false));
		hexLocations.add(new Location(1, -2, false));
		hexLocations.add(new Location(2, -2, false));
		hexLocations.add(new Location(3, -2, false));
		hexLocations.add(new Location(-2, -1, false));
		hexLocations.add(new Location(-1, -1, false));
		hexLocations.add(new Location(0, -1, false));
		hexLocations.add(new Location(1, -1, false));
		hexLocations.add(new Location(2, -1, false));
		hexLocations.add(new Location(3, -1, false));
		hexLocations.add(new Location(-3, 0, false));
		hexLocations.add(new Location(-2, 0, false));
		hexLocations.add(new Location(-1, 0, false));
		hexLocations.add(new Location(0, 0, false));
		hexLocations.add(new Location(1, 0, false));
		hexLocations.add(new Location(2, 0, false));
		hexLocations.add(new Location(3, 0, false));
		hexLocations.add(new Location(-3, 1, false));
		hexLocations.add(new Location(-2, 1, false));
		hexLocations.add(new Location(-1, 1, false));
		hexLocations.add(new Location(0, 1, false));
		hexLocations.add(new Location(1, 1, false));
		hexLocations.add(new Location(2, 1, false));
		hexLocations.add(new Location(-3, 2, false));
		hexLocations.add(new Location(-2, 2, false));
		hexLocations.add(new Location(-1, 2, false));
		hexLocations.add(new Location(0, 2, false));
		hexLocations.add(new Location(1, 2, false));
		hexLocations.add(new Location(-3, 3, false));
		hexLocations.add(new Location(-2, 3, false));
		hexLocations.add(new Location(-1, 3, false));
		hexLocations.add(new Location(0, 3, false));
	
		int typecount = 0;
		int locCount = 0;
		for(int i = 0; i < 7; i++){
			hexes.add(new ArrayList<Hex>());
			for(int j = 0; j < 7; j++){
				Hex hexToAdd = new Hex();
				//System.out.println(locCount);
				if(onBoard(i, j)){
					hexToAdd.setLocation(hexLocations.get(locCount));
					locCount++;
				}
				if(j == 0 || i == 0 || i == 6 || (i == 1 && j >= 4) || (i == 2 && j >= 5) || (i == 3 && j >= 6) || (i == 4 && j >= 5) || (i == 5 && j >= 4)){
					hexToAdd.setIsLand(false);
				}
				else{
					hexToAdd.setLandType(landTypes.get(typecount));
					typecount++;
				}
				hexes.get(i).add(hexToAdd);

				
			}
		}
	}

	private boolean onBoard(int i, int j){
		if((i == 6 && j <= 3) || (i == 5 && j <= 4) || (i == 4 && j <= 5) || (i == 3 && j <= 6) || (i == 2 && j <= 5) || (i == 1 && j <= 4) || (i == 0 && j <= 3)){
			return true;
		}
		return false;
	}
	
	public void updateEdgeOwner(Location hexLoc, int ownerID){
		System.out.println("Passed to HexGrid - updateEdgeOwner");
		System.out.println("direction = " + hexLoc.getDirection() + "; ownerID = " + ownerID);
		Location newHexLoc = convertHexLocToArrayListIndexes(hexLoc);
		//hexes.get(newHexLoc.getX()).get(newHexLoc.getY()).updateEdgeOwner(hexLoc.getDirection(), ownerID);
		buildRoad(newHexLoc.getX(), newHexLoc.getY(), newHexLoc.getDirection(), ownerID);
	}
	
	public void updateVertexOwner(Location hexLoc, int ownerID){
		System.out.println("Passed to HexGrid - updateVertexOwner");
		System.out.println("direction = " + hexLoc.getDirection() + "; ownerID = " + ownerID);
		Location newHexLoc = convertHexLocToArrayListIndexes(hexLoc);
		//hexes.get(newHexLoc.getX()).get(newHexLoc.getY()).updateVertexOwner(hexLoc.getDirection(), ownerID);
		buildSettlementOrCity(newHexLoc.getX(), newHexLoc.getY(), newHexLoc.getDirection(), ownerID);
	}

	public ArrayList<Integer> getPlayersAtHex(Location hexLoc){
		Location newHexLoc = convertHexLocToArrayListIndexes(hexLoc);
		return hexes.get(newHexLoc.getX()).get(newHexLoc.getY()).getPlayers();
	}
	public String getLandTypeAtHex(Location hexLoc){
		Location newHexLoc = convertHexLocToArrayListIndexes(hexLoc);
		return hexes.get(newHexLoc.getX()).get(newHexLoc.getY()).getLandType();
	}

	private Location convertHexLocToArrayListIndexes(Location hexLoc){
		int offset = offsets.get(hexLoc.getY() + 3);
		//int newX = hexLoc.getX() - temp1 + 3;
		//int newY = hexLoc.getY() + 3;
		int newX = hexLoc.getY() + 3;
		int newY = hexLoc.getX() + 3 - offset;
		System.out.println("hexLoc.getY()=" + hexLoc.getY() + " => newX=" + newX);
		//System.out.println("y = " + hexLoc.getY() + " + " + temp2 + " = " + newY);
		System.out.println("hexLoc.getX()=" + hexLoc.getX() + ", offset=" + offset + " => newY=" + newY);
		Location newHexLoc = new Location(newX, newY, hexLoc.hasDirection());
		if(hexLoc.hasDirection()){
			newHexLoc.setDirection(hexLoc.getDirection());
		}
		return newHexLoc;
	}
	
	private void buildSettlementOrCity(int newX, int newY, String newDir, int ownerID){
		this.hexes.get(newX).get(newY).updateVertexOwner(newDir, ownerID);
		System.out.println(newDir);
		int offset = 0;
		switch(newDir){
			case "NW":
				break;
			case "NE":
				break;
			case "E":
				//offset = offsets.get(newY - 1);
				offset = offsets.get(newY);
				/*if(offsets.get(newY - 1) != 0){
					offset -= 1;
				}*/
				this.hexes.get(newX - 1).get(newY + 1 - offset).updateVertexOwner("SW", ownerID);
				this.hexes.get(newX).get(newY + 1).updateVertexOwner("NE", ownerID);
				break;
			case "SE":
				break;
			case "SW":
				break;
			case "W":
				//offset = offsets.get(newY - 1);
				offset = offsets.get(newY);
				/*if(offsets.get(newY - 1) != 0){
					offset -= 1;
				}*/
				this.hexes.get(newX + 1).get(newY - 1 - offset).updateVertexOwner("NE", ownerID);
				this.hexes.get(newX).get(newY - 1).updateVertexOwner("SE", ownerID);
				break;
		}
	}
	
	private void buildRoad(int newX, int newY, String newDir, int ownerID){
		this.hexes.get(newX).get(newY).updateEdgeOwner(newDir, ownerID);
		System.out.println(newDir);
		int offset = 0;
		switch(newDir){
			case "NW":
				break;
			case "N":
				break;
			case "NE":
				break;
			case "SE":
				this.hexes.get(newX).get(newY + 1).updateEdgeOwner("NW", ownerID);
				break;
			case "S":
				//offset = offsets.get(newY - 1);
				offset = offsets.get(newY - 2);
				/*if(offsets.get(newY - 1) != 0){
					offset -= 1;
				}*/
				this.hexes.get(newX + 1).get(newY - offset).updateEdgeOwner("N", ownerID);
				break;
			case "SW":
				//offset = offsets.get(newY - 1);
				offset = offsets.get(newY - 2);
				/*if(offsets.get(newY - 1) != 0){
					offset -= 1;
				}*/
				this.hexes.get(newX + 1).get(newY - offset - 1).updateEdgeOwner("NE", ownerID);
				break;
		}
	}
}


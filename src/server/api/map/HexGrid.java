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
		int temp1 = offsets.get(hexLoc.getX() + 3);
		//int temp2 = offsets.get(hexLoc.getY());
		int newX = hexLoc.getX() + temp1 + 3;
		int newY = hexLoc.getY() + 3;
		System.out.println("x = " + hexLoc.getX() + " + " + temp1 + " = " + newX);
		//System.out.println("y = " + hexLoc.getY() + " + " + temp2 + " = " + newY);
		System.out.println("y = " + newY);
		hexes.get(newX).get(newY).updateEdgeOwner(hexLoc.getDirection(), ownerID);
		//hexes.get(hexLoc.getX() + offsets.get(hexLoc.getX()+3)).get(hexLoc.getY() + offsets.get(hexLoc.getY()+3)).updateEdgeOwner(hexLoc.getDirection(), ownerID);
	}
	
	public void updateVertexOwner(Location hexLoc, int ownerID){
		System.out.println("Passed to HexGrid - updateVertexOwner");
		System.out.println("direction = " + hexLoc.getDirection() + "; ownerID = " + ownerID);
		int temp1 = offsets.get(hexLoc.getX() + 3);
		//int temp2 = offsets.get(hexLoc.getY());
		int newX = hexLoc.getX() + temp1 + 3;
		int newY = hexLoc.getY() + 3;
		System.out.println("x = " + hexLoc.getX() + " + " + temp1 + " = " + newX);
		//System.out.println("y = " + hexLoc.getY() + " + " + temp2 + " = " + newY);
		System.out.println("y = " + newY);
		hexes.get(newX).get(newY).updateVertexOwner(hexLoc.getDirection(), ownerID);
	}

	public ArrayList<Integer> getPlayersAtHex(Location hexLoc){
		return hexes.get(hexLoc.getX() + offsets.get(hexLoc.getX()+3)).get(hexLoc.getY() + offsets.get(hexLoc.getX()+3)).getPlayers();
	}
	public String getLandTypeAtHex(Location hexLoc){
		return hexes.get(hexLoc.getX() + offsets.get(hexLoc.getX()+3)).get(hexLoc.getY() + offsets.get(hexLoc.getX()+3)).getLandType();
	}
}


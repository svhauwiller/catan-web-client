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
public class Hex {
	private ArrayList<Edge> edges;
	private boolean isLand;
	private String landtype;
	private Location location;
	private ArrayList<Vertex> vertexes;
	
	String[] edLookup = {"NW","N","NE","SE","S","SW"};
	String[] vdLookup = {"W","NW","NE","E","SE","SW"};
	
	public Hex(){
		edges = new ArrayList<>();
		isLand = true;
		landtype = "Ore"; // Sheep, Brick, Ore, Wheat, Wood
		location = new Location(-5, -5, false);
		vertexes = new ArrayList<>();
		
		for(int i = 0; i < 6; i++){
			edges.add(new Edge());
			vertexes.add(new Vertex());
		}
	}

	public void setLocation(Location newLoc){
		location.set(newLoc);
	}
	
	public String getLandType(){
		return landtype;
	}

	public void setLandType(String newLandType){
		landtype = newLandType;
	}

	public void setIsLand(boolean isILand){
		isLand = isILand;
	}
	
	public void updateEdgeOwner(String direction, int ownerID){
		edges.get(indexEdgeOf(direction)).setOwner(ownerID);
		//edges.get(direction).setOwner(ownerID);
	}
	
	public void updateVertexOwner(String direction, int ownerID){
		vertexes.get(indexVertexOf(direction)).setOwner(ownerID);
		//vertexes.get(direction).setOwner(ownerID);
	}

	public ArrayList<Integer> getPlayers(){
		ArrayList<Integer> playerIDs = new ArrayList<Integer>();
		for(int i = 0; i < 6; i++){
			if(vertexes.get(i).getOwner() != -1){
				playerIDs.add(vertexes.get(i).getOwner());
			}
		}
		return playerIDs;
	}
	
	private int indexEdgeOf(String element){
		int index = -1;
		for(int i = 0; i < edges.size(); i++){
			if(element.equals(edLookup[i])){
				index = i;
			}
		}
		return index;
	}
	
	private int indexVertexOf(String element){
		int index = -1;
		for(int i = 0; i < edges.size(); i++){
			if(element.equals(vdLookup[i])){
				index = i;
			}
		}
		return index;
	}
}


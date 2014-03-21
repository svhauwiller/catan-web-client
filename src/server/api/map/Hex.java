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
	private String landType;
	private Location location;
	private ArrayList<Vertex> vertexes;
	
	//var edLookup = ["NW","N","NE","SE","S","SW"]
	//var vdLookup = ["W","NW","NE","E","SE","SW"]
	
	public Hex(){
		edges = new ArrayList<>();
		isLand = true;
		landType = "ore";
		location = new Location(false);
		vertexes = new ArrayList<>();
		
		for(int i = 0; i < 6; i++){
			edges.add(new Edge());
			vertexes.add(new Vertex());
		}
	}
	
	public void updateEdgeOwner(int direction, int ownerID){
		edges.get(direction).setOwner(ownerID);
	}
	
	public void updateVertexOwner(int direction, int ownerID){
		vertexes.get(direction).setOwner(ownerID);
	}
}


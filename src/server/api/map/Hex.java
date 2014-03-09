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
	
}

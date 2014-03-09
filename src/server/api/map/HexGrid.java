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
		
		for(int i = 0; i < 7; i++){
			hexes.add(new ArrayList<Hex>());
			for(int j = 0; j < 7; j++){
				hexes.get(i).add(new Hex());
			}
		}
	}
}

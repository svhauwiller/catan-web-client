/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.communication;

import server.api.player.Player.PlayerColor;



/**
 *
 * @author Wesley
 */
public class PlayerInfo {
	private PlayerColor color;
	private int id;
	private String name;
	
	public PlayerInfo(){
		color = PlayerColor.orange;
		id = 0;
		name = "Sam";
	}
	
	public PlayerColor getColor(){
		return color;
	}

	public int getId(){
		return id;
	}
	
	public String getName() {
		return name;
	}
	
}
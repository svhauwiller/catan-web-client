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
	private Integer id;
	private String name;
	
	public PlayerInfo(){}
	
	public PlayerInfo(PlayerColor color, int id, String name){
		this.color = color;
		this.id = id;
		this.name = name;
		System.out.println(color);
		System.out.println(id);
		System.out.println(name);
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
	
	public void setColor(PlayerColor color){
		this.color = color;
	}
	
}

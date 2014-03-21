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
	
	public PlayerInfo(PlayerColor color, int id, String name){
		this.color = color;
		this.id = id;
		this.name = name;
	}
	
}

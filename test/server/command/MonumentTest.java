/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.command;

import org.junit.After;
import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.Test;
import server.ServerException;
import server.communication.*;
import server.api.player.Player;
import server.command.*;
import server.api.player.Player.PlayerColor;

public class MonumentTest{
	public Monument monObject = new Monument();
	@Before
	public void setup(){
		GameModel.addPlayer(new Player(0, new PlayerInfo(PlayerColor.orange, 0, "Sam")));
		GameModel.getPlayer(0).getOldDevCards().updateMonument(1);
	}

	@Test
	public void executeTest(){
		
		//assertEquals(GameModel.getPlayer(1).getOldDevCards(),0);
		
		String[] args = new String[]{"0"};
		monObject.execute(args);
		assertEquals(GameModel.getPlayer(0).getOldDevCards().getTotal(), 0);
		assertEquals(GameModel.getPlayer(0).getVictoryPoints(), 1);
	}

	@Test
	public void undoTest(){
		String[] args = new String[]{"0"};
		bdcObject.execute(args);
		System.out.println("Hello dane");
		assertEquals(GameModel.getPlayer(0).getOldDevCards().getTotal() + GameModel.getPlayer(0).getNewDevCards().getTotal(), 1);
		bdcObject.undo();
		assertEquals(GameModel.getPlayer(0).getOldDevCards().getTotal() + GameModel.getPlayer(0).getNewDevCards().getTotal(), 0);	
	}
	
	
	


}
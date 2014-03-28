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

public class MonopolyTest{
	public Monopoly mObject = new Monopoly();
	String[] args = new String[2];
	@Before
	public void setup(){
		GameModel.addPlayer(new Player(0, new PlayerInfo(PlayerColor.orange, 0, "Sam")));
		GameModel.addPlayer(new Player(1, new PlayerInfo(PlayerColor.red, 1, "Brooke")));
		GameModel.addPlayer(new Player(2, new PlayerInfo(PlayerColor.blue, 2, "Joe")));
		GameModel.getPlayer(0).getOldDevCards().updateMonopoly(1);
		GameModel.getPlayer(1).getResourceCardList().updateWood(3);
		GameModel.getPlayer(2).getResourceCardList().updateWood(2);
	}

	@Test
	public void executeTest(){
		
		//assertEquals(GameModel.getPlayer(1).getOldDevCards(),0);
		
		args[0] = "0";
		args[1] = "wood";
		mObject.execute(args);
		assertEquals(GameModel.getPlayer(0).getOldDevCards().getTotal() + GameModel.getPlayer(0).getNewDevCards().getTotal(), 0);
		assertEquals(GameModel.getPlayer(0).getResourceCardList().getWood(),5);
		assertEquals(GameModel.getPlayer(1).getResourceCardList().getWood(),0);
		assertEquals(GameModel.getPlayer(2).getResourceCardList().getWood(),0);
	}

	// @Test
	// public void undoTest(){
		// String[] args = new String[]{"0"};
		// bdcObject.execute(args);
		// System.out.println("Hello dane");
		// assertEquals(GameModel.getPlayer(0).getOldDevCards().getTotal() + GameModel.getPlayer(0).getNewDevCards().getTotal(), 1);
		// bdcObject.undo();
		// assertEquals(GameModel.getPlayer(0).getOldDevCards().getTotal() + GameModel.getPlayer(0).getNewDevCards().getTotal(), 0);	
	// }
	
	
	


}
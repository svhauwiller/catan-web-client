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
		GameModel.addPlayer(new Player(3, new PlayerInfo(PlayerColor.green, 3, "Jack")));
		GameModel.getPlayer(0).getOldDevCards().setMonopoly(1);
		GameModel.getPlayer(0).getResourceCardList().setWood(0);
		GameModel.getPlayer(0).getResourceCardList().setOre(0);
		GameModel.getPlayer(0).getResourceCardList().setBrick(0);
		GameModel.getPlayer(0).getResourceCardList().setWheat(0);
		GameModel.getPlayer(0).getResourceCardList().setSheep(0);

		GameModel.getPlayer(1).getResourceCardList().setWood(3);
		GameModel.getPlayer(2).getResourceCardList().setWood(2);

		GameModel.getPlayer(1).getResourceCardList().setSheep(3);
		GameModel.getPlayer(2).getResourceCardList().setSheep(2);

		GameModel.getPlayer(1).getResourceCardList().setBrick(3);
		GameModel.getPlayer(2).getResourceCardList().setBrick(2);

		GameModel.getPlayer(1).getResourceCardList().setOre(3);
		GameModel.getPlayer(2).getResourceCardList().setOre(2);

		GameModel.getPlayer(1).getResourceCardList().setWheat(3);
		GameModel.getPlayer(2).getResourceCardList().setWheat(2);
	}

	// @After
    // public void teardown(){}

	@Test
	public void executeTest(){
		
		//assertEquals(GameModel.getPlayer(1).getOldDevCards(),0);
		args[0] = "0";
		args[1] = "wood";
		mObject.execute(args);
		assertEquals(GameModel.getPlayer(0).getOldDevCards().getMonopoly(), 0);
		assertEquals(GameModel.getPlayer(0).getResourceCardList().getWood(), 5);
		assertEquals(GameModel.getPlayer(1).getResourceCardList().getWood(), 0);
		assertEquals(GameModel.getPlayer(2).getResourceCardList().getWood(), 0);

		GameModel.getPlayer(0).getOldDevCards().updateMonopoly(1);
		args[0] = "0";
		args[1] = "brick";
		mObject.execute(args);
		assertEquals(GameModel.getPlayer(0).getOldDevCards().getTotal() + GameModel.getPlayer(0).getNewDevCards().getTotal(), 0);
		assertEquals(GameModel.getPlayer(0).getResourceCardList().getBrick(), 5);
		assertEquals(GameModel.getPlayer(1).getResourceCardList().getBrick(), 0);
		assertEquals(GameModel.getPlayer(2).getResourceCardList().getBrick(), 0);

		GameModel.getPlayer(0).getOldDevCards().updateMonopoly(1);
		args[0] = "0";
		args[1] = "wheat";
		mObject.execute(args);
		assertEquals(GameModel.getPlayer(0).getOldDevCards().getTotal() + GameModel.getPlayer(0).getNewDevCards().getTotal(), 0);
		assertEquals(GameModel.getPlayer(0).getResourceCardList().getWheat(), 5);
		assertEquals(GameModel.getPlayer(1).getResourceCardList().getWheat(), 0);
		assertEquals(GameModel.getPlayer(2).getResourceCardList().getWheat(), 0);

		GameModel.getPlayer(0).getOldDevCards().updateMonopoly(1);
		args[0] = "0";
		args[1] = "sheep";
		mObject.execute(args);
		assertEquals(GameModel.getPlayer(0).getOldDevCards().getTotal() + GameModel.getPlayer(0).getNewDevCards().getTotal(), 0);
		assertEquals(GameModel.getPlayer(0).getResourceCardList().getSheep(), 5);
		assertEquals(GameModel.getPlayer(1).getResourceCardList().getSheep(), 0);
		assertEquals(GameModel.getPlayer(2).getResourceCardList().getSheep(), 0);

		GameModel.getPlayer(0).getOldDevCards().updateMonopoly(1);
		args[0] = "0";
		args[1] = "ore";
		mObject.execute(args);
		assertEquals(GameModel.getPlayer(0).getOldDevCards().getTotal() + GameModel.getPlayer(0).getNewDevCards().getTotal(), 0);
		assertEquals(GameModel.getPlayer(0).getResourceCardList().getOre(), 5);
		assertEquals(GameModel.getPlayer(1).getResourceCardList().getOre(), 0);
		assertEquals(GameModel.getPlayer(2).getResourceCardList().getOre(), 0);
	}

	@Test
	public void undoTest(){
		args[0] = "0";
		args[1] = "wood";
		mObject.execute(args);
		mObject.undo();
		assertEquals(GameModel.getPlayer(0).getOldDevCards().getMonopoly(), 1);
		assertEquals(GameModel.getPlayer(0).getResourceCardList().getWood(), 0);
		assertEquals(GameModel.getPlayer(1).getResourceCardList().getWood(), 3);
		assertEquals(GameModel.getPlayer(2).getResourceCardList().getWood(), 2);	

		args[0] = "0";
		args[1] = "ore";
		mObject.execute(args);
		mObject.undo();
		assertEquals(GameModel.getPlayer(0).getOldDevCards().getMonopoly(), 1);
		assertEquals(GameModel.getPlayer(0).getResourceCardList().getOre(), 0);
		assertEquals(GameModel.getPlayer(1).getResourceCardList().getOre(), 3);
		assertEquals(GameModel.getPlayer(2).getResourceCardList().getOre(), 2);

		args[0] = "0";
		args[1] = "wheat";
		mObject.execute(args);
		mObject.undo();
		assertEquals(GameModel.getPlayer(0).getOldDevCards().getMonopoly(), 1);
		assertEquals(GameModel.getPlayer(0).getResourceCardList().getWheat(), 0);
		assertEquals(GameModel.getPlayer(1).getResourceCardList().getWheat(), 3);
		assertEquals(GameModel.getPlayer(2).getResourceCardList().getWheat(), 2);

		args[0] = "0";
		args[1] = "sheep";
		mObject.execute(args);
		mObject.undo();
		assertEquals(GameModel.getPlayer(0).getOldDevCards().getMonopoly(), 1);
		assertEquals(GameModel.getPlayer(0).getResourceCardList().getSheep(), 0);
		assertEquals(GameModel.getPlayer(1).getResourceCardList().getSheep(), 3);
		assertEquals(GameModel.getPlayer(2).getResourceCardList().getSheep(), 2);
	
		args[0] = "0";
		args[1] = "brick";
		mObject.execute(args);
		mObject.undo();
		assertEquals(GameModel.getPlayer(0).getOldDevCards().getMonopoly(), 1);
		assertEquals(GameModel.getPlayer(0).getResourceCardList().getBrick(), 0);
		assertEquals(GameModel.getPlayer(1).getResourceCardList().getBrick(), 3);
		assertEquals(GameModel.getPlayer(2).getResourceCardList().getBrick(), 2);


	}
	
	
	


}
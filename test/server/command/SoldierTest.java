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
import server.api.map.*;
import server.command.*;
import server.api.player.Player.PlayerColor;

public class SoldierTest{
	public Soldier sObject = new Soldier();
	String[] args = new String[4];
	Location original;
	@Before
	public void setup(){
		GameModel.addPlayer(new Player(0, new PlayerInfo(PlayerColor.orange, 0, "Sam")));
		GameModel.addPlayer(new Player(1, new PlayerInfo(PlayerColor.red, 1, "Brooke")));
		GameModel.getPlayer(0).getOldDevCards().setSoldier(1);
		GameModel.getPlayer(0).getResourceCardList().setWood(0);
		GameModel.getPlayer(0).getResourceCardList().setBrick(0);
		GameModel.getPlayer(0).getResourceCardList().setWheat(0);
		GameModel.getPlayer(0).getResourceCardList().setOre(0);
		GameModel.getPlayer(0).getResourceCardList().setSheep(0);
		GameModel.getPlayer(1).getResourceCardList().setWood(1);
		GameModel.getPlayer(1).getResourceCardList().setBrick(1);
		GameModel.getPlayer(1).getResourceCardList().setWheat(1);
		GameModel.getPlayer(1).getResourceCardList().setOre(1);
		GameModel.getPlayer(1).getResourceCardList().setSheep(1);
		
	}

	@After
    public void teardown(){}

	@Test
	public void executeTest(){
		
		for(int i=0; i<50; i++){
			args[0] = "0";
			args[1] = "1";
			args[2] = "0";
			args[3] = "0";
			Location location = new Location(Integer.parseInt(args[2]), Integer.parseInt(args[3]), false);
			sObject.execute(args);
			assertEquals(GameModel.getPlayer(0).getOldDevCards().getSoldier(), 0);
			assertEquals(GameModel.getPlayer(0).getResourceCardList().getTotal(), 1);
			assertEquals(GameModel.getPlayer(1).getResourceCardList().getTotal(), 4);
			assertEquals(GameModel.getMap().getRobberLocation().getX(), location.getX());
			assertEquals(GameModel.getMap().getRobberLocation().getY(), location.getY());
			sObject.undo();
		}
	}

	@Test
	public void undoTest(){

		args[0] = "0";
		args[1] = "1";
		args[2] = "0";
		args[3] = "0";
		Location location = new Location(Integer.parseInt(args[2]), Integer.parseInt(args[3]), false);
		original = GameModel.getMap().getRobberLocation();
		sObject.execute(args);
		sObject.undo();
		assertEquals(GameModel.getPlayer(0).getOldDevCards().getSoldier(), 1);
		assertEquals(GameModel.getPlayer(0).getResourceCardList().getTotal(), 0);
		assertEquals(GameModel.getPlayer(1).getResourceCardList().getTotal(), 5);
		assertEquals(GameModel.getMap().getRobberLocation(), original);		
	}
}
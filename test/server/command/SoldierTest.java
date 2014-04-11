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
	String[] args = new String[]{"0","1","0","0","0","Soldier"};
	Location original;
	@Before
	public void setup(){
		GameModelList.add(new GameModel());
		GameModelList.get(0).addPlayer(new Player(0, new PlayerInfo(PlayerColor.orange, 0, "Sam")));
		GameModelList.get(0).addPlayer(new Player(1, new PlayerInfo(PlayerColor.red, 1, "Brooke")));
		GameModelList.get(0).getPlayer(0).getOldDevCards().setSoldier(1);
		GameModelList.get(0).getPlayer(0).getResourceCardList().setWood(0);
		GameModelList.get(0).getPlayer(0).getResourceCardList().setBrick(0);
		GameModelList.get(0).getPlayer(0).getResourceCardList().setWheat(0);
		GameModelList.get(0).getPlayer(0).getResourceCardList().setOre(0);
		GameModelList.get(0).getPlayer(0).getResourceCardList().setSheep(0);
		GameModelList.get(0).getPlayer(1).getResourceCardList().setWood(1);
		GameModelList.get(0).getPlayer(1).getResourceCardList().setBrick(1);
		GameModelList.get(0).getPlayer(1).getResourceCardList().setWheat(1);
		GameModelList.get(0).getPlayer(1).getResourceCardList().setOre(1);
		GameModelList.get(0).getPlayer(1).getResourceCardList().setSheep(1);
		
	}

	@After
    public void teardown(){}

	@Test
	public void executeTest(){
		
		for(int i=0; i<50; i++){
			Location location = new Location(Integer.parseInt(args[2]), Integer.parseInt(args[3]), false);
			sObject.execute(args);
			assertEquals(GameModelList.get(0).getPlayer(0).getOldDevCards().getSoldier(), 0);
			assertEquals(GameModelList.get(0).getPlayer(0).getResourceCardList().getTotal(), 1);
			assertEquals(GameModelList.get(0).getPlayer(1).getResourceCardList().getTotal(), 4);
			assertEquals(GameModelList.get(0).getMap().getRobberLocation().getX(), location.getX());
			assertEquals(GameModelList.get(0).getMap().getRobberLocation().getY(), location.getY());
			sObject.undo();
		}
	}

	@Test
	public void undoTest(){
		Location location = new Location(Integer.parseInt(args[2]), Integer.parseInt(args[3]), false);
		original = GameModelList.get(0).getMap().getRobberLocation();
		sObject.execute(args);
		sObject.undo();
		assertEquals(GameModelList.get(0).getPlayer(0).getOldDevCards().getSoldier(), 1);
		assertEquals(GameModelList.get(0).getPlayer(0).getResourceCardList().getTotal(), 0);
		assertEquals(GameModelList.get(0).getPlayer(1).getResourceCardList().getTotal(), 5);
		assertEquals(GameModelList.get(0).getMap().getRobberLocation(), original);		
	}
}
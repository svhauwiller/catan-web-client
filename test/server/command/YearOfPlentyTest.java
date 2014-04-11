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

public class YearOfPlentyTest{
	public YearOfPlenty yopObject = new YearOfPlenty();
	public String[] args = new String[5];
	@Before
	public void setup(){
		GameModelList.add(new GameModel());
		GameModelList.get(0).addPlayer(new Player(0, new PlayerInfo(PlayerColor.orange, 0, "Sam")));
		GameModelList.get(0).getPlayer(0).getOldDevCards().setYearOfPlenty(1);
		GameModelList.get(0).getPlayer(0).getResourceCardList().setWood(0);
		GameModelList.get(0).getPlayer(0).getResourceCardList().setOre(0);
		GameModelList.get(0).getPlayer(0).getResourceCardList().setWheat(0);
		GameModelList.get(0).getPlayer(0).getResourceCardList().setSheep(0);
		GameModelList.get(0).getPlayer(0).getResourceCardList().setBrick(0);


	}

	@Test
	public void executeTest(){
		
		args[0] = "0";
		args[1] = "wood";
		args[2] = "sheep";
		args[3] = "0";
		args[4] = "Year_of_Plenty";
		yopObject.execute(args);
		assertEquals(GameModelList.get(0).getPlayer(0).getOldDevCards().getYearOfPlenty(), 0);
		assertEquals(GameModelList.get(0).getPlayer(0).getResourceCardList().getWood(), 1);
		assertEquals(GameModelList.get(0).getPlayer(0).getResourceCardList().getSheep(), 1);
		assertEquals(GameModelList.get(0).getBank().getWood(), 15);
		assertEquals(GameModelList.get(0).getBank().getSheep(), 15);

		args[1] = "ore";
		args[2] = "brick";
		GameModelList.get(0).getPlayer(0).getOldDevCards().setYearOfPlenty(1);
		yopObject.execute(args);
		assertEquals(GameModelList.get(0).getPlayer(0).getOldDevCards().getYearOfPlenty(), 0);
		assertEquals(GameModelList.get(0).getPlayer(0).getResourceCardList().getOre(), 1);
		assertEquals(GameModelList.get(0).getPlayer(0).getResourceCardList().getBrick(), 1);
		assertEquals(GameModelList.get(0).getBank().getOre(), 15);
		assertEquals(GameModelList.get(0).getBank().getBrick(), 15);

		args[1] = "wheat";
		args[2] = "wheat";
		GameModelList.get(0).getPlayer(0).getOldDevCards().setYearOfPlenty(1);
		yopObject.execute(args);
		assertEquals(GameModelList.get(0).getPlayer(0).getOldDevCards().getYearOfPlenty(), 0);
		assertEquals(GameModelList.get(0).getPlayer(0).getResourceCardList().getWheat(), 2);
		assertEquals(GameModelList.get(0).getBank().getWheat(), 14);
	}

	@Test
	public void undoTest(){
		args[0] = "0";
		args[1] = "wood";
		args[2] = "sheep";
		System.out.println("BEFORE " + GameModelList.get(0).getPlayer(0).getResourceCardList().getWood());
		yopObject.execute(args);
		System.out.println("AFTER " + GameModelList.get(0).getPlayer(0).getResourceCardList().getWood());
		yopObject.undo();
		System.out.println("AFTER AFTER THAT " + GameModelList.get(0).getPlayer(0).getResourceCardList().getWood());
		assertEquals(GameModelList.get(0).getPlayer(0).getOldDevCards().getYearOfPlenty(), 1);
		assertEquals(GameModelList.get(0).getPlayer(0).getResourceCardList().getWood(), 0);
		assertEquals(GameModelList.get(0).getPlayer(0).getResourceCardList().getSheep(), 0);
		assertEquals(GameModelList.get(0).getBank().getWood(), 16);
		assertEquals(GameModelList.get(0).getBank().getSheep(), 16);

		args[1] = "ore";
		args[2] = "brick";
		GameModelList.get(0).getPlayer(0).getOldDevCards().setYearOfPlenty(1);
		yopObject.execute(args);
		yopObject.undo();
		assertEquals(GameModelList.get(0).getPlayer(0).getOldDevCards().getYearOfPlenty(), 1);
		assertEquals(GameModelList.get(0).getPlayer(0).getResourceCardList().getOre(), 0);
		assertEquals(GameModelList.get(0).getPlayer(0).getResourceCardList().getBrick(), 0);
		assertEquals(GameModelList.get(0).getBank().getOre(), 16);
		assertEquals(GameModelList.get(0).getBank().getBrick(), 16);

		args[1] = "wheat";
		args[2] = "wheat";
		GameModelList.get(0).getPlayer(0).getOldDevCards().setYearOfPlenty(1);
		yopObject.execute(args);
		yopObject.undo();
		assertEquals(GameModelList.get(0).getPlayer(0).getOldDevCards().getYearOfPlenty(), 1);
		assertEquals(GameModelList.get(0).getPlayer(0).getResourceCardList().getWheat(), 0);
		assertEquals(GameModelList.get(0).getBank().getWheat(), 16);
	}
	
	
	


}
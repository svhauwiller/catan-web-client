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

public class BuyDevCardTest{
	public BuyDevCard bdcObject = new BuyDevCard();
	@Before
	public void setup(){
		GameModelList.add(new GameModel());
		GameModelList.get(0).addPlayer(new Player(0, new PlayerInfo(PlayerColor.orange, 0, "Sam")));
	}
	@After
    public void teardown(){}

	@Test
	public void executeTest(){
		
		//assertEquals(GameModelList.get(0).getPlayer(1).getOldDevCards(),0);
		for(int i=0; i<25; i++){
			String[] args = new String[3];
			args[0] = "0";
			args[1] = "0";
			args[2] = "buyDevCard";
			bdcObject.execute(args);
			assertEquals(GameModelList.get(0).getPlayer(0).getOldDevCards().getTotal() + GameModelList.get(0).getPlayer(0).getNewDevCards().getTotal(), 1);
			bdcObject.undo();
		}
	}

	@Test
	public void undoTest(){
		String[] args = new String[]{"0"};
		bdcObject.execute(args);
		bdcObject.undo();
		assertEquals(GameModelList.get(0).getPlayer(0).getOldDevCards().getTotal() + GameModelList.get(0).getPlayer(0).getNewDevCards().getTotal(), 0);	
	}
	
	
	


}
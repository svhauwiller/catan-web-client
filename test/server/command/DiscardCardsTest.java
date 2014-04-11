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

public class DiscardCardsTest{
	@Before
	public void setup(){
		GameModelList.add(new GameModel());
		GameModelList.get(0).addPlayer(new Player(0, new PlayerInfo(PlayerColor.orange, 0, "Sam")));
	}

	@Test
	public void executeTest(){
		
		DiscardCards discardCardsobj = new DiscardCards();

		//System.out.println("Brick = " + GameModelList.get(0).getPlayer(0).getResourceCardList().getBrick());
		//System.out.println("Bank's Brick = " + GameModelList.get(0).getBank().getBrick());

		assertEquals(GameModelList.get(0).getPlayer(0).getResourceCardList().getBrick(), 0);
		assertEquals(GameModelList.get(0).getBank().getBrick(), 16);

		String[] args = new String[]{"discardCards","0", "-1", "0", "0", "0", "-1", "0"};
		discardCardsobj.execute(args);

		//System.out.println("Brick = " + GameModelList.get(0).getPlayer(0).getResourceCardList().getBrick());
		//System.out.println("Bank's Brick = " + GameModelList.get(0).getBank().getBrick());
		
		assertEquals(GameModelList.get(0).getPlayer(0).getResourceCardList().getBrick(), -1);
		assertEquals(GameModelList.get(0).getBank().getBrick(), 17);
	}
	


}
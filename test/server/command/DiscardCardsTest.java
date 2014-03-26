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
		GameModel.addPlayer(new Player(0, new PlayerInfo(PlayerColor.orange, 0, "Sam")));
	}

	@Test
	public void executeTest(){
		
		DiscardCards discardCardsobj = new DiscardCards();

		//System.out.println("Brick = " + GameModel.getPlayer(0).getResourceCardList().getBrick());
		//System.out.println("Bank's Brick = " + GameModel.getBank().getBrick());

		assertEquals(GameModel.getPlayer(0).getResourceCardList().getBrick(), 0);
		assertEquals(GameModel.getBank().getBrick(), 23);

		String[] args = new String[]{"discardCards","0", "-1", "0", "0", "0", "-1"};
		discardCardsobj.execute(args);

		//System.out.println("Brick = " + GameModel.getPlayer(0).getResourceCardList().getBrick());
		//System.out.println("Bank's Brick = " + GameModel.getBank().getBrick());
		
		assertEquals(GameModel.getPlayer(0).getResourceCardList().getBrick(), -1);
		assertEquals(GameModel.getBank().getBrick(), 24);
	}
	


}
package server.communication;

import org.junit.After;
import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.Test;
import server.api.bank.DevCardList;
import server.api.bank.ResourceCardList;
import server.api.player.Player;
import server.api.player.Player.PlayerColor;
import server.api.map.Map;
import server.api.utils.MessageList;
import server.api.utils.TradeOffer;
import server.api.utils.TurnTracker;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Wesley
 */
public class GameModelTests {
	@Before
    public void setup(){
		
	}
    
    @After
    public void teardown(){}
    
    @Test
    public void gettersTest(){
        assertEquals(GameModel.getBank().getClass(), ResourceCardList.class);
		assertEquals(GameModel.getChat().getClass(), MessageList.class);
		assertEquals(GameModel.getDeck().getClass(), DevCardList.class);
		assertEquals(GameModel.getLog().getClass(), MessageList.class);
		assertEquals(GameModel.getMap().getClass(), Map.class);
		assertEquals(GameModel.getTurnTracker().getClass(), TurnTracker.class);
    }
	
	@Test
	public void settersTest(){
		assertEquals(GameModel.getBiggestArmy(), -1);
		assertEquals(GameModel.getLongestRoad(), -1);
		assertEquals(GameModel.getWinner(), -1);
		assertEquals(GameModel.getRevision(), 0);
		assertNull(GameModel.getTradeOffer());
		
		GameModel.setBiggestArmy(1);
		GameModel.setLongestRoad(2);
		GameModel.setWinner(3);
		GameModel.incrementRevision();
		GameModel.setTradeOffer(new TradeOffer());
		GameModel.addPlayer(new Player(0, new PlayerInfo(PlayerColor.orange, 10, "Sam")));
		
		assertEquals(GameModel.getBiggestArmy(), 1);
		assertEquals(GameModel.getLongestRoad(), 2);
		assertEquals(GameModel.getWinner(), 3);
		assertEquals(GameModel.getRevision(), 1);
		assertEquals(GameModel.getPlayer(0).getClass(), Player.class);
		assertEquals(GameModel.getTradeOffer().getClass(), TradeOffer.class);
		assertEquals(GameModel.getPlayerByName("Sam").getName(), "Sam");
		
		GameModel.removeTradeOffer();
		
		assertNull(GameModel.getTradeOffer());
	}
}

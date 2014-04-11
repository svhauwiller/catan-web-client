package server.communication;

import java.util.HashMap;
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
import server.api.utils.iUserLogin;

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
		GameModelList.add(new GameModel());
        assertEquals(GameModelList.get(0).getBank().getClass(), ResourceCardList.class);
		assertEquals(GameModelList.get(0).getChat().getClass(), MessageList.class);
		assertEquals(GameModelList.get(0).getDeck().getClass(), DevCardList.class);
		assertEquals(GameModelList.get(0).getLog().getClass(), MessageList.class);
		assertEquals(GameModelList.get(0).getMap().getClass(), Map.class);
		assertEquals(GameModelList.get(0).getTurnTracker().getClass(), TurnTracker.class);
    }
	
	@Test
	public void settersTest(){
		assertEquals(GameModelList.get(0).getBiggestArmy(), -1);
		assertEquals(GameModelList.get(0).getLongestRoad(), -1);
		assertEquals(GameModelList.get(0).getWinner(), -1);
		assertEquals(GameModelList.get(0).getRevision(), 0);
		assertNull(GameModelList.get(0).getTradeOffer());
		
		GameModelList.get(0).setBiggestArmy(1);
		GameModelList.get(0).setLongestRoad(2);
		GameModelList.get(0).setWinner(3);
		GameModelList.get(0).incrementRevision();
		GameModelList.get(0).setTradeOffer(new TradeOffer());
		GameModelList.get(0).addPlayer(new Player(0, new PlayerInfo(PlayerColor.orange, 10, "Sam")));
		
		assertEquals(GameModelList.get(0).getBiggestArmy(), 1);
		assertEquals(GameModelList.get(0).getLongestRoad(), 2);
		assertEquals(GameModelList.get(0).getWinner(), 3);
		assertEquals(GameModelList.get(0).getRevision(), 1);
		assertEquals(GameModelList.get(0).getPlayer(0).getClass(), Player.class);
		assertEquals(GameModelList.get(0).getTradeOffer().getClass(), TradeOffer.class);
		assertEquals(GameModelList.get(0).getPlayer(0).getName(), "Sam");
		
		GameModelList.get(0).removeTradeOffer();
		
		assertNull(GameModelList.get(0).getTradeOffer());
	}
}

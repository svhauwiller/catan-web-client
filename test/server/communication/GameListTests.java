/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.communication;

import org.junit.After;
import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.Test;
import server.ServerException;
import server.api.player.Player.PlayerColor;

/**
 *
 * @author Wesley
 */
public class GameListTests {
	@Before
    public void setup(){}
    
    @After
    public void teardown(){}
    
    @Test
    public void addGameTest(){
        assertTrue(GameList.getGameList().isEmpty());
		
		GameList.addGame("NewGame");
		
		assertFalse(GameList.getGameList().isEmpty());
		assertEquals(GameList.getGameList().get(0).getTitle(), "NewGame");
		
    }
	
	@Test
	public void joinGameTest() throws ServerException{
		assertFalse(GameList.getGameList().isEmpty());
		assertEquals(GameList.getGameList().get(0).getTitle(), "NewGame");
		
		GameInfo game = GameList.getGameList().get(0);
		
		assertTrue(game.getPlayers().isEmpty());
		
		game.addPlayer(new PlayerInfo(PlayerColor.orange, 0, "Sam"));
		
		assertFalse(game.getPlayers().isEmpty());
		assertEquals(game.getPlayers().get(0).getName(), "Sam");
	}
}

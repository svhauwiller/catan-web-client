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


/**
 *
 * @author Jonathan
 */
public class BuildRoadTests {
	@Before
	public void setup(){
		//GameList.getGameList().clear();
	}
    
	@After
	public void teardown(){}
    
	/*@Test
	public void addGameTest(){
       		assertTrue(GameList.getGameList().isEmpty());
		
		GameList.addGame("NewGame");
		
		assertFalse(GameList.getGameList().isEmpty());
		assertEquals(GameList.getGameList().get(0).getTitle(), "NewGame");
		
	}
	
	@Test
	public void joinGameTest() throws ServerException{
		assertTrue(GameList.getGameList().isEmpty());
		GameList.addGame("NewGame");
		GameInfo game = GameList.getGameList().get(0);
		assertTrue(game.getPlayers().isEmpty());
		
		GameList.addPlayerToGame(new PlayerInfo(PlayerColor.orange, 0, "Sam"), 0);
		
		assertFalse(GameList.getGameList().get(0).getPlayers().isEmpty());
		assertEquals(GameList.getGameList().get(0).getPlayers().get(0).getName(), "Sam");
		assertEquals(GameList.getGameList().get(0).getPlayers().get(0).getColor(), PlayerColor.orange);
		assertEquals(GameList.getGameList().get(0).getPlayers().get(0).getId(), 0);
	}
	
	@Test(expected=ServerException.class)
	public void tooManyPlayersTest() throws ServerException{
		assertTrue(GameList.getGameList().isEmpty());
		GameList.addGame("NewGame");
		GameInfo game = GameList.getGameList().get(0);
		assertTrue(game.getPlayers().isEmpty());
		
		GameList.addPlayerToGame(new PlayerInfo(PlayerColor.orange, 0, "Sam"), 0);
		GameList.addPlayerToGame(new PlayerInfo(PlayerColor.blue, 1, "Brooke"), 0);
		GameList.addPlayerToGame(new PlayerInfo(PlayerColor.red, 2, "Pete"), 0);
		GameList.addPlayerToGame(new PlayerInfo(PlayerColor.puce, 3, "Mark"), 0);
		GameList.addPlayerToGame(new PlayerInfo(PlayerColor.brown, 4, "James"), 0);
	}*/

	@Test
	public void buildRoadTest(){
System.out.println("Hello World");
String name = "Sam";
		assertTrue(name == "Sam");
	}
	
}

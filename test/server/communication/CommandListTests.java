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
import server.api.player.Player;
import server.command.BuyDevCard;

/**
 *
 * @author Wesley
 */
public class CommandListTests {
	@Before
    public void setup(){
		CommandList.getExecutedCommands().clear();
	}
    
    @After
    public void teardown(){}
    
    @Test
    public void recordCommandTest(){
        assertTrue(CommandList.getExecutedCommands().isEmpty());
		
		CommandList.recordCommand(new BuyDevCard());
		
		assertFalse(CommandList.getExecutedCommands().isEmpty());
		assertEquals(CommandList.getExecutedCommands().get(0).getClass(), BuyDevCard.class);
    }
	
	@Test
    public void undoCommandsTest(){
        assertTrue(CommandList.getExecutedCommands().isEmpty());
		GameModel.addPlayer(new Player(0, new PlayerInfo(Player.PlayerColor.orange, 0, "Sam")));
		
		BuyDevCard buyDevCardAction = new BuyDevCard();
		buyDevCardAction.execute(new String[]{"0"});
		CommandList.recordCommand(buyDevCardAction);
		
		assertFalse(CommandList.getExecutedCommands().isEmpty());
		assertEquals(CommandList.getExecutedCommands().get(0).getClass(), BuyDevCard.class);
		
		CommandList.undoAll();
    }
}

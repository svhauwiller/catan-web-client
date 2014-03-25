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
		
		CommandList.recordCommand(new BuyDevCard());
		
		assertFalse(CommandList.getExecutedCommands().isEmpty());
		assertEquals(CommandList.getExecutedCommands().get(0).getClass(), BuyDevCard.class);
    }
}

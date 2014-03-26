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
import server.api.utils.*;
import server.command.*;
import server.api.player.Player.PlayerColor;
import java.util.ArrayList;

public class UpdateChatLogTest{
	@Before
	public void setup(){
		GameModel.addPlayer(new Player(0, new PlayerInfo(PlayerColor.orange, 0, "Sam")));
	}

	@Test
	public void executeTest(){
		
		UpdateChatLog updateChatLogObj = new UpdateChatLog();

		String[] args = new String[]{"sendChat","0", "Kill me!"};
		updateChatLogObj.execute(args);

		ArrayList<MessageLine> messages = GameModel.getChat().getLines();

		MessageLine lastLine = messages.get(messages.size() - 1);
		
		//System.out.println(lastLine.getMessage());

		assertEquals(lastLine.getMessage(), "Kill me!");
	}
	


}
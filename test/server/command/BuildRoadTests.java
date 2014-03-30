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

/**
 *
 * @author Jonathan
 */
public class BuildRoadTests {
	@Before
	public void setup(){
		//GameList.getGameList().clear();
		GameModel.addPlayer(new Player(0, new PlayerInfo(PlayerColor.orange, 0, "Sam")));
	}
    
	@After
	public void teardown(){}

	@Test
	public void buildRoadTest(){

		BuildRoad buildRoadObj = new BuildRoad();

		/* args[0]-> type
		 * args[1]-> playerIndex
		 * args[2]-> roadLocation:x
		 * args[3]-> roadLocation:y
		 * args[4]-> roadLocation:direction
		 * args[5]-> free
		 */

		String[] args = new String[]{"buildRoad","0", "1", "1", "N", "false"};
		buildRoadObj.execute(args);

		int numOfRoads = GameModel.getPlayer(0).getRoads();

		System.out.println("numOfRoads: " + numOfRoads);
		
		//System.out.println(lastLine.getMessage());

		assertEquals(12, numOfRoads);

		//String name = "Sam";
		//assertTrue(name == "Sam");
	}
	
}

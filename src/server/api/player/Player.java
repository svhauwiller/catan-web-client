/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.api.player;

import server.api.bank.DevCardList;
import server.api.bank.ResourceCardList;
import server.communication.PlayerInfo;

/**
 *
 * @author Wesley
 */
public class Player {
	private static final int MAX_GAME_POINTS = 10;
	
	public static enum PlayerColor {red, blue, green, orange, yellow, purple, brown, white, puce}
	
	private int cities;
	private PlayerColor color;
	private boolean discarded;
	private boolean largestArmy;
	private boolean longestRoad;
	private int monuments;
	private String name;
	private DevCardList newDevCards;
	private DevCardList oldDevCards;
	private int orderNumber;
	private boolean playedDevCard;
	private int playerID;
	private ResourceCardList resources;
	private int roads;
	private int settlements;
	private int soldiers;
	private int victoryPoints;
	
	public Player(int orderNumberIn, PlayerInfo playerInfoIn){
		cities = 4;
		color = playerInfoIn.getColor();
		discarded = false;
		largestArmy = false;
		longestRoad = false;
		monuments = 0;
		name = playerInfoIn.getName();
		newDevCards = new DevCardList("player");
		oldDevCards = new DevCardList("player");
		orderNumber = orderNumberIn;
		playedDevCard = false;
		playerID = 0;
		resources = new ResourceCardList("player");
		roads = 13;
		settlements = 3;
		soldiers = 0;
		victoryPoints = 2;
	}
	
	public ResourceCardList getResourceCardList(){
		return resources;
	}
	
	public String getName(){
		return name;
	}
	
	public int getUserID(){
		return playerID;
	}
        
        public DevCardList getOldDevCards(){
            return oldDevCards;
        }
        
        public DevCardList getNewDevCards(){
            return newDevCards;
        }
	
	public void updateRoads(int in) {
            roads += in;
        }
	
	public void updateCities(int in) {
            cities += in;
        }
        
        public void updateSettlements(int in) {
            settlements += in;
        }
	
        public void updateMonuments(int in) {
            monuments += in;
        }
	
	public void updateVictoryPoints(int in) {
            victoryPoints += in;
        }
	
	
	
	
	
	
	
	
	
	
	
	
//	public Player(int orderNumber){
//		switch(orderNumber){
//			case 0:
//				initPlayer1();
//				break;
//			case 1:
//				initPlayer2();
//				break;
//			case 2:
//				initPlayer3();
//				break;
//			case 3:
//				initPlayer4();
//				break;
//		}
//	}
//	
//	public void initPlayer1(){
//		cities = 4;
//		color = PlayerColor.orange;
//		discarded = false;
//		largestArmy = false;
//		longestRoad = false;
//		monuments = 0;
//		name = "Sam";
//		newDevCards = new DevCardList();
//		oldDevCards = new DevCardList();
//		orderNumber = 0;
//		playedDevCard = false;
//		playerID = 0;
//		resources = new ResourceCardList();
//		roads = 13;
//		settlements = 3;
//		soldiers = 0;
//		victoryPoints = 2;
//	}
//	
//	public void initPlayer2(){
//		cities = 4;
//		color = PlayerColor.blue;
//		discarded = false;
//		largestArmy = false;
//		longestRoad = false;
//		monuments = 0;
//		name = "Brooke";
//		newDevCards = new DevCardList();
//		oldDevCards = new DevCardList();
//		orderNumber = 1;
//		playedDevCard = false;
//		playerID = 1;
//		resources = new ResourceCardList();
//		roads = 13;
//		settlements = 3;
//		soldiers = 0;
//		victoryPoints = 2;
//	}
//	
//	public void initPlayer3(){
//		cities = 4;
//		color = PlayerColor.red;
//		discarded = false;
//		largestArmy = false;
//		longestRoad = false;
//		monuments = 0;
//		name = "Pete";
//		newDevCards = new DevCardList();
//		oldDevCards = new DevCardList();
//		orderNumber = 2;
//		playedDevCard = false;
//		playerID = 10;
//		resources = new ResourceCardList();
//		roads = 13;
//		settlements = 3;
//		soldiers = 0;
//		victoryPoints = 2;
//	}
//	
//	public void initPlayer4(){
//		cities = 4;
//		color = PlayerColor.green;
//		discarded = false;
//		largestArmy = false;
//		longestRoad = false;
//		monuments = 0;
//		name = "Mark";
//		newDevCards = new DevCardList();
//		oldDevCards = new DevCardList();
//		orderNumber = 3;
//		playedDevCard = false;
//		playerID = 11;
//		resources = new ResourceCardList();
//		roads = 13;
//		settlements = 3;
//		soldiers = 0;
//		victoryPoints = 2;
//	}
}

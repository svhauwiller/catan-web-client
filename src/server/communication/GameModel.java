/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.communication;

import server.api.utils.TradeOffer;
import server.api.utils.TurnTracker;
import server.api.player.Player;
import server.api.utils.MessageList;
import server.api.map.Map;
import server.api.bank.ResourceCardList;
import server.api.bank.DevCardList;
import java.util.ArrayList;

/**
 *
 * @author Wesley
 */
public class GameModel {
	
	private ResourceCardList bank;
	private int biggestArmy;
	private MessageList chat;
	private DevCardList deck;
	private MessageList log;
	private int longestRoad;
	private Map map;
	private ArrayList<Player> players;
	private int revision;
	private TradeOffer tradeOffer;
	private TurnTracker turnTracker;
	private int winner;
	
	public GameModel(){
		this.bank = new ResourceCardList();
		this.biggestArmy = -1;
		this.chat = new MessageList();
		this.deck = new DevCardList();
		this.log = new MessageList();
		this.longestRoad = -1;
		this.map = new Map();
		this.players = new ArrayList<>();
		this.revision = 0;
		this.tradeOffer = null;
		this.turnTracker = new TurnTracker();
		this.winner = -1;
		
		for(int i = 0; i < 4; i++){
			this.players.add(new Player(i));
		}
	}
}

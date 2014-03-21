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
	
	private static GameModel instance;
	
	private static GameModel instance(){
		if(getInstance() == null){
			instance = new GameModel();
		}
		return getInstance();
	}
	
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
	
	private GameModel(){
		this.bank = new ResourceCardList();
		this.biggestArmy = -1;
		this.chat = new MessageList();
		this.deck = new DevCardList();
		this.log = new MessageList();
		this.longestRoad = -1;
		this.map = new Map();
		this.players = new ArrayList<Player>();
		this.revision = 0;
		this.tradeOffer = null;
		this.turnTracker = new TurnTracker();
		this.winner = -1;
	}

	/**
	 * @return the bank
	 */
	private ResourceCardList _getBank() {
		return bank;
	}

	/**
	 * @return the biggestArmy
	 */
	private int _getBiggestArmy() {
		return biggestArmy;
	}

	/**
	 * @return the chat
	 */
	private MessageList _getChat() {
		return chat;
	}

	/**
	 * @return the deck
	 */
	private DevCardList _getDeck() {
		return deck;
	}

	/**
	 * @return the log
	 */
	private MessageList _getLog() {
		return log;
	}

	/**
	 * @return the longestRoad
	 */
	private int _getLongestRoad() {
		return longestRoad;
	}

	/**
	 * @return the map
	 */
	private Map _getMap() {
		return map;
	}

	/**
	 * @return the players
	 */
	private Player _getPlayer(int playerNumber) {
		return players.get(playerNumber);
	}

	/**
	 * @return the revision
	 */
	private int _getRevision() {
		return revision;
	}

	/**
	 * @return the tradeOffer
	 */
	private TradeOffer _getTradeOffer() {
		return tradeOffer;
	}

	/**
	 * @return the turnTracker
	 */
	private TurnTracker _getTurnTracker() {
		return turnTracker;
	}

	/**
	 * @return the winner
	 */
	private int _getWinner() {
		return winner;
	}
	
	public static GameModel getInstance(){return instance();}
	public static ResourceCardList getBank(){return instance()._getBank();}
	public static int getBiggestArmy(){return instance()._getBiggestArmy();}
	public static MessageList getChat(){return instance()._getChat();}
	public static DevCardList getDeck(){return instance()._getDeck();}
	public static MessageList getLog(){return instance()._getLog();}
	public static int getLongestRoad(){return instance()._getLongestRoad();}
	public static Map getMap(){return instance()._getMap();}
	public static Player getPlayer(int playerNumber){return instance()._getPlayer(playerNumber);}
	public static int getRevision(){return instance()._getRevision();}
	public static TradeOffer getTradeOffer(){return instance()._getTradeOffer();}
	public static TurnTracker getTurnTracker(){return instance()._getTurnTracker();}
	public static int getWinner(){return instance()._getWinner();}
	
}

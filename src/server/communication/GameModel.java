/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.communication;

import server.ProductionModule;
import server.api.utils.TradeOffer;
import server.api.utils.TurnTracker;
import server.api.utils.iUserLogin;
import server.api.player.Player;
import server.api.player.Player.PlayerColor;
import server.api.utils.MessageList;
import server.api.map.Map;
import server.api.bank.ResourceCardList;
import server.api.bank.DevCardList;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map.Entry;

import com.google.inject.Guice;
import com.google.inject.Injector;

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
		System.out.println("gameModel constructor");
		this.bank = new ResourceCardList("bank");
		this.biggestArmy = -1;
		this.chat = new MessageList();
		this.deck = new DevCardList("bank");
		this.log = new MessageList();
		this.longestRoad = -1;
		this.map = new Map();
		this.players = new ArrayList<Player>();
		this.revision = 0;
		this.tradeOffer = null;
		this.turnTracker = new TurnTracker();
		this.winner = -1;
	}

	
	public GameModel reset() {
		return this;
	}
	
	/**
	 * @return the bank
	 */
	public ResourceCardList getBank() {
		return bank;
	}

	/**
	 * @return the biggestArmy
	 */
	public int getBiggestArmy() {
		return biggestArmy;
	}

	/**
	 * @return the chat
	 */
	public MessageList getChat() {
		return chat;
	}

	/**
	 * @return the deck
	 */
	public DevCardList getDeck() {
		return deck;
	}

	/**
	 * @return the log
	 */
	public MessageList getLog() {
		return log;
	}

	/**
	 * @return the longestRoad
	 */
	public int getLongestRoad() {
		return longestRoad;
	}

	/**
	 * @return the map
	 */
	public Map getMap() {
		return map;
	}

	/**
	 * @return the players
	 */
	public Player getPlayer(int playerNumber) {
		return players.get(playerNumber);
	}

	/**
	 * @return the revision
	 */
	public int getRevision() {
		return revision;
	}

	/**
	 * @return the tradeOffer
	 */
	public TradeOffer getTradeOffer() {
		return tradeOffer;
	}

	/**
	 * @return the turnTracker
	 */
	public TurnTracker getTurnTracker() {
		return turnTracker;
	}

	/**
	 * @return the winner
	 */
	public int getWinner() {
		return winner;
	}

	/**
	 * @param biggestArmy the biggestArmy to set
	 */
	public void setBiggestArmy(int biggestArmy) {
		this.biggestArmy = biggestArmy;
	}

	/**
	 * @param longestRoad the longestRoad to set
	 */
	public void setLongestRoad(int longestRoad) {
		this.longestRoad = longestRoad;
	}
	
	public void addPlayer(Player newPlayer){
		this.players.add(newPlayer);
	}
	
	public void incrementRevision(){
		this.revision++;
	}
	
	public void setTradeOffer(TradeOffer newTradeOffer){
		this.tradeOffer = newTradeOffer;
	}
	
	public void removeTradeOffer(){
		this.tradeOffer = null;
	}

	/**
	 * @param winner the winner to set
	 */
	public void setWinner(int winner) {
		this.winner = winner;
	}
	
}

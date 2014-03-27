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

import com.google.inject.Guice;
import com.google.inject.Injector;

/**
 *
 * @author Wesley
 */
public class GameModel {
	
	private static GameModel instance;
	
	private static GameModel instance(){
		if(instance == null){
			instance = new GameModel();
		}
		return instance;
	}
	
	private ResourceCardList bank;
	private int biggestArmy;
	private MessageList chat;
	private DevCardList deck;
	private MessageList log;
	private int longestRoad;
	private Map map;
	private ArrayList<Player> players;
    private iUserLogin validUsers;
	private int revision;
	private TradeOffer tradeOffer;
	private TurnTracker turnTracker;
	private int winner;
	
	private GameModel(){
		System.out.println("gameModel constructor");
		this.bank = new ResourceCardList("bank");
		this.biggestArmy = -1;
		this.chat = new MessageList();
		this.deck = new DevCardList("bank");
		this.log = new MessageList();
		this.longestRoad = -1;
		this.map = new Map();
		this.players = new ArrayList<Player>();
		this.validUsers = guiceUser();
		this.revision = 0;
		this.tradeOffer = null;
		this.turnTracker = new TurnTracker();
		this.winner = -1;
	}
	
	private GameModel _reset() {
		CommandList.undoAll();
		return instance;
	}
	/**
	 * 
	 * @return the guiced user to use
	 */
	private iUserLogin guiceUser()
	{
        Injector injector = Guice.createInjector(new ProductionModule());
        iUserLogin theUser = injector.getInstance(iUserLogin.class);
        return theUser;
	}
	/**
	 * 
	 * @return the object containing valid users
	 */
	private iUserLogin _getValidUsers() {
		return validUsers;
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
	
	private Player _getPlayerByName(String playerName)
	{
		for(Player p : players)
		{
			if(playerName.equalsIgnoreCase(p.getName())){
				return p;
			}
		}
		return new Player(-10, new PlayerInfo(PlayerColor.blue,100,"FAIL"));
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

	/**
	 * @param biggestArmy the biggestArmy to set
	 */
	private void _setBiggestArmy(int biggestArmy) {
		this.biggestArmy = biggestArmy;
	}

	/**
	 * @param longestRoad the longestRoad to set
	 */
	private void _setLongestRoad(int longestRoad) {
		this.longestRoad = longestRoad;
	}
	
	private void _addPlayer(Player newPlayer){
		this.players.add(newPlayer);
	}
	
	private void _incrementRevision(){
		this.revision++;
	}
	
	private void _setTradeOffer(TradeOffer newTradeOffer){
		this.tradeOffer = newTradeOffer;
	}

	/**
	 * @param winner the winner to set
	 */
	private void _setWinner(int winner) {
		this.winner = winner;
	}
	
	public static GameModel getInstance(){return instance();}
	public static GameModel reset(){return instance()._reset();}
	public static iUserLogin getValidUsers(){return instance()._getValidUsers();}
	public static ResourceCardList getBank(){return instance()._getBank();}
	public static int getBiggestArmy(){return instance()._getBiggestArmy();}
	public static MessageList getChat(){return instance()._getChat();}
	public static DevCardList getDeck(){return instance()._getDeck();}
	public static MessageList getLog(){return instance()._getLog();}
	public static int getLongestRoad(){return instance()._getLongestRoad();}
	public static Map getMap(){return instance()._getMap();}
	public static Player getPlayer(int playerNumber){return instance()._getPlayer(playerNumber);}
	public static Player getPlayerByName(String playerName){return instance()._getPlayerByName(playerName);}
	public static int getRevision(){return instance()._getRevision();}
	public static TradeOffer getTradeOffer(){return instance()._getTradeOffer();}
	public static TurnTracker getTurnTracker(){return instance()._getTurnTracker();}
	public static int getWinner(){return instance()._getWinner();}
	public static void setBiggestArmy(int playerID){instance()._setBiggestArmy(playerID);}
	public static void setLongestRoad(int playerID){instance()._setLongestRoad(playerID);}
	public static void addPlayer(Player newPlayer){instance()._addPlayer(newPlayer);}
	public static void incrementRevision(){instance()._incrementRevision();}
	public static void setTradeOffer(TradeOffer newTradeOffer){instance()._setTradeOffer(newTradeOffer);}
	public static void removeTradeOffer(){instance()._setTradeOffer(null);}
	public static void setWinner(int playerID){instance()._setWinner(playerID);}
}

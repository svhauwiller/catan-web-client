var catan = catan || {};
catan.models = catan.models || {};

/**
* Player Module
*
* @module catan.models.Player
*/

catan.models.Player = (function playerNameSpace(){
	
	var Player = (function PlayerClass(){
		
		/**
		* Player class
		* <pre>
		* </pre>
		*
		* @class Player
		* @constructor
		*/
		
		/**
		* The number of cities and settlements owned by the player
		* @property cities
		* @type {integer}
		*/
		/**
		* The color of the player
		* @property color
		* @type {string}
		*/
		/**
		* Flag to determine if the player would have to discard cards when a 7 is rolled
		* @property dicarded
		* @type {boolean}
		*/
		/**
		* Flag to determine if the player has the largest army award
		* @property largestArmy
		* @type {boolean}
		*/
		/**
		* Flag to determine if the player has the longest road award
		* @property longestRoad
		* @type {boolean}
		*/
		/**
		* The number of victory point development cards owned by the player
		* @property monuments
		* @type {integer}
		*/
		/**
		* The name of the player
		* @property name
		* @type {string}
		*/
		/**
		* List of the development cards available for the player to use
		* @property newDevCards
		* @type {Array of DevCardList}
		*/
		/**
		* List of the development cards the player used, but still should be considered for awards 
		* @property oldDevCards
		* @type {Array of DevCardList}
		*/
		/**
		* The number in line the player takes in the cycle of turns
		* @property orderNumber
		* @type {integer}
		*/
		/**
		* Flag to determine if the player has played a development card in the current turn
		* @property playedDevCard
		* @type {boolean}
		*/
		/**
		* The unique id of the player
		* @property playerID
		* @type {integer}
		*/
		/**
		* The list of resource cards owned by the player
		* @property resources
		* @type {ResourceList}
		*/
		function Player()
		{
			this.cities = new Array();
			this.color = "";
			this.discarded = false;
			this.largestArmy = false;
			this.longestRoad = false;
			this.monuments = 0;
			this.name = "";
			this.newDevCards = new Array();
			this.oldDevCards = new Array();
			this.orderNumber = 0;
			this.playedDevCard = false;
			this.playerID = 0;
			this.resources = new ResourceList();
		}
		
		/**
		* Accept a trade request from another 
		* <pre>
		* pre-conditions: Player has sufficient resources to accept the trade offer
		* post-conditions: Players involved in the trade update their lists of resources to reflect trade 
		* </pre>
		*
		* @method acceptTrade
		* @param {ResourceList} offerList list of resources being offered
		* @param {ResourceList} requestList list of resources being requested
		*/
		Player.prototype.acceptTrade = function(offerList, requestList) {}

		/**
		* Discard a list of cards from player's hand
		* <pre>
		* pre-conditions: Player has over 7 resource cards 
		* pre-conditions: Player has chosen which cards to discard
		* post-conditions: The chosen resource cards are removed from the Player's hand
		* </pre>
		*
		* @method discardCards
		* @params {ResourceList} listToDiscard list of resource cards that are to be discarded
		*/	
		Player.prototype.discardCards = function(listToDiscard) {}
		
		/**
		* Send a message to the chat log
		* <pre>
		* pre-conditions: Player is logged in
		* pre-conditions: Player has joined a game
		* post-conditions: The chat box successfully displays message
		* </pre>
		*
		* @method chat
		* @param {String} chatLine line of chat to send
		*/
		Player.prototype.chat = function(chatLine) {}
		
		/**
		* Randomly determine the result of the die roll to distribute resources
		* <pre>
		* pre-conditions: It is the Player’s turn.
		* pre-conditions: The dice have not been rolled this turn
		* post-conditions: If seven is rolled, thief is moved and players with more than seven resoucre cards are forced to discard. Otherwise, check which players are built on those numbers and give them 1 corresponding resource for each settlement and 2 for each city.  
		* </pre>
		*
		* @method rollDice
		*/
		Player.prototype.rollDice = function() {}

		/**
		* Build a road at a specified edge
		* <pre>
		* pre-conditions: Edge allows for construction of road
		* pre-conditions: Player must have sufficient resource cards to construct a road
		* post-conditions: Map is updated with a new road in the specified location
		* </pre>
		*
		* @method buildRoad
		* @param {Edge} edgeToBuild the edge to build the road upon
		*/
		Player.prototype.buildRoad = function(edgeToBuild) {}

		/**
		* Build a settlement on a specified vertex
		* <pre>
		* pre-conditions: Vertex allows for construction of a settlement
		* pre-conditions: Player must have sufficient resource cards to construct a settlement
		* post-conditions: Map is updated with a new settlement in the specified location. Player's victory points increase by 1.
		* </pre>
		*
		* @method buildSettlement
		* @param {Vertex} vertexToBuild the vertex to build the edge upon
		*/
		Player.prototype.buildSettlement = function(vertexToBuild) {}

		/**
		* Build a city on a specifed vertex
		* <pre>
		* pre-conditions: Vertex allows for construction of a city
		* pre-conditions: Player must have sufficient resource cards to construct a city
		* post-conditions: Map is updated with a new city in the specified location. Player's victory points increase by 1.
		* </pre>
		*
		* @method buildCity
		* @param {Vertex} vertexToBuild the vertex to build the edge upon
		*/
		Player.prototype.buildCity = function(vertexToBuild) {}

		/**
		* Buy a Development card for the player's hand
		* <pre>
		* pre-conditions: Player must have sufficient resource cards to buy a development card
		* post-conditions: A random development card is added to the player's development card list
		* </pre>
		*
		* @method buyDevCard
		*/
		Player.prototype.buyDevCard = function() {}


		/**
		* Request a trade with another player
		* <pre>
		* pre-conditions: Player has sufficient resources to make the trade offer
		* post-conditions: Player to whom the trade is requested is notified. If the trade is accepted, the player's resource card list is updated to reflect the trade.
		* </pre>
		*
		* @method offerTrade
		* @param {int} playerIndex index of the player being offered the trade 
		* @param {ResourceList} offerList list of resources being offered
		* @param {ResourceList} requestList list of resources being requested
		*/
		Player.prototype.offerTrade = function(playerIndex, offerList, requestList) {}

		/**
		* Trade a resource with the bank
		* <pre>
		* pre-conditions: Player has sufficient resources to make the trade offer
		* post-conditions: The player's resource card list is updated to reflect the trade.
		* </pre>
		*
		* @method tradeWithBank
		* @param {ResourceList} offerList list of resources being offered
		* @param {ResourceList} requestList list of resources being requested
		*/
		Player.prototype.tradeWithBank = function(offerList, requestList) {}

		/**
		* Use a development card from player's hand
		* <pre>
		* pre-condition: Player has not played a development card this turn, or the card to play is "monument"
		* post-condition: Corresponding function to the dev card is called
		* </pre>
		* 
		* @method playDevCard
		* @param {DevCardList} cardToPlay card that will be played from the player's hand
		*/
		Player.prototype.useDevCard = function(cardToPlay) {}

		/**
		* Move the robber to the specified hexgrid location
		* <pre>
		* pre-condition: Either a 7 rolled or a Knight/Soldier Dev Card has been played.
		* post-condition: If any other Player has more than 7 cards, have them discard [number of cards in hand divided by 2, rounded down] cards
		* </pre>
		* 
		* @method robberMove
		* @param {HexLocation} locationToMove location to move the robber to
		*/
		Player.prototype.robberMove = function(locationToMove) {}

		/**
		* Steal resources with the robber
		* <pre>
		* pre-condition: The current Player has selected another Player to rob from. 
		* pre-condition: The Player being robbed has a city or settlement adjacent to the Robber. 
		* pre-condition: The Player being robbed at least one resource card in their hand.
		* post-condition: Take the selected card from the selected Player’s hand and give it to the current Player’s hand.
		* </pre>
		* 
		* @method steal
		*/
		Player.prototype.steal = function() {}

		/**
		* Listens for who has the largest army
		* <pre>
		* Pre-conditions: The Player has played the greatest number of knight/soldier developement cards so far (min 3)
		* Post-conditions: The Player's Victory Points are increased by 2. The victory points of the last player with this award are reduced by 2.
		* </pre>
		*
		* @method largestArmy
		*/
		Player.prototype.largestArmy = function() {}

		/**
		* Listens for who has the longest road
		* <pre>
		* pre-conditions: The Player has played the greatest number of roads so far in a row (min 5)
		* post-conditions: The Player's Victory Points are increased by 2. The victory points of the last player with this award are reduced by 2.
		* </pre>
		*
		* @method longestRoad
		*/
		Player.prototype.longestRoad = function() {}

		/**
		* Declare a winner and end the game
		* <pre>
		* pre-conditions: One of Players has reached 10 victory points
		* post-conditions: Winner is displayed to all Players. Game is declared as finished
		* </pre>
		*
		* @method endGame
		*/
		Player.prototype.endGame = function() {}

		/**
		* End the current player's turn and allow the next player to move
		* <pre>
		* pre-conditions: Dice have been rolled in the turn
		* post-conditions: Turn tracker changes the turn to the next player
		* </pre>
		*
		* @method finishTurn
		*/
		Player.prototype.finishTurn = function() {}
		
		return Player;
	}());
	return Player;
}());
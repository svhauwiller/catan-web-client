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
		* pre-conditions: Player has sufficient resources to make a trade offer
		* post-conditions: If offer is accepted, swap the specified resources; else, do nothing. Remove trade offer?
		* </pre>
		*
		* @method acceptTrade
		* @param {ResourceList} list of resources being offered
		* @param {ResourceList} list of resources being requested
		*/
		Player.prototype.acceptTrade = function(offerList, requestList) {}

		/**
		* Discard a list of cards from player's hand
		* <pre>
		* pre-conditions: Player has over 7 cards (so this method is for when a 7 is rolled). Have the Player choose which cards to discard
		* post-conditions: Remove the chosen resource cards from each Players’ hand (who had more than 7 cards)
		* </pre>
		*
		* @method discardCards
		* @params {ResourceList} list of resource cards that are to be discarded
		*/	
		Player.prototype.discardCards = function(list) {}
		
		/**
		* Send a message to the chat log
		* <pre>
		* pre-conditions: The current Player must be logged in and have joined a game
		* post-conditions: The chat box successfully displays message
		* </pre>
		*
		* @method chat
		* @param {String} line of chat to send
		*/
		Player.prototype.chat = function(str) {}
		
		/**
		* Randomly determine the result of the die roll to distribute resources
		* <pre>
		* pre-conditions: It is the Player’s turn.
		* post-conditions: check if seven and if yes go through seven procedure. For other numbers check which players are built on those numbers and give them the corresponding resource  
		* </pre>
		*
		* @method rollDice
		*/
		Player.prototype.rollDice = function() {}

		/**
		* Build a road at a specified edge
		* <pre>
		* pre-conditions: call current_resources to check if possible.
		* post-conditions: allow the user to place a road an appropriate location
		* </pre>
		*
		* @method buildRoad
		* @param {Edge} the edge to build the road upon
		*/
		Player.prototype.buildRoad = function(edge) {}

		/**
		* Build a settlement on a specified vertex
		* <pre>
		* pre-conditions: call current_resources to check if possible.
		* post-conditions: +1 to victory points
		* </pre>
		*
		* @method buildSettlement
		* @param {Vertex} the vertex to build the edge upon
		*/
		Player.prototype.buildSettlement = function(vertex) {}

		/**
		* Build a city on a specifed vertex
		* <pre>
		* pre-conditions: call current_resources to check if possible.
		* post-conditions: +1 to victory points
		* </pre>
		*
		* @method buildCity
		* @param {Vertex} the vertex to build the edge upon
		*/
		Player.prototype.buildCity = function(vertex) {}

		/**
		* Buy a Development card for the player's hand
		* <pre>
		* pre-conditions: call current_resources to check if possible.
		* post-conditions: +1 to dev_card stash
		* </pre>
		*
		* @method buyDevCard
		*/
		Player.prototype.buyDevCard = function() {}


		/**
		* Request a trade with another player
		* <pre>
		* pre-conditions: Check if there are resources to trade. The trade button was clicked.
		* post-conditions: move to some state where the trade proposed is reviewed and either accepted or denied
		* </pre>
		*
		* @method offerTrade
		* @param {int} index of the player being offered the trade 
		* @param {ResourceList} list of resources being offered
		* @param {ResourceList} list of resources being requested
		*/
		Player.prototype.offerTrade = function(playerIndex, offerList, requestList) {}

		/**
		* Trade a resource with the bank
		* <pre>
		* pre-conditions: Check if there are resources to trade. The trade button was clicked.
		* post-conditions: move to some state where the trade proposed is reviewed and either accepted or denied
		* </pre>
		*
		* @method tradeWithBank
		* @param {ResourceList} list of resources being offered
		* @param {ResourceList} list of resources being requested
		*/
		Player.prototype.tradeWithBank = function(offerList, requestList) {}

		/**
		* Use a development card from player's hand
		* <pre>
		* pre-condition: call check_hand to check if possible.
		* post-condition: identify what type of dev card and call corresponding function
		* </pre>
		* 
		* @method playDevCard
		* @param {DevCardList}
		*/
		Player.prototype.useDevCard = function(card) {}

		/**
		* Move the robber to the specified hexgrid location
		* <pre>
		* pre-condition: Either a 7 rolled or a Knight/Soldier Dev Card played.
		* post-condition: If any other Player has more than 7 cards, have them discard [number of cards in hand divided by 2, rounded down] cards
		* </pre>
		* 
		* @method robberMove
		* @param {HexLocation} location to move the robber to
		*/
		Player.prototype.robberMove = function(location) {}

		/**
		* Steal resources with the robber
		* <pre>
		* pre-condition: The current Player selects another Player to choose from. The other Player has to have a city or settlement adjacent to the Robber. The other Player must have at least one card in hand.
		* post-condition: Take the selected card from the selected Player’s hand and give it to the current Player’s hand.
		* </pre>
		* 
		* @method steal
		*/
		Player.prototype.steal = function() {}

		/**
		* Listens for who has the largest army
		* <pre>
		* Pre-conditions: Given to the Player with either 3 Knights played or the most Knights played after this award first awarded
		* Post-conditions: The Player with the largest Army is awarded 2 Victory Points
		* </pre>
		*
		* @method largestArmy
		*/
		Player.prototype.largestArmy = function() {}

		/**
		* Listens for who has the longest road
		* <pre>
		* pre-conditions: Given to the Player with either 5 Roads played or the most Roads played after this award first awarded
		* post-conditions: The Player with the largest Army is awarded 2 Victory Points
		* </pre>
		*
		* @method longestRoad
		*/
		Player.prototype.longestRoad = function() {}

		/**
		* Declare a winner and end the game
		* <pre>
		* pre-conditions: One of Players reachs 10 victory points
		* post-conditions: Display the winner to all Players
		* </pre>
		*
		* @method endGame
		*/
		Player.prototype.endGame = function() {}

		/**
		* End the current player's turn and allow the next player to move
		* <pre>
		* pre-conditions: check if the Player who clicked the finishTurn button is the current Player
		* post-conditions: Update the current Player turn
		* </pre>
		*
		* @method finishTurn
		*/
		Player.prototype.finishTurn = function() {}
		
		return Player;
	}());
	return Player;
}());
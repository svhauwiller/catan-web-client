/**
	This module contains the top-level client model class
	
	@module		catan.models
	@namespace models
*/

var catan = catan || {};
catan.models = catan.models || {};

catan.models.ClientModel  = (function clientModelNameSpace(){
    /** 
	* This the top-level client model class that contains the local player, map contents, etc.
	* <pre>
	* Invariants: values that are held by a player number are null, all other values are null/default
	* </pre>
	*
	* @class ClientModel
	* @constructor
	* @param {integer} playerID The id of the local player, extracted from the cookie
    */
	var ClientModel = (function ClientModelClass(){
		
		/**
		* The elements
		* @property deck
		* @type {ElemType DevCardList}
		*/
		/**
		* The elements
		* @property bank
		* @type {ElemType ResourceList}
		*/
		/**
		* The elements
		* @property biggestArmy
		* @type {ElemType int}
		*/
		/**
		* The elements
		* @property biggestArmySize
		* @type {ElemType int}
		*/
		/**
		* The elements
		* @property chat
		* @type {ElemType Array<String>}
		*/
		/**
		* The elements
		* @property log
		* @type {ElemType Array<String>}
		*/
		/**
		* The elements
		* @property longestRoad
		* @type {ElemType int}
		*/
		/**
		* The elements
		* @property longestRoadSize
		* @type {ElemType int}
		*/
		/**
		* The elements
		* @property map
		* @type {ElemType Map}
		*/
		/**
		* The elements
		* @property players
		* @type {ElemType Array<Players>}
		*/
		/**
		* The elements
		* @property tradeOffer
		* @type {ElemType TradeOffer}
		*/
		/**
		* The elements
		* @property turnTracker
		* @type {ElemType TurnTracker}
		*/
		/**
		* The elements
		* @property winner
		* @type {ElemType int}
		*/
		function ClientModel(playerID){
			this.deck = new DevCardList();
			this.bank = new ResourceList();
			this.biggestArmy=null;
			this.biggestArmySize=0;
			this.chat = new Array();
			this.log = new Array();
			this.longestRoad = null;
			this.longestRoadSize = 0;
			this.map = new Map();
			this.players = new Array();
			this.tradeOffer = new TradeOffer();
			this.turnTracker = new TurnTracker();
			this.winner = null;
		}      
        
        /**
         * This is called to fetch the game state from the server the very first time.
         * It should: 1) fetch the game state JSON from the server, 2) update the client model with the
         * returned data, 3) notify all client model listeners that the model has changed, and 4) invoke
         * the success callback function with the object received from the server.
         * 
         * @method initFromServer
         * @param {function} success - A callback function that is called after the game state has been fetched from the server and the client model updated. This function is passed a single parameter which is the game state object received from the server.
         * */
		ClientModel.prototype.initFromServer = function(success){
            
            // TODO: 1) fetch the game state from the server, 2) update the client model, 3) call the "success" function.
            success();
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
		ClientModel.prototype.acceptTrade = function(offerList, requestList) {}

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
		ClientModel.prototype.discardCards = function(listToDiscard) {}
		
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
		ClientModel.prototype.chat = function(chatLine) {}
		
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
		ClientModel.prototype.rollDice = function() {}

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
		ClientModel.prototype.buildRoad = function(edgeToBuild) {}

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
		ClientModel.prototype.buildSettlement = function(vertexToBuild) {}

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
		ClientModel.prototype.buildCity = function(vertexToBuild) {}

		/**
		* Buy a Development card for the player's hand
		* <pre>
		* pre-conditions: Player must have sufficient resource cards to buy a development card
		* post-conditions: A random development card is added to the player's development card list
		* </pre>
		*
		* @method buyDevCard
		*/
		ClientModel.prototype.buyDevCard = function() {}


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
		ClientModel.prototype.offerTrade = function(playerIndex, offerList, requestList) {}

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
		ClientModel.prototype.tradeWithBank = function(offerList, requestList) {}

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
		ClientModel.prototype.useDevCard = function(cardToPlay) {}

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
		ClientModel.prototype.robberMove = function(locationToMove) {}

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
		ClientModel.prototype.steal = function() {}

		/**
		* Listens for who has the largest army
		* <pre>
		* Pre-conditions: The Player has played the greatest number of knight/soldier developement cards so far (min 3)
		* Post-conditions: The Player's Victory Points are increased by 2. The victory points of the last player with this award are reduced by 2.
		* </pre>
		*
		* @method largestArmy
		*/
		ClientModel.prototype.largestArmy = function() {}

		/**
		* Listens for who has the longest road
		* <pre>
		* pre-conditions: The Player has played the greatest number of roads so far in a row (min 5)
		* post-conditions: The Player's Victory Points are increased by 2. The victory points of the last player with this award are reduced by 2.
		* </pre>
		*
		* @method longestRoad
		*/
		ClientModel.prototype.longestRoad = function() {}

		/**
		* Declare a winner and end the game
		* <pre>
		* pre-conditions: One of Players has reached 10 victory points
		* post-conditions: Winner is displayed to all Players. Game is declared as finished
		* </pre>
		*
		* @method endGame
		*/
		ClientModel.prototype.endGame = function() {}

		/**
		* End the current player's turn and allow the next player to move
		* <pre>
		* pre-conditions: Dice have been rolled in the turn
		* post-conditions: Turn tracker changes the turn to the next player
		* </pre>
		*
		* @method finishTurn
		*/
		ClientModel.prototype.finishTurn = function() {}



		/**
		* Determine if the player has suffcient resources to build a road
		* <pre>
		* pre-conditions: It is the current player's turn
		* post-conditions: Permission to buy a road is returned
		* </pre>
		*/
		ClientModel.prototype.canBuildRoad = function() {}

		/**
		* Determine if the player has suffcient resources to build a settlement
		* <pre>
		* pre-conditions: It is the current player's turn
		* post-conditions: Permission to buy a settlement is returned
		* </pre>
		*/
		ClientModel.prototype.canBuildSettlement = function() {}

		/**
		* Determine if the player has suffcient resources to build a city
		* <pre>
		* pre-conditions: It is the current player's turn
		* post-conditions: Permission to buy a city is returned
		* </pre>
		*/
		ClientModel.prototype.canBuildCity = function() {}

		/**
		* Determine if the player has suffcient resources to buy a development card
		* <pre>
		* pre-conditions: It is the current player's turn
		* post-conditions: Permission to buy a development card is returned
		* </pre>
		*/
		ClientModel.prototype.canBuyDevCard = function() {}

		/**
		* List out the resource cards owned by the specified player
		* <pre>
		* pre-conditions: NONE
		* post-conditions: List of resource cards for the specified player
		* </pre>
		*
		* @param {int} playerIndex index of the player for which to list resoucres
		*/
		ClientModel.prototype.listPlayerResources = function(playerIndex) {}

		/**
		* Determine if the player has suffcient resources to offer a given trade
		* <pre>
		* pre-conditions: It is the current player's turn
		* post-conditions: Permission to offer a trade is returned
		* </pre>
		*/
		ClientModel.prototype.canOfferTrade = function() {}

		/**
		* Determine if the player has seven resource cards and must discard due to the roll of a seven
		* <pre>
		* pre-conditions: NONE
		* post-conditions: Order to discard cards or not 
		* </pre>
		*/
		ClientModel.prototype.needToDiscardCheck = function() {}

		/**
		* Determine if the player has suffcient resources to accept a given trade
		* <pre>
		* pre-conditions: NONE
		* post-conditions: Permission to accept a trade is returned
		* </pre>
		*/
		ClientModel.prototype.canAcceptTrade = function() {}

		/**
		* Determine if the map will allow the player to build a road at the given edge
		* <pre>
		* pre-conditions: It is the current player's turn
		* post-conditions: Permission to build a road is returned
		* </pre>
		*/
		ClientModel.prototype.canPlaceRoad = function() {}

		/**
		* Determine if the map will allow the player to build a settlement at the given vertex
		* <pre>
		* pre-conditions: It is the current player's turn
		* post-conditions: Permission to build a settlement is returned
		* </pre>
		*/
		ClientModel.prototype.canPlaceSettlement = function() {}
        
		return ClientModel;
	}());	
	
	return ClientModel;
}());


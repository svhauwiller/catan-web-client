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
			console.log(playerID);
			var models = catan.models;
			this.bank = new models.bank.Bank();
			this.biggestArmy=null;
			this.biggestArmySize=0;
			this.chat = new models.utilities.MessageList();
			this.devCard = new models.bank.DevCard(this);
			this.log = new models.utilities.MessageList();
			this.longestRoad = null;
			this.longestRoadSize = 0;
			this.map = new models.Map.Map();
			this.playerID = playerID;
			this.players = {playerID: new models.Player()};
			this.proxy = new catan.proxy.Proxy("", playerID);
			this.tradeOffer = new models.utilities.TradeOffer();
			this.turnTracker = new models.utilities.TurnTracker();
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

			var response = this.proxy.getModelFromServer(),
				initModel = JSON.parse(response.responseText);
			// this.initOtherPlayers(initModel.players);
			this.updateModel(initModel);
			success();

			return true;
		}

		ClientModel.prototype.initOtherPlayers = function(playerData){
			var _this = this;

			playerData.forEach(function(player){
				if(_this.playerID !== player.id){
					_this.players[player.id] = new catan.models.Player();
				}
			});
		}

		ClientModel.prototype.updateModel = function(updatedModel){
			var _this = this;

			console.log(updatedModel);

			// updatedModel.players.forEach(function(player){
			// 	_this.players[player.id].update()
			// });

			// this.bank.update(updatedModel.bank, updatedModel.deck);

			// this.map.update(updatedModel.map);

			// this.chat.update(updatedModel.chat.lines);
			// this.log.update(updatedModel.log.lines);

			// this.turnTracker.update(updateModel.turnTracker);

			// this.biggestArmy = updatedModel.biggestArmy;
			// this.longestRoad = updatedModel.longestRoad;
			// this.winner = updatedModel.winner;
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
		ClientModel.prototype.acceptTrade = function(offerList, requestList) {
			var changedResources = offerList;

			changedResources.brick -= requestList.brick;
			changedResources.ore -= requestList.ore;
			changedResources.sheep -= requestList.sheep;
			changedResources.wheat -= requestList.wheat;
			changedResources.wood -= requestList.wood;
			
			this.players[playerID].updateAllResouces(changedResources);

			//3. Ping the other player as accepted
		}

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
		ClientModel.prototype.discardCards = function(listToDiscard) {
			//1 Decrement the selected cards from player's hand
			//2 Add selected cards to bank
		}
		
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
		ClientModel.prototype.chat = function(chatLine) {
			//1 Send line of chat to the server
		}
		
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
		ClientModel.prototype.rollDice = function() {
			var dieResult1 = Math.floor(Math.random() * (6 - 1 + 1) + 1),
				dieResult2 = Math.floor(Math.random() * (6 - 1 + 1) + 1),
				dieResult = dieResult1 + dieResult2;

			if(dieResult === 7){

			} else {
				var award = this.map.getResourcesFromRoll(diceNum);
				this.
			}
			//1 Randomly select roll 2 dice
			//2 Is Seven
				//2a Force Discard
				//2b Move robber
				//2c Steal Resources
			//3 Is not Seven
				//var award = this.map.getResourcesFromRoll(diceNum);
				//3c Award resources to players
		}

		/**
		* Build a road at a specified edge
		* <pre>
		* pre-conditions: Edge allows for construction of road
		* pre-conditions: Player must have sufficient resource cards to construct a road
		* post-conditions: Map is updated with a new road in the specified location
		* </pre>
		*
		* @method buildRoad
		* @param {Hex} hex Hex where the edgeis based from
		* @param {string} edgeDirection the direction the edge is at from the hex
		*/
		ClientModel.prototype.buildRoad = function(playerID, hex, edgeDirection) {
			//if(this.canBuyRoad() && this.canBuildRoad(hex, edgeDirection)){

				//this.players[this.playerID].buy("road");
				//4 Update the map to have the road on the edge
			//}
		}

		/**
		* Build a settlement on a specified vertex
		* <pre>
		* pre-conditions: Vertex allows for construction of a settlement
		* pre-conditions: Player must have sufficient resource cards to construct a settlement
		* post-conditions: Map is updated with a new settlement in the specified location. Player's victory points increase by 1.
		* </pre>
		*
		* @method buildSettlement
		* @param {Hex} hex Hex where the vertex is based from
		* @param {string} vertDirection the direction the vertex is at from the hex
		*/
		ClientModel.prototype.buildSettlement = function(playerID, hex, vertDirection) {
			//1 Confirm the that player has the right resources
			//2 Confirm that the vertex is a valid building location
			//3 Reduce the player's resources
			//4 Update the map to have the road on the vertex
		}

		/**
		* Build a city on a specifed vertex
		* <pre>
		* pre-conditions: Vertex allows for construction of a city
		* pre-conditions: Player must have sufficient resource cards to construct a city
		* post-conditions: Map is updated with a new city in the specified location. Player's victory points increase by 1.
		* </pre>
		*
		* @method buildCity
		* @param {Hex} hex Hex where the vertex is based from
		* @param {string} vertDirection the direction the vertex is at from the hex
		*/
		ClientModel.prototype.buildCity = function(playerID, hex, vertDirection) {
			//1 Confirm the that player has the right resources
			//2 Confirm that the vertex is a valid building location
			//3 Reduce the player's resources
			//4 Update the map to have the road on the vertex
		}

		/**
		* Buy a Development card for the player's hand
		* <pre>
		* pre-conditions: Player must have sufficient resource cards to buy a development card
		* post-conditions: A random development card is added to the player's development card list
		* </pre>
		*
		* @method buyDevCard
		*/
		ClientModel.prototype.buyDevCard = function() {
			//1 Confirm the that player has the right resources
			//2 Reduce the player's resources
			//3 Update the player's hand with the new dev card
		}


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
		ClientModel.prototype.offerTrade = function(playerIndex, offerList, requestList) {
			//1 Confirm the that the player has the appropriate resources
			//2 Query the other player with the trade offer
			//3 Wait for response

			var changedResources = requestList;

			changedResources.brick -= offerList.brick;
			changedResources.ore -= offerList.ore;
			changedResources.sheep -= offerList.sheep;
			changedResources.wheat -= offerList.wheat;
			changedResources.wood -= offerList.wood;
			
			this.players[playerID].updateAllResouces(changedResources);

			//4 Reduce the player's resources by the offer list 
			//5 Increase the player's resources by the request list
		}

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
		ClientModel.prototype.tradeWithBank = function(offerList, requestList) {
			//1 Confirm the that the player has the appropriate resources

			var changedResources = requestList;

			changedResources.brick -= offerList.brick;
			changedResources.ore -= offerList.ore;
			changedResources.sheep -= offerList.sheep;
			changedResources.wheat -= offerList.wheat;
			changedResources.wood -= offerList.wood;
			
			this.players[playerID].updateAllResouces(changedResources);

			//2 Reduce the player's resources by the offer list 
			//3 Increase the player's resources by the request list
		}

		/**
		* Use a development card from player's hand
		* <pre>
		* pre-condition: Player has not played a development card this turn, or the card to play is "monument"
		* post-condition: Corresponding function to the dev card is called
		* </pre>
		* 
		* @method playDevCard
		* @param {string} cardToPlay card that will be played from the player's hand
		*/
		ClientModel.prototype.useDevCard = function(cardToPlay) {
			this.devCard.useCard(cardToPlay);
		}

		/**
		* Move the robber to the specified hexgrid location
		* <pre>
		* pre-condition: Either a 7 rolled or a Knight/Soldier Dev Card has been played.
		* post-condition: If any other Player has more than 7 cards, have them discard [number of cards in hand divided by 2, rounded down] cards
		* </pre>
		* 
		* @method robberMove
		* @param {Hex} locationToMove location to move the robber to
		*/
		ClientModel.prototype.robberMove = function(locationToMove) {
			this.map.moveRobber(locationToMove);
		}

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
		ClientModel.prototype.steal = function() {
			//this.map.getRobberVictims();
			//1 Allow the player to select another player
			//2 Allow the player to select resource to steal
			//3 Reduce the resources in the stolen players's hand
			//4 Increase the resources in the current player's hand
		}

		/**
		* Listens for who has the largest army
		* <pre>
		* Pre-conditions: The Player has played the greatest number of knight/soldier developement cards so far (min 3)
		* Post-conditions: The Player's Victory Points are increased by 2. The victory points of the last player with this award are reduced by 2.
		* </pre>
		*
		* @method largestArmy
		*/
		ClientModel.prototype.largestArmy = function() {

			//1 Reduce the victory points of the last owner
			//2 Increase the victory points of the current player
		}

		/**
		* Listens for who has the longest road
		* <pre>
		* pre-conditions: The Player has played the greatest number of roads so far in a row (min 5)
		* post-conditions: The Player's Victory Points are increased by 2. The victory points of the last player with this award are reduced by 2.
		* </pre>
		*
		* @method longestRoad
		*/
		ClientModel.prototype.longestRoad = function() {
			//1 Reduce the victory points of the last owner
			//2 Increase the victory points of the current player
		}

		/**
		* Declare a winner and end the game
		* <pre>
		* pre-conditions: One of Players has reached 10 victory points
		* post-conditions: Winner is displayed to all Players. Game is declared as finished
		* </pre>
		*
		* @method endGame
		*/
		ClientModel.prototype.endGame = function() {
			//1 Stop turn progression
			//2 Display end of game
		}

		/**
		* End the current player's turn and allow the next player to move
		* <pre>
		* pre-conditions: Dice have been rolled in the turn
		* post-conditions: Turn tracker changes the turn to the next player
		* </pre>
		*
		* @method finishTurn
		*/
		ClientModel.prototype.finishTurn = function() {
			 var serverCmd = new catan.proxy.proxyCommands.FinishTurnCommand(this.playerID);
			 serverCmd.sendToProxy();
		}



		/**
		* Determine if the player has suffcient resources to build a road
		* <pre>
		* pre-conditions: It is the current player's turn
		* post-conditions: Permission to buy a road is returned
		* </pre>
		*/
		ClientModel.prototype.canBuildRoad = function() {
			//return this.player[this.playerID].canBuildRoad();
		}

		/**
		* Determine if the player has suffcient resources to build a settlement
		* <pre>
		* pre-conditions: It is the current player's turn
		* post-conditions: Permission to buy a settlement is returned
		* </pre>
		*/
		ClientModel.prototype.canBuildSettlement = function() {
			//return this.player[this.playerID].canBuildSettlement();
		}

		/**
		* Determine if the player has suffcient resources to build a city
		* <pre>
		* pre-conditions: It is the current player's turn
		* post-conditions: Permission to buy a city is returned
		* </pre>
		*/
		ClientModel.prototype.canBuildCity = function() {
			///return this.player[this.playerID].canBuildCity();
		}

		/**
		* Determine if the player has suffcient resources to buy a development card
		* <pre>
		* pre-conditions: It is the current player's turn
		* post-conditions: Permission to buy a development card is returned
		* </pre>
		*/
		ClientModel.prototype.canBuyDevCard = function() {
			//return this.player[this.playerID].canBuyDevCard();
		}

		/**
		* List out the resource cards owned by the current player
		* <pre>
		* pre-conditions: NONE
		* post-conditions: List of resource cards for the specified player
		* </pre>
		*/
		ClientModel.prototype.currentPlayerResources = function() {
			//return this.player[this.playerID].currentPlayerResources();
		}

		/**
		* Determine if the player has suffcient resources to offer a given trade
		* <pre>
		* pre-conditions: It is the current player's turn
		* post-conditions: Permission to offer a trade is returned
		* </pre>
		*/
		ClientModel.prototype.canOfferTrade = function() {
			//return this.player[this.playerID].canOfferTrade();
		}

		/**
		* Determine if the player has seven resource cards and must discard due to the roll of a seven
		* <pre>
		* pre-conditions: NONE
		* post-conditions: Order to discard cards or not 
		* </pre>
		*/
		ClientModel.prototype.needToDiscardCheck = function() {
			//return this.player[this.playerID].needToDiscardCheck();
		}

		/**
		* Determine if the player has suffcient resources to accept a given trade
		* <pre>
		* pre-conditions: NONE
		* post-conditions: Permission to accept a trade is returned
		* </pre>
		*/
		ClientModel.prototype.canAcceptTrade = function() {
			///return this.player[this.playerID].canAcceptTrade();
		}

		/**
		* Determine if the map will allow the player to build a road at the given edge
		* <pre>
		* pre-conditions: It is the current player's turn
		* post-conditions: Permission to build a road is returned
		* </pre>
		*
		* @param {Hex} hex Hex where the edge is based from
		* @param {string} edgeDirection the direction the edge is at from the hex
		*/
		ClientModel.prototype.canPlaceRoad = function(playerID, hex, edgeDirection) {
			this.map.canPlaceRoad(playerID, hex, edgeDirection);
			//1 Check if there is a road on the edge
			//2 Check if there is a city or settlement owned by player on the two vertexes
			//3 Check if there is a road on the four edges that connect
		}

		/**
		* Determine if the map will allow the player to build a settlement at the given vertex
		* <pre>
		* pre-conditions: It is the current player's turn
		* post-conditions: Permission to build a settlement is returned
		* </pre>
		*
		* @param {Hex} hex Hex where the vertex is based from
		* @param {string} vertDirection the direction the vertex is at from the hex
		*/
		ClientModel.prototype.canPlaceSettlement = function(playerID, hex, vertDirection) {
			this.map.canPlaceSettlement(playerID, hex, vertDirection);
			//1 Check if there is a settlement or city on the vertex
			//2 Check if there is a road on the edges that connect
			//3 Check if there is a settlement or city on the vertexes that are connected to the connected edges
		}

		/**
		* Determine if the map will allow the player to build a city at the given vertex
		* <pre>
		* pre-conditions: It is the current player's turn
		* post-conditions: Permission to build a city is returned
		* </pre>
		*
		* @param {Hex} hex Hex where the vertex is based from
		* @param {string} vertDirection the direction the vertex is at from the hex
		*/
		ClientModel.prototype.canPlaceCity = function(playerID, hex, vertDirection) {
			this.map.canPlaceSettlement(playerID, hex, vertDirection);
			//1 Check if there is a settlement on the vertex owned by the player
		}
        
		return ClientModel;
	}());	
	
	return ClientModel;
}());


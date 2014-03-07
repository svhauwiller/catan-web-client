//STUDENT-EDITABLE-BEGIN
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
			console.log(catan.models);
			this.bank = new catan.models.bank.Bank();
			this.biggestArmy=null;
			this.biggestArmySize=0;
			this.chat = new catan.models.utilities.MessageList();
			this.devCard = new catan.models.bank.DevCard(this);
			this.log = new catan.models.utilities.MessageList();
			this.longestRoad = null;
			this.longestRoadSize = 0;
			this.map = new catan.models.Map.Map();
			this.orderNumbers = new Object();
			this.playerID = playerID;
			this.players = new Object();
			this.players[playerID] = new catan.models.Player();
			this.proxy = new catan.proxy.Proxy("", playerID);
			this.state = new catan.models.State();
			this.tradeOffer = new catan.models.utilities.TradeOffer();
			this.turnTracker = new catan.models.utilities.TurnTracker();
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
			
			var response = this.proxy.getModelFromServer();
			try{
				var initModel = JSON.parse(response.responseText);
				this.initOtherPlayers(initModel.players);
				this.updateModel(initModel);
				this.beginPolling();
			} catch (ex) {
				throw response.statusText;
			} finally {
				success();
				return true;
			}

			
		}

		ClientModel.prototype.initOtherPlayers = function(playerData){
			var _this = this;

			playerData.forEach(function(player){
				if(_this.playerID !== player.playerID){
					_this.players[player.playerID] = new catan.models.Player();
				}
			});
		}
        /**
         * Called when a change had been made to the model
         * 
         * @method updateModel
         * @param {Object} updateModel - the model object from the server all players update from
         * */

		ClientModel.prototype.updateModel = function(updatedModel){
			var _this = this;
			if(updatedModel instanceof Object){
			console.log(updatedModel);

			if(this.state.isNew(updatedModel)){
				console.log("isNew");

				updatedModel.players.forEach(function(player){
					//console.log(player.playerID);
					//console.log(player.orderNumber);
					_this.players[player.playerID].updateAll(player);
					_this.orderNumbers[player.orderNumber] = player.playerID;
				});

				this.bank.updateCopy(updatedModel.bank, updatedModel.deck);
				
				this.map.update(updatedModel.map);

				this.chat.update(updatedModel.chat.lines);
				this.log.update(updatedModel.log.lines);

				this.turnTracker.update(updatedModel.turnTracker);
				if (updatedModel.tradeOffer !== undefined)
					this.tradeOffer.update(updatedModel.tradeOffer)
				if (updatedModel.tradeOffer === undefined) {
					this.tradeOffer.setSender(-1);
					this.tradeOffer.setReceiver(-1); 
				}

				this.biggestArmy = updatedModel.biggestArmy;
				this.longestRoad = updatedModel.longestRoad;
				this.winner = updatedModel.winner;

				this.state.updateModel(updatedModel);
			}

			console.log(_this);
			}
		}

		ClientModel.prototype.beginPolling = function(){
			var _this = this;
			setInterval(function(){
				_this.updateFromServer();
			}, 5000);
		}

		ClientModel.prototype.updateFromServer = function(){
			var response = this.proxy.getModelFromServer();
			try{
				var updatedModel = JSON.parse(response.responseText);
				this.updateModel(updatedModel);
			} catch (ex) {
				throw response.statusText;
			}
		}

		ClientModel.prototype.runCommand = function(cmd, args){
			var cmdObj = new cmd(this.players[this.playerID].orderNumber);
			var response = cmdObj.sendToProxy(args);
			var updatedModel = JSON.parse(response.responseText);
			this.updateModel(updatedModel);
			console.log("Response: ", response);
		}

		/**
		* Accept a trade request from another 
		* <pre>
		* pre-conditions: Player has sufficient resources to accept the trade offer
		* post-conditions: Players involved in the trade update their lists of resources to reflect trade 
		* </pre>
		*
		* @method acceptTrade
		* @param {boolean} willAccept flag to determine whether or not the player has accepted the trade offer
		*/
		ClientModel.prototype.acceptTrade = function(willAccept) {
			if(typeof willAccept === true || typeof willAccept === false){
			var args = new Array();
			args.push(willAccept);

			this.runCommand(catan.proxy.proxyCommands.AcceptTradeCommand, args);
			}
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

			var args = new Array();
			if(listToDiscard instanceof ResourceList){ 
			args.push(listToDiscard);

			this.runCommand(catan.proxy.proxyCommands.DiscardCardsCommand, args);
			}
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
		ClientModel.prototype.sendChat = function(chatLine) {
			//SEND CHAT
			var args = new Array();
			if(typeof chatLine === 'string'){ 
			args.push(chatLine);
			this.runCommand(catan.proxy.proxyCommands.SendChatCommand, args);
			}
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
			var dieResult1 = Math.floor(Math.random()*6 + 1),
				dieResult2 = Math.floor(Math.random()*6 + 1),
				dieResult = dieResult1 + dieResult2,
				args;
			//removed ((6-1+1)+1)
			console.log("Dice Result: " + dieResult);

			args = new Array();
			args.push(dieResult);
			this.runCommand(catan.proxy.proxyCommands.RollNumberCommand, args);

			return dieResult;
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
		* @param {HexLocation} hexLocation Location of the Hex where the vertex is based from
		* @param {string} edgeDirection the direction the edge is at from the hex
		*/
		ClientModel.prototype.buildRoad = function(hexLocation,  edgeDirection, isFree) {
			if(hexLocation instanceof HexLocation && typeof edgeDirction==='string'){
			var location = {x: hexLocation.x, y: hexLocation.y, direction: edgeDirection};
			
			var args = new Array();
			args.push(location);
			args.push(isFree);

			this.runCommand(catan.proxy.proxyCommands.BuildRoadCommand, args);
			}
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
		* @param {HexLocation} hexLocation Location of the Hex where the vertex is based from
		* @param {string} vertDirection the direction the vertex is at from the hex
		*/
		ClientModel.prototype.buildSettlement = function(hexLocation,  vertDirection, isFree) {
			if(hexLocation instanceof HexLocation && typeof edgeDirction==='string'){
			var location = {x: hexLocation.x, y: hexLocation.y, direction: vertDirection};
			
			var args = new Array();
			args.push(location);
			args.push(isFree);

			this.runCommand(catan.proxy.proxyCommands.BuildSettlementCommand, args);
			}
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
		* @param {HexLocation} hexLocation Location of the Hex where the vertex is based from
		* @param {string} vertDirection the direction the vertex is at from the hex
		*/
		ClientModel.prototype.buildCity = function(hexLocation, vertDirection, isFree) {
			if(hexLocation instanceof HexLocation && typeof edgeDirction==='string'){
			var location = {x: hexLocation.x, y: hexLocation.y, direction: vertDirection};
			
			var args = new Array();
			args.push(location);
			args.push(isFree);

			this.runCommand(catan.proxy.proxyCommands.BuildCityCommand, args);
			}
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
			this.runCommand(catan.proxy.proxyCommands.BuyDevCardCommand, null);
		}


		/**
		* Request a trade with another player
		* <pre>
		* pre-conditions: Player has sufficient resources to make the trade offer
		* post-conditions: Player to whom the trade is requested is notified. If the trade is accepted, the player's resource card list is updated to reflect the trade.
		* </pre>
		*
		* @method offerTrade
		* @param {int} receiverIndex index of the player being offered the trade 
		* @param {ResourceList} offerList list of resources being offered (Positive Values) and requested (Negative Values)
		*/
		ClientModel.prototype.offerTrade = function(receiverIndex, offerList) {
			if(typeof receiverIndex === 'number' && offerList instanceof ResourceList){
			args = new Array();
			args.push(offerList);
			args.push(receiverIndex);

			this.runCommand(catan.proxy.proxyCommands.OfferTradeCommand, args);
			}
		}

		/**
		* Trade a resource with the bank
		* <pre>
		* pre-conditions: Player has sufficient resources to make the trade offer
		* post-conditions: The player's resource card list is updated to reflect the trade.
		* </pre>
		*
		* @method tradeWithBank
		* @param {int} ratio Ratio of player resource to 
		* @param {ResourceList} offerResource resource being offered
		* @param {ResourceList} requestResource resource being requested
		*/
		ClientModel.prototype.tradeWithBank = function(ratio, offerResource, requestResource) {
			if(typeof ratio === 'number' && offerResource instanceof ResourceList && requestResource instanceof ResourceList){
			args = new Array();
			args.push(ratio);
			args.push(offerResource);
			args.push(requestResource);

			this.runCommand(catan.proxy.proxyCommands.MaritimeTradeCommand, args);
			}
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
		ClientModel.prototype.useDevCard = function(cardToPlay, params) {
			this.devCard.useCard(cardToPlay, params);
		}

		/**
		* Move the robber to the specified hexgrid location
		* <pre>
		* pre-condition: Either a 7 rolled or a Knight/Soldier Dev Card has been played.
		* post-condition: If any other Player has more than 7 cards, have them discard [number of cards in hand divided by 2, rounded down] cards
		* </pre>
		* 
		* @method robberMove
		* @param {int} victimIndex Index of the player who will be robbed from
		* @param {Hex} locationToMove location to move the robber to
		*/
		ClientModel.prototype.robberMove = function(victimIndex, locationToMove) {
			if(typeof victimIndex === 'number' && locationToMove instanceof Hex){
			var args = new Array();
			args.push(victimIndex);
			args.push(locationToMove);

			this.runCommand(catan.proxy.proxyCommands.RobPlayerCommand, args);
			}
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
			 this.runCommand(catan.proxy.proxyCommands.FinishTurnCommand, null);
		}



		/**
		* Determine if the player has suffcient resources to build a road
		* <pre>
		* pre-conditions: It is the current player's turn
		* post-conditions: Permission to buy a road is returned
		* </pre>
		*/
		ClientModel.prototype.canBuildRoad = function() {
			return this.players[this.playerID].canBuildRoad();
		}

		/**
		* Determine if the player has suffcient resources to build a settlement
		* <pre>
		* pre-conditions: It is the current player's turn
		* post-conditions: Permission to buy a settlement is returned
		* </pre>
		*/
		ClientModel.prototype.canBuildSettlement = function() {
			return this.players[this.playerID].canBuildSettlement();
		}

		/**
		* Determine if the player has suffcient resources to build a city
		* <pre>
		* pre-conditions: It is the current player's turn
		* post-conditions: Permission to buy a city is returned
		* </pre>
		*/
		ClientModel.prototype.canBuildCity = function() {
			return this.players[this.playerID].canBuildCity();
		}

		/**
		* Determine if the player has suffcient resources to buy a development card
		* <pre>
		* pre-conditions: It is the current player's turn
		* post-conditions: Permission to buy a development card is returned
		* </pre>
		*/
		ClientModel.prototype.canBuyDevCard = function() {
			return this.players[this.playerID].canBuyDevCard();
		}

		/**
		* List out the resource cards owned by the current player
		* <pre>
		* pre-conditions: NONE
		* post-conditions: List of resource cards for the specified player
		* </pre>
		*/
		ClientModel.prototype.currentPlayerResources = function() {
			return this.players[this.playerID].currentPlayerResources();
		}

		/**
		* Determine if the player has suffcient resources to offer a given trade
		* <pre>
		* pre-conditions: It is the current player's turn
		* post-conditions: Permission to offer a trade is returned
		* </pre>
		*/
		ClientModel.prototype.canOfferTrade = function() {
			return this.players[this.playerID].canOfferTrade();
		}

		/**
		* Determine if the player has seven resource cards and must discard due to the roll of a seven
		* <pre>
		* pre-conditions: NONE
		* post-conditions: Order to discard cards or not 
		* </pre>
		*/
		ClientModel.prototype.needToDiscardCheck = function() {
			return this.players[this.playerID].needToDiscardCheck();
		}

		/**
		* Determine if the player has suffcient resources to accept a given trade
		* <pre>
		* pre-conditions: NONE
		* post-conditions: Permission to accept a trade is returned
		* </pre>
		*/
		ClientModel.prototype.canAcceptTrade = function() {
			return this.players[this.playerID].canAcceptTrade();
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
			return this.map.canPlaceRoad(playerID, hex, edgeDirection);
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
			return this.map.canPlaceSettlement(playerID, hex, vertDirection);
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
			return this.map.canPlaceSettlement(playerID, hex, vertDirection);
		}
        
		return ClientModel;
	}());	
	
	return ClientModel;
}());


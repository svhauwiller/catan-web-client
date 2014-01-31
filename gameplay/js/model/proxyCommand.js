var catan = catan || {};
catan.models = catan.models || {};

/**
* Development Card List Module
*
* @module catan.models.proxyCommands
*/

catan.models.proxyCommands = (function proxyCommandNameSpace(){

	var commandTemplate = (function commandClass(){
		
		/**
		* generic command class
		* <pre>
		* </pre>
		*
		* @class commandClass
		* @param {string} newType the type of the command
		* @param {int} newIndex the index of the player who issued the command
		* @constructor
		*/

		/**
		* The type of command
		* @property type
		* @type {string}
		*/

		/**
		* The player index of the player issuing the command
		* @property playerIndex
		* @type {int}
		*/

		function commandTemplate(newType, newIndex){
			this.type = newType;
			this.playerIndex = newIndex;
		}

		commandTemplate.prototype.createArgs = function(args){
			// TODO: Do something
		};

		commandTemplate.prototype.sendToServer = function(){
			// TODO: Do something
		};

		return commandTemplate;
	}());

	sendChatCommand.prototype = new commandTemplate(this.type, newIndex);
	sendChatCommand.prototype.constructor = sendChatCommand;
	
	var sendChatCommand = (function sendChatCommandClass(){
		
		/**
		* send chat command class
		* <pre>
		* </pre>
		*
		* @class sendChatCommandClass
		* @constructor
		*/
		
		/**
		* The type of command
		* @property type
		* @type {string}
		*/

		/**
		* The player index of the player issuing the command
		* @property playerIndex
		* @type {int}
		*/

		/**
		* The content of the chat message
		* @property content
		* @type {string}
		*/
		
		code.forceClassInherit(sendChatCommandClass, commandTemplate);
		function sendChatCommandClass(newIndex){
			this.type = "sendChat";
			this.playerIndex = newIndex;
			this.content = "";
		}

		sendChatCommand.prototype.createArgs = function(args){
			commandTemplate.prototype.createArgs();
			// TODO: Do something
		};

		sendChatCommand.prototype.sendToServer = function(){
			commandTemplate.prototype.sendToServer();
			// TODO: Do something
		};
		
		return sendChatCommand;
	}());

	var rollNumberCommand = (function rollNumberCommandClass(){
		
		/**
		* roll number command class
		* <pre>
		* </pre>
		*
		* @class rollNumberCommandClass
		* @constructor
		*/
		
		/**
		* The type of command
		* @property type
		* @type {string}
		*/

		/**
		* The player index of the player issuing the command
		* @property playerIndex
		* @type {int}
		*/

		/**
		* The number rolled
		* @property number
		* @type {int}
		*/
		
		function rollNumberCommandClass()
		{
			this.type = "rollNumber";
			this.playerIndex = -1;
			this.number = -1;
		}
		
		return rollNumberCommand;
	}());

	var robPlayerCommand = (function robPlayerCommandClass(){
		
		/**
		* rob player command class
		* <pre>
		* </pre>
		*
		* @class robPlayerCommandClass
		* @constructor
		*/
		
		/**
		* The type of command
		* @property type
		* @type {string}
		*/

		/**
		* The player index of the player issuing the command
		* @property playerIndex
		* @type {int}
		*/

		/**
		* The player index of the robbing victim
		* @property victimIndex
		* @type {int}
		*/

		/**
		* The current hex location of the robber
		* @property robberSpot
		* @type {HexLocation}
		*/
		
		function robPlayerCommandClass()
		{
			this.type = "robPlayer";
			this.playerIndex = -1;
			this.victimIndex = -1;
			this.robberSpot = new HexLocation();
		}
		
		return robPlayerCommand;
	}());

	var finishTurnCommand = (function finishTurnCommandClass(){
		
		/**
		* finish turn command class
		* <pre>
		* </pre>
		*
		* @class finishTurnCommandClass
		* @constructor
		*/
		
		/**
		* The type of command
		* @property type
		* @type {string}
		*/

		/**
		* The player index of the player issuing the command
		* @property playerIndex
		* @type {int}
		*/
		
		function finishTurnCommandClass()
		{
			this.type = "finishTurn";
			this.playerIndex = -1;
		}
		
		return finishTurnCommand;
	}());

	var buyDevCardCommand = (function buyDevCardCommandClass(){
		
		/**
		* buy development card command class
		* <pre>
		* </pre>
		*
		* @class buyDevCardCommandClass
		* @constructor
		*/
		
		/**
		* The type of command
		* @property type
		* @type {string}
		*/

		/**
		* The player index of the player issuing the command
		* @property playerIndex
		* @type {int}
		*/
		
		function buyDevCardCommandClass()
		{
			this.type = "buyDevCard";
			this.playerIndex = -1;
		}
		
		return buyDevCardCommand;
	}());

	var yearOfPlentyCommand = (function yearOfPlentyCommandClass(){
		
		/**
		* year of plenty command class
		* <pre>
		* </pre>
		*
		* @class yearOfPlentyCommandClass
		* @constructor
		*/
		
		/**
		* The type of command
		* @property type
		* @type {string}
		*/

		/**
		* The player index of the player issuing the command
		* @property playerIndex
		* @type {int}
		*/

		/**
		* The first resource selected
		* @property resource1
		* @type {string}
		*/
		
		/**
		* The second resource selected
		* @property resource2
		* @type {string}
		*/

		function yearOfPlentyCommandClass()
		{
			this.type = "Year_of_Plenty";
			this.playerIndex = -1;
			this.resource1 = "";
			this.resource2 = "";
		}
		
		return yearOfPlentyCommand;
	}());

	var roadBuildingCommand = (function roadBuildingCommandClass(){
		
		/**
		* road building command class
		* <pre>
		* </pre>
		*
		* @class roadBuildingCommandClass
		* @constructor
		*/
		
		/**
		* The type of command
		* @property type
		* @type {string}
		*/

		/**
		* The player index of the player issuing the command
		* @property playerIndex
		* @type {int}
		*/

		/**
		* The number rolled
		* @property number
		* @type {int}
		*/
		
		function roadBuildingCommandClass()
		{
			this.type = "Road_Building";
			this.playerIndex = -1;
			this.number = new HexLocation();
		}
		
		return roadBuildingCommand;
	}());

	var roadBuildingCommand = (function roadBuildingCommandClass(){
		
		/**
		* road building command class
		* <pre>
		* </pre>
		*
		* @class roadBuildingCommandClass
		* @constructor
		*/
		
		/**
		* The type of command
		* @property type
		* @type {string}
		*/

		/**
		* The player index of the player issuing the command
		* @property playerIndex
		* @type {int}
		*/

		/**
		* The first edge selected
		* @property spot1
		* @type {EdgeLocation}
		*/
		
		/**
		* The second edge selected
		* @property spot2
		* @type {EdgeLocation}
		*/

		function roadBuildingCommandClass()
		{
			this.type = "Road_Building";
			this.playerIndex = -1;
			this.spot1 = new EdgeLocation();
			this.spot2 = new EdgeLocation();
		}
		
		return roadBuildingCommand;
	}());

	var soldierCommand = (function soldierCommandClass(){
		
		/**
		* soldier command class
		* <pre>
		* </pre>
		*
		* @class soldierCommandClass
		* @constructor
		*/
		
		/**
		* The type of command
		* @property type
		* @type {string}
		*/

		/**
		* The player index of the player issuing the command
		* @property playerIndex
		* @type {int}
		*/

		/**
		* The player index of the robbing victim
		* @property victimIndex
		* @type {int}
		*/

		/**
		* The current hex location of the robber
		* @property robberSpot
		* @type {HexLocation}
		*/
		
		function soldierCommandClass()
		{
			this.type = "Soldier";
			this.playerIndex = -1;
			this.victimIndex = -1;
			this.robberSpot = new HexLocation();
		}
		
		return soldierCommand;
	}());

	var monopolyCommand = (function monopolyCommandClass(){
		
		/**
		* monopoly command class
		* <pre>
		* </pre>
		*
		* @class monopolyCommandClass
		* @constructor
		*/
		
		/**
		* The type of command
		* @property type
		* @type {string}
		*/

		/**
		* The player index of the player issuing the command
		* @property playerIndex
		* @type {int}
		*/

		/**
		* The resource selected
		* @property resource
		* @type {string}
		*/
		
		function monopolyCommandClass()
		{
			this.type = "Monopoly";
			this.playerIndex = -1;
			this.resource = "";
		}
		
		return monopolyCommand;
	}());

	var monumentCommand = (function monumentCommandClass(){
		
		/**
		* monument command class
		* <pre>
		* </pre>
		*
		* @class monumentCommandClass
		* @constructor
		*/
		
		/**
		* The type of command
		* @property type
		* @type {string}
		*/

		/**
		* The player index of the player issuing the command
		* @property playerIndex
		* @type {int}
		*/
		
		function monumentCommandClass()
		{
			this.type = "Monument";
			this.playerIndex = -1;
		}
		
		return monumentCommand;
	}());

	var buildRoadCommand = (function buildRoadCommandClass(){
		
		/**
		* build road command class
		* <pre>
		* </pre>
		*
		* @class buildRoadCommandClass
		* @constructor
		*/
		
		/**
		* The type of command
		* @property type
		* @type {string}
		*/

		/**
		* The player index of the player issuing the command
		* @property playerIndex
		* @type {int}
		*/
		
		/**
		* The edge selected
		* @property roadLocation
		* @type {EdgeLocation}
		*/
		
		/**
		* Whether or not the current Player gets this piece for free (i.e. setup or progress card)
		* @property free
		* @type {boolean}
		*/

		function buildRoadCommandClass()
		{
			this.type = "buildRoad";
			this.playerIndex = -1;
			this.roadLocation = new EdgeLocation();
			this.free = false;
		}
		
		return buildRoadCommand;
	}());

	var buildSettlementCommand = (function buildSettlementCommandClass(){
		
		/**
		* build settlement command class
		* <pre>
		* </pre>
		*
		* @class buildSettlementCommandClass
		* @constructor
		*/
		
		/**
		* The type of command
		* @property type
		* @type {string}
		*/

		/**
		* The player index of the player issuing the command
		* @property playerIndex
		* @type {int}
		*/
		
		/**
		* The vertex selected
		* @property vertexLocation
		* @type {VertexLocation}
		*/
		
		/**
		* Whether or not the current Player gets this piece for free (i.e. setup or progress card)
		* @property free
		* @type {boolean}
		*/

		function buildSettlementCommandClass()
		{
			this.type = "buildSettlement";
			this.playerIndex = -1;
			this.vertexLocation = new VertexLocation();
			this.free = false;
		}
		
		return buildSettlementCommand;
	}());

	var buildCityCommand = (function buildCityCommandClass(){
		
		/**
		* build city command class
		* <pre>
		* </pre>
		*
		* @class buildCityCommandClass
		* @constructor
		*/
		
		/**
		* The type of command
		* @property type
		* @type {string}
		*/

		/**
		* The player index of the player issuing the command
		* @property playerIndex
		* @type {int}
		*/
		
		/**
		* The vertex selected
		* @property vertexLocation
		* @type {VertexLocation}
		*/
		
		/**
		* Whether or not the current Player gets this piece for free (i.e. setup or progress card)
		* @property free
		* @type {boolean}
		*/

		function buildCityCommandClass()
		{
			this.type = "buildCity";
			this.playerIndex = -1;
			this.vertexLocation = new VertexLocation();
			this.free = false;
		}
		
		return buildCityCommand;
	}());

	var offerTradeCommand = (function offerTradeCommandClass(){
		
		/**
		* offer trade command class
		* <pre>
		* </pre>
		*
		* @class offerTradeCommandClass
		* @constructor
		*/
		
		/**
		* The type of command
		* @property type
		* @type {string}
		*/

		/**
		* The player index of the player issuing the command
		* @property playerIndex
		* @type {int}
		*/
		
		/**
		* The list of resources offered
		* @property offer
		* @type {ResourceList}
		*/
		
		/**
		* The player index of the player to whom the offer is made to
		* @property receiver
		* @type {int}
		*/

		function offerTradeCommandClass()
		{
			this.type = "offerTrade";
			this.playerIndex = -1;
			this.offer = new ResourceList(); // THIS MIGHT NOT BE THE RIGHT OBJECT!!!
			this.receiver = -1;
		}
		
		return offerTradeCommand;
	}());

	var acceptTradeCommand = (function acceptTradeCommandClass(){
		
		/**
		* accept trade command class
		* <pre>
		* </pre>
		*
		* @class acceptTradeCommandClass
		* @constructor
		*/
		
		/**
		* The type of command
		* @property type
		* @type {string}
		*/

		/**
		* The player index of the player issuing the command
		* @property playerIndex
		* @type {int}
		*/
		
		/**
		* Whether or not the currentPlayer accepts the offered trade
		* @property willAccept
		* @type {boolean}
		*/

		function acceptTradeCommandClass()
		{
			this.type = "offerTrade";
			this.playerIndex = -1;
			this.willAccept = false;
		}
		
		return acceptTradeCommand;
	}());

	var maritimeTradeCommand = (function maritimeTradeCommandClass(){
		
		/**
		* maritime trade command class
		* <pre>
		* </pre>
		*
		* @class maritimeTradeCommandClass
		* @constructor
		*/
		
		/**
		* The type of command
		* @property type
		* @type {string}
		*/

		/**
		* The player index of the player issuing the command
		* @property playerIndex
		* @type {int}
		*/
		
		/**
		* I DON'T KNOW WHAT THIS VARIABLE DOES!!!!
		* @property ratio
		* @type {int}
		*/

		/**
		* The input resource for this trade port
		* @property inputResource
		* @type {string}
		*/

		/**
		* The output resource for this trade port
		* @property outputResource
		* @type {string}
		*/

		function maritimeTradeCommandClass()
		{
			this.type = "offerTrade";
			this.playerIndex = -1;
			this.ratio = -1;
			this.inputResource = "";
			this.outputResource = "";
		}
		
		return maritimeTradeCommand;
	}());

	var discardCardsCommand = (function discardCardsCommandClass(){
		
		/**
		* maritime trade command class
		* <pre>
		* </pre>
		*
		* @class discardCardsCommandClass
		* @constructor
		*/
		
		/**
		* The type of command
		* @property type
		* @type {string}
		*/

		/**
		* The player index of the player issuing the command
		* @property playerIndex
		* @type {int}
		*/
		
		/**
		* The list of resources to be discarded
		* @property discardedCards
		* @type {ResourceList}
		*/

		function discardCardsCommandClass()
		{
			this.type = "offerTrade";
			this.playerIndex = -1;
			this.discardedCards = new ResourceList();
		}
		
		return discardCardsCommand;
	}());

	//return sendChatCommand;
}());

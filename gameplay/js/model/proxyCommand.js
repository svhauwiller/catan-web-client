var catan = catan || {};
catan.models = catan.models || {};

/**
* Development Card List Module
*
* @module catan.models.proxyCommands
*/

catan.models.proxyCommands = (function proxyCommandNameSpace(){
	
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
		
		function sendChatCommandClass()
		{
			this.type = "sendChat";
			this.playerIndex = -1;
			this.content = "";
		}
		
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
			this.number = -1;
		}
		
		return roadBuildingCommand;
	}());

	//return sendChatCommand;
}());

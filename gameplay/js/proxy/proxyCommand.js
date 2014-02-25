var catan = catan || {};
catan.proxy = catan.proxy || {};

/**
* Proxy Command Module
*
* @module catan.proxy.proxyCommands
*/

catan.proxy.proxyCommands = (function proxyCommandNameSpace(){
	var CommandTemplate = (function commandClass(){
		
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

		/**
		* The JSON Object that will store the details of the command
		* @property JSONObject
		* @type {Object}
		*/

		/**
		* This method will send the created JSON Object to the proxy
		* @method createArgs
		* @param {string []} args An array of arguments to populate the command
		* @return {Object}
		*/

		/**
		* This method will send the created JSON Object to the proxy
		* @method sendToServer
		* @param {Object} JSONObj The JSON object to send to the server
		* @return {null}
		*/

		function CommandTemplate(newType, newIndex){
			this.type = newType;
			this.playerIndex = newIndex;
			this.proxyInstance = new catan.proxy.Proxy("", newIndex);
		}

		CommandTemplate.prototype.createArgs = function(type, playerIndex){
			var JSONObject = new Object();
			JSONObject.type = type;
			JSONObject.playerIndex = playerIndex;
			return JSONObject;
		};

		CommandTemplate.prototype.sendToServer = function(method, type, JSONObj){
			var proxyInstance = new catan.proxy.Proxy("", -1);
			return proxyInstance.sendToServer(method, type, JSONObj);
		};

		return CommandTemplate;
	}());
	
	var GetModelCommand = (function getModelCommandClass(){
		
		/**
		* generic command class
		* <pre>
		* </pre>
		*
		* @class getModelCommandClass
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
		
		/**
		* This method will call createArgs, then sendToServer
		* @method sendToProxy
		* @param {string []} args An array of arguments to pass to createArgs()
		* @return {null}
		*/

		/**
		* This method will send the created JSON Object to the proxy
		* @method createArgs
		* @return {Object}
		*/

		/**
		* This method will send the created JSON Object to the proxy
		* @method sendToServer
		* @param {Object} JSONObj The JSON object to send to the server
		* @return {null}
		*/

		core.forceClassInherit(GetModelCommand, CommandTemplate);
		function GetModelCommand(newIndex){
			CommandTemplate.call(this, "/game/model", newIndex);
		}
		
		GetModelCommand.prototype.sendToProxy = function(){
			var JSONObj = this.createArgs();
			return this.sendToServer(JSONObj);
		};

		GetModelCommand.prototype.createArgs = function(){
			var JSONObj = CommandTemplate.prototype.createArgs();
			return JSONObj;
		};

		GetModelCommand.prototype.sendToServer = function(){
			return CommandTemplate.prototype.sendToServer("GET", "/game/model");
		};

		return GetModelCommand;
	}());
	
	var SendChatCommand = (function sendChatCommandClass(){
		
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

		/**
		* This method will call createArgs, then sendToServer
		* @method sendToProxy
		* @param {string []} args An array of arguments to pass to createArgs()
		* @return {null}
		*/

		/**
		* This method will send the created JSON Object to the proxy
		* @method createArgs
		* @param {string []} args An array of arguments to populate the command
		* @return {Object}
		*/

		/**
		* This method will send the created JSON Object to the proxy
		* @method sendToServer
		* @param {Object} JSONObj The JSON object to send to the server
		* @return {null}
		*/
		
		core.forceClassInherit(SendChatCommand, CommandTemplate);
		function SendChatCommand(newIndex){
			CommandTemplate.call(this, "sendChat", newIndex);
			this.content = "";
		}

		SendChatCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			return this.sendToServer(JSONObj);
		};

		SendChatCommand.prototype.createArgs = function(args){
			var JSONObj = CommandTemplate.prototype.createArgs(this.type, this.playerIndex);
			JSONObj.content = args[0];
			return JSONObj;
		};

		SendChatCommand.prototype.sendToServer = function(JSONObj){
			return CommandTemplate.prototype.sendToServer("POST", "/moves/sendChat", JSONObj);
		};
		
		return SendChatCommand;
	}());

	var RollNumberCommand = (function rollNumberCommandClass(){
		
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

		/**
		* This method will call createArgs, then sendToServer
		* @method sendToProxy
		* @param {string []} args An array of arguments to pass to createArgs()
		* @return {null}
		*/

		/**
		* This method will send the created JSON Object to the proxy
		* @method createArgs
		* @param {string []} args An array of arguments to populate the command
		* @return {Object}
		*/

		/**
		* This method will send the created JSON Object to the proxy
		* @method sendToServer
		* @param {Object} JSONObj The JSON object to send to the server
		* @return {null}
		*/

		core.forceClassInherit(RollNumberCommand, CommandTemplate);
		function RollNumberCommand(newIndex){
			CommandTemplate.call(this, "rollNumber", newIndex);
			this.number = -1;
		}

		RollNumberCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			return this.sendToServer(JSONObj);
		};

		RollNumberCommand.prototype.createArgs = function(args){
			var JSONObj = CommandTemplate.prototype.createArgs(this.type, this.playerIndex);
			JSONObj.number = args[0];
			return JSONObj;
		};

		RollNumberCommand.prototype.sendToServer = function(JSONObj){
			return CommandTemplate.prototype.sendToServer("POST", "/moves/rollNumber", JSONObj);
		};
		
		return RollNumberCommand;
	}());

	var RobPlayerCommand = (function robPlayerCommandClass(){
		
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
		* @property location
		* @type {HexLocation}
		*/
		
		/**
		* This method will call createArgs, then sendToServer
		* @method sendToProxy
		* @param {string []} args An array of arguments to pass to createArgs()
		* @return {null}
		*/

		/**
		* This method will send the created JSON Object to the proxy
		* @method createArgs
		* @param {string []} args An array of arguments to populate the command
		* @return {Object}
		*/

		/**
		* This method will send the created JSON Object to the proxy
		* @method sendToServer
		* @param {Object} JSONObj The JSON object to send to the server
		* @return {null}
		*/

		core.forceClassInherit(RobPlayerCommand, CommandTemplate);
		function RobPlayerCommand(newIndex){
			CommandTemplate.call(this, "robPlayer", newIndex);
			this.victimIndex = -1;
			this.location = null;
		}
		
		RobPlayerCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			return this.sendToServer(JSONObj);
		};

		RobPlayerCommand.prototype.createArgs = function(args){
			var JSONObj = CommandTemplate.prototype.createArgs(this.type, this.playerIndex);
			JSONObj.victimIndex = args[0];
			JSONObj.location = args[1];
			return JSONObj;
		};

		RobPlayerCommand.prototype.sendToServer = function(JSONObj){
			return CommandTemplate.prototype.sendToServer("POST", "/moves/robPlayer", JSONObj);
		};
		
		return RobPlayerCommand;
	}());

	var FinishTurnCommand = (function finishTurnCommandClass(){
		
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
		
		/**
		* This method will call createArgs, then sendToServer
		* @method sendToProxy
		* @param {string []} args An array of arguments to pass to createArgs()
		* @return {null}
		*/

		/**
		* This method will send the created JSON Object to the proxy
		* @method createArgs
		* @return {Object}
		*/

		/**
		* This method will send the created JSON Object to the proxy
		* @method sendToServer
		* @param {Object} JSONObj The JSON object to send to the server
		* @return {null}
		*/

		core.forceClassInherit(FinishTurnCommand, CommandTemplate);
		function FinishTurnCommand(newIndex){
			CommandTemplate.call(this, "finishTurn", newIndex);
		}
		
		FinishTurnCommand.prototype.sendToProxy = function(){
			var JSONObj = this.createArgs();
			return this.sendToServer(JSONObj);
		};

		FinishTurnCommand.prototype.createArgs = function(){
			var JSONObj = CommandTemplate.prototype.createArgs(this.type, this.playerIndex);
			return JSONObj;
		};

		FinishTurnCommand.prototype.sendToServer = function(JSONObj){
			return CommandTemplate.prototype.sendToServer("POST", "/moves/finishTurn", JSONObj);
		};
		
		return FinishTurnCommand;
	}());

	var BuyDevCardCommand = (function buyDevCardCommandClass(){
		
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
		
		/**
		* This method will call createArgs, then sendToServer
		* @method sendToProxy
		* @param {string []} args An array of arguments to pass to createArgs()
		* @return {null}
		*/

		/**
		* This method will send the created JSON Object to the proxy
		* @method createArgs
		* @return {Object}
		*/

		/**
		* This method will send the created JSON Object to the proxy
		* @method sendToServer
		* @param {Object} JSONObj The JSON object to send to the server
		* @return {null}
		*/

		core.forceClassInherit(BuyDevCardCommand, CommandTemplate);
		function BuyDevCardCommand(newIndex){
			CommandTemplate.call(this, "buyDevCard", newIndex);
		}
		
		BuyDevCardCommand.prototype.sendToProxy = function(){
			var JSONObj = this.createArgs();
			return this.sendToServer(JSONObj);
		};

		BuyDevCardCommand.prototype.createArgs = function(){
			var JSONObj = CommandTemplate.prototype.createArgs(this.type, this.playerIndex);
			return JSONObj;
		};

		BuyDevCardCommand.prototype.sendToServer = function(JSONObj){
			return CommandTemplate.prototype.sendToServer("POST", "/moves/buyDevCard", JSONObj);
		};
		
		return BuyDevCardCommand;
	}());

	var YearOfPlentyCommand = (function yearOfPlentyCommandClass(){
		
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
		
		/**
		* This method will call createArgs, then sendToServer
		* @method sendToProxy
		* @param {string []} args An array of arguments to pass to createArgs()
		* @return {null}
		*/

		/**
		* This method will send the created JSON Object to the proxy
		* @method createArgs
		* @param {string []} args An array of arguments to populate the command
		* @return {Object}
		*/

		/**
		* This method will send the created JSON Object to the proxy
		* @method sendToServer
		* @param {Object} JSONObj The JSON object to send to the server
		* @return {null}
		*/

		core.forceClassInherit(YearOfPlentyCommand, CommandTemplate);
		function YearOfPlentyCommand(newIndex){
			CommandTemplate.call(this, "Year_of_Plenty", newIndex);
			this.resource1 = "";
			this.resource2 = "";
		}
		
		YearOfPlentyCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			return this.sendToServer(JSONObj);
		};

		YearOfPlentyCommand.prototype.createArgs = function(args){
			var JSONObj = CommandTemplate.prototype.createArgs(this.type, this.playerIndex);
			JSONObj.resource1 = args[0];
			JSONObj.resource2 = args[1];
			return JSONObj;
		};

		YearOfPlentyCommand.prototype.sendToServer = function(JSONObj){
			return CommandTemplate.prototype.sendToServer("POST", "/moves/Year_of_Plenty", JSONObj);
		};
		
		return YearOfPlentyCommand;
	}());

	var RoadBuildingCommand = (function roadBuildingCommandClass(){
		
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
		
		/**
		* This method will call createArgs, then sendToServer
		* @method sendToProxy
		* @param {string []} args An array of arguments to pass to createArgs()
		* @return {null}
		*/

		/**
		* This method will send the created JSON Object to the proxy
		* @method createArgs
		* @param {string []} args An array of arguments to populate the command
		* @return {Object}
		*/

		/**
		* This method will send the created JSON Object to the proxy
		* @method sendToServer
		* @param {Object} JSONObj The JSON object to send to the server
		* @return {null}
		*/

		core.forceClassInherit(RoadBuildingCommand, CommandTemplate);
		function RoadBuildingCommand(newIndex){
			CommandTemplate.call(this, "Road_Building", newIndex);
			this.spot1 = null;
			this.spot2 = null;
		}
		
		RoadBuildingCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			return this.sendToServer(JSONObj);
		};

		RoadBuildingCommand.prototype.createArgs = function(args){
			var JSONObj = CommandTemplate.prototype.createArgs(this.type, this.playerIndex);
			JSONObj.spot1 = args[0];
			JSONObj.spot2 = args[1];
			return JSONObj;
		};

		RoadBuildingCommand.prototype.sendToServer = function(JSONObj){
			return CommandTemplate.prototype.sendToServer("POST", "/moves/Road_Building", JSONObj);
		};
		
		return RoadBuildingCommand;
	}());

	var SoldierCommand = (function soldierCommandClass(){
		
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
		* @property location
		* @type {HexLocation}
		*/
		
		/**
		* This method will call createArgs, then sendToServer
		* @method sendToProxy
		* @param {string []} args An array of arguments to pass to createArgs()
		* @return {null}
		*/

		/**
		* This method will send the created JSON Object to the proxy
		* @method createArgs
		* @param {string []} args An array of arguments to populate the command
		* @return {Object}
		*/

		/**
		* This method will send the created JSON Object to the proxy
		* @method sendToServer
		* @param {Object} JSONObj The JSON object to send to the server
		* @return {null}
		*/

		core.forceClassInherit(SoldierCommand, CommandTemplate);
		function SoldierCommand(newIndex){
			CommandTemplate.call(this, "Soldier", newIndex);
			this.victimIndex = -1;
			this.location = null;
		}
		
		SoldierCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			return this.sendToServer(JSONObj);
		};

		SoldierCommand.prototype.createArgs = function(args){
			var JSONObj = CommandTemplate.prototype.createArgs(this.type, this.playerIndex);
			JSONObj.victimIndex = args[0];
			JSONObj.location = args[1];
			return JSONObj;
		};

		SoldierCommand.prototype.sendToServer = function(JSONObj){
			return CommandTemplate.prototype.sendToServer("POST", "/moves/Soldier", JSONObj);
		};
		
		return SoldierCommand;
	}());

	var MonopolyCommand = (function monopolyCommandClass(){
		
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
		
		/**
		* This method will call createArgs, then sendToServer
		* @method sendToProxy
		* @param {string []} args An array of arguments to pass to createArgs()
		* @return {null}
		*/

		/**
		* This method will send the created JSON Object to the proxy
		* @method createArgs
		* @param {string []} args An array of arguments to populate the command
		* @return {Object}
		*/

		/**
		* This method will send the created JSON Object to the proxy
		* @method sendToServer
		* @param {Object} JSONObj The JSON object to send to the server
		* @return {null}
		*/

		core.forceClassInherit(MonopolyCommand, CommandTemplate);		
		function MonopolyCommand(newIndex){
			CommandTemplate.call(this, "Monopoly", newIndex);
			this.resource = "";
		}
		
		MonopolyCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			return this.sendToServer(JSONObj);
		};

		MonopolyCommand.prototype.createArgs = function(args){
			var JSONObj = CommandTemplate.prototype.createArgs(this.type, this.playerIndex);
			JSONObj.resource = args[0];
			return JSONObj;
		};

		MonopolyCommand.prototype.sendToServer = function(JSONObj){
			return CommandTemplate.prototype.sendToServer("POST", "/moves/Monopoly", JSONObj);
		};
		
		return MonopolyCommand;
	}());

	var MonumentCommand = (function monumentCommandClass(){
		
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
		
		/**
		* This method will call createArgs, then sendToServer
		* @method sendToProxy
		* @param {string []} args An array of arguments to pass to createArgs()
		* @return {null}
		*/

		/**
		* This method will send the created JSON Object to the proxy
		* @method createArgs
		* @return {Object}
		*/

		/**
		* This method will send the created JSON Object to the proxy
		* @method sendToServer
		* @param {Object} JSONObj The JSON object to send to the server
		* @return {null}
		*/

		core.forceClassInherit(MonumentCommand, CommandTemplate);	
		function MonumentCommand(newIndex){
			CommandTemplate.call(this, "Monument", newIndex);
		}
		
		MonumentCommand.prototype.sendToProxy = function(){
			var JSONObj = this.createArgs();
			return this.sendToServer(JSONObj);
		};

		MonumentCommand.prototype.createArgs = function(){
			var JSONObj = CommandTemplate.prototype.createArgs(this.type, this.playerIndex);
			return JSONObj;
		};

		MonumentCommand.prototype.sendToServer = function(JSONObj){
			return CommandTemplate.prototype.sendToServer("POST", "/moves/Monument", JSONObj);
		};
		
		return MonumentCommand;
	}());

	var BuildRoadCommand = (function buildRoadCommandClass(){
		
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
		
		/**
		* This method will call createArgs, then sendToServer
		* @method sendToProxy
		* @param {string []} args An array of arguments to pass to createArgs()
		* @return {null}
		*/

		/**
		* This method will send the created JSON Object to the proxy
		* @method createArgs
		* @param {string []} args An array of arguments to populate the command
		* @return {Object}
		*/

		/**
		* This method will send the created JSON Object to the proxy
		* @method sendToServer
		* @param {Object} JSONObj The JSON object to send to the server
		* @return {null}
		*/

		core.forceClassInherit(BuildRoadCommand, CommandTemplate);
		function BuildRoadCommand(newIndex){
			CommandTemplate.call(this, "buildRoad", newIndex);
			this.roadLocation = null;
			this.free = false;
		}
		
		BuildRoadCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			return this.sendToServer(JSONObj);
		};

		BuildRoadCommand.prototype.createArgs = function(args){
			var JSONObj = CommandTemplate.prototype.createArgs(this.type, this.playerIndex);
			JSONObj.roadLocation = args[0];
			JSONObj.free = args[1];
			return JSONObj;
		};

		BuildRoadCommand.prototype.sendToServer = function(JSONObj){
			return CommandTemplate.prototype.sendToServer("POST", "/moves/buildRoad", JSONObj);
		};
		
		return BuildRoadCommand;
	}());

	var BuildSettlementCommand = (function buildSettlementCommandClass(){
		
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
		
		/**
		* This method will call createArgs, then sendToServer
		* @method sendToProxy
		* @param {string []} args An array of arguments to pass to createArgs()
		* @return {null}
		*/

		/**
		* This method will send the created JSON Object to the proxy
		* @method createArgs
		* @return {Object}
		*/

		/**
		* This method will send the created JSON Object to the proxy
		* @method sendToServer
		* @param {Object} JSONObj The JSON object to send to the server
		* @return {null}
		*/

		core.forceClassInherit(BuildSettlementCommand, CommandTemplate);
		function BuildSettlementCommand(newIndex){
			CommandTemplate.call(this, "buildSettlement", newIndex);
			this.vertexLocation = null;
			this.free = false;
		}
		
		BuildSettlementCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			return this.sendToServer(JSONObj);
		};

		BuildSettlementCommand.prototype.createArgs = function(args){
			var JSONObj = CommandTemplate.prototype.createArgs(this.type, this.playerIndex);
			JSONObj.vertexLocation = args[0];
			JSONObj.free = args[1];
			return JSONObj;
		};

		BuildSettlementCommand.prototype.sendToServer = function(JSONObj){
			return CommandTemplate.prototype.sendToServer("POST", "/moves/buildSettlement", JSONObj);
		};
		
		return BuildSettlementCommand;
	}());

	var BuildCityCommand = (function buildCityCommandClass(){
		
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
		
		/**
		* This method will call createArgs, then sendToServer
		* @method sendToProxy
		* @param {string []} args An array of arguments to pass to createArgs()
		* @return {null}
		*/

		/**
		* This method will send the created JSON Object to the proxy
		* @method createArgs
		* @return {Object}
		*/

		/**
		* This method will send the created JSON Object to the proxy
		* @method sendToServer
		* @param {Object} JSONObj The JSON object to send to the server
		* @return {null}
		*/

		core.forceClassInherit(BuildCityCommand, CommandTemplate);
		function BuildCityCommand(newIndex){
			CommandTemplate.call(this, "buildCity", newIndex);
			this.vertexLocation = null;
			this.free = false;
		}
		
		BuildCityCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			return this.sendToServer(JSONObj);
		};

		BuildCityCommand.prototype.createArgs = function(args){
			var JSONObj = CommandTemplate.prototype.createArgs(this.type, this.playerIndex);
			JSONObj.vertexLocation = args[0];
			JSONObj.free = args[1];
			return JSONObj;
		};

		BuildCityCommand.prototype.sendToServer = function(JSONObj){
			return CommandTemplate.prototype.sendToServer("POST", "/moves/buildCity", JSONObj);
		};
		
		return BuildCityCommand;
	}());

	var OfferTradeCommand = (function offerTradeCommandClass(){
		
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
		
		/**
		* This method will call createArgs, then sendToServer
		* @method sendToProxy
		* @param {string []} args An array of arguments to pass to createArgs()
		* @return {null}
		*/

		/**
		* This method will send the created JSON Object to the proxy
		* @method createArgs
		* @param {string []} args An array of arguments to populate the command
		* @return {Object}
		*/

		/**
		* This method will send the created JSON Object to the proxy
		* @method sendToServer
		* @param {Object} JSONObj The JSON object to send to the server
		* @return {null}
		*/

		core.forceClassInherit(OfferTradeCommand, CommandTemplate);
		function OfferTradeCommand(newIndex){
			CommandTemplate.call(this, "offerTrade", newIndex);
			this.offer = null;
			this.receiver = -1;
		}
		
		OfferTradeCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			return this.sendToServer(JSONObj);
		};

		OfferTradeCommand.prototype.createArgs = function(args){
			var JSONObj = CommandTemplate.prototype.createArgs(this.type, this.playerIndex);
			JSONObj.offer = args[0];
			JSONObj.receiver = args[1];
			return JSONObj;
		};

		OfferTradeCommand.prototype.sendToServer = function(JSONObj){
			return CommandTemplate.prototype.sendToServer("POST", "/moves/offerTrade", JSONObj);
		};
		
		return OfferTradeCommand;
	}());

	var AcceptTradeCommand = (function acceptTradeCommandClass(){
		
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
		
		/**
		* This method will call createArgs, then sendToServer
		* @method sendToProxy
		* @param {string []} args An array of arguments to pass to createArgs()
		* @return {null}
		*/

		/**
		* This method will send the created JSON Object to the proxy
		* @method createArgs
		* @param {string []} args An array of arguments to populate the command
		* @return {Object}
		*/

		/**
		* This method will send the created JSON Object to the proxy
		* @method sendToServer
		* @param {Object} JSONObj The JSON object to send to the server
		* @return {null}
		*/

		core.forceClassInherit(AcceptTradeCommand, CommandTemplate);
		function AcceptTradeCommand(newIndex){
			CommandTemplate.call(this, "acceptTrade", newIndex);
			this.willAccept = false;
		}
		
		AcceptTradeCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			return this.sendToServer(JSONObj);
		};

		AcceptTradeCommand.prototype.createArgs = function(args){
			var JSONObj = CommandTemplate.prototype.createArgs(this.type, this.playerIndex);
			JSONObj.willAccept = args[0];
			return JSONObj;
		};

		AcceptTradeCommand.prototype.sendToServer = function(JSONObj){
			return CommandTemplate.prototype.sendToServer("POST", "/moves/acceptTrade", JSONObj);
		};
		
		return AcceptTradeCommand;
	}());

	var MaritimeTradeCommand = (function maritimeTradeCommandClass(){
		
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
		
		/**
		* This method will call createArgs, then sendToServer
		* @method sendToProxy
		* @param {string []} args An array of arguments to pass to createArgs()
		* @return {null}
		*/

		/**
		* This method will send the created JSON Object to the proxy
		* @method createArgs
		* @param {string []} args An array of arguments to populate the command
		* @return {Object}
		*/

		/**
		* This method will send the created JSON Object to the proxy
		* @method sendToServer
		* @param {Object} JSONObj The JSON object to send to the server
		* @return {null}
		*/

		core.forceClassInherit(MaritimeTradeCommand, CommandTemplate);
		function MaritimeTradeCommand(newIndex){
			CommandTemplate.call(this, "maritimeTrade", newIndex);
			this.ratio = -1;
			this.inputResource = "";
			this.outputResource = "";
		}
		
		MaritimeTradeCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			return this.sendToServer(JSONObj);
		};

		MaritimeTradeCommand.prototype.createArgs = function(args){
			var JSONObj = CommandTemplate.prototype.createArgs(this.type, this.playerIndex);
			JSONObj.ratio = args[0];
			JSONObj.inputResource = args[1];
			JSONObj.outputResource = args[2];
			return JSONObj;
		};

		MaritimeTradeCommand.prototype.sendToServer = function(JSONObj){
			return CommandTemplate.prototype.sendToServer("POST", "/moves/maritimeTrade", JSONObj);
		};
		
		return MaritimeTradeCommand;
	}());

	var DiscardCardsCommand = (function discardCardsCommandClass(){
		
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
		
		/**
		* This method will call createArgs, then sendToServer
		* @method sendToProxy
		* @param {string []} args An array of arguments to pass to createArgs()
		* @return {null}
		*/

		/**
		* This method will send the created JSON Object to the proxy
		* @method createArgs
		* @param {string []} args An array of arguments to populate the command
		* @return {Object}
		*/

		/**
		* This method will send the created JSON Object to the proxy
		* @method sendToServer
		* @param {Object} JSONObj The JSON object to send to the server
		* @return {null}
		*/

		core.forceClassInherit(DiscardCardsCommand, CommandTemplate);
		function DiscardCardsCommand(newIndex){
			CommandTemplate.call(this, "discardCards", newIndex);
			this.discardedCards = null;
		}
		
		DiscardCardsCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			return this.sendToServer(JSONObj);
		};

		DiscardCardsCommand.prototype.createArgs = function(args){
			var JSONObj = CommandTemplate.prototype.createArgs(this.type, this.playerIndex);
			JSONObj.discardedCards = args[0];
			return JSONObj;
		};

		DiscardCardsCommand.prototype.sendToServer = function(JSONObj){
			return CommandTemplate.prototype.sendToServer("POST", "/moves/discardCards", JSONObj);
		};
		
		return DiscardCardsCommand;
	}());

	return{
		CommandTemplate: CommandTemplate,
		GetModelCommand: GetModelCommand,
		SendChatCommand: SendChatCommand,
		RollNumberCommand: RollNumberCommand,
		RobPlayerCommand: RobPlayerCommand,
		FinishTurnCommand: FinishTurnCommand,
		BuyDevCardCommand: BuyDevCardCommand,
		YearOfPlentyCommand: YearOfPlentyCommand,
		RoadBuildingCommand: RoadBuildingCommand,
		SoldierCommand: SoldierCommand,
		MonopolyCommand: MonopolyCommand,
		MonumentCommand: MonumentCommand,
		BuildRoadCommand: BuildRoadCommand,
		BuildSettlementCommand: BuildSettlementCommand,
		BuildCityCommand: BuildCityCommand,
		OfferTradeCommand: OfferTradeCommand,
		AcceptTradeCommand: AcceptTradeCommand,
		MaritimeTradeCommand: MaritimeTradeCommand,
		DiscardCardsCommand: DiscardCardsCommand
	}
}());

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
			this.JSONObject = new Object();
			this.proxyInstance = new catan.proxy.proxy.Proxy;
		}

		CommandTemplate.prototype.createArgs = function(){
			this.JSONObject.type = newType;
			this.JSONObject.playerIndex = newIndex;
			return this.JSONObject;
		};

		CommandTemplate.prototype.sendToServer = function(type, name, JSONObj){
			this.proxyInstance.sendToServer(type, name, JSONObj);
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

		code.forceClassInherit(GetModelCommand, CommandTemplate);
		function GetModelCommand(newIndex){
			CommandTemplate.call(this, "/game/model", newIndex);
		}
		
		GetModelCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			this.sendToServer(JSONObj);
		};

		GetModelCommand.prototype.createArgs = function(){
			var JSONObj = CommandTemplate.prototype.createArgs();
			return JSONObj;
		};

		GetModelCommand.prototype.sendToServer = function(JSONObj){
			CommandTemplate.prototype.sendToServer("GET", this.type, JSONObj);
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
		
		code.forceClassInherit(SendChatCommand, CommandTemplate);
		function SendChatCommand(newIndex){
			CommandTemplate.call(this, "/moves/sendChat", newIndex);
			this.content = "";
		}

		SendChatCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			this.sendToServer(JSONObj);
		};

		SendChatCommand.prototype.createArgs = function(args){
			var JSONObj = CommandTemplate.prototype.createArgs();
			JSONObj.content = args[0];
			return JSONObj;
		};

		SendChatCommand.prototype.sendToServer = function(JSONObj){
			CommandTemplate.prototype.sendToServer("POST", this.type, JSONObj);
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

		code.forceClassInherit(RollNumberCommand, CommandTemplate);
		function RollNumberCommand(newIndex){
			CommandTemplate.call(this, "/moves/rollNumber", newIndex);
			this.number = -1;
		}

		RollNumberCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			this.sendToServer(JSONObj);
		};

		RollNumberCommand.prototype.createArgs = function(args){
			var JSONObj = CommandTemplate.prototype.createArgs();
			JSONObj.number = args[0];
			return JSONObj;
		};

		RollNumberCommand.prototype.sendToServer = function(JSONObj){
			CommandTemplate.prototype.sendToServer("POST", this.type, JSONObj);
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
		* @property robberSpot
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

		code.forceClassInherit(RobPlayerCommand, CommandTemplate);
		function RobPlayerCommand(){
			CommandTemplate.call(this, "/moves/robPlayer", newIndex);
			this.victimIndex = -1;
			this.robberSpot = new HexLocation();
		}
		
		RobPlayerCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			this.sendToServer(JSONObj);
		};

		RobPlayerCommand.prototype.createArgs = function(args){
			var JSONObj = CommandTemplate.prototype.createArgs();
			JSONObj.victimIndex = args[0];
			JSONObj.robberSpot = args[1];
			return JSONObj;
		};

		RobPlayerCommand.prototype.sendToServer = function(JSONObj){
			CommandTemplate.prototype.sendToServer("POST", this.type, JSONObj);
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

		code.forceClassInherit(FinishTurnCommand, CommandTemplate);
		function FinishTurnCommand(){
			CommandTemplate.call(this, "/moves/finishTurn", newIndex);
		}
		
		FinishTurnCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			this.sendToServer(JSONObj);
		};

		FinishTurnCommand.prototype.createArgs = function(){
			var JSONObj = CommandTemplate.prototype.createArgs();
			return JSONObj;
		};

		FinishTurnCommand.prototype.sendToServer = function(JSONObj){
			CommandTemplate.prototype.sendToServer("POST", this.type, JSONObj);
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

		code.forceClassInherit(BuyDevCardCommand, CommandTemplate);
		function BuyDevCardCommand(){
			CommandTemplate.call(this, "/moves/buyDevCard", newIndex);
		}
		
		BuyDevCardCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			this.sendToServer(JSONObj);
		};

		BuyDevCardCommand.prototype.createArgs = function(){
			var JSONObj = CommandTemplate.prototype.createArgs();
			return JSONObj;
		};

		BuyDevCardCommand.prototype.sendToServer = function(JSONObj){
			CommandTemplate.prototype.sendToServer("POST", this.type, JSONObj);
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

		code.forceClassInherit(YearOfPlentyCommand, CommandTemplate);
		function YearOfPlentyCommand(){
			CommandTemplate.call(this, "/moves/Year_of_Plenty", newIndex);
			this.resource1 = "";
			this.resource2 = "";
		}
		
		YearOfPlentyCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			this.sendToServer(JSONObj);
		};

		YearOfPlentyCommand.prototype.createArgs = function(args){
			var JSONObj = CommandTemplate.prototype.createArgs();
			JSONObj.resource1 = args[0];
			JSONObj.resource2 = args[1];
			return JSONObj;
		};

		YearOfPlentyCommand.prototype.sendToServer = function(JSONObj){
			CommandTemplate.prototype.sendToServer("POST", this.type, JSONObj);
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

		code.forceClassInherit(RoadBuildingCommand, CommandTemplate);
		function RoadBuildingCommand(){
			CommandTemplate.call(this, "/moves/Road_Building", newIndex);
			this.spot1 = new EdgeLocation();
			this.spot2 = new EdgeLocation();
		}
		
		RoadBuildingCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			this.sendToServer(JSONObj);
		};

		RoadBuildingCommand.prototype.createArgs = function(args){
			var JSONObj = CommandTemplate.prototype.createArgs();
			JSONObj.spot1 = args[0];
			JSONObj.spot2 = args[1];
			return JSONObj;
		};

		RoadBuildingCommand.prototype.sendToServer = function(JSONObj){
			CommandTemplate.prototype.sendToServer("POST", this.type, JSONObj);
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
		* @property robberSpot
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

		code.forceClassInherit(SoldierCommand, CommandTemplate);
		function SoldierCommand(){
			CommandTemplate.call(this, "/moves/Soldier", newIndex);
			this.victimIndex = -1;
			this.robberSpot = new HexLocation();
		}
		
		SoldierCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			this.sendToServer(JSONObj);
		};

		SoldierCommand.prototype.createArgs = function(args){
			var JSONObj = CommandTemplate.prototype.createArgs();
			JSONObj.victimIndex = args[0];
			JSONObj.robberSpot = args[1];
			return JSONObj;
		};

		SoldierCommand.prototype.sendToServer = function(JSONObj){
			CommandTemplate.prototype.sendToServer("POST", this.type, JSONObj);
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

		code.forceClassInherit(MonopolyCommand, CommandTemplate);		
		function MonopolyCommand(){
			CommandTemplate.call(this, "/moves/Monopoly", newIndex);
			this.resource = "";
		}
		
		MonopolyCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			this.sendToServer(JSONObj);
		};

		MonopolyCommand.prototype.createArgs = function(args){
			var JSONObj = CommandTemplate.prototype.createArgs();
			JSONObj.resource = args[0];
			return JSONObj;
		};

		MonopolyCommand.prototype.sendToServer = function(JSONObj){
			CommandTemplate.prototype.sendToServer("POST", this.type, JSONObj);
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

		code.forceClassInherit(MonumentCommand, CommandTemplate);	
		function MonumentCommand(){
			CommandTemplate.call(this, "/moves/Monument", newIndex);
		}
		
		MonumentCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			this.sendToServer(JSONObj);
		};

		MonumentCommand.prototype.createArgs = function(){
			var JSONObj = CommandTemplate.prototype.createArgs();
			return JSONObj;
		};

		MonumentCommand.prototype.sendToServer = function(JSONObj){
			CommandTemplate.prototype.sendToServer("POST", this.type, JSONObj);
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

		code.forceClassInherit(BuildRoadCommand, CommandTemplate);
		function BuildRoadCommand(){
			CommandTemplate.call(this, "/moves/buildRoad", newIndex);
			this.roadLocation = new EdgeLocation();
			this.free = false;
		}
		
		BuildRoadCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			this.sendToServer(JSONObj);
		};

		BuildRoadCommand.prototype.createArgs = function(args){
			var JSONObj = CommandTemplate.prototype.createArgs();
			this.roadLocation = args[0];
			this.free = args[1];
			return JSONObj;
		};

		BuildRoadCommand.prototype.sendToServer = function(JSONObj){
			CommandTemplate.prototype.sendToServer("POST", this.type, JSONObj);
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

		code.forceClassInherit(BuildSettlementCommand, CommandTemplate);
		function BuildSettlementCommand(){
			CommandTemplate.call(this, "/moves/buildSettlement", newIndex);
			this.vertexLocation = new VertexLocation();
			this.free = false;
		}
		
		BuildSettlementCommand.prototype.sendToProxy = function(){
			var JSONObj = this.createArgs(args);
			this.sendToServer(JSONObj);
		};

		BuildSettlementCommand.prototype.createArgs = function(args){
			var JSONObj = CommandTemplate.prototype.createArgs();
			this.vertexLocation = args[0];
			this.free = args[1];
			return JSONObj;
		};

		BuildSettlementCommand.prototype.sendToServer = function(JSONObj){
			CommandTemplate.prototype.sendToServer("POST", this.type, JSONObj);
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

		code.forceClassInherit(BuildCityCommand, CommandTemplate);
		function BuildCityCommand(){
			CommandTemplate.call(this, "/moves/buildCity", newIndex);
			this.vertexLocation = new VertexLocation();
			this.free = false;
		}
		
		BuildCityCommand.prototype.sendToProxy = function(){
			var JSONObj = this.createArgs(args);
			this.sendToServer(JSONObj);
		};

		BuildCityCommand.prototype.createArgs = function(args){
			var JSONObj = CommandTemplate.prototype.createArgs();
			this.vertexLocation = args[0];
			this.free = args[1];
			return JSONObj;
		};

		BuildCityCommand.prototype.sendToServer = function(JSONObj){
			CommandTemplate.prototype.sendToServer("POST", this.type, JSONObj);
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

		code.forceClassInherit(OfferTradeCommand, CommandTemplate);
		function OfferTradeCommand(){
			CommandTemplate.call(this, "/moves/offerTrade", newIndex);
			this.offer = new ResourceList(); // THIS MIGHT NOT BE THE RIGHT OBJECT!!!
			this.receiver = -1;
		}
		
		OfferTradeCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			this.sendToServer(JSONObj);
		};

		OfferTradeCommand.prototype.createArgs = function(args){
			var JSONObj = CommandTemplate.prototype.createArgs();
			this.offer = args[0];
			this.receiver = args[1];
			return JSONObj;
		};

		OfferTradeCommand.prototype.sendToServer = function(JSONObj){
			CommandTemplate.prototype.sendToServer("POST", this.type, JSONObj);
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

		code.forceClassInherit(AcceptTradeCommand, CommandTemplate);
		function AcceptTradeCommand(){
			CommandTemplate.call(this, "/moves/acceptTrade", newIndex);
			this.willAccept = false;
		}
		
		AcceptTradeCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			this.sendToServer(JSONObj);
		};

		AcceptTradeCommand.prototype.createArgs = function(args){
			var JSONObj = CommandTemplate.prototype.createArgs();
			this.willAccept = args[0];
			return JSONObj;
		};

		AcceptTradeCommand.prototype.sendToServer = function(JSONObj){
			CommandTemplate.prototype.sendToServer("POST", this.type, JSONObj);
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

		code.forceClassInherit(MaritimeTradeCommand, CommandTemplate);
		function MaritimeTradeCommand(){
			CommandTemplate.call(this, "/moves/offerTrade", newIndex);
			this.ratio = -1;
			this.inputResource = "";
			this.outputResource = "";
		}
		
		MaritimeTradeCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			this.sendToServer(JSONObj);
		};

		MaritimeTradeCommand.prototype.createArgs = function(args){
			var JSONObj = CommandTemplate.prototype.createArgs();
			this.ratio = args[0];
			this.inputResource = args[1];
			this.outputResource = args[2];
			return JSONObj;
		};

		MaritimeTradeCommand.prototype.sendToServer = function(JSONObj){
			CommandTemplate.prototype.sendToServer("POST", this.type, JSONObj);
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

		code.forceClassInherit(DiscardCardsCommand, CommandTemplate);
		function DiscardCardsCommand(){
			CommandTemplate.call(this, "/moves/discardCards", newIndex);
			this.discardedCards = new ResourceList();
		}
		
		DiscardCardsCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			this.sendToServer(JSONObj);
		};

		DiscardCardsCommand.prototype.createArgs = function(args){
			var JSONObj = CommandTemplate.prototype.createArgs();
			this.discardedCards = args[0];
			return JSONObj;
		};

		DiscardCardsCommand.prototype.sendToServer = function(JSONObj){
			CommandTemplate.prototype.sendToServer("POST", this.type, JSONObj);
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

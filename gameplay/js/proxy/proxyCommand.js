var catan = catan || {};
catan.proxy = catan.proxy || {};

/**
* Proxy Command Module
*
* @module catan.proxy.proxyCommands
*/

catan.proxy.proxyCommands = (function proxyCommandNameSpace(){
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

		function commandTemplate(newType, newIndex){
			this.type = newType;
			this.playerIndex = newIndex;
			this.JSONObject = new Object();
			this.proxyInstance = new catan.proxy.proxy;
		}

		commandTemplate.prototype.createArgs = function(){
			this.JSONObject.type = newType;
			this.JSONObject.playerIndex = newIndex;
			return this.JSONObject;
		};

		commandTemplate.prototype.sendToServer = function(type, name, JSONObj){
			this.proxyInstance.sendToServer(type, name, JSONObj);
		};

		return commandTemplate;
	}());
	
	var getModelCommand = (function getModelCommandClass(){
		
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
		* @param {string []} args An array of arguments to populate the command
		* @return {Object}
		*/

		/**
		* This method will send the created JSON Object to the proxy
		* @method sendToServer
		* @param {Object} JSONObj The JSON object to send to the server
		* @return {null}
		*/

		code.forceClassInherit(getModelCommand, commandTemplate);
		function getModelCommand(newIndex){
			commandTemplate.call(this, "/game/model", newIndex);
		}
		
		getModelCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			this.sendToServer(JSONObj);
		};

		getModelCommand.prototype.createArgs = function(args){
			// TODO: create object
			//var JSONObj = commandTemplate.prototype.createArgs();
		};

		getModelCommand.prototype.sendToServer = function(){
			commandTemplate.prototype.sendToServer("GET", this.type, JSONObj);
		};

		return getModelCommand;
	}());
	
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
		
		code.forceClassInherit(sendChatCommand, commandTemplate);
		function sendChatCommandClass(newIndex){
			commandTemplate.call(this, "/moves/sendChat", newIndex);
			this.content = "";
		}

		sendChatCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			this.sendToServer(JSONObj);
		};

		sendChatCommand.prototype.createArgs = function(args){
			var JSONObj = commandTemplate.prototype.createArgs();
			JSONObj.content = args[0];
			return JSONObj;
		};

		sendChatCommand.prototype.sendToServer = function(JSONObj){
			commandTemplate.prototype.sendToServer("POST", this.type, JSONObj);
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

		code.forceClassInherit(rollNumberCommand, commandTemplate);
		function rollNumberCommandClass(newIndex){
			commandTemplate.call(this, "/moves/rollNumber", newIndex);
			this.number = -1;
		}

		rollNumberCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			this.sendToServer(JSONObj);
		};

		rollNumberCommand.prototype.createArgs = function(args){
			var JSONObj = commandTemplate.prototype.createArgs();
			JSONObj.number = args[0];
			return JSONObj;
		};

		rollNumberCommand.prototype.sendToServer = function(JSONObj){
			commandTemplate.prototype.sendToServer("POST", this.type, JSONObj);
		};
		
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

		code.forceClassInherit(robPlayerCommand, commandTemplate);
		function robPlayerCommandClass(){
			commandTemplate.call(this, "/moves/robPlayer", newIndex);
			this.victimIndex = -1;
			this.robberSpot = new HexLocation();
		}
		
		robPlayerCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			this.sendToServer(JSONObj);
		};

		robPlayerCommand.prototype.createArgs = function(args){
			var JSONObj = commandTemplate.prototype.createArgs();
			JSONObj.victimIndex = args[0];
			JSONObj.robberSpot = args[1];
			return JSONObj;
		};

		robPlayerCommand.prototype.sendToServer = function(JSONObj){
			commandTemplate.prototype.sendToServer("POST", this.type, JSONObj);
		};
		
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

		code.forceClassInherit(finishTurnCommand, commandTemplate);
		function finishTurnCommandClass(){
			commandTemplate.call(this, "/moves/finishTurn", newIndex);
		}
		
		finishTurnCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			this.sendToServer(JSONObj);
		};

		finishTurnCommand.prototype.createArgs = function(args){
			var JSONObj = commandTemplate.prototype.createArgs();
			return JSONObj;
		};

		finishTurnCommand.prototype.sendToServer = function(JSONObj){
			commandTemplate.prototype.sendToServer("POST", this.type, JSONObj);
		};
		
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

		code.forceClassInherit(buyDevCardCommand, commandTemplate);
		function buyDevCardCommandClass(){
			commandTemplate.call(this, "/moves/buyDevCard", newIndex);
		}
		
		buyDevCardCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			this.sendToServer(JSONObj);
		};

		buyDevCardCommand.prototype.createArgs = function(args){
			var JSONObj = commandTemplate.prototype.createArgs();
			return JSONObj;
		};

		buyDevCardCommand.prototype.sendToServer = function(JSONObj){
			commandTemplate.prototype.sendToServer("POST", this.type, JSONObj);
		};
		
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

		code.forceClassInherit(yearOfPlentyCommand, commandTemplate);
		function yearOfPlentyCommandClass(){
			commandTemplate.call(this, "/moves/Year_of_Plenty", newIndex);
			this.resource1 = "";
			this.resource2 = "";
		}
		
		yearOfPlentyCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			this.sendToServer(JSONObj);
		};

		yearOfPlentyCommand.prototype.createArgs = function(args){
			var JSONObj = commandTemplate.prototype.createArgs();
			JSONObj.resource1 = args[0];
			JSONObj.resource2 = args[1];
			return JSONObj;
		};

		yearOfPlentyCommand.prototype.sendToServer = function(JSONObj){
			commandTemplate.prototype.sendToServer("POST", this.type, JSONObj);
		};
		
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

		code.forceClassInherit(roadBuildingCommand, commandTemplate);
		function roadBuildingCommandClass(){
			commandTemplate.call(this, "/moves/Road_Building", newIndex);
			this.spot1 = new EdgeLocation();
			this.spot2 = new EdgeLocation();
		}
		
		roadBuildingCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			this.sendToServer(JSONObj);
		};

		roadBuildingCommand.prototype.createArgs = function(args){
			var JSONObj = commandTemplate.prototype.createArgs();
			JSONObj.spot1 = args[0];
			JSONObj.spot2 = args[1];
			return JSONObj;
		};

		roadBuildingCommand.prototype.sendToServer = function(JSONObj){
			commandTemplate.prototype.sendToServer("POST", this.type, JSONObj);
		};
		
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

		code.forceClassInherit(soldierCommand, commandTemplate);
		function soldierCommandClass(){
			commandTemplate.call(this, "/moves/Soldier", newIndex);
			this.victimIndex = -1;
			this.robberSpot = new HexLocation();
		}
		
		soldierCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			this.sendToServer(JSONObj);
		};

		soldierCommand.prototype.createArgs = function(args){
			var JSONObj = commandTemplate.prototype.createArgs();
			JSONObj.victimIndex = args[0];
			JSONObj.robberSpot = args[1];
			return JSONObj;
		};

		soldierCommand.prototype.sendToServer = function(JSONObj){
			commandTemplate.prototype.sendToServer("POST", this.type, JSONObj);
		};
		
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

		code.forceClassInherit(monopolyCommand, commandTemplate);		
		function monopolyCommandClass(){
			commandTemplate.call(this, "/moves/Monopoly", newIndex);
			this.resource = "";
		}
		
		monopolyCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			this.sendToServer(JSONObj);
		};

		monopolyCommand.prototype.createArgs = function(args){
			var JSONObj = commandTemplate.prototype.createArgs();
			JSONObj.resource = args[0];
			return JSONObj;
		};

		monopolyCommand.prototype.sendToServer = function(JSONObj){
			commandTemplate.prototype.sendToServer("POST", this.type, JSONObj);
		};
		
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

		code.forceClassInherit(monumentCommand, commandTemplate);	
		function monumentCommandClass(){
			commandTemplate.call(this, "/moves/Monument", newIndex);
		}
		
		monumentCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			this.sendToServer(JSONObj);
		};

		monumentCommand.prototype.createArgs = function(args){
			var JSONObj = commandTemplate.prototype.createArgs();
			return JSONObj;
		};

		monumentCommand.prototype.sendToServer = function(JSONObj){
			commandTemplate.prototype.sendToServer("POST", this.type, JSONObj);
		};
		
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

		code.forceClassInherit(buildRoadCommand, commandTemplate);
		function buildRoadCommandClass(){
			commandTemplate.call(this, "/moves/buildRoad", newIndex);
			this.roadLocation = new EdgeLocation();
			this.free = false;
		}
		
		buildRoadCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			this.sendToServer(JSONObj);
		};

		buildRoadCommand.prototype.createArgs = function(args){
			var JSONObj = commandTemplate.prototype.createArgs();
			this.roadLocation = args[0];
			this.free = args[1];
			return JSONObj;
		};

		buildRoadCommand.prototype.sendToServer = function(JSONObj){
			commandTemplate.prototype.sendToServer("POST", this.type, JSONObj);
		};
		
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

		code.forceClassInherit(buildSettlementCommand, commandTemplate);
		function buildSettlementCommandClass(){
			commandTemplate.call(this, "/moves/buildSettlement", newIndex);
			this.vertexLocation = new VertexLocation();
			this.free = false;
		}
		
		buildSettlementCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			this.sendToServer(JSONObj);
		};

		buildSettlementCommand.prototype.createArgs = function(args){
			var JSONObj = commandTemplate.prototype.createArgs();
			this.vertexLocation = args[0];
			this.free = args[1];
			return JSONObj;
		};

		buildSettlementCommand.prototype.sendToServer = function(JSONObj){
			commandTemplate.prototype.sendToServer("POST", this.type, JSONObj);
		};
		
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

		code.forceClassInherit(buildCityCommand, commandTemplate);
		function buildCityCommandClass(){
			commandTemplate.call(this, "/moves/buildCity", newIndex);
			this.vertexLocation = new VertexLocation();
			this.free = false;
		}
		
		buildCityCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			this.sendToServer(JSONObj);
		};

		buildCityCommand.prototype.createArgs = function(args){
			var JSONObj = commandTemplate.prototype.createArgs();
			this.vertexLocation = args[0];
			this.free = args[1];
			return JSONObj;
		};

		buildCityCommand.prototype.sendToServer = function(JSONObj){
			commandTemplate.prototype.sendToServer("POST", this.type, JSONObj);
		};
		
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

		code.forceClassInherit(offerTradeCommand, commandTemplate);
		function offerTradeCommandClass(){
			commandTemplate.call(this, "/moves/offerTrade", newIndex);
			this.offer = new ResourceList(); // THIS MIGHT NOT BE THE RIGHT OBJECT!!!
			this.receiver = -1;
		}
		
		offerTradeCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			this.sendToServer(JSONObj);
		};

		offerTradeCommand.prototype.createArgs = function(args){
			var JSONObj = commandTemplate.prototype.createArgs();
			this.offer = args[0];
			this.receiver = args[1];
			return JSONObj;
		};

		offerTradeCommand.prototype.sendToServer = function(JSONObj){
			commandTemplate.prototype.sendToServer("POST", this.type, JSONObj);
		};
		
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

		code.forceClassInherit(acceptTradeCommand, commandTemplate);
		function acceptTradeCommandClass(){
			commandTemplate.call(this, "/moves/acceptTrade", newIndex);
			this.willAccept = false;
		}
		
		acceptTradeCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			this.sendToServer(JSONObj);
		};

		acceptTradeCommand.prototype.createArgs = function(args){
			var JSONObj = commandTemplate.prototype.createArgs();
			this.willAccept = args[0];
			return JSONObj;
		};

		acceptTradeCommand.prototype.sendToServer = function(JSONObj){
			commandTemplate.prototype.sendToServer("POST", this.type, JSONObj);
		};
		
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

		code.forceClassInherit(maritimeTradeCommand, commandTemplate);
		function maritimeTradeCommandClass(){
			commandTemplate.call(this, "/moves/offerTrade", newIndex);
			this.ratio = -1;
			this.inputResource = "";
			this.outputResource = "";
		}
		
		maritimeTradeCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			this.sendToServer(JSONObj);
		};

		maritimeTradeCommand.prototype.createArgs = function(args){
			var JSONObj = commandTemplate.prototype.createArgs();
			this.ratio = args[0];
			this.inputResource = args[1];
			this.outputResource = args[2];
			return JSONObj;
		};

		maritimeTradeCommand.prototype.sendToServer = function(JSONObj){
			commandTemplate.prototype.sendToServer("POST", this.type, JSONObj);
		};
		
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

		code.forceClassInherit(discardCardsCommand, commandTemplate);
		function discardCardsCommandClass(){
			commandTemplate.call(this, "/moves/discardCards", newIndex);
			this.discardedCards = new ResourceList();
		}
		
		discardCardsCommand.prototype.sendToProxy = function(args){
			var JSONObj = this.createArgs(args);
			this.sendToServer(JSONObj);
		};

		discardCardsCommand.prototype.createArgs = function(args){
			var JSONObj = commandTemplate.prototype.createArgs();
			this.discardedCards = args[0];
			return JSONObj;
		};

		discardCardsCommand.prototype.sendToServer = function(JSONObj){
			commandTemplate.prototype.sendToServer("POST", this.type, JSONObj);
		};
		
		return discardCardsCommand;
	}());

	return{
		commandTemplate: commandTemplate,
		getModelCommand: getModelCommand,
		sendChatCommand: sendChatCommand,
		rollNumberCommand: rollNumberCommand,
		robPlayerCommand: robPlayerCommand,
		finishTurnCommand: finishTurnCommand,
		buyDevCardCommand: buyDevCardCommand,
		yearOfPlentyCommand: yearOfPlentyCommand,
		roadBuildingCommand: roadBuildingCommand,
		soldierCommand: soldierCommand,
		monopolyCommand: monopolyCommand,
		monumentCommand: monumentCommand,
		buildRoadCommand: buildRoadCommand,
		buildSettlementCommand: buildSettlementCommand,
		buildCityCommand: buildCityCommand,
		offerTradeCommand: offerTradeCommand,
		acceptTradeCommand: acceptTradeCommand,
		maritimeTradeCommand: maritimeTradeCommand,
		discardCardsCommand: discardCardsCommand
	}
}());

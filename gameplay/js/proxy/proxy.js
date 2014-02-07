var catan = catan || {};
catan.proxy = catan.proxy || {};

/**
* Proxy Module
*
* @module catan.proxy.proxy
*/

catan.proxy.proxy = (function proxyNameSpace(){
	var theProxy = (function theProxyClass(){
		
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
		* The type of command (either a GET or a POST) // differentiate JSON and FORM??
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
		* This method will create the JSON Object that will be send to the proxy
		* @method createArgs
		* @param {string []} // IS THIS RIGHT?
		* @return {Object}
		*/

		/**
		* This method will send the created JSON Object to the proxy
		* @method sendToServer
		* @param {string []}
		* @return {null}
		*/

		function theProxy(newType, newIndex){
			this.type = newType;
			this.playerIndex = newIndex;
			this.JSONObject = new Object();
		}

		theProxy.prototype.sendToServer = function(type, cmdURL, JSONObj){
			// TODO: Do something
			if(type == "POST"){
				jQuery.post(cmdURL, jQuery(JSONObj).prop("value"), displaySuccessfulCmd, "JSON").fail(failHandler);
			}
			else{ // assume its a get model
				jQuery.get("/game/model", null, generatePlayerImpersonator, "json").fail(failHandler);
			}
		};

		return theProxy;
	}());
}

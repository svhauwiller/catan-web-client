var catan = catan || {};
catan.proxy = catan.proxy || {};

/**
* Proxy Module
*
* @module catan.proxy.proxy
*/

catan.proxy.proxy = (function proxyNameSpace(){
	var Proxy = (function theProxyClass(){
		
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
		* This method will send the created JSON Object to the proxy
		* @method sendToServer
		* @param {string []}
		* @return {null}
		*/

		function Proxy(newType, newIndex){
			this.type = newType;
			this.playerIndex = newIndex;
			this.JSONObject = new Object();
		}
		
		Proxy.prototype.getModelFromServer = function (returnData) {
			jQuery.get("/game/model", null, function(returnData){
					return returnData;
				}, "json").fail(failHandler);
		}

		Proxy.prototype.sendToServer = function(type, cmdURL, JSONObj){
			if(type == "POST"){
				jQuery.post(cmdURL, jQuery(JSONObj).prop("value"), runCommand, "JSON").fail(failHandler);
			}
			else{ // assume its a get model
				jQuery.get("/game/model", null, updateGameModel, "json").fail(failHandler);
			}
		};
		
		Proxy.prototype.runCommand = function (returnData) {
			console.log("Run Command Run!!!");
		}
		
		Proxy.prototype.updateGameModel = function (returnData) {
			console.log("Update Model!!! Taaadaaaa!!!");
		}
		
		Proxy.prototype.failHandler = function (jqXHR, textStatus, errorThrown) {
			console.log("AJAX request failed: " + errorThrown);
		}

		return theProxy;
	}());
}

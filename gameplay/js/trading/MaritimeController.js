/**
    This is the namespace for maritime trading
    @module catan.trade
    @submodule catan.trade.maritime
    @namespace maritime
*/

var catan = catan || {};
catan.trade = catan.trade || {};
catan.trade.maritime = catan.trade.maritime || {};

catan.trade.maritime.Controller = (function trade_namespace(){
    
	var Definitions = catan.definitions;
	var ResourceTypes = Definitions.ResourceTypes;
    
	var MaritimeController = ( function MaritimeController_Class() {

        var Controller = catan.core.BaseController;
        
        /**
		@class MaritimeController
		@constructor 
		@extends misc.BaseController
		@param {maritime.View} view
		@param {models.ClientModel} clientModel
		*/
		function MaritimeController(view,clientModel){
			Controller.call(this,view,clientModel);
		};
        
		MaritimeController.prototype = core.inherit(Controller.prototype);

		MaritimeController.prototype.updateFromModel = function() {
			console.log("Update Maritime");
			var clientModel = this.getClientModel();
			var portArray = clientModel.map.ports;
			var ownedPorts = new Array();
			var counter = 0;
		/*	
			for (var hexPlace in portArray){
				var tempHex = clientModel.map.hexGrid.getHex(hexPlace.x, hexPlace.y);
				if(tempHex.getVertex(tempHex.validVertex1).getOwner()===clientModel.playerID ||
				tempHex.getVertex(tempHex.validVertex2).getOwner()===clientModel.playerID){
					ownedPorts[counter] = tempHex.
				}
			}
		*/
			/*clientModel.map.ports [0-8]
			location->has x, y
			validVertex1-> direction
			validVertex2*/
		};

		/**
         * Called by the view when the player "undoes" their give selection
		 * @method unsetGiveValue
		 * @return void
		 */
		MaritimeController.prototype.unsetGiveValue = function(){
			this.getView().hideGetOptions();
			this.getView().showGiveOptions();
			this.getView().enableTradeButton(false);
		};
        
		/**
         * Called by the view when the player "undoes" their get selection
		 * @method unsetGetValue
		 * @return void
		 */
		MaritimeController.prototype.unsetGetValue = function(){
		};
        
		/**
         * Called by the view when the player selects which resource to give
		 * @method setGiveValue
		 * @param{String} resource The resource to trade ("wood","brick","sheep","wheat","ore")
		 * @return void
		 */
		MaritimeController.prototype.setGiveValue = function(resource){
		};
        
		/**
         * Called by the view when the player selects which resource to get
		 * @method setGetValue
		 * @param{String} resource The resource to trade ("wood","brick","sheep","wheat","ore")
		 * @return void
		 */
		MaritimeController.prototype.setGetValue = function(resource){
		};
        
        function capFirst(str){
            return str[0].toUpperCase() + str.slice(1);
        }
        
		/** Called by the view when the player makes the trade
		 * @method makeTrade
		 * @return void
		 */
		MaritimeController.prototype.makeTrade= function(){
		}
		
       return MaritimeController;
	}());

	return MaritimeController;
}());



//STUDENT-EDITABLE-BEGIN
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
			this.currentPlayer = clientModel.players[clientModel.playerID];
			var portArray = new Array();
			this.bankResourceArray = new Array();
			var counter = 0;

			if(this.currentPlayer.woodValue < 4){
				portArray[counter] = "wood";
				counter++;
			}
			if(this.currentPlayer.oreValue < 4){
				portArray[counter] = "ore";
				counter++;
			}
			if(this.currentPlayer.sheepValue < 4){
				portArray[counter] = "sheep";			
				counter++;	
			}
			if(this.currentPlayer.wheatValue < 4){
				portArray[counter] = "wheat";	
				counter++;			
			}
			if(this.currentPlayer.brickValue < 4){
				portArray[counter] = "brick";			
				counter++;	
			}
			counter=0;
			if(clientModel.bank.resourceList.wood > 0){
				this.bankResourceArray[counter]="wood";
				counter++;
			}
			if(clientModel.bank.resourceList.ore > 0){
				this.bankResourceArray[counter]="ore";
				counter++;
			}
			if(clientModel.bank.resourceList.sheep > 0){
				this.bankResourceArray[counter]="sheep";				
				counter++;
			}
			if(clientModel.bank.resourceList.wheat > 0){
				this.bankResourceArray[counter]="wheat";				
				counter++;
			}
			if(clientModel.bank.resourceList.brick > 0){
				this.bankResourceArray[counter]="brick";				
				counter++;
			}
		
			this.getView().showGiveOptions(portArray);
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
			this.getView().selectGiveOption(resource, currentPlayer.resource);
			this.getView().hideGiveOptions();
			this.getView().showGetOptions(this.bankResourceArray);
		};
        
		/**
         * Called by the view when the player selects which resource to get
		 * @method setGetValue
		 * @param{String} resource The resource to trade ("wood","brick","sheep","wheat","ore")
		 * @return void
		 */
		MaritimeController.prototype.setGetValue = function(resource){
			this.getView.selectGetOption(resource, 1);
			this.getView().enableTradeButton(true);
		};
        
        function capFirst(str){
            return str[0].toUpperCase() + str.slice(1);
        }
        
		/** Called by the view when the player makes the trade
		 * @method makeTrade
		 * @return void
		 */
		MaritimeController.prototype.makeTrade= function(){
			
			/*
				increase the bank by the amount
				decrease the player's hand by the amount			
			*/
		}
		
       return MaritimeController;
	}());

	return MaritimeController;
}());



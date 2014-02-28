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
			this.updateController = true;
			this.playerResource;
			this.playerAmount;
			this.bankResource;
		};
        
		MaritimeController.prototype = core.inherit(Controller.prototype);

		MaritimeController.prototype.updateFromModel = function() {
						
			if(this.updateController === true)
			{
			console.log("Update Maritime");
			this.clientModel = this.getClientModel();
			this.portArray = this.clientModel.map.ports;
			this.currentPlayer = this.clientModel.players[this.clientModel.playerID];
			var portArray = new Array();
			this.bankResourceArray = new Array();
			var counter = 0;

			if(this.currentPlayer.woodValue < 4 && this.currentPlayer.woodValue <= this.currentPlayer.resources.wood){
				this.portArray[counter] = "wood";
				counter++;
			}
			if(this.currentPlayer.oreValue < 4 && this.currentPlayer.oreValue <= this.currentPlayer.resources.ore){
				this.portArray[counter] = "ore";
				counter++;
			}
			if(this.currentPlayer.sheepValue < 4 && this.currentPlayer.sheepValue <= this.currentPlayer.resources.sheep){
				this.portArray[counter] = "sheep";			
				counter++;	
			}
			if(this.currentPlayer.wheatValue < 4 && this.currentPlayer.wheatValue <= this.currentPlayer.resources.wheat){
				this.portArray[counter] = "wheat";	
				counter++;			
			}
			if(this.currentPlayer.brickValue < 4 && this.currentPlayer.brickValue <= this.currentPlayer.resources.brick){
				this.portArray[counter] = "brick";			
				counter++;	
			}
		
			if(counter === 0){
				this.getView().setMessage("You lack the needed resources");
				this.getView().hideGetOptions();
				this.getView().hideGiveOptions();
				this.getView().enableTradeButton(false);
			}
			else{
				counter=0;
				if(this.clientModel.bank.resourceList.wood > 0){
					this.bankResourceArray[counter]="wood";
					counter++;
				}
				if(this.clientModel.bank.resourceList.ore > 0){
					this.bankResourceArray[counter]="ore";
					counter++;
				}
				if(this.clientModel.bank.resourceList.sheep > 0){
					this.bankResourceArray[counter]="sheep";				
					counter++;
				}
				if(this.clientModel.bank.resourceList.wheat > 0){
					this.bankResourceArray[counter]="wheat";				
					counter++;
				}
				if(this.clientModel.bank.resourceList.brick > 0){
					this.bankResourceArray[counter]="brick";				
					counter++;
				}
		
				this.getView().showGiveOptions(this.portArray);
				this.getView().hideGetOptions();
				this.getView().setMessage("Please Select Resource to Give");
			/*clientModel.map.ports [0-8]
			location->has x, y
			validVertex1-> direction
			validVertex2*/
			}
			}
		};

		/**
         * Called by the view when the player "undoes" their give selection
		 * @method unsetGiveValue
		 * @return void
		 */
		MaritimeController.prototype.unsetGiveValue = function(){
			this.getView().hideGetOptions();
			this.getView().showGiveOptions(this.portArray);
			this.updateController = true;
			this.getView().enableTradeButton(false);
			this.getView().setMessage("Please Select Resource to Give");
		};
        
		/**
         * Called by the view when the player "undoes" their get selection
		 * @method unsetGetValue
		 * @return void
		 */
		MaritimeController.prototype.unsetGetValue = function(){
			this.getView().enableTradeButton(false);
			this.getView().showGetOptions(this.bankResourceArray);
			this.getView().setMessage("Please Select Resource to Receive");			
		};
        
		/**
         * Called by the view when the player selects which resource to give
		 * @method setGiveValue
		 * @param{String} resource The resource to trade ("wood","brick","sheep","wheat","ore")
		 * @return void
		 */
		MaritimeController.prototype.setGiveValue = function(resource){
			this.updateController = false;
			var tempValue = resource+"Value";

			this.getView().selectGiveOption(resource, this.currentPlayer[tempValue]);
			this.playerResource = resource;
			this.playerAmount = this.currentPlayer[tempValue];
			this.getView().showGetOptions(this.bankResourceArray);
			this.getView().setMessage("Please Select Resource to Receive");				
		};
        
		/**
         * Called by the view when the player selects which resource to get
		 * @method setGetValue
		 * @param{String} resource The resource to trade ("wood","brick","sheep","wheat","ore")
		 * @return void
		 */
		MaritimeController.prototype.setGetValue = function(resource){
			this.getView().selectGetOption(resource, 1);
			this.bankResource = resource;
			this.getView().enableTradeButton(true);
			this.getView().setMessage("Trade!");
		};
        
        function capFirst(str){
            return str[0].toUpperCase() + str.slice(1);
        }
        
		/** Called by the view when the player makes the trade
		 * @method makeTrade
		 * @return void
		 */
		MaritimeController.prototype.makeTrade= function(){
			this.clientModel.bank.resourceList[this.bankResource]-=1;
			this.clientModel.bank.resourceList[this.playerResource]+= this.playerAmount;
			/*
			console.log("************************************");
			console.log(this.currentPlayer.resources[this.playerResource]);
			console.log(this.playerAmount);
			*/
			this.currentPlayer.resources[this.playerResource]-= this.playerAmount;
			this.currentPlayer.resources[this.bankResource]+=1;
			/*
			console.log("Player resource amount of "+this.playerResource+": "+this.currentPlayer.resources[this.playerResource]);
			console.log("Player resource amount of "+this.bankResource+": "+this.currentPlayer.resources[this.bankResource]);
			console.log("***********************************");
			*/			
			this.updateController = true;
			
		}
		
       return MaritimeController;
	}());

	return MaritimeController;
}());



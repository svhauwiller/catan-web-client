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
			console.log("Update Maritime");
			this.clientModel = this.getClientModel();
			this.currentPlayer = this.clientModel.players[this.clientModel.playerID];
			this.portArray = new Array();
			this.bankResourceArray = new Array();
			this.resourceTypes = new Array();
			var counter = 0;
			
			if(this.updateController === true){
			this.resourceTypes = ["wood","ore","sheep","wheat","brick"];
			
			for(var currentResource in this.resourceTypes)
			{
				var resource = this.resourceTypes[currentResource];
				var valueHolder = resource+"Value";

				if(this.currentPlayer[valueHolder] <= this.currentPlayer.resources[resource])
				{
					this.portArray[counter] = resource;
					counter++;
				}
			}
				
			this.myNumber = this.getClientModel().players[this.getClientModel().playerID].orderNumber;
			this.currentTurnNumber = this.getClientModel().turnTracker.currentTurn;

			if(this.myNumber != this.currentTurnNumber){
				this.getView().setMessage("Currently not your turn");
				this.getView().hideGetOptions();
				this.getView().hideGiveOptions();
				this.getView().enableTradeButton(false);
			}
			else if(counter === 0){
				this.getView().setMessage("You lack the needed resources");
				this.getView().hideGetOptions();
				this.getView().hideGiveOptions();
				this.getView().enableTradeButton(false);
			}
			else{
				counter=0;
				for(var currentResource in this.resourceTypes)
				{
					var resource = this.resourceTypes[currentResource];
					if(this.clientModel.bank.resourceList[resource] > 0)
					{
						this.bankResourceArray[counter] = resource;
						counter++;	
					}
				}	
				this.getView().showGiveOptions(this.portArray);
				this.getView().hideGetOptions();
				this.getView().setMessage("Please Select Resource to Give");
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
			this.clientModel.tradeWithBank(this.currentPlayer[this.playerResource+"Value"], this.playerResource, this.bankResource);
			this.getView().enableTradeButton(false);
			this.updateController = true;
			this.updateFromModel();
			
		}
		
       return MaritimeController;
	}());

	return MaritimeController;
}());



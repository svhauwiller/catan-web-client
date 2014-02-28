//STUDENT-EDITABLE-BEGIN
/**
    This is the namespace for domestic trading
    @module catan.trade
    @submodule catan.trade.domestic
    @namespace domestic
*/

var catan = catan || {};
catan.trade = catan.trade ||{};
catan.trade.domestic = catan.trade.domestic ||{};

catan.trade.domestic.Controller= (function trade_namespace(){

	var Controller = catan.core.BaseController;
	var Definitions = catan.definitions;
	var ResourceTypes = Definitions.ResourceTypes;
    
	var DomesticController = ( function DomesticController_Class() {
    
		/** 
		@class DomesticController
		@constructor 
		@extends misc.BaseController
		@param {domestic.View} view
		@param {misc.WaitOverlay} waitingView
		@param {domestic.AcceptView} acceptView
		@param {models.ClientModel} clientModel
		*/
		function DomesticController(view,waitingView,acceptView,clientModel){
			Controller.call(this,view,clientModel);
			this.waitingView = waitingView;
			this.acceptView = acceptView;

			this.players = new Array();

			for (var player in clientModel.players) {
				
				var playerModified = {

					name : clientModel.players[player].name,
					color: clientModel.players[player].color,
					index: clientModel.players[player].orderNumber

				};

				if (clientModel.playerID !== clientModel.players[player].playerID){
					this.players.push(playerModified);
				}

				this.getView().setPlayers(this.players);	
			}



            this.messages = [
            	"Select a player...",
            	"Set the trade you want to make",
            	"Trade!",
            	"Not your turn sucker"
            ];

            this.tradePartner = -1;

            this.tradeResources = {
            	"wood"	: 0, 
            	"brick"	: 0,
            	"sheep"	: 0, 
            	"wheat"	: 0,
            	"ore"	: 0
            };

            this.tradeDirection = {
            	"wood"	: "none", 
            	"brick"	: "none",
            	"sheep"	: "none", 
            	"wheat"	: "none",
            	"ore"	: "none"
            };


		};
        
		DomesticController.prototype = core.inherit(Controller.prototype);

		DomesticController.prototype.updateFromModel = function() {
			console.log("Update Domestic");

			

			this.clientModel = this.getClientModel();

			this.getView().setStateMessage(this.messages[3]);


			this.playerResources = this.clientModel.players[this.clientModel.playerID].resources;

			this.currentTurnNumber = this.clientModel.turnTracker.currentTurn;
			this.myNumber = this.clientModel.players[this.clientModel.playerID].orderNumber;
			this.isMyTurn = (this.myNumber === this.currentTurnNumber);

			this.getView().setTradeButtonEnabled(false);

			this.getView().setResourceSelectionEnabled(false);

			this.getView().setPlayerSelectionEnabled(this.isMyTurn);

			if (this.isMyTurn){
				this.getView().setStateMessage(this.messages[0]);
			}



			//THIS IS THE CODE TO SET WHO IS TRADING AFTER A RELOAD - NOT DONE
			if (this.clientModel.tradeOffer.getReceiver === this.myNumber)
				this.acceptView.showModal();

			if (this.clientModel.tradeOffer.getSender === this.myNumber)
				this.waitingView.showModal();




		};
         
         
		/******** Methods called by the Domestic View *********/
        
        /**
         * @method setResourceToSend
         * @param{String} resource the resource to send ("wood","brick","sheep","wheat","ore")
         * @return void
         */
		DomesticController.prototype.setResourceToSend = function(resource){
			
			this.tradeDirection[resource] = "send";
			this.tradeResources[resource] = 0;
			this.getView().setResourceAmountChangeEnabled(resource, (this.tradeResources[resource] < this.playerResources[resource]), false); 
			this.getView().setResourceAmount(resource, this.tradeResources[resource]);

			this.canTrade();
			//alert("My name is Fezieck.");
		};
        
		/**
		 * @method setResourceToReceive
		 * @param{String} resource the resource to receive ("wood","brick","sheep","wheat","ore")
		 * @return void
		 */
		DomesticController.prototype.setResourceToReceive = function(resource){
			
			this.tradeDirection[resource] = "receive";
			this.tradeResources[resource] = 0;
			this.getView().setResourceAmountChangeEnabled(resource, true, false);
			this.getView().setResourceAmount(resource, this.tradeResources[resource]);

			this.canTrade();
		 	//alert("My name is setResourceToReceive!");
		};
        
		/**
		  * @method unsetResource
		  * @param{String} resource the resource to clear ("wood","brick","sheep","wheat","ore")
		  * @return void
		  */
		DomesticController.prototype.unsetResource = function(resource){

			this.tradeDirection[resource] = "none";
			this.tradeResources[resource] = 0;
			this.getView().setResourceAmountChangeEnabled(resource, false, false);
			this.getView().setStateMessage(this.messages[1]);

			this.canTrade();
			//alert("My name is Inigo Montoya.  You killed my father.  Prepare to die!");
		};
        
		/**
		 * @method setPlayerToTradeWith
		 * @param{int} playerNumber the player to trade with
		 * @return void
		 */
		DomesticController.prototype.setPlayerToTradeWith = function(playerNumber){
			this.tradePartner = playerNumber;

			if (this.tradePartner !== -1) {
				this.getView().setResourceSelectionEnabled(true);
			}

			this.canTrade();
			//alert("Monkey Brains!");
		};
        
		/**
		 * Increases the amount to send or receive of a resource
		 * @method increaseResourceAmount
		 * @param{String} resource ("wood","brick","sheep","wheat","ore")
		 * @return void
		 */
		DomesticController.prototype.increaseResourceAmount = function(resource){

			this.tradeResources[resource] += 1;

			if (this.tradeDirection[resource] === "send"){

				this.getView().setResourceAmountChangeEnabled(resource, (this.tradeResources[resource] < this.playerResources[resource]), true)

			}
			else{
				this.getView().setResourceAmountChangeEnabled(resource, true, true)
			}
			
			this.getView().setResourceAmount(resource, this.tradeResources[resource]);

			this.canTrade();
			//alert("My name is Earl.");
		};
        
		/**
		 * Decreases the amount to send or receive of a resource
		 * @method decreaseResourceAmount
		 * @param{String} resource ("wood","brick","sheep","wheat","ore")
		 * @return void
		 */
		DomesticController.prototype.decreaseResourceAmount = function(resource){
			if (this.tradeResources[resource] > 0) {
				this.tradeResources[resource] -= 1;
				this.getView().setResourceAmountChangeEnabled(resource, true, (this.tradeResources[resource] > 0)); 
				this.getView().setResourceAmount(resource, this.tradeResources[resource]);
			}

			this.canTrade();
			//alert("Carl! That kills people!!");
		};

		/**
		 * Decides if a player has set up a prper trade
		 * @method canTrade
		 * @return void
		 */
		DomesticController.prototype.canTrade = function(){

			if (this.tradePartner !== -1){

				var sending = false;
				var receiving = false;

				for(var resource in this.tradeDirection){
					if (this.tradeDirection[resource] === "send" && (this.tradeResources[resource] > 0))
						sending = true;
					if (this.tradeDirection[resource] === "receive" && (this.tradeResources[resource] > 0))
						receiving = true;
				}

				if(this.isMyTurn && sending && receiving){
					this.getView().setTradeButtonEnabled(true);
					this.getView().setStateMessage(this.messages[2]);
				}
				else {
					this.getView().setTradeButtonEnabled(false);
					this.getView().setStateMessage(this.messages[1]);
				}
			}
			else{
				console.log("button off");
				this.getView().setTradeButtonEnabled(false);
				this.getView().setStateMessage(this.messages[0]);
			}
		};
        
		/**
		  * Sends the trade offer to the accepting player
		  * @method sendTradeOffer
		  * @return void
		  */
		DomesticController.prototype.sendTradeOffer = function(){

			for(var resource in this.tradeResources){
				if (this.tradeDirection[resource] === "receive")
					this.tradeResources[resource] -= (2 * this.tradeResources[resource]);
			}

			console.log(this.tradePartner);
			console.log(this.tradeResources);
			this.clientModel.offerTrade(this.tradePartner, this.tradeResources)
			
			alert("My name is sendTradeOffer.");


			//NOT DONE HERE!!!!!!!
			// this.isWaiting = true;
			this.waitingView.showModal();
		};
        
        
		/******************* Methods called by the Accept Overlay *************/
		 
        /**
        * Finalizes the trade between players
        * @method acceptTrade
        * @param{Boolean} willAccept
        * @return void
		*/
		DomesticController.prototype.acceptTrade = function(willAccept){

			//NOT DONE
			this.clientModel()

			alert("My name is Monkey.");
		};
            
		return DomesticController;
    }());
			
	return DomesticController;
}());
var catan = catan || {};
catan.resources = catan.resources || {};

/**
    This is the namespace for resources
    @module catan.resources
    @namespace resources
*/
    
catan.resources.Controller = (function resources_namespace() {

	var Controller = catan.core.BaseController;
	var Definitions = catan.definitions;
	
	/*	these are the values to use for updating the view: */
    var ROAD = Definitions.ROAD;
    var SETTLEMENT = Definitions.SETTLEMENT;
    var CITY = Definitions.CITY;
    var BUY_CARD = Definitions.BUY_CARD;
    var PLAY_CARD = Definitions.PLAY_CARD;
    var ARMY = Definitions.ARMY;
    var Resources = Definitions.ResourceTypes;
    var Buyables = new Array(ROAD, SETTLEMENT, CITY, BUY_CARD, PLAY_CARD, ARMY);
		
	var ResourceBarController = (function ResourceBarController_Class(){
    
		/**
		 Controller class for the Resources View.
		 @class ResourceBarController
		 @constructor
		 @extends misc.BaseController
		 @param{resources.View} view The resource view
		 @param{models.ClientModel} clientModel The client model
		 @param{Object} actions The actions to take for each user input. The value of actions.elem_name is a function that is called when the specific element is selected (accessed by calling actions["elem_name"]).  The valid element names are defined in StudentDefinitions.js
        */
		function ResourceBarController(view,clientModel,actions){
			this.setActions(actions);
			Controller.call(this,view,clientModel);
		};

		core.forceClassInherit(ResourceBarController,Controller);
        
		ResourceBarController.prototype.constructor = ResourceBarController;
        
		core.defineProperty(ResourceBarController.prototype, "Actions");

		ResourceBarController.prototype.updateFromModel = function() {
			var clientModel = this.getClientModel();
			console.log("Update Resource Bar");
			//console.log(clientModel);
			var currentPlayerResources = clientModel.currentPlayerResources();
			//console.log(currentPlayerResources);
			this.getView().updateAmount("brick", currentPlayerResources["brick"]);
			this.getView().updateAmount("ore", currentPlayerResources["ore"]);
			this.getView().updateAmount("sheep", currentPlayerResources["sheep"]);
			this.getView().updateAmount("wheat", currentPlayerResources["wheat"]);
			this.getView().updateAmount("wood", currentPlayerResources["wood"]);
			
			var currentPlayer = clientModel.players[clientModel.playerID];
			this.getView().updateAmount("Roads", currentPlayer.roads);
			this.getView().updateAmount("Settlements", currentPlayer.settlements);
			this.getView().updateAmount("Cities", currentPlayer.cities);
			this.getView().updateAmount("Soldiers", currentPlayer.soldiers);
			
			//enable/disable buttons depending on the player's turn status			
			this.clientModel = this.getClientModel();
			this.myNumber = this.clientModel.players[this.clientModel.playerID].orderNumber
			this.currentTurnNumber = this.clientModel.turnTracker.currentTurn;
			if(this.myNumber === this.currentTurnNumber){
				this.getView().setActionEnabled("Roads",true);
				this.getView().setActionEnabled("Settlements",true);
				this.getView().setActionEnabled("Cities",true);
				this.getView().setActionEnabled("BuyCard",true);
				this.getView().setActionEnabled("DevCards",true);
			}
		else{
				this.getView().setActionEnabled("Roads",false);
				this.getView().setActionEnabled("Settlements",false);
				this.getView().setActionEnabled("Cities",false);
				this.getView().setActionEnabled("BuyCard",false);
				this.getView().setActionEnabled("DevCards",false)
		}
		};

		/**
		 * The action to take on clicking the resource bar road button. Brings up the map 
		 * overlay and allows you to place a road.
		 * 
		 * @method buildRoad
		 * @return void
		 */
		ResourceBarController.prototype.buildRoad = function(){
        
            // NOTE: YOU DON'T NEED TO CHANGE THIS METHOD

            // This calls the "startMove" method on the Map Controller.
			this.getActions()[ROAD]();
		}
        
		/**
		 * The action to take on clicking the resource bar settlement button. Brings up the map 
		 * overlay and allows you to place a settlement.
		 * 
		 * @method buildSettlement
		 * @return void
		 */
		ResourceBarController.prototype.buildSettlement = function(){
        
            // NOTE: YOU DON'T NEED TO CHANGE THIS METHOD

            // This calls the "startMove" method on the Map Controller.
			this.getActions()[SETTLEMENT]();
		}

		/**
		 * The action to take on clicking the resource bar city button. Brings up the map 
		 * overlay and allows you to place a city.
		 * 
		 * @method buildCity
		 * @return void
		 */
		ResourceBarController.prototype.buildCity = function(){
        
            // NOTE: YOU DON'T NEED TO CHANGE THIS METHOD

            // This calls the "startMove" method on the Map Controller.
			this.getActions()[CITY]();
		}
        
		/**
		 * The action to take on clicking the resource bar "buy a card" button. 
		 * Should bring up the "buy a card" overlay.
		 * 
		 * @method buyCard
		 * @return void
		 */
		ResourceBarController.prototype.buyCard = function(){
        
            // NOTE: YOU DON'T NEED TO CHANGE THIS METHOD

            // This calls the "showModal" method on the Buy Card View.
			this.getActions()[BUY_CARD]();
		}
        
		/**
		 * The action to take on clicking the resource bar "play a card" button. 
		 * Should bring up the "play a card" overlay.
		 * 
		 * @method playCard
		 * @return void
		 */
		ResourceBarController.prototype.playCard = function(){
        
            // NOTE: YOU DON'T NEED TO CHANGE THIS METHOD

            // This calls the "showModal" method on the Dev Card View.
			this.getActions()[PLAY_CARD]();
		}
		
		return ResourceBarController;
		
	}());
	
	return ResourceBarController;
}());


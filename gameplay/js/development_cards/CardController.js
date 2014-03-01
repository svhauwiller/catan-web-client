//STUDENT-EDITABLE-BEGIN
/**
    This is the namespace for development cards
    @module catan.devCards
    @namespace devCards
*/

var catan = catan || {};
catan.devCards = catan.devCards || {};

catan.devCards.Controller = (function(){

	var Controller = catan.core.BaseController;
	var Definitions = catan.definitions;
	
	var DevCardController = (function card_namespace(){
		
		core.forceClassInherit(DevCardController,Controller);

		core.defineProperty(DevCardController.prototype, "BuyView");

		/**
		 * @class DevCardController
		 * @constructor
		 * @extends misc.BaseController
		 * @param {devCards.DevCardView} view
		 * @param {devCards.BuyCardView} buyView
		 * @param {models.ClientModel} clientModel
		 * @param {function} soldierAction
		 * @param {function} roadAction
		 */
		function DevCardController(view, buyView, clientModel, soldierAction, roadAction){
			Controller.call(this,view,clientModel);
			this.setBuyView(buyView);
			this.view = view;
			this.soldierAction = soldierAction;
			this.roadAction = roadAction;
			this.clientModel = clientModel;	
		}

		DevCardController.prototype.updateFromModel = function() {
			console.log("Update Dev Card");
			this.clientModel = this.getClientModel();
			this.init();
		};

		DevCardController.prototype.init = function () {
			var player = this.clientModel.players[this.clientModel.playerID];
			var oldCards = player.oldDevCards;
			var newCards = player.newDevCards;
			var devTypes = catan.definitions.CardTypes;

			for (type in devTypes){
				this.view.setCardEnabled(devTypes[type], (oldCards[devTypes[type]] > 0));
				this.view.updateAmount(devTypes[type], (oldCards[devTypes[type]] + newCards[devTypes[type]]));
			}
			
		}
		
		/**
		 * Called when the player buys a development card
		 * @method buyCard
		 * @return void
		 */
		DevCardController.prototype.buyCard = function(){
			this.clientModel.buyDevCard();
		}
        
		/**
		 * Called when the player plays a year of plenty card
		 * @method useYearOfPlenty
		 * @param {String} resource1 The first resource to obtain
		 * @param {String} resource2 The second resource to obtain
		 * @return void
		 */
		DevCardController.prototype.useYearOfPlenty = function(resource1, resource2){
			param = new Object();
			param.resource1 = resource1;
			param.resource2 = resource2;
			this.clientModel.useDevCard("yearOfPlenty" , param);
			this.view.clearView();
		}
        
		/**
		 * Called when the player plays a monopoly card
		 * @method useMonopoly
		 * @param {String} resource the resource to obtain
		 * @return void
		 */
		DevCardController.prototype.useMonopoly= function(resource){
			param = new Object();
			param.resource = resource;
			this.clientModel.useDevCard("monopoly", param);
		}
        
		/**
		 * Called when the player plays a monument card
		 * @method useMonument
		 * @return void
		 */
		DevCardController.prototype.useMonument = function(){
			this.clientModel.useDevCard("monument");
		}
        
		/**
		 * Called when the player plays a soldier card
		 * @method useSoldier
		 * @return void
		 */
		DevCardController.prototype.useSoldier= function(){
			console.log("SOLDIER GET");
			this.soldierAction();
		}
        
		/**
		 * Called when the player plays the road building card
		 * @method useRoadBuild
		 * @return void
		 */
		DevCardController.prototype.useRoadBuild = function(resource){
			this.roadAction();
		}

		return DevCardController;
	}());
	
	return DevCardController;
}());


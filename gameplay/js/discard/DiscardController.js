/**
    This is the namespace for discarding cards
    @module catan.discard
    @namespace discard
*/

var catan = catan || {};
catan.discard = catan.discard || {};

catan.discard.Controller = (function discard_namespace(){

	var Controller = catan.core.BaseController;
    
	var Definitions = catan.definitions;
	var ResourceTypes = catan.definitions.ResourceTypes;
	
    /**
     * @class DiscardController
     * @constructor
     * @extends misc.BaseController
     * @param{discard.DiscardView} view
     * @param{misc.WaitOverlay} waitingView
     * @param{models.ClientModel} clientModel
     */
	var DiscardController = (function DiscardController_Class(){
			
		function DiscardController(view, waitingView, clientModel){
        
            Controller.call(this,view,clientModel);
			
            view.setController(this);
            
            waitingView.setController(this);
            this.setWaitingView(waitingView);
		}

		core.forceClassInherit(DiscardController,Controller);

		core.defineProperty(DiscardController.prototype,"waitingView");

		DiscardController.prototype.updateFromModel = function() {
			console.log("Update Discard");
			var clientModel = this.getClientModel();
			var currentPlayerResources = clientModel.currentPlayerResources();
			this.getView().setResourceMaxAmount("wood",currentPlayerResources["wood"]);
			this.getView().setResourceMaxAmount("brick",currentPlayerResources["brick"]);
			this.getView().setResourceMaxAmount("sheep",currentPlayerResources["sheep"]);
			this.getView().setResourceMaxAmount("wheat",currentPlayerResources["wheat"]);
			this.getView().setResourceMaxAmount("ore",currentPlayerResources["ore"]);
			
		};

		/**
		 Called by the view when the player clicks the discard button.
         It should send the discard command and allow the game to continue.
		 @method discard
		 @return void
		 */	
		DiscardController.prototype.discard = function(){
		}
        
		/**
		 Called by the view when the player increases the amount to discard for a single resource.
		 @method increaseAmount
		 @param {String} resource the resource to discard
		 @return void
		 */
		DiscardController.prototype.increaseAmount = function(resource){
			
			var clientModel = this.getClientModel();
			var currentPlayerResources = clientModel.currentPlayerResources();
			
			if(/*the number of cards queued is === maxAmount for that resource*/){
				this.getView().setResourceAmountChangeEnabled(resource, false, true);
			}

			this.getView().setResourceAmount(resource, /*current discard amount + 1*/);
			
			//I'm not sure if this need to be calculated each time, but that's how I have it set currently
			this.totalResources = this.currentPlayerResources["brick"];
			this.totalResources += this.currentPlayerResources["ore"];
			this.totalResources += this.currentPlayerResources["sheep"];
			this.totalResources += this.currentPlayerResources["wheat"];
			this.totalResources += this.currentPlayerResources["wood"];
			this.totalResources = (this.totalResources/2);
			this.getView().setStateMessage(/*sum of all the selected resources*/+"/"+totalResources);
			
			if(/*sum of all the selected resources === totalResources*/){
				this.getView().setDiscardButtonEnabled(true);
				}
		}
        
		/**
		 Called by the view when the player decreases the amount to discard for a single resource.
		 @method decreaseAmount
		 @param {String} resource the resource to discard
		 @return void
		 */
		DiscardController.prototype.decreaseAmount = function(resource){

			this.getView().setDiscardButtonEnabled(false);
			this.getView().setResourceAmount(resource, /*current discard amount -1*/);

			if(/*the number of cards still queued is > 0*/){
				this.getView().setResourceAmountChangeEnabled(resource, true, true);
			}
			else{
				this.getView().setResourceAmountChangeEnabled(resource, true, false);
			}
			
			var clientModel = this.getClientModel();
			var currentPlayerResources = this.clientModel.currentPlayerResources();
			
			//I'm not sure if this need to be calculated each time, but that's how I have it set currently
			this.totalResources = this.currentPlayerResources["brick"];
			this.totalResources += this.currentPlayerResources["ore"];
			this.totalResources += this.currentPlayerResources["sheep"];
			this.totalResources += this.currentPlayerResources["wheat"];
			this.totalResources += this.currentPlayerResources["wood"];
			this.totalResources = (this.totalResources/2);
			this.getView().setStateMessage(+"/"+totalResources);
		}
		
		return DiscardController;
	}());
	
    return DiscardController;
}());


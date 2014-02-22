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
		//TODO: Set this condition to only happen when the player needs to discard
			if(true){
				console.log("Update Discard");
				this.discardingResources = {"wood":0,"brick":0,"sheep":0,"wheat":0,"ore":0};
				this.maxDiscardValues = {"wood":0,"brick":0,"sheep":0,"wheat":0,"ore":0};
				this.clientModel = this.getClientModel();
				this.currentPlayerResources = this.clientModel.currentPlayerResources();
				this.currentDiscardAmount = 0;
				this.totalResources = 0;
				
				for(var myKey in this.currentPlayerResources){
					this.totalResources += this.currentPlayerResources[myKey];
					this.getView.setResourceMaxAmount(myKey, this.currentPlayerResources[myKey]);
					this.maxDiscardValues[myKey] = this.currentPlayerResources[myKey];
					if(this.currentPlayerResources[myKey]>0){
						this.getView().setResourceAmountChangeEnabled(myKey, false, true);
					}
					else{
						this.getView().setResourceAmountChangeEnabled(myKey, false, false);
					}
				}
			}
		};

		/**
		 Called by the view when the player clicks the discard button.
         It should send the discard command and allow the game to continue.
		 @method discard
		 @return void
		 */	
		DiscardController.prototype.discard = function(){
			this.getClientModel.discardCards(this.discardingResources);
			this.getView().closeModal();
			}

		}
        
		/**
		 Called by the view when the player increases the amount to discard for a single resource.
		 @method increaseAmount
		 @param {String} resource the resource to discard
		 @return void
		 */
		DiscardController.prototype.increaseAmount = function(resource){
			
			if(this.discardingResources[resource]===this.maxDiscardValues[resource]){
				this.getView().setResourceAmountChangeEnabled(resource, false, true);
			}
			else{
				this.getView().setResourceAmountChangeEnabled(resource, true, true);
			}
			var tempIncrease = (this.discardingResources[resource]+1);
			this.getView().setResourceAmount(resource, tempIncrease);
			this.discardingResources[resource] = tempIncrease;
			
			//this.currentDiscardAmount = (this.currentDiscardAmount+1);
			this.currentDiscardAmount += 1;
			getView().setStateMessage(this.currentDiscardAmount+"/"+(totalResources/2));
			
			if(this.currentDiscardAmount === (this.totalResources/2)){
				this.getView().setDiscardButtonEnabled(true);
				for(var myKey in this.currentPlayerResources){
					if(this.discardingResources[myKey]>0){
						this.getView().setResourceAmountChangeEnabled(myKey, false, true);
					}
				}
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
			this.getView().setResourceAmount(resource, (this.discardingResources[resource]-1));
			//this.currentDiscardAmount = (this.currentDiscardAmount-1);
			this.currentDiscardAmount -= 1;
			if(this.discardingResources[resource]>0){
				this.getView().setResourceAmountChangeEnabled(resource, true, true);
			}
			else{
				this.getView().setResourceAmountChangeEnabled(resource, true, false);
			}
			
			this.getView().setStateMessage(this.currentDiscardAmount+"/"+(this.totalResources/2));
		}
		
		return DiscardController;
	}());
	
    return DiscardController;
}());


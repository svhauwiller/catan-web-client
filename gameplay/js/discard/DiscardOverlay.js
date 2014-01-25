/**
 * This is the namespace for discarding cards
 * @module catan.discard
 * @namespace discard
 */

var catan = catan || {};
catan.discard = catan.discard || {};

catan.discard.View = (function(){

	var BasicOverlay = catan.misc.BasicOverlay;
	var Definitions = catan.definitions;
	var DisplayElement = catan.definitions.DisplayElement;
	var GROUP_NAME = Definitions.GroupNames.discard;
	var ResourceTypes = Definitions.ResourceTypes;
	
    /**
     * A view for discarding cards.  Inherits from misc.BaseOverlay.
     * @class DiscardView
     * @constructor
     * @extends misc.BaseOverlay
     */
	var DiscardView = (function(){
		
		DiscardView.prototype = core.inherit(BasicOverlay.prototype);
        
		core.defineProperty(DiscardView.prototype, "DisplayElems");
		core.defineProperty(DiscardView.prototype, "DiscardButton");
		
		function DiscardView(){
			BasicOverlay.call(this, "More than Seven Cards: Discard");
			this.setDisplayElems({});
		}
        
		//------------------------public methods-----------------------------
        
		/**
		 Attaches the controller to the view and builds the view on the page.
		 @method setController
		 @param {discard.Controller} controller
		 @return void
		 */
        DiscardView.prototype.setController = function(controller){
			this.Controller = controller;
			buildView.call(this);
			this.setView(this.generateBody());
			this.generateFooter();
		};
        
		/**
		 Sets the maximum amount of a resource that the player can discard
		 @method setResourceMaxAmount
		 @param {String} resource the resource to discard (see catan.definitions.ResourceTypes)
		 @param {int} amt the max amount you can discard of the resource
		 @return void
		 */
		DiscardView.prototype.setResourceMaxAmount = function(resource, amt){
			this.getDisplayElems()[resource].updateLabel("Total " + amt);
		}
        
		/**
		 Enables/disables increasing or decreasing for a single resource.
		 @method setResourceAmountChangeEnabled
		 @param {String} resource the resource to discard (see catan.definitions.ResourceTypes)
		 @param {Boolean} increase whether you can increase the amount displayed
		 @param {Boolean} decrease whether you can decrease the amount displayed
		 @return void
		 */
		DiscardView.prototype.setResourceAmountChangeEnabled = function(resource, increase, decrease){
		 	if(!increase && !decrease){
				this.getDisplayElems()[resource].getAmountChangeElem().hide();
			}
			else{
				this.getDisplayElems()[resource].getAmountChangeElem().show(increase, decrease);
			}
		}
        
		/**
		 Sets the amount displayed for a single resource.
		 @method setResourceAmount
		 @param {String} resource the resource to discard (see catan.definitions.ResourceTypes)
		 @param {int} amount the current amount to display
		 @return void
		 */
		DiscardView.prototype.setResourceAmount= function(resource, amount){
			if(amount == undefined)
				amount = "";
			this.getDisplayElems()[resource].getAmountChangeElem().displayAmount(amount);
		}
        
		/**
		 Enables or disabled the discard button.
		 @method setDiscardButtonEnabled
		 @param {Boolean} shouldEnable whether or not a player can discard yet
		 @return void
		 */
		DiscardView.prototype.setDiscardButtonEnabled = function(shouldEnable){
			if(shouldEnable)
				this.getDiscardButton().enable();
			else
				this.getDiscardButton().disable();
		}
        
		/**
		 Sets the state message, which indicates how many cards a player has set to discard, and how many remain to set.
		 @method setStateMessage
		 @param {String} message the message to display
		 @return void
		 */
		DiscardView.prototype.setStateMessage = function(message){
			this.getDiscardButton().setMessage(message);
		}
				
		//------------------private build-view methods-----------------------------
		
		DiscardView.prototype.generateBody = function(){
			var discardDiv = document.createElement("div");
			if(this.getController() == undefined)
				return discardDiv;
			
			var cardsDiv = document.createElement("div");
				cardsDiv.setAttribute('class','discard-area');
				
			for(index in ResourceTypes){
				cardsDiv.appendChild(this.getDisplayElems()[ResourceTypes[index]].getView());
			}
				
			discardDiv.appendChild(cardsDiv);
			
			return discardDiv;
		}
        
		DiscardView.prototype.generateFooter = function(){
			var buttonAction = core.makeAnonymousAction(this, this.action);
			var button = new DisplayElement.ButtonArea(buttonAction);
				this.setDiscardButton(button);
				
			var topDiv = document.createElement('div');
				topDiv.appendChild(button.getView());
			return topDiv;
		}
        
		DiscardView.prototype.action = function(){
			this.getController().discard();
		}
		
		var buildView = function(){
			
			var ctrl = this.getController();
			
			for(index in ResourceTypes){
				var value = ResourceTypes[index];
				
				var amountChangeElem = new DisplayElement.AmountChangeElement(value,
												core.makeAnonymousAction(ctrl, ctrl.increaseAmount, [value]),
												core.makeAnonymousAction(ctrl, ctrl.decreaseAmount, [value]));
				var action = undefined;
				
				var displayElem = new DisplayElement.ComboElement(GROUP_NAME,value,action,amountChangeElem);
					this.getDisplayElems()[ResourceTypes[index]] = (displayElem);
			}
			
			var buttonAction = core.makeAnonymousAction(this.getController(), this.getController().discard);
			var button = new DisplayElement.ButtonArea(buttonAction);
				this.setDiscardButton(button);
		}
		
		return DiscardView;
	}());
    
	return DiscardView;
}());


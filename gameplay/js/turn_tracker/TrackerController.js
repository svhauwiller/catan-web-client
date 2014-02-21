/**
The namespace for the turn tracker

@module catan.turntracker
@namespace turntracker
**/

var catan = catan || {};
catan.turntracker = catan.turntracker || {};

catan.turntracker.Controller = (function turntracker_namespace() {	

	var Controller = catan.core.BaseController;
    
	/**
		The controller class for the Turn Tracker
		@class TurnTrackerController 
		@extends misc.BaseController
		@param {turntracker.View} view The view for this object to control.
		@param {models.ClientModel} clientModel The clientModel for this object to control.
		@constructor
	**/
	var TurnTrackerController = (function TurnTrackerController_Class(){
	
		function TurnTrackerController(view, clientModel){
			Controller.call(this,view,clientModel);
            this.currentView = this.getView();
            // TODO: This constructor should configure its view by calling view.setClientColor and view.initializePlayer
            // NOTE: The view.updateViewState and view.updatePlayer will not work if called from here.  Instead, these
            //          methods should be called later each time the client model is updated from the server.

				this.currentPlayer = clientModel.players[clientModel.playerID];
				this.playerColor = this.currentPlayer.color;
				this.playerName = this.currentPlayer.name;
				this.playerNumber = this.currentPlayer.playerID;

            view.initializePlayer(this.playerNumber, this.playerName, this.playerColor);
            view.setClientColor(this.playerColor);
            
		};

		core.forceClassInherit(TurnTrackerController,Controller);

		TurnTrackerController.prototype.updateFromModel = function() {
			
			this.clientModel = this.getClientModel();
			this.myNumber = this.clientModel.players[this.clientModel.playerID].orderNumber
			this.currentTurnNumber = this.clientModel.turnTracker.currentTurn;
			console.log("myOrderNumber is: " + this.myNumber);
			console.log("currentTurnNumber is: " + this.currentTurnNumber);
			if(this.myNumber === this.currentTurnNumber){
				this.getView().updateStateView(true, "End Turn");}
			else{
				this.getView().updateStateView(false, "Waiting on other Players...");
			}
			
			console.log("Update Turn Tracker");
		};

		/**
		 * Called by the view when the local player ends their turn.
		 * @method endTurn
		 * @return void
		 */
		TurnTrackerController.prototype.endTurn = function(){
			
			this.currentView.updateStateView(false, "Waiting on other Players...");
			this.getClientModel().finishTurn();
		};
		
		return TurnTrackerController;
	} ());

	return TurnTrackerController;
} ());


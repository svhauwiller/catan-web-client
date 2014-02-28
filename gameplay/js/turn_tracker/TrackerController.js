//STUDENT-EDITABLE-BEGIN
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

			this.clientModel = this.getClientModel();

            for (var player in this.clientModel.players) {

	            view.initializePlayer(this.clientModel.players[player].playerID, this.clientModel.players[player].name, this.clientModel.players[player].color);

			}

            view.setClientColor(this.clientModel.players[this.clientModel.playerID].color);
            
		};

		core.forceClassInherit(TurnTrackerController,Controller);

		TurnTrackerController.prototype.updateFromModel = function() {
/*			
			this.clientModel = this.getClientModel();
			this.myNumber = this.clientModel.players[this.clientModel.playerID].orderNumber;
			this.currentTurnNumber = this.clientModel.turnTracker.currentTurn;
			console.log("myOrderNumber is: " + this.myNumber);
			console.log("currentTurnNumber is: " + this.currentTurnNumber);

			if(this.myNumber === this.currentTurnNumber){
				this.getView().updateStateView(true, "End Turn");}
			else{
				this.getView().updateStateView(false, "Waiting on other Players...");
			}
			for (var player in this.clientModel.players) {
				var updateItem = {

					playerIndex : this.clientModel.players[player].playerID,
					score : this.clientModel.players[player].victoryPts,
					highlight : (this.clientModel.players[player].orderNumber === this.currentTurnNumber),
					army : (this.clientModel.biggestArmy === this.clientModel.players[player].playerID),
					road : (this.clientModel.longestRoad === this.clientModel.players[player].playerID)
				};
				console.log(updateItem);
				this.getView().updatePlayer(updateItem);	
			}
*/

var tempObject;
			this.clientModel = this.getClientModel();
			this.myNumber = this.clientModel.players[this.clientModel.playerID].orderNumber
			this.currentTurnNumber = this.clientModel.turnTracker.currentTurn;
			console.log("myOrderNumber is: " + this.myNumber);
			console.log("currentTurnNumber is: " + this.currentTurnNumber);
			
			//this should go through all the players in clientModel
			for(var singlePlayer in this.clientModel.players){
				tempObject = new Object();
				//highlight if true, remove highlight if not
				if(this.myNumber === this.currentTurnNumber){
					tempObject.highlight = true;
					this.getView().updateStateView(true, "End Turn");
				}
				else{
					tempObject.highlight = false;
					this.getView().updateStateView(false, "Waiting on other Players...");
				}
				tempObject.army = this.clientModel.players[singlePlayer].largestArmy;
				tempObject.score = this.clientModel.players[singlePlayer].victoryPts;
				tempObject.road = this.clientModel.players[singlePlayer].longestRoad;
				//this should push the updates to the view
				this.getView().updatePlayer(object);
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


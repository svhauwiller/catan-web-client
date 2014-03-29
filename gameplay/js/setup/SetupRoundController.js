//STUDENT-EDITABLE-BEGIN
/**
    This is the namespace for the intitial game round
    @module catan.setup
    @namespace setup
*/

var catan = catan || {};
catan.setup= catan.setup || {};

catan.setup.Controller = (function(){
	
	var Controller = catan.core.BaseController;
    
	/** 
		@class SetupRoundController
		@constructor 
		@extends misc.BaseController
		@param {models.ClientModel} clientModel
		@param {map.MapController} mapController
	*/
	var SetupRoundController = (function (){
		var SetupRoundController = function (clientModel, mapController){
			this.mapController = mapController;
			this.isMoving = false;
			Controller.call(this,undefined,clientModel);
			//console.log(clientModel);
			//console.log(mapController);
			this.numSettlements = 5;
			this.numRoads = 15;
			console.log(this);
		};
		
		core.forceClassInherit(SetupRoundController,Controller);
		
		/**
		Called by when the Client model updates.
		@method updateFromModel
		@return void
		*/
		SetupRoundController.prototype.updateFromModel = function(){
			console.log("Update Setup");
			console.log(this.mapController.overlayOpen);

			
			if(this.mapController.overlayOpen == false){
				var turnTracker = this.ClientModel.turnTracker;
				console.log(turnTracker.theStatus + ":" + turnTracker.currentTurn);
				if(turnTracker.theStatus == "FirstRound" || turnTracker.theStatus == "SecondRound"){
					console.log("IS THIS EQUAL??? " + this.ClientModel.orderNumbers[turnTracker.currentTurn] + " == " + this.ClientModel.playerID);
					if(this.ClientModel.orderNumbers[turnTracker.currentTurn] == this.ClientModel.playerID ){

						this.setupMove();
					}
				}
				//if(turnTracker.theStatus == "Rolling"){ // when we get to the Rolling status, it's time to start
				else {
					this.ClientModel.state.setState("Regular");
					window.location.pathname = "/catan.html";
				}
			}
		};

		/**
		Called by updateFromModel and allows setup movements.
		@method setupMove
		@return void
		*/
		SetupRoundController.prototype.setupMove = function(){

			console.log("Road: " + this.numRoads + " == " + this.ClientModel.players[this.ClientModel.playerID].roads);
			console.log("Settlements: " + this.numSettlements + " == " + this.ClientModel.players[this.ClientModel.playerID].settlements);
						
			if(this.numSettlements == this.ClientModel.players[this.ClientModel.playerID].settlements){
				console.log("startMove settlement");
				this.mapController.startMove("Settlement", true, true);
			}
			else if(this.numRoads == this.ClientModel.players[this.ClientModel.playerID].roads){
				console.log("startMove road");
				this.mapController.startMove("Road", true, true);
			}
			else{
				console.log("finishTurn");
				this.numSettlements = this.ClientModel.players[this.ClientModel.playerID].settlements;
				this.numRoads = this.ClientModel.players[this.ClientModel.playerID].roads;
				console.log(this);
				this.ClientModel.finishTurn();
				console.log(this.mapController);
			}

		};
        
		return SetupRoundController;
	}());
    
	return SetupRoundController;
}());
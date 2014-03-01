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
		
		SetupRoundController.prototype.updateFromModel = function(){
			console.log("Update Setup");
			console.log(this.mapController.overlayOpen);
			//this.mapController.updateFromModel();
			//this.ClientModel.updateFromModel();
			
			if(this.mapController.overlayOpen == false){
				var turnTracker = this.ClientModel.turnTracker;
console.log("currentTurn:" + turnTracker.currentTurn);
				if(turnTracker.theStatus == "FirstRound" || turnTracker.theStatus == "SecondRound"){
					
					if(turnTracker.currentTurn == this.ClientModel.playerID ||
						(turnTracker.currentTurn == 2 && this.ClientModel.playerID == 10) ||
						(turnTracker.currentTurn == 3 && this.ClientModel.playerID == 11)){
						console.log(this.numRoads);
						console.log(this.ClientModel.players[this.ClientModel.playerID].roads);
						if(this.numRoads == this.ClientModel.players[this.ClientModel.playerID].roads){
							this.mapController.startMove("Road", true, true);
						}	
						else if(this.numSettlements == this.ClientModel.players[this.ClientModel.playerID].settlements){
							this.mapController.startMove("Settlement", true, true);
						}
						else{
							this.numSettlements = this.numSettlements - 1;
							this.numRoads = this.numRoads - 1;
							
							console.log(this);
							this.ClientModel.updateFromServer();
							console.log(this);
							this.ClientModel.finishTurn();
						}
						/*console.log(this.mapController.settlementBuilt);
						if(this.mapController.settlementBuilt == false){
							this.mapController.startMove("Road", true, true);
							console.log(this.mapController.overlayOpen);
						}
						else{ // settlementBuilt == true
							this.mapController.startMove("Settlement", true, true);
						}*/
					}
				}
				if(turnTracker.theStatus == "Rolling"){ // when we get to the Rolling status, it's time to start
					this.ClientModel.state.setState("Regular");
					window.location.pathname = "/catan.html";
				}
			}
		};
        
		return SetupRoundController;
	}());
    
	return SetupRoundController;
}());


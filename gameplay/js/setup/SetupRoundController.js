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
			console.log(this);
			
		};
		
		core.forceClassInherit(SetupRoundController,Controller);
		
		SetupRoundController.prototype.updateFromModel = function(){
			//this.mapController.updateFromModel();
			//this.ClientModel.updateFromModel();
			if(this.mapController.overlayOpen == false){
				var turnTracker = this.ClientModel.turnTracker;
				if(turnTracker.theStatus == "FirstRound" || turnTracker.theStatus == "SecondRound"){
					if(turnTracker.currentTurn == this.ClientModel.playerID ||
						(turnTracker.currentTurn == 2 && this.ClientModel.playerID == 10) ||
						(turnTracker.currentTurn == 3 && this.ClientModel.playerID == 11)){
						this.mapController.overlayOpen = true;
						this.mapController.startMove("Settlement", true, true);
					}
				}
				if(turnTracker.theStatus == "Rolling"){ // when we get to the Rolling status, it's time to start
					window.location.pathname = "/catan.html";
				}
			}
		};
        
		return SetupRoundController;
	}());
    
	return SetupRoundController;
}());


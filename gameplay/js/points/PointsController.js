//STUDENT-EDITABLE-BEGIN
var catan = catan || {};
catan.points = catan.points || {};
catan.points.Controller = catan.points.Controller || {};

/**
    This is the namespace for point display
    @module catan.points
    @namespace points
*/

catan.points.Controller = (function VPController_Class(){

	var Controller = catan.core.BaseController;

	PointController.prototype = core.inherit(Controller.prototype);

	core.defineProperty(PointController.prototype, "GameFinishedView");

	/** 
		@class PointController
		@constructor 
		@extends misc.BaseController
		@param {points.View} view
		@param {misc.GameFinishedView} gameFinishedView
		@param {models.ClientModel} clientModel
	*/
	function PointController(view, gameFinishedView, clientModel){
		this.setGameFinishedView(gameFinishedView);
		Controller.call(this,view,clientModel);
	}

	/**
	Called by when the Client model updates.
	@method updateFromModel
	@return void
	*/
	PointController.prototype.updateFromModel = function() {
		console.log("Update Point");

		var playerNum = this.getClientModel().playerID;
		var player = this.getClientModel().players[playerNum];
		var winnerNum = this.getClientModel().winner;

		console.log(player);
		this.getView().setPoints(player.victoryPts);

		if (winnerNum != -1) {
			var winningPlayer = this.getClientModel().players[winnerNum];
			this.getGameFinishedView().setWinner(winningPlayer.name, (winnerNum == playerNum));
			this.getGameFinishedView().showModal();
		}
	};
	
	return PointController;	
}());
// STUDENT-REMOVE-END
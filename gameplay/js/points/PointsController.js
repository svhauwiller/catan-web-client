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

	PointController.prototype.updateFromModel = function() {
		console.log("Update Point");

<<<<<<< HEAD
		var playerNum = this.getClientModel().playerID;
=======
		var playerID = this.getClientModel().playerID;
>>>>>>> 71b998c0895f0b8ac130f866a112c136e3675507

		var player = this.getClientModel().players[playerNum];

		this.getView().setPoints(player.victoryPts);
	};
	
	return PointController;	
}());
// STUDENT-REMOVE-END


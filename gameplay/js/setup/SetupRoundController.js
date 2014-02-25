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
			Controller.call(this,undefined,clientModel);
			
			console.log(mapController.modalView);
			//mapController.modalView.showModal("Road");
			mapController.startMove("Road", true, true);
			//mapController.startMove("road", true, true);
		};
        
		core.forceClassInherit(SetupRoundController,Controller);
        
		return SetupRoundController;
	}());
    
	return SetupRoundController;
}());


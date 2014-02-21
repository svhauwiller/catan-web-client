/**
    This is the namespace the rolling interface
    @module catan.roll
    @namespace roll
*/

var catan = catan || {};
catan.roll = catan.roll || {};

catan.roll.Controller = (function roll_namespace(){

	var Controller = catan.core.BaseController;
    
	/**
		 * @class RollController
		 * @constructor
		 * @extends misc.BaseController
		 * @param{roll.View} view
		 * @param{roll.ResultView} resultView
		 * @param{models.ClientModel} clientModel
		 */
	var RollController = (function RollController_Class(){
		
		core.forceClassInherit(RollController,Controller);
 
		core.defineProperty(RollController.prototype,"rollResultView");
		
		function RollController(view,resultView, clientModel){
			this.setRollResultView(resultView);
			Controller.call(this,view,clientModel);
			this.rollInterval = false;
			this.showRollResult = false;
		};

		RollController.prototype.updateFromModel = function() {
			var clientModel = this.getClientModel();

			var player = clientModel.players[clientModel.playerID];


			if(clientModel.turnTracker.currentTurn === player.orderNumber &&
			   clientModel.turnTracker.theStatus === "Rolling"){
				this.startRollCountdown();
			}
		};


		RollController.prototype.startRollCountdown = function() {
			var _this = this;
			var timerLength = 5;

			var rollCountdown = setInterval(function(){
				if(timerLength === 0){
					clearInterval(rollCountdown);
					_this.rollDice();
				} else {
					console.log(timerLength);
					_this.getView().closeModal();
					_this.getView().changeMessage("Rolling automatically in... " + timerLength);
					timerLength--;
					_this.getView().showModal();
				}
			}, 1000);
		};
        
		/**
		 * This is called from the roll result view.  It should close the roll result view and allow the game to continue.
		 * @method closeResult
		 * @return void
		**/
		RollController.prototype.closeResult = function(){
			this.getRollResultView().closeModal();
		}
		
		/**
		 * This method generates a dice roll
		 * @method rollDice
		 * @return void
		**/
		RollController.prototype.rollDice = function(){
			this.getView().closeModal();
			var rollResult = this.getClientModel().rollDice();
			this.getRollResultView().setAmount(rollResult);
			this.getRollResultView().showModal();
		};
		
		return RollController;
	}());
	
	return RollController;

}());


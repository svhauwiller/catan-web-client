var catan = catan || {};
catan.models = catan.models || {};

/**
* Player Module
*
* @module catan.models.Player
*/
catan.models.Player = (function playerNameSpace(){
	
	var Player = (function PlayerClass(){
		
		/**
		* Player class
		* <pre>
		* </pre>
		*
		* @class Player
		* @constructor
		*/
		
		/**
		* The number of victory points needed to win
		* @property MAX_GAME_POINTS
		* @type {integer}
		*/
		/**
		* The number of cities not built by the player
		* @property cities
		* @type {integer}
		*/
		/**
		* The number of settlements not built by the player
		* @property settlements
		* @type {integer}
		*/
		/**
		* The number of roads not built by the player
		* @property roads
		* @type {integer}
		*/
		/**
		* The number of soldier/knight cards played by the player
		* @property soldiers
		* @type {integer}
		*/
		/**
		* The color of the player
		* @property color
		* @type {string}
		*/
		/**
		* Flag to determine if the player would have to discard cards when a 7 is rolled
		* @property discarded
		* @type {boolean}
		*/
		/**
		* Flag to determine if the player has the largest army award
		* @property largestArmy
		* @type {boolean}
		*/
		/**
		* Flag to determine if the player has the longest road award
		* @property longestRoad
		* @type {boolean}
		*/
		/**
		* The number of victory point development cards owned by the player
		* @property monuments
		* @type {integer}
		*/
		/**
		* The name of the player
		* @property name
		* @type {string}
		*/
		/**
		* List of the development cards available for the player to use
		* @property newDevCards
		* @type {Array of DevCardList}
		*/
		/**
		* List of the development cards the player used, but still should be considered for awards 
		* @property oldDevCards
		* @type {Array of DevCardList}
		*/
		/**
		* The number in line the player takes in the cycle of turns
		* @property orderNumber
		* @type {integer}
		*/
		/**
		* Flag to determine if the player has played a development card in the current turn
		* @property playedDevCard
		* @type {boolean}
		*/
		/**
		* The unique id of the player
		* @property playerID
		* @type {integer}
		*/
		/**
		* The list of resource cards owned by the player
		* @property resources
		* @type {ResourceList}
		*/
		/**
		* The number of the victory points of the player
		* @property victoryPts
		* @type {integer}
		*/
		function Player()
		{
			this.MAX_GAME_POINTS = 10;
			this.cities = 4;
			//this.settlements = 3;// after initial placement
			//this.roads = 13;// after initial placement
			this.settlements = 5;
			this.roads = 15;
			this.soldiers = 0;
			this.color = "";
			this.discarded = false;
			this.largestArmy = false;
			this.longestRoad = false;
			this.monuments = 0;
			this.name = "";
			this.newDevCards = new catan.models.bank.DevCardList("player");
			this.oldDevCards = new catan.models.bank.DevCardList("player");
			this.orderNumber = 0;
			this.playedDevCard = false;
			this.playerID = -1;
			this.resources = new catan.models.bank.ResourceList("player");
			this.victoryPts = 0;
			this.woodValue = 4;
			this.oreValue = 4;
			this.sheepValue = 4;
			this.wheatValue = 4;
			this.brickValue = 4;
			//console.log(this);
		}
	
		Player.prototype.updateAll = function(playerModel){
			this.MAX_GAME_POINTS = playerModel.MAX_GAME_POINTS;
			this.cities = playerModel.cities;
			this.settlements = playerModel.settlements;
			this.roads = playerModel.roads;
			this.soldiers = playerModel.soldiers;
			this.color = playerModel.color;
			this.discarded = playerModel.discarded;
			this.largestArmy = playerModel.largestArmy;
			this.longestRoad = playerModel.longestRoad;
			this.monuments = playerModel.monuments;
			this.name = playerModel.name;
			this.newDevCards = this.replaceDevCards(playerModel.newDevCards);
			this.oldDevCards = this.replaceDevCards(playerModel.oldDevCards);
			this.orderNumber = playerModel.orderNumber;
			this.playedDevCard = playerModel.playedDevCard;
			this.playerID = playerModel.playerID;
			this.replaceAllResources(playerModel.resources);
			this.victoryPts = playerModel.victoryPoints;		

		}

		/**
		* The number of the victory points of the player
		* @property victoryPts
		* @type {integer}
		*/	
		//NO SMELLS HERE
		Player.prototype.replaceAllResources = function(modelResourceList) {
			for (var key in modelResourceList) {
				this.resources[key] = modelResourceList[key];
			}
		}

		/**
		* The number of the victory points of the player
		* @property victoryPts
		* @type {integer}
		*/
		//This seems like it creates a Empty list of dev cards and then assigns that list to an already compiled list of dev cards. Why not just send the already compiled list
		Player.prototype.replaceDevCards = function(modelDevCardList){
			var tempDevCards = new catan.models.bank.DevCardList("player");
					
			for (var key in modelDevCardList) {
				tempDevCards[key] = modelDevCardList[key];
			}

			return tempDevCards;
				
		}

		/**
		* The number of the victory points of the player
		* @property victoryPts
		* @type {integer}
		*/
		// Seems like this could all be condensed down to just one boolean
		Player.prototype.canBuyRoad = function(){
			var hasEnough = false;
			if(this.resources.brick>0 && this.resources.wood > 0 && this.roads > 0)
				hasEnough=true;
			return hasEnough;

		}
		
		/**
		* The number of the victory points of the player
		* @property victoryPts
		* @type {integer}
		*/
		//Same with function above
		Player.prototype.canBuySettlement = function(){
			var hasEnough = false;
			if(this.resources.wheat>0 && this.resources.brick > 0 && this.resources.sheep > 0 && this.resources.wood > 0 && this.settlements > 0)
				hasEnough=true;
			return hasEnough;
		}
		
		/**
		* The number of the victory points of the player
		* @property victoryPts
		* @type {integer}
		*/
		// same as above
		Player.prototype.canBuyCity = function(){
			var hasEnough = false;
			if(this.resources.wheat>0 && this.resources.ore > 0 && this.cities > 0)
				hasEnough=true;
			return hasEnough;
		}
		
		/**
		* The number of the victory points of the player
		* @property victoryPts
		* @type {integer}
		*/
		// Same as above
		Player.prototype.canBuyDevCard = function(){
			var hasEnough = false;
			if(this.resources.wheat>0 && this.resources.ore > 0 && this.resources.sheep > 0)
				hasEnough=true;
			return hasEnough;
			
		}

		/**
		* The number of the victory points of the player
		* @property victoryPts
		* @type {integer}
		*/		
		Player.prototype.currentPlayerResources = function(){
			return this.resources;
		}
		
		return Player;
	}());
	return Player;
}());

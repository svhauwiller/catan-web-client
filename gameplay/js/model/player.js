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
			this.settlements = 3;// after initial placement
			this.roads = 13;// after initial placement
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
			this.playerID = 0;
			this.resources = new catan.models.bank.ResourceList("player");
			this.victoryPts = 0;
		}
	
		Player.prototype.updateAll = function(playerModel){
			this.MAX_GAME_POINTS = playerModel.MAX_GAME_POINTS;
			this.cities = playerModel.cities;
			this.settlements = playerModel.settlements;
			this.roads = playerModel.roads;
			this.soldiers = playerModel.soldier;
			this.color = playerModel.color;
			this.discarded = playerModel.discarded;
			this.largestArmy = playerModel.largestArmy;
			this.longestRoad = playerModel.longestRoad;
			this.monuments = playerModel.monuments;
			this.name = playerModel.name;
			this.newDevCards = replaceDevCards(playerModel.newDevCards);
			this.oldDevCards = replaceDevCards(playerModel.oldDevCards);
			this.orderNumber = playerModel.orderNumber;
			this.playedDevCard = playerModel.playedDevCard;
			this.playerID = playerModel.playerID;
			this.replaceAllResources(playerModel.resources);
			this.victoryPts = playerModel.victoryPts;		
		}

		Player.setResourceCards

		Player.prototype.updateVic = function (points){
			this.victoryPts += points;
		}

		Player.prototype.updateResource = function(type, amount){
			if(type === "brick"){
				this.resources.brick += amount;
			}
			else if(type === "wheat"){
				this.resource.wheat += amount;
			}
			else if(type === "sheep"){
				this.resource.sheep += amount;
			}
			else if(type === "ore"){
				this.resource.ore += amount;
			}
			else if(type === "wood"){
				this.resource.wood += amount;
			}
		}
	
		Player.prototype.updateAllResources = function(resourceList) {
			for (var key in resourceList) {
				this.resources[key] += resourceList[key];
			}
		}
	
		Player.prototype.replaceAllResources = function(modelResourceList) {
			for (var key in modelResourceList) {
				this.resources[key] = modelResourceList[key];
			}
		}
	
		Player.prototype.replaceDevCards = function( modelDevCardList){
	
			var tempDevCards = new catan.models.bank.DevCardList("player");
					
			for (var key in modelDevCardList) {
				tempDevCards.resources[key] = modelDevCardList[key];
			}

			return tempDevCards;
				
		}
		
		Player.prototype.canBuyRoad = function(){
			
			var hasBrick = false;
			var hasWood = false;
			var hasRoad = false;
			
			if (this.resources.brick > 0){
				hasBrick = true;
				}
			if (this.resources.wood > 0){
				hasWood = true;
				}
			if (this.roads > 0){
				hasRoad = true;
				}			
			
			return (hasWood && hasBrick);

		}
		
		Player.prototype.canBuySettlement = function(){
			
			var hasBrick = false;
			var hasWood = false;
			var hasWheat = false;
			var hasSheep = false;
			var hasSettlement = false;
			
			if (this.resources.brick > 0){
				hasBrick = true;
				}
			if (this.resources.wood > 0){
				hasWood = true;
				}
			if (this.resources.wheat > 0){
				hasBrick = true;
				}
			if (this.resources.sheep > 0){
				hasWood = true;
				}
			if (this.settlements > 0){
				hasSettlement = true;
				}		
			
			return (hasWood && hasBrick && hasWheat && hasSheep);
		}
		
		Player.prototype.canBuyCity = function(){
			

			var hasWheat = false;
			var hasOre = false;
			var hasCity = false;

			if (this.resources.wheat >= 2){
				hasBrick = true;
				}
			if (this.resources.ore >= 3){
				hasOre = true;
				}
			if (this.cities > 0){
				hasCity = true;
				}
			
			return (hasWheat && hasOre);
		}
		
		Player.prototype.canBuyDevCard = function(){
			
			var hasWheat = false;
			var hasOre = false;
			var hasSheep = false;
			

			if (this.resources.wheat > 0){
				hasBrick = true;
				}
			if (this.resources.ore > 0){
				hasWood = true;
				}	
			if (this.resources.sheep > 0){
				hasWood = true;
				}		
			
			return (hasWheat && hasOre && hasSheep);
		}
		
		Player.prototype.currentPlayerResources = function(){
			
			return this.resources;
		}
		
		Player.prototype.needToDiscardCheck = function(){
			
			return (this.resources.wood + this.resources.wheat + this.resources.sheep + this.resources.brick + this.resources.ore) > 7;
		}
		
		Player.prototype.hasResources = function(tradelist){
			var hasBrick = false;
			var hasWood = false;
			var hasWheat = false;
			var hasSheep = false;
			var hasOre = false;
			
			if (this.resources.brick >= tradelist.resources.brick){
				hasBrick = true;
				}
			if (this.resources.wood >= tradelist.resources.wood){
				hasWood = true;
				}
			if (this.resources.wheat >= tradelist.resources.wheat){
				hasBrick = true;
				}
			if (this.resources.sheep >= tradelist.resources.sheep){
				hasWood = true;
				}	
			if (this.resources.Ore >= tradelist.resources.ore){
				hasOre = true;
				}		
			
			return (hasWood && hasBrick && hasWheat && hasSheep && hasOre); 				
		}
	
		Player.prototype.buy = function(type)
		{
			switch(type)
			{
				case "settlement":
					this.resources.wheat -= 1;
					this.resources.wood -= 1;
					this.resources.brick -= 1;
					this.resources.sheep -= 1;
					break;
				
				case "city":
					this.resources.wheat -= 2;
					this.resources.ore -= 3;
					break;
					
				case "road":
					this.resources.wood -= 1;
					this.resources.brick -= 1;
					break;
					
				case "devCard":
					this.resources.sheep -= 1;
					this.resources.ore -= 1;
					this.resources.wheat -= 1;
					break;						
			}
		}
		
		return Player;
	}());
	return Player;
}());

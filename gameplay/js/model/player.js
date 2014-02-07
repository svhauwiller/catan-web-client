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
		* The number of cities and settlements owned by the player
		* @property cities
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
			this.cities = new Array();
			this.color = "";
			this.discarded = false;
			this.largestArmy = false;
			this.longestRoad = false;
			this.monuments = 0;
			this.name = "";
			this.newDevCards = new Array();
			this.oldDevCards = new Array();
			this.orderNumber = 0;
			this.playedDevCard = false;
			this.playerID = 0;
			this.resources = new ResourceList();
			this.victoryPts = 0;
		}

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
		
		Player.prototype.canBuyRoad = function(){
		}
		
		Player.prototype.canBuySettlement = function(){
		}
		
		Player.prototype.canBuyCity = function(){
		}
		
		Player.prototype.canBuyDevCard = function(){
		}
		
		Player.prototype.currentPlayerResources = function(){
		}
		
		Player.prototype.canOfferTrade = function(){
		}
		
		Player.prototype.needToDiscardCheck = function(){
		}
		
		Player.prototype.canAcceptTrade = function(){
		}
		
		return Player;
	}());
	return Player;
}());

var catan = catan || {};
catan.models = catan.models || {};

catan.models.bank = (function bankNameSpace(){
	
	var ResourceList = (function resourceListClass(){
		
		/**
		* resourceList class
		* <pre>
		* Invariants: all elements are non-negative
		* </pre>
		*
		* @class resourceList
		* @constructor
		*/
		
		/**
		* The elements
		* @property brick
		* @type {ElemType int}
		*/
		/**
		* The elements
		* @property ore
		* @type {ElemType int}
		*/
				/**
		* The elements
		* @property sheep
		* @type {ElemType int}
		*/
		/**
		* The elements
		* @property wheat
		* @type {ElemType int}
		*/
		/**
		* The elements
		* @property wood
		* @type {ElemType int}
		*/

		function resourceList()
		{
			this.brick=0;//19
			this.ore=0;//19
			this.sheep=0;//19
			this.wheat=0;//19
			this.wood=0;//19
		}
		
		
		
		return ResourceList;
	}());
	var DevCardList = (function DevCardListClass(){
		
		/**
		* Development Card List class
		* <pre>
		* Invariants: All elements are non-negative
		* </pre>
		*
		* @class DevCardListClass
		* @constructor
		*/
		
		/**
		* The monopoly card
		* @property monopolyCard
		* @type {int}
		*/
		
		/**
		* The monument card
		* @property monumentCard
		* @type {int}
		*/
		
		/**
		* The road building card
		* @property roadBuildingCard
		* @type {int}
		*/
		
		/**
		* The soldier card
		* @property soldierCard
		* @type {int}
		*/
		
		/**
		* The year of plenty card
		* @property yearOfPlentyCard
		* @type {int}
		*/
		
		function DevCardListClass(type)
		{
			switch(type)
			{
				case "bank":
					this.monopolyCard = 2;// 2
					this.monumentCard = 5;// 5 
					this.roadBuildingCard = 2;//2
					this.soldierCard = 14;//14
					this.yearOfPlentyCard = 2;//2
					break;
				
				case "player":
					this.monopolyCard = 0;// 2
					this.monumentCard = 0;// 5 
					this.roadBuildingCard = 0;//2
					this.soldierCard = 0;//14
					this.yearOfPlentyCard = 0;//2
					break;
			}
			//this.devCard.monopolyCard = 2;

		}
		
		return DevCardList;
	}());

	var DevCard = ( function DevCardClass () 
	{
		function DevCard(){
			var monopoly= new Monopoly();
			var monument = new Monument();
			var road = new RoadBuilding();
			var soldier = new Soldier();
			var year = new Year();
		};
		// calls use card of instance variables of mon 
		DevCard.prototype.useCard = function(type, parameter){
			switch(type){
				case "monopoly":
					monopoly.useCard(parameter);
					break;
				case "monument":
					monument.useCard(parameter);
					break;
				case "roadBuilding":
					roadBuilder.useCard(parameter);
					break;
				case "soldier":
					soldier.useCard(parameter);
					break;
				case "yearOfPlenty":
					yearOfPlenty.useCard(parameter);
					break;
			}
			
		}	
		return DevCard;
	}());

	var Monopoly = (function MonopolyClass(){
		function Monopoly(){};

		Monopoly.prototype.useCard = function(parameter){
			var playerIndex = parameter.playerIndex;
			var resToTake = parameter.resource;

			//go through and check for all players with that resources
		}
		return Monopoly;
	}());

	var Monument = (function MonumentClass(){
		function Monument(){};

		Monument.prototype.useCard = function(parameter){
			var playerIndex = parameter.playerIndex;
			//go through, find player and increment their victory points
		}
		return Monument;
	}());

	var YearOfPlenty = (function YearOfPlentyClass(){
		function YearOfPlenty(){};

		YearOfPlenty.prototype.useCard = function(parameter){
			var playerIndex = parameter.playerIndex;
			var resource1 = parameter.resource1;
			var resource2 = parameter.resource2;
			
			//go through players, find player, check if resource is stocked and if yes give both to player
		}
		return YearOfPlenty;
	}());

	var RoadBuilding = (function RoadBuildingClass(){
		function RoadBuilding(){};

		RoadBuilding.prototype.useCard = function(parameter){
			var playerIndex = parameter.playerIndex;
			//call road builder twice with this player
		}
		return RoadBuilding;
	}());

	var Soldier = (function SoldierClass(){
		function Soldier(){};

		Soldier.prototype.useCard = function(parameter){
			var playerIndex = parameter.playerIndex;
			//go through players 
			//run soldier command for this player
		}
		return Soldier;
	}());
	//Write playerDevCardList class
	//Write a devUtility class
	return {
		ResourceList:ResourceList,
		DevCardList:DevCardList,
		PlayerDevCardList:PlayerDevCardList,
		DevCard:DevCard,
		Monopoly:Monopoly,
		Soldier:Soldier,
		YearOfPlenty:YearOfPlenty,
		Monument:Monument,
		RoadBuilding:RoadBuilding
	}
}());
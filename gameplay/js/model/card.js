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

		function resourceList(type)
		{
			switch (type)
			{
					case("bank"):
						this.brick=19;
						this.ore=19;
						this.sheep=19;
						this.wheat=19;
						this.wood=19;
						break;
					case("player"):
						this.brick=0;
						this.ore=0;
						this.sheep=0;
						this.wheat=0;
						this.wood=0;
						break;
			}
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
			for(var i=0; i<catan.players.length; i++){
				if(i!==playerIndex){
					//may need to do a check to get what resToTake is;
					var count = catan.players[i].resources.resToTake
					catan.players[i].resources.resToTake -= count;
					catan.players[playerIndex].resources.resToTake += count;
				}
			}
		}
		return Monopoly;
	}());

	//check to make sure every variable is labeled correctly
	var Monument = (function MonumentClass(){
		function Monument(){};

		Monument.prototype.useCard = function(parameter){
			var playerIndex = parameter.playerIndex;
			for(var i=0; i < catan.players.length; i++){
				if(i===playerIndex){
					catan.players[i].victoryPts++;
				}
			}
		}
		return Monument;
	}());

	var YearOfPlenty = (function YearOfPlentyClass(){
		function YearOfPlenty(){};

		YearOfPlenty.prototype.useCard = function(parameter){
			var playerIndex = parameter.playerIndex;
			var resource1 = parameter.resource1;
			var resource2 = parameter.resource2;

			if(resource1==="brick"){
				catan.players[playerIndex].resources.brick++;
			}
			else if(resource1==="wheat"){
				catan.players[playerIndex].resources.wheat++;
			}
			else if(resource1==="sheep"){
				catan.players[playerIndex].resources.sheep++;
			}
			else if(resource1==="ore"){
				catan.players[playerIndex].resources.ore++;
			}
			else if(resource1==="wood"){
				catan.players[playerIndex].resources.wood++;
			}

			if(resource2==="brick"){
				catan.players[playerIndex].resources.brick++;
			}
			else if(resource2==="wheat"){
				catan.players[playerIndex].resources.wheat++;
			}
			else if(resource2==="sheep"){
				catan.players[playerIndex].resources.sheep++;
			}
			else if(resource2==="ore"){
				catan.players[playerIndex].resources.ore++;
			}
			else if(resource2==="wood"){
				catan.players[playerIndex].resources.wood++;
			}
			
		}
		return YearOfPlenty;
	}());

	var RoadBuilding = (function RoadBuildingClass(){
		function RoadBuilding(){};

		RoadBuilding.prototype.useCard = function(parameter){
			var playerIndex = parameter.playerIndex;
			//for loop may be necessary to do so with the correct player. I'm not sure how steal will be used.
			catan.buildRoad();
			catan.buildRoad();
		}
		return RoadBuilding;
	}());

	var Soldier = (function SoldierClass(){
		function Soldier(){};

		Soldier.prototype.useCard = function(parameter){
			var playerIndex = parameter.playerIndex;
			//for loop may be necessary to do so with the correct player. I'm not sure how steal will be used.
			catan.steal();
		}
		return Soldier;
	}());
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
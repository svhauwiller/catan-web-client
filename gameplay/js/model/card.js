var catan = catan || {};
catan.models = catan.models || {};

catan.models.bank = (function bankNameSpace(){
	
	var Bank = (function bankClass(){
		/**
		* Bank class
		*
		* @class Bank
		* @constructor
		*/
		
		/**
		* List of Resource Cards owned by the bank
		* @property resourceList
		* @type {ResourceList}
		*/
		/**
		* List of Development Cards owned by the bank
		* @property devCardList
		* @type {DevCardList}
		*/
		function Bank(){
			this.resourceList = new catan.models.bank.ResourceList("bank");
			this.devCardList = new catan.models.bank.DevCardList("bank");
		}
		
	}());
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
		function DevCard(model){
			this.monopoly= new Monopoly(model);
			this.monument = new Monument(model);
			this.road = new RoadBuilding(model);
			this.soldier = new Soldier(model);
			this.year = new Year(model);
		};
		// calls use card of instance variables of mon 
		DevCard.prototype.useCard = function(type, parameter){
			switch(type){
				case "monopoly":
					this.monopoly.useCard(parameter);
					break;
				case "monument":
					this.monument.useCard(parameter);
					break;
				case "roadBuilding":
					this.roadBuilder.useCard(parameter);
					break;
				case "soldier":
					this.soldier.useCard(parameter);
					break;
				case "yearOfPlenty":
					this.yearOfPlenty.useCard(parameter);
					break;
			}
			
		}	
		return DevCard;
	}());

	var Monopoly = (function MonopolyClass(){
		function Monopoly(model){
			this.model = model;
		};

		Monopoly.prototype.useCard = function(parameter){
			var playerIndex = parameter.playerIndex;
			var resToTake = parameter.resource;
			for(var i=0; i<catan.players.length; i++){
				if(i!==playerIndex){
					//may need to do a check to get what resToTake is;
					var count = this.model.players[i].resources.resToTake
					this.model.players[i].resources.resToTake -= count;
					this.model.players[playerIndex].resources.resToTake += count;
				}
			}
		}
		return Monopoly;
	}());

	//check to make sure every variable is labeled correctly
	var Monument = (function MonumentClass(){
		function Monument(model){
			this.model = model;
		};

		Monument.prototype.useCard = function(parameter){
			var playerIndex = parameter.playerIndex;
			for(var i=0; i < catan.players.length; i++){
				if(i===playerIndex){
					this.model.models.players[i].victoryPts++;
				}
			}
		}
		return Monument;
	}());

	var YearOfPlenty = (function YearOfPlentyClass(){
		function YearOfPlenty(model){
			this.model = model;
		};

		YearOfPlenty.prototype.useCard = function(parameter){
			var playerIndex = parameter.playerIndex;
			var resource1 = parameter.resource1;
			var resource2 = parameter.resource2;

			if(resource1==="brick"){
				this.model.players[playerIndex].resources.brick++;
				this.model.bank.ResourceList.brick--;
			}
			else if(resource1==="wheat"){
				model.players[playerIndex].resources.wheat++;
			}
			else if(resource1==="sheep"){
				model.players[playerIndex].resources.sheep++;
			}
			else if(resource1==="ore"){
				model.players[playerIndex].resources.ore++;
			}
			else if(resource1==="wood"){
				model.players[playerIndex].resources.wood++;
			}

			if(resource2==="brick"){
				model.players[playerIndex].resources.brick++;
			}
			else if(resource2==="wheat"){
				model.players[playerIndex].resources.wheat++;
			}
			else if(resource2==="sheep"){
				model.players[playerIndex].resources.sheep++;
			}
			else if(resource2==="ore"){
				model.players[playerIndex].resources.ore++;
			}
			else if(resource2==="wood"){
				model.players[playerIndex].resources.wood++;
			}
			
		}
		return YearOfPlenty;
	}());

	var RoadBuilding = (function RoadBuildingClass(){
		function RoadBuilding(model){
			this.model = model;
		};

		RoadBuilding.prototype.useCard = function(parameter){
			var playerIndex = parameter.playerIndex;
			//for loop may be necessary to do so with the correct player. I'm not sure how steal will be used.
			model.buildRoad();
			model.buildRoad();
		}
		return RoadBuilding;
	}());

	var Soldier = (function SoldierClass(){
		function Soldier(model){
			this.model = model;
		};

		Soldier.prototype.useCard = function(parameter){
			var playerIndex = parameter.playerIndex;
			//for loop may be necessary to do so with the correct player. I'm not sure how steal will be used.
			model.steal();
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
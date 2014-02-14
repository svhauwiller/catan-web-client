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
		};

		Bank.prototype.takeDev = function(){
			var cardChosen = false;
			while(!cardChosen){
				var temp_index = Math.floor((Math.random()*this.devCardList.length)+1);
				var devCardString;
				if(temp_index === 1){
					devCardString = "sheep";
				}
				else if(temp_index === 2){
					devCardString = "brick";
				}
				else if(temp_index === 3){
					devCardString = "wheat";
				}
				else if(temp_index === 4){
					devCardString = "wood";
				}
				else if(temp_index === 5){
					devCardString = "ore";
				}
					
				if(this.devCardList[devCardString] !== 0)
				{
					cardChosen = true;//for safety sake
					this.devCardList[temp_index]--;
					return devCardString;
				}
			}
		}
		
		Bank.prototype.updateCopy= function(list, list2){
			this.resourceList = list;
			this.devCardList = list2;
		};
		
		Bank.prototype.updateResource = function(list){
			for(var key in list){
				this.resourceList[key] += list[key];
			}
		};
		
		return Bank;
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

		function ResourceList(type)
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
		};
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
		
		function DevCardList(type)
		{
			switch(type)
			{
				case "bank":
					this.monopoly = 2;// 2
					this.monument = 5;// 5 
					this.roadBuilding = 2;//2
					this.soldier = 14;//14
					this.yearOfPlenty = 2;//2
					break;
				
				case "player":
					this.monopoly = 0;// 2
					this.monument = 0;// 5 
					this.roadBuilding = 0;//2
					this.soldier = 0;//14
					this.yearOfPlenty = 0;//2
					break;
			}
		}
		
		return DevCardList;
	}());

	var DevCard = (function DevCardClass () {

		function DevCard(model){
			this.monopoly= new Monopoly(model);
			this.monument = new Monument(model);
			this.road = new RoadBuilding(model);
			this.soldier = new Soldier(model);
			this.year = new YearOfPlenty(model);
		};

		DevCard.prototype.useCard = function(type, parameter){
			switch(type){
				case "monopoly":
					this.monopoly.useCard(parameter);
					break;
				case "monument":
					this.monument.useCard(parameter);
					break;
				case "roadBuilding":
					this.road.useCard(parameter);
					break;
				case "soldier":
					this.soldier.useCard(parameter);
					break;
				case "yearOfPlenty":
					this.year.useCard(parameter);
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
			for(var i=0; i<this.model.players.length; i++){
				if(i!==playerIndex){
					var count = this.model.players[i].resources[resToTake]
					var neg = count * -1;
					this.model.players[i].updateResource(resToTake, neg);
					this.model.players[playerIndex].updateResource(resToTake, count);
				}
			}
		}
		return Monopoly;
	}());

	var Monument = (function MonumentClass(){
		function Monument(model){
			this.model = model;
		};

		Monument.prototype.useCard = function(parameter){
			var playerIndex = parameter.playerIndex;
			this.model.players[playerIndex].updateVic(1);

		}
		return Monument;
	}());

	//tested good
	var YearOfPlenty = (function YearOfPlentyClass(){
		function YearOfPlenty(model){
			this.model = model;
		};

		YearOfPlenty.prototype.useCard = function(parameter){
			var playerIndex = parameter.playerIndex;
			var resources = new Array();
			
			var resource1 = parameter.resource1;
			var resource2 = parameter.resource2;
			this.model.players[playerIndex].updateResource(resource1,1);
			console.log(this.model.bank.resourceList[resource1]);
			this.model.bank.resourceList[resource1]--;
			console.log(this.model.bank.resourceList[resource1]);

			this.model.players[playerIndex].updateResource(resource2,1);
			this.model.bank.resourceList[resource2]--;
		}
		return YearOfPlenty;
	}());

	var RoadBuilding = (function RoadBuildingClass(){
		function RoadBuilding(model){
			this.model = model;
		};

		RoadBuilding.prototype.useCard = function(parameter){
			//the parameters need to be worked on to finish this function
			this.model.buildRoad(parameter.playerIndex,parameter.hex,parameter.direction);
			this.model.buildRoad(parameter.playerIndex,parameter.hex,"SW");
		}
		return RoadBuilding;
	}());

	var Soldier = (function SoldierClass(){
		function Soldier(model){
			this.model = model;
		};

		Soldier.prototype.useCard = function(parameter){
			//a steal function does not exist yet;
			//this.model.steal();
		}
		return Soldier;
	}());
	return {
		Bank:Bank,
		ResourceList:ResourceList,
		DevCardList:DevCardList,
		DevCard:DevCard,
		Monopoly:Monopoly,
		Soldier:Soldier,
		YearOfPlenty:YearOfPlenty,
		Monument:Monument,
		RoadBuilding:RoadBuilding
	}
}());
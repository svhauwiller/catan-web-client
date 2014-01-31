var catan = catan || {};
catan.models = catan.models || {};

catan.models.card = (function cardNameSpace(){
	
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
		
		function DevCardClass()
		{
			//this.devCard.monopolyCard = 2;
			this.monopolyCard = 0;// 2
			this.monumentCard = 0;// 5 
			this.roadBuildingCard = 0;//2
			this.soldierCard = 0;//14
			this.yearOfPlentyCard = 0;//2
		}
		
		/**
		* Preform whatever operation is associated with the card
		* <pre>
		* Pre-condition: Check the current Player's DevCardList for the selected card
		* Post-condition: Identify the dev card played and perform the function of the selected card
		* </pre>
		*
		* @method useCard
		* @return {null}
		*/
		DevCardListClass.prototype.useCard = function()
		{
		}
		
		return DevCardList;
	}());
	//Write playerDevCardList class
	//Write a devUtility class
	return {
		ResourceList:ResourceList,
		DevCardList:DevCardList,
		PlayerDevCardList:PlayerDevCardList
	}
}());
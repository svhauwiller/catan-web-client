var catan = catan || {};
catan.models = catan.models || {};

/**
* Development Card List Module
*
* @module catan.models.DevCardList
*/

catan.models.devCardList = (function devCardListNameSpace(){
	
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
			this.monopolyCard = 0;
			this.monumentCard = 0;
			this.roadBuildingCard = 0;
			this.soldierCard = 0;
			this.yearOfPlentyCard = 0;
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
	return DevCardList;
}());

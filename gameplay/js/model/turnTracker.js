var catan = catan || {};
catan.models = catan.models || {};

/**
* turnTracker Module
*
* @module catan.models.turnTracker
*/

catan.models.turnTracker = (function turnTrackerNameSpace(){
	
	var resourceList = (function turnTrackerClass(){
		
		/**
		* turnTracker class
		* <pre>
		* Invariants: all elements are null
		* </pre>
		*
		* @class turnTracker
		* @constructor
		*/
		
		/**
		* The elements
		* @property currentTurn
		* @type {ElemType int}
		*/
		/**
		* The elements
		* @property status
		* @type {ElemType String}
		*/


		function turnTracker()
		{
			this.currentTurn=null;
			this.status=null;
		}
		
		
		
		return turnTracker;
	}());
	return turnTracker;
}());
var catan = catan || {};
catan.models = catan.models || {};

/**
* resourceList Module
*
* @module catan.models.resourceList
*/

catan.models.resourceList = (function resourceListNameSpace(){
	
	var resourceList = (function resourceListClass(){
		
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
			this.brick=0;
			this.ore=0;
			this.sheep=0;
			this.wheat=0;
			this.wood=0;
		}
		
		
		
		return resourceList;
	}());
	return resourceList;
}());
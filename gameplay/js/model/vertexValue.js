var catan = catan || {};
catan.model = catan.model || {};

/**
* vertexValue Module
*
* @module catan.model.vertexValue
*/

catan.model.vertexValue = (function vertexValueNameSpace(){
	
	var vertexValue = (function vertexValueClass(){
		
		/**
		* vertexValue class
		* <pre>
		* Invariants: owner is null, worth is 0
		* </pre>
		*
		* @class vertexValue
		* @constructor
		*/
		
		/**
		* The elements
		* @property ownerID
		* @type {ElemType int}
		*/
		/**
		* The elements
		* @property worth
		* @type {ElemType int}
		*/


		function vertexValue()
		{
			this.ownerID=null;
			this.worth=0;
		}
		
		
		
		return vertexValue;
	}());
	return vertexValue;
}());
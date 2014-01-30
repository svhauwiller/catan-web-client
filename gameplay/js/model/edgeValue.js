var catan = catan || {};
catan.models = catan.models || {};

/**
* edgeValue Module
*
* @module catan.models.edgeValue
*/

catan.models.edgeValueList = (function edgeValueNameSpace(){
	
	var resourceList = (function edgeValueClass(){
		
		/**
		* edgeValue class
		* <pre>
		* Invariants: ownerID is null
		* </pre>
		*
		* @class edgeValue
		* @constructor
		*/
		
		/**
		* The elements
		* @property ownerID
		* @type {ElemType int}
		*/


		function edgeValue()
		{
			this.ownerID=null;
		}
		
		
		
		return edgeValue;
	}());
	return edgeValue;
}());
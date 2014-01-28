var catan = catan || {};
catan.model = catan.model || {};

/**
* edgeValue Module
*
* @module catan.model.edgeValue
*/

catan.model.edgeValueList = (function edgeValueNameSpace(){
	
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
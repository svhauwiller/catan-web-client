var catan = catan || {};
catan.model = catan.model || {};

/**
* edge Module
*
* @module catan.model.edge
*/

catan.model.edge = (function edgeNameSpace(){
	
	var edge = (function edgeClass(){
		
		/**
		* edge class
		* <pre>
		* Invariants: all elements are non-negative
		* </pre>
		*
		* @class edge
		* @constructor
		*/
		
		/**
		* The elements
		* @property value
		* @type {ElemType EdgeValue}
		*/


		function resourceList()
		{
			this.value=new EdgeValue();
		}
		
		
		
		return edge;
	}());
	return edge;
}());
var catan = catan || {};
catan.model = catan.model || {};

/**
* hexLocation Module
*
* @module catan.model.hexLocation
*/

catan.model.hexLocation = (function hexLocationNameSpace(){
	
	var hexLocation = (function hexLocationClass(){
		
		/**
		* hexLocation class
		* <pre>
		* Invariants: all values are null
		* </pre>
		*
		* @class hexLocation
		* @constructor
		*/
		
		/**
		* The elements
		* @property x
		* @type {ElemType int}
		*/
		/**
		* The elements
		* @property y
		* @type {ElemType int}
		*/


		function hexLocation()
		{
			this.x=null;
			this.y=null;
		}
		
		
		
		return hexLocation;
	}());
	return hexLocation;
}());
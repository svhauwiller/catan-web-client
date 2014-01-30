var catan = catan || {};
catan.models = catan.models || {};

/**
* hexLocation Module
*
* @module catan.models.hexLocation
*/

catan.models.hexLocation = (function hexLocationNameSpace(){
	
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
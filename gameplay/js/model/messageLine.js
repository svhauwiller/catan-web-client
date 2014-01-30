var catan = catan || {};
catan.models = catan.models || {};

/**
* Stack Module
*
* @module catan.models.messageLine
*/

catan.models.messageLine = (function messageLineNameSpace(){
	
	var messageLine = (function messageLineClass(){
		
		/**
		* resourceList class
		* <pre>
		* Invariants: all elements are null string values
		* </pre>
		*
		* @class messageLine
		* @constructor
		*/
		
		/**
		* The elements
		* @property message
		* @type {ElemType String}
		*/
		/**
		* The elements
		* @property source
		* @type {ElemType String}
		*/


		function messageLine()
		{
				this.message = "";
				this.source = "";
		}
		
		
		
		return messageLine;
	}());
	return messageLine;
}());
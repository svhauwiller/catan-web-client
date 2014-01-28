var catan = catan || {};
catan.model = catan.model || {};

/**
* Stack Module
*
* @module catan.model.messageLine
*/

catan.model.messageLine = (function messageLineNameSpace(){
	
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
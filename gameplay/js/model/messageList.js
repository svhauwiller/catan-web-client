var catan = catan || {};
catan.model = catan.model || {};

/**
* messageList Module
*
* @module catan.model.messageList
*/

catan.model.messageList = (function messageListNameSpace(){
	
	var messageList = (function messageListClass(){
		
		/**
		* messageList class
		* <pre>
		* Invariants: array is a new list of messageLine
		* </pre>
		*
		* @class messageList
		* @constructor
		*/
		
		/**
		* The elements
		* @property lines
		* @type {ElemType Array<MessageLine>}
		*/


		function messageList()
		{
				lines = new Array();
		}
		
		
		
		return messageList;
	}());
	return messageList;
}());
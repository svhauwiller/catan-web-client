var catan = catan || {};
catan.model = catan.model || {};

/**
* tradeOffer Module
*
* @module catan.model.tradeOffer
*/

catan.model.tradeOffer = (function tradeOfferNameSpace(){
	
	var resourceList = (function tradeOfferClass(){
		
		/**
		* tradeOffer class
		* <pre>
		* Invariants
		* </pre>
		*
		* @class tradeOffer
		* @constructor
		*/
		
		/**
		* The elements
		* @property sender
		* @type {ElemType int}
		*/
		/**
		* The elements
		* @property receiver
		* @type {ElemType int}
		*/
		/**
		* The elements
		* @property offer
		* @type {ElemType ResourceList}
		*/


		function tradeOffer()
		{
			this.sender=null;
			this.receiver=null;
			this.offer = new ResourceList();
		}
		
		
		
		return tradeOffer;
	}());
	return tradeOffer;
}());
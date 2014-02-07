var catan = catan || {};
catan.models = catan.models || {};

/**
* tradeOffer Module
*
* @module catan.models.tradeOffer
*/

catan.models.tradeOffer = (function tradeOfferNameSpace(){
	
	var TradeOffer = (function tradeOfferClass(){
		
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


		function TradeOffer()
		{
			this.sender=null;
			this.receiver=null;
			this.offer = new ResourceList();
		}
		
		
		
		return tradeOffer;
	}());
	return tradeOffer;
}());
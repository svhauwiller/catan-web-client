var catan = catan || {};
catan.models = catan.models || {};

catan.models.utilities = function utilitiesNamespace(){ //namespace dec

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
		* The message as typed by the user
		* @property message
		* @type {ElemType String}
		*/
		/**
		* The user's ID
		* @property source
		* @type {ElemType String}
		*/


		function messageLine(){
			this.message = "";
			this.source = "";
		}
		
		messageLine.prototype.setMessage = function(theMessage){
			this.message = theMessage;		
		}
	
		messageLine.prototype.getMessage = function(){
			return this.message;		
		}
			
		messageLine.prototype.setSource = function(theSource){
			this.source = theSource;		
		}
	
		messageLine.prototype.getSource = function(){
			return this.source;		
		}
		
		return messageLine;
	}());
	
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
		* Array of string elements that represents the chat history
		* @property lines
		* @type {ElemType Array<MessageLine>}
		*/


		function messageList()
		{
				this.lines = new Array();
		}
		
		messageList.prototype.setLines = function(theLines){
			this.lines = theLines;
		}
		
		messageList.prototype.getLines = function(){
			return this.lines;		
		}
	
		messageList.prototype.addLine = function(chatLine){
			this.lines.push(chatLine);		
		}
	
		messageList.prototype.getLastLine = function(){
			this.lines.pop();		
		}
		
		return messageList;
	}());
	
	var tradeOffer = (function tradeOfferClass(){
		
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
		* The sender's ID
		* @property sender
		* @type {ElemType int}
		*/
		/**
		* The receiver's ID
		* @property receiver
		* @type {ElemType int}
		*/
		/**
		* A resourceList that hold's the sender's offer; positive values are offered, negative values are requested
		* @property offer
		* @type {ElemType ResourceList}
		*/


		function tradeOffer(){
			this.sender=null;
			this.receiver=null;
			this.offer = new ResourceList();
		}
	
	
		tradeOffer.prototype.setSender = function(theSender){
			this.sender = theSender;
		}
		
		tradeOffer.prototype.getSender = function(){
			return this.sender;		
		}
		tradeOffer.prototype.setReceiver = function(theReceiver){
			this.receiver = theReceiver;
		}
		
		tradeOffer.prototype.getReceiver = function(){
			return this.receiver;		
		}
		tradeOffer.prototype.setOffer = function(theOffer){
			this.offer = newOffer;
		}
		
		tradeOffer.prototype.getOffer = function(){
			return this.offer;		
		}
		
		
		return tradeOffer;
	}());
	
		var turnTracker = (function turnTrackerClass(){
		
		/**
		* turnTracker class
		* <pre>
		* Invariants: all elements are null
		* </pre>
		*
		* @class turnTracker
		* @constructor
		*/
		
		/**
		* The ID of the current player
		* @property currentTurn
		* @type {ElemType int}
		*/
		/**
		* String storing what is happening
		* @property status
		* @type {ElemType String}
		*/


		function turnTracker()
		{
			this.currentTurn=null;
			this.theStatus=null;
		}
		
		turnTracker.prototype.setCurrentTurn = function(theCurrentTurn){
			this.currentTurn = theCurrentTurn;		
		}
	
		turnTracker.prototype.getCurrentTurn = function(){
			return this.currentTurn;		
		}
	
		turnTracker.prototype.setStatus = function(statusUpdate){
			this.theStatus = statusUpdate;
		}
	
		turnTracker.prototype.getStatus = function(){
			return this.theStatus;		
		}
		
		
		return turnTracker;
	}());

	return {//to finish a namespace return all of the class objects created in the namespace
		messageLine:messageLine,
		messageList:messageList,
		tradeOffer:tradeOffer,
		turnTracker:turnTracker}
};
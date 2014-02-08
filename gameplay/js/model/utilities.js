var catan = catan || {};
catan.models = catan.models || {};

catan.models.utilities = function utilitiesNamespace(){ //namespace dec

	var MessageLine = (function MessageLineClass(){
		
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


		function MessageLine(){
			this.message = "";
			this.source = "";
		}
	
		function loadedMessageLine(theMessage,theSource){
			this.source = theSource;
			this.message = theMessage;
		}
		
		MessageLine.prototype.setMessage = function(theMessage){
			this.message = theMessage;		
		}
	
		MessageLine.prototype.getMessage = function(){
			return this.message;		
		}
			
		MessageLine.prototype.setSource = function(theSource){
			this.source = theSource;		
		}
	
		MessageLine.prototype.getSource = function(){
			return this.source;		
		}
		
		return MessageLine;
	}());
	
	var MessageList = (function messageListClass(){
		
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


		function MessageList()
		{
			this.lines = new Array();
		}
		
		MessageList.prototype.setLines = function(theLines){
			this.lines = theLines;
		}
		
		MessageList.prototype.getLines = function(){
			return this.lines;		
		}
	
		MessageList.prototype.addLine = function(chatLine){
			this.lines.push(chatLine);		
		}
	
		MessageList.prototype.removeLastLine = function(){
			this.lines.pop();		
		}
	
		MessageList.prototype.clear = function(){
			this.lines = new Array();		
		}
	
		MessageList.prototype.update = function(arrayOfUpdates){
			this.clear();
			for(var i = 0; i < arrayOfUpdates.length; ++i){
				var tempMessage = new MessageLine();
				tempMessage.setSource(arrayOfUpdates[i].message);
				tempMessage.setMessage(arrayOfUpdates[i].source);
				this.addLine(tempMessage);
			}
		}
	
		return MessageList;
	}());
	
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


		function TradeOffer(){
			this.sender=null;
			this.receiver=null;
			var temp = catan.models.bank();
			this.offer = new temp.ResourceList();
		}
	
	
		TradeOffer.prototype.setSender = function(theSender){
			this.sender = theSender;
		}
		
		TradeOffer.prototype.getSender = function(){
			return this.sender;		
		}
		TradeOffer.prototype.setReceiver = function(theReceiver){
			this.receiver = theReceiver;
		}
		
		TradeOffer.prototype.getReceiver = function(){
			return this.receiver;		
		}
		TradeOffer.prototype.setOffer = function(theOffer){
			this.offer = newOffer;
		}
		
		TradeOffer.prototype.getOffer = function(){
			return this.offer;		
		}
		
		
		return TradeOffer;
	}());
	
		var TurnTracker = (function TurnTrackerClass(){
		
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


		function TurnTracker()
		{
			this.currentTurn=null;
			this.theStatus=null;
		}
		
		TurnTracker.prototype.setCurrentTurn = function(theCurrentTurn){
			this.currentTurn = theCurrentTurn;		
		}
	
		TurnTracker.prototype.getCurrentTurn = function(){
			return this.currentTurn;		
		}
	
		TurnTracker.prototype.setStatus = function(statusUpdate){
			this.theStatus = statusUpdate;
		}
	
		TurnTracker.prototype.getStatus = function(){
			return this.theStatus;		
		}
		TurnTracker.prototype.update = function(turnTrackerUpdate){
			//currentTurn and status
			this.currentTurn = turnTrackerUpdate.currentTurn;
			this.theStatus = turnTrackerUpdate.theStatus;		
		}
		
		return TurnTracker;
	}());

	return {//to finish a namespace return all of the class objects created in the namespace
		MessageLine:MessageLine,
		MessageList:MessageList,
		TradeOffer:TradeOffer,
		TurnTracker:TurnTracker}
};
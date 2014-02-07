var catan = catan || {};
catan.models = catan.models || {};

/**
* messageLine Module
*
* @module catan.models.messageLine
*/

catan.models.messy = function messageLineNameSpace(){
	
	var messageLine = (function messageLineClass(){
		
		function messageLine()
		{
			this.message = "";
			this.source = "";
		}
		
		messageLine.prototype.setMessage = function(theMessage){
			this.message = theMessage;		
		}
	
		messageLine.prototype.getMessage = function getMessage(){
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
	
	var myClass = (function myClassClass(){
		function myClass()
		{
			this.age = 8;		
		}
	}());
	return {messageLine:messageLine,
			myClass:myClass};
};
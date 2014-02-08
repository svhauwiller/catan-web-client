
test("Test Running", function(){
	ok(1 == "1", "Basic Failure");
});
/*------------------------------MessageLine------------------------------*/
test("MessageLine Creation", function(){
	var namespace = catan.models.utilities();
	var myMessage = new namespace.MessageLine();
	var mess = "";
	ok(myMessage.getMessage()==mess, "Empty Message Failed");

});

test("MessageLine Set and Get", function(){
	var namespace = catan.models.utilities();
	var myMessage = new namespace.MessageLine();
	myMessage.setSource(2);
	myMessage.setMessage('I am a message')
	var mess = 'I am a message';
	ok(myMessage.getMessage()==mess, "Set and get message Failed");
	ok(myMessage.getSource()==2, "Set and get source Failed");
});
/*------------------------------MessageList------------------------------*/
test("MessageList Creation", function(){
	var namespace = catan.models.utilities();
	var myMessList = new namespace.MessageList();

	ok(myMessList.length==null, "Constructed Empty Array Failed");

});

test("MessageList addLine", function(){
	var namespace = catan.models.utilities();
	var myMessageList = new namespace.MessageList();
	myMessageList.addLine("1");
	myMessageList.addLine("2");
	myMessageList.addLine("3");
	myMessageList.addLine("4");
	ok(myMessageList.lines.length==4, "Addline failed");
});

test("MessageList removeLastLine", function(){
	var namespace = catan.models.utilities();
	var myMessageList = new namespace.MessageList();
	myMessageList.addLine("1");
	myMessageList.addLine("2");
	myMessageList.addLine("3");
	myMessageList.addLine("4");
	myMessageList.removeLastLine();
	myMessageList.removeLastLine();
	ok(myMessageList.lines.length==2, "RemoveLastLine failed")
});

test("MessageList clear", function(){
	var namespace = catan.models.utilities();
	var myMessageList = new namespace.MessageList();
	myMessageList.addLine("1");
	myMessageList.addLine("2");
	myMessageList.addLine("3");
	myMessageList.addLine("4");
	myMessageList.clear();
	ok(myMessageList.lines.length==0, "Addline failed");
});

test("MessageList update",function(){
	var namespace = catan.models.utilities();
	var myMessageList = new namespace.MessageList();
	var firstLine = new namespace.MessageLine()
		firstLine.setSource(2);
		firstLine.setMessage("Bacon");
	var secondLine = new namespace.MessageLine();
		secondLine.setSource(3);
		secondLine.setMessage("Extra Bacon");
	var lineArray = new Array();
	lineArray[0] = firstLine;
	lineArray[1] = secondLine;
	myMessageList.update(lineArray);
	ok(myMessageList.lines.length==2, "Update failed");
});
/*------------------------------TradeOffer------------------------------*/
/*
test("tradeOffer Creation", function(){
	var namespace = catan.models.utilities();
	var myTradeOffer = new namespace.TradeOffer();
	var nullSender = null;
	var nullReceiver = null;
	ok(myTradeOffer.getSender()==nullSender, "Empty tradeOffer Failed");
});
	
	*/
/*------------------------------TurnTracker------------------------------*/	
test("TurnTracker creation", function(){
	var namespace = catan.models.utilities();
	var myTurnTracker = new namespace.TurnTracker();
	ok(myTurnTracker.getStatus()==null, "Empty TurnTracker failed");
	ok(myTurnTracker.getCurrentTurn()==null, "Empty TurnTracker failed");	
});

test("TurnTracker update", function(){
	var namespace = catan.models.utilities();
	var myTurnTracker = new namespace.TurnTracker();
	var myObject = new Object();
	myObject.theStatus = "Buying ore";
	myObject.currentTurn = "Sam";
	myTurnTracker.update(myObject);
	ok(myTurnTracker.getCurrentTurn()=="Sam", "Failed to update currentTurn");
	ok(myTurnTracker.getStatus()=="Buying ore", "Failed to update status");	
});


	
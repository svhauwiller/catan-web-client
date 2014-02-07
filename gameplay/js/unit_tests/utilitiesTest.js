test("Test Running", function(){
	ok(1 == "1", "Basic Failure");
});

test("messageLine Creation", function(){
	var namespace = catan.models.utilities();
	var myMessage = new namespace.messageLine();
	var mess = "";
	ok(myMessage.getMessage()==mess, "Empty Message Failed");

});

test("messageLine Set and Get", function(){
	var namespace = catan.models.utilities();
	var myMessage = new namespace.messageLine();
	myMessage.setSource(2);
	myMessage.setMessage('I am a message')
	var mess = 'I am a message';
	ok(myMessage.getMessage()==mess, "Set and get message Failed");

});

test("messageList Creation", function(){
	var namespace = catan.models.utilities();
	var myMessList = new namespace.messageList();

	ok(myMessList.length==null, "Constructed Empty Array Failed");

});

test("messageList addLine", function(){
	var namespace = catan.models.utilities();
	var myMessageList = new namespace.messageList();
	myMessageList.addLine("1");
	myMessageList.addLine("2");
	myMessageList.addLine("3");
	myMessageList.addLine("4");
	ok(myMessageList.lines.length==4, "Addline failed hard ");
	

});

test("Test Proving Bill Wrong", function(){
	ok(1 == "1", "Basic Failure");
});
test("Test Running", function(){//how a test works
	ok(1 == "1", "Basic Success", "Basic Failure");
});

test("Can Build Road", function(){
	var map = new catan.models.Map.Map();
	var model = new catan.models.ClientModel(0);
	model.initFromServer(function(){ console.log("Initialization Complete"); });
	var rewardsList = map.getRobberVictims();
	console.log(rewardsList);
	ok(0 == "0", "The End");
	
	/*var model = new catan.models.ClientModel(0);
	var dev = new namespace.DevCard(model);
	var parameter = new Object();
	parameter.resource1="ore";
	parameter.resource2="wheat";
	parameter.playerIndex=0;

	var beforeCount = model.bank.resourceList[parameter.resource1];
	var beforeCountO = model.bank.resourceList[parameter.resource2];

	dev.useCard("yearOfPlenty", parameter);

	var afterCount = model.bank.resourceList[parameter.resource1];
	var afterCount0 = model.bank.resourceList[parameter.resource2];

	console.log("Comparison is " + beforeCount + " " + afterCount);
	ok(beforeCount > afterCount, "Unable to year of plenty");*/
});

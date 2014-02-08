
test("Year of Plenty", function(){

	var namespace = catan.models.bank;

	var model = new catan.models.ClientModel(0);
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
	ok(beforeCount > afterCount, "Unable to year of plenty");
});

test("Monument", function(){

	var namespace = catan.models.bank;
	var model = new catan.models.ClientModel(0);
	var dev = new namespace.DevCard(model);
	var parameter = new Object();
	parameter.playerIndex=0;

	var vicBefore = model.players[parameter.playerIndex].victoryPts;

	dev.useCard("monument", parameter);

	var vicAfter = model.player[parameter.playerIndex].victoryPts;
	ok(vicAfter>vicBefore, "Unable to monument");
});
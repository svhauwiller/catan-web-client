
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

test("Take Dev Card", function(){
	var namespace = catan.models.bank;

	var model = new catan.models.ClientModel(0);
	
	var beforeCount = model.bank
});

test("Monument", function(){

	var namespace = catan.models.bank;
	var model = new catan.models.ClientModel(0);
	var dev = new namespace.DevCard(model);
	var parameter = new Object();
	parameter.playerIndex=0;

	var vicBefore = model.players[parameter.playerIndex].victoryPts;

	dev.useCard("monument", parameter);

	var vicAfter = model.players[parameter.playerIndex].victoryPts;
	ok(vicAfter>vicBefore, "Unable to monument");
});

test("Monopoly", function(){
	
	var namespace = catan.models.bank;
	var model = new catan.models.ClientModel(0);
	var dev = new namespace.DevCard(model);
	var parameter = new Object();
	parameter.playerIndex=0;
	parameter.resource="brick";

	dev.useCard("monopoly", parameter);

	var playerRec = model.players[parameter.playerIndex].resources[parameter.resource];
	var bankRec = model.bank.resourceList[parameter.resource];
	ok(playerRec + bankRec === 19, "Unable to monopoly");
});

test("RoadBuilder", function(){
	
	var namespace = catan.models.bank;
	var model = new catan.models.ClientModel(0);
	var dev = new namespace.DevCard(model);
	var parameter = new Object();
	parameter.playerIndex=0;
	var hex = new Object();
	hex.x = 1;
	hex.y = 2;
	parameter.hex=hex;
	parameter.direction="NW";

	var before = model.players[parameter.playerIndex].roads;

	dev.useCard("roadBuilding", parameter);

	var after = model.players[parameter.playerIndex].roads;

	ok(before>after, "Unable to roadbuild");
});

test("Soldier", function(){
	
	var namespace = catan.models.bank;
	var model = new catan.models.ClientModel(0);
	var dev = new namespace.DevCard(model);
	var parameter = new Object();
});
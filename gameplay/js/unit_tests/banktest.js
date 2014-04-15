
test("Year of Plenty", function(){

	var namespace = catan.models.bank;
	var model = new catan.models.ClientModel(0);
	model.initFromServer($.noop);
	var parameter = new Object();
	parameter.resource1="ore";
	parameter.resource2="wheat";
	parameter.playerIndex=0;

	var beforeCount = model.bank.resourceList["ore"];
	var beforeCountO = model.bank.resourceList["wheat"];
	console.log("Before count is " + beforeCount + " " + beforeCountO);

	model.useDevCard("yearOfPlenty", parameter);
	model.initFromServer($.noop);
	var afterCount = model.bank.resourceList[parameter.resource1];
	var afterCount0 = model.bank.resourceList[parameter.resource2];

	console.log("Comparison is************************************************* " + beforeCount + " " + afterCount);
	ok(beforeCount > afterCount, "Unable to year of plenty");
});

test("Take Dev Card", function(){
	var namespace = catan.models.bank;
	var model = new catan.models.ClientModel(0);
	var dev = new namespace.DevCard(model);
	model.initFromServer($.noop);
	
	var beforeCount = model.bank.devCardList["monopoly"];
	beforeCount+=model.bank.devCardList["monument"];
	beforeCount+=model.bank.devCardList["roadBuilding"];
	beforeCount+=model.bank.devCardList["soldier"];
	beforeCount+=model.bank.devCardList["yearOfPlenty"];
	
	model.buyDevCard();
	var afterCount = model.bank.devCardList["monopoly"];
	afterCount+=model.bank.devCardList["monument"];
	afterCount+=model.bank.devCardList["roadBuilding"];
	afterCount+=model.bank.devCardList["soldier"];
	afterCount+=model.bank.devCardList["yearOfPlenty"];
	console.log("before count is ", beforeCount, "after count", afterCount);
	ok(beforeCount > afterCount, "BuyDevCard doesn't work");
});

test("Monument", function(){

	var namespace = catan.models.bank;
	var model = new catan.models.ClientModel(0);
	model.initFromServer($.noop);
	var parameter = new Object();
	parameter.playerIndex=0;

	var vicBefore = model.players[parameter.playerIndex].victoryPts;

	model.useDevCard("monument", parameter);

	var vicAfter = model.players[parameter.playerIndex].victoryPts;
	ok(vicAfter>vicBefore, "Unable to monument");
});

test("Monopoly", function(){
	console.log("Monopoly");
	var namespace = catan.models.bank;
	var model = new catan.models.ClientModel(0);
	model.initFromServer($.noop);
	var parameter = new Object();
	parameter.playerIndex=0;
	parameter.resource="brick";

	model.useDevCard("monopoly", parameter);

	var playerRec = model.players[parameter.playerIndex].resources[parameter.resource];
	var bankRec = model.bank.resourceList[parameter.resource];
	console.log("playerRec and bank Rec are ", playerRec, " ", bankRec);
	ok(playerRec + bankRec === 24, "Unable to monopoly");
});

// test("RoadBuilder", function(){
	
	// var namespace = catan.models.bank;
	// var model = new catan.models.ClientModel(0);
	// var dev = new namespace.DevCard(model);
	// var parameter = new Object();
	// parameter.playerIndex=0;
	// var hex = new Object();
	// hex.x = 1;
	// hex.y = 2;
	// parameter.hex=hex;
	// parameter.direction="NW";

	// var before = model.players[parameter.playerIndex].roads;

	// dev.useCard("roadBuilding", parameter);

	// var after = model.players[parameter.playerIndex].roads;

	// ok(before>after, "Unable to roadbuild");
// });

// test("Soldier", function(){
	
	// var namespace = catan.models.bank;
	// var model = new catan.models.ClientModel(0);
	// model.initFromServer($.noop);
	// var parameter = new Object();
	// parameter.playerIndex=0;
	// parameter.victimIndex=1;
	// parameter.x=0;
	// parameter.y=0;
	
	// model.useDevCard("soldier", parameter);
	
	// var x = model.map.robber.x;
	// var y = model.map.robber.y;
	// console.log("x is ****************************" + x);
	// console.log("y is " + y);
	// ok(x = 0, "wrong");
	// ok(y = 0, "wrong");
	
	
// });
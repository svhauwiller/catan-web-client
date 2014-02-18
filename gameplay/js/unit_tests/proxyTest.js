test("Proxy Test: Send Chat", function(){
	var sendChatCmd = new catan.proxy.proxyCommands.SendChatCommand(0);

	var chatLine = "leverage...";

	var args = new Array();
	args.push(chatLine);

	var response = sendChatCmd.sendToProxy(args);
	var updatedModel = JSON.parse(response.responseText);

	var lastChatLine = updatedModel.chat.lines[updatedModel.chat.lines.length - 1].message;

	ok(lastChatLine === chatLine, "Send Chat Test Failure: chat line was not appended to chat list.");
});

test("Proxy Test: Roll Dice (Update Resources)", function(){
	stop();

	setTimeout(function(){
		var dieResult = 6;


		var getModelCmd = new catan.proxy.proxyCommands.GetModelCommand(0);

		var modelResp = getModelCmd.sendToProxy();

		var originalModel = JSON.parse(modelResp.responseText);

		var resourceLoc = originalModel.map.numbers[dieResult][0];
		var gridOffset = originalModel.map.hexGrid.offsets[3 + resourceLoc.y];

		var hexLocX = 3 + resourceLoc.y;
		var hexLocY = 3 + resourceLoc.x - gridOffset;

		var resToUpdate = originalModel.map.hexGrid.hexes[hexLocX][hexLocY].landtype.toLowerCase();


		var rollDiceCmd = new catan.proxy.proxyCommands.RollNumberCommand(0);

		var args = new Array();
		args.push(dieResult);

		var rollDiceResp = rollDiceCmd.sendToProxy(args);
		var updatedModel = JSON.parse(rollDiceResp.responseText);

		var lastResCnt = originalModel.players[0].resources[resToUpdate];
		var newResCnt = updatedModel.players[0].resources[resToUpdate];

		ok(newResCnt - lastResCnt !== 0, "Roll Number Test Failure: Resources not updated to reflect roll.");

		start();
	}, 100);

});

test("Proxy Test: Rob Player",function(){
	stop();

	setTimeout(function(){
		var victim = 2;
		var location = {x: 0, y: 0};


		var getModelCmd = new catan.proxy.proxyCommands.GetModelCommand(0);

		var modelResp = getModelCmd.sendToProxy();
		var originalModel = JSON.parse(modelResp.responseText);
		var oldRobberPos = originalModel.map.robber;


		var robPlayerCmd = new catan.proxy.proxyCommands.RobPlayerCommand(0);

		var args = new Array();
		args.push(victim);
		args.push(location);

		var robPlayerResp = robPlayerCmd.sendToProxy(args);
		var updatedModel = JSON.parse(robPlayerResp.responseText);
		var newRobberPos = updatedModel.map.robber;


		ok((oldRobberPos.x !== newRobberPos.x) || (oldRobberPos.y !== newRobberPos.y), "Rob Player Test Failure: Robber has not moved from last known position.");

		start();
	}, 200);
	
});

test("Proxy Test: Buy Development Card",function(){
	stop();

	setTimeout(function(){
		var buyDevCardCmd = new catan.proxy.proxyCommands.BuyDevCardCommand(0);

		var response = buyDevCardCmd.sendToProxy();
		var updatedModel = JSON.parse(response.responseText);
		var playerNewDevCards = updatedModel.players[0].newDevCards;
		var playerOldDevCards = updatedModel.players[0].oldDevCards;

		console.log("Unusable Dev Cards", playerNewDevCards);
		console.log("Usable Dev Cards", playerOldDevCards);

		ok((playerNewDevCards.monopoly > 0) || (playerOldDevCards.monopoly > 0) ||
		   (playerNewDevCards.monument > 0) || (playerOldDevCards.monument > 0) ||
		   (playerNewDevCards.roadBuilding > 0) || (playerOldDevCards.roadBuilding > 0) ||
		   (playerNewDevCards.soldier > 0) || (playerOldDevCards.soldier > 0) ||
		   (playerNewDevCards.yearOfPlenty > 0) || (playerOldDevCards.yearOfPlenty > 0) , "Buy Development Card Test Failure: Player has received no development cards.");

		start();
	}, 300);
});

test("Proxy Test: Finish Turn", function(){
	stop();

	setTimeout(function(){
		var finishTurnCmd = new catan.proxy.proxyCommands.FinishTurnCommand(0);
		var finishTurnResp = finishTurnCmd.sendToProxy();
		updatedModel = JSON.parse(finishTurnResp.responseText);
		ok(updatedModel.turnTracker.currentTurn === 1, "Finish Turn Test Failure: Failed to progress from Player 1 to Player 2");

		finishTurnCmd = new catan.proxy.proxyCommands.FinishTurnCommand(1);
		finishTurnResp = finishTurnCmd.sendToProxy();
		updatedModel = JSON.parse(finishTurnResp.responseText);
		ok(updatedModel.turnTracker.currentTurn === 2, "Finish Turn Test Failure: Failed to progress from Player 2 to Player 3");

		finishTurnCmd = new catan.proxy.proxyCommands.FinishTurnCommand(2);
		finishTurnResp = finishTurnCmd.sendToProxy();
		updatedModel = JSON.parse(finishTurnResp.responseText);
		ok(updatedModel.turnTracker.currentTurn === 3, "Finish Turn Test Failure: Failed to progress from Player 3 to Player 4");

		finishTurnCmd = new catan.proxy.proxyCommands.FinishTurnCommand(3);
		finishTurnResp = finishTurnCmd.sendToProxy();
		updatedModel = JSON.parse(finishTurnResp.responseText);
		ok(updatedModel.turnTracker.currentTurn === 0, "Finish Turn Test Failure: Failed to progress from Player 4 to Player 1");

		start();
	}, 400);
});


// test("Proxy Test: Monopoly", function(){
// 	stop();

// 	setTimeout(function(){
// 		var resource = "wheat";

// 		var monopolyCmd = new catan.proxy.proxyCommands.MonopolyCommand(0);

// 		var args = new Array();
// 		args.push(resource);

// 		var MonopolyResp = monopolyCmd.sendToProxy(args);
// 		var updatedModel = JSON.parse(MonopolyResp.responseText);
// 		var player2Cards = updatedModel.players[1].resources;
// 		var player3Cards = updatedModel.players[2].resources;
// 		var player4Cards = updatedModel.players[3].resources;

// 		devCardUsedCorrectly = (player2Cards[resource] === 0) && (player3Cards[resource] === 0) && (player4Cards[resource] === 0);
// 		devCardErrorMsg = "Monopoly Dev Card Use Failure: Resources of the type specified remain with other players.";


// 	}, 600);

// 		if((playerNewDevCards.monopoly > 0) || (playerOldDevCards.monopoly > 0)){
			
			
// 		} else if ((playerNewDevCards.monument > 0) || (playerOldDevCards.monument > 0)) {
// 			var monumentCmd = new catan.proxy.proxyCommands.MonumentCommand(0);

// 			var MonumentResp = monumentCmd.sendToProxy();
// 			var updatedModel = JSON.parse(MonumentResp.responseText);
// 			var playerMonuments = updatedModel.players[0].monuments;
// 			var playerVicPts = updatedModel.players[0].victoryPoints;

// 			devCardUsedCorrectly = (playerMonuments === 1) && (playerVicPts === 3);
// 			if(playerMonuments !== 1){
// 				devCardErrorMsg = "Monument Dev Card Use Failure: The player's monuments were not updated as a reward for use.";
// 			} else {
// 				devCardErrorMsg = "Monument Dev Card Use Failure: The player's victory points were not updated as a reward for use.";
// 			}
// 		} else if ((playerNewDevCards.roadBuilding > 0) || (playerOldDevCards.roadBuilding > 0)) {
// 			var location1 = {x: 0, y: 2, direction: "NW"};
// 			var location2 = {x: 0, y: 2, direction: "NE"};


// 			var roadBuildCmd = new catan.proxy.proxyCommands.RoadBuildingCommand(0);

// 			var args = new Array();
// 			args.push(location1);
// 			args.push(location2);

// 			var roadBuildResp = roadBuildCmd.sendToProxy(args);
// 			var updatedModel = JSON.parse(roadBuildResp.responseText);
// 			var updatedHexEdges = updatedModel.map.hexGrid.hexes[5][3].edges;


// 			devCardUsedCorrectly = (updatedHexEdges[0].value.ownerID === 0) || (updatedHexEdges[2].value.ownerID === 0);
// 			devCardErrorMsg = "Road Building Dev Card Use Failure: Roads were not found at the locations specified.";
// 		} else if ((playerNewDevCards.soldier > 0) || (playerOldDevCards.soldier > 0)) {
// 			var victim = 3;
// 			var location = {x: 1, y: -1};


// 			var getModelCmd = new catan.proxy.proxyCommands.GetModelCommand(0);

// 			var modelResp = getModelCmd.sendToProxy();
// 			var originalModel = JSON.parse(modelResp.responseText);
// 			var oldRobberPos = originalModel.map.robber;

// 			console.log("Original Robber",oldRobberPos);


// 			var soldierCmd = new catan.proxy.proxyCommands.SoldierCommand(0);

// 			var args = new Array();
// 			args.push(victim);
// 			args.push(location);

// 			var soldierResp = soldierCmd.sendToProxy(args);
// 			var updatedModel = JSON.parse(soldierResp.responseText);
// 			var newRobberPos = updatedModel.map.robber;

// 			console.log("New Game Model",updatedModel);
// 			console.log("New Robber",newRobberPos);


// 			devCardUsedCorrectly = (oldRobberPos.x !== newRobberPos.x) || (oldRobberPos.y !== newRobberPos.y);
// 			devCardErrorMsg = "Soldier Dev Card Use Failure: The robber was not moved from its last known location.";
// 		} else if ((playerNewDevCards.yearOfPlenty > 0) || (playerOldDevCards.yearOfPlenty > 0)) {
// 			var resource1 = "sheep";
// 			var resource2 = "stone";

// 			var yearOfPlentyCmd = new catan.proxy.proxyCommands.YearOfPlentyCommand(0);

// 			var args = new Array();
// 			args.push(resource1);
// 			args.push(resource2);

// 			var yearOfPlentyResp = yearOfPlentyCmd.sendToProxy(args);
// 			var updatedModel = JSON.parse(yearOfPlentyResp.responseText);
// 			var playerCards = updatedModel.players[0].resources;

// 			devCardUsedCorrectly = (playerCards[resource1] > 0) && (playerCards[resource2] > 0);
// 			devCardErrorMsg = "Year of Plenty Dev Card Use Failure: The player's resources did not contain the resources specified.";
// 		}

// 		ok(devCardUsedCorrectly, devCardErrorMsg);

// 		ok(updatedModel.players[0].playedDevCard, "Use Dev Card Test Failure: Played Dev Card flag not set.");

// 		start();
// 	}, 300);
	
// });

test("Proxy Test: Build Road", function(){
	stop();

	setTimeout(function(){
		var location = {x: 0, y: 2, direction: "NW"};

		var roadBuildCmd = new catan.proxy.proxyCommands.BuildRoadCommand(0);

		var args = new Array();
		args.push(location);
		args.push(false);

		var roadBuildResp = roadBuildCmd.sendToProxy(args);
		var updatedModel = JSON.parse(roadBuildResp.responseText);
		var updatedHexEdges = updatedModel.map.hexGrid.hexes[5][3].edges;

		ok(updatedHexEdges[0].value.ownerID === 0, "Build Road Test Failure: Road was not found at the location specified.");

		start();
	}, 1000);
	
});

test("Proxy Test: Build Settlement", function(){
	stop();

	setTimeout(function(){
		var location = {x: 0, y: 2, direction: "NW"};

		var buildSetCmd = new catan.proxy.proxyCommands.BuildSettlementCommand(0);

		var args = new Array();
		args.push(location);
		args.push(false);

		var buildSetResp = buildSetCmd.sendToProxy(args);
		var updatedModel = JSON.parse(buildSetResp.responseText);
		var updatedHexVertexes = updatedModel.map.hexGrid.hexes[5][3].vertexes;

		ok((updatedHexVertexes[1].value.ownerID === 0) && (updatedHexVertexes[1].value.worth === 1), "Build Settlement Test Failure: Settlement was not found at the location specified.");

		start();
	}, 1100);
	
});

test("Proxy Test: Build City", function(){
	stop();

	setTimeout(function(){
		var location = {x: 0, y: 2, direction: "NE"};

		var buildCityCmd = new catan.proxy.proxyCommands.BuildCityCommand(0);

		var args = new Array();
		args.push(location);
		args.push(false);

		var buildCityResp = buildCityCmd.sendToProxy(args);
		var updatedModel = JSON.parse(buildCityResp.responseText);
		var updatedHexVertexes = updatedModel.map.hexGrid.hexes[5][3].vertexes;

		ok((updatedHexVertexes[2].value.ownerID === 0) && (updatedHexVertexes[2].value.worth === 2), "Build City Test Failure: City was not found at the location specified.");

		start();
	}, 1200);
	
});

test("Proxy Test: Offer Trade", function(){
	stop();

	setTimeout(function(){
		var finishTurnCmd = new catan.proxy.proxyCommands.FinishTurnCommand(0);
		finishTurnCmd.sendToProxy();

		var offerList = {"brick": 0, "ore": 1, "sheep": 0, "wheat": 0, "wood": -1};
		var receiver = 2;

		var offerTradeCmd = new catan.proxy.proxyCommands.OfferTradeCommand(1);

		var args = new Array();
		args.push(offerList);
		args.push(receiver);

		var offerTradeResp = offerTradeCmd.sendToProxy(args);
		var updatedModel = JSON.parse(offerTradeResp.responseText);

		ok(updatedModel.tradeOffer !== undefined, "Offer Trade Test Failure: Trade Offer not posted");

		start();
	}, 1300);
});

test("Proxy Test: Accept Trade", function(){
	stop();

	setTimeout(function(){
		var acceptTradeCmd = new catan.proxy.proxyCommands.AcceptTradeCommand(2);

		var args = new Array();
		args.push(true);

		var acceptTradeResp = acceptTradeCmd.sendToProxy(args);
		var updatedModel = JSON.parse(acceptTradeResp.responseText);

		ok((updatedModel.players[1].resources.ore === 0) && (updatedModel.players[1].resources.wood === 2), "Accept Trade Test Failure: Offering Player's Resources not updated to match trade");
		ok((updatedModel.players[2].resources.ore === 1) && (updatedModel.players[2].resources.wood === 0), "Accept Trade Test Failure: Receiving Player's Resources not updated to match trade");

		start();
	}, 2000);
});

test("Proxy Test: Maritime Trade", function(){
	stop();

	setTimeout(function(){
		var ratio = 2;
		var inputResource = "wood";
		var outputResource = "ore";

		var maritimeTradeCmd = new catan.proxy.proxyCommands.MaritimeTradeCommand(1);

		var args = new Array();
		args.push(ratio);
		args.push(inputResource);
		args.push(outputResource);

		var maritimeTradeResp = maritimeTradeCmd.sendToProxy(args);
		var updatedModel = JSON.parse(maritimeTradeResp.responseText);

		console.log("Updated Model", updatedModel);

		ok((updatedModel.players[1].resources.ore === 1) && (updatedModel.players[1].resources.wood === 0), "Maritime Trade Test Failure: Player's Resources not updated to match trade");

		start();
	}, 2100);
});

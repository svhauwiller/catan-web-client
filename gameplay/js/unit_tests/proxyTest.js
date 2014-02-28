test("Proxy Test: Send Chat", function(){
	var sendChatCmd = new catan.proxy.proxyCommands.SendChatCommand(0);

	var chatLine = "leverage...";

	var args = new Array();
	args.push(chatLine);

	var response = sendChatCmd.sendToProxy(args);
	var updatedModel = JSON.parse(response.responseText);

	var lastChatLine = updatedModel.chat.lines[updatedModel.chat.lines.length - 1].message;

	equal(lastChatLine, chatLine, "Send Chat Test Failure: chat line was not appended to chat list.");
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

		notEqual(newResCnt - lastResCnt, 0, "Roll Number Test Failure: Resources not updated to reflect roll.");

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
		console.log("#####" + updatedModel);
		var newRobberPos = updatedModel.map.robber;
		console.log("****" + newRobberPos);


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
		equal(updatedModel.turnTracker.currentTurn, 1, "Finish Turn Test Failure: Failed to progress from Player 1 to Player 2");

		var rollDiceCmd = new catan.proxy.proxyCommands.RollNumberCommand(1);
		var args = new Array();
		args.push(5);
		rollDiceCmd.sendToProxy(args);

		finishTurnCmd = new catan.proxy.proxyCommands.FinishTurnCommand(1);
		finishTurnResp = finishTurnCmd.sendToProxy();
		updatedModel = JSON.parse(finishTurnResp.responseText);
		equal(updatedModel.turnTracker.currentTurn, 2, "Finish Turn Test Failure: Failed to progress from Player 2 to Player 3");

		rollDiceCmd = new catan.proxy.proxyCommands.RollNumberCommand(2);
		args = new Array();
		args.push(8);
		rollDiceCmd.sendToProxy(args);

		finishTurnCmd = new catan.proxy.proxyCommands.FinishTurnCommand(2);
		finishTurnResp = finishTurnCmd.sendToProxy();
		updatedModel = JSON.parse(finishTurnResp.responseText);
		equal(updatedModel.turnTracker.currentTurn, 3, "Finish Turn Test Failure: Failed to progress from Player 3 to Player 4");

		rollDiceCmd = new catan.proxy.proxyCommands.RollNumberCommand(3);
		args = new Array();
		args.push(9);
		rollDiceCmd.sendToProxy(args);

		finishTurnCmd = new catan.proxy.proxyCommands.FinishTurnCommand(3);
		finishTurnResp = finishTurnCmd.sendToProxy();
		updatedModel = JSON.parse(finishTurnResp.responseText);
		equal(updatedModel.turnTracker.currentTurn, 0, "Finish Turn Test Failure: Failed to progress from Player 4 to Player 1");

		rollDiceCmd = new catan.proxy.proxyCommands.RollNumberCommand(1);
		args = new Array();
		args.push(10);
		rollDiceCmd.sendToProxy(args);

		start();
	}, 400);
});

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
		var updatedPlayerData = updatedModel.players[0];

		equal(updatedHexEdges[0].value.ownerID, 0, "Build Road Test Failure: Road was not found at the location specified.");
		equal(updatedPlayerData.roads, 12, "Build Road Test Failure: Total roads remaining were not decremented.");

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
		var updatedPlayerData = updatedModel.players[0];

		equal(updatedHexVertexes[1].value.ownerID, 0, "Build Settlement Test Failure: Location specified is not controlled by building player.");
		equal(updatedHexVertexes[1].value.worth, 1, "Build Settlement Test Failure: Settlement was not found at the location specified.");
		equal(updatedPlayerData.settlements, 2, "Build Settlement Test Failure: Total settlements remaining were not decremented.");

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
		var updatedPlayerData = updatedModel.players[0];

		equal(updatedHexVertexes[2].value.ownerID, 0, "Build City Test Failure: Location specified is not controlled by building player.");
		equal(updatedHexVertexes[2].value.worth, 2, "Build City Test Failure: City was not found at the location specified.");
		equal(updatedPlayerData.cities, 3, "Build City Test Failure: Total cities remaining were not decremented.");

		start();
	}, 1200);
	
});

test("Proxy Test: Offer Trade", function(){
	stop();

	setTimeout(function(){
		var finishTurnCmd = new catan.proxy.proxyCommands.FinishTurnCommand(0);
		finishTurnCmd.sendToProxy();

		var rollDiceCmd = new catan.proxy.proxyCommands.RollNumberCommand(1);
		var args = new Array();
		args.push(4);
		rollDiceCmd.sendToProxy(args);

		var offerList = {"brick": 3, "ore": -1, "sheep": 0, "wheat": 0, "wood": 0};
		var receiver = 2;

		var offerTradeCmd = new catan.proxy.proxyCommands.OfferTradeCommand(1);

		args = new Array();
		args.push(offerList);
		args.push(receiver);

		var offerTradeResp = offerTradeCmd.sendToProxy(args);
		var updatedModel = JSON.parse(offerTradeResp.responseText);

		notEqual(updatedModel.tradeOffer, undefined, "Offer Trade Test Failure: Trade Offer not posted");

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

		equal(updatedModel.players[1].resources.ore, 3, "Accept Trade Test Failure: Offering Player did not receive requested resources");
		equal(updatedModel.players[1].resources.brick, -1, "Accept Trade Test Failure: Offering Player did not give offered resources");
		equal(updatedModel.players[2].resources.ore, 0, "Accept Trade Test Failure: Receiving Player did not give requested resources");
		equal(updatedModel.players[2].resources.brick, 4, "Accept Trade Test Failure: Receiving Player did not receive offered resources");

		start();

	}, 2000);
});

test("Proxy Test: Maritime Trade", function(){
	stop();

	setTimeout(function(){
		var finishTurnCmd = new catan.proxy.proxyCommands.FinishTurnCommand(1);
		finishTurnCmd.sendToProxy();

		var rollDiceCmd = new catan.proxy.proxyCommands.RollNumberCommand(2);
		var args = new Array();
		args.push(8);
		var beforeTrade = rollDiceCmd.sendToProxy(args);

		var ratio = 4;
		var inputResource = "brick";
		var outputResource = "ore";

		var maritimeTradeCmd = new catan.proxy.proxyCommands.MaritimeTradeCommand(2);

		args = new Array();
		args.push(ratio);
		args.push(inputResource);
		args.push(outputResource);

		try{
			var maritimeTradeResp = maritimeTradeCmd.sendToProxy(args);
			var updatedModel = JSON.parse(maritimeTradeResp.responseText);

			console.log("Updated Model", updatedModel);

			equal(updatedModel.players[2].resources.ore, 1, "Maritime Trade Test Failure: Player did not receive resources");
			equal(updatedModel.players[2].resources.brick, 0, "Maritime Trade Test Failure: Player did not give offered resources");

			start();
		} catch (ex) {
			notEqual(maritimeTradeResp.responseText.indexOf("syntatically correct command"), -1, "Maritime Trade Test Failure: Server rejected command syntax.");

			start();
		}
	}, 2100);
});

test("Proxy Test: Roll Dice (Move Robber)", function(){
	stop();

	setTimeout(function(){
		var finishTurnCmd = new catan.proxy.proxyCommands.FinishTurnCommand(2);
		finishTurnCmd.sendToProxy();

		var dieResult = 7;

		var rollDiceCmd = new catan.proxy.proxyCommands.RollNumberCommand(3);

		var args = new Array();
		args.push(dieResult);

		var rollDiceResp = rollDiceCmd.sendToProxy(args);
		var updatedModel = JSON.parse(rollDiceResp.responseText);

		console.log("updated Model",updatedModel);

		equal(updatedModel.turnTracker.status, "Discarding", "Roll Number Test Failure: Turn status does not equal \"Discarding\".");

		start();
	}, 2200);

});

test("Proxy Test: Discard Cards", function(){
	stop();

	setTimeout(function(){
		var discardList = {"brick": 0, "ore": 0, "sheep": 0, "wheat": 0, "wood": 1};

		var discCardCmd = new catan.proxy.proxyCommands.DiscardCardsCommand(2);

		args = new Array();
		args.push(discardList);

		var discCardResp = discCardCmd.sendToProxy(args);
		var updatedModel = JSON.parse(discCardResp.responseText);

		notEqual(updatedModel, undefined, "Discard Cards Test Failure: Server did not respond.");

		start();
	}, 2300);
});

test("Proxy Test: Monopoly", function(){
	stop();

	setTimeout(function(){
		var resource = "wheat";

		var monopolyCmd = new catan.proxy.proxyCommands.MonopolyCommand(3);

		var args = new Array();
		args.push(resource);

		try{
			var MonopolyResp = monopolyCmd.sendToProxy(args);
			var updatedModel = JSON.parse(MonopolyResp.responseText);
			var player1Cards = updatedModel.players[0].resources;
			var player2Cards = updatedModel.players[1].resources;
			var player3Cards = updatedModel.players[2].resources;

			equal(player1Cards[resource], 0, "Monopoly Dev Card Use Failure: Resources of the type specified remain with player 1.");
			equal(player2Cards[resource], 0, "Monopoly Dev Card Use Failure: Resources of the type specified remain with player 2.");
			equal(player3Cards[resource], 0, "Monopoly Dev Card Use Failure: Resources of the type specified remain with player 3.");
		
			start();
		} catch (ex) {
			notEqual(MonopolyResp.responseText.indexOf("syntatically correct command"), -1, "Monopoly Dev Card Use Failure: Server rejected command syntax.");

			start();
		}

	}, 2400);
});

test("Proxy Test: Monument", function(){
	stop();

	setTimeout(function(){
		var monumentCmd = new catan.proxy.proxyCommands.MonumentCommand(3);

		try{
			var MonumentResp = monumentCmd.sendToProxy();
			var updatedModel = JSON.parse(MonumentResp.responseText);
			var playerMonuments = updatedModel.players[3].monuments;
			var playerVicPts = updatedModel.players[3].victoryPoints;

			equal(playerVicPts, 3, "Monument Dev Card Use Failure: The player's victory points were not updated as a reward for use.");

			start();
		} catch (ex) {
			notEqual(MonumentResp.responseText.indexOf("syntatically correct command"), -1, "Monument Dev Card Use Failure: Server rejected command syntax.");

			start();
		}
	}, 2500);
});

test("Proxy Test: Road Building", function(){
	stop();

	setTimeout(function(){
		var location1 = {x: 0, y: 2, direction: "NW"};
		var location2 = {x: 0, y: 2, direction: "NE"};

		var roadBuildCmd = new catan.proxy.proxyCommands.RoadBuildingCommand(3);

		var args = new Array();
		args.push(location1);
		args.push(location2);

		try{
			var roadBuildResp = roadBuildCmd.sendToProxy(args);
			var updatedModel = JSON.parse(roadBuildResp.responseText);
			var updatedHexEdges = updatedModel.map.hexGrid.hexes[5][3].edges;

			equal(updatedHexEdges[0].value.ownerID, 3, "Road Building Dev Card Use Failure: Road at the NW edge not owned by the player.");
			equal(updatedHexEdges[2].value.ownerID, 3, "Road Building Dev Card Use Failure: Road at the NW edge not owned by the player.");

			start();
		} catch (ex) {
			notEqual(roadBuildResp.responseText.indexOf("syntatically correct command"), -1, "Road Building Dev Card Use Failure: Server rejected command syntax.");

			start();
		}
	}, 2600);
});


test("Proxy Test: Soldier", function(){
	stop();

	setTimeout(function(){
		var victim = 0;
 		var location = {x: 0, y: 2};

 		var soldierCmd = new catan.proxy.proxyCommands.SoldierCommand(3);

		var args = new Array();
		args.push(victim);
		args.push(location);

		try{
			var soldierResp = soldierCmd.sendToProxy(args);
			var updatedModel = JSON.parse(soldierResp.responseText);
			var newRobberPos = updatedModel.map.robber;

			notEqual(newRobberPos, undefined, "Soldier Dev Card Use Failure: Robber position is not defined.");

			start();
		} catch (ex) {
			notEqual(soldierResp.responseText.indexOf("syntatically correct command"), -1, "Soldier Dev Card Use Failure: Server rejected command syntax.");

			start();
		}
	}, 2700);
});


test("Proxy Test: Year of Plenty", function(){
	stop();

	setTimeout(function(){
		var resource1 = "sheep";
		var resource2 = "stone";

		var yearOfPlentyCmd = new catan.proxy.proxyCommands.YearOfPlentyCommand(3);

		var args = new Array();
		args.push(resource1);
		args.push(resource2);

		try{
			var yearOfPlentyResp = yearOfPlentyCmd.sendToProxy(args);
			var updatedModel = JSON.parse(yearOfPlentyResp.responseText);
			var playerCards = updatedModel.players[3].resources;
			notEqual(playerCards[resource1], 0, "Year of Plenty Dev Card Use Failure: The player's resources did not contain " + resource1);
			notEqual(playerCards[resource2], 0, "Year of Plenty Dev Card Use Failure: The player's resources did not contain " + resource2);

			start();
		} catch (ex) {
			notEqual(yearOfPlentyResp.responseText.indexOf("syntatically correct command"), -1, "Year of Plenty Dev Card Use Failure: Server rejected command syntax.");

			start();
		}
	}, 2700);
});
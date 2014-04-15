test("Model Initialization", function(){
	var model = new catan.models.ClientModel(0);

	equal(model.biggestArmy, null, "Biggest Army variable not declared");
	equal(model.biggestArmySize, 0, "Biggest Army Size has a value");
	equal(model.longestRoad, null, "Longest Road variable not declared");
	equal(model.longestRoadSize, 0, "Longest Road Size has a value");
	equal(model.winner, null, "Winner variable not declared");

});

test("Init Model From Server", function(){
	$.ajax({
		async: false,
		type: "GET",
		url: "/game/reset"
	})

	model.initFromServer($.noop);

	model.bank = new catan.models.bank.Bank();
	model.biggestArmy=null;
	model.biggestArmySize=0;
	model.chat = new catan.models.utilities.MessageList();
	model.devCard = new catan.models.bank.DevCard(this);
	model.log = new catan.models.utilities.MessageList();
	model.longestRoad = null;
	model.longestRoadSize = 0;
	model.map = new catan.models.Map.Map();
	model.orderNumbers = new Object();
	model.playerID = playerID;
	model.players = new Object();
	model.players[playerID] = new catan.models.Player();
	model.proxy = new catan.proxy.Proxy("", playerID);
	model.state = new catan.models.State();
	model.tradeOffer = new catan.models.utilities.TradeOffer();
	model.turnTracker = new catan.models.utilities.TurnTracker();
	model.winner = null;
});
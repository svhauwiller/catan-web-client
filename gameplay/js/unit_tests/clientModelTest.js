test("Model Initialization", function(){
	var model = new catan.models.ClientModel(0);
	console.log(model);
	ok(model.initFromServer(function(){ console.log("Initialization Complete"); }) === true, "Unable to Initialize Model");

	var cards = new catan.models.bank.ResourceList("player");
	cards.wood++;
	cards.sheep++;
	model.discardCards(cards);

	model.sendChat("hello!");

	//model.rollDice();

	//model.buildRoad();
	//model.buildSettlement();
	//model.buildCity();

	//model.buyDevCard();

	//model.offerTrade();
	//model.acceptTrade();



});
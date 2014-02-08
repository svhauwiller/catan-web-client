
test("Year of Plenty", function(){
	var namespace = catan.models.bank;
	var dev = namespace.DevCard(catan.model);
	parameter = new Object();
	parameter.resource1="brick";
	parameter.resource2="ore";
	parameter.playerIndex=1;

	var beforeCount = catan.model.bank.resourceList.brick;
	var beforeCountO = catan.model.bank.resourceList.ore;

	dev.useCard("yearOfPlenty", parameter);

	var afterCount = catan.model.bank.resourceList.brick;
	var afterCount0 = catan.model.bank.resourceList.ore;

	ok(beforeCount > afterCount, "Unable to year of plenty");
});
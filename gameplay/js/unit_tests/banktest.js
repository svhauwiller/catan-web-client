
test("Year of Plenty", function(){

	var namespace = catan.models.bank;
	console.log(namespace);

	var model = new catan.models.ClientModel(1);
	console.log("this never happens" + model);
	var dev = new namespace.DevCard(model);
	var parameter = new Object();
	parameter.resource1="brick";
	parameter.resource2="ore";
	parameter.playerIndex=1;

	var bank_object = new namespace.Bank();
	console.log(bank_object);
	console.log(parameter);

	var beforeCount = bank_object.resourceList.brick;
	var beforeCountO = bank_object.resourceList.ore;

	dev.useCard("yearOfPlenty", parameter);

	var afterCount = catan.model.bank.resourceList.brick;
	var afterCount0 = catan.model.bank.resourceList.ore;

	ok(beforeCount > afterCount, "Unable to year of plenty");
});
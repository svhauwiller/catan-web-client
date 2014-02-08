
test("Year of Plenty", function(){

	var namespace = catan.models.bank;

	var model = new catan.models.ClientModel(0);
	var dev = new namespace.DevCard(model);
	var parameter = new Object();
	parameter.resource1="ore";
	parameter.resource2="wheat";
	parameter.playerIndex=0;

	var bank_object = new namespace.Bank();

	var beforeCount = model.bank.resourceList[parameter.resource1];
	var beforeCountO = model.bank.resourceList[parameter.resource2];

	dev.useCard("yearOfPlenty", parameter);

	var afterCount = model.bank.resourceList[parameter.resource1];
	var afterCount0 = model.bank.resourceList[parameter.resource2];

	console.log("Comparison is " + beforeCount + " " + afterCount);
	ok(beforeCount > afterCount, "Unable to year of plenty");
});

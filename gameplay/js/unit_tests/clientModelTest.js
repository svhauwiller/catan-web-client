test("Model Initialization", function(){
	var model = new catan.models.ClientModel(0);
	console.log(model);
	ok(model.initFromServer(function(){ console.log("Initialization Complete"); }) === true, "Unable to Initialize Model");
	var r1 = new catan.models.bank.ResourceList("player");
	var r2 = new catan.models.bank.ResourceList("player");
	r1.wood++;
	r2.wheat++;

	model.sendChat("hello!");
});
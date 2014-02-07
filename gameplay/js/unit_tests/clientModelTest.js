test("Model Initialization", function(){
	var model = new catan.models.ClientModel(0);
	console.log(model);
	ok(model.initFromServer(function(){ console.log("Initialization Complete"); }) === true, "Unable to Initialize Model");
});
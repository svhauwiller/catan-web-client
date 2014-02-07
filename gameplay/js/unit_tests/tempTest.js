test("Test Running", function(){
	ok(1 == "1", "Basic Failure");
});

test("messageLine Creation", function(){
	var namespace = catan.models.messy();
	var s = new namespace.messageLine();
	var mess = "";
	ok(s.getMessage()==mess, "Unable to create empty messageLine");
});
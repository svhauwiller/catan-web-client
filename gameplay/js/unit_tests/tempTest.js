test("Test Running", function(){//how a test works
	ok(1 == "1", "Basic Failure");
});

test("messageLine Creation", function(){//testing class
	var namespace = catan.models.messy();
	var s = new namespace.messageLine();
	var mess = "";
	ok(s.getMessage()==mess, "Unable to create empty messageLine");
});
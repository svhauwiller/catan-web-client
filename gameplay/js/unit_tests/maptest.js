test("Test Running", function(){//how a test works
	ok(1 == "1", "Basic Success", "Basic Failure");
});

test("Update From Client Model", function(){
	console.log("Update From Client Model test");
	var isUpdated = true;
	var model = new catan.models.ClientModel(0);
	model.initFromServer(function(){ console.log("Initialization Complete"); });
	var numberChits = new Array();
	numberChits[0] = 2;
	numberChits[1] = 3;
	numberChits[2] = 4;
	numberChits[3] = 5;
	numberChits[4] = 6;
	numberChits[5] = 8;
	numberChits[6] = 9;
	numberChits[7] = 10;
	numberChits[8] = 11;
	numberChits[9] = 12;

	for(var a = 0; a < numberChits.length; a++){
		if(model.map.numbers[numberChits[a]] == undefined){
			isUpdated = false;		
		}
		else if(model.map.numbers[numberChits[a]].length != 1 &&
				model.map.numbers[numberChits[a]].length != 2){
			isUpdated = false;				
		}
	}

	for(var b = 0; b < model.map.ports.length; b++){
		if(model.map.ports[b] == undefined){
			isUpdated = false;		
		}
		else{
			if(model.map.ports[b].location == undefined){
				isUpdated = false;
			}
			else if(model.map.ports[b].orientation != "N" &&
					model.map.ports[b].orientation != "NE" &&
					model.map.ports[b].orientation != "E" &&
					model.map.ports[b].orientation != "SE" &&
					model.map.ports[b].orientation != "S" &&
					model.map.ports[b].orientation != "SW" &&
					model.map.ports[b].orientation != "W" &&
					model.map.ports[b].orientation != "NW"){
				isUpdated = false;
			}
			else if(model.map.ports[b].ratio < -1){ // this test may not be sufficient
				isUpdated = false;
			}
			else if(model.map.ports[b].validVertex1.direction != "N" &&
					model.map.ports[b].validVertex1.direction != "NE" &&
					model.map.ports[b].validVertex1.direction != "E" &&
					model.map.ports[b].validVertex1.direction != "SE" &&
					model.map.ports[b].validVertex1.direction != "S" &&
					model.map.ports[b].validVertex1.direction != "SW" &&
					model.map.ports[b].validVertex1.direction != "W" &&
					model.map.ports[b].validVertex1.direction != "NW"){
				isUpdated = false;
			}
			else if(model.map.ports[b].validVertex2.direction != "N" &&
					model.map.ports[b].validVertex2.direction != "NE" &&
					model.map.ports[b].validVertex2.direction != "E" &&
					model.map.ports[b].validVertex2.direction != "SE" &&
					model.map.ports[b].validVertex2.direction != "S" &&
					model.map.ports[b].validVertex2.direction != "SW" &&
					model.map.ports[b].validVertex2.direction != "W" &&
					model.map.ports[b].validVertex2.direction != "NW"){
				isUpdated = false;
			}
		}
	}
	if(model.map.radius != 4){
		isUpdated = false;	
	}
	if(model.map.robber == undefined){
		isUpdated = false;	
	}

	console.log(model.map);
	ok(isUpdated == true, "Passed", "Failed");
});

test("Can Place Road", function(){
	console.log("Can Place Road test");
	var model = new catan.models.ClientModel(0);
	model.initFromServer(function(){ console.log("Initialization Complete"); });
	console.log("here");
	//console.log(model.map.robber);
	var playerID = 0;	
	var hexLoc = new catan.models.hexgrid.HexLocation(2, 0);
	var edgeDirection = "NW";
	var canPlaceRoad = model.map.canPlaceRoad(playerID, hexLoc, edgeDirection);
	console.log(canPlaceRoad);
	ok(canPlaceRoad == true, "Can Build", "Cannot Build");
});

/*test("Get Roll Resources", function(){
	console.log("Get Robber Victims test");
	var model = new catan.models.ClientModel(0);
	model.initFromServer(function(){ console.log("Initialization Complete"); });
	console.log("here");
	//console.log(model.map.robber);
	var rewardsList = model.map.getResourcesFromRoll(6);
	console.log(rewardsList);
	ok(0 == "0", "The End");
});*/


/*test("Get Robber Victims", function(){
	console.log("Get Robber Victims test");
	var model = new catan.models.ClientModel(0);
	model.initFromServer(function(){ console.log("Initialization Complete"); });
	console.log("here");
	//console.log(model.map.robber);
	var rewardsList = model.map.getRobberVictims();
	console.log(rewardsList);
	ok(0 == "0", "The End");
});*/
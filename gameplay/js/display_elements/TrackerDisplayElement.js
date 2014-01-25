var catan = catan || {};
catan.definitions = catan.definitions || {};

catan.definitions.DisplayElement.TurnTrackerPlayerElement = (function(){
	var Definitions = catan.definitions;
	var Basics = catan.definitions.DisplayElement.BasicElements;
                
	var TurnTrackerPlayerElement = function(name, color){
		this.setColor(color);
		this.setName(name);
		this.setView(this.buildView());
	}
	core.defineProperty(TurnTrackerPlayerElement.prototype, "ArmyElem");//
	core.defineProperty(TurnTrackerPlayerElement.prototype, "RoadElem");//
	core.defineProperty(TurnTrackerPlayerElement.prototype, "DisplayElem");//
	core.defineProperty(TurnTrackerPlayerElement.prototype, "ScoreElem");//
	core.defineProperty(TurnTrackerPlayerElement.prototype, "Color");//
	core.defineProperty(TurnTrackerPlayerElement.prototype, "Name");//
	core.defineProperty(TurnTrackerPlayerElement.prototype, "View");
                
	TurnTrackerPlayerElement.prototype.setHighlight = function(highlight){
		var highlightColor = Definitions.ColorDefs[this.getColor()+"Outline"];
		if(highlight)
			this.getDisplayElem().setAttribute("style","border: 3px solid "+ highlightColor);
		else
			this.getDisplayElem().setAttribute("style","border:3px solid white");
	}
	TurnTrackerPlayerElement.prototype.setScore = function(amount){
		this.getScoreElem().setAttribute("value", amount);
	}
	TurnTrackerPlayerElement.prototype.setLargestArmy = function(wonArmy){
		if(wonArmy)
			this.getArmyElem().disabled = false;
		else
			this.getArmyElem().disabled = true;
	}
	TurnTrackerPlayerElement.prototype.setLongestRoad = function(wonRoad){
		if(wonRoad)
			this.getRoadElem().disabled = false;
		else
			this.getRoadElem().disabled = true;
	}
	TurnTrackerPlayerElement.prototype.buildView= function(){
		var mainDiv = document.createElement("div");
			mainDiv.setAttribute("class", "tracker-player-box "+this.getColor());
						
		var nameLabel = new Basics.Label("tracker-name-label",this.getName());
			mainDiv.appendChild(nameLabel);
		var armyImg = new Basics.InteractiveImage("armyAward", "tracker-award-img");
			armyImg.readOnly = true;
			mainDiv.appendChild(armyImg);
			this.setArmyElem(armyImg);
		var roadImg = new Basics.InteractiveImage("roadAward","tracker-award-img");
			roadImg.readOnly = true;
			mainDiv.appendChild(roadImg);
			this.setRoadElem(roadImg);
		var scoreLabel = new Basics.Label("tracker-score-label");
			mainDiv.appendChild(scoreLabel);
			this.setScoreElem(scoreLabel);
					
		this.setLongestRoad(false);
		this.setLargestArmy(false);
		
		this.setDisplayElem(mainDiv);
		return mainDiv;
	}
                
	return TurnTrackerPlayerElement;
      
}());


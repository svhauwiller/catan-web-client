var catan = catan || {};
catan.models = catan.models || {};

catan.models.State  = (function stateNameSpace(){

	var State = (function StateClass(){
		core.defineProperty(State.prototype,"state");
		
		function State(){
			this.currentModel = null;
			this.observers = new Array();
			//this.state = "setup";
			this.setState("setup");
		}

		State.prototype.addObserver = function(observer) {
			this.observers.push(observer);
			observer.updateFromModel();
		};

		State.prototype.isNew = function(clientModel) {
			return JSON.stringify(clientModel) !== JSON.stringify(this.currentModel);
		};

		State.prototype.updateModel = function(clientModel) {
			console.log("updateModel");
			console.log(this.observers);
		   	this.currentModel = clientModel;
		   	this.notifyObservers();
		};

		State.prototype.notifyObservers = function() {
			this.observers.forEach(function(observer){
				observer.updateFromModel();
			})
		};

		return State;
	}());	
	
	return State;
}());

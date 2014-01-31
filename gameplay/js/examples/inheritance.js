var catan = catan || {};
catan.examples = catan.examples || {};

catan.examples.inheritEx = (function inheritanceExampleNamespace(){ //Namespace Declaration (Initialization)

	var ExampleParent = (function exampleParentClass(){ //Parent Class Declaration (Initialization)

		function ExampleParent(xValue, yValue){
			this.x = xValue;
			this.y = yValue;
		}

		ExampleParent.prototype.add = function(){
			return this.x + this.y;
		}

		ExampleParent.prototype.multiply = function(){
			return this.x * this.y;
		}

		return ExampleParent; //Parent Class Declaration (Package up and return)
	}());

	var ExampleChild = (function exampleChildClass(){ //Child Class Declaration (Initialization)
		core.forceClassInherit(ExampleChild, ExampleParent);

		function ExampleChild(xValue, yValue, zValue){

			// Calling super-class constructor
			ExampleParent.call(this, xValue, yValue);

			this.z = zValue;
		}

		ExampleChild.prototype.add = function(){
			// Calling super-class method
			var subResult = ExampleParent.prototype.add.call(this);

			return subResult + this.z;
		}

		ExampleChild.prototype.multiply = function(){
			// Calling super-class method
			var subResult = ExampleParent.prototype.multiply.call(this);

			return subResult * this.z;
		}

		return ExampleChild; //Child Class Declaration (Package up and return)
	}());

	return { //Namespace Declaration (Package up and return)
		ExampleParent: ExampleParent,
		ExampleChild: ExampleChild
	}	
}());
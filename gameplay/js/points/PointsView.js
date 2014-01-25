var catan = catan || {};
catan.points = catan.points || {};
catan.points.View = catan.points.View || {};

/**
    This is the namespace for point display
    @module catan.points
    @namespace points
*/

catan.points.View = (function VPTracker_namespace(){
	var Definitions= catan.definitions;
	var DisplayElement = catan.definitions.DisplayElement;
	var Images = catan.definitions.MiscImages;
	var MAX_POINTS = 10;
	var NULL_POINTS = 0
	
	/**
		 This class provides a victory point tracker view 
		 @class PointView
		 @constructor
    */
	var PointView = (function(){
		
		function PointView(){
			this.setTotalPoints(NULL_POINTS);
			this.setDisplayElems([]);
			this.buildView();
		};
		core.defineProperty(PointView.prototype, "TotalPoints");
		core.defineProperty(PointView.prototype, "DisplayElems");
		
		/*
		 adds empty elements to the parent element to display points
		 @method buildView
		 */
		PointView.prototype.buildView = function(){
			var parent = document.getElementById(Definitions.PageViewIDs.pointsArea);
			
			for (var vpcounter = 0; vpcounter < MAX_POINTS; vpcounter++){
				var pointElem = new DisplayElement.PointElement();
					parent.appendChild(pointElem.getView());
					this.getDisplayElems().push(pointElem);
			}
		}
		
		/**
		 Sets the number of points the player has
		 @method setPoints
		 @param {integer} points The number of points the player has
		 */
		PointView.prototype.setPoints = function(points){
			this.setTotalPoints(points);
			updateView.call(this);
		};
		
		var updateView = function(){
			for (var vpCounter = 0; vpCounter < MAX_POINTS; vpCounter++){
				if (vpCounter < this.getTotalPoints())
					this.getDisplayElems()[vpCounter].show();
				else 
					this.getDisplayElems()[vpCounter].hide();
			}
		}	
		
		return PointView;
	}());
	
	return PointView;
}());


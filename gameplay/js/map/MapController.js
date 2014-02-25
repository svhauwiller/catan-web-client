/**
	This this contains interfaces used by the map and robber views
	@module catan.map
	@namespace map
*/

var catan = catan || {};
catan.map = catan.map || {};

catan.map.Controller = (function catan_controller_namespace() {
	
    var EdgeLoc = catan.map.View.EdgeLoc;
	var VertexLoc = catan.map.View.VertexLoc;
	var PortLoc = catan.map.View.PortLoc;
    
	var HexLocation = catan.models.hexgrid.HexLocation;
	var VertexLocation = catan.models.hexgrid.VertexLocation;
	var EdgeLocation= catan.models.hexgrid.EdgeLocation;
	var VertexDirection = catan.models.hexgrid.VertexDirection;
	var EdgeDirection= catan.models.hexgrid.EdgeDirection;   

	var MapController = (function main_controller_class() {
    
 		core.forceClassInherit(MapController,catan.core.BaseController);
        
		core.defineProperty(MapController.prototype,"robView");
		core.defineProperty(MapController.prototype,"modalView");
        
        /**
		 * @class MapController
		 * @constructor
		 * @param {MapView} view - The initialized map view
		 * @param {MapOverlay} modalView - The overlay to use for placing items on the board.
		 * @param {ClientModel} model - The client model
		 * @param {RobberOverlay} robView - The robber overlay to be used when the robber is being placed.  This is undefined for the setup round.
		 */
		function MapController(view, modalView, model, robView){
			catan.core.BaseController.call(this,view,model);
			this.setModalView(modalView);
			this.setRobView(robView);
			this.initFromModel();

			// var hexType = getHexType(hex);
			// this.getView().addHex(hex.getLocation(), hexType);
		}

		MapController.prototype.getRotationIndex = function(orientation) {
			switch(orientation){
				case "NW":
					return 0;
					break;
				case "N":
					return 1;
					break;
				case "NE":
					return 2;
					break;
				case "SE":
					return 3;
					break;
				case "S":
					return 4;
					break;
				case "SW":
					return 5;
					break;
				default:
					return -1;
					break;
			}
		};

		MapController.prototype.initFromModel = function() {
			var _this = this;

			var hexGrid = this.getClientModel().map.hexGrid;
			var chitNums = this.getClientModel().map.numbers;
			var ports = this.getClientModel().map.ports;
			var robberLoc = this.getClientModel().map.robber;
			var playerData = this.getClientModel().players;
			var orderNumbers = this.getClientModel().orderNumbers;

			var landType;
			var resourceType;
			var portLocation;
			var playerColor;

			hexGrid.getHexes().forEach(function(hex){
				if(hex.isLand){
					landType = hex.getLandType() ? hex.getLandType().toLowerCase() : "desert";
					_this.getView().addHex(hex.location, landType);
				} else {
					_this.getView().addHex(hex.location, "water");
				}

				hex.edges.forEach(function(edge){
					if(edge.isOccupied() && edge.location.getDirection() > 2){
						playerColor = playerData[orderNumbers[edge.getOwner()]].color;
						_this.getView().placeRoad(edge.location, playerColor);
					}
				});

				hex.vertexes.forEach(function(vert){
					if(vert.isOccupied() && (vert.location.getDirection() === 0 || vert.location.getDirection() === 3)){
						playerColor = playerData[orderNumbers[vert.getOwner()]].color;
						if(vert.getWorth() === 1){
							_this.getView().placeSettlement(vert.location, playerColor);
						} else {
							_this.getView().placeCity(vert.location, playerColor);
						}
					}
				});
			});

			for(var num in chitNums){
				chitNums[num].forEach(function(chitLoc){
					_this.getView().addNumber(chitLoc, num);
				})
			}

			ports.forEach(function(port){
				portLocation = port.location;
				portLocation.rotation = _this.getRotationIndex(port.orientation);
				resourceType = port.inputResource ? port.inputResource.toLowerCase() : "three";
				_this.getView().addPort(portLocation, resourceType);
			});

			this.getView().placeRobber(robberLoc);

			this.updateFromModel();
		};

		MapController.prototype.updateFromModel = function() {
			this.getView().drawPieces();
		};

        
        /**
		 This method is called by the Rob View when a player to rob is selected via a button click.
		 @param {Integer} orderID The index (0-3) of the player who is to be robbed
		 @method robPlayer
		*/
		MapController.prototype.robPlayer = function(orderID){
		}
        
        /**
		 * Starts the robber movement on the map. The map should pop out and the player should be able
         * move the robber.  This is called when the user plays a "solider" development card.
		 * @method doSoldierAction
		 * @return void
		**/		
		MapController.prototype.doSoldierAction = function(){    
			console.log("soldier is doing his action");
		}
        
		/**
		 * Pops the map out and prompts the player to place two roads.
         * This is called when the user plays a "road building" progress development card.
		 * @method startDoubleRoadBuilding
		 * @return void
		**/	
		MapController.prototype.startDoubleRoadBuilding = function(){
			console.log("double road building");
			this.modalView.showModal("Road");
			this.View.startDrop("road", this.ClientModel.players[this.ClientModel.playerID].color);
		}
		
        
        /**
		 * Pops the map out and prompts the player to place the appropriate piece
         * @param {String} pieceType - "road", "settlement", or "city
         * @param {boolean} free - Set to true in road building and the initial setup
         * @param {boolean} disconnected - Whether or not the piece can be disconnected. Set to true only in initial setup
		 * @method startMove
		 * @return void
		**/	
		MapController.prototype.startMove = function (pieceType,free,disconnected){
			if(!free && !disconnected){
				if(pieceType == "Road"){
					this.modalView.showModal("Road");
					this.View.startDrop("road", this.ClientModel.players[this.ClientModel.playerID].color);
					/*if(free){
						free = false;
						this.startMove("road",false,false);
					}*/
				}
				else if(pieceType == "Settlement"){
					console.log("()@*#&$)(*@^#$)*(@^#$()*#@$");
					this.modalView.showModal("Settlement");
					this.View.startDrop("settlement", this.ClientModel.players[this.ClientModel.playerID].color);
					
					/*if(free){
						
						free = false;
						this.startMove("road",false,false);
					}*/
				}
				else if(pieceType == "City"){
					this.modalView.showModal("City");
					this.View.startDrop("city", this.ClientModel.players[this.ClientModel.playerID].color);
				}
				else{ // idk, maybe robber?
				}
			}
			else{
				
			}
			//console.log(this.ClientModel);

			
			
			//this.modalView.closeModal();
		};
        
		/**
		 * This method is called from the modal view when the cancel button is pressed. 
		 * It should allow the user to continue gameplay without having to place a piece. 
		 * @method cancelMove
		 * @return void
		 * */
		MapController.prototype.cancelMove = function(){
		}

		/**
		 This method is called whenever the user is trying to place a piece on the map. 
         It is called by the view for each "mouse move" event.  
         The returned value tells the view whether or not to allow the piece to be "dropped" at the current location.

		 @param {MapLocation} loc The location being considered for piece placement
		 @param {String} type The type of piece the player is trying to place ("robber","road","settlement","city")
		 @method onDrag
		 @return {boolean} Whether or not the given piece can be placed at the current location.
		*/
		MapController.prototype.onDrag = function (loc, type) {
			//console.log("drag");
			//console.log(loc);
			//console.log(type);
			// call canPlaceRoad
			var hoverOverHexLoc = new catan.models.hexgrid.HexLocation(loc.x, loc.y);
			var hoverOverHex = this.ClientModel.map.hexGrid.getHex(hoverOverHexLoc);
			console.log(hoverOverHex);
			if(hoverOverHex != undefined){
				if(this.ClientModel.map.canPlaceRoad(this.ClientModel.playerID, hoverOverHex, loc.dir)){
					return true;
				}
				else{
					return false;
				}
			}
			
		};

		/**
		 This method is called when the user clicks the mouse to place a piece.
         This method should close the modal and possibly trigger the Rob View.

		 @param {MapLocation} loc The location where the piece is being placed
		 @param {String} type The type of piece being placed ("robber","road","settlement","city")
		 @method onDrop
		*/
		MapController.prototype.onDrop = function (loc, type) {
			console.log("drop");
			this.modalView.closeModal();
			var hexLoc = new catan.models.hexgrid.HexLocation(loc.x, loc.y);
			if(type == "road"){
				this.ClientModel.buildRoad(hexLoc, loc.dir, false);
			}
			else if(type == "settlement"){
				this.ClientModel.buildSettlement(hexLoc, loc.dir, false);
			}
			else if(type == "settlement"){
				this.ClientModel.buildCity(hexLoc, loc.dir, false);
			}
			//this.startMove("Road", true, true);
		};
        
		return MapController;
	} ());

	return MapController;

} ());


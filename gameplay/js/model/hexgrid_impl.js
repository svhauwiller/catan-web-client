//STUDENT-EDITABLE-BEGIN   
var catan = catan || {};
catan.models = catan.models || {};

/**
    This module contains the map
    
    @module     catan.models
    @namespace models
*/

catan.models.Map = (function mapNameSpace(){
        var hexgrid = catan.models.hexgrid;
        var Map = (function Map_Class(){
        /**
        * Map class
        * <pre>
        * </pre>
        *
        * @class Map
        * @constructor
        */
        
        /**
        * The grid of Hexes
        * @property hexGrid
        * @type {HexGrid}
        */
        /**
        * The location of the hex
        * @property numbers
        * @type {Array of HexLocations}
        */
        /**
        * The list of ports on the map
        * @property ports
        * @type {Array of Ports}
        /**
        * The radius of the map
        * @property radius
        * @type {integer}
        */
        /**
        * The location of the Robber token
        * @property robber
        * @type {HexLocation}
        */
        
        function Map(){
            this.numbers = new Array();
            this.ports = new Array();
            this.radius = 4;
            this.robber = new hexgrid.HexLocation(0, 0);
            this.hexGrid = hexgrid.HexGrid.getRegular(this.radius, CatanHex);
        };
        
		/**
		* @method update
		* @param {Object} newMap - A copy of the new map that has updated information
		* */
		
        Map.prototype.update = function(newMap){
            var hexes = this.hexGrid.getHexes();

            hexes.forEach(function(hex){
                var gridOffset = newMap.hexGrid.offsets[3 + hex.getLocation().getY()];

                var row = 3 + hex.getLocation().getY();
                var col = 3 + hex.getLocation().getX() - gridOffset;

                hex.update(newMap.hexGrid.hexes[row][col]);
            });

            this.numbers = newMap.numbers;
            this.ports = newMap.ports;
            this.radius = newMap.radius;
            this.robber = new hexgrid.HexLocation(newMap.robber.x, newMap.robber.y);
        };
    
		/**
		* @method canPlaceRoad
		* @param {int} playerID - The id of the current player
		* @param {Hex} hex - The hex on which the player wants to build
		* @param {int} theDirection - The direction of the selected edge on the hex
		* @return {boolean} Whether or not the current player can build a road in the selected location
		* */
        Map.prototype.canPlaceRoad = function(playerID, hex, theDirection){
            var hexgrid = catan.models.hexgrid;
            var dirIndex = hexgrid.EdgeDirection[theDirection];
            var neighborVertexes = hex.edges[dirIndex].location.getNeighborVertexes();
            var connectedEdges = hex.edges[dirIndex].location.getConnectedEdges();

            if(hex.edges[dirIndex].getOwner() !== -1){
                return false;
            }

            //HAS A NEIGHBORING VERTEX
            for(var i = 0; i < neighborVertexes.length; i++){
                var ownerLoc = new hexgrid.HexLocation(neighborVertexes[i].x, neighborVertexes[i].y);
                var ownerHex = this.hexGrid.getHex(ownerLoc);
                if(ownerHex.vertexes[neighborVertexes[i].direction].getOwner() === playerID){
                    return true;
                }
            }

            //HAS A NEIGHBORING ROAD
            for(var i = 0; i < connectedEdges.length; i++){
                var ownerLoc = new hexgrid.HexLocation(connectedEdges[i].x, connectedEdges[i].y);
                var ownerHex = this.hexGrid.getHex(ownerLoc);
                if(ownerHex.edges[connectedEdges[i].direction].getOwner() === playerID){
                    return true;
                }
            }

            return false;
        };
        
		/**
		* @method canPlaceSettlement
		* @param {int} playerID - The id of the current player
		* @param {Hex} hex - The hex on which the player wants to build
		* @param {int} theDirection - The direction of the selected vertex on the hex
		* @return {boolean} Whether or not the current player can build a settlement in the selected location
		* */
		Map.prototype.canPlaceSettlement = function(playerID, hex, theDirection){
			var hexgrid = catan.models.hexgrid;
			var dirIndex = hexgrid.VertexDirection[theDirection];    	
			var connectedEdges = hex.getVertex(dirIndex).location.getConnectedEdges();
			
			// if vertex is occupied
			if(hex.getVertex(dirIndex).getOwner()!==-1){
				return false;
			}
			
			var ownConnectedEdge = false;
			
			// check if an connected edge's owner id is equal to its own
			for(var i = 0; i < connectedEdges.length; i++){
				var myHexLoc = new catan.models.hexgrid.HexLocation(connectedEdges[i].x,connectedEdges[i].y);
				var myHex = this.hexGrid.getHex(myHexLoc);
				if(myHex.getEdge(connectedEdges[i].direction).ownerID === playerID){
					ownConnectedEdge = true;
				}
			}
			if(!ownConnectedEdge){
				return false;
			}
			
			// check that all other vertices around it
			for(var i = 0; i < connectedEdges.length; i++){
				var myHexLoc = new catan.models.hexgrid.HexLocation(connectedEdges[i].x,connectedEdges[i].y);
				var myHex = this.hexGrid.getHex(myHexLoc);
				var neighborVertexes = myHex.edges[connectedEdges[i].direction].location.getNeighborVertexes();
				for(var j = 0; j < 2; j++){
					var aHexLoc = new catan.models.hexgrid.HexLocation(neighborVertexes[j].x,neighborVertexes[j].y);
					var aHex = this.hexGrid.getHex(aHexLoc);
					if(aHex.getVertex(neighborVertexes[j].direction).ownerID !== -1){
						return false;
					}
				}
			}
			return true;
		};
		
		/**
		* @method canSetupSettlement
		* @param {int} playerID - The id of the current player
		* @param {Hex} hex - The hex on which the player wants to build
		* @param {int} theDirection - The direction of the selected vertex on the hex
		* @return {boolean} Whether or not the current player can build a settlement in the selected location
		* */
		Map.prototype.canSetupSettlement = function(playerID, hex, theDirection){  
			var hexgrid = catan.models.hexgrid;
			var dirIndex = hexgrid.VertexDirection[theDirection];    	
			var connectedEdges = hex.getVertex(dirIndex).location.getConnectedEdges();
			
			// if vertex is occupied
			if(hex.getVertex(dirIndex).getOwner()!==-1){
				return false;
			}
		
			var edgesInTheOcean = 0;
			for(var n = 0; n < connectedEdges.length; n++){
				var myHexLoc = new catan.models.hexgrid.HexLocation(connectedEdges[n].x,connectedEdges[n].y);
				var myHex = this.hexGrid.getHex(myHexLoc);
				if(myHex === undefined || !myHex.isLand){
					edgesInTheOcean = edgesInTheOcean + 1;
				}
			}
			if(edgesInTheOcean === 3){
				return false;
			}
			
			// check that all other vertices around it
			for(var i = 0; i < connectedEdges.length; i++){
				var myHexLoc = new catan.models.hexgrid.HexLocation(connectedEdges[i].x,connectedEdges[i].y);
				var myHex = this.hexGrid.getHex(myHexLoc);
				if(myHex !== undefined){
					var neighborVertexes = myHex.edges[connectedEdges[i].direction].location.getNeighborVertexes();
					for(var j = 0; j < 2; j++){
						var aHexLoc = new catan.models.hexgrid.HexLocation(neighborVertexes[j].x,neighborVertexes[j].y);
						var aHex = this.hexGrid.getHex(aHexLoc);
						if(aHex.getVertex(neighborVertexes[j].direction).ownerID !== -1){
							return false;
						}
					}
				}
			}
			return true;     	
		};
        
		/**
		* @method canPlaceCity
		* @param {int} playerID - The id of the current player
		* @param {Hex} hex - The hex on which the player wants to build
		* @param {int} theDirection - The direction of the selected vertex on the hex
		* @return {boolean} Whether or not the current player can build a settlement in the selected location
		* */
		Map.prototype.canPlaceCity = function(playerID, hex, theDirection){
			var dirIndex = catan.models.hexgrid.VertexDirection[theDirection];
			return (hex.vertexes[dirIndex].getOwner() === playerID && hex.vertexes[dirIndex].getWorth() === 1);
		};        
        
		/**
		* @method buildRoad
		* @param {int} playerID - The id of the current player
		* @param {Hex} hex - The hex on which the player wants to build
		* @param {int} theDirection - The direction of the selected edge on the hex
		* */
        Map.prototype.buildRoad = function(playerID, hex, theDirection){
            this.hexGrid.getHex(hex).getEdge(theDirection).setOwner(playerID);
        };
        
		/**
		* @method buildSettlement
		* @param {int} playerID - The id of the current player
		* @param {Hex} hex - The hex on which the player wants to build
		* @param {int} theDirection - The direction of the selected vertex on the hex
		* */
        Map.prototype.buildSettlement = function(playerID, hex, theDirection){
            this.hexGrid.getHex(hex).getVertex(theDirection).setOwner(playerID);
        };
        
		/**
		* @method buildCity
		* @param {int} playerID - The id of the current player
		* @param {Hex} hex - The hex on which the player wants to build
		* @param {int} theDirection - The direction of the selected vertex on the hex
		* */
        Map.prototype.buildCity = function(playerID, hex, theDirection){
            this.hexGrid.getHex(hex).getVertex(theDirection).setOwner(playerID);
        };
        
		/**
		* @method robberMove
		* @param {HexLocation} hextoMoveTo - The new location of the robber
		* */
        Map.prototype.robberMove = function(hextoMoveTo){
            this.robber = hexToMoveTo;
        };
        return Map;
        
    }());
    
    /**
    This class represents an edge. It inherits from BaseContainer.
    The data in this class (that you get from the JSON model) is independent of the hexgrid, except for the location.
    Therefore, we leave it up to you to decide how to implement it.
    It must however implement one function that the hexgrid looks for: 'isOccupied' - look at its documentation.
    From the JSON, this object will have two properties: location, and ownerID.
    Besides the 'isOccupied' method, you may add any other methods that you need.
    
    @constructor
    @extends hexgrid.BaseContainer
    
    @class CatanEdge
    */
    var CatanEdge = (function CatanEdge_Class(){
    
        core.forceClassInherit(CatanEdge, hexgrid.BaseContainer);
    
        function CatanEdge(){
                this.ownerID = -1;
        }
        
		/*
		Returns true if there is an ownerID associated, or false if the ownerID is -1
		*/
		CatanEdge.prototype.isOccupied = function(){
			if(this.ownerID==-1){
				return false;                   
			}
			else{   
				return true;
			}
		}

		CatanEdge.prototype.getOwner = function(){
			return this.ownerID;            
		}
        
		CatanEdge.prototype.setOwner = function(newOwner){
			this.ownerID = newOwner;            
		}
		return CatanEdge;
    }());
    
    /**
    This class represents a vertex. It inherits from BaseContainer.
    The data in this class (that you get from the JSON model) is independent of the hexgrid, except for the location.
    Therefore, we leave it up to you to decide how to implement it.
    It must however implement one function that the hexgrid looks for: 'isOccupied' - look at its documentation.
    From the JSON, this object will have three properties: location, ownerID and worth.
    Besides the 'isOccupied' method, you may add any other methods that you need.
    
    @constructor
    @extends hexgrid.BaseContainer
    
    @class CatanVertex
	*/
	var CatanVertex = (function CatanVertex_Class(){
		core.forceClassInherit(CatanVertex, hexgrid.BaseContainer);
		function CatanVertex(){
			this.ownerID = -1;
			this.worth = 0;  
		}
        
        // once you override this, put in some documentation
        
		CatanVertex.prototype.isOccupied = function(){
			if(this.ownerID==-1){
				return false;                   
			}
			else{   
				return true;
			}
		}
        
		CatanVertex.prototype.getOwner = function(){
			return this.ownerID;            
		}
        
		CatanVertex.prototype.setOwner = function(newOwner){
			this.ownerID = newOwner;            
		}

		CatanVertex.prototype.getWorth = function(){
			return this.worth;          
		}
        
		CatanVertex.prototype.setWorth = function(newWorth){
			this.worth = newWorth;          
		}

		return CatanVertex;
    }()); 
    
    
    /**
    This class represents a Hex. You may add any methods that you need (e.g., to get the resource/hex type, etc.)
    
    In order to work with the hexgrid, this class must extend hexgrid.BasicHex (already done in the code). You also need to implement
    a CatanVertex and CatanEdge classes (stubs are provided in this file).  Look at their documentation to see what needs to be done there.
     
    The hexgrid will be passed an instance of this class to use as a model, and will pull the constructor from that instance. 
    (The core.forceInherit sets the constructor, in case you are curious how that works)
      
    @constructor
    @param {hexgrid.HexLocation} location - the location of this hex. It's used to generate locations for the vertexes and edges.
    @extends hexgrid.BasicHex
    
    @class CatanVertex
    */
    var CatanHex = (function CatanHex_Class(){
    
        core.forceClassInherit(CatanHex, hexgrid.BasicHex);
        
        function CatanHex(theLocation){          
            hexgrid.BasicHex.call(this,theLocation,CatanEdge,CatanVertex);
        }

        CatanHex.prototype.update = function(newHexData) {
            this.isLand = newHexData.isLand;

            this.setLandType(newHexData.landtype);

            for(var i = 0; i < 6; i++){
                this.edges[i].setOwner(newHexData.edges[i].value.ownerID);
            }

            for(var i = 0; i < 6; i++){
                this.vertexes[i].setOwner(newHexData.vertexes[i].value.ownerID);
                this.vertexes[i].setWorth(newHexData.vertexes[i].value.worth);
            }
        };

        CatanHex.prototype.getLandType = function(){
            return this.landType;           
        }
    
        CatanHex.prototype.setLandType = function(newLandType){
            this.landType = newLandType;            
        }
        
        return CatanHex;
    }());
    
    return {
        Map:Map,
        CatanEdge:CatanEdge,
        CatanVertex:CatanVertex,
        CatanHex:CatanHex
        }

}());



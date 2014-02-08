var catan = catan || {};
catan.models = catan.models || {};

/**
	This module contains the map
	
	@module		catan.models
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
			this.radius = 4; // should default be zero???
			this.robber = new HexLocation();
			
			this.hexGrid = hexgrid.HexGrid.getRegular(radius, CatanHex);
		}
		
		Map.prototype.update = function(newMap){
			
		};
		
		Map.prototype.getResourcesFromRoll(diceNum){
			// find hexes that don't have robber
			// find buildings
			// identify players
			// identify associated resources (1 for settlement, 2 for city)
			// create a map data structure with player ids as keys and resourcelists of rewards as values
			var rewards = {0: new catan.models.bank.ResourceList()};
		};
	
		Map.prototype.canPlaceRoad = function(hex, position){
			
		};
		
		Map.prototype.canPlaceSettlement = function(hex, position){
			
		};
		
		Map.prototype.canPlaceCity = function(hex, position){
			
		};
		
		Map.prototype.buildRoad = function(hex, position){
			
		};
		
		Map.prototype.buildSettlement = function(hex, position){
			
		};
		
		Map.prototype.buildCity = function(hex, position){
			
		};
		
		Map.prototype.robberMove = function(hextoMoveTo){
			
		};
		
		Map.prototype.getRobberVictims = function(){
			
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
    
        function CatanEdge(){}
        
        // once you override this, put in some documentation
			CatanEdge.prototype.isOccupied = function()
			{
			return false; //default implementation. Change this!
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
        	}
        
         CatanVertex.prototype.setLocation = function (location, index) {
         	
         }       
       	// once you override this, put in some documentation
        
        	CatanVertex.prototype.isOccupied = function()
			{
				return false; //default implementation. Change this!
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
        
        function CatanHex(location){          
            hexgrid.BasicHex.call(this,location,CatanEdge,CatanVertex);
        } 
        
        return CatanHex;
    }());
    
	return Map;

}());



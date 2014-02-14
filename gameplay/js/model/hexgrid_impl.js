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
			this.robber = new hexgrid.HexLocation();
			this.hexGrid = hexgrid.HexGrid.getRegular(this.radius, CatanHex);
			console.log(this);
		};
		
		Map.prototype.update = function(newMap){
			this.numbers = newMap.numbers;
			this.ports = newMap.ports;
			this.radius = newMap.radius;
			this.robber = newMap.robber;
			this.hexGrid = newMap.hexGrid;
		};
	
		
		Map.prototype.getResourcesFromRoll = function(diceNum){
			// find hexes that don't have robber
			// find buildings
			// identify players
			// identify associated resources (1 for settlement, 2 for city)
			// create a map data structure with player ids as keys and resourcelists of rewards as values
			// var rewards = {0: new catan.models.bank.ResourceList()};
			var rewards = new catan.models.bank.ResourceList("player");
			return rewards;
		};
	
		Map.prototype.canPlaceRoad = function(playerID, hex, theDirection){
			var tempHex = new Object();
			var plusOne = this.hexGrid.getHex(hex).getEdge(theDirection) + 1;
			var minusOne = this.hexGrid.getHex(hex).getEdge(theDirection) - 1;
			
			if(plusOne == 6){
				plusOne = 0;			
			}
			if(minusOne == -1){
				minusOne = 5;		
			}

			if(this.hexGrid.getHex(hex).getEdge(plusOne).getOwner()==playerID||
				this.hexGrid.getHex(hex).getEdge(minusOne).getOwner()==playerID)
				{return true;}

			else if(thePosition==0)
			{
				tempHex = hex.getNeighborLocation(HexDirection.NW);
				if(!hex.equals(tempHex) && tempHex != null)
				{
					if(tempHex.getEdge(EdgeDirection.S).getOwner()==playerID||
						tempHex.getEdge(EdgeDirection.NE).getOwner()==playerID)
						{
							return true;						
						}					
				}	
			}
			else if(thePosition==1)
			{
				tempHex = hex.getNeighborLocation(HexDirection.N);
				if(!hex.equals(tempHex) && tempHex != null)
				{
						if(tempHex.getEdge(EdgeDirection.SE).getOwner()==playerID||
						tempHex.getEdge(EdgeDirection.SW).getOwner()==playerID)
						{
							return true;						
						}	
				}					
			}
			else if(thePosition==2)
			{
				tempHex = hex.getNeighborLocation(HexDirection.NE);
				if(!hex.equals(tempHex) && tempHex != null)
				{
					if(tempHex.getEdge(EdgeDirection.NW).getOwner()==playerID||
						tempHex.getEdge(EdgeDirection.S).getOwner()==playerID)
						{
							return true;						
						}						
				}	
			}
			else if(thePosition==3)
			{
				tempHex = hex.getNeighborLocation(HexDirection.SE);
				if(!hex.equals(tempHex) && tempHex != null)
				{
					if(tempHex.getEdge(EdgeDirection.N).getOwner()==playerID||
						tempHex.getEdge(EdgeDirection.SW).getOwner()==playerID)
						{
							return true;						
						}						
				}	
			}
			else if(thePosition==4)
			{
				tempHex = hex.getNeighborLocation(HexDirection.S);
				if(!hex.equals(tempHex) && tempHex != null)
				{
					if(tempHex.getEdge(EdgeDirection.NW).getOwner()==playerID||
						tempHex.getEdge(EdgeDirection.NE).getOwner()==playerID)
						{
							return true;						
						}						
				}	
			}		
			else if(thePosition==5)
			{
				tempHex = hex.getNeighborLocation(HexDirection.SW);
				if(!hex.equals(tempHex) && tempHex != null)
				{
					if(tempHex.getEdge(EdgeDirection.N).getOwner()==playerID||
						tempHex.getEdge(EdgeDirection.SE).getOwner()==playerID)
					{
						return true;						
					}						
				}
			}	
			return false;						
		};
		
		Map.prototype.canPlaceSettlement = function(playerID, hex, theDirection){
			var tempHex = new Object();
			toReturnEdge = false;
			toReturnVert = true;
			var vertPlusOne = this.hexGrid.getHex(hex).getVertex(theDirection) + 1;
			var vertMinusOne = this.hexGrid.getHex(hex).getVertex(theDirection) - 1;
			//var edgePlusOne = this.hexGrid.getHex(hex).getEdge(theDirection) + 1;
			var edgePlusOne = this.hexGrid.getHex(hex).getEdge(theDirection); // assumes theDirection enumeration is the same for edges and vertices
			var edgeMinusOne = this.hexGrid.getHex(hex).getEdge(theDirection) - 1;
			
			if(vertPlusOne == 6){
				vertPlusOne = 0;
			}
			if(vertMinusOne == -1){
				vertMinusOne = 5;
			}
			if(edgePlusOne == 6){
				edgePlusOne = 0;
			}
			if(edgeMinusOne == -1){
				edgeMinusOne = 5;
			}

			if(this.hexGrid.getHex(hex).getEdge(edgePlusOne).getOwner()==playerID||
				this.hexGrid.getHex(hex).getEdge(edgeMinusOne).getOwner()==playerID)
				{toReturnEdge = true;}

			if(this.hexGrid.getHex(hex).getVertex(vertPlusOne).isOccupied()||
				this.hexGrid.getHex(hex).getVertex(vertMinusOne).isOccupied())
				{toReturnVert = false;}

			else if(thePosition==0)
			{
				tempHex = hex.getNeighborLocation(HexDirection.NW);
				if(!hex.equals(tempHex) && tempHex != null){
					if(tempHex.getVertex(VertexDirection.SW).isOccupied()){
						toReturnVert = false;						
					}
					if(hex.getEdge(EdgeDirection.S).getOwner()==playerID){
						toReturnEdge = true;						
					}
				}
				else{
					tempHex = hex.getNeighborLocation(HexDirection.SW);
					if(!hex.equals(tempHex) && tempHex != null){
						if(tempHex.getVertex(VertexDirection.NW).isOccupied()){
							toReturnVert = false;						
						}
						if(hex.getEdge(EdgeDirection.N).getOwner()==playerID){
							toReturnEdge = true;						
						}
					}
				}
			}
			else if(thePosition==1)
			{
				tempHex = hex.getNeighborLocation(HexDirection.N);
				if(!hex.equals(tempHex) && tempHex != null){
					if(tempHex.getVertex(VertexDirection.W).isOccupied()){
						toReturnVert = false;						
					}
					if(hex.getEdge(EdgeDirection.SW).getOwner()==playerID){
						toReturnEdge = true;						
					}
				}
				else{
					tempHex = hex.getNeighborLocation(HexDirection.NW);
					if(!hex.equals(tempHex) && tempHex != null){
						if(tempHex.getVertex(VertexDirection.NE).isOccupied()){
							toReturnVert = false;						
						}
						if(hex.getEdge(EdgeDirection.NE).getOwner()==playerID){
							toReturnEdge = true;						
						}
					}
				}
			}
			else if(thePosition==2)
			{
				tempHex = hex.getNeighborLocation(HexDirection.NE);
				if(!hex.equals(tempHex) && tempHex != null){
					if(tempHex.getVertex(VertexDirection.NW).isOccupied()){
						toReturnVert = false;						
					}
					if(hex.getEdge(EdgeDirection.NW).getOwner()==playerID){
						toReturnEdge = true;
					}
				}
				else{
					tempHex = hex.getNeighborLocation(HexDirection.N);
					if(!hex.equals(tempHex) && tempHex != null){
						if(tempHex.getVertex(VertexDirection.E).isOccupied()){
							toReturnVert = false;						
						}
						if(hex.getEdge(EdgeDirection.SE).getOwner()==playerID){
							toReturnEdge = true;						
						}
					}
				}
			}
			else if(thePosition==3)
			{
				tempHex = hex.getNeighborLocation(HexDirection.SE);
				if(!hex.equals(tempHex) && tempHex != null){
					if(tempHex.getVertex(VertexDirection.SE).isOccupied()){
						toReturnVert = false;						
					}
					if(hex.getEdge(EdgeDirection.S).getOwner()==playerID){
						toReturnEdge = true;
					}
				}
				else{
					tempHex = hex.getNeighborLocation(HexDirection.NE);
					if(!hex.equals(tempHex) && tempHex != null){
						if(tempHex.getVertex(VertexDirection.E).isOccupied()){
							toReturnVert = false;						
						}
						if(hex.getEdge(EdgeDirection.SE).getOwner()==playerID){
							toReturnEdge = true;						
						}
					}
				}
			}
			else if(thePosition==4)
			{
				tempHex = hex.getNeighborLocation(HexDirection.S);
				if(!hex.equals(tempHex) && tempHex != null){
					if(tempHex.getVertex(VertexDirection.E).isOccupied()){
						toReturnVert = false;						
					}
					if(hex.getEdge(EdgeDirection.NE).getOwner()==playerID){
						toReturnEdge = true;
					}
				}
				else{
					tempHex = hex.getNeighborLocation(HexDirection.SE);
					if(!hex.equals(tempHex) && tempHex != null){
						if(tempHex.getVertex(VertexDirection.SW).isOccupied()){
							toReturnVert = false;						
						}
						if(hex.getEdge(EdgeDirection.SW).getOwner()==playerID){
							toReturnEdge = true;						
						}
					}
				}
			}
			else if(thePosition==5)
			{
				tempHex = hex.getNeighborLocation(HexDirection.SW);
				if(!hex.equals(tempHex) && tempHex != null){
					if(tempHex.getVertex(VertexDirection.SE).isOccupied()){
						toReturnVert = false;						
					}
					if(hex.getEdge(EdgeDirection.SE).getOwner()==playerID){
						toReturnEdge = true;
					}
				}
				else{
					tempHex = hex.getNeighborLocation(HexDirection.S);
					if(!hex.equals(tempHex) && tempHex != null){
						if(tempHex.getVertex(VertexDirection.W).isOccupied()){
							toReturnVert = false;						
						}
						if(hex.getEdge(EdgeDirection.NW).getOwner()==playerID){
							toReturnEdge = true;						
						}
					}
				}
			}
			// toReturnVert == true means that the vertex is free to build on
			// toReturnEdge == true means that the player has a road leading to the vertex
			if(toReturnVert && toReturnEdge){
				return true;
			}
			else{
				return false;
			}
		};
		
		Map.prototype.canPlaceCity = function(playerID, hex, theDirection){
			//if(this.hexGrid.getHex(hex).getVer
			
			if(this.hexGrid.getHex(hex).getEdge(edgePlusOne).getOwner()==playerID||
				this.hexGrid.getHex(hex).getEdge(edgeMinusOne).getOwner()==playerID)
				{toReturnEdge = true;}

			if(this.hexGrid.getHex(hex).getVertex(vertPlusOne).isOccupied()||
				this.hexGrid.getHex(hex).getVertex(vertMinusOne).isOccupied())
				{toReturnVert = false;}

		};
		
		Map.prototype.buildRoad = function(playerID, hex, theDirection){
			this.hexGrid.getHex(hex).getEdge(theDirection).setOwner(playerID);
		};
		
		Map.prototype.buildSettlement = function(playerID, hex, theDirection){
			this.hexGrid.getHex(hex).getVertex(theDirection).setOwner(playerID);
		};
		
		Map.prototype.buildCity = function(playerID, hex, theDirection){
			this.hexGrid.getHex(hex).getVertex(theDirection).setOwner(playerID);
		};
		
		Map.prototype.robberMove = function(hextoMoveTo){
			this.robber = hexToMoveTo;
		};
		
		Map.prototype.getRobberVictims = function(){
			/*var robberAdjacent = this.hexGrid.getHex(this.robber).getVertexes();
			var victimList = new Array();
			for(var i = 0; i < robberAdjacent.length; i++){
				if(robberAdjacent[i] != -1 && !checkIfAlreadyVictim(victimList, i)){
					victimList.push(i);
				}
			}
			return victimList;*/
			return "hello person";
		};
		
		
		Map.prototype.checkIfAlreadyVictim = function(victimList, playerIndex){
			for(var n = 0; n < victimList.length; n++){
				if(victimList[n] == playerIndex){
					return true;
				}
			}
			return false;
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
				if(ownerID==-1){
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
				this.owner = newOwner;			
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
				if(ownerID==-1){
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
				this.owner = newOwner;			
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
        
        return CatanHex;
    }());
    
	return {
		Map:Map,
		CatanEdge:CatanEdge,
		CatanVertex:CatanVertex,
		CatanHex:CatanHex
		}

}());



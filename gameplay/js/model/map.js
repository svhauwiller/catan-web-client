var catan = catan|| {};
catan.models = catan.models || {};

/**
* Map Module
*
* @module catan.models.map
*/

catan.models.map = (function mapNameSpace(){
	
	var Map = (function MapClass(){
		
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
		function Map()
		{
			this.hexGrid = new HexGrid();
			this.numbers = new Array();
			this.ports = new Array();
			this.radius = 0;
			this.robber = new HexLocation();
		}

		return Map;
	}());
	return Map;
}());

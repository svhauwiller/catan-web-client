var catan = catan || {};
catan.models = catan.models || {};

/**
* vertex Module
*
* @module catan.models.vertex
*/

catan.models.vertex = (function vertexNameSpace(){
	
	var vertex = (function vertexClass(){
		
		/**
		* vertex class
		* <pre>
		* Invariants: vertex is a new vertexValue
		* </pre>
		*
		* @class vertex
		* @constructor
		*/
		
		/**
		* The elements
		* @property vertex
		* @type {ElemType VertexValue}
		*/


		function vertex()
		{
			this.vertex=new VertexValue();
		}
		
		
		
		return vertex;
	}());
	return vertex;
}());
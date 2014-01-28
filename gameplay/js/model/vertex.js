var catan = catan || {};
catan.model = catan.model || {};

/**
* vertex Module
*
* @module catan.model.vertex
*/

catan.model.vertex = (function vertexNameSpace(){
	
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
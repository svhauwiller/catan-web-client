/**
	This this contains interfaces used by the map and robber views
	@module catan.map
	@namespace map
*/

var catan = catan || {};
catan.views = catan.views || {};
catan.views.overlays = catan.views.overlays || {};

catan.views.overlays.MapOverlay = (function (){
	
	var BasicOverlay = catan.misc.BasicOverlay;
	
	var NinjaModal = (function(){
		
		core.forceClassInherit(NinjaModal,BasicOverlay);
        
		core.defineProperty(NinjaModal.prototype, "target");
		core.defineProperty(NinjaModal.prototype, "container");
		core.defineProperty(NinjaModal.prototype, "reject");
		core.defineProperty(NinjaModal.prototype, "accept");
		
		function NinjaModal(title, modalID,target,container,accept,reject){
			this.setTarget(target);
			BasicOverlay.call(this, title, modalID);
			this.setContainer(container);
			this.setAccept(accept);
			this.setReject(reject);
		}	
		
		NinjaModal.prototype.constructModalElements = function(){
			BasicOverlay.prototype.constructModalElements.call(this);
			var bodyHeight = $(this.getTarget()).outerHeight();
			var bodyWidth = $(this.getTarget()).outerWidth();
			var headerHeight = $(this.getHeader()).height();
			var footerHeight = $(this.getFooter()).outerHeight();
			
			var modalWidth = bodyWidth + 36;
			var marginLeft  = modalWidth / 2 + 30;
			
			var styleString = "margin-left:-"+marginLeft+"; width:"+modalWidth+"; top:20px";
			this.getModalElement().setAttribute('style',styleString);
			this.getModalBodyElement().setAttribute('style',"max-height:"+(bodyHeight+50));
		}
		NinjaModal.prototype.generateBody = function(){
			return this.getTarget();
		}
		
		NinjaModal.prototype.generateFooter = function(){
			var footer = document.createElement("div");
			footer.setAttribute('class','modal-footer');
			var primary = true;
			if (this.getAccept()){
				footer.appendChild(this.makeAccept(primary));
				primary = false;
			}
			if (this.getReject()){
				footer.appendChild(this.makeReject(primary));
				primary = false;
			}
			if (!primary) return footer;
		}
		
		NinjaModal.prototype.closeModal = function(){
			this.getContainer().appendChild(this.getTarget());
			BasicOverlay.prototype.closeModal.call(this);
		}
		
		NinjaModal.prototype.makeReject = function(primary){
			var button = makeButton(this.getReject(),primary);
			button.setAttribute("data-dismiss","modal");
			var cancel = button.onclick;
			var close = core.makeAnonymousAction(this,this.closeModal,[]);
			button.onclick = function(){cancel();close()};
			return button;
		}
		
		NinjaModal.prototype.makeAccept = function(primary){
			return makeButton(this.getAccept(),primary);
		}
        	
		function makeButton(buttonArgs, primary){
			var button = document.createElement('a');
			button.setAttribute('href','#');
			//var classes = 'btn';
			var classes = "button-area quarter short"
			if (primary) classes = classes + " primary";
			button.setAttribute('class',classes);
			button.textContent = buttonArgs.text;
			button.onclick = buttonArgs.onclick;
			return button;
		}
			
		return NinjaModal;
	}());
	
 		
	/**
        This class implements the map pop-out overlay view that lets the user place a piece on the map.  
		It inherits from misc.BaseOverlay.
        It calls the "cancelMove" function on the controller it belongs to.
		@constructor
		@class MapOverlay
	*/
   var MapOverlay = (function MapOverlayFunction(){
    
        core.defineProperty(MapOverlay.prototype, "ninja");
        core.defineProperty(MapOverlay.prototype, "cancelAllowed");
        core.defineProperty(MapOverlay.prototype, "cancelFunction");
        core.defineProperty(MapOverlay.prototype, "Controller");

        function MapOverlay(){}        
        /**
         * Shows a modal overlay of the map.
         * @method showModal 
	 * @param {String} type the type of the item to place: "Robber", "Soldier", "City", "Settlement", "Road".
         */
	MapOverlay.prototype.showModal = function(type){
		var cancelButtonInfo = undefined;
		
		var cancelFunc = core.makeAnonymousAction(this.getController(), this.getController().cancelMove);
		
		this.setCancelAllowed(true);
		
		if (this.getCancelAllowed()){	
			var cancelFunc = core.makeAnonymousAction(this.getController(), this.getController().cancelMove);
					
			cancelButtonInfo = {
				text:"Cancel Drop", 
				onclick:cancelFunc
			};
		}
		
		if(type == undefined)
			type = "piece";
			
		if(type == "Robber" || type == "robber")
			cancelButtonInfo = undefined;
		
		var modal = new NinjaModal("Place the " + type + "!", 
			'map-play',
			$(".kineticjs-content").get(0), 
			$("#map-pane").get(0),
			undefined,
			cancelButtonInfo
		);
		
		modal.setController(this.getController());
		this.setNinja(modal);
		modal.showModal();
		
	}
		
	/**
         * Closes the overlay.
         * @method closeModal
         */
		MapOverlay.prototype.closeModal = function(){
			this.getNinja().closeModal();
		}    
        
        return MapOverlay;
    }())
    
    return MapOverlay;
}());

/*override showModal. instead of inheriting ninjamodal, mapoverlay will contain and create it.
 * showModal should pass in a string to say which kind of mbuilding you need to do.*/


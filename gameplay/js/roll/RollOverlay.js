/**
    This is the namespace the rolling interface
    @module catan.roll
    @namespace roll
*/

var catan = catan || {};
catan.roll = catan.roll || {};

catan.roll.View = (function roll_namespace(){
        
    var BasicOverlay = catan.misc.BasicOverlay;
    
    var StaticImage = catan.definitions.DisplayElement.BasicElements.StaticImage;
    var Label = catan.definitions.DisplayElement.BasicElements.Label;
    var DisplayElement = catan.definitions.DisplayElement;
    var Definitions = catan.definitions;
    var BUTTON_STYLE = "button-area three-quarter short";
    
    var RollView = (function(){
                
        core.forceClassInherit(RollView,BasicOverlay);
        
        /**
         * A view for rolling the dice.  It inherits from misc.BaseOverlay.
         * It calls the "rollDice" method on its controller if the user clicks the "Roll" button.
         * @class RollView 
         * @constructor
         * @extends misc.BaseOverlay
         */
        function RollView(title){
            var title = title || "Roll for your turn"
            BasicOverlay.call(this,title);
        };
                    
        core.defineProperty(RollView.prototype, "MessageElem");
        core.defineProperty(RollView.prototype, "ButtonElem");
        core.defineProperty(RollView.prototype, "Action");
        
        RollView.prototype.generateBody = function(){
            var rollArea = document.createElement("div");
            rollArea.setAttribute("class","roll-area text-center");
            
            var rollImg = new StaticImage("rollImage","overlay-image");
            
            var rollMsg = document.createElement("label");
            rollMsg.innerHTML = "Rolling automatically in...";
            this.setMessageElem(rollMsg);
            
            rollArea.appendChild(rollImg);
            rollArea.appendChild(rollMsg);

            return rollArea;
        };
        RollView.prototype.generateFooter = function(){
            var action = core.makeAnonymousAction(this,this.rollDice);
            var rollButton = new DisplayElement.ButtonArea(action);
                        this.setButtonElem(rollButton);
                        
                        rollButton.setStyle(BUTTON_STYLE);
                        rollButton.setMessage("Roll!");
            var topDiv = document.createElement('div');
                topDiv.appendChild(rollButton.getView());
            return topDiv;
        }
        
       
        RollView.prototype.rollDice = function(){
            this.getController().rollDice();
        }
        
        /**
         * Updates the countdown message
         * @method changeMessage
         * @param {String} message the new countdown message
         * @return void
         */
        RollView.prototype.changeMessage = function(message){
            var msgElem = this.getMessageElem();
            msgElem.textContent = message;
        };
       
        return RollView;
    }());
    
    return RollView;
}());


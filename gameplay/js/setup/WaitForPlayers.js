var PlayerWaiting = (function playerWaitingNameSpace(){
		
	
	var JoinStatus = {Join:1,Resume:2,Full:0};
	
	function joinable(players){
		var playerInfo = new catan.server.PlayerInfo();
			playerInfo.restore();
		var myId = playerInfo.playerID;
		if (players){
			for (var count = 0; count<players.length; count++){
				var pID = players[count].id;
				if (pID == myId)
					return JoinStatus.Resume;
				if (!pID)
					return JoinStatus.Join;
			}
		}
		return JoinStatus.Full;
	}

	var PlayerWaitingController = (function makeGameListController(){
		
		core.defineProperty(PlayerWaitingController.prototype,"view");
		core.defineProperty(PlayerWaitingController.prototype,"gameID");
		
		function PlayerWaitingController(view){
			this.setGameID(Cookies.get("catan.game"));
			this.setView(view);
			this.players = [];
			var controller = this;
			this.interval = setInterval(function(){
				controller.doUpdate();
			},2000)
		}
		
		PlayerWaitingController.prototype.doUpdate = function(){
			if (this.players.length != 4){
				this.refreshGames();
			} else {
				window.location = "/setup.html";
			}
		};
		
		PlayerWaitingController.prototype.setGames = function(games){
			var gid = this.getGameID();
            var controller = this;
			var game = function(){
				for (var count = 0; count < games.length; count++){
					if (games[count].id == gid){
						return games[count];
					}
				}
				alert("You don't seem to have a valid cookie set");
                clearInterval(this.interval);
                throw Error("No cookie set")
			}();
			var players = [];
			for (var count = 0; count < game.players.length; count++){
				if (game.players[count].name){
					players.push(game.players[count]);
				}
			}
			this.players = players;
			this.view.setPlayers(players);
		}
        
        PlayerWaitingController.prototype.setAIs = function(ais){
			this.view.setAIs(ais);
		}
		
		PlayerWaitingController.prototype.refreshGames = function(callback){
			var controller = this;
			$.ajax({
				  dataType: "json",
				  url: "/games/list",
				  success: function(games){ 
					  controller.setGames(games)
					  if (callback){
						  callback()					  
					  }
				  }
			});	
            $.ajax({
				  dataType: "json",
				  url: "/game/listAI",
				  success: function(ais){ 
					  controller.setAIs(ais)
				  }
			});	
		}
		return PlayerWaitingController;
		
	}());
	
	var PlayerWaitingView = (function makeGameListView(){
		
		var StandardDialog = catan.misc.BasicOverlay.ShowDialog;
		
		core.forceClassInherit(PlayerWaitingView,StandardDialog);
		core.defineProperty(PlayerWaitingView.prototype,"controller");
		
		function PlayerWaitingView(){
			var body = document.createElement("div");
				body.id="player-waiting-body";
			var header = document.createElement("div");
				header.id="standard-dialog-header";
			
			this.headerRactive = makeRactiveTitle(header);	
			this.ractive = makeRactiveView(body);
			StandardDialog.call(this,{
				body:body,
				ok:false,
				cancel:false,
				header:header,
			});
				
		}
		
		PlayerWaitingView.prototype.setPlayers = function(players){
			this.ractive.set('players',players);
			this.ractive.set('counter', 4-players.length );
			this.headerRactive.set( 'counter', 4-players.length );
			this.ractive.set('loading',false);
			
			if(players.length == 4){
				this.ractive.set('loading',true);
			}		
		}
        
        PlayerWaitingView.prototype.setAIs = function(ais){
			this.ractive.set('aiNames',ais);
		}
		
		function makeRactiveView(body){	
			var display = body
			
			var template = 
				  '<ol class=rounded-list>{{#players}}'
				+ '<li class="{{.color}}">{{.name}}</li>'
				+ '{{/players}}</ol>'
                
                + '{{^adding}}'
				+ '<button proxy-click="activate" disabled={{loading}} class="button-area full tall">Add a computer player</button>'
                + '{{/adding}}'
                
                + '{{#adding}}'
                + '<form>'
                + '<label>Select AI:</label>'
                + "<select id='aiAdder' name=AIType value='{{selectedColors}}'>  {{#aiNames}}"
                + "   <option value='{{.}}'>{{.}}</option>"
                +                                             "  {{/aiNames}}  </select>"
                + '</form><button proxy-click="addAI" class="button-area full tall">Add!</button>'
                + '{{/adding}}'
				
			var ractive = new Ractive({
				el:display,
				template:template,
                data:{adding:false,loading:true}
                
			});
			ractive.on( 'activate', function ( event ) {
				  if (!ractive.get('loading')) ractive.set('adding',true);
			});
            ractive.on( 'addAI', function (event){
                ractive.set('loading',true);
                $.ajax({
                    type: 'POST',
                    url:'/game/addAI',
                    data: $('#aiAdder').serialize()
                })
                .done(function(){})
                .error(function(){})
                ractive.set('adding',false);
            })
			console.log(ractive)

			return ractive;
		}
		function makeRactiveTitle(body){	
			var display = body;
			
			var template = '<h3>{{ title(counter) }}</h3>';
				
			var ractive = new Ractive({
				el:display,
				template:template,
				data:{
                    counter:4,
                    title:function(count){
                        if (count) return "Waiting for " + count + " more players to join."
                        else return "Launching Game ..."
                        return "HERE"
                    }
                }
			});
			console.log(ractive)
			
		
			return ractive;
		}
		
		return PlayerWaitingView;
	}());
	
	
	return {View:PlayerWaitingView,
			Controller:PlayerWaitingController};
}());

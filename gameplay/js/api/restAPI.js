jQuery(document).ready(function () {
    initPage();
});

function initPage(data) {

	// Dynamically generate page content from downloaded JSON
	generateContent();

	// Initialize event handlers
    jQuery("#game-select").change(onGameSelect);
	jQuery("#cmd-select").change(onCmdSelect);
    jQuery("#join-game").click(onJoinGameClick);
}

function generateContent(data) {
    jQuery.get("/games/list", null, generatePlayerImpersonator, "json").fail(failHandler);
    jQuery.get("js/api/server-REST.json", null, generateRESTapiTester, "json").fail(failHandler);
}

function generatePlayerImpersonator(data){
    gameList = data;
    var gameNum = 1;

    gameList.forEach(function(game){
        console.log(game);
        jQuery("#game-select").append('<option value="' + gameNum + '">' + game.title + '</option>');
        gameNum++;
    });
}

function generateRESTapiTester(data){
    var cmdNum = 1;

    data.forEach(function (cmd) {
        generateCmdDesc(cmd, cmdNum);
        if(cmd.type === "JSON"){
            setJSONSubmit("#cmd-" + cmdNum, cmd.url);
        } else {
            setFormSubmitOverride("#cmd-" + cmdNum, cmd.method);
        }
        cmdNum++;
    });

    displaySelectedCmdForm();
}

function generateCmdDesc(cmd, cmdNum){
    var cmdFormID = "cmd-" + cmdNum;

    jQuery("#cmd-select").append('<option value="' + cmdNum + '">' + cmd.url + '</option>');

    if(cmd.type === "JSON"){
        generateRequestBox(cmd, cmdFormID);
    } else {
        generateRequestForm(cmd, cmdFormID);
    }
}

function generateRequestBox(cmd, cmdFormID){
    jQuery("#cmd-desc").append('<form id=' + cmdFormID + ' class="invisible"></form>');
    jQuery("#" + cmdFormID).append('<div>Description: ' + cmd.description + '</div>')
                           .append('<div>Request Method: ' + cmd.method + '</div>')
                           .append('<div>Request Body:</div>')
                           .append('<textarea class="request-body">' + JSON.stringify(cmd.template, null, "\t") + '</textarea><br />')
                           .append('<input value="Try It!" class="btn btn-primary pull-left" type="button">');
}

function generateRequestForm(cmd, cmdFormID){
    jQuery("#cmd-desc").append('<form id=' + cmdFormID + ' class="invisible" action="' + cmd.url + '" method="' + cmd.method + '"></form>');
    jQuery("#" + cmdFormID).append('<div>Description: ' + cmd.description + '</div>')
                           .append('<div>Request Method: ' + cmd.method + '</div>');

    cmd.args.forEach(function(arg){

        if(arg.type === "BOOLEAN"){
            jQuery("#" + cmdFormID).append('<input type="checkbox" name="' + arg.name + '">');
        }

        jQuery("#" + cmdFormID).append('<label title="' + arg.description + '">' + arg.name + '</label>');

        if(arg.type === "STRING" || arg.type === "INTEGER"){
            jQuery("#" + cmdFormID).append('<input type="text" name="' + arg.name + '">');
        }

        if(arg.type === "ENUMERATION"){
            jQuery("#" + cmdFormID).append('<ul></ul>');

            arg.values.forEach(function(value){
                jQuery("ul").append('<li><input type="radio" name="' + arg.name + '" value="' + value + '">' + value + '</li>');
            });

        }

        jQuery("#" + cmdFormID).append('<br />');
    });

    jQuery("#" + cmdFormID).append('<input value="Try It!" class="btn btn-primary pull-left" type="submit">');
}

function setJSONSubmit(cmdForm, cmdURL){
    var submitBtn = cmdForm + " input",
        requestBody = cmdForm + " .request-body";

    jQuery(submitBtn).click(function(event){
        console.log(jQuery(requestBody).prop("value"));
        jQuery.post(cmdURL, jQuery(requestBody).prop("value"), displaySuccessfulCmd, "JSON").fail(failHandler);
    });
}

function setFormSubmitOverride(cmdForm, submissionMethod){
    jQuery(cmdForm).submit(function(event) {
        console.log(jQuery(this).serialize());
        event.preventDefault();
        event.stopImmediatePropagation();
        jQuery.ajax({
            type: submissionMethod,
            url: jQuery(this).attr('action'),
            data: jQuery(this).serialize()
        })
        .done(displaySuccessfulCmd)
        .error(failHandler)
    });
}

function clearPlayerList(){
    jQuery("#player-select").html('<select id="player-select"></select>');
}

function populatePlayerList(){
    var selectedGameIndex = parseInt(jQuery("#game-select").prop("value"), 10) - 1,
        playerIndex = 0;

    if(selectedGameIndex >= 0){
        gameList[selectedGameIndex].players.forEach(function(player){
            jQuery("#player-select").append('<option value="' + playerIndex + '">' + player.name + '</option>');
            playerIndex++;
        });
    }
}

function hideAllCmdForm(){
    jQuery("#cmd-desc form").each(function(){
        if(!jQuery(this).hasClass("invisible")){
            jQuery(this).addClass("invisible");
        }
    });
}

function displaySelectedCmdForm(){
    var selectedCmdID = "#cmd-" + jQuery("#cmd-select").prop("value");
    jQuery(selectedCmdID).removeClass("invisible");
}

function proxyAsUser(){
    var selectedGameIndex = parseInt(jQuery("#game-select").prop("value"), 10) - 1,
        selectedPlayerIndex = parseInt(jQuery("#player-select").prop("value"), 10),
        selectedPlayerData = gameList[selectedGameIndex].players[selectedPlayerIndex],
        loginObj = {username: selectedPlayerData.name, password: jQuery("#player-password").prop("value")},
        loginData = jQuery.param(loginObj);

    jQuery.post("user/login", loginData, joinGameWithProxy, "text").fail(failHandler);
}

function joinGameWithProxy(data){
    var selectedGameIndex = parseInt(jQuery("#game-select").prop("value"), 10) - 1,
        selectedPlayerIndex = parseInt(jQuery("#player-select").prop("value"), 10),
        selectedPlayerData = gameList[selectedGameIndex].players[selectedPlayerIndex],
        joinGameObj,
        joinGameData;

    if(data === "Success"){
        joinGameObj = {color: selectedPlayerData.color, id: gameList[selectedGameIndex].id};
        joinGameData = jQuery.param(joinGameObj);
        jQuery.post("/games/join", joinGameData, displaySuccessfulProxy, "text").fail(failHandler);
    } else {
        console.log(data);
    }
}

function displaySuccessfulProxy(data){
    jQuery("#proxy-status").text(data);
}

function displaySuccessfulCmd(data){
    console.log(typeof data);
    if(typeof data === "object"){
        data = JSON.stringify(data, null, "\t");
    }
    jQuery("#cmd-response").text(data);
}

//Event Listeners
function onGameSelect(){
    clearPlayerList();
    populatePlayerList();
}

function onCmdSelect(){
    hideAllCmdForm();
    displaySelectedCmdForm();
}

function onJoinGameClick(){
    proxyAsUser();
}

//Error Handlers
function failHandler(jqXHR, textStatus, errorThrown) {
    console.log("AJAX request failed: " + errorThrown);
}
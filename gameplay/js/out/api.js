YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "DevCardListClass",
        "Map",
        "Player",
        "comm.BaseCommController",
        "comm.BaseCommView",
        "comm.ChatController",
        "comm.ChatView",
        "comm.LogController",
        "comm.LogView",
        "core.Core",
        "devCards.BuyCardView",
        "devCards.DevCardController",
        "devCards.DevCardView",
        "discard.DiscardController",
        "discard.DiscardView",
        "domestic.AcceptView",
        "domestic.DomesticController",
        "domestic.DomesticView",
        "edge",
        "edgeValue",
        "hexLocation",
        "hexgrid.BaseContainer",
        "hexgrid.BaseLocation",
        "hexgrid.BasicHex",
        "hexgrid.EdgeDirection",
        "hexgrid.EdgeLocation",
        "hexgrid.HexDirection",
        "hexgrid.HexGrid",
        "hexgrid.HexLocation",
        "hexgrid.VertexDirection",
        "hexgrid.VertexLocation",
        "map.EdgeLoc",
        "map.MapController",
        "map.MapOverlay",
        "map.MapView",
        "map.Point",
        "map.PortLoc",
        "map.RobberOverlay",
        "map.VertexLoc",
        "maritime.MaritimeController",
        "maritime.MaritimeView",
        "messageLine",
        "messageList",
        "misc.BaseController",
        "misc.BaseOverlay",
        "misc.GameFinishedView",
        "misc.WaitOverlay",
        "models.CatanEdge",
        "models.CatanVertex",
        "models.ClientModel",
        "points.PointController",
        "points.PointView",
        "resourceList",
        "resources.ResourceBarController",
        "resources.ResourceBarView",
        "roll.RollController",
        "roll.RollResultView",
        "roll.RollView",
        "setup.SetupRoundController",
        "tradeOffer",
        "turnTracker",
        "turntracker.TurnTrackerController",
        "turntracker.TurnTrackerView",
        "vertex",
        "vertexValue"
    ],
    "modules": [
        "catan.comm",
        "catan.devCards",
        "catan.discard",
        "catan.map",
        "catan.misc",
        "catan.models",
        "catan.models.DevCardList",
        "catan.models.Player",
        "catan.models.edge",
        "catan.models.edgeValue",
        "catan.models.hexLocation",
        "catan.models.hexgrid",
        "catan.models.map",
        "catan.models.messageLine",
        "catan.models.messageList",
        "catan.models.resourceList",
        "catan.models.tradeOffer",
        "catan.models.turnTracker",
        "catan.models.vertex",
        "catan.models.vertexValue",
        "catan.points",
        "catan.resources",
        "catan.roll",
        "catan.setup",
        "catan.trade",
        "catan.trade.domestic",
        "catan.trade.maritime",
        "catan.turntracker",
        "core"
    ],
    "allModules": [
        {
            "displayName": "catan.comm",
            "name": "catan.comm",
            "description": "This is the namespace for the communication classes (log and chat)"
        },
        {
            "displayName": "catan.devCards",
            "name": "catan.devCards",
            "description": "This is the namespace for development cards"
        },
        {
            "displayName": "catan.discard",
            "name": "catan.discard",
            "description": "This is the namespace for discarding cards"
        },
        {
            "displayName": "catan.map",
            "name": "catan.map",
            "description": "This this contains interfaces used by the map and robber views"
        },
        {
            "displayName": "catan.misc",
            "name": "catan.misc",
            "description": "This is the namespace to hold the base classes"
        },
        {
            "displayName": "catan.models",
            "name": "catan.models",
            "description": "This module contains the map"
        },
        {
            "displayName": "catan.models.DevCardList",
            "name": "catan.models.DevCardList",
            "description": "Development Card List Module"
        },
        {
            "displayName": "catan.models.edge",
            "name": "catan.models.edge",
            "description": "edge Module"
        },
        {
            "displayName": "catan.models.edgeValue",
            "name": "catan.models.edgeValue",
            "description": "edgeValue Module"
        },
        {
            "displayName": "catan.models.hexgrid",
            "name": "catan.models.hexgrid",
            "description": "This is the namespace for what abstracts the hex grid interface:\n\tlocations, the hex grid, directions and a basic hex class"
        },
        {
            "displayName": "catan.models.hexLocation",
            "name": "catan.models.hexLocation",
            "description": "hexLocation Module"
        },
        {
            "displayName": "catan.models.map",
            "name": "catan.models.map",
            "description": "Map Module"
        },
        {
            "displayName": "catan.models.messageLine",
            "name": "catan.models.messageLine",
            "description": "Stack Module"
        },
        {
            "displayName": "catan.models.messageList",
            "name": "catan.models.messageList",
            "description": "messageList Module"
        },
        {
            "displayName": "catan.models.Player",
            "name": "catan.models.Player",
            "description": "Player Module"
        },
        {
            "displayName": "catan.models.resourceList",
            "name": "catan.models.resourceList",
            "description": "resourceList Module"
        },
        {
            "displayName": "catan.models.tradeOffer",
            "name": "catan.models.tradeOffer",
            "description": "tradeOffer Module"
        },
        {
            "displayName": "catan.models.turnTracker",
            "name": "catan.models.turnTracker",
            "description": "turnTracker Module"
        },
        {
            "displayName": "catan.models.vertex",
            "name": "catan.models.vertex",
            "description": "vertex Module"
        },
        {
            "displayName": "catan.models.vertexValue",
            "name": "catan.models.vertexValue",
            "description": "vertexValue Module"
        },
        {
            "displayName": "catan.points",
            "name": "catan.points",
            "description": "This is the namespace for point display"
        },
        {
            "displayName": "catan.resources",
            "name": "catan.resources",
            "description": "This is the namespace for resources"
        },
        {
            "displayName": "catan.roll",
            "name": "catan.roll",
            "description": "This is the namespace the rolling interface"
        },
        {
            "displayName": "catan.setup",
            "name": "catan.setup",
            "description": "This is the namespace for the intitial game round"
        },
        {
            "displayName": "catan.trade",
            "name": "catan.trade"
        },
        {
            "displayName": "catan.trade.domestic",
            "name": "catan.trade.domestic",
            "description": "This is the namespace for domestic trading"
        },
        {
            "displayName": "catan.trade.maritime",
            "name": "catan.trade.maritime",
            "description": "This is the namespace for maritime trading"
        },
        {
            "displayName": "catan.turntracker",
            "name": "catan.turntracker",
            "description": "The namespace for the turn tracker"
        },
        {
            "displayName": "core",
            "name": "core",
            "description": "These functions are in the default namespace and provide core functionality such as inheritance."
        }
    ]
} };
});
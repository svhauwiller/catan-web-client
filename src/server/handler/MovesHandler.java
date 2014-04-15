/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.handler;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.HierarchicalStreamWriter;
import com.thoughtworks.xstream.io.json.JsonHierarchicalStreamDriver;
import com.thoughtworks.xstream.io.json.JsonWriter;
import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.Writer;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.Arrays;
import java.util.HashMap;
import server.CookieDataParser;
import server.command.*;
import server.communication.*;
import server.JSONArray;
import server.JSONObject;

/**
 *
 * @author Wesley
 */
public class MovesHandler implements HttpHandler{
	
	private String serverRoot;
	
	public MovesHandler(String serverRoot){
		this.serverRoot = serverRoot;
	}

    @Override
    public void handle(HttpExchange ex) throws IOException {
        XStream xStream = new XStream(new JsonHierarchicalStreamDriver() {
			@Override
			public HierarchicalStreamWriter createWriter(Writer writer) {
				return new JsonWriter(writer, JsonWriter.DROP_ROOT_MODE);
			}
		});
		
		String methodName = ex.getRequestURI().getPath().substring(7);
		switch(methodName){
			case "sendChat":
				updateChatLog(ex, xStream);
				break;
			case "rollNumber":
				udpateFromRoll(ex, xStream);
				break;
			case "robPlayer":
				robPlayer(ex, xStream);
				break;
			case "finishTurn":
				finishTurn(ex, xStream);
				break;
			case "buyDevCard":
				getNewDevCard(ex, xStream);
				break;
			case "Year_of_Plenty":
				useYearOfPlenty(ex, xStream);
				break;
			case "Road_Building":
				useRoadBuilding(ex, xStream);
				break;
			case "Soldier":
				useSoldier(ex, xStream);
				break;
			case "Monopoly":
				useMonopoly(ex, xStream);
				break;
			case "Monument":
				useMonument(ex, xStream);
				break;
			case "buildRoad":
				buildRoad(ex, xStream);
				break;
			case "buildSettlement":
				buildSettlement(ex, xStream);
				break;
			case "buildCity":
				buildCity(ex, xStream);
				break;
			case "offerTrade":
				sendTradeOffer(ex, xStream);
				break;
			case "acceptTrade":
				sendTradeResponse(ex, xStream);
				break;
			case "maritimeTrade":
				tradeWithBank(ex, xStream);
				break;
			case "discardCards":
				discardCards(ex, xStream);
				break;
			default:
				throw new UnsupportedOperationException("\"" + methodName + "\" is not supported in this context.");
		}
    }
	
	private String getRequestString(InputStream requestStream) throws IOException{
		InputStreamReader requestReader = new InputStreamReader(requestStream,"utf-8");
		BufferedReader bufferedReqReader = new BufferedReader(requestReader);

		int bytes;
		StringBuilder request = new StringBuilder(1024);
		while ((bytes = bufferedReqReader.read()) != -1) {
			request.append((char) bytes);
		}

		bufferedReqReader.close();
		requestReader.close();
		
		return request.toString();
	}
	
	private String getGameIdFromCookies(HttpExchange ex){
		List<String> currentCookies = ex.getRequestHeaders().get("Cookie");
		HashMap<String, String> parsedCookies = new HashMap<>();
		
		if(currentCookies != null){
			parsedCookies = CookieDataParser.parse(currentCookies.get(0));
		}
		
		return parsedCookies.get("catan.game");
	}
	
	private void sendResponseObject(HttpExchange ex, XStream xStream, Object response) throws IOException{
		OutputStream responseStream = ex.getResponseBody();
		ex.sendResponseHeaders(200, xStream.toXML(response).length());
		xStream.toXML(response, responseStream);
		responseStream.close();
	}

	private void updateChatLog(HttpExchange ex, XStream xStream) throws IOException{
		String currentGameID = getGameIdFromCookies(ex);
		String inputString = getRequestString(ex.getRequestBody());
		JSONObject obj = new JSONObject(inputString);
		String[] args = new String[4];
		args[0] = obj.optString("type");
		args[1] = obj.optString("playerIndex");
		args[2] = obj.optString("content");
		args[3] = currentGameID;
		
		System.out.println(inputString);

		UpdateChatLog updateChatLogObj = new UpdateChatLog();
		updateChatLogObj.execute(args);
		updateChatLogObj.persist();
		CommandList.recordCommand(updateChatLogObj);

		GameModel response = GameModelList.get(Integer.parseInt(currentGameID));
		sendResponseObject(ex, xStream, response);
	}

	private void udpateFromRoll(HttpExchange ex, XStream xStream) throws IOException{
		String currentGameID = getGameIdFromCookies(ex);
		JSONObject obj = new JSONObject(getRequestString(ex.getRequestBody()));
		String[] args = new String[4];
		args[0] = obj.optString("type");
		args[1] = obj.optString("playerIndex");
		args[2] = obj.optString("number");
		args[3] = currentGameID;

		RollNumber rollNumberObj = new RollNumber();
		rollNumberObj.execute(args);
		rollNumberObj.persist();
		CommandList.recordCommand(rollNumberObj);
		GameModel response = GameModelList.get(Integer.parseInt(currentGameID));
		sendResponseObject(ex, xStream, response);
	}

	private void robPlayer(HttpExchange ex, XStream xStream) throws IOException{
		String currentGameID = getGameIdFromCookies(ex);
		JSONObject obj = new JSONObject(getRequestString(ex.getRequestBody()));
		String[] args = new String[6];
		args[0] = obj.optString("type");
		args[1] = obj.optString("playerIndex");
		args[2] = obj.optString("victimIndex");
		JSONObject subObject = obj.getJSONObject("location");
		args[3] = subObject.optString("x");
		args[4] = subObject.optString("y");
		args[5] = currentGameID;
		
		RobPlayer robPlayerObj = new RobPlayer();
		robPlayerObj.execute(args);
		robPlayerObj.persist();
		//System.out.println("yeah");
		CommandList.recordCommand(robPlayerObj);
		GameModel response = GameModelList.get(Integer.parseInt(currentGameID));
		sendResponseObject(ex, xStream, response);
	}

	private void finishTurn(HttpExchange ex, XStream xStream) throws IOException{
		String currentGameID = getGameIdFromCookies(ex);
		JSONObject obj = new JSONObject(getRequestString(ex.getRequestBody()));
		String[] args = new String[3];
		args[0] = obj.optString("type");
		args[1] = obj.optString("playerIndex");
		args[2] = currentGameID;
		
		FinishTurn finishTurnAction = new FinishTurn();
		finishTurnAction.execute(args);
		finishTurnAction.persist();
		CommandList.recordCommand(finishTurnAction);
		
		GameModel response = GameModelList.get(Integer.parseInt(currentGameID));
		sendResponseObject(ex, xStream, response);
	}

	private void getNewDevCard(HttpExchange ex, XStream xStream) throws IOException{
		String currentGameID = getGameIdFromCookies(ex);
		JSONObject obj = new JSONObject(getRequestString(ex.getRequestBody()));
		String[] args = new String[3];
		args[0] = obj.optString("playerIndex");
		args[1] = currentGameID;
		args[2] = obj.optString("type");
		BuyDevCard bdcObject = new BuyDevCard();
		bdcObject.execute(args);
		bdcObject.persist();
		CommandList.recordCommand(bdcObject);

		GameModel response = GameModelList.get(Integer.parseInt(currentGameID));
		sendResponseObject(ex, xStream, response);
	}

	private void useYearOfPlenty(HttpExchange ex, XStream xStream) throws IOException{
		String currentGameID = getGameIdFromCookies(ex);
		String[] args = new String[5];
		JSONObject obj = new JSONObject(getRequestString(ex.getRequestBody()));
		args[0] = obj.optString("playerIndex");
		args[1] = obj.optString("resource1");
		args[2] = obj.optString("resource2");
		args[3] = currentGameID;
		args[4] = obj.optString("type");
		
		YearOfPlenty yopObject = new YearOfPlenty();
		yopObject.execute(args);
		yopObject.persist();

		GameModel response = GameModelList.get(Integer.parseInt(currentGameID));
		sendResponseObject(ex, xStream, response);
	}

	private void useRoadBuilding(HttpExchange ex, XStream xStream) throws IOException{
		String currentGameID = getGameIdFromCookies(ex);
		String[] args = new String[9];
		JSONObject obj = new JSONObject(getRequestString(ex.getRequestBody()));
		args[0] = obj.optString("playerIndex");
		JSONObject subObject = obj.getJSONObject("spot1");
		args[1] = subObject.optString("x");
		args[2] = subObject.optString("y");
		args[3] = subObject.optString("direction");
		subObject = obj.getJSONObject("spot2");
		args[4] = subObject.optString("x");
		args[5] = subObject.optString("y");
		args[6] = subObject.optString("direction");
		args[7] = currentGameID;
		args[8] = obj.optString("type");
		

		RoadBuilding rbObject = new RoadBuilding();
		rbObject.execute(args);
		rbObject.persist();

		GameModel response = GameModelList.get(Integer.parseInt(currentGameID));
		sendResponseObject(ex, xStream, response);
	}

	private void useSoldier(HttpExchange ex, XStream xStream) throws IOException{
		String currentGameID = getGameIdFromCookies(ex);
		String[] args = new String[6];
		JSONObject obj = new JSONObject(getRequestString(ex.getRequestBody()));
		args[0] = obj.optString("playerIndex");
		args[1] = obj.optString("victimIndex");
		JSONObject subObject = obj.getJSONObject("location");
		args[2] = subObject.optString("x");
		args[3] = subObject.optString("y");
		args[4] = currentGameID;
		args[5] = obj.optString("type");

		Soldier sObject = new Soldier();
		sObject.execute(args);
		sObject.persist();

		GameModel response = GameModelList.get(Integer.parseInt(currentGameID));
		sendResponseObject(ex, xStream, response);
	}

	private void useMonopoly(HttpExchange ex, XStream xStream) throws IOException{
		String currentGameID = getGameIdFromCookies(ex);
		String[] args = new String[4];
		JSONObject obj = new JSONObject(getRequestString(ex.getRequestBody()));
		args[0] = obj.optString("playerIndex");
		args[1] = obj.optString("resource");
		args[2] = currentGameID;
		args[3] = obj.optString("type");
		
		Monopoly mObject = new Monopoly();
		mObject.execute(args);
		mObject.persist();

		GameModel response = GameModelList.get(Integer.parseInt(currentGameID));
		sendResponseObject(ex, xStream, response);
	}

	private void useMonument(HttpExchange ex, XStream xStream) throws IOException{
		String currentGameID = getGameIdFromCookies(ex);
		String[] args = new String[3];
		JSONObject obj = new JSONObject(getRequestString(ex.getRequestBody()));
		args[0] = obj.optString("playerIndex");
		args[1] = currentGameID;
		args[2] = obj.optString("type");
	
		Monument monObject = new Monument();
		monObject.execute(args);
		monObject.persist();

		GameModel response = GameModelList.get(Integer.parseInt(currentGameID));
		sendResponseObject(ex, xStream, response);
	}

	private void buildRoad(HttpExchange ex, XStream xStream) throws IOException{
		String currentGameID = getGameIdFromCookies(ex);
		JSONObject obj = new JSONObject(getRequestString(ex.getRequestBody()));
		String[] args = new String[7];
		args[0] = obj.optString("type");
		args[1] = obj.optString("playerIndex");
		JSONObject subObject = obj.getJSONObject("roadLocation");
		args[2] = subObject.optString("x");
		args[3] = subObject.optString("y");
		args[4] = subObject.optString("direction");
		args[5] = obj.optString("free");
		args[6] = currentGameID;
		BuildRoad buildRoadObj = new BuildRoad();
System.out.println(0);
		buildRoadObj.execute(args);
System.out.println(1);
		buildRoadObj.persist();
System.out.println(2);
		CommandList.recordCommand(buildRoadObj);
		GameModel response = GameModelList.get(Integer.parseInt(currentGameID));
		sendResponseObject(ex, xStream, response);
	}

	private void buildSettlement(HttpExchange ex, XStream xStream) throws IOException{
		String currentGameID = getGameIdFromCookies(ex);
		JSONObject obj = new JSONObject(getRequestString(ex.getRequestBody()));
		String[] args = new String[7];
		args[0] = obj.optString("type");
		args[1] = obj.optString("playerIndex");
		JSONObject subObject = obj.getJSONObject("vertexLocation");
		args[2] = subObject.optString("x");
		args[3] = subObject.optString("y");
		args[4] = subObject.optString("direction");
		args[5] = obj.optString("free");
		args[6] = currentGameID;

		BuildSettlement buildSettlementObj = new BuildSettlement();
		buildSettlementObj.execute(args);
		buildSettlementObj.persist();
		CommandList.recordCommand(buildSettlementObj);
		GameModel response = GameModelList.get(Integer.parseInt(currentGameID));
		sendResponseObject(ex, xStream, response);
	}

	private void buildCity(HttpExchange ex, XStream xStream) throws IOException{
		String currentGameID = getGameIdFromCookies(ex);
		JSONObject obj = new JSONObject(getRequestString(ex.getRequestBody()));
		String[] args = new String[6];
		args[0] = obj.optString("playerIndex");
		JSONObject subObject = obj.getJSONObject("vertexLocation");
		args[1] = subObject.optString("x");
		args[2] = subObject.optString("y");
		args[3] = subObject.optString("direction");
		args[4] = obj.optString("free");
		args[5] = currentGameID;

		BuildCity buildCityObj = new BuildCity();
		buildCityObj.execute(args);
		buildCityObj.persist();
		CommandList.recordCommand(buildCityObj);
		GameModel response = GameModelList.get(Integer.parseInt(currentGameID));
		sendResponseObject(ex, xStream, response);
	}

private void sendTradeOffer(HttpExchange ex, XStream xStream) throws IOException{
		String currentGameID = getGameIdFromCookies(ex);
		String[] args = new String[9];
		JSONObject obj = new JSONObject(getRequestString(ex.getRequestBody()));
		args[0] = obj.optString("playerIndex");
		JSONObject subObject = obj.getJSONObject("offer");
		args[1] = subObject.optString("brick");
		args[2] = subObject.optString("ore");
		args[3] = subObject.optString("sheep");
		args[4] = subObject.optString("wheat");
		args[5] = subObject.optString("wood");
		args[6] = obj.optString("receiver"); 
		args[7] = currentGameID;
		args[8] = obj.optString("type");
		SendTradeOffer sto = new SendTradeOffer();
		sto.execute(args);
		sto.persist();
		
		CommandList.recordCommand(sto);
		
		GameModel response = GameModelList.get(Integer.parseInt(currentGameID));
		sendResponseObject(ex, xStream, response);
		
		
		/*

		*/
	}

	private void sendTradeResponse(HttpExchange ex, XStream xStream) throws IOException{
		String currentGameID = getGameIdFromCookies(ex);
		String[] args = new String[4];
		JSONObject obj = new JSONObject(getRequestString(ex.getRequestBody()));
		args[0] = obj.optString("playerIndex");
		args[1] = obj.optString("willAccept");
		args[2] = currentGameID;
		args[3] = obj.optString("type");

		SendTradeOffer sto = new SendTradeOffer();
		sto.execute(args);
		sto.persist();
		
		CommandList.recordCommand(sto);
		
		GameModel response = GameModelList.get(Integer.parseInt(currentGameID));
		sendResponseObject(ex, xStream, response);
	}

	private void tradeWithBank(HttpExchange ex, XStream xStream) throws IOException{
		String currentGameID = getGameIdFromCookies(ex);
		JSONObject obj = new JSONObject(getRequestString(ex.getRequestBody()));
		String[] args = new String[6];
		args[0] = obj.optString("type");
		args[1] = obj.optString("playerIndex");
		args[2] = obj.optString("ratio");
		args[3] = obj.optString("inputResource").toLowerCase();
		args[4] = obj.optString("outputResource").toLowerCase();
		args[5] = currentGameID;
		
		MaritimeTrade maritimeTradeAction = new MaritimeTrade();
		maritimeTradeAction.execute(args);
		maritimeTradeAction.persist();
		CommandList.recordCommand(maritimeTradeAction);
		
		GameModel response = GameModelList.get(Integer.parseInt(currentGameID));
		sendResponseObject(ex, xStream, response);
	}

	private void discardCards(HttpExchange ex, XStream xStream) throws IOException{
		String currentGameID = getGameIdFromCookies(ex);
		JSONObject obj = new JSONObject(getRequestString(ex.getRequestBody()));
		String[] args = new String[8];
		args[0] = obj.optString("type");
		args[1] = obj.optString("playerIndex");
		JSONObject subObject = obj.getJSONObject("discardedCards");
		args[2] = subObject.optString("brick");
		args[3] = subObject.optString("ore");
		args[4] = subObject.optString("sheep");
		args[5] = subObject.optString("wheat");
		args[6] = subObject.optString("wood");
		args[7] = currentGameID;

		DiscardCards discardCardsObj = new DiscardCards();
		discardCardsObj.execute(args);
		discardCardsObj.persist();
		CommandList.recordCommand(discardCardsObj);

		GameModel response = GameModelList.get(Integer.parseInt(currentGameID));
		sendResponseObject(ex, xStream, response);
	}
    
}

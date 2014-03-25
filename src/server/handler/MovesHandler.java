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
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.Writer;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.Arrays;
import java.util.HashMap;
import server.command.*;
import server.JSONDataParser;
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

	private void updateChatLog(HttpExchange ex, XStream xStream) throws IOException{
		OutputStream responseStream = ex.getResponseBody();
		File jsonFile = new File (serverRoot + File.separator + "js" + File.separator + "api" + File.separator + "game_model.json");
		byte [] bytearray  = new byte [(int)jsonFile.length()];
		FileInputStream fis = new FileInputStream(jsonFile);
		BufferedInputStream bis = new BufferedInputStream(fis);
		bis.read(bytearray, 0, bytearray.length);
		//GameModel response = new GameModel();

		//OutputStream responseStream = ex.getResponseBody();
		ex.sendResponseHeaders(200, jsonFile.length());
		responseStream.write(bytearray,0,bytearray.length);
		responseStream.close();
	}

	private void udpateFromRoll(HttpExchange ex, XStream xStream) throws IOException{
		OutputStream responseStream = ex.getResponseBody();
		File jsonFile = new File (serverRoot + File.separator + "js" + File.separator + "api" + File.separator + "game_model.json");
		byte [] bytearray  = new byte [(int)jsonFile.length()];
		FileInputStream fis = new FileInputStream(jsonFile);
		BufferedInputStream bis = new BufferedInputStream(fis);
		bis.read(bytearray, 0, bytearray.length);
		//GameModel response = new GameModel();

		//OutputStream responseStream = ex.getResponseBody();
		ex.sendResponseHeaders(200, jsonFile.length());
		responseStream.write(bytearray,0,bytearray.length);
		responseStream.close();
	}

	private void robPlayer(HttpExchange ex, XStream xStream) throws IOException{
		OutputStream responseStream = ex.getResponseBody();
		File jsonFile = new File (serverRoot + File.separator + "js" + File.separator + "api" + File.separator + "game_model.json");
		byte [] bytearray  = new byte [(int)jsonFile.length()];
		FileInputStream fis = new FileInputStream(jsonFile);
		BufferedInputStream bis = new BufferedInputStream(fis);
		bis.read(bytearray, 0, bytearray.length);
		//GameModel response = new GameModel();

		//OutputStream responseStream = ex.getResponseBody();
		ex.sendResponseHeaders(200, jsonFile.length());
		responseStream.write(bytearray,0,bytearray.length);
		responseStream.close();
	}

	private void finishTurn(HttpExchange ex, XStream xStream) throws IOException{
		OutputStream responseStream = ex.getResponseBody();
		File jsonFile = new File (serverRoot + File.separator + "js" + File.separator + "api" + File.separator + "game_model.json");
		byte [] bytearray  = new byte [(int)jsonFile.length()];
		FileInputStream fis = new FileInputStream(jsonFile);
		BufferedInputStream bis = new BufferedInputStream(fis);
		bis.read(bytearray, 0, bytearray.length);
		//GameModel response = new GameModel();

		//OutputStream responseStream = ex.getResponseBody();
		ex.sendResponseHeaders(200, jsonFile.length());
		responseStream.write(bytearray,0,bytearray.length);
		responseStream.close();
	}

	private void getNewDevCard(HttpExchange ex, XStream xStream) throws IOException{
		InputStreamReader requestReader = new InputStreamReader(ex.getRequestBody(),"utf-8");
		BufferedReader bufferedReqReader = new BufferedReader(requestReader);

		int bytes;
		StringBuilder request = new StringBuilder(1024);
		while ((bytes = bufferedReqReader.read()) != -1) {
			request.append((char) bytes);
		}

		
		bufferedReqReader.close();
		requestReader.close();
		
		System.out.println(request.toString());

		Scanner scan = new Scanner(request.toString());
		System.out.println(scan.next());
		System.out.println(scan.next());
		System.out.println(scan.next());
		System.out.println(scan.next());
		String[] args = new String[]{scan.next().toString()};
		
		BuyDevCard bdcObject = new BuyDevCard();
		bdcObject.execute(args);
		CommandList.recordCommand(bdcObject);
		
		scan.close();

		OutputStream responseStream = ex.getResponseBody();
		File jsonFile = new File (serverRoot + File.separator + "js" + File.separator + "api" + File.separator + "game_model.json");
		byte [] bytearray  = new byte [(int)jsonFile.length()];
		FileInputStream fis = new FileInputStream(jsonFile);
		BufferedInputStream bis = new BufferedInputStream(fis);
		bis.read(bytearray, 0, bytearray.length);
		//GameModel response = new GameModel();

		//OutputStream responseStream = ex.getResponseBody();
		ex.sendResponseHeaders(200, jsonFile.length());
		responseStream.write(bytearray,0,bytearray.length);
		responseStream.close();
	}

	private void useYearOfPlenty(HttpExchange ex, XStream xStream) throws IOException{
		InputStreamReader requestReader = new InputStreamReader(ex.getRequestBody(),"utf-8");
		BufferedReader bufferedReqReader = new BufferedReader(requestReader);

		int bytes;
		StringBuilder request = new StringBuilder(1024);
		while ((bytes = bufferedReqReader.read()) != -1) {
			request.append((char) bytes);
		}

		bufferedReqReader.close();
		requestReader.close();
		
		System.out.println(request.toString());

		Scanner scan = new Scanner(request.toString());
		System.out.println(scan.next());
		System.out.println(scan.next());
		System.out.println(scan.next());
		System.out.println(scan.next());
		String[] args = new String[3];
		args[0]=scan.next().toString();
		scan.next();
		args[1] = scan.next().toString();
		scan.next();
		args[2] = scan.next().toString();
		scan.close();
		
		YearOfPlenty yopObject = new YearOfPlenty();
		yopObject.execute(args);

		OutputStream responseStream = ex.getResponseBody();
		File jsonFile = new File (serverRoot + File.separator + "js" + File.separator + "api" + File.separator + "game_model.json");
		byte [] bytearray  = new byte [(int)jsonFile.length()];
		FileInputStream fis = new FileInputStream(jsonFile);
		BufferedInputStream bis = new BufferedInputStream(fis);
		bis.read(bytearray, 0, bytearray.length);
		//GameModel response = new GameModel();

		//OutputStream responseStream = ex.getResponseBody();
		ex.sendResponseHeaders(200, jsonFile.length());
		responseStream.write(bytearray,0,bytearray.length);
		responseStream.close();
	}

	private void useRoadBuilding(HttpExchange ex, XStream xStream) throws IOException{
		InputStreamReader requestReader = new InputStreamReader(ex.getRequestBody(),"utf-8");
		BufferedReader bufferedReqReader = new BufferedReader(requestReader);

		int bytes;
		StringBuilder request = new StringBuilder(1024);
		while ((bytes = bufferedReqReader.read()) != -1) {
			request.append((char) bytes);
		}

		bufferedReqReader.close();
		requestReader.close();
		
		System.out.println(request.toString());

		Scanner scan = new Scanner(request.toString());
		String[] args = new String[7];
		System.out.println(scan.next());
		System.out.println(scan.next());
		System.out.println(scan.next());
		System.out.println(scan.next());
		args[0] = scan.next().toString();
		scan.next();
		scan.next();
		scan.next();
		args[1] = scan.next().toString();
		System.out.println(scan.next());
		args[2] = scan.next().toString();
		System.out.println(scan.next());
		args[3] = scan.next().toString();
		scan.next();
		scan.next();
		scan.next();
		scan.next();
		args[4] = scan.next().toString();
		scan.next();
		args[5] = scan.next().toString();
		scan.next();
		args[6] = scan.next().toString();
		scan.close();

		RoadBuilding rbObject = new RoadBuilding();
		rbObject.execute(args);

		OutputStream responseStream = ex.getResponseBody();
		File jsonFile = new File (serverRoot + File.separator + "js" + File.separator + "api" + File.separator + "game_model.json");
		byte [] bytearray  = new byte [(int)jsonFile.length()];
		FileInputStream fis = new FileInputStream(jsonFile);
		BufferedInputStream bis = new BufferedInputStream(fis);
		bis.read(bytearray, 0, bytearray.length);
		//GameModel response = new GameModel();

		//OutputStream responseStream = ex.getResponseBody();
		ex.sendResponseHeaders(200, jsonFile.length());
		responseStream.write(bytearray,0,bytearray.length);
		responseStream.close();
	}

	private void useSoldier(HttpExchange ex, XStream xStream) throws IOException{
		InputStreamReader requestReader = new InputStreamReader(ex.getRequestBody(),"utf-8");
		BufferedReader bufferedReqReader = new BufferedReader(requestReader);

		int bytes;
		StringBuilder request = new StringBuilder(1024);
		while ((bytes = bufferedReqReader.read()) != -1) {
			request.append((char) bytes);
		}

		bufferedReqReader.close();
		requestReader.close();
		
		System.out.println(request.toString());

		Scanner scan = new Scanner(request.toString());
		String[] args = new String[4];
		scan.next();
		scan.next();
		scan.next();
		scan.next();
		args[0] = scan.next();
		scan.next();
		args[1] = scan.next();
		scan.next();
		scan.next();
		scan.next();
		args[2] = scan.next();
		scan.next();
		args[3] = scan.next();
		scan.close();

		Soldier sObject = new Soldier();
		sObject.execute(args);

		OutputStream responseStream = ex.getResponseBody();
		File jsonFile = new File (serverRoot + File.separator + "js" + File.separator + "api" + File.separator + "game_model.json");
		byte [] bytearray  = new byte [(int)jsonFile.length()];
		FileInputStream fis = new FileInputStream(jsonFile);
		BufferedInputStream bis = new BufferedInputStream(fis);
		bis.read(bytearray, 0, bytearray.length);
		//GameModel response = new GameModel();

		//OutputStream responseStream = ex.getResponseBody();
		ex.sendResponseHeaders(200, jsonFile.length());
		responseStream.write(bytearray,0,bytearray.length);
		responseStream.close();
	}

	private void useMonopoly(HttpExchange ex, XStream xStream) throws IOException{
		InputStreamReader requestReader = new InputStreamReader(ex.getRequestBody(),"utf-8");
		BufferedReader bufferedReqReader = new BufferedReader(requestReader);

		int bytes;
		StringBuilder request = new StringBuilder(1024);
		while ((bytes = bufferedReqReader.read()) != -1) {
			request.append((char) bytes);
		}

		bufferedReqReader.close();
		requestReader.close();
		
		System.out.println(request.toString());
		
		Scanner scan = new Scanner(request.toString());
		String[] args = new String[2];
		scan.next();
		scan.next();
		scan.next();
		scan.next();
		args[1] = scan.next();
		scan.next();
		args[0] = scan.next();
		scan.close();
		
		Monopoly mObject = new Monopoly();
		mObject.execute(args);

		OutputStream responseStream = ex.getResponseBody();
		File jsonFile = new File (serverRoot + File.separator + "js" + File.separator + "api" + File.separator + "game_model.json");
		byte [] bytearray  = new byte [(int)jsonFile.length()];
		FileInputStream fis = new FileInputStream(jsonFile);
		BufferedInputStream bis = new BufferedInputStream(fis);
		bis.read(bytearray, 0, bytearray.length);
		//GameModel response = new GameModel();

		//OutputStream responseStream = ex.getResponseBody();
		ex.sendResponseHeaders(200, jsonFile.length());
		responseStream.write(bytearray,0,bytearray.length);
		responseStream.close();
	}

	private void useMonument(HttpExchange ex, XStream xStream) throws IOException{
		InputStreamReader requestReader = new InputStreamReader(ex.getRequestBody(),"utf-8");
		BufferedReader bufferedReqReader = new BufferedReader(requestReader);

		int bytes;
		StringBuilder request = new StringBuilder(1024);
		while ((bytes = bufferedReqReader.read()) != -1) {
			request.append((char) bytes);
		}

		bufferedReqReader.close();
		requestReader.close();
		
		System.out.println(request.toString());

		Scanner scan = new Scanner(request.toString());
		String[] args = new String[1];
	
		scan.next();
		scan.next();
		scan.next();
		scan.next();
		args[0] = scan.next();
		scan.close();
	
		Monument monObject = new Monument();
		monObject.execute(args);

		OutputStream responseStream = ex.getResponseBody();
		File jsonFile = new File (serverRoot + File.separator + "js" + File.separator + "api" + File.separator + "game_model.json");
		byte [] bytearray  = new byte [(int)jsonFile.length()];
		FileInputStream fis = new FileInputStream(jsonFile);
		BufferedInputStream bis = new BufferedInputStream(fis);
		bis.read(bytearray, 0, bytearray.length);
		//GameModel response = new GameModel();

		//OutputStream responseStream = ex.getResponseBody();
		ex.sendResponseHeaders(200, jsonFile.length());
		responseStream.write(bytearray,0,bytearray.length);
		responseStream.close();
	}

	private void buildRoad(HttpExchange ex, XStream xStream) throws IOException{
		InputStreamReader requestReader = new InputStreamReader(ex.getRequestBody(),"utf-8");
		BufferedReader bufferedReqReader = new BufferedReader(requestReader);

		int bytes;
		StringBuilder request = new StringBuilder(1024);
		while ((bytes = bufferedReqReader.read()) != -1) {
			request.append((char) bytes);
		}

		bufferedReqReader.close();
		requestReader.close();
		
		//System.out.println(request.toString());

		JSONObject obj = new JSONObject(request.toString());
		String[] args = new String[5];
		args[0] = obj.optString("playerIndex");
		JSONObject subObject = obj.getJSONObject("roadLocation");
		args[1] = subObject.optString("x");
		args[2] = subObject.optString("y");
		args[3] = subObject.optString("direction");
		args[4] = obj.optString("free");

System.out.println("parsed");

		BuildRoad buildRoadObj = new BuildRoad();
		buildRoadObj.execute(args);
System.out.println("executed");
		CommandList.recordCommand(buildRoadObj);
System.out.println("recorded");
		GameModel response = GameModel.getInstance();
		OutputStream responseStream = ex.getResponseBody();
		ex.sendResponseHeaders(200, xStream.toXML(response).length());
		xStream.toXML(response, responseStream);
		responseStream.close();
System.out.println("response sent");
	}

	private void buildSettlement(HttpExchange ex, XStream xStream) throws IOException{
		OutputStream responseStream = ex.getResponseBody();
		File jsonFile = new File (serverRoot + File.separator + "js" + File.separator + "api" + File.separator + "game_model.json");
		byte [] bytearray  = new byte [(int)jsonFile.length()];
		FileInputStream fis = new FileInputStream(jsonFile);
		BufferedInputStream bis = new BufferedInputStream(fis);
		bis.read(bytearray, 0, bytearray.length);
		//GameModel response = new GameModel();

		//OutputStream responseStream = ex.getResponseBody();
		ex.sendResponseHeaders(200, jsonFile.length());
		responseStream.write(bytearray,0,bytearray.length);
		responseStream.close();
	}

	private void buildCity(HttpExchange ex, XStream xStream) throws IOException{
		OutputStream responseStream = ex.getResponseBody();
		File jsonFile = new File (serverRoot + File.separator + "js" + File.separator + "api" + File.separator + "game_model.json");
		byte [] bytearray  = new byte [(int)jsonFile.length()];
		FileInputStream fis = new FileInputStream(jsonFile);
		BufferedInputStream bis = new BufferedInputStream(fis);
		bis.read(bytearray, 0, bytearray.length);
		//GameModel response = new GameModel();

		//OutputStream responseStream = ex.getResponseBody();
		ex.sendResponseHeaders(200, jsonFile.length());
		responseStream.write(bytearray,0,bytearray.length);
		responseStream.close();
	}

	private void sendTradeOffer(HttpExchange ex, XStream xStream) throws IOException{
		OutputStream responseStream = ex.getResponseBody();
		File jsonFile = new File (serverRoot + File.separator + "js" + File.separator + "api" + File.separator + "game_model.json");
		byte [] bytearray  = new byte [(int)jsonFile.length()];
		FileInputStream fis = new FileInputStream(jsonFile);
		BufferedInputStream bis = new BufferedInputStream(fis);
		bis.read(bytearray, 0, bytearray.length);
		//GameModel response = new GameModel();

		//OutputStream responseStream = ex.getResponseBody();
		ex.sendResponseHeaders(200, jsonFile.length());
		responseStream.write(bytearray,0,bytearray.length);
		responseStream.close();
	}

	private void sendTradeResponse(HttpExchange ex, XStream xStream) throws IOException{
		OutputStream responseStream = ex.getResponseBody();
		File jsonFile = new File (serverRoot + File.separator + "js" + File.separator + "api" + File.separator + "game_model.json");
		byte [] bytearray  = new byte [(int)jsonFile.length()];
		FileInputStream fis = new FileInputStream(jsonFile);
		BufferedInputStream bis = new BufferedInputStream(fis);
		bis.read(bytearray, 0, bytearray.length);
		//GameModel response = new GameModel();

		//OutputStream responseStream = ex.getResponseBody();
		ex.sendResponseHeaders(200, jsonFile.length());
		responseStream.write(bytearray,0,bytearray.length);
		responseStream.close();
	}

	private void tradeWithBank(HttpExchange ex, XStream xStream) throws IOException{
		OutputStream responseStream = ex.getResponseBody();
		File jsonFile = new File (serverRoot + File.separator + "js" + File.separator + "api" + File.separator + "game_model.json");
		byte [] bytearray  = new byte [(int)jsonFile.length()];
		FileInputStream fis = new FileInputStream(jsonFile);
		BufferedInputStream bis = new BufferedInputStream(fis);
		bis.read(bytearray, 0, bytearray.length);
		//GameModel response = new GameModel();

		//OutputStream responseStream = ex.getResponseBody();
		ex.sendResponseHeaders(200, jsonFile.length());
		responseStream.write(bytearray,0,bytearray.length);
		responseStream.close();
	}

	private void discardCards(HttpExchange ex, XStream xStream) throws IOException{
		InputStreamReader requestReader = new InputStreamReader(ex.getRequestBody(),"utf-8");
		BufferedReader bufferedReqReader = new BufferedReader(requestReader);

		int bytes;
		StringBuilder request = new StringBuilder(1024);
		while ((bytes = bufferedReqReader.read()) != -1) {
			request.append((char) bytes);
		}

		bufferedReqReader.close();
		requestReader.close();
		
		System.out.println(request.toString());

		JSONObject obj = new JSONObject(request.toString());
		String[] args = new String[6];
		args[0] = obj.optString("playerIndex");
		JSONObject subObject = obj.getJSONObject("discardedCards");
		args[1] = subObject.optString("brick");
		args[2] = subObject.optString("ore");
		args[3] = subObject.optString("sheep");
		args[4] = subObject.optString("wheat");
		args[5] = subObject.optString("wood");


		DiscardCards discardCardsObj = new DiscardCards();
		discardCardsObj.execute(args);
		CommandList.recordCommand(discardCardsObj);

		GameModel response = GameModel.getInstance();
		OutputStream responseStream = ex.getResponseBody();
		ex.sendResponseHeaders(200, xStream.toXML(response).length());
		xStream.toXML(response, responseStream);
		responseStream.close();




		// OutputStream responseStream = ex.getResponseBody();
		// File jsonFile = new File (serverRoot + File.separator + "js" + File.separator + "api" + File.separator + "game_model.json");
		// byte [] bytearray  = new byte [(int)jsonFile.length()];
		// FileInputStream fis = new FileInputStream(jsonFile);
		// BufferedInputStream bis = new BufferedInputStream(fis);
		// bis.read(bytearray, 0, bytearray.length);
		// //GameModel response = new GameModel();




		// //OutputStream responseStream = ex.getResponseBody();
		// ex.sendResponseHeaders(200, jsonFile.length());
		// responseStream.write(bytearray,0,bytearray.length);
		// responseStream.close();
	}
    
}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.handler;

import com.sun.net.httpserver.Headers;
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
import java.io.PrintStream;
import java.io.Writer;
import java.net.CookieManager;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import server.CookieDataParser;
import server.FormDataParser;
import server.JSONObject;
import server.ServerException;
import server.api.player.Player.PlayerColor;
import server.communication.GameInfo;
import server.communication.GameList;
import server.communication.PlayerInfo;

/**
 *
 * @author Wesley
 */
public class AllGamesHandler implements HttpHandler {
	
	private String serverRoot;
	
	public AllGamesHandler(String serverRoot){
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
			case "list":
				getGameList(ex, xStream);
				break;
			case "create":
				createGame(ex, xStream);
				break;
			case "join":
				joinGame(ex, xStream);
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
	
	private void sendResponseString(HttpExchange ex, XStream xStream, String response) throws IOException{
		OutputStream responseStream = ex.getResponseBody();
		byte[] responseData = response.getBytes(Charset.forName("utf-8"));
		ex.sendResponseHeaders(200, response.length());
		responseStream.write(responseData);
		responseStream.close();
	}
	
	private void sendResponseObject(HttpExchange ex, XStream xStream, Object response) throws IOException{
		OutputStream responseStream = ex.getResponseBody();
		ex.sendResponseHeaders(200, xStream.toXML(response).length());
		xStream.toXML(response, responseStream);
		responseStream.close();
	}

	private void getGameList(HttpExchange ex, XStream xStream) throws IOException{
		ArrayList<GameInfo> response = GameList.getGameList();
		
		sendResponseObject(ex, xStream, response);
	}

	private void createGame(HttpExchange ex, XStream xStream) throws IOException{
		HashMap<String, String> parsedRequest = FormDataParser.parse(getRequestString(ex.getRequestBody()));
		
		GameInfo response = GameList.addGame(parsedRequest.get("name"));
		
		sendResponseObject(ex, xStream, response);
	}

	private void joinGame(HttpExchange ex, XStream xStream) throws IOException {
		HashMap<String, String> parsedRequest = FormDataParser.parse(getRequestString(ex.getRequestBody()));
		
		List<String> currentCookies = ex.getRequestHeaders().get("Cookie");
		String currentUserData = null;
		HashMap<String, String> parsedCookies = new HashMap<>();
		
		if(currentCookies != null){
			parsedCookies = CookieDataParser.parse(currentCookies.get(0));
		}
		
		if(parsedCookies.get("catan.user") == null){
			String response = "You must login first.";
			sendResponseString(ex, xStream, response);
			return;
		}
		
		JSONObject obj = new JSONObject(parsedCookies.get("catan.user"));
		
		String response = "";
		
		try{
			PlayerInfo player = new PlayerInfo(PlayerColor.valueOf(parsedRequest.get("color")), Integer.parseInt(obj.optString("playerID")), obj.optString("name"));
			GameList.addPlayerToGame(player, Integer.parseInt(parsedRequest.get("id")));
			response = "Success! You have joined the game.";
			
			Headers responseHeaders = ex.getResponseHeaders();
			responseHeaders.add("Set-Cookie", "catan.game=" + parsedRequest.get("id") + "; path=/");
		} catch (Exception e){
			response = e.getMessage();
		} finally {
			sendResponseString(ex, xStream, response);
		}
		
	}
    
}

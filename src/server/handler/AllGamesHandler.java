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
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintStream;
import java.io.Writer;
import java.net.CookieManager;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import server.FormDataParser;
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

	private void getGameList(HttpExchange ex, XStream xStream) throws IOException{
		ArrayList<GameInfo> response = GameList.getGameList();
		OutputStream responseStream = ex.getResponseBody();
		ex.sendResponseHeaders(200, xStream.toXML(response).length());
		xStream.toXML(response, responseStream);
		responseStream.close();
	}

	private void createGame(HttpExchange ex, XStream xStream) throws IOException{
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
		
		HashMap<String, String> parsedRequest = FormDataParser.parse(request.toString());
		
		GameInfo response = GameList.addGame(parsedRequest.get("name"));
		OutputStream responseStream = ex.getResponseBody();
		ex.sendResponseHeaders(200, xStream.toXML(response).length());
		xStream.toXML(response, responseStream);
		responseStream.close();
	}

	private void joinGame(HttpExchange ex, XStream xStream) throws IOException {
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
		
		HashMap<String, String> parsedRequest = FormDataParser.parse(request.toString());
		
//		try{
//			PlayerInfo player = new PlayerInfo(parsedRequest.get("color"));
//			GameList.addplayerToGame(player, parsedRequest.get("id"));
//		}

		
//		Headers responseHeaders = ex.getResponseHeaders();
//		CookieManager cm = new CookieManager();
//		responseHeaders.add("Set-Cookie", "catan.game=0");
//		responseHeaders.add("Set-Cookie", "catan.user={\"name\":\"Sam\",\"password\":\"sam\",\"playerID\":0}");
//		
//		cm.put(ex.getRequestURI(), responseHeaders);
		
		OutputStream responseStream = ex.getResponseBody();
		String response = "Success! You have joined the game.";
		byte[] responseData = response.getBytes(Charset.forName("utf-8"));
		ex.sendResponseHeaders(200, response.length());
		responseStream.write(responseData);
		responseStream.close();
	}
    
}

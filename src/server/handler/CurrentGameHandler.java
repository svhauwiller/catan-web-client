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
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.Writer;
import java.nio.charset.Charset;
import java.util.ArrayList;
import server.communication.GameInfo;
import server.communication.GameModel;

/**
 *
 * @author Wesley
 */
public class CurrentGameHandler implements HttpHandler{
	
	private String serverRoot;
	
	public CurrentGameHandler(String serverRoot){
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
		
		String methodName = ex.getRequestURI().getPath().substring(6);
		switch(methodName){
			case "model":
				getGameModel(ex, xStream);
				break;
			case "reset":
				resetCurrentGame(ex, xStream);
				break;
			case "commands":
				getGameCommands(ex, xStream);
				break;
			case "addAI":
				addAItoGame(ex, xStream);
				break;
			case "listAI":
				listAIinGame(ex, xStream);
				break;
			default:
				throw new UnsupportedOperationException("\"" + methodName + "\" is not supported in this context.");
		}
    }

	private void getGameModel(HttpExchange ex, XStream xStream) throws IOException{
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

	private void resetCurrentGame(HttpExchange ex, XStream xStream) throws IOException{
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

	private void getGameCommands(HttpExchange ex, XStream xStream) throws IOException{
		OutputStream responseStream = ex.getResponseBody();
		File jsonFile = new File (serverRoot + File.separator + "js" + File.separator + "api" + File.separator + "game_commands.json");
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

	private void addAItoGame(HttpExchange ex, XStream xStream) throws IOException {
		OutputStream responseStream = ex.getResponseBody();
		String response = "Success";
		byte[] responseData = response.getBytes(Charset.forName("utf-8"));
		ex.sendResponseHeaders(200, response.length());
		responseStream.write(responseData);
		responseStream.close();
	}

	private void listAIinGame(HttpExchange ex, XStream xStream) throws IOException{
		OutputStream responseStream = ex.getResponseBody();
		File jsonFile = new File (serverRoot + File.separator + "js" + File.separator + "api" + File.separator + "game_listAI.json");
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
    
}

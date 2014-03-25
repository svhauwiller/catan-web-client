package server.handler;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.HierarchicalStreamWriter;
import com.thoughtworks.xstream.io.xml.DomDriver;
import com.thoughtworks.xstream.io.json.JettisonMappedXmlDriver;
import com.thoughtworks.xstream.io.json.JsonHierarchicalStreamDriver;
import com.thoughtworks.xstream.io.json.JsonWriter;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintStream;
import java.io.UnsupportedEncodingException;
import java.io.Writer;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import server.FormDataParser;
import server.ProductionModule;
import server.ServerException;
import server.api.player.Player;
import server.api.utils.*;
import server.communication.GameModel;



/**
 * Manages input/output to and from the client regarding the ValidateUser Method
 * 
 * @author Hauwiller
 */
public class UserHandler implements HttpHandler{
    /**
     * Confirms where or not a user exists in the database
     * 
     * @param ex Http Exchange Object
     * @throws IOException
     */
    @Override
    public void handle(HttpExchange ex) throws IOException {
        XStream xStream = new XStream(new JsonHierarchicalStreamDriver() {
			@Override
			public HierarchicalStreamWriter createWriter(Writer writer) {
				return new JsonWriter(writer, JsonWriter.DROP_ROOT_MODE);
			}
		});
        
        //Google Guice here; put specific iUserLogin class name below
        				System.out.println("Pre-juice");
        Injector injector = Guice.createInjector(new ProductionModule());
        				System.out.println("Mid-juice");
        iUserLogin theUser = injector.getInstance(iUserLogin.class);
        				System.out.println("Post-juice");
		String methodName = ex.getRequestURI().getPath().substring(6);
		switch(methodName){
			case "login":
				login(ex, xStream,theUser);
				break;
			case "register":
				registerUser(ex, xStream,theUser);
				break;
			default:
				throw new UnsupportedOperationException("\"" + methodName + "\" is not supported in this context.");
		}
    }

	private void login(HttpExchange ex, XStream xStream,iUserLogin theUser) throws IOException {
		String request = exchangeToString(ex.getRequestBody());
		HashMap<String, String> requestData = new HashMap<>();
		requestData = FormDataParser.parse(request);
		byte[]responseData = null;
		
		System.out.println("Original: " + request.toString());

		boolean validUserHuh = theUser.validateUserLogin(requestData);
		OutputStream responseStream = ex.getResponseBody();
		Headers responseHeaders = ex.getResponseHeaders();

		if(validUserHuh){
			String response = "Success";
			responseData = response.getBytes(Charset.forName("utf-8"));
			//get player information and set Cookie
			Player currentPlayer = GameModel.getPlayerByName(requestData.get("username"));
			responseHeaders.add("Set-Cookie", "catan.user={\"name\":\""+requestData.get("username")
					+"\",\"password\":\""+requestData.get("password")
					+"\",\"playerID\":"+currentPlayer.getUserID()+"}; "
					+"path=/");
			ex.sendResponseHeaders(200, response.length());
		}
		else{
			String response = "Failure";
			responseData = response.getBytes(Charset.forName("utf-8"));
		}
		responseStream.write(responseData);
		responseStream.close();
	}

	private void registerUser(HttpExchange ex, XStream xStream, iUserLogin theUser) throws IOException {
		String request = exchangeToString(ex.getRequestBody());
		HashMap<String, String> requestData = new HashMap<>();
		System.out.println("Pre-parse");
		requestData = FormDataParser.parse(request);
		System.out.println("UserHandler pre-call");
		theUser.registerUser(requestData); 
		
		OutputStream responseStream = ex.getResponseBody();

		String response = "Success";
		byte[] responseData = response.getBytes(Charset.forName("utf-8"));
		ex.sendResponseHeaders(200, response.length());
		responseStream.write(responseData);
		responseStream.close();
	}
	private String exchangeToString(InputStream requestBody)
	{
		StringBuilder request = new StringBuilder();
		try{
		InputStreamReader requestReader = new InputStreamReader(requestBody,"utf-8");
		BufferedReader bufferedReqReader = new BufferedReader(requestReader);

		int bytes;
		request = new StringBuilder(1024);
		while ((bytes = bufferedReqReader.read()) != -1) {
			request.append((char) bytes);
		}

		bufferedReqReader.close();
		requestReader.close();
		}
		catch(Exception e)
		{
			
		}
		return request.toString();
	}
}

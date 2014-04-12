package server.handler;

import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.HierarchicalStreamWriter;
import com.thoughtworks.xstream.io.json.JsonHierarchicalStreamDriver;
import com.thoughtworks.xstream.io.json.JsonWriter;
import java.net.URLEncoder;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.Writer;
import java.nio.charset.Charset;
import java.util.HashMap;
import server.FormDataParser;
import server.api.player.Player;
import server.api.utils.*;
import server.communication.ValidUsers;
import server.persist.StorageFacade;



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
        
        iUserLogin theUser = ValidUsers.getValidUsers();
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
		String response = null;


		boolean validUserHuh = theUser.validateUserLogin(requestData);
		//boolean validUserHuh = StorageFacade.validateUser(requestData.get("username"), requestData.get("password"));
		OutputStream responseStream = ex.getResponseBody();
		Headers responseHeaders = ex.getResponseHeaders();

		if(validUserHuh){
			response = "Success";
			//get player information and set Cookie
			int playerID = ValidUsers.getPlayerByName(requestData.get("username"));

			String encodedURL = URLEncoder.encode("{\"name\":\""+requestData.get("username")
					+"\",\"password\":\""+requestData.get("password")
					+"\",\"playerID\":"+playerID+"}","utf-8");
			
			responseHeaders.add("Set-Cookie", "catan.user="+encodedURL+"; path=/");
			ex.sendResponseHeaders(200, response.length());
		}
		else{
			response = "Failure";
			ex.sendResponseHeaders(400, response.length());
		}
		responseData = response.getBytes(Charset.forName("utf-8"));
		responseStream.write(responseData);
		responseStream.close();
	}

	private void registerUser(HttpExchange ex, XStream xStream, iUserLogin theUser) throws IOException {
		String request = exchangeToString(ex.getRequestBody());
		HashMap<String, String> requestData = new HashMap<>();
		requestData = FormDataParser.parse(request);
		boolean successHuh = theUser.registerUser(requestData); 
		String response = null;
		OutputStream responseStream = ex.getResponseBody();
		Headers responseHeaders = ex.getResponseHeaders();		
		
		if(successHuh){
			int playerID = ValidUsers.getPlayerByName(requestData.get("username"));
			response = "Success";
			String encodedURL = URLEncoder.encode("{\"name\":\""+requestData.get("username")
					+"\",\"password\":\""+requestData.get("password")
					+"\",\"playerID\":"+playerID+"}"
					,"utf-8");
			
			responseHeaders.add("Set-Cookie","catan.user="+encodedURL+"; path=/" );
			ex.sendResponseHeaders(200, response.length());	
		}
		else{
			response = "Failure";
			ex.sendResponseHeaders(400, response.length()); 
		}
		byte[] responseData = response.getBytes(Charset.forName("utf-8"));
		responseStream.write(responseData);
		responseStream.close();
	}
	
	private String exchangeToString(InputStream requestBody) throws IOException{
		InputStreamReader requestReader = new InputStreamReader(requestBody,"utf-8");
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
}

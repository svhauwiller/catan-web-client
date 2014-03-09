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
import java.io.IOException;
import java.io.OutputStream;
import java.io.Writer;
import java.nio.charset.Charset;

/**
 *
 * @author Wesley
 */
public class MovesHandler implements HttpHandler{

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
			case "Year_Of_Plenty":
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
			case "discardCards":
				discardCards(ex, xStream);
				break;
			default:
				throw new UnsupportedOperationException("\"" + methodName + "\" is not supported in this context.");
		}
    }

	private void updateChatLog(HttpExchange ex, XStream xStream) throws IOException {
		OutputStream responseStream = ex.getResponseBody();
		String response = "You have successfully called /moves/sendChat.";
		byte[] responseData = response.getBytes(Charset.forName("utf-8"));
		ex.sendResponseHeaders(200, response.length());
		responseStream.write(responseData);
		responseStream.close();
	}

	private void udpateFromRoll(HttpExchange ex, XStream xStream) throws IOException {
		OutputStream responseStream = ex.getResponseBody();
		String response = "You have successfully called /moves/rollNumber.";
		byte[] responseData = response.getBytes(Charset.forName("utf-8"));
		ex.sendResponseHeaders(200, response.length());
		responseStream.write(responseData);
		responseStream.close();
	}

	private void robPlayer(HttpExchange ex, XStream xStream) throws IOException {
		OutputStream responseStream = ex.getResponseBody();
		String response = "You have successfully called /moves/robPlayer.";
		byte[] responseData = response.getBytes(Charset.forName("utf-8"));
		ex.sendResponseHeaders(200, response.length());
		responseStream.write(responseData);
		responseStream.close();
	}

	private void finishTurn(HttpExchange ex, XStream xStream) throws IOException {
		OutputStream responseStream = ex.getResponseBody();
		String response = "You have successfully called /moves/finishTurn.";
		byte[] responseData = response.getBytes(Charset.forName("utf-8"));
		ex.sendResponseHeaders(200, response.length());
		responseStream.write(responseData);
		responseStream.close();
	}

	private void getNewDevCard(HttpExchange ex, XStream xStream) throws IOException {
		OutputStream responseStream = ex.getResponseBody();
		String response = "You have successfully called /moves/buyDevCard.";
		byte[] responseData = response.getBytes(Charset.forName("utf-8"));
		ex.sendResponseHeaders(200, response.length());
		responseStream.write(responseData);
		responseStream.close();
	}

	private void useYearOfPlenty(HttpExchange ex, XStream xStream) throws IOException {
		OutputStream responseStream = ex.getResponseBody();
		String response = "You have successfully called /moves/Year_Of_Plenty.";
		byte[] responseData = response.getBytes(Charset.forName("utf-8"));
		ex.sendResponseHeaders(200, response.length());
		responseStream.write(responseData);
		responseStream.close();
	}

	private void useRoadBuilding(HttpExchange ex, XStream xStream) throws IOException {
		OutputStream responseStream = ex.getResponseBody();
		String response = "You have successfully called /moves/Road_Building.";
		byte[] responseData = response.getBytes(Charset.forName("utf-8"));
		ex.sendResponseHeaders(200, response.length());
		responseStream.write(responseData);
		responseStream.close();
	}

	private void useSoldier(HttpExchange ex, XStream xStream) throws IOException {
		OutputStream responseStream = ex.getResponseBody();
		String response = "You have successfully called /moves/Soldier.";
		byte[] responseData = response.getBytes(Charset.forName("utf-8"));
		ex.sendResponseHeaders(200, response.length());
		responseStream.write(responseData);
		responseStream.close();
	}

	private void useMonopoly(HttpExchange ex, XStream xStream) throws IOException {
		OutputStream responseStream = ex.getResponseBody();
		String response = "You have successfully called /moves/Monopoly.";
		byte[] responseData = response.getBytes(Charset.forName("utf-8"));
		ex.sendResponseHeaders(200, response.length());
		responseStream.write(responseData);
		responseStream.close();
	}

	private void useMonument(HttpExchange ex, XStream xStream) throws IOException {
		OutputStream responseStream = ex.getResponseBody();
		String response = "You have successfully called /moves/Monument.";
		byte[] responseData = response.getBytes(Charset.forName("utf-8"));
		ex.sendResponseHeaders(200, response.length());
		responseStream.write(responseData);
		responseStream.close();
	}

	private void buildRoad(HttpExchange ex, XStream xStream) throws IOException {
		OutputStream responseStream = ex.getResponseBody();
		String response = "You have successfully called /moves/buildRoad.";
		byte[] responseData = response.getBytes(Charset.forName("utf-8"));
		ex.sendResponseHeaders(200, response.length());
		responseStream.write(responseData);
		responseStream.close();
	}

	private void buildSettlement(HttpExchange ex, XStream xStream) throws IOException {
		OutputStream responseStream = ex.getResponseBody();
		String response = "You have successfully called /moves/buildSettlement.";
		byte[] responseData = response.getBytes(Charset.forName("utf-8"));
		ex.sendResponseHeaders(200, response.length());
		responseStream.write(responseData);
		responseStream.close();
	}

	private void buildCity(HttpExchange ex, XStream xStream) throws IOException {
		OutputStream responseStream = ex.getResponseBody();
		String response = "You have successfully called /moves/buildCity.";
		byte[] responseData = response.getBytes(Charset.forName("utf-8"));
		ex.sendResponseHeaders(200, response.length());
		responseStream.write(responseData);
		responseStream.close();
	}

	private void sendTradeOffer(HttpExchange ex, XStream xStream) throws IOException {
		OutputStream responseStream = ex.getResponseBody();
		String response = "You have successfully called /moves/offerTrade.";
		byte[] responseData = response.getBytes(Charset.forName("utf-8"));
		ex.sendResponseHeaders(200, response.length());
		responseStream.write(responseData);
		responseStream.close();
	}

	private void sendTradeResponse(HttpExchange ex, XStream xStream) throws IOException {
		OutputStream responseStream = ex.getResponseBody();
		String response = "You have successfully called /moves/acceptTrade.";
		byte[] responseData = response.getBytes(Charset.forName("utf-8"));
		ex.sendResponseHeaders(200, response.length());
		responseStream.write(responseData);
		responseStream.close();
	}

	private void discardCards(HttpExchange ex, XStream xStream) throws IOException {
		OutputStream responseStream = ex.getResponseBody();
		String response = "You have successfully called /moves/discardCards.";
		byte[] responseData = response.getBytes(Charset.forName("utf-8"));
		ex.sendResponseHeaders(200, response.length());
		responseStream.write(responseData);
		responseStream.close();
	}
    
}

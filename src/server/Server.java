/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package server;

import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.net.InetSocketAddress;
import server.handler.*;

/**
 *
 * @author Hauwiller
 */
public class Server {
	private static final int SERVER_PORT_NUMBER = 8081;
	private static final int MAX_WAITING_CONNECTIONS = 0;
	
	private String serverRoot;

	private HttpServer server;

	private Server() {
	}

	private void run(String[] args) throws ServerException {

		serverRoot = args[0];
		
		try {
			server = HttpServer.create(new InetSocketAddress(SERVER_PORT_NUMBER), MAX_WAITING_CONNECTIONS);
		} catch (IOException ex) {
			throw new ServerException("Could not create HTTP server", ex);
		}

		server.setExecutor(null); // use the default executor

		server.createContext("/", new BaseHandler(serverRoot));
		server.createContext("/user/", new UserHandler());
		server.createContext("/games/", new AllGamesHandler());
		server.createContext("/game/", new CurrentGameHandler());
		server.createContext("/util/", new UtilitiesHandler());
		server.createContext("/moves/", new MovesHandler());
		//server.createContext("/games/list", new TestHandler());

		server.start();
	}

	/**
	 * @param args the command line arguments
	 * @throws ServerException  
	 */
	public static void main(String[] args) throws ServerException {
		new Server().run(args);
	}
}

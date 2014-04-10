/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package server;

import com.google.inject.*;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.net.InetSocketAddress;
import server.handler.*;
import server.persist.StorageFacade;
import server.persist.db.*;
import server.persist.xml.*;

/**
 *
 * @author Hauwiller
 */
public class Server {
	private static final int SERVER_PORT_NUMBER = 8081;
	private static final int MAX_WAITING_CONNECTIONS = 0;
	
	public static int PERSIST_CHECKPOINT;
	public static Injector CLASS_INJECTOR = null;
	
	private String serverRoot;

	private HttpServer server;

	private Server() {
	}

	private void run(String[] args) throws ServerException {

		StorageFacade.PERSIST_NUMBER = Integer.parseInt(args[1]);
		serverRoot = args[2];
		
		if(args[0].equals("file")){
			StorageFacade.setCommandList(new CommandListXMLAO());
			StorageFacade.setGameAndUser(new GameAndUserJoinXMLAO());
			StorageFacade.setGameInfo(new GameInfoXMLAO());
			StorageFacade.setUsers(new UsersXMLAO());
		} else {
			DatabaseConnection.initialize();
			DatabaseConnection dbconn = new DatabaseConnection();
			StorageFacade.setCommandList(new CommandListDAO(dbconn));
			StorageFacade.setGameAndUser(new GameAndUserJoinDAO(dbconn));
			StorageFacade.setGameInfo(new GameInfoDAO(dbconn));
			StorageFacade.setUsers(new UsersDAO(dbconn));
		}
		
		if(args.length > 3){
			Server.CLASS_INJECTOR = Guice.createInjector(new TestingModule());
		} else {
			Server.CLASS_INJECTOR = Guice.createInjector(new ProductionModule());
		}
		
		
		try {
			server = HttpServer.create(new InetSocketAddress(SERVER_PORT_NUMBER), MAX_WAITING_CONNECTIONS);
		} catch (IOException ex) {
			throw new ServerException("Could not create HTTP server", ex);
		}

		server.setExecutor(null); // use the default executor

		server.createContext("/", new BaseHandler(serverRoot));
		server.createContext("/user/", new UserHandler());
		server.createContext("/games/", new AllGamesHandler(serverRoot));
		server.createContext("/game/", new CurrentGameHandler(serverRoot));
		server.createContext("/util/", new UtilitiesHandler());
		server.createContext("/moves/", new MovesHandler(serverRoot));
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

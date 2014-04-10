package server.persist;

import java.util.ArrayList;

import server.api.player.Player.PlayerColor;
import server.command.CommandTemplate;
import server.communication.CommandList;
import server.communication.GameModel;
import server.communication.GameModelList;

public class StorageFacade {
		public static int PERSIST_NUMBER = 50;
		private CommandListAO localCommandList;
		private GameAndUserJoinAO gameAndUser;
		private GameInfoAO gameInfo;
		private UsersAO users;
		private static StorageFacade instance;
		
		private StorageFacade(){
			localCommandList = null;
			gameAndUser = null;
			gameInfo = null;
			users = null;
		}
		
		private static StorageFacade instance()
		{
			if (instance == null)
			{
				instance = new StorageFacade();
			}
			return instance;
		}

	
	//Setters
	private void _setCommandList(CommandListAO commandList) {
		this.localCommandList = commandList;
	}
	private void _setGameAndUser(GameAndUserJoinAO gameAndUser) {
		this.gameAndUser = gameAndUser;
	}
	private void _setGameInfo(GameInfoAO gameInfo) {
		this.gameInfo = gameInfo;
	}
	private void _setUsers(UsersAO users) {
		this.users = users;
	}

	/**addUser
	 * 
	 * @param theUsername
	 * @param thePassword
	 */
	private void _addUser(String theUsername, String thePassword){
		users.add(theUsername, thePassword);
	}
	
	/**validateUser
	 * 
	 * @param theUsername
	 * @param thePassword
	 * @return
	 */
	private boolean _validateUser(String theUsername, String thePassword){
		return users.validate(theUsername, thePassword);  
	}
	
	private void _addGame(String theGameTitle, GameModel initialGame){
		gameInfo.add(theGameTitle, initialGame);
		
	}
	
	/**joinGame
	 * 
	 * @param thePlayerID
	 * @param theGameID
	 * @param playerColor
	 */
	private void _joinGame(int thePlayerID, int theGameID, PlayerColor playerColor){
		gameAndUser.add(thePlayerID, theGameID, playerColor);
	}
	
	/**addCommand
	 * 
	 * @param theGameID
	 * @param command
	 */
	private void _addCommand(int theGameID, CommandTemplate command){
		localCommandList.add(theGameID, command);
		int numberOfCommands = CommandList.getExecutedCommands().size();
		
		if ((numberOfCommands % 50) == 0){
			_persistGame("current", theGameID);
		}
	}
	
	/**persist
	 * 
	 * @param type
	 * @param theGameID
	 */
	private void _persistGame(String type, int theGameID){
		gameInfo.update(type, GameModelList.get(theGameID), theGameID);
		
	}
	
	/**restoreGameState
	 * 
	 * @param theGameID
	 */
	private void _restoreGameState(int theGameID){
		GameModelList.set(theGameID, gameInfo.getCurr(theGameID));
		
		ArrayList<CommandTemplate>theCommands = localCommandList.getFromIndex(theGameID, 0);
		for(CommandTemplate command: theCommands){
			command.redo();
		}
		
	}
	
	/**resetGame
	 * 
	 * @param theGameID
	 */
	private void _resetGame(int theGameID){
		GameModelList.set(theGameID, gameInfo.getInit(theGameID));
		localCommandList.reset(theGameID); 
		gameInfo.reset(theGameID); 
	}
	
	public static void setCommandList(CommandListAO cmdList) { instance()._setCommandList(cmdList); }
	public static void setGameAndUser(GameAndUserJoinAO gameAndUser) { instance()._setGameAndUser(gameAndUser); }
	public static void setGameInfo(GameInfoAO gameInfo) { instance()._setGameInfo(gameInfo); }
	public static void setUsers(UsersAO users) { instance()._setUsers(users); }
	
	public static void addUser(String username, String password) { instance()._addUser(username, password); }
	public static boolean validateUser(String username, String password) { return instance()._validateUser(username, password); }
	public static void addGame(String gameTitle, GameModel initModel) { instance()._addGame(gameTitle, initModel); }
	public static void joinGame(int playerID, int gameID, PlayerColor color) { instance()._joinGame(playerID, gameID, color); }
	public static void addCommand(int gameID, CommandTemplate cmd) { instance()._addCommand(gameID, cmd); }
	public static void persistGame(String type, int gameID) { instance()._persistGame(type, gameID); }
	public static void restoreGameState(int gameID) { instance()._restoreGameState(gameID); }
	public static void resetGame(int gameID) { instance()._resetGame(gameID); }
	
}
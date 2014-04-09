package server.persist;

import java.util.ArrayList;

import server.api.player.Player.PlayerColor;
import server.command.CommandTemplate;
import server.communication.CommandList;
import server.communication.GameModel;
import server.communication.GameModelList;

public class StorageFacade {
		private CommandListAO localCommandList;
		private GameAndUserJoinAO gameAndUser;
		private GameInfoAO gameInfo;
		private UsersAO users;
		public static StorageFacade instance;
		
//	public storageFacade(CommandListAO clAO, GameAndUserJoinAO gauAO, GameInfoAO giAO, UsersAO uAO){
//		setCommandList(clAO);
//		setGameAndUser(gauAO);
//		setGameInfo(giAO);
//		setUsers(uAO);		
//	}
		private StorageFacade(){
			localCommandList = null;
			gameAndUser = null;
			gameInfo = null;
			users = null;
		}
		public static StorageFacade instance()
		{
			if (instance == null)
			{
				instance = new StorageFacade();
			}
			return instance;
		}

	
	//Setters
	public void setCommandList(CommandListAO commandList) {
		this.localCommandList = commandList;
	}
	public void setGameAndUser(GameAndUserJoinAO gameAndUser) {
		this.gameAndUser = gameAndUser;
	}
	public void setGameInfo(GameInfoAO gameInfo) {
		this.gameInfo = gameInfo;
	}
	public void setUsers(UsersAO users) {
		this.users = users;
	}

	/**addUser
	 * 
	 * @param theUsername
	 * @param thePassword
	 */
	public void addUser(String theUsername, String thePassword){
		users.add(theUsername, thePassword);
	}
	
	/**validateUser
	 * 
	 * @param theUsername
	 * @param thePassword
	 * @return
	 */
	public boolean validateUser(String theUsername, String thePassword){
		return users.validate(theUsername, thePassword);  
	}
	
	public void addGame(String theGameTitle, GameModel initialGame){
		gameInfo.add(theGameTitle, initialGame);
		
	}
	
	/**joinGame
	 * 
	 * @param thePlayerID
	 * @param theGameID
	 * @param playerColor
	 */
	public void joinGame(int thePlayerID, int theGameID, PlayerColor playerColor){
		gameAndUser.add(thePlayerID, theGameID, playerColor);
	}
	
	/**addCommand
	 * 
	 * @param theGameID
	 * @param command
	 */
	public void addCommand(int theGameID, CommandTemplate command){
		localCommandList.add(theGameID, command);
		int numberOfCommands = CommandList.getExecutedCommands().size();
		
		if ((numberOfCommands % 50) == 0){
		persistGame("current", theGameID);
		}
	}
	
	/**persist
	 * 
	 * @param type
	 * @param theGameID
	 */
	private void persistGame(String type, int theGameID){
		gameInfo.update(type, GameModelList.get(theGameID), theGameID);
		
	}
	
	/**restoreGameState
	 * 
	 * @param theGameID
	 */
	public void restoreGameState(int theGameID){
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
	public void resetGame(int theGameID){
		GameModelList.set(theGameID, gameInfo.getInit(theGameID));
		localCommandList.reset(theGameID); 
		gameInfo.reset(theGameID); 
	}
}

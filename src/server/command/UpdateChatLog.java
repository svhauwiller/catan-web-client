package server.command;

import server.communication.GameModel;
import server.communication.GameModelList;
import server.api.utils.*;
import server.persist.*;



public class UpdateChatLog implements CommandTemplate{
	private String type = null;
	private int playerIndex = -1;
	private String content = null;
	private String source = null;
	private int gameID = -10;

	@Override
	public GameModel execute(String[] args){

		type = args[0];
		playerIndex = Integer.parseInt(args[1]);
		content = args[2];
		gameID = Integer.parseInt(args[3]);

		source = GameModelList.get(gameID).getPlayer(playerIndex).getName();
		
		//System.out.println("Monkey 3");

		MessageLine messageLine = new MessageLine(content, source);

		//System.out.println("executing 11");

		MessageList chatList = GameModelList.get(gameID).getChat();

		chatList.getLines().add(messageLine);

		//System.out.println("updated the chatList");
		
		GameModelList.get(gameID).incrementRevision();
		return null;
	}

	@Override
	public void persist(){
	
	}
	@Override
	public void redo(){
		source = GameModelList.get(gameID).getPlayer(playerIndex).getName();

		MessageLine messageLine = new MessageLine(content, source);

		MessageList chatList = GameModelList.get(gameID).getChat();

		chatList.getLines().add(messageLine);
		
		GameModelList.get(gameID).incrementRevision();
	}

	@Override
	public void undo(){
		
	}
}

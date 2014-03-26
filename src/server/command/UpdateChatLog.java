package server.command;

import server.communication.GameModel;
import server.api.utils.*;



public class UpdateChatLog implements CommandTemplate{
	private String type = null;
	private int playerIndex = -1;
	private String content = null;
	private String source = null;


	@Override
	public GameModel execute(String[] args){

		type = args[0];
		playerIndex = Integer.parseInt(args[1]);
		content = args[2];

		source = GameModel.getPlayer(playerIndex).getName();
		
		//System.out.println("Monkey 3");

		MessageLine messageLine = new MessageLine(content, source);

		//System.out.println("executing 11");

		MessageList chatList = GameModel.getChat();

		chatList.getLines().add(messageLine);

		//System.out.println("updated the chatList");
		
		GameModel.incrementRevision();
		return null;
	}
	@Override
	public void undo(){
		
	}
}

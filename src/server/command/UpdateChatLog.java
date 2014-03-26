package server.command;

import server.communication.GameModel;
import server.api.utils.*;



public class UpdateChatLog implements CommandTemplate{
	private int playerIndex = -1;
	private String content = null;
	private String source = null;


	@Override
	public GameModel execute(String[] args){

		playerIndex = Integer.parseInt(args[0]);
		content = args[1];

		source = GameModel.getPlayer(playerIndex).getName();
		
		//System.out.println("Monkey 3");

		MessageLine messageLine = new MessageLine(content, source);

		//System.out.println("executing 11");

		MessageList chatList = GameModel.getChat();

		chatList.getLines().add(messageLine);

		//System.out.println("updated the chatList");

		return null;
	}
	@Override
	public void undo(){
		
	}
}

package server.command;

import server.communication.GameModel;
import server.communication.GameModelList;
import server.persist.*;
import java.util.*;
import server.api.utils.MessageLine;

public class Monument implements CommandTemplate {
	private String type = "Monument";
	private int playerIndex =-1;
	private int gameID = -10;
	//args[0] = player id
	public GameModel execute(String[] args){
		playerIndex = Integer.parseInt(args[0]);
		//change the points
		gameID = Integer.parseInt(args[1]);
		type = args[2];
		GameModelList.get(gameID).getPlayer(playerIndex).updateVictoryPoints(1);
		GameModelList.get(gameID).getPlayer(playerIndex).getOldDevCards().updateMonument(-1);
		GameModelList.get(gameID).getPlayer(playerIndex).updateMonuments(1);
		
		// update log
		MessageLine logMsg = new MessageLine();
		logMsg.setSource(GameModelList.get(gameID).getPlayer(playerIndex).getName());
		logMsg.setMessage(GameModelList.get(gameID).getPlayer(playerIndex).getName() + " has played a Monument card.");
		GameModelList.get(gameID).getLog().addLine(logMsg);
		
		return null;
	}
	@Override
	public void persist(){
		StorageFacade.addCommand(gameID, this, type);
	}
	@Override
	public void redo(){
		GameModelList.get(gameID).getPlayer(playerIndex).updateVictoryPoints(1);
		GameModelList.get(gameID).getPlayer(playerIndex).getOldDevCards().updateMonument(-1);
		GameModelList.get(gameID).getPlayer(playerIndex).updateMonuments(1);
		
		// update log
		MessageLine logMsg = new MessageLine();
		logMsg.setSource(GameModelList.get(gameID).getPlayer(playerIndex).getName());
		logMsg.setMessage(GameModelList.get(gameID).getPlayer(playerIndex).getName() + " has played a Monument card.");
		GameModelList.get(gameID).getLog().addLine(logMsg);
	}
	@Override
	public void undo(){
		GameModelList.get(gameID).getPlayer(playerIndex).updateVictoryPoints(-1);
		GameModelList.get(gameID).getPlayer(playerIndex).getOldDevCards().updateMonument(1);
		GameModelList.get(gameID).getPlayer(playerIndex).updateMonuments(-1);
	}
}
package server.command;

import server.communication.GameModel;
import server.communication.GameModelList;
import server.persist.*;
import java.util.*;

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
		return null;
	}
	@Override
	public void persist(){
		StorageFacade.instance.addCommand(gameID, this);
	}
	@Override
	public void redo(){}
	@Override
	public void undo(){
		GameModelList.get(gameID).getPlayer(playerIndex).updateVictoryPoints(-1);
		GameModelList.get(gameID).getPlayer(playerIndex).getOldDevCards().updateMonument(1);
		GameModelList.get(gameID).getPlayer(playerIndex).updateMonuments(-1);
	}
}
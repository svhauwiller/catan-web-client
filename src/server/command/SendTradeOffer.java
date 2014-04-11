package server.command;

import server.communication.GameModel;
import server.communication.GameModelList;
import server.persist.*;

public class SendTradeOffer implements CommandTemplate{
	private int playerIndex;
	private int brick;
	private int ore;
	private int sheep;
	private int wheat;
	private int wood;
	private int receiver;
	private int gameID;
	private String type = "";
	

	
	@Override
	public GameModel execute(String[] args) {
			playerIndex = Integer.parseInt(args[0]);
			brick = Integer.parseInt(args[1]);
			ore = Integer.parseInt(args[2]);
			sheep = Integer.parseInt(args[3]);
			wheat = Integer.parseInt(args[4]);
			wood = Integer.parseInt(args[5]);
			receiver = Integer.parseInt(args[6]);
			gameID = Integer.parseInt(args[7]);
			type = args[8];
			
			GameModelList.get(gameID).getTradeOffer().setSender(playerIndex);
			GameModelList.get(gameID).getTradeOffer().setReceiver(receiver);
			GameModelList.get(gameID).getTradeOffer().getTheResourceList().setBrick(brick); 
			GameModelList.get(gameID).getTradeOffer().getTheResourceList().setOre(ore);
			GameModelList.get(gameID).getTradeOffer().getTheResourceList().setSheep(sheep);
			GameModelList.get(gameID).getTradeOffer().getTheResourceList().setWheat(wheat);
			GameModelList.get(gameID).getTradeOffer().getTheResourceList().setWood(wood);
			

			GameModelList.get(gameID).incrementRevision();
		return null;
	}

	@Override
	public void persist(){
		StorageFacade.addCommand(gameID, this, type);
	}
	@Override
	public void redo(){
		GameModelList.get(gameID).getTradeOffer().setSender(playerIndex);
		GameModelList.get(gameID).getTradeOffer().setReceiver(receiver);
		GameModelList.get(gameID).getTradeOffer().getTheResourceList().setBrick(brick); 
		GameModelList.get(gameID).getTradeOffer().getTheResourceList().setOre(ore);
		GameModelList.get(gameID).getTradeOffer().getTheResourceList().setSheep(sheep);
		GameModelList.get(gameID).getTradeOffer().getTheResourceList().setWheat(wheat);
		GameModelList.get(gameID).getTradeOffer().getTheResourceList().setWood(wood);
		

		GameModelList.get(gameID).incrementRevision();
	
	}

	@Override
	public void undo() {

		
	}

}

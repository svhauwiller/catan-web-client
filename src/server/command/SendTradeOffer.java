package server.command;

import server.communication.GameModel;

public class SendTradeOffer implements CommandTemplate{
	private int playerIndex;
	private int brick;
	private int ore;
	private int sheep;
	private int wheat;
	private int wood;
	private int receiver;
	@Override
	public GameModel execute(String[] args) {
			playerIndex = Integer.parseInt(args[0]);
			brick = Integer.parseInt(args[1]);
			ore = Integer.parseInt(args[2]);
			sheep = Integer.parseInt(args[3]);
			wheat = Integer.parseInt(args[4]);
			wood = Integer.parseInt(args[5]);
			receiver = Integer.parseInt(args[6]);
			
			GameModel.getTradeOffer().setSender(playerIndex);
			GameModel.getTradeOffer().setReceiver(receiver);
			GameModel.getTradeOffer().getTheResourceList().setBrick(brick); 
			GameModel.getTradeOffer().getTheResourceList().setOre(ore);
			GameModel.getTradeOffer().getTheResourceList().setSheep(sheep);
			GameModel.getTradeOffer().getTheResourceList().setWheat(wheat);
			GameModel.getTradeOffer().getTheResourceList().setWood(wood);
			

		GameModel.incrementRevision();
		return null;
	}

	@Override
	public void undo() {

		
	}

}

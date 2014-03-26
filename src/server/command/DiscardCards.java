package server.command;

import server.communication.GameModel;
import server.api.bank.ResourceCardList;
import server.api.utils.MessageLine;

public class DiscardCards implements CommandTemplate{
	private String type = null;
	private int playerIndex = -1;
	private int brick = -1;
	private int ore = -1;
	private int sheep = -1;
	private int wheat = -1;
	private int wood = -1;


	@Override
	public GameModel execute(String[] args){

		type = args[0];
		playerIndex = Integer.parseInt(args[1]);
		brick = Integer.parseInt(args[2]);
		ore = Integer.parseInt(args[3]);
		sheep = Integer.parseInt(args[4]);
		wheat = Integer.parseInt(args[5]);
		wood = Integer.parseInt(args[6]);

		GameModel.getBank().updateBrick(-brick);
		GameModel.getBank().updateOre(-ore);
		GameModel.getBank().updateSheep(-sheep);
		GameModel.getBank().updateWheat(-wheat);
		GameModel.getBank().updateWood(-wood);

		//System.out.println("executing 3");

		ResourceCardList playersHand = GameModel.getPlayer(playerIndex).getResourceCardList();

		//System.out.println("executing 4");


		playersHand.updateBrick(brick);
		playersHand.updateOre(ore);
		playersHand.updateSheep(sheep);
		playersHand.updateWheat(wheat);
		playersHand.updateWood(wood);

		//System.out.println("updated the junk");


		MessageLine logMsg = new MessageLine();
		logMsg.setSource(GameModel.getPlayer(playerIndex).getName());
		logMsg.setMessage(GameModel.getPlayer(playerIndex).getName() + " discarded some cards.");
		GameModel.getLog().addLine(logMsg);

		GameModel.incrementRevision();
		return null;
	}
	@Override
	public void undo(){
		
	}
}

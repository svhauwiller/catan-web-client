package server.command;

import server.communication.GameModel;
import server.api.bank.ResourceCardList;


public class DiscardCards implements CommandTemplate{
	private int playerIndex = -1;
	private int brick = -1;
	private int ore = -1;
	private int sheep = -1;
	private int wheat = -1;
	private int wood = -1;


	@Override
	public GameModel execute(String[] args){

		playerIndex = Integer.parseInt(args[0]);
		brick = Integer.parseInt(args[1]);
		ore = Integer.parseInt(args[2]);
		sheep = Integer.parseInt(args[3]);
		wheat = Integer.parseInt(args[4]);
		wood = Integer.parseInt(args[5]);

		GameModel.getBank().updateBrick(-brick);
		GameModel.getBank().updateOre(-ore);
		GameModel.getBank().updateSheep(-sheep);
		GameModel.getBank().updateWheat(-wheat);
		GameModel.getBank().updateWood(-wood);

		System.out.println("executing 3");

		ResourceCardList playersHand = GameModel.getPlayer(playerIndex).getResourceCardList();

		System.out.println("executing 4");


		playersHand.updateBrick(brick);
		playersHand.updateOre(ore);
		playersHand.updateSheep(sheep);
		playersHand.updateWheat(wheat);
		playersHand.updateWood(wood);

		System.out.println("updated the junk");

		return null;
	}
	@Override
	public void undo(){
		
	}
}

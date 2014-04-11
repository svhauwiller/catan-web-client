package server.command;

import server.communication.GameModel;
import server.communication.GameModelList;
import server.api.bank.ResourceCardList;
import server.api.utils.MessageLine;
import server.persist.*;

public class DiscardCards implements CommandTemplate{
	private String type = null;
	private int playerIndex = -1;
	private int brick = -1;
	private int ore = -1;
	private int sheep = -1;
	private int wheat = -1;
	private int wood = -1;
	private int gameID = -10;
	



	@Override
	public GameModel execute(String[] args){

		type = args[0];
		playerIndex = Integer.parseInt(args[1]);
		brick = Integer.parseInt(args[2]);
		ore = Integer.parseInt(args[3]);
		sheep = Integer.parseInt(args[4]);
		wheat = Integer.parseInt(args[5]);
		wood = Integer.parseInt(args[6]);
		gameID = Integer.parseInt(args[7]);

		GameModelList.get(gameID).getBank().updateBrick(-brick);
		GameModelList.get(gameID).getBank().updateOre(-ore);
		GameModelList.get(gameID).getBank().updateSheep(-sheep);
		GameModelList.get(gameID).getBank().updateWheat(-wheat);
		GameModelList.get(gameID).getBank().updateWood(-wood);

		//System.out.println("executing 3");

		ResourceCardList playersHand = GameModelList.get(gameID).getPlayer(playerIndex).getResourceCardList();

		//System.out.println("executing 4");


		playersHand.updateBrick(brick);
		playersHand.updateOre(ore);
		playersHand.updateSheep(sheep);
		playersHand.updateWheat(wheat);
		playersHand.updateWood(wood);

		//System.out.println("updated the junk");


		MessageLine logMsg = new MessageLine();
		logMsg.setSource(GameModelList.get(gameID).getPlayer(playerIndex).getName());
		logMsg.setMessage(GameModelList.get(gameID).getPlayer(playerIndex).getName() + " discarded some cards.");
		GameModelList.get(gameID).getLog().addLine(logMsg);

		GameModelList.get(gameID).incrementRevision();
		return null;
	}

	@Override
	public void persist(){
		StorageFacade.addCommand(gameID, this, type);
	}
	@Override
	public void redo(){
		GameModelList.get(gameID).getBank().updateBrick(-brick);
		GameModelList.get(gameID).getBank().updateOre(-ore);
		GameModelList.get(gameID).getBank().updateSheep(-sheep);
		GameModelList.get(gameID).getBank().updateWheat(-wheat);
		GameModelList.get(gameID).getBank().updateWood(-wood);

		//System.out.println("executing 3");

		ResourceCardList playersHand = GameModelList.get(gameID).getPlayer(playerIndex).getResourceCardList();

		//System.out.println("executing 4");


		playersHand.updateBrick(brick);
		playersHand.updateOre(ore);
		playersHand.updateSheep(sheep);
		playersHand.updateWheat(wheat);
		playersHand.updateWood(wood);

		//System.out.println("updated the junk");


		MessageLine logMsg = new MessageLine();
		logMsg.setSource(GameModelList.get(gameID).getPlayer(playerIndex).getName());
		logMsg.setMessage(GameModelList.get(gameID).getPlayer(playerIndex).getName() + " discarded some cards.");
		GameModelList.get(gameID).getLog().addLine(logMsg);

		GameModelList.get(gameID).incrementRevision();
	
	}

	@Override
	public void undo(){
		
	}
}

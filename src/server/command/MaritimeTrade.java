/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.command;

import server.api.bank.ResourceCardList;
import server.api.utils.MessageLine;
import server.communication.GameModel;
import server.communication.GameModelList;
import server.persist.*;

/**
 *
 * @author Wesley
 */
public class MaritimeTrade implements CommandTemplate {
	
	private String type;
	private int playerIndex;
	private int ratio;
	private String inputResource;
	private String outputResource;
	private int gameID;
	


	@Override
	public GameModel execute(String[] args) {
		type = args[0];
		playerIndex = Integer.parseInt(args[1]);
		ratio = Integer.parseInt(args[2]);
		inputResource = args[3];
		outputResource = args[4];
		gameID = Integer.parseInt(args[5]);
		
		ResourceCardList playerResources = GameModelList.get(gameID).getPlayer(playerIndex).getResourceCardList();
		ResourceCardList bankResources = GameModelList.get(gameID).getBank();
		
		switch(inputResource){
			case "wheat":
				playerResources.updateWheat(-ratio);
				bankResources.updateWheat(ratio);
				break;
			case "wood":
				playerResources.updateWood(-ratio);
				bankResources.updateWood(ratio);
				break;
			case "sheep":
				playerResources.updateSheep(-ratio);
				bankResources.updateSheep(ratio);
				break;
			case "ore":
				playerResources.updateOre(-ratio);
				bankResources.updateOre(ratio);
				break;
			case "brick":
				playerResources.updateBrick(-ratio);
				bankResources.updateBrick(ratio);
				break;
			default:
				System.out.println("Invalid input resource");
		}
		
		switch(outputResource){
			case "wheat":
				playerResources.updateWheat(1);
				bankResources.updateWheat(-1);
				break;
			case "wood":
				playerResources.updateWood(1);
				bankResources.updateWood(-1);
				break;
			case "sheep":
				playerResources.updateSheep(1);
				bankResources.updateSheep(-1);
				break;
			case "ore":
				playerResources.updateOre(1);
				bankResources.updateOre(-1);
				break;
			case "brick":
				playerResources.updateBrick(1);
				bankResources.updateBrick(-1);
				break;
			default:
				System.out.println("Invalid output resource");
		}
		
		GameModelList.get(gameID).incrementRevision();
		
		MessageLine logMsg = new MessageLine();
		logMsg.setSource(GameModelList.get(gameID).getPlayer(playerIndex).getName());
		logMsg.setMessage(GameModelList.get(gameID).getPlayer(playerIndex).getName() + "'s turn has ended.");
		GameModelList.get(gameID).getLog().addLine(logMsg);
		
		return null;
	}

	@Override
	public void persist(){
		StorageFacade.addCommand(gameID, this, type);
	}
	@Override
	public void redo(){
		ResourceCardList playerResources = GameModelList.get(gameID).getPlayer(playerIndex).getResourceCardList();
		ResourceCardList bankResources = GameModelList.get(gameID).getBank();
		
		switch(inputResource){
			case "wheat":
				playerResources.updateWheat(-ratio);
				bankResources.updateWheat(ratio);
				break;
			case "wood":
				playerResources.updateWood(-ratio);
				bankResources.updateWood(ratio);
				break;
			case "sheep":
				playerResources.updateSheep(-ratio);
				bankResources.updateSheep(ratio);
				break;
			case "ore":
				playerResources.updateOre(-ratio);
				bankResources.updateOre(ratio);
				break;
			case "brick":
				playerResources.updateBrick(-ratio);
				bankResources.updateBrick(ratio);
				break;
			default:
				System.out.println("Invalid input resource");
		}
		
		switch(outputResource){
			case "wheat":
				playerResources.updateWheat(1);
				bankResources.updateWheat(-1);
				break;
			case "wood":
				playerResources.updateWood(1);
				bankResources.updateWood(-1);
				break;
			case "sheep":
				playerResources.updateSheep(1);
				bankResources.updateSheep(-1);
				break;
			case "ore":
				playerResources.updateOre(1);
				bankResources.updateOre(-1);
				break;
			case "brick":
				playerResources.updateBrick(1);
				bankResources.updateBrick(-1);
				break;
			default:
				System.out.println("Invalid output resource");
		}
		
		GameModelList.get(gameID).incrementRevision();
		
		MessageLine logMsg = new MessageLine();
		logMsg.setSource(GameModelList.get(gameID).getPlayer(playerIndex).getName());
		logMsg.setMessage(GameModelList.get(gameID).getPlayer(playerIndex).getName() + "'s turn has ended.");
		GameModelList.get(gameID).getLog().addLine(logMsg);
	
	
	}

	@Override
	public void undo() {
		ResourceCardList playerResources = GameModelList.get(gameID).getPlayer(playerIndex).getResourceCardList();
		ResourceCardList bankResources = GameModelList.get(gameID).getBank();
		
		switch(inputResource){
			case "wheat":
				playerResources.updateWheat(ratio);
				bankResources.updateWheat(-ratio);
				break;
			case "wood":
				playerResources.updateWood(ratio);
				bankResources.updateWood(-ratio);
				break;
			case "sheep":
				playerResources.updateSheep(ratio);
				bankResources.updateSheep(-ratio);
				break;
			case "ore":
				playerResources.updateOre(ratio);
				bankResources.updateOre(-ratio);
				break;
			case "brick":
				playerResources.updateBrick(ratio);
				bankResources.updateBrick(-ratio);
				break;
			default:
				System.out.println("Invalid input resource");
		}
		
		switch(outputResource){
			case "wheat":
				playerResources.updateWheat(-1);
				bankResources.updateWheat(1);
				break;
			case "wood":
				playerResources.updateWood(-1);
				bankResources.updateWood(1);
				break;
			case "sheep":
				playerResources.updateSheep(-1);
				bankResources.updateSheep(1);
				break;
			case "ore":
				playerResources.updateOre(-1);
				bankResources.updateOre(1);
				break;
			case "brick":
				playerResources.updateBrick(-1);
				bankResources.updateBrick(1);
				break;
			default:
				System.out.println("Invalid output resource");
		}
	}
	
}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.command;

import server.api.bank.ResourceCardList;
import server.api.utils.MessageLine;
import server.communication.GameModel;

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

	@Override
	public GameModel execute(String[] args) {
		type = args[0];
		playerIndex = Integer.parseInt(args[1]);
		ratio = Integer.parseInt(args[2]);
		inputResource = args[3];
		outputResource = args[4];
		
		ResourceCardList playerResources = GameModel.getPlayer(playerIndex).getResourceCardList();
		ResourceCardList bankResources = GameModel.getBank();
		
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
		
		GameModel.incrementRevision();
		
		MessageLine logMsg = new MessageLine();
		logMsg.setSource(GameModel.getPlayer(playerIndex).getName());
		logMsg.setMessage(GameModel.getPlayer(playerIndex).getName() + "'s turn has ended.");
		GameModel.getLog().addLine(logMsg);
		
		return null;
	}

	@Override
	public void undo() {
		ResourceCardList playerResources = GameModel.getPlayer(playerIndex).getResourceCardList();
		ResourceCardList bankResources = GameModel.getBank();
		
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

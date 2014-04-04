package server.command;

import server.communication.GameModel;
import server.communication.GameModelList;

import java.util.*;

public class BuyDevCard implements CommandTemplate{

	private String type = "buyDevCard";
	private int x= -1;
	private int playerNum=-1;
	private int gameID = -10;
	

	
	//args[0] = Playerid
	@Override
	public GameModel execute(String[] args){
		playerNum = Integer.parseInt(args[0]);
		gameID = Integer.parseInt(args[1]);
		//This is mostly sudo code and will need to be changed in accordance with the actual methods that have yet to be made
		//And because im not 100% sure what the args are

		//put the resources back in the bank
		//This isn't possible because bank is private;
		GameModelList.get(gameID).getBank().updateOre(1);
		GameModelList.get(gameID).getBank().updateWheat(1);
		GameModelList.get(gameID).getBank().updateSheep(1);
		
		//take those resources away from Player
		GameModelList.get(gameID).getPlayer(playerNum).getResourceCardList().updateOre(-1);
		GameModelList.get(gameID).getPlayer(playerNum).getResourceCardList().updateWheat(-1);
		GameModelList.get(gameID).getPlayer(playerNum).getResourceCardList().updateSheep(-1);
		
		//retrieve the dev card
		Random rand = new Random();
		
		//it could be that the random number is already done and that the args is which dev card to give.
		// that would simplify things but in the case that random happens here, we already have it done
		boolean taken = false;
		while(!taken && GameModelList.get(gameID).getDeck().getTotal() !=0){
			x = rand.nextInt(5);
			System.out.println("x is " + x);
			if(x == 0){
				//be yearofPlenty
				if(GameModelList.get(gameID).getDeck().getYearOfPlenty()!=0){
					taken = true;
					GameModelList.get(gameID).getPlayer(playerNum).getNewDevCards().updateYearOfPlenty(1);
					GameModelList.get(gameID).getDeck().updateYearOfPlenty(-1);
				}
			}
			else if(x == 1){
				//be Monopoly
				if(GameModelList.get(gameID).getDeck().getMonopoly()!=0){
					taken = true;
					GameModelList.get(gameID).getPlayer(playerNum).getNewDevCards().updateMonopoly(1);
					GameModelList.get(gameID).getDeck().updateMonopoly(-1);
				}
			}
			else if(x==2){
				//be Soldier
				if(GameModelList.get(gameID).getDeck().getSoldier()!=0){
					taken = true;
					GameModelList.get(gameID).getPlayer(playerNum).getNewDevCards().updateSoldier(1);
					GameModelList.get(gameID).getDeck().updateSoldier(-1);
				}
			}
			else if(x==3){
				//be RoadBuilding
				if(GameModelList.get(gameID).getDeck().getRoadBuilding()!=0){
					taken = true;
					GameModelList.get(gameID).getPlayer(playerNum).getNewDevCards().updateRoadBuilding(1);
					GameModelList.get(gameID).getDeck().updateRoadBuilding(-1);
				}
			}
			else if(x==4){
				//be monument
				if(GameModelList.get(gameID).getDeck().getMonument()!=0){
					taken = true;
					GameModelList.get(gameID).getPlayer(playerNum).getOldDevCards().updateMonument(1);
					GameModelList.get(gameID).getDeck().updateMonument(-1);
				}
			}
		}
		return null;
	}
	
	@Override
	public void undo(){
		//This is mostly sudo code and will need to be changed in accordance with the actual methods that have yet to be made
		//And because im not 100% sure what the args are
		System.out.println("X IS ********** " + x);
		//put the resources back in the bank
		//This isn't possible because bank is private;
		GameModelList.get(gameID).getBank().updateOre(-1);
		GameModelList.get(gameID).getBank().updateWheat(-1);
		GameModelList.get(gameID).getBank().updateSheep(-1);
		
		//take those resources away from Player
		GameModelList.get(gameID).getPlayer(playerNum).getResourceCardList().updateOre(1);
		GameModelList.get(gameID).getPlayer(playerNum).getResourceCardList().updateWheat(1);
		GameModelList.get(gameID).getPlayer(playerNum).getResourceCardList().updateSheep(1);
		
		//retrieve the dev card
		//it could be that the random number is already done and that the args is which dev card to give.
		// that would simplify things but in the case that random happens here, we already have it done
		if(x == 0){
			//be yearofPlenty
			GameModelList.get(gameID).getPlayer(playerNum).getNewDevCards().updateYearOfPlenty(-1);
			GameModelList.get(gameID).getDeck().updateYearOfPlenty(1);
		}
		else if(x == 1){
			//be Monopoly
			GameModelList.get(gameID).getPlayer(playerNum).getNewDevCards().updateMonopoly(-1);
			GameModelList.get(gameID).getDeck().updateMonopoly(1);
		}
		else if(x==2){
			//be Soldier
			GameModelList.get(gameID).getPlayer(playerNum).getNewDevCards().updateSoldier(-1);
			GameModelList.get(gameID).getDeck().updateSoldier(1);
		}
		else if(x==3){
			//be RoadBuilder
			GameModelList.get(gameID).getPlayer(playerNum).getNewDevCards().updateRoadBuilding(-1);
			GameModelList.get(gameID).getDeck().updateRoadBuilding(1);
		}
		else if(x==4){
			//be monument
			GameModelList.get(gameID).getPlayer(playerNum).getNewDevCards().updateMonument(-1);
			GameModelList.get(gameID).getDeck().updateMonument(1);
		}
	}
}

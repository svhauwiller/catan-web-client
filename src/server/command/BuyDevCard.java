package server.command;

import server.communication.GameModel;
import java.util.*;

public class BuyDevCard implements CommandTemplate{

	private int x= -1;
	private int playerNum=-1;
	//args[0] = Playerid
	@Override
	public GameModel execute(String[] args){
		playerNum = Integer.parseInt(args[0]);
		//This is mostly sudo code and will need to be changed in accordance with the actual methods that have yet to be made
		//And because im not 100% sure what the args are

		//put the resources back in the bank
		//This isn't possible because bank is private;
		GameModel.getBank().updateOre(1);
		GameModel.getBank().updateWheat(1);
		GameModel.getBank().updateSheep(1);
		
		//take those resources away from Player
		GameModel.getPlayer(playerNum).getResourceCardList().updateOre(-1);
		GameModel.getPlayer(playerNum).getResourceCardList().updateWheat(-1);
		GameModel.getPlayer(playerNum).getResourceCardList().updateSheep(-1);
		
		//retrieve the dev card
		Random rand = new Random();
		
		//it could be that the random number is already done and that the args is which dev card to give.
		// that would simplify things but in the case that random happens here, we already have it done
		boolean taken = false;
		while(!taken && GameModel.getDeck().getTotal() !=0){
			x = rand.nextInt(5);
			System.out.println("x is " + x);
			if(x == 0){
				//be yearofPlenty
				if(GameModel.getDeck().getYearOfPlenty()!=0){
					taken = true;
					GameModel.getPlayer(playerNum).getNewDevCards().updateYearOfPlenty(1);
					GameModel.getDeck().updateYearOfPlenty(-1);
				}
			}
			else if(x == 1){
				//be Monopoly
				if(GameModel.getDeck().getMonopoly()!=0){
					taken = true;
					GameModel.getPlayer(playerNum).getNewDevCards().updateMonopoly(1);
					GameModel.getDeck().updateMonopoly(-1);
				}
			}
			else if(x==2){
				//be Soldier
				if(GameModel.getDeck().getSoldier()!=0){
					taken = true;
					GameModel.getPlayer(playerNum).getNewDevCards().updateSoldier(1);
					GameModel.getDeck().updateSoldier(-1);
				}
			}
			else if(x==3){
				//be RoadBuilding
				if(GameModel.getDeck().getRoadBuilding()!=0){
					taken = true;
					GameModel.getPlayer(playerNum).getNewDevCards().updateRoadBuilding(1);
					GameModel.getDeck().updateRoadBuilding(-1);
				}
			}
			else if(x==4){
				//be monument
				if(GameModel.getDeck().getMonument()!=0){
					taken = true;
					GameModel.getPlayer(playerNum).getNewDevCards().updateMonument(1);
					GameModel.getDeck().updateMonument(-1);
				}
			}
		}
		return null;
	}
	
	@Override
	public void undo(){
		//This is mostly sudo code and will need to be changed in accordance with the actual methods that have yet to be made
		//And because im not 100% sure what the args are

		//put the resources back in the bank
		//This isn't possible because bank is private;
		GameModel.getBank().updateOre(-1);
		GameModel.getBank().updateWheat(-1);
		GameModel.getBank().updateSheep(-1);
		
		//take those resources away from Player
		GameModel.getPlayer(playerNum).getResourceCardList().updateOre(1);
		GameModel.getPlayer(playerNum).getResourceCardList().updateWheat(1);
		GameModel.getPlayer(playerNum).getResourceCardList().updateSheep(1);
		
		//retrieve the dev card
		//it could be that the random number is already done and that the args is which dev card to give.
		// that would simplify things but in the case that random happens here, we already have it done
		if(x == 0){
			//be yearofPlenty
			GameModel.getPlayer(playerNum).getNewDevCards().updateYearOfPlenty(-1);
			GameModel.getDeck().updateYearOfPlenty(1);
		}
		else if(x == 1){
			//be Monopoly
			GameModel.getPlayer(playerNum).getNewDevCards().updateMonopoly(-1);
			GameModel.getDeck().updateMonopoly(1);
		}
		else if(x==2){
			//be Soldier
			GameModel.getPlayer(playerNum).getNewDevCards().updateSoldier(-1);
			GameModel.getDeck().updateSoldier(1);
		}
		else if(x==3){
			//be RoadBuilder
			GameModel.getPlayer(playerNum).getNewDevCards().updateRoadBuilding(-1);
			GameModel.getDeck().updateRoadBuilding(1);
		}
		else if(x==4){
			//be monument
			GameModel.getPlayer(playerNum).getNewDevCards().updateMonument(-1);
			GameModel.getDeck().updateMonument(1);
		}
	}
}

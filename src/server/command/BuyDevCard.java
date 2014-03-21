package server.command;

import server.communication.GameModel;
import java.util.*;

public class BuyDevCard implements CommandTemplate{

	public GameModel execute(String[] args){
		//This is mostly sudo code and will need to be changed in accordance with the actual methods that have yet to be made
		//And because im not 100% sure what the args are

		//put the resources back in the bank
		//This isn't possible because bank is private;
		/*GameModel.bank.updateOre(1);
		GameModel.bank.updateWheat(1);
		GameModel.bank.updateSheep(1);
		
		//take those resources away from Player
		Player player = GameModel.getCurrentPlayer();
		ResourceCardList myResource = player.getResources();
		//would it be possible to say player.getResources().updateOre(-1)??
		myResource.updateOre(-1);
		myResource.updateWheat(-1);
		myResource.updateSheep(-1);

		//retrieve the dev card
		DevCardList myDevList = GameModel.getDeck(); //This still needs to be made
		Random rand = new Random();
		int x = rand.nextInt(5);
		//it could be that the random number is already done and that the args is which dev card to give.
		// that would simplify things but in the case that random happens here, we already have it done
		if(x == 0){
			//be yearofPlenty
			player.newDevCards.updateYearOfPlenty(1);
			myDevList.updateYearOfPlenty(-1);
		}
		else if(x == 1){
			//be Monopoly
			player.newDevCards.updateMonopoly(1);
			myDevList.updateMonopoly(-1);
		}
		else if(x==2){
			//be Soldier
			player.newDevCards.updateSoldier(1);
			myDevList.updateSoldier(-1);
		}
		else if(x==3){
			//be RoadBuilder
			player.newDevCards.updateRoadBuilder(1);
			myDevList.updateRoadBuilder(-1);
		}
		else if(x==4){
			//be monument
			player.oldDevCards.updateMonument(1);
			myDevList.updateMonument(-1);
		}*/
return null;
	}
	
	public void undo(){
		/*GameModel.bank.updateOre(-1);
		GameModel.bank.updateWheat(-1);
		GameModel.bank.updateSheep(-1);
		
		//take those resources away from Player
		Player player = GameModel.getCurrentPlayer();
		ResourceCardList myResource = player.getResources();
		myResource.updateOre(1);
		myResource.updateWheat(1);
		myResource.updateSheep(1);

		//retrieve the dev card
		DevCardList myDevList = GameModel.getDeck(); //This still needs to be made
		Random rand = new Random();
		int x = rand.nextInt(5);
		//Not sure how to do this since it is done randomly 
		if(x == 0){
			//be yearofPlenty
			player.newDevCards.updateYearOfPlenty(-1);
			myDevList.updateYearOfPlenty(1);
		}
		else if(x == 1){
			//be Monopoly
			player.newDevCards.updateMonopoly(-1);
			myDevList.updateMonopoly(1);
		}
		else if(x==2){
			//be Soldier
			player.newDevCards.updateSoldier(-1);
			myDevList.updateSolider(1);
		}
		else if(x==3){
			//be RoadBuilder
			player.newDevCards.updateRoadBuilder(-1);
			myDevList.updateRoadBuilder(1);
		}
		else if(x==4){
			//be monument
			player.oldDevCards.updateMonument(-1);
			myDevList.updateMonument(1);
		}*/
	}
}

package server.command;

import server.communication.GameModel;
import java.util.*;

public class RobPlayer implements CommandTemplate{
	private String type = "";
	private int playerIndex = -1;
	private int victimIndex = -1;
	private Location location;
	private String resourceToSteal = "";
	private Location previousRobberLocation;
	/*  args[0] = obj.optString("type");
		args[1] = obj.optString("playerIndex");
		args[2] = obj.optString("victimIndex");
		JSONObject subObject = obj.getJSONObject("location");
		args[3] = subObject.optString("x");
		args[4] = subObject.optString("y");*/
	public GameModel execute(String[] args){
		if(location != null){
			previousRobberLocation = new Location(location.getX(), location.getY(), false);
		}

		type = args[0];
		playerNum = Integer.parseInt(args[1]);
		victimIndex = Integer.parseInt(args[2]);
		location.setX(Integer.parseInt(args[3])); // location set to a new location
		location.setY(Integer.parseInt(args[4]));

		// update map - change hexlocation of robber
		GameModel.getMap().moveRobber(location);

		// update players - subtract resources from one player and add resources to another player
		Random rand = new Random();
		
		boolean taken = false;
		boolean[] resourcesChecked = new boolean[5];
		resourcesChecked[0] = false;
		resourcesChecked[1] = false;
		resourcesChecked[2] = false;
		resourcesChecked[3] = false;
		resourcesChecked[4] = false;

		while(!taken){
			int x = rand.nextInt(5);
			if(allResourcesChecked(resourcesChecked)){
				taken = true;
			}
			else if(x == 0){
				resourcesChecked[0] = true;
				if(GameModel.getPlayer(victimIndex).getResourceCardList().getWheat() > 0){
					taken = true;
					GameModel.getPlayer(victimIndex).getResourceCardList().updateWheat(-1);
					GameModel.getPlayer(playerIndex).getResourceCardList().updateWheat(1);
					resourceToSteal = "Wheat";
				}
			}
			else if(x == 1){
				resourcesChecked[1] = true;
				if(GameModel.getPlayer(victimIndex).getResourceCardList().getOre() > 0){
					taken = true;
					GameModel.getPlayer(victimIndex).getResourceCardList().updateOre(-1);
					GameModel.getPlayer(playerIndex).getResourceCardList().updateOre(1);
					resourceToSteal = "Ore";
				}
			}
			else if(x==2){
				resourcesChecked[2] = true;
				if(GameModel.getPlayer(victimIndex).getResourceCardList().getWood() > 0){
					taken = true;
					GameModel.getPlayer(victimIndex).getResourceCardList().updateWood(-1);
					GameModel.getPlayer(playerIndex).getResourceCardList().updateWood(1);
					resourceToSteal = "Wood";
				}
			}
			else if(x==3){
				resourcesChecked[3] = true;
				if(GameModel.getPlayer(victimIndex).getResourceCardList().getSheep() > 0){
					taken = true;
					GameModel.getPlayer(victimIndex).getResourceCardList().updateSheep(-1);
					GameModel.getPlayer(playerIndex).getResourceCardList().updateSheep(1);
					resourceToSteal = "Sheep";
				}
			}
			else if(x==4){
				resourcesChecked[4] = true;
				if(GameModel.getPlayer(victimIndex).getResourceCardList().getBrick() > 0){
					taken = true;
					GameModel.getPlayer(victimIndex).getResourceCardList().updateBrick(-1);
					GameModel.getPlayer(playerIndex).getResourceCardList().updateBrick(1);
					resourceToSteal = "Brick";
				}
			}
		}
	return null;
	}

	private boolean allResourcesChecked(boolean[] resourcesToCheck){
		//boolean thereIsAFalse = false;
		for(int i = 0; i < resourcesToCheck.size(); i++){
			if(resourcesToCheck[i] == false){
				return false;
			}
		}
		return true;
	}
	
	public void undo(){
		// move robber to previousRobberLocation
		// move ont resourceToSteal from playerIndex to victimIndex
	}
}
package server.command;

import server.api.bank.ResourceCardList;
import server.api.player.Player;
import server.communication.GameModel;

public class SendTradeResponse implements CommandTemplate{
		private int playerIndex;
		private String willAccept;
		private int sender;
		private int receiver;
		private ResourceCardList rcl;
	@Override
	public GameModel execute(String[] args) {
		playerIndex = Integer.parseInt(args[0]);
		willAccept = args[1];
		sender = GameModel.getTradeOffer().getSender();
		receiver = GameModel.getTradeOffer().getReceiver();
		rcl = GameModel.getTradeOffer().getTheResourceList();
		
		if(willAccept.equalsIgnoreCase("false")){
			//you suck, just trade
		}
		else{
			update();
		}
		clearList();
		
		GameModel.incrementRevision();
		return null;
	}
	
	private void update(){
		Player theSender = GameModel.getPlayer(sender);
		Player theReceiver = GameModel.getPlayer(receiver);
		//update Brick
		if(rcl.getBrick()!=0){
			theSender.getResourceCardList().updateBrick(rcl.getBrick()*(-1));
			theReceiver.getResourceCardList().updateBrick(rcl.getBrick());
		}
		//update Ore
		if(rcl.getOre()!=0){
			theSender.getResourceCardList().updateOre(rcl.getOre()*(-1));
			theReceiver.getResourceCardList().updateOre(rcl.getOre());
		}
		//update Sheep
		if(rcl.getSheep()!=0){
			theSender.getResourceCardList().updateSheep(rcl.getSheep()*(-1));
			theReceiver.getResourceCardList().updateSheep(rcl.getSheep());
		}
		//update Wheat
		if(rcl.getWheat()!=0){
			theSender.getResourceCardList().updateWheat(rcl.getWheat()*(-1));
			theReceiver.getResourceCardList().updateWheat(rcl.getWheat());
		}
		//update Wood
		if(rcl.getWood()!=0){
			theSender.getResourceCardList().updateWood(rcl.getWood()*(-1));
			theReceiver.getResourceCardList().updateWood(rcl.getWood());
		}
	}
	
	private void clearList(){
		GameModel.getTradeOffer().setReceiver(-1);
		GameModel.getTradeOffer().setSender(-1); 
	}
	

	@Override
	public void undo() {
		
	}

}

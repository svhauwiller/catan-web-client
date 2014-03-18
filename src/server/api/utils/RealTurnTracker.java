//package server.api.utils;

public class RealTurnTracker implements TurnTracker{
	
	private int currentTurn;
	private String status;
	
	public RealTurnTracker(){
		setCurrentTurn(0);
		setStatus("Rolling");
	}

	public int getCurrentTurn() {
		return currentTurn;
	}

	public void setCurrentTurn(int currentTurn) {
		this.currentTurn = currentTurn;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
}

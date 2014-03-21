//package server.api.utils;

public class RealTradeOffer implements TradeOffer{

	private String sender;
	private String receiver;
	//private ResourceList theResourceList;
	//TODO: check TA code to see what is returned by their server on a tradeRequest
	public RealTradeOffer()
	{
		setSender(null);
		setReceiver(null);
	}

	public String getSender() {
		return sender;
	}

	public void setSender(String sender) {
		this.sender = sender;
	}

	public String getReceiver() {
		return receiver;
	}

	public void setReceiver(String receiver) {
		this.receiver = receiver;
	}
	
}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.api.utils;

/**
 *
 * @author Wesley
 */
public class TradeOffer {
	private String sender;
	private String receiver;
	//private ResourceList theResourceList;
	//TODO: check TA code to see what is returned by their server on a tradeRequest
	public TradeOffer()
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

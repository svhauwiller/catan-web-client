/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.api.utils;

import server.api.bank.ResourceCardList;

/**
 *
 * @author Wesley
 */
public class TradeOffer {
	private int sender;
	private int receiver;
	private ResourceCardList theResourceList;
	//TODO: check TA code to see what is returned by their server on a tradeRequest
	public TradeOffer()
	{
		setSender(-1);
		setReceiver(-1);
	}

	public ResourceCardList getTheResourceList() {
		return theResourceList;
	}

	public void setTheResourceList(ResourceCardList theResourceList) {
		this.theResourceList = theResourceList;
	}

	public int getSender() {
		return sender;
	}

	public void setSender(int sender) {
		this.sender = sender;
	}

	public int getReceiver() {
		return receiver;
	}

	public void setReceiver(int receiver) {
		this.receiver = receiver;
	}
}

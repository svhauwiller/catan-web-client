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
public class MessageLine {
	private String message;
	private String source;
	
	public MessageLine()
	{
		setMessage(null);
		setSource(null);
	}

	public MessageLine(String theMessage, String theSource){
		setMessage(theMessage);
		setSource(theSource);
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}
}

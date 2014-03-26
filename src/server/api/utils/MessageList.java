/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.api.utils;

import java.util.ArrayList;

/**
 *
 * @author Wesley
 */
public class MessageList {
	private ArrayList<MessageLine> lines;

	public MessageList() {
		this.lines = new ArrayList<>();
	}
	
	public ArrayList<MessageLine> getLines() {
		return lines;
	}

	public void setLines(ArrayList<MessageLine> lines) {
		this.lines = lines;
	}
	
	public void addLine(MessageLine line){
		this.lines.add(line);
	}
}

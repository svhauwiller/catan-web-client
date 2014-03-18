//package server.api.utils;

import java.util.*;


public class RealMessageList implements MessageList{
	private List<MessageLine> lines;
	
	public RealMessageList() {
		this.lines = new ArrayList<>();
	}
	
	public List<MessageLine> getLines() {
		return lines;
	}

	public void setLines(List<MessageLine> lines) {
		this.lines = lines;
	}


}

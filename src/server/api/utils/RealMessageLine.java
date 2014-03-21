//package server.api.utils;

public class RealMessageLine implements MessageLine {
	private String message;
	private String source;
	
	public RealMessageLine()
	{
		setMessage(null);
		setSource(null);
	}

	public RealMessageLine(String theMessage, String theSource){
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

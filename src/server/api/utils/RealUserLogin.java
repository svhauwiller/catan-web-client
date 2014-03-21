import java.util.HashMap;

//package server.api.utils;

public class RealUserLogin implements UserLogin {
	
	private HashMap<String, String> validUsers;
	
	public RealUserLogin(){
		validUsers.put("Sam", "sam");
		validUsers.put("Brooke", "brooke");
		validUsers.put("Pete", "pete");
		validUsers.put("Mark", "mark");
	}
	
	public HashMap<String, String> getValidUsers() {
		return validUsers;
	}

	public void setValidUsers(HashMap<String, String> validUsers) {
		this.validUsers = validUsers;
	}





	public boolean validateUserLogin(String username, String password) {
		
		return validUsers.get(username).equals(password);
	}
	
	public void registerUser(String username, String password) {
		
		validUsers.put(username, password);
	}
	
}
